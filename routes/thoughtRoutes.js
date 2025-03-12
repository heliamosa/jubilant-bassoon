const express = require('express');
const router = express.Router();
const { Types } = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');

// Add reaction to thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Add reaction with a unique ObjectId
    const newReaction = {
      reactionId: new Types.ObjectId(),  // Ensure a unique ID
      reactionBody: req.body.reactionBody,
      username: req.body.username,
      createdAt: new Date(),
    };

    thought.reactions.push(newReaction);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete reaction from thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove reaction by matching ObjectId
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== req.params.reactionId
    );

    await thought.save();
    res.json({ message: 'Reaction removed', thought });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
