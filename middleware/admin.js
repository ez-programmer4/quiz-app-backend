const User = require("../models/User");

const isAdmin = (req, res, next) => {
  console.log("User in isAdmin middleware:", req.user); // Log the user object

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id; // Get user ID from the decoded token

  // Check if the user is an admin in your database
  User.findById(userId)
    .then((user) => {
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied." });
      }
      next();
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = isAdmin;
