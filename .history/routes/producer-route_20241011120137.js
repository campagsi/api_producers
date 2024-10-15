const express = require("express");
const router = express.Router();
const ProducersController = require('../controllers/producer-controller');

router.get('/', PoducersController.getAll);
router.post('/', PoducersController.postProducer);
router.get('/:productorId', PoducersController.getOne);
router.patch('/:producerId', ProducersController.updateProducer);
router.delete('/:producerId', ProducersController.deleteProducer);

module.exports = router;