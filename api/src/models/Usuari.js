// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un usuario de la tienda
const usuariSchema = new mongoose.Schema({
  // Nombre: obligatorio, entre 2 y 50 caracteres
  nom: { type: String, required: true, minlength: 2, maxlength: 50 },
  // Email del usuario
  email: {
    type: String,
    required: true,  // obligatorio
    unique: true,    // no puede haber dos usuarios con el mismo email
    lowercase: true, // se guarda siempre en minúsculas (PEPE@GMAIL.COM -> pepe@gmail.com)
    // Validación propia: comprueba con una expresión regular que tenga forma de email
    // y que la parte final (.com, .es...) tenga al menos 2 letras
    validate: {
    validator: (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v),
    // Mensaje de error; props.value es el email que se ha intentado guardar
    message: (props) => `${props.value} no és un email vàlid`,
  },
  },
  // Contraseña: obligatoria (lo normal es guardarla encriptada, no en texto plano)
  password: { type: String, required: true },
  // Rol: 'client' o 'admin'. Por defecto todos son 'client'
  rol: { type: String, enum: ['client', 'admin'], default: 'client' },
  // Fecha en la que se registró. Por defecto la de ahora
  dataRegistre: { type: Date, default: Date.now },
});

// Creamos y exportamos el modelo 'Usuari'
module.exports = mongoose.model('Usuari', usuariSchema);
