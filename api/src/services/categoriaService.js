const Categoria = require('../models/Categoria');
const Producte = require('../models/Producte');
const AppError = require('../utils/AppError');
const { llistarPaginat } = require('../utils/consulta');

const noTrobada = () => new AppError(404, 'NOT_FOUND', 'Categoria no trobada');

const getCategories = async (query) => {
  return await llistarPaginat(Categoria, query, {
    campsOrdenables: ['nom', 'slug', 'createdAt'],
    ordenacioPerDefecte: { createdAt: -1 },
  });
};

const getCategoria = async (id) => {
  return await Categoria.findById(id);
};

const createCategoria = async (dades) => {
  const novaCategoria = new Categoria(dades);
  return await novaCategoria.save();
};

const updateCategoria = async (id, dades) => {
  return await Categoria.findByIdAndUpdate(id, dades, {
    new: true,
    runValidators: true,
  });
};

const deleteCategoria = async (id) => {
  return await Categoria.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};