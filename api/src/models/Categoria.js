// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de una categoría de productos
const categoriaSchema = new mongoose.Schema({
  // Nombre: obligatorio, entre 2 y 50 caracteres
  // unique: true -> no puede haber dos categorías con el mismo nombre
  nom: { type: String, required: true, unique: true, minlength: 2, maxlength: 50 },
  // Descripción: opcional, máximo 300 caracteres
  descripcio: { type: String, maxlength: 300 },
});

// Creamos y exportamos el modelo 'Categoria'
module.exports = mongoose.model('Categoria', categoriaSchema);
