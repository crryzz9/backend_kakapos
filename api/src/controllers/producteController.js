const producteService = require('../services/producteService');

const createProducte = async (req, res, next) => {
  try {
    const producte = await producteService.createProducte(req.body ?? {});
    res.status(201).json({ success: true, data: producte });
  } catch (error) {
    next(error);
  }
};

const getProductes = async (req, res, next) => {
  try {
    const productes = await producteService.getProductes();
    res.status(200).json({ success: true, data: productes });
  } catch (error) {
    next(error);
  }
};

const getProducte = async (req, res, next) => {
  try {
    const producte = await producteService.getProducte(req.params.id);
    res.status(200).json({ success: true, data: producte });
  } catch (error) {
    next(error);
  }
};

const updateProducte = async (req, res, next) => {
  try {
    const producte = await producteService.updateProducte(req.params.id, req.body ?? {});
    res.status(200).json({ success: true, data: producte });
  } catch (error) {
    next(error);
  }
};

const deleteProducte = async (req, res, next) => {
  try {
    await producteService.deleteProducte(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProducte,
  getProductes,
  getProducte,
  updateProducte,
  deleteProducte,
};