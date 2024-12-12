const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Authorization Header:", token); // Log the token

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provvided" });
  }

  const jwtToken = token.split(" ")[1]; // Extract token
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded; // Attach user data to the request object
    console.log("Decoded User:", req.user); // Log the decoded user object
    next();
  });
};
module.exports = authenticate;
