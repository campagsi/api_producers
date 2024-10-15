const express = require("express");
const router = express.Router();
const PoducersController = require('../controllers/producer-controller');

router.get('/', PoducersController.getAll);
router.post('/', PoducersController.postProducer);
router.get('/:productorId', PoducersController.getOne);
router.patch('/:producerId', PoducersController.updateProducer);
router.delete('/:producerId', PoducersController.deleteProducer);

module.exports = router;