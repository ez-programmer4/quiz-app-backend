const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const quizRoutes = require("./routes/quizRoutes"); // Import quiz routes
const connectDB = require("./config/db");
const resultRoute = require("./routes/resultRoutes");
const progressRoutes = require("./routes/progressRoutes");
const userRoute = require("./routes/userRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from the environment or default to 5000

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quizzes", quizRoutes); // Use quiz routes
app.use("/api/result", resultRoute);
app.use("/api/progress", progressRoutes);

// Update the listen method for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the port instead of a specific URL
});
