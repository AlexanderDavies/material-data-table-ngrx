const express = require('express')

const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');

const router = express.Router();

router.get('', userMiddleware.getUsers, userController.getUsers);

router.post('', userMiddleware.createUser, userController.createUser);

module.exports = router;
