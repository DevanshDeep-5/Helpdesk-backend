const express = require('express');
const router = express.Router();
const Knowledge = require('../models/Knowledge');

// GET /api/knowledge - fetch all knowledge entries
router.get('/', async (req, res) => {
  try {
    const items = await Knowledge.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching knowledge:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/knowledge - create a new knowledge entry
router.post('/', async (req, res) => {
  try {
    const { inquiry, response, saveTo, expiration, autocomplete } = req.body;

    if (!inquiry || !response) {
      return res.status(400).json({ error: 'Inquiry and response are required' });
    }

    const newEntry = new Knowledge({
      inquiry,
      response,
      saveTo,
      expiration,
      autocomplete,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving knowledge:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
