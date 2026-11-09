const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');
const autenticar = require('../middleware/auth');

router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getUsuaris);
router.post('/registre', usuariController.registrarse);
router.post('/login', usuariController.login);
router.post('/refresh', usuariController.refresh);
router.post('/logout', usuariController.logout);
router.get('/perfil', autenticar, usuariController.perfil);
router.get('/:id', usuariController.getUsuari);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);


module.exports = router;
