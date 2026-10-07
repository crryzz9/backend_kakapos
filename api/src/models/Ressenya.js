// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de una reseña (la opinión de un usuario sobre un producto)
const ressenyaSchema = new mongoose.Schema({
  // Usuario que escribe la reseña (relación con 'Usuari')
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  // Producto que se valora (relación con 'Producte')
  producteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producte', required: true },
  // Nota: obligatoria, de 1 a 5 (como las estrellas)
  puntuacio: { type: Number, required: true, min: 1, max: 5 },
  // Texto de la opinión: opcional, máximo 500 caracteres
  comentari: { type: String, maxlength: 500 },
  // Fecha de la reseña. Por defecto la de ahora
  data: { type: Date, default: Date.now },
});

// Índice único: un usuario solo puede hacer UNA reseña por producto
ressenyaSchema.index({ usuariId: 1, producteId: 1 }, { unique: true });

// Creamos y exportamos el modelo 'Ressenya'
module.exports = mongoose.model('Ressenya', ressenyaSchema);
