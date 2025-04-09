const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const modeToggle = document.getElementById("mode-toggle");

// Load tasks and mode on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.done));
  updateTaskCount();

  // Dark mode state
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀️";
  }
};

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const done = li.querySelector("span").classList.contains("done");
    tasks.push({ text, done });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskCount();
}

// Update total task count
function updateTaskCount() {
  const total = document.querySelectorAll("#task-list li").length;
  taskCount.textContent = `Total Tasks: ${total}`;
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Enter a task.");
  renderTask(text, false);
  taskInput.value = "";
  saveTasks();
}

// Render a task element
function renderTask(text, isDone) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  if (isDone) span.classList.add("done");

  span.onclick = () => {
    span.classList.toggle("done");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Clear all tasks
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML = "";
    saveTasks();
  }
}

// Toggle dark/light mode
modeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  modeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("mode", isDark ? "dark" : "light");
};
