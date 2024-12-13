const User = require("../models/User");
const argon2 = require("argon2"); // Replace bcrypt with argon2
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, role } = req.body; // Optionally accept role from request

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use by others." });
    }

    // Hash the password before saving
    const hashedPassword = await argon2.hash(password); // Use argon2 to hash

    // Create a new user with a default role
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    }); // Default to 'user'
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await argon2.verify(user.password, password))) {
      // Use argon2 to verify
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Include the user's role in the response
      res.json({ token, userId: user._id, role: user.role });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export both functions
module.exports = { register, login };
