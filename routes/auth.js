const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

// Login
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

// Register
router.get('/register', authController.getRegister)
router.post('/register', authController.postRegister);

// forgot password
router.get('/forgot_password', authController.getForgotPassword);
router.post('/forgot_password', authController.postForgotPassword);

// new password
router.post('/new_password', authController.postNewPassword);

// log out
router.get('/logout', authController.logout);

module.exports = router;