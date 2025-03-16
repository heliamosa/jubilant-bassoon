import express from 'express';
import { Types } from 'mongoose';
import Thought from '../models/Thought.js';
const router = express.Router();
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        const newReaction = {
            reactionId: new Types.ObjectId(),
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: new Date(),
        };
        thought.reactions.push(newReaction);
        await thought.save();
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        thought.reactions = thought.reactions.filter((reaction) => reaction.reactionId.toString() !== req.params.reactionId);
        await thought.save();
        res.json({ message: 'Reaction removed', thought });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
