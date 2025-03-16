import User from '../models/User.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
export const createUser = async (/** @type {{ body: any; }} */ req, /** @type {{ json: (arg0: import("mongoose").Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate; } & { username: string; email: string; thoughts: import("mongoose").Types.ObjectId[]; friends: import("mongoose").Types.ObjectId[]; }> & { createdAt: NativeDate; updatedAt: NativeDate; } & { username: string; email: string; thoughts: import("mongoose").Types.ObjectId[]; friends: import("mongoose").Types.ObjectId[]; } & { _id: import("mongoose").Types.ObjectId; } & { __v: number; }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; }} */ res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
export const deleteUser = async (/** @type {{ params: { userId: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message?: string; error?: any; }): void; new (): any; }; }; json: (arg0: { message: string; }) => void; }} */ res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
