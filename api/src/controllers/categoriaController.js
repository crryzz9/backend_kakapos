const categoriaService = require('../services/categoriaService');

const getCategories = async (req, res, next) => {
  try {
    const resultat = await categoriaService.getCategories(req.query);
    res.status(200).json({ success: true, ...resultat });
  } catch (error) {
    next(error);
  }
};

const getCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.getCategoria(req.params.id);
    res.status(200).json({ success: true, data: categoria });
  } catch (error) {
    next(error);
  }
};

const createCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.createCategoria(req.body);
    res.status(201).json({ success: true, data: categoria });
  } catch (error) {
    next(error);
  }
};

const updateCategoria = async (req, res, next) => {
  try {
    const categoria = await categoriaService.updateCategoria(req.params.id, req.body);
    res.status(200).json({ success: true, data: categoria });
  } catch (error) {
    next(error);
  }
};

const deleteCategoria = async (req, res, next) => {
  try {
    await categoriaService.deleteCategoria(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getCategories,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};