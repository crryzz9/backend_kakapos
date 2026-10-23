const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getUsuaris);
router.get('/:id', usuariController.getUsuari);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
