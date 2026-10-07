// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un proveedor (la empresa que nos vende los productos)
const proveidorSchema = new mongoose.Schema({
  // Nombre: obligatorio, entre 2 y 100 caracteres
  nom: { type: String, required: true, minlength: 2, maxlength: 100 },
  // Persona o teléfono de contacto: opcional, máximo 100 caracteres
  contacte: { type: String, maxlength: 100 },
  // Email: obligatorio y tiene que tener forma de email (algo@algo.algo)
  // Si no la tiene, sale el mensaje 'Email no vàlid'
  email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Email no vàlid'] },
});

// Creamos y exportamos el modelo 'Proveidor'
module.exports = mongoose.model('Proveidor', proveidorSchema);
