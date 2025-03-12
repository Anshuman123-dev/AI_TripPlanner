// routes/ai.js
const express = require('express');
const router = express.Router();
const AiOutput = require('../models/AiOutput');
const Trip = require('../models/Trip');

// Save raw AI output first, then process it
router.post('/save-output', async (req, res) => {
  const { tripId, rawResponse } = req.body;
  
  try {
    // Validate input
    if (!tripId || !rawResponse) {
      return res.status(400).json({ message: 'Trip ID and AI response are required' });
    }
    
    // Check if the trip exists
    const tripExists = await Trip.findById(tripId);
    if (!tripExists) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    // Create a new AI output record
    const aiOutput = new AiOutput({
      tripId,
      rawResponse,
      status: 'pending'
    });
    
    await aiOutput.save();
    
    // Process the raw response (parse JSON if possible)
    try {
      const parsedData = JSON.parse(rawResponse);
      aiOutput.parsedData = parsedData;
      aiOutput.status = 'processed';
      await aiOutput.save();
      
      // Update the trip with the processed AI output
      await Trip.findByIdAndUpdate(tripId, { 
        itinerary: parsedData,
      });
      
      return res.status(200).json({ 
        message: 'AI output saved and processed successfully',
        aiOutput
      });
    } catch (parseError) {
      // If JSON parsing fails, update status to failed
      aiOutput.status = 'failed';
      await aiOutput.save();
      
      return res.status(200).json({ 
        message: 'AI output saved but failed to parse',
        error: parseError.message,
        aiOutput
      });
    }
  } catch (error) {
    console.error('Error saving AI output:', error);
    res.status(500).json({ message: 'Error saving AI output', error: error.message });
  }
});

// Get AI outputs for a specific trip
router.get('/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const aiOutputs = await AiOutput.find({ tripId }).sort({ createdAt: -1 });
    
    res.status(200).json(aiOutputs);
  } catch (error) {
    console.error('Error fetching AI outputs:', error);
    res.status(500).json({ message: 'Error fetching AI outputs', error: error.message });
  }
});

module.exports = router;