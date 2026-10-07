// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un carrito de la compra
const carritoSchema = new mongoose.Schema({
  // Usuario dueño del carrito. Guarda el ID de un documento de 'Usuari' (es una relación)
  // unique: true -> cada usuario solo puede tener UN carrito
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true, unique: true },
  // Fecha de creación. Si no la ponemos, se pone sola la fecha de ahora (Date.now)
  data: { type: Date, default: Date.now },
  // Estado del carrito: solo puede ser uno de estos 3 valores (enum). Por defecto 'actiu'
  // 'convertit' = el carrito se ha convertido en una comanda (se ha comprado)
  estat: { type: String, enum: ['actiu', 'abandonat', 'convertit'], default: 'actiu' },
});

// Creamos y exportamos el modelo 'Carrito'
module.exports = mongoose.model('Carrito', carritoSchema);
