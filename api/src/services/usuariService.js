const Usuari = require('../models/Usuari');

const getUsuari = async (id) => {
    return await Usuari.findById(id).select('-password'); // Exclou la contrasenya de la resposta
}

const getUsuaris = async () => {
    return await Usuari.find().select('-password'); // Exclou la contrasenya de la resposta
}

const createUsuari = async (dades) => {
    const newUsuari = new Usuari(dades);
    const guardat = await newUsuari.save();
    const resultat = guardat.toObject();
    delete resultat.password; // Exclou la contrasenya de la resposta
    return resultat;
}

const updateUsuari = async (id, dades) => {
    return await Usuari.findByIdAndUpdate(id, dades, {
        new: true,
        runValidators: true
    }.select('-password')); // Exclou la contrasenya de la resposta
};

const deleteUsuari = async (id) => {
    return await Usuari.findByIdAndDelete(id);
};

module.exports = {
    getUsuari,
    getUsuaris,
    createUsuari,
    updateUsuari,
    deleteUsuari
};