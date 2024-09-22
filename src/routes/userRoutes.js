const express = require('express');
const userController = require('../controllers/users/userController');
const jwt = require('../utils/jwtUtils');

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/profile', jwt.verifyToken, userController.getUserProfile);

router.put('/profile', jwt.verifyToken, userController.updateUserProfile);

router.delete('/profile', jwt.verifyToken, userController.deleteUser);

router.get('/', jwt.verifyToken, userController.getAllUsers);

module.exports = router;
