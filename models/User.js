const mongoose = require("mongoose");

// Schema to create User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email address",
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // default behavior applies "getters: true"
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Return length of user's friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize User model
const User = mongoose.model("user", userSchema);

module.exports = User;
