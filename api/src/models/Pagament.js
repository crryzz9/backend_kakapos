// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un pago
const pagamentSchema = new mongoose.Schema({
  // Pedido que se paga (relación con 'Comanda')
  // unique: true -> cada pedido solo puede tener UN pago
  comandaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comanda', required: true, unique: true },
  // Cómo se paga: solo 'targeta', 'paypal' o 'transferencia'
  metode: { type: String, required: true, enum: ['targeta', 'paypal', 'transferencia'] },
  // Estado del pago: 'pendent', 'pagat' o 'reemborsat' (devuelto). Por defecto 'pendent'
  estat: { type: String, enum: ['pendent', 'pagat', 'reemborsat'], default: 'pendent' },
  // Cantidad de dinero pagada. No puede ser negativa
  import: { type: Number, required: true, min: 0 },
  // Fecha del pago. Por defecto la de ahora
  data: { type: Date, default: Date.now },
});

// Creamos y exportamos el modelo 'Pagament'
module.exports = mongoose.model('Pagament', pagamentSchema);
