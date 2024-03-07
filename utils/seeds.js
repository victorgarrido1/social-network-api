//seeds import
const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

//Connection needs to be applied
const connection = require("../config/connection");

//seed data
const user = [
  {
    username: "Sam",
    email: "sam@gmail.com",
    thought: [],
  },
];

//Connection to server
connection.once("open", async () => {
  console.log("connected");

  //Drop existing users
  await User.deleteMany({});

  //Add seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seed complete!");
  process.exit(0);
});
