const express = require('express');
const { sendOtp, verifyOtp, isUserLoggedIn, logout } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /users/send-otp:
 *   post:
 *     summary: Send OTP to a mobile number
 *     description: Sends an OTP to the given mobile number. If the user doesn't exist, it will create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 *                 otp:
 *                   type: string
 *                   example: "123456"
 *       400:
 *         description: Bad request if the mobile number is not provided or there is an issue sending OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mobile number is required"
 */
router.post('/send-otp', sendOtp);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP and generate JWT token
 *     description: Verifies the OTP for a given mobile number and returns a JWT token if the OTP is correct.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully, and JWT token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully"
 *                 token:
 *                   type: string
 *                   example: "your-jwt-token"
 *       400:
 *         description: Invalid OTP or mobile number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP"
 */
router.post('/verify-otp', verifyOtp);


router.get('/is-logged-in', isUserLoggedIn);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out the user
 *     description: Logs out the user by invalidating their JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "your-jwt-token"
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       400:
 *         description: Bad request if no token is provided or there is an error during logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 */
router.post('/logout', logout);

module.exports = router;
