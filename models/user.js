const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String,  required: false, unique: true },
  username: { type: String,  required: false },
  userEmail: { type: String,  required: false },
  mobileNumber: { type: String, required: true, unique: true },
  otp: { type: String, default: '000000' },  // Static OTP
  jwtToken: { type: String },  // JWT Token for logged-in users
  bookedSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // Reference to bookings
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
