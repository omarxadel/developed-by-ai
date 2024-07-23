const { tryCatchFn } = require("../utils");
const AppError = require("./AppError");

const isAdmin = tryCatchFn(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new AppError("Unauthorized", 401);
  }
  next();
});

module.exports = isAdmin;
