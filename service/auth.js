const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

function setUser(user) {
  try {
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    console.error("Error setting user:", error.message);
    return null;
  }
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
}

module.exports = { setUser, getUser };
    