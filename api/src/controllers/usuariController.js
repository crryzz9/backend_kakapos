const usuariService = require('../services/usuariService');
const tokenService = require('../services/tokenService');

const createUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.createUsuari(req.body ?? {});
    res.status(201).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

const getUsuaris = async (req, res, next) => {
  try {
    const resultat = await usuariService.getUsuaris(req.query);
    res.status(200).json({ success: true, ...resultat });
  } catch (error) {
    next(error);
  }
};

const getUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.getUsuari(req.params.id);
    res.status(200).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

const updateUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body ?? {});
    res.status(200).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

// Baja lógica: sin cuerpo en la respuesta (204)
const deleteUsuari = async (req, res, next) => {
  try {
    await usuariService.deleteUsuari(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// POST /api/usuaris/registre
const registrarse = async (req, res, next) => {
  try {
    const usuari = await usuariService.createUsuari(req.body ?? {});
    res.status(201).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

// POST /api/usuaris/login
const login = async (req, res, next) => {
  try {
    const resultat = await usuariService.login(req.body ?? {});
    res.status(200).json({ success: true, data: resultat });
  } catch (error) {
    next(error);
  }
};

// POST /api/usuaris/refresh
const refresh = async (req, res, next) => {
  try {
    const tokens = await tokenService.rotarRefreshToken(req.body?.refreshToken);
    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    next(error);
  }
};

// POST /api/usuaris/logout
const logout = async (req, res, next) => {
  try {
    await tokenService.revocarRefreshToken(req.body?.refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// GET /api/usuaris/perfil (ruta protegida: el middleware ya ha puesto req.usuari)
const perfil = async (req, res, next) => {
  try {
    const usuari = await usuariService.getUsuari(req.usuari.id);
    res.status(200).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUsuari,
  getUsuaris,
  getUsuari,
  updateUsuari,
  deleteUsuari,
  registrarse,
  login,
  refresh,
  logout,
  perfil,
};