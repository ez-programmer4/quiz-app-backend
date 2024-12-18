const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", ProgressSchema);
