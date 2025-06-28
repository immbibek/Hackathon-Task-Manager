import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ 
    $or: [
      { owner: req.user.id },
      { sharedWith: req.user.id },
      { assignedTo: req.user.id }
    ]
  });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user.id });
  await task.save();
  res.status(201).json(task);
};
