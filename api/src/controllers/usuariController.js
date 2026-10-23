const usuariService = require('../services/usuariService');

const createUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.createUsuari(req.body ?? {});
    res.status(201).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

const getUsuaris = async (req, res, next) => {
  try {
    const resultat = await usuariService.getUsuaris(req.query);
    res.status(200).json({ success: true, ...resultat });
  } catch (error) {
    next(error);
  }
};

const getUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.getUsuari(req.params.id);
    res.status(200).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

const updateUsuari = async (req, res, next) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body ?? {});
    res.status(200).json({ success: true, data: usuari });
  } catch (error) {
    next(error);
  }
};

// Baja lógica: sin cuerpo en la respuesta (204)
const deleteUsuari = async (req, res, next) => {
  try {
    await usuariService.deleteUsuari(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUsuari,
  getUsuaris,
  getUsuari,
  updateUsuari,
  deleteUsuari,
};