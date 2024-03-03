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
    }
};

module.exports = getUsers;
