const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getUsuaris);
router.post('/registre', usuariController.registrarse);
router.post('/login', usuariController.login);
router.get('/:id', usuariController.getUsuari);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
