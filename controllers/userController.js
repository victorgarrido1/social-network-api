const { User, Thought } = require("../models");

const getUsers = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            //.populate({path: "thoughts", select "-__v"})
            //.populate({path: "friends", select "-__v"})
            
            return res.status(200).json(users);
        } catch (err) {
            console.error("Error getting users:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.username });
            //.populate({ path: "thoughts", select "-__v"})
            //.populate({ path: "friends", select "-__v"});
            
            if (!user) { 
                return res.status(404).json({ message: "No user with that ID" });        
            }
            
            return res.status(200).json(user);
        } catch (err) {
            console.error("Error getting user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    //Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    updateUser: async (req, res) => {
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
            console.error(err);
            return res.status(500).json(err);
        }
    },

    //Delete a user here
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
    
            if (!user) {
                return res.status(404).json({ message: "No user with this ID" });
            }
    
            // Also delete the thoughts associated with the user
            await Thought.deleteMany({ username: user._id });
    
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    //adding a friend here
    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },


      //delete a friend 
        deleteFriend({ params }, res {
            User.findOneAndUpdate(
                {_id: params.userId },
                { $pull: }
            )
        })
};

module.exports = getUsers;
