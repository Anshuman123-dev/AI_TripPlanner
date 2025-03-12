// // routes/trips.js
// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');

// router.post('/', async (req, res) => {
//   const { userId, location, noOfDays, budget, travelType, itinerary } = req.body;
//   try {
//     // Validate inputs
//     if (!userId || !location || !noOfDays || !budget || !travelType || !itinerary) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Create and save the trip
//     const trip = new Trip({
//       userId,
//       location,
//       noOfDays,
//       budget,
//       travelType,
//       itinerary,
//     });
//     await trip.save();

//     res.status(200).json(trip);
//   } catch (error) {
//     console.error('Error saving trip:', error);
//     res.status(500).json({ message: 'Error saving trip' });
//   }
// });

// // Add to routes/trips.js
// router.get('/user/:userId', async (req, res) => {
//   try {
//       const trips = await Trip.find({ userId: req.params.userId })
//           .sort({ createdAt: -1 })
//           .populate('userId', 'name email picture') // Optional: populate user details
//           .exec();
//       res.status(200).json(trips);
//   } catch (error) {
//       console.error('Error fetching trips:', error);
//       res.status(500).json({ message: 'Error fetching trips' });
//   }
// });

// module.exports = router;




// routes/trips.js
// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');

// router.post('/', async (req, res) => {
//   const { userId, location, noOfDays, budget, travelType, itinerary } = req.body;
//   try {
//     // Validate inputs
//     if (!userId || !location || !noOfDays || !budget || !travelType || !itinerary) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Create and save the trip
//     const trip = new Trip({
//       userId,
//       location,
//       noOfDays,
//       budget,
//       travelType,
//       itinerary,
//     });
//     await trip.save();
    
//     res.status(200).json(trip);
//   } catch (error) {
//     console.error('Error saving trip:', error);
//     res.status(500).json({ message: 'Error saving trip' });
//   }
// });

// // Route to get user trips
// router.get('/user/:userId', async (req, res) => {
//   console.log(`Received request for user trips with ID: ${req.params.userId}`);
//   try {
//     console.log('Attempting to find trips in database');
//     const trips = await Trip.find({ userId: req.params.userId })
//       .sort({ createdAt: -1 })
//       .populate('userId', 'name email picture')
//       .exec();
    
//     console.log(`Found ${trips.length} trips for user`);
//     res.status(200).json(trips);
//   } catch (error) {
//     console.error('Error fetching trips:', error);
//     res.status(500).json({ message: 'Error fetching trips' });
//   }
// });

// module.exports = router;






const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Existing POST route
router.post('/', async (req, res) => {
  const { userId, location, noOfDays, budget, travelType, itinerary } = req.body;
  try {
    if (!userId || !location || !noOfDays || !budget || !travelType || !itinerary) {
      return res.status(400).json({ message: 'All fields are required' });
    }
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

// Existing GET route for user trips
router.get('/user/:userId', async (req, res) => {
  console.log(`Received request for user trips with ID: ${req.params.userId}`);
  try {
    console.log('Attempting to find trips in database');
    const trips = await Trip.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email picture')
      .exec();
    console.log(`Found ${trips.length} trips for user`);
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// New GET route to fetch a single trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

module.exports = router;