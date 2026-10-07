// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Esta colección une pedidos con productos: cada documento es "un producto dentro de un pedido"
const comandaProducteSchema = new mongoose.Schema({
  // ID del pedido (relación con 'Comanda')
  comandaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comanda', required: true },
  // ID del producto comprado (relación con 'Producte')
  producteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producte', required: true },
  // Cuántas unidades se han comprado. Mínimo 1
  quantitat: { type: Number, required: true, min: 1 },
  // Precio de una unidad en el momento de la compra (así, si el precio cambia después, el pedido no cambia)
  preuUnitat: { type: Number, required: true, min: 0 },
  // Fecha. Por defecto la de ahora
  data: { type: Date, default: Date.now },
});

// Índice único: el mismo producto no puede salir dos veces en el mismo pedido
comandaProducteSchema.index({ comandaId: 1, producteId: 1 }, { unique: true });

// Creamos y exportamos el modelo 'ComandaProducte'
module.exports = mongoose.model('ComandaProducte', comandaProducteSchema);
