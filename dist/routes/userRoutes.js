import express from 'express';
import User from '../models/User.js'; 
const router = express.Router();
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get a user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Update a user
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete a user (and their thoughts)
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and their thoughts deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Add a friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        user.friends.push(friend._id);
        friend.friends.push(user._id);
        await user.save();
        await friend.save();
        res.json({ message: 'Friend added' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        user.friends.pull(friend._id);
        friend.friends.pull(user._id);
        await user.save();
        await friend.save();
        res.json({ message: 'Friend removed' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
