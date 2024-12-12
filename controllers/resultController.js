const Result = require("../models/Result"); // Adjust the path as necessary

// Save result
exports.saveResult = async (req, res) => {
  try {
    const { quizId, score, totalQuestions, date, categoryId } = req.body; // Include categoryId
    const result = new Result({
      userId: req.user.id,
      quizId,
      score,
      totalQuestions,
      date,
      categoryId, // Add categoryId here
    });

    await result.save();
    return res.status(201).send(result); // Respond with the saved result
  } catch (error) {
    console.error("Error saving result:", error);
    return res
      .status(500)
      .send({ message: "Error saving result", error: error.message });
  }
};

// Get user results
exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id }).populate(
      "quizId"
    );
    return res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    return res.status(500).send({ message: "Error fetching results" });
  }
};
