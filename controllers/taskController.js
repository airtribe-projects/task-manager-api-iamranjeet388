let tasks = require('../data/tasks');

// GET all tasks + filtering + sorting
exports.getAllTasks = (req, res) => {
  let result = [...tasks];

  // Filtering
  if (req.query.completed) {
    const completed = req.query.completed === 'true';
    result = result.filter(task => task.completed === completed);
  }

  // Sorting (latest first)
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(result);
};

// GET single task
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

// CREATE task
exports.createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed,
    priority: priority || 'low',
    createdAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// UPDATE task
exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, description, completed, priority } = req.body;

  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;

  res.json(task);
};

// DELETE task
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);

  res.json({ message: 'Task deleted' });
};

// GET by priority
exports.getByPriority = (req, res) => {
  const level = req.params.level;

  const filtered = tasks.filter(t => t.priority === level);

  res.json(filtered);
};