const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Get current active challenge
router.get('/', async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new challenge (deactivates old ones)
router.post('/', async (req, res) => {
  try {
    await Challenge.updateMany({}, { isActive: false });
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.json({ success: true, challenge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update challenge
router.put('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, challenge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete challenge
router.delete('/:id', async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;