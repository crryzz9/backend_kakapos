class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;   // código HTTP (404, 409...)
    this.code = code;       // código propio ('NOT_FOUND', 'DUPLICATE_KEY'...)
    this.details = details; // lista opcional de { field, message }
  }
}

module.exports = AppError;