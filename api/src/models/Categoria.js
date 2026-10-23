const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'El nom és obligatori'],
      trim: true,
      minlength: [3, 'El nom ha de tenir mínim 3 caràcters'],
    },
    slug: {
      type: String,
      required: [true, 'El slug és obligatori'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    descripcio: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripció no pot passar de 500 caràcters'],
    },
    actiu: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categoria', categoriaSchema);