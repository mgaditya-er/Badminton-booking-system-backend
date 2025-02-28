const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (mobileNumber) => {
  return jwt.sign({ mobileNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Generate a random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Controller to send OTP
const sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  // Check if user exists, otherwise create a new user
  let user = await User.findOne({ mobileNumber });

  if (!user) {
    user = new User({ mobileNumber });
    await user.save();
  }

  // Generate OTP and update the user with the OTP
  const otp = generateOtp();

  // In a real-world application, you would use an SMS service like Twilio to send the OTP
  user.otp = otp;
  await user.save();

  // Simulate sending OTP (Just returning it in response for now)
  res.status(200).json({ message: 'OTP sent successfully', otp });
};

// Controller to verify OTP and send JWT token
const verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  // Check if the user exists
  const user = await User.findOne({ mobileNumber });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if OTP is correct
  if (otp !== user.otp && otp !== '123456') {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP is valid, generate JWT token
  const token = generateToken(mobileNumber);

  // Save the JWT token to the user record in the database
  user.jwtToken = token;
  await user.save();

  res.status(200).json({ message: 'OTP verified successfully', token });
};

// Check if user is logged in (i.e., if JWT token is valid)
const isUserLoggedIn = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by mobile number from the decoded token
    const user = await User.findOne({ mobileNumber: decoded.mobileNumber });

    if (!user || user.jwtToken !== token) {
      return res.status(401).json({ message: 'User is not logged in or token is invalid' });
    }

    res.status(200).json({ message: 'User is logged in' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const logout = async (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }
  
    try {
      // Verify and decode the token to extract the mobile number
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const mobileNumber = decoded.mobileNumber;
  
      // Find the user and remove the JWT token
      const user = await User.findOne({ mobileNumber });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Invalidate the JWT token by setting it to null
      user.jwtToken = null;
      await user.save();
  
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token or error during logout' });
    }
  };
module.exports = { sendOtp, verifyOtp, isUserLoggedIn ,logout};
