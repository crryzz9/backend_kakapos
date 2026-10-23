const bcrypt = require('bcryptjs');
const Usuari = require('../models/Usuari');
const AppError = require('../utils/AppError');
const { llistarPaginat } = require('../utils/consulta');

// Únicos campos que se aceptan desde el body. rol, actiu, passwordHash... quedan fuera
const CAMPS_PERMESOS = ['nom', 'email', 'password'];

// Coste del hash: más alto = más seguro pero más lento
const SALT_ROUNDS = 10;

const noTrobat = () => new AppError(404, 'NOT_FOUND', 'Usuari no trobat');

// Si el body trae algún campo que no está en la lista, se rechaza
const nomesCampsPermesos = (dades) => {
  const prohibits = Object.keys(dades).filter((camp) => !CAMPS_PERMESOS.includes(camp));
  if (prohibits.length > 0) {
    throw new AppError(
      400,
      'FIELD_NOT_ALLOWED',
      'Hi ha camps que no es poden enviar',
      prohibits.map((camp) => ({ field: camp, message: 'Camp no permès' }))
    );
  }
};

// Mínimo 12 caracteres. El máximo es 72 porque bcrypt solo lee los primeros 72
const validarPassword = (password) => {
  if (typeof password !== 'string' || password.length < 12 || password.length > 72) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Les dades no són vàlides', [
      { field: 'password', message: 'La contrasenya ha de tenir entre 12 i 72 caràcters' },
    ]);
  }
};

const createUsuari = async (dades) => {
  nomesCampsPermesos(dades);
  validarPassword(dades.password);
  const passwordHash = await bcrypt.hash(dades.password, SALT_ROUNDS);
  const nouUsuari = new Usuari({ nom: dades.nom, email: dades.email, passwordHash });
  return await nouUsuari.save();
};

const getUsuaris = async (query) => {
  return await llistarPaginat(Usuari, query, {
    campsOrdenables: ['nom', 'email', 'createdAt'],
    ordenacioPerDefecte: { createdAt: -1 },
  });
};

const getUsuari = async (id) => {
  const usuari = await Usuari.findById(id);
  if (!usuari) throw noTrobat();
  return usuari;
};

const updateUsuari = async (id, dades) => {
  nomesCampsPermesos(dades);
  const canvis = {};
  if (dades.nom !== undefined) canvis.nom = dades.nom;
  if (dades.email !== undefined) canvis.email = dades.email;
  if (dades.password !== undefined) {
    validarPassword(dades.password);
    canvis.passwordHash = await bcrypt.hash(dades.password, SALT_ROUNDS);
  }
  const usuari = await Usuari.findByIdAndUpdate(id, canvis, {
    new: true,
    runValidators: true,
  });
  if (!usuari) throw noTrobat();
  return usuari;
};

// Baja lógica: el usuario no se borra, solo se marca como inactivo
const deleteUsuari = async (id) => {
  const usuari = await Usuari.findByIdAndUpdate(id, { actiu: false }, { new: true });
  if (!usuari) throw noTrobat();
};


module.exports = {
    getUsuari,
    getUsuaris,
    createUsuari,
    updateUsuari,
    deleteUsuari
};