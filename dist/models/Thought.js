import mongoose from 'mongoose';
const ThoughtSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{
            reactionBody: String,
            username: String,
            createdAt: { type: Date, default: Date.now }
        }]
}, { timestamps: true });
export default mongoose.model('Thought', ThoughtSchema);
