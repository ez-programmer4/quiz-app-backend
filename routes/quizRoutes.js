const express = require("express");
const isAdmin = require("../middleware/admin");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getQuizzesByCategory,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes, // Import the new function
} = require("../controllers/quizController");

// Existing routes
router.get("/category/:categoryId", getQuizzesByCategory);
router.get("/:quizId", getQuizById);
router.post("/", authenticate, isAdmin, createQuiz);
router.put("/:quizId", authenticate, isAdmin, updateQuiz);
router.delete("/:quizId", authenticate, isAdmin, deleteQuiz);

// New route for fetching all quizzes
router.get("/", getAllQuizzes); // Add this line

module.exports = router;
