const Producte = require('../models/Producte');
const AppError = require('../utils/AppError');

const noTrobat = () => new AppError(404, 'NOT_FOUND', 'Producte no trobat');

const createProducte = async (producteData) => {
  const newProducte = new Producte(producteData);
  return await newProducte.save();
};

const getProducte = async (id) => {
  const producte = await Producte.findById(id).populate('categoriaId', 'nom slug');
  if (!producte) throw noTrobat();
  return producte;
};

const getProductes = async () => {
  return await Producte.find().populate('categoriaId', 'nom slug');
};

const updateProducte = async (id, dades) => {
  const producte = await Producte.findByIdAndUpdate(id, dades, {
    new: true,
    runValidators: true,
  });
  if (!producte) throw noTrobat();
  return producte;
};

const deleteProducte = async (id) => {
  const producte = await Producte.findByIdAndDelete(id);
  if (!producte) throw noTrobat();
};

module.exports = {
  createProducte,
  getProducte,
  getProductes,
  updateProducte,
  deleteProducte,
};