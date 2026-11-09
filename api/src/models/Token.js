const mongoose = require('mongoose');

// Guarda los refresh tokens de cada usuario para poder rotarlos y revocarlos
const tokenSchema = new mongoose.Schema(
  {
    // Usuario al que pertenece el token
    usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
    // Hash (SHA-256) del refresh token. Nunca se guarda el token en claro
    tokenHash: { type: String, required: true, unique: true },
    // Fecha en la que caduca el refresh token
    expiraEl: { type: Date, required: true },
    // true cuando el token ya se ha usado o se ha cerrado la sesión
    revocat: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Índice TTL: Mongo borra solo los tokens cuando pasa su fecha de caducidad
tokenSchema.index({ expiraEl: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Token', tokenSchema);