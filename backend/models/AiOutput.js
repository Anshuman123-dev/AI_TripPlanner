// models/AiOutput.js
const mongoose = require('mongoose');

const aiOutputSchema = new mongoose.Schema({
  tripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip',
    required: true 
  },
  rawResponse: { 
    type: String, 
    required: true 
  },
  parsedData: { 
    type: Object 
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'failed'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('AiOutput', aiOutputSchema);