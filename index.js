// server.js (or app.js)

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

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from the environment or default to 5000

// CORS configuration
const corsOptions = {
  origin: "https://your-frontend-domain.com", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Use the configured CORS options
app.use(express.json()); // Parse incoming JSON requests

// Database connection
connectDB();

// API Routes
app.use("/api", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quizzes", quizRoutes); // Use quiz routes
app.use("/api/result", resultRoute);
app.use("/api/progress", progressRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the port instead of a specific URL
});
