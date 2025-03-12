const mongoose = require('mongoose');
const { Schema } = mongoose;
const Reaction = require('./Reaction');  // Import the Reaction schema

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toISOString()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction.schema] // Use the Reaction schema as a subdocument
  },
  {
    timestamps: true
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
