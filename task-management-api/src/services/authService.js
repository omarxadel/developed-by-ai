const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  async registerUser(name, email, password) {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    user = new User({ name, email, password });
    await user.save();

    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  generateToken(userId) {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
}

module.exports = new AuthService();
