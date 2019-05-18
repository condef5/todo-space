const todoList = [
  {
    id: 1,
    description: 'Sleep early',
    creationDate: '2019-05-12',
    dueDate: '2019-05-10',
    priority: true,
    complete: true
  },
  {
    id: 2,
    description: 'Go to bootcamp',
    creationDate: '2019-05-13',
    dueDate: '2019-05-17',
    priority: false,
    complete: false
  },
  {
    id: 3,
    description: 'Study ReactJS',
    creationDate: '2019-05-15',
    dueDate: '2019-05-19',
    priority: true,
    complete: false
  }
];

// When click in icon edit taskId change your value by id selected
let taskId = 0;

// filter => property of the ToDo object to order
// status => 1 orders ascending and -1 orders descending
const sort = {
  filter: '',
  status: 1
};

function orderList(array, key, status) {
  return array.sort((a, b) => {
    if (key == 'creationDate' || key == 'dueDate') {
      return status == 1
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    } else if (key == 'priority' || key == 'complete') {
      return (a[key] < b[key] ? -1 : 1) * status;
    } else {
      return (complementTextOrder(a[key]) < complementTextOrder(b[key]) ? -1 : 1) * status;
    }
  });
}

function complementTextOrder(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function saveTodo(event) {
  event.preventDefault();

  const todo = {
    id: todoList.length + 1,
    description: event.target.elements.description.value,
    dueDate: event.target.elements.dueDate.value,
    creationDate: dateNow(),
    priority: event.target.elements.priority.checked,
    complete: false
  };

  todoList.push(todo);

  document.getElementById('formToDo').reset();
  showHtml(todoList);
}

function dateNow() {
  const now = new Date();
  return (
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    now.getDate()
  );
}

function searchById(id) {
  // return element position on Array
  let obj = todoList.find((o) => o.id === parseInt(id));
  if (obj >= 0) {
    return todoList.indexOf(obj);
  }
  return { message: 'Element not in Array.' };
}

function updateTask(id, prop, value = '') {
  todoList.forEach((task) => {
    if (task.id == id) {
      if (value == '') {
        task[prop] = !task[prop];
      } else {
        task[prop] = value;
      }
    }
  });
  showHtml(todoList);
}

function editTask(id, prop) {
  if (id == 0) {
    taskId = 0;
    showHtml(todoList);
    return;
  }
  console.log(id);
  taskId = id;
  propTaskEdit = prop;
  showHtml(todoList);
}

function saveTask(e, id, prop) {
  const value = prop == 'description' ? e.innerText : e.value;
  console.log(value);
  updateTask(id, prop, value);
  showHtml(todoList);
}

function taskDelete(id) {
  // look for required element in array
  // delete required element after getting its index
  todoList.splice(searchById(id), 1);
  showHtml(todoList);
}

function showHtml(arr) {
  let html = '';

  arr.forEach((task) => {
    html += `
      <li class="todo__item ${task.id == taskId ? 'active' : ''}">
        <div>
          <input 
            type="checkbox"
            class="taskComplete" 
            ${task.complete && 'checked'}
            onchange="updateTask(${task.id}, 'complete')"
          >
        </div>
        <div
          class="editable"
          contenteditable="${task.id == taskId}"
          onblur="saveTask(this, ${task.id}, 'description')"
        >
          ${task.description}
        </div>
        <div>${task.creationDate}</div>
        <div class="editable-input">
        ${
          task.id == taskId
            ? `<input 
                type="date"
                value="${task.dueDate}" 
                onblur="saveTask(this, ${task.id}, 'dueDate')"
              />`
            : task.dueDate
        }
        </div>
        <div>
          <input 
            type="checkbox" 
            class="taskPriority" 
            ${task.priority && 'checked'}
            onchange="updateTask(${task.id}, 'priority')"
          >
        </div>
        <div>
          <svg 
            onclick="editTask(${task.id == taskId ? 0 : task.id})"
            class="icon">
            <use xlink:href="${
              task.id == taskId ? '#icon-save' : '#icon-edit'
            }">
          </svg>
          <svg 
            onclick="taskDelete(${task.id})"
            class="icon">
            <use xlink:href="#icon-trash">
          </svg>
        </div>
      </li>
    `;
  });

  document.getElementById('todoHtml').innerHTML = html;
}

document.getElementById('formToDo').addEventListener('submit', saveTodo);

document.querySelectorAll('.sorting').forEach((item) => {
  item.addEventListener('click', (e) => {
    console.log(e.target.dataset.sort);
    if (sort.filter == e.target.dataset.sort) sort.status = sort.status * -1;
    sort.filter = e.target.dataset.sort;
    const list = orderList(todoList, sort.filter, sort.status);
    showHtml(list);
  });
});

// show list ToDo in html
showHtml(todoList);
