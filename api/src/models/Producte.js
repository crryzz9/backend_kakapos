// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un producto de la tienda
const producteSchema = new mongoose.Schema({
  // Nombre: obligatorio, entre 2 y 100 caracteres
  nom: { type: String, required: true, minlength: 2, maxlength: 100 },
  // Descripción: opcional, máximo 500 caracteres
  descripcio: { type: String, maxlength: 500 },
  // Precio del producto
  preu: {
    type: Number,
    required: true,
    min: 0, // no puede ser negativo
    // Validación propia: comprobamos que el precio no tenga más de 2 decimales
    // Multiplicamos por 100 y miramos si da un número entero (ej: 9.99 * 100 = 999 -> OK)
    // Se usa 1e-9 (un número muy pequeño) porque los decimales en JavaScript no son exactos
    validate: {
      validator: (v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-9,
      message: 'El preu no pot tenir més de 2 decimals', // mensaje si falla
    },
  },
  // Unidades que hay en el almacén
  estoc: {
  type: Number,
  required: true,
  min: 0,     // no puede ser negativo
  default: 0, // si no se pone, empieza en 0
  // Validación propia: el estoc tiene que ser un número entero (no puedes tener 2.5 unidades)
  validate: {
    validator: Number.isInteger,
    message: "L'estoc ha de ser un nombre enter",
  },
  },
  // Categoría del producto (relación con 'Categoria'). Obligatoria
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  // Proveedor del producto (relación con 'Proveidor'). Opcional
  proveidorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveidor' },
});

// Índices para que las búsquedas por nombre y por categoría vayan más rápido
producteSchema.index({ nom: 1 });
producteSchema.index({ categoriaId: 1 });

// Creamos y exportamos el modelo 'Producte'
module.exports = mongoose.model('Producte', producteSchema);
