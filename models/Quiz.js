const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true }, // Clear naming
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }, // Ensure this field exists
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  questions: [questionSchema], // Use the question schema
});

module.exports = mongoose.model("Quiz", quizSchema);
