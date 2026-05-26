
require('dotenv').config();
const user_data = {}

const express = require('express');
const path = require('path');
const cors = require('cors');
const tasks = require("./data/task")
const validateTaskUpdate = require('./middleware/validateTaskUpdate')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serving static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// app.use('/', require('./routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running'
  });
});

//get all tasks
app.get('/tasks', (req, res) => {

  res.status(200).json(tasks);

});

//get single task
app.get('/tasks/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(task);

})

//Update all data/inputs in a task

app.put('/tasks/:id', validateTaskUpdate, (req, res) => {

  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  res.status(200).json({
    message: "Task updated successfully",
    task
  });

});


// update a specific data in task
app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskToUpdate = tasks.find(task => task.id === taskId);

  if (!taskToUpdate) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update only the fields that were provided in the request body
  if (req.body.title !== undefined) taskToUpdate.title = req.body.title;
  if (req.body.description !== undefined) taskToUpdate.description = req.body.description;
  if (req.body.completed !== undefined) taskToUpdate.completed = req.body.completed;

  // Respond with the updated task
  res.status(200).json({ message: "Task updated successfully", task: taskToUpdate });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
