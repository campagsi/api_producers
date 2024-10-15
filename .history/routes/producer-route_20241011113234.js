const express = require("express");
const router = express.Router();
const PoducersController = require('../controllers/producer-controller');

router.get('/', PoducersController.getAll);
router.post('/', PoducersController.postProductor);
router.get('/:productorId', PoducersController.getOne);
router.patch('/:producerId', ProducersController.updateProductor);
router.delete('/:producerId', ProducersController.deleteProductor);

module.exports = router;