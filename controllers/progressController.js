// controllers/progressController.js
const Result = require("../models/Result");
const Category = require("../models/Category");

exports.getUserProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progressData = await Result.find({ userId })
      .populate("quizId", "title") // Populate quiz title
      .populate("categoryId", "name") // Populate category name
      .sort({ date: -1 });

    if (!progressData.length) {
      return res
        .status(404)
        .json({ message: "No progress found for this user." });
    }

    res.status(200).json(progressData);
  } catch (error) {
    console.error("Error fetching progress data:", error);
    res.status(500).json({ message: "Error fetching progress data." });
  }
};

// New function to delete user progress
exports.deleteUserProgress = async (req, res) => {
  const { id } = req.params; // Assuming you're passing the progress ID in the URL

  try {
    const deletedProgress = await Result.findByIdAndDelete(id);

    if (!deletedProgress) {
      return res.status(404).json({ message: "Progress not found." });
    }

    res.status(200).json({ message: "Progress deleted successfully." });
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).json({ message: "Error deleting progress." });
  }
};

// Example function to save user progress
exports.saveUserProgress = async (req, res) => {
  const { userId, quizId, score } = req.body;

  // Validate input
  if (!userId || !quizId || score === undefined) {
    return res
      .status(400)
      .json({ message: "User ID, Quiz ID, and Score are required." });
  }

  const newProgress = new Result({
    userId,
    quizId, // Ensure this is populated
    score,
    date: new Date(),
  });

  try {
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};
