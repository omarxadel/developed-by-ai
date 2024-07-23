const Task = require("../models/task");
const User = require("../models/user");

class TaskService {
  constructor() {
    this.taskModel = Task;
    this.userModel = User;
  }

  async createTask(taskData, userId) {
    const { title, description, dueDate, status } = taskData;
    const task = new this.taskModel({
      title,
      description,
      dueDate,
      status,
      creator: userId,
    });
    return await task.save();
  }

  async getTasks(userId) {
    return await this.taskModel.find({
      $or: [{ creator: userId }, { sharedWith: userId }],
    });
  }

  async getTask(taskId, userId) {
    return await this.taskModel.findOne({
      _id: taskId,
      $or: [{ creator: userId }, { sharedWith: userId }],
    });
  }

  async updateTask(taskId, updateData, userId) {
    const updates = Object.keys(updateData);
    const allowedUpdates = ["title", "description", "dueDate", "status"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      throw new Error("Invalid updates");
    }

    const task = await this.taskModel.findOne({
      _id: taskId,
      creator: userId,
    });

    if (!task) {
      return null;
    }

    updates.forEach((update) => (task[update] = updateData[update]));
    return await task.save();
  }

  async deleteTask(taskId, userId) {
    return await this.taskModel.findOneAndDelete({
      _id: taskId,
      creator: userId,
    });
  }

  async shareTask(taskId, email, userId) {
    const task = await this.taskModel.findOne({
      _id: taskId,
      creator: userId,
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const userToShare = await this.userModel.findOne({ email });
    if (!userToShare) {
      throw new Error("User not found");
    }

    if (task.sharedWith.includes(userToShare._id)) {
      throw new Error("Task already shared with this user");
    }

    task.sharedWith.push(userToShare._id);
    return await task.save();
  }
}

module.exports = new TaskService();
