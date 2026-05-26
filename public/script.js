
const API_URL = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const taskIdInput = document.getElementById("taskId");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const statusInput = document.getElementById("status");

const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const cancelBtn = document.getElementById("cancelEditBtn");

let isEditing = false;

// LOAD TASKS
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${task.status}`;

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <small>Status: ${task.status}</small>

      <div class="actions">
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}

// SUBMIT (CREATE OR UPDATE)
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskData = {
    title: titleInput.value,
    description: descInput.value,
    status: statusInput.value
  };

  if (isEditing) {

    // PATCH/PUT UPDATE REQUEST
    await fetch(`${API_URL}/${taskIdInput.value}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskData)
    });

    alert("Task updated successfully");

  } else {

    // CREATE REQUEST
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskData)
    });

    alert("Task created successfully");
  }

  resetForm();
  loadTasks();
});

// LOAD TASK INTO FORM FOR EDITING
async function editTask(id) {

  const res = await fetch(`${API_URL}/${id}`);
  const task = await res.json();

  taskIdInput.value = task.id;
  titleInput.value = task.title;
  descInput.value = task.description;
  statusInput.value = task.status;

  isEditing = true;

  formTitle.textContent = "Edit Task (PATCH Mode)";
  submitBtn.textContent = "Update Task";
  cancelBtn.style.display = "inline-block";
}

// CANCEL EDIT MODE
cancelBtn.addEventListener("click", () => {
  resetForm();
});

// RESET FORM BACK TO CREATE MODE
function resetForm() {
  taskForm.reset();

  taskIdInput.value = "";
  isEditing = false;

  formTitle.textContent = "Create Task";
  submitBtn.textContent = "Create Task";
  cancelBtn.style.display = "none";
}

// DELETE TASK
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// INITIAL LOAD
loadTasks();