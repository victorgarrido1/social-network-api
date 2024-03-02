const { Schema, mode, Types } = require('mongoose');
const dateF

const ThoughtSchema = new Schema({
  // Define your thought schema here
  text: String,
  // Other fields...
});

const Thought = model('Thought', ThoughtSchema);

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: "Username is required",
  },
  email: {
    type: String,
    required: "Email is required",
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought' // Reference to the Thought model
  }]
});

"thoughts": [
    {
        "_id": "234567",
        "thoughtText": "Here's a cool thought...",
        "username": "lernation",
        "createdAt": "June 9th, 2020 at 4:40pm"
    }
]

const User = model('User', UserSchema);

module.exports = { User, Thought };
