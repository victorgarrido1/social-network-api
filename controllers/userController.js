const { User, Thought } = require("../models");

const getUsers = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      return res.status(200).json(users);
    } catch (err) {
      console.error("Error getting users:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error("Error getting user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      await Thought.deleteMany({ username: user._id });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this ID" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error("Error adding friend:", err);
      return res.status(400).json({ error: "Bad request" });
    }
  },

  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this ID" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error("Error deleting friend:", err);
      return res.status(400).json({ error: "Bad request" });
    }
  },
};

module.exports = getUsers;
