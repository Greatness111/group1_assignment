# 📌 Task Manager API (BeTechified Express.js CRUD Project)

A simple Task Manager API built with **Node.js and Express.js** that allows users to create, read, update, and delete tasks.  
It also includes a simple frontend interface to test all API endpoints.

---

# 🚀 Features

- Create tasks
- Get all tasks
- Get single task by ID
- Update tasks (PUT)
- Delete tasks
- Frontend UI for testing API
- Form-based task editing (update mode)
- Real-time UI refresh after updates

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- HTML
- CSS
- JavaScript (Fetch API)

---

# 📁 Project Structure

```
project/
│
├── data/
│   └── tasks.js
│
├── middleware/
│   └── validateTaskUpdate.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
└── README.md
```

---

# 🔗 API Endpoints

## 📌 Get all tasks
```http
GET /tasks
```

### Response
```json
[
  {
    "id": 1,
    "title": "Finish assignment",
    "description": "Complete Express.js project",
    "status": "pending"
  }
]
```

---

## 📌 Get task by ID
```http
GET /tasks/:id
```

### Response
```json
{
  "id": 1,
  "title": "Finish assignment",
  "description": "Complete Express.js project",
  "status": "pending"
}
```

---

## 📌 Create task
```http
POST /tasks
```

### Body
```json
{
  "title": "New Task",
  "description": "Task details",
  "status": "pending"
}
```

---

## 📌 Update task
```http
PUT /tasks/:id
```

### Body
```json
{
  "title": "Updated Task",
  "description": "Updated details",
  "status": "completed"
}
```

### Response
```json
{
  "message": "Task updated successfully",
  "task": { ... }
}
```

---

## 📌 Delete task
```http
DELETE /tasks/:id
```

---

# 🧪 Frontend Features

The frontend (`/public`) allows you to:

- View all tasks
- Click **Edit** to load task into form
- Switch to **Update mode**
- Submit changes using PUT request
- Automatically refresh task list
- Delete tasks

---

# 🔄 Update Flow (Important Feature)

1. Click **Edit** on a task  
2. Task data loads into form  
3. Form switches to "Update Mode"  
4. Click **Update Task**  
5. Sends `PUT /tasks/:id`  
6. Backend updates task  
7. Frontend refreshes task list  

---

# ⚙️ Installation & Setup

## 1. Clone repo
```bash
git clone <your-repo-url>
```

## 2. Install dependencies
```bash
npm install
```

## 3. Start server
```bash
node server.js
```

---

# 🌐 Run Application

Open your browser:

```
http://localhost:3000
```

---

# 📦 Mock Data (Example)

```js
[
  {
    id: 1,
    title: "Finish assignment",
    description: "Complete Express project",
    status: "pending"
  },
  {
    id: 2,
    title: "Study Node.js",
    description: "Learn middleware",
    status: "completed"
  }
]
```

---

# 👥 Team Contribution

| Member | Role |
|--------|------|
| Member 1 | Server setup |
| Member 2 | GET routes |
| Member 3 | POST route + validation |
| Member 4 | PUT route + update functionality |
| Member 5 | DELETE route + error handling |
| Member 6 | Frontend testing + Postman + documentation |

---

# 📌 Key Learning Outcomes

- REST API design using Express.js
- CRUD operations
- Middleware validation
- Frontend-backend integration
- Using Fetch API
- Git workflow & collaboration

---

# 🧠 Author
Group 1 - subGroup A

Group Project – Task Manager API