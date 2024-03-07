const { Schema, model, Types } = require("mongoose");
// const dateFormat = require("../utils/dateFormat"); // Import dateFormat module

const reactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, // Make text field required
      minLength: 1, // Set minimum length for text field
      maxLength: 280, // Set maximum length for text field
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), // Apply dateFormat to createdAt
    },
    username: {
      type: String,
      required: true, // Make username field required
    },
    // Other fields...
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model("Thought", thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought;
