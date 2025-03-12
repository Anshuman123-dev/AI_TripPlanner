// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  noOfDays: { type: Number, required: true },
  budget: { type: String, required: true },
  travelType: { type: String, required: true },
  itinerary: { type: Object, required: true }, // Stores the full trip data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema);