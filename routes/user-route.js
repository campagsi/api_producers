const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/user-controller');
const Login = require('../middleware/login');

router.post('/auth', UsersController.auth);
router.get('/', UsersController.getAll);
router.post('/cadastro', Login, UsersController.post);
router.get('/:userId', Login, UsersController.getOne);
router.patch('/:userId', Login, UsersController.update);
router.delete('/:userId', Login, UsersController.delete);

module.exports = router;