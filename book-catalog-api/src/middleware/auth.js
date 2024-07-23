const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};

module.exports = auth;
