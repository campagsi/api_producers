const express = require("express");
const router = express.Router();
const PoducersController = require('../controllers/producer-controller');

router.get('/', PoducersController.getAll);
router.post('/', PoducersController.postProductor);
router.get('/:productorId', PoducersController.getOne);
router.patch('/:producerId', ProductsController.updateProductor);
router.delete('/:producerId', ProductsController.deleteProductor);

module.exports = router;