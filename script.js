const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = [];

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
    tasks.forEach(task => displayTask(task));
  }
});

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('dueDate').value;

  const task = {
    id: Date.now(),
    title,
    description,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(task);
  displayTask(task);
  saveTasksToLocalStorage();
  taskForm.reset();
}

function displayTask(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  if (task.completed) {
    taskDiv.classList.add('completed');
  }
  taskDiv.innerHTML = `
    <h3>${task.title}</h3>
    <p>Description: ${task.description}</p>
    <p>Priority: ${task.priority}</p>
    <p>Due Date: ${task.dueDate}</p>
    <button onclick="completeTask(${task.id})">Mark as Done</button>
    <button onclick="removeTask(${task.id})">Remove</button>
  `;
  taskList.prepend(taskDiv);
}

function completeTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage();
    taskList.innerHTML = '';
    tasks.forEach(task => displayTask(task));
  }
}

function removeTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasksToLocalStorage();
  taskList.innerHTML = '';
  tasks.forEach(task => displayTask(task));
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
