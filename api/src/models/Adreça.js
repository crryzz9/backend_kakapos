// Importamos mongoose, la librería que nos deja trabajar con MongoDB desde Node.js
const mongoose = require('mongoose');

// Un "Schema" es como el molde de los datos: dice qué campos tiene una adreça y qué reglas cumplen
const adrecaSchema = new mongoose.Schema({
  // Calle: texto obligatorio (required) de 150 caracteres como máximo
  carrer: { type: String, required: true, maxlength: 150 },
  // Ciudad: texto obligatorio, máximo 80 caracteres
  ciutat: { type: String, required: true, maxlength: 80 },
  // Código postal: obligatorio y tiene que ser exactamente 5 números (lo comprueba la expresión regular)
  // Si no lo cumple, sale el mensaje 'Codi postal no vàlid'
  codiPostal: { type: String, required: true, match: [/^\d{5}$/, 'Codi postal no vàlid'] },
  // País: texto obligatorio, máximo 60 caracteres
  pais: { type: String, required: true, maxlength: 60 },
  // Detalles extra (piso, puerta...): opcional, máximo 200 caracteres
  especificacions: { type: String, maxlength: 200 },
});

// Creamos el modelo 'Adreca' a partir del schema y lo exportamos para usarlo en otros archivos
// El modelo es lo que usamos para guardar, buscar, editar y borrar adreces en la base de datos
module.exports = mongoose.model('Adreca', adrecaSchema);
