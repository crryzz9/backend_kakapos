const Usuari = require('../models/Usuari');

const getUsuari = async (req, res) => {
    try {
        const usuari = await usuariService.getUsuari(req.params.id);
        if (!usuari) {
            return res.status(404).json({status: 'error', message: 'Usuari not found'});
        }
        res.status(200).json({status: 'success', data: usuari});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const getUsuaris = async (req, res) => {
    try {
        const usuaris = await usuariService.getUsuaris();
        res.status(200).json({status: 'success', data: usuaris});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const createUsuari = async (req, res) => {
    try {
        const usuari = await usuariService.createUsuari(req.body);
        res.status(201).json({status: 'success', data: usuari});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const updateUsuari = async (req, res) => {
    try {
        const usuari = await usuariService.updateService(req.params.id, req.body);
        if (!usuari) {
            return res.status(404).json({status: 'error', message: 'Usuari not found'});
        }
        res.status(200).json({status: 'success', data: usuari});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const deleteUsuari = async (req, res) => {
    try{
        const usuari = await usuariService.deleteUsuari(req.params.id);
        if (!usuari) {
            return res.status(404).json({status: 'error', message: 'Usuari not found'});
        }
        res.status(200).json({status: 'success', message: 'Usuari deleted successfully'});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

module.exports = {
    getUsuari,
    getUsuaris,
    createUsuari,
    updateUsuari,
    deleteUsuari
};