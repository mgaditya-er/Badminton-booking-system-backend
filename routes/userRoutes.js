const express = require('express');
const { sendOtp, verifyOtp, isUserLoggedIn, logout } = require('../controllers/userController');
const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to verify OTP and generate JWT token
router.post('/verify-otp', verifyOtp);

// Route to check if user is logged in (based on JWT token)
router.get('/is-logged-in', isUserLoggedIn);

// route to log out user
router.post('/logout', logout);

module.exports = router;
