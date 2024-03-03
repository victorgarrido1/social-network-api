const { User, Thought } = require("../models");

module.exports = {
  //get all
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////
  async getOneThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughts) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Update a course
    async updateThought(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },


      async addReaction(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push:{ reactions: req.body }},
            { runValidators: true, new: true }
          );
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async deleteReaction(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionID: req.params.reactionID}}},
            { runValidators: true, new: true }
          );
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    }
    Router.router('/sdfg', (res))