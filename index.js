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
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quizzes", quizRoutes); // Use quiz routes
app.use("/api/result", resultRoute);
app.use("/api/progress", progressRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
