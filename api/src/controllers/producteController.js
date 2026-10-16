const producteService = require('../services/producteService');
const createProducte = async (req, res) => {
    try {
        const producte = await producteService.createProducte(req.body);
        res.status(201).json({status: 'success', data: producte});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
}

const getProducte = async (req, res) => {
    try {
        const producte = await producteService.getProducte(req.params.id);
        if (!producte) {
            return res.status(404).json({status: 'error', message: 'Producte not found'});
        }
        res.status(200).json({status: 'success', data: producte});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const getProductes = async (req, res) => {
    try {
        const productes = await producteService.getProductes();
        res.status(200).json({status: 'success', data: productes});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
}

const updateProducte = async (req, res) => {
    try {
        const producte = await producteService.updateProducte(req.params.id, req.body);
        if (!producte) {
            return res.status(404).json({status: 'error', message: 'Producte not found'});
        }
        res.status(200).json({status: 'success', data: producte});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
}

const deleteProducte = async (req, res) => {
    try {
        const producte = await producteService.deleteProducte(req.params.id);
        if (!producte) {
            return res.status(404).json({status: 'error', message: 'Producte not found'});
        }
        res.status(200).json({status: 'success', message: 'Producte deleted successfully'});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

module.exports = {
    createProducte,
    getProducte,
    getProductes,
    updateProducte,
    deleteProducte
};