// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de una comanda (un pedido)
const comandaSchema = new mongoose.Schema({
  // Fecha del pedido. Si no se pone, se usa la fecha de ahora
  data: { type: Date, default: Date.now },
  // Estado del pedido: solo 'pendent', 'enviat' o 'entregat'. Por defecto 'pendent'
  estat: { type: String, enum: ['pendent', 'enviat', 'entregat'], default: 'pendent' },
  // Precio total del pedido. Obligatorio y no puede ser negativo
  total: { type: Number, required: true, min: 0 },
  // Usuario que ha hecho el pedido (relación con 'Usuari')
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  // Dirección a la que se envía el pedido (relación con 'Adreca')
  adrecaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adreca', required: true },
});

// Índice para buscar más rápido los pedidos de un usuario
// 1 = orden ascendente, -1 = descendente (los pedidos más nuevos primero)
comandaSchema.index({ usuariId: 1, data: -1 });

// Creamos y exportamos el modelo 'Comanda'
module.exports = mongoose.model('Comanda', comandaSchema);
