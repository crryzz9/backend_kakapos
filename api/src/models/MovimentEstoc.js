// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de un movimiento de estoc: cada vez que entra o sale stock de un producto se guarda aquí (historial)
const movimentEstocSchema = new mongoose.Schema({
  // Producto al que afecta el movimiento (relación con 'Producte')
  producteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producte', required: true },
  // Tipo: 'entrada' (suma stock) o 'sortida' (resta stock)
  tipus: { type: String, required: true, enum: ['entrada', 'sortida'] },
  // Cuántas unidades se mueven. Mínimo 1
  quantitat: { type: Number, required: true, min: 1 },
  // Motivo del movimiento: solo 'compra', 'venda' o 'devolucio'
  motiu: { type: String, required: true, enum: ['compra', 'venda', 'devolucio'] },
  // Fecha del movimiento. Por defecto la de ahora
  data: { type: Date, default: Date.now },
});

// Índice para buscar rápido los movimientos de un producto, los más nuevos primero (-1)
movimentEstocSchema.index({ producteId: 1, data: -1 });

// Creamos y exportamos el modelo 'MovimentEstoc'
module.exports = mongoose.model('MovimentEstoc', movimentEstocSchema);
