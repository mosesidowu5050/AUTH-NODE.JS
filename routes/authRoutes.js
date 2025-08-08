const express = require('express');
const router = express.Router(); 
const authController = require('../controller/authController'); 
const jwtToken = require('../middleware/jwtToken'); 

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/profile', jwtToken.protect, authController.getProfile);

module.exports = router;
