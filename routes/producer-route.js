const express = require("express");
const router = express.Router();
const ProducersController = require('../controllers/producer-controller');
const Login = require('../middleware/login');

router.get('/', Login, ProducersController.getAll);
router.post('/', Login, ProducersController.postProducer);
router.get('/:producerId', Login, ProducersController.getOne);
router.patch('/:producerId', Login, ProducersController.updateProducer);
router.delete('/:producerId', Login, ProducersController.deleteProducer);

module.exports = router;