import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

userSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// ✅ Use ES Module export
const User = mongoose.model('User', userSchema);
export default User;
