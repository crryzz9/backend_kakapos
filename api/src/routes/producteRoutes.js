const express = require('express');
const router = express.Router();
const producteController = require('../controllers/producteController');

router.post('/', producteController.createProducte);
router.get('/:id', producteController.getProducte);
router.get('/', producteController.getProductes);
router.put('/:id', producteController.updateProducte);
router.delete('/:id', producteController.deleteProducte);

module.exports = router;