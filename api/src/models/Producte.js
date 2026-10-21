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
    validate: {
      validator: (v) => Number(v.toFixed(2)) === v,
      message: 'El preu no pot tenir més de 2 decimals y ha de ser positiu', // mensaje si falla
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


// Creamos y exportamos el modelo 'Producte'
module.exports = mongoose.model('Producte', producteSchema);
