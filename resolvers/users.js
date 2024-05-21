// resolvers/index.js
const User = require("../models/userModel");

const getUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw new Error("Error fetching users");
  }
};

const getUserByName = async (parent, args) => {
  try {
    return await User.findOne({ name: args.name });
  } catch (err) {
    throw new Error("Error fetching user");
  }
};

const addUser = async (parent, args) => {
  const user = new User({
    name: args.name,
    email: args.email,
    age: args.age,
  });
  try {
    return await user.save();
  } catch (err) {
    throw new Error("Error adding user");
  }
};

module.exports = {
  getUsers,
  getUserByName,
  addUser,
};
