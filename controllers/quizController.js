const mongoose = require("mongoose"); // Import mongoose
const Quiz = require("../models/Quiz");

// Get quizzes by category
exports.getQuizzesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const quizzes = await Quiz.find({ categoryId: categoryId });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const { title, categoryId, questions } = req.body;

  if (!title || !categoryId || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: "All fields are required." });
  }

  for (const question of questions) {
    if (
      !question.questionText ||
      !question.options ||
      !question.correctAnswer
    ) {
      return res.status(400).json({
        message:
          "Each question must have a questionText, options, and a correctAnswer.",
      });
    }
    if (!Array.isArray(question.options) || question.options.length < 1) {
      return res.status(400).json({
        message: "Options must be an array with at least one option.",
      });
    }
    if (!question.options.includes(question.correctAnswer)) {
      return res
        .status(400)
        .json({ message: "correctAnswer must be one of the options." });
    }
  }

  try {
    const quiz = new Quiz({ title, categoryId, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { title, categoryId, questions } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Update fields
    if (title) quiz.title = title;
    if (categoryId) quiz.categoryId = categoryId;
    if (questions) quiz.questions = questions;

    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  // Validate quizId format
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(400).json({ message: "Invalid quiz ID format." });
  }

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }
    res.status(200).json({ message: "Quiz deleted successfully." });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
