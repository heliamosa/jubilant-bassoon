import User from '../models/User.js';
// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Create a new user
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Update a user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser)
            return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
