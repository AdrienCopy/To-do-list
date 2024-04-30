let newToDo = document.getElementById('new');
let submit = document.getElementById('submit');
let ul = document.getElementById('ul');
let tasksArray = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    newEnter();
});

function newEnter() {
    submit.addEventListener('click', function() {
        let value = newToDo.value.trim();//trim -> supprime les espaces vide
        if (value !== '') {
            List(value);
        }
    });
}

function List(taskText) {
    let taskObject = {
        text: taskText,
        checked: false
    };
    tasksArray.push(taskObject);
    let li = createTaskElement(taskObject);
    ul.appendChild(li);
    newToDo.value = '';
    save();
}

function createTaskElement(taskObject) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.textContent = taskObject.text;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = taskObject.checked;
    checkbox.addEventListener('change', function() {
        taskObject.checked = checkbox.checked;
        updateTaskStyle(li, taskObject.checked);
        save();
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = ' X ';
    deleteBtn.classList.add('btn');
    deleteBtn.addEventListener('click', function() {
        tasksArray = tasksArray.filter(item => item !== taskObject);
        ul.removeChild(li);
        save();
    });

    li.appendChild(p);  
    li.appendChild(checkbox);
    li.appendChild(deleteBtn);

    updateTaskStyle(li, taskObject.checked);

    return li;
}

function updateTaskStyle(li, isChecked) {
    if (isChecked) {
        li.style.color = 'green';
        li.style.textDecoration = 'line-through';
    } else {
        li.style.color = '';
        li.style.textDecoration = '';
    }
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(task => {
            let li = createTaskElement(task);
            ul.appendChild(li);
        });
    }
}
