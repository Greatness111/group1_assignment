
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const tasks = require("./data/task")
const validateTask = require('./middleware/validateTask')
const saveTasksToFile = require('./saveTaskToFile')

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

// Create Task and save to tasks.js
app.post('/tasks', validateTask, (req, res)=>{
  let {title, description, status} = req.body;
  // trim title and description
   title = title.trim();
   description = description.trim();
   // create new id for entry which should be todos.length + 1 or Maximum number id + 1 (So we never have conflicts in sequential numbers)
   const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

   // create new object for title, description and status
   const newTask = {
    id:id,
    title:title,
    description:description,
    status:status
   }

   tasks.push(newTask)
   
   // push object into tasks.js
   saveTasksToFile(tasks)
   // Return response status 201 showing new task added
   res.status(201).json({'new Task':newTask, message:"New Task Entry Created Successfully"})
})

//Update all data/inputs in a task

app.put('/tasks/:id', validateTask, (req, res) => {

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

  saveTasksToFile(tasks)

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
  taskToUpdate.status = req.body.status;

  saveTasksToFile(tasks)

  // Respond with the updated task
  res.status(200).json({ message: "Task updated successfully", task: taskToUpdate });
});


// Delete task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const initialLength = tasks.length
    
    const newTasks = tasks.filter(t => t.id !== id);
    if(newTasks.length === initialLength){
        res.json({message:"Task not deleted"})
    }
    // Reassign all IDs sequentially
    newTasks.forEach((task, index) => {
        task.id = index + 1;  // IDs become 1, 2, 3...
    })
    saveTasksToFile(newTasks);
    console.log("Task deleted successfully")
    res.status(204).json({message:"Task deleted successfully"})
})


//Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!', "message": err.message });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
