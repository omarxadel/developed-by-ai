const AppError = require("../middleware/AppError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const user = new User(data);
  await user.save();
  const token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET
  );
  return { user: { id: user._id, username: user.username }, token };
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid credentials", 401);
  }
  const token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET
  );
  return { user: { id: user._id, username: user.username }, token };
};

const getUserById = async (id) => {
  return User.findById(id).select("-password");
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
