const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

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
    title,
    description,
    priority,
    dueDate,
    completed: false
  };

  displayTask(task);
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
    <button onclick="completeTask(this)">Mark as Done</button>
    <button onclick="removeTask(this)">Remove</button>
  `;
  taskList.appendChild(taskDiv);
}

function completeTask(button) {
  const taskDiv = button.parentElement;
  taskDiv.classList.toggle('completed');
}

function removeTask(button) {
  const taskDiv = button.parentElement;
  taskDiv.remove();
}
