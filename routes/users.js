// backend/routes/users.js

const express = require('express');
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// Add new user
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // Ensure this returns an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get claim history for a user
router.get('/:userId/claim-history', async (req, res) => {
  const { userId } = req.params;
  try {
    // Replace this with your actual logic to fetch claim history
    const user = await User.findById(userId).populate('claimHistory'); // Assuming 'claimHistory' is a field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.claimHistory);
  } catch (error) {
    console.error('Error fetching claim history:', error);
    res.status(500).json({ message: 'Error fetching claim history' });
  }
});

module.exports = router;
