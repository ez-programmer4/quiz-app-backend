const express = require("express");
const {
  getUserProgress,
  deleteUserProgress,
} = require("../controllers/progressController");
const router = express.Router();

// Route to get user progress
router.get("/:userId", getUserProgress);

// Route to delete user progress
router.delete("/:id", deleteUserProgress);

module.exports = router;
