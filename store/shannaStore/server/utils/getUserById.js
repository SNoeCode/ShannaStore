const mongoose = require("mongoose");
const User = require("../models/user.Model");

const getUserById = async (userId) => {
  try {
    const formattedUserId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const user = await User.findOne({ userId: formattedUserId });

    return user || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

module.exports = { getUserById };