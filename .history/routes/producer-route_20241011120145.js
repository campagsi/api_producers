const express = require("express");
const router = express.Router();
const ProducersController = require('../controllers/producer-controller');

router.get('/', ProducersController.getAll);
router.post('/', ProducersController.postProducer);
router.get('/:productorId', PoducersController.getOne);
router.patch('/:producerId', ProducersController.updateProducer);
router.delete('/:producerId', ProducersController.deleteProducer);

module.exports = router;