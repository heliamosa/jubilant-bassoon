import Thought from '../models/Thought.js';
// Get all thoughts
export const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Create a new thought
export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Delete a thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
