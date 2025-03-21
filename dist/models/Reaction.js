"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;
// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => createdAtVal.toISOString() // Use getter to format date
    }
}, {
    timestamps: true
});
const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;
