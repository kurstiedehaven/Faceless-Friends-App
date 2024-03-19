const { User, Thought } = require("../models");

module.exports = {
  // GET USERS
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-__v");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET USER BY ID
  getSingleUser: async (req, res) => {
    try {
      // Populate 'thoughts' & 'friends' array, when retrieving single User data.
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No User found with id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // CREATE NEW USER
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      // Send HTTP status 201: Created
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // UPDATE USER BY ID
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user was found with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
    },

  // DELETE USER BY ID
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "No user was found with this id." });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      await User.deleteOne({ _id: userId });

      res.status(200).json({ message: "User successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // ADD NEW FRIEND TO USER'S FRIEND LIST
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user was found with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // REMOVE FRIEND FROM USER'S FRIEND LIST
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user was found with this id." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
