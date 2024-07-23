// src/models/task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    dueDate: {
      type: Date,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries
taskSchema.index({ creator: 1, status: 1 });

// Method to check if a user has access to this task
taskSchema.methods.isAccessibleBy = function (userId) {
  return (
    this.creator.equals(userId) ||
    this.sharedWith.some((id) => id.equals(userId))
  );
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
