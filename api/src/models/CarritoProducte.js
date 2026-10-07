// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Esta colección une carritos con productos: cada documento es "un producto dentro de un carrito"
const carritoProducteSchema = new mongoose.Schema({
  // ID del carrito al que pertenece (relación con 'Carrito')
  carritoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrito', required: true },
  // ID del producto que hay en el carrito (relación con 'Producte')
  producteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producte', required: true },
  // Cuántas unidades hay. Mínimo 1
  quantitat: { type: Number, required: true, min: 1 },
  // Precio de una unidad. No puede ser negativo
  preuUnitat: { type: Number, required: true, min: 0 },
});

// Índice único: no se puede repetir la misma pareja carrito + producto
// (si añades otra vez el mismo producto, hay que sumar la cantidad en vez de crear otra fila)
carritoProducteSchema.index({ carritoId: 1, producteId: 1 }, { unique: true });

// Creamos y exportamos el modelo 'CarritoProducte'
module.exports = mongoose.model('CarritoProducte', carritoProducteSchema);
