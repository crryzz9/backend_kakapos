const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  let status = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Error intern del servidor';
  let details;

  if (err instanceof AppError) {
    // Errores que lanzamos nosotros a propósito
    ({ status, code, message, details } = err);
  } else if (err.name === 'ValidationError') {
    // Mongoose: no se cumple una validación del esquema
    status = 422;
    code = 'VALIDATION_ERROR';
    message = 'Les dades no són vàlides';
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.name === 'CastError') {
    // Mongoose: un id con formato incorrecto (por ejemplo "123")
    status = 400;
    code = 'INVALID_ID';
    message = "L'identificador no és vàlid";
    details = [{ field: err.path, message: 'Format incorrecte' }];
  } else if (err.code === 11000) {
    // MongoDB: índice único incumplido (email o slug repetido)
    const camp = Object.keys(err.keyPattern || {})[0] || 'camp';
    status = 409;
    code = 'DUPLICATE_KEY';
    message = `Ja existeix un registre amb aquest ${camp}`;
    details = [{ field: camp, message: 'Valor duplicat' }];
  } else if (err.type === 'entity.parse.failed') {
    // El JSON del body está mal escrito
    status = 400;
    code = 'INVALID_JSON';
    message = 'El cos de la petició no és un JSON vàlid';
  }

  // La traza completa solo va a la consola del servidor, nunca al cliente
  if (status === 500) console.error(err);

  res.status(status).json({
    success: false,
    error: { code, message, ...(details && { details }) },
  });
};

module.exports = errorHandler;