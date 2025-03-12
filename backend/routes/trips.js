// routes/trips.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.post('/', async (req, res) => {
  const { userId, location, noOfDays, budget, travelType, itinerary } = req.body;
  try {
    // Validate inputs
    if (!userId || !location || !noOfDays || !budget || !travelType || !itinerary) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the trip
    const trip = new Trip({
      userId,
      location,
      noOfDays,
      budget,
      travelType,
      itinerary,
    });
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ message: 'Error saving trip' });
  }
});

module.exports = router;