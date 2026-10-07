// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Esta colección une usuarios con direcciones: un usuario puede tener varias direcciones
// y cada documento dice "este usuario usa esta dirección para esto"
const usuariAdrecaSchema = new mongoose.Schema({
  // Usuario (relación con 'Usuari')
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  // Dirección (relación con 'Adreca')
  adrecaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adreca', required: true },
  // Para qué se usa la dirección: 'enviament' (envíos) o 'facturacio' (facturas)
  tipus: { type: String, required: true, enum: ['enviament', 'facturacio'] },
  // true si es la dirección que se usa por defecto. Por defecto false
  predeterminada: { type: Boolean, default: false },
});

// Índice único: no se puede repetir la misma combinación usuario + dirección + tipo
// (la misma dirección sí puede estar una vez como envío y otra como facturación)
usuariAdrecaSchema.index({ usuariId: 1, adrecaId: 1, tipus: 1 }, { unique: true });

// Creamos y exportamos el modelo 'UsuariAdreca'
module.exports = mongoose.model('UsuariAdreca', usuariAdrecaSchema);
