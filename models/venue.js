const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueId: { type: String, required: true, unique: true },
  venueName: { type: String, required: true },
  venueAddress: { type: String, required: true },
  venueImageUrl: { type: String, required: true },
  amenities: [{ type: String, required: true }],
  startingPrice: { type: Number, required: true },
  morningSlotTiming: { type: String, required: true },
  eveningSlotTiming: { type: String, required: true },
  googleMapLink: { type: String, required: true },
  courts: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Court'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);
