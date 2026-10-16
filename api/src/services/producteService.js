const Producte = require('../models/Producte');

const createProducte = async (producteData) => {
    const newProducte = new Producte(producteData);
    return await newProducte.save();   
};

const getProducte = async (id) => {
    return await Producte.findById(id);
}

const getProductes = async () => {
    return await Producte.find();
}

const updateProducte = async (id, dades) => {
    return await Producte.findByIdAndUpdate(id, dades, { 
        new: true,
        runValidators: true
    });
}

const deleteProducte = async (id) => {
    return await Producte.findByIdAndDelete(id);
}
    

module.exports = {
    createProducte,
    getProducte,
    getProductes,
    updateProducte,
    deleteProducte
};