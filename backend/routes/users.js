// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { googleId, name, email, picture } = req.body;
  try {
    let user = await User.findOne({ googleId });
    if (user) {
      // Update existing user
      user.name = name;
      user.email = email;
      user.picture = picture;
      await user.save();
    } else {
      // Create new user
      user = new User({ googleId, name, email, picture });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user' });
  }
});

module.exports = router;