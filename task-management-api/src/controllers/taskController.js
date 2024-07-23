const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating task", error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user._id);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.id, req.user._id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating task", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user._id);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

exports.shareTask = async (req, res) => {
  try {
    await taskService.shareTask(req.params.id, req.body.email, req.user._id);
    res.json({ message: "Task shared successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error sharing task", error: error.message });
  }
};
