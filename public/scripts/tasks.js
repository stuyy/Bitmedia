window.addEventListener('load', async () =>{
    await loadTasks();
});

async function fetchTasks() {
    try {
        let response = await fetch('/user/post/task', {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json' },
            credentials: 'include'
        });
        response = await response.json();
        return response;
    }
    catch(err) {
        return err;
    }
}

async function loadTasks() {
    let tasks = await fetchTasks();  // Fetch Tasks fron Front End.
    tasks.forEach(task => generateTaskComponent(task))
}
function generateTaskComponent(task) {
    
    let listElement = document.createElement('li');
    listElement.classList.add('mdl-list__item', 'list-item');
    let spanElement = document.createElement('span');
    spanElement.classList.add('mdl-list__item-primary-content');
    let iconElement = document.createElement('i');
    iconElement.classList.add('material-icons', 'mdl-list__item-avatar');
    iconElement.innerHTML = 'person';
    let textElement = document.createTextNode(`${task.title}`);
    let spanCheckbox = document.createElement('span');
    spanCheckbox.classList.add('mdl-list__item-secondary-action');

    let label = document.createElement('label');
    label.classList.add('mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect');
    
    label.setAttribute('for', `task-id-${task.id}`);
    let input = document.createElement('input');
    input.classList.add('mdl-checkbox__input');
    input.setAttribute('type', 'checkbox');
    input.id = `task-id-${task.id}`;
    input.addEventListener('change', taskChecked)

    label.appendChild(input);
    componentHandler.upgradeElement(label);
    spanCheckbox.appendChild(label);
    spanElement.appendChild(iconElement);
    spanElement.appendChild(textElement)
    listElement.appendChild(spanElement);
    listElement.appendChild(spanCheckbox);
    let taskList = document.getElementById('task-list');
    taskList.appendChild(listElement)

    /*
    
    let taskList = document.getElementById('task-list');
    let labelCheckbox = document.createElement('label');
    labelCheckbox.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
    labelCheckbox.setAttribute('for', 'yeet');
    let inputCheckbox = document.createElement('input');
    inputCheckbox.className = 'mdl-checkbox__input';
    inputCheckbox.id = 'yeet';
    inputCheckbox.setAttribute('type', 'checkbox');
    labelCheckbox.appendChild(inputCheckbox);
    componentHandler.upgradeElement(labelCheckbox);
    taskList.appendChild(labelCheckbox); */
}

