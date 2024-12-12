const User = require("../models/User");
const Progress = require("../models/Progress"); // Ensure Progress is imported if used

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("progress");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id; // Get user ID from route parameter
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId).populate("progress");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
