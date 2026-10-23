// Importamos mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

// Molde de los datos de un usuario de la tienda
const usuariSchema = new mongoose.Schema(
  {
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
        // Mensaje de error; missatge.value es el email que se ha intentado guardar
        message: (missatge) => `${missatge.value} no és un email vàlid`,
      },
    },
    // Hash de la contraseña (bcrypt). Nunca se guarda la contraseña en texto plano
    passwordHash: { type: String, required: true },
    // Rol: 'client' o 'admin'. Por defecto todos son 'client'
    rol: { type: String, enum: ['client', 'admin'], default: 'client' },
    // Usuario activo. En lugar de borrarlo, se desactiva (baja lógica)
    actiu: { type: Boolean, default: true },
  },
  // timestamps: Mongoose añade solo createdAt (fecha de alta) y updatedAt (última modificación)
  { timestamps: true }
);

// Cada vez que un usuario se convierte a JSON (res.json), se quita el hash y __v
usuariSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

// Creamos y exportamos el modelo 'Usuari'
module.exports = mongoose.model('Usuari', usuariSchema);