const AppError = require("../middleware/AppError");
const userService = require("../services/userService");
const { tryCatchFn } = require("../utils");

const registerUser = tryCatchFn(async (req, res) => {
  const { user, token } = await userService.registerUser(req.body);
  res.status(201).send({ user, token });
});

const loginUser = tryCatchFn(async (req, res) => {
  const { user, token } = await userService.loginUser(
    req.body.username,
    req.body.password
  );
  res.send({ user, token });
});

const getUserById = tryCatchFn(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.send(user);
});

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
