const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  courtId: { type: String, required: true, unique: true },
  courtNumber: { type: String, required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  numberOfSlots: { type: Number, required: true },
  isCourtFull: { type: Boolean, required: true },
  bookedSlots: {
    type: Map,
    of: {
      bookingId: { type: String },
      bookedDates: [String],
      price: { type: Number }
    }
  },
  availableSlots: {
    type: Map,
    of: {
      bookingId: { type: String },
      bookedDates: [String],
      price: { type: Number }
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Court', courtSchema);
