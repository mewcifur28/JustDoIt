const inputText = document.querySelector('#input-text');
const addTaskBtn = document.querySelector('#add-task-btn');
const searchTasks = document.querySelector('#filter');
const clearAllTasks = document.querySelector('#clear-all');
const taskList = document.querySelector('ul');

(function loadEventListeners() {
  addTaskBtn.addEventListener('click', addNewEvent);
  document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
  taskList.addEventListener('click', removeTask);
  clearAllTasks.addEventListener('click', removeAllTasks);
  searchTasks.addEventListener('keyup', searchTaskList);
})();

function getTasksFromLocalStorage() {
  console.log('DOM loaded');
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item grey darken-4 white-text';
    let link1 = document.createElement('a');
    link1.className = 'task-done-icon';
    link1.innerHTML = '<i class="material-icons left">check_circle</i></a>';
    li.appendChild(link1);
    li.appendChild(document.createTextNode(task));
    let link2 = document.createElement('a');
    link2.className = 'task-delete-icon';
    link2.innerHTML = '<i class="material-icons right">delete</i>';
    li.appendChild(link2);
    taskList.appendChild(li);
  })
}

function addNewEvent(e) {
  e.preventDefault();
  console.log('event created');
  if (inputText.value === '') {
    return;
  }
  const li = document.createElement('li');
  li.className = 'collection-item grey darken-4 white-text';
  let link1 = document.createElement('a');
  link1.className = 'task-done-icon';
  link1.innerHTML = '<i class="material-icons left">check_circle</i></a>';
  li.appendChild(link1);
  li.appendChild(document.createTextNode(inputText.value));
  let link2 = document.createElement('a');
  link2.className = 'task-delete-icon';
  link2.innerHTML = '<i class="material-icons right">delete</i>';
  li.appendChild(link2);
  taskList.appendChild(li);
  addTaskInLocalStorage(inputText.value);
  inputText.value = '';
}

function addTaskInLocalStorage(newTask) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('task-done-icon') || e.target.parentElement.classList.contains('task-delete-icon')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e);
  }
}

function removeTaskFromLocalStorage(e) {
  // console.log(e.target.parentElement.classList.contains('task-done-icon') || e.target.parentElement.classList.contains('task-delete-icon'));
  // if (e.target.parentElement.classList.contains('task-done-icon') || e.target.parentElement.classList.contains('task-delete-icon')) {
    let deletedTask = e.target.parentElement.parentElement.textContent;
    let deletedTaskValue = deletedTask.substring(12, deletedTask.length - 6);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task, index){
      if (task == deletedTaskValue) {
        tasks.splice(index, 1);
        //break;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeAllTasks() {
  while (taskList.childElementCount) {
    taskList.firstChild.remove();
  }
  localStorage.clear();
}

function searchTaskList(e) {
  const searchItem = searchTasks.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    let taskContent = task.textContent.substring(12, task.textContent.length - 6).toLowerCase();
    if (taskContent.indexOf(searchItem) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}