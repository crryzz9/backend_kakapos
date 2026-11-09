const tokenService = require('../services/tokenService');
const AppError = require('../utils/AppError');

// Comprueba el header "Authorization: Bearer <accessToken>"
const autenticar = (req, res, next) => {
  try {
    const capcalera = req.headers.authorization || '';
    const [tipus, token] = capcalera.split(' ');

    if (tipus !== 'Bearer' || !token) {
      throw new AppError(401, 'NO_TOKEN', 'Falta el token d\'accés');
    }

    // Lanza TOKEN_EXPIRED o INVALID_TOKEN si falla la caducidad o la firma
    const payload = tokenService.verificarAccessToken(token);

    // Deja los datos del usuario disponibles para el controller
    req.usuari = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = autenticar;