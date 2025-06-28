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

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    task.owner.toString() !== req.user.id &&
    !task.assignedTo.includes(req.user.id)
  ) {
    return res.status(403).json({ message: "Not authorized to update this task" });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only the owner can delete the task" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted successfully" });
};


// share Task - share with anotehr user by email or Id
import User from "../models/User.js";

export const shareTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only the owner can share this task" });
  }

  const { email } = req.body;

  const userToShare = await User.findOne({ email });

  if (!userToShare) {
    return res.status(404).json({ message: "User to share with not found" });
  }

  if (!task.sharedWith.includes(userToShare._id)) {
    task.sharedWith.push(userToShare._id);
    await task.save();
  }

  res.json({ message: "Task shared successfully", task });
};
