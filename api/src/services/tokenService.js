const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('../models/Token');
const Usuari = require('../models/Usuari');
const AppError = require('../utils/AppError');

// Convierte el refresh token en un hash para guardarlo en Mongo (nunca en claro)
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const comprovarSecrets = () => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('Falten JWT_SECRET o JWT_REFRESH_SECRET al .env');
  }
};

const tokenInvalid = () => new AppError(401, 'INVALID_TOKEN', 'Token no vàlid o caducat');

// Access token: corta duración, lleva el id y el rol
const generarAccessToken = (usuari) =>
  jwt.sign({ id: usuari._id, rol: usuari.rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });

// Refresh token: larga duración. El jti único evita dos tokens idénticos en el mismo segundo
const generarRefreshToken = async (usuari) => {
  const refreshToken = jwt.sign(
    { id: usuari._id, jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
  const { exp } = jwt.decode(refreshToken);
  await Token.create({
    usuariId: usuari._id,
    tokenHash: hashToken(refreshToken),
    expiraEl: new Date(exp * 1000),
  });
  return refreshToken;
};

// Crea el par de tokens (lo usa el login y el refresh)
const crearParellTokens = async (usuari) => {
  comprovarSecrets();
  return {
    accessToken: generarAccessToken(usuari),
    refreshToken: await generarRefreshToken(usuari),
  };
};

// Rotación: el refresh token usado se revoca y se entrega un par nuevo
const rotarRefreshToken = async (refreshToken) => {
  if (typeof refreshToken !== 'string') {
    throw new AppError(422, 'VALIDATION_ERROR', 'Les dades no són vàlides', [
      { field: 'refreshToken', message: 'Cal enviar el refreshToken' },
    ]);
  }
  comprovarSecrets();

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw tokenInvalid();
  }

  const tokenHash = hashToken(refreshToken);
  // Lo marca como revocado solo si todavía no lo estaba (una única vez)
  const usat = await Token.findOneAndUpdate({ tokenHash, revocat: false }, { revocat: true });

  if (!usat) {
    // Existe pero ya estaba revocado: reutilización, se cierran todas las sesiones
    const existent = await Token.findOne({ tokenHash });
    if (existent) {
      await Token.updateMany({ usuariId: existent.usuariId, revocat: false }, { revocat: true });
      throw new AppError(
        401,
        'TOKEN_REUSED',
        'Refresh token reutilitzat: s\'han tancat totes les sessions'
      );
    }
    throw tokenInvalid();
  }

  const usuari = await Usuari.findById(payload.id);
  if (!usuari || !usuari.actiu) throw tokenInvalid();

  return await crearParellTokens(usuari);
};

// Logout: revoca el refresh token recibido
const revocarRefreshToken = async (refreshToken) => {
  if (typeof refreshToken !== 'string') return;
  await Token.findOneAndUpdate({ tokenHash: hashToken(refreshToken) }, { revocat: true });
};

// Para el middleware: comprueba la firma y la caducidad del access token
const verificarAccessToken = (token) => {
  comprovarSecrets();
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError(401, 'TOKEN_EXPIRED', 'El token ha caducat');
    }
    throw tokenInvalid();
  }
};

module.exports = {
  crearParellTokens,
  rotarRefreshToken,
  revocarRefreshToken,
  verificarAccessToken,
};