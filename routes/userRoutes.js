const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/signup', userController.signupUser); // User signup
router.post('/login', userController.loginUser); // User login

module.exports = router;
