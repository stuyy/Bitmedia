async function postStatus() {
    let status = document.getElementById('status');
    if(status.value.length !== 0) {
        let statusObj = { status: status.value }
        try {
            let res = await fetch('/post/status', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(statusObj)
            });
            let alert = generateBootstrapAlert('success', 'Status Updated!');
            document.getElementById('statusUpdateDate').innerText = new Date().toLocaleDateString();
            document.getElementById('statusUpdateTime').innerText = new Date().toLocaleTimeString();
            document.getElementById('statusUpdateContent').innerText = status.value;
            status.value = '';
            var snackbarContainer = document.querySelector('#demo-snackbar-example');
            console.log('hi')
            var showSnackbarButton = document.getElementById('post-status-button');
            var data = {
                message: 'Status Updated',
                timeout: 5000
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
        catch(err) {
            console.log(err);
        }
    }
}

function clearStatus() {
    document.getElementById('status').value = '';
}
async function createNewTask() {
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let errorDiv = document.getElementById('errors');
    removeChildrenNodes(errorDiv);
    try {
        if(title.length < 10 || description.length < 10)
            throw new Error("Invalid field data.")

        await fetch('/post/task', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ title: title, desc: description })
        });
        closeDialogTask();
        generateTaskCard();
    }
    catch(e) {
        if(title.length < 10) {
            let errorMsg = 'Title cannot be less than 10 characters!';
            let alertElement = generateBootstrapAlert('danger', errorMsg);
            errorDiv.appendChild(alertElement);
            setTimeout(() => errorDiv.removeChild(alertElement), 5000);
        }
        if(description.length < 10) {
            let errorMsg = 'Invalid Description';
            let alertElement = generateBootstrapAlert('danger', errorMsg);
            errorDiv.appendChild(alertElement);
            setTimeout(() => errorDiv.removeChild(alertElement), 5000);
        }
    }
}

function generateTaskCard() {
    let mdlCard = document.createElement('div');
    mdlCard.classList.add('task-card', 'mdl-card', 'mdl-shadow--16dp');
    let mdlCardMenu = document.createElement('div');
    mdlCardMenu.classList.add('mdl-card__menu');
    let mdlMenuBtn = document.createElement('button');
    mdlMenuBtn.classList.add('mdl-button', 'mdl-js-button', 'mdl-button--raised');
    mdlMenuBtn.addEventListener('click', deleteTask);
    mdlMenuBtn.innerText = 'DELETE';

    mdlCardMenu.appendChild(mdlMenuBtn);

    let mdlCardTitle = document.createElement('div');
    mdlCardTitle.classList.add('mdl-card__title');

    let titleHeader = document.createElement('h4');
    let titleHeaderText = document.createTextNode('Title');
    titleHeader.appendChild(titleHeaderText);

    mdlCardTitle.appendChild(titleHeader);

    let mdlCardSupportingText = document.createElement('div');
    let supportingText = document.createTextNode('Description');
    mdlCardSupportingText.appendChild(supportingText);

    mdlCard.appendChild(mdlCardMenu);
    mdlCard.appendChild(mdlCardTitle);
    mdlCard.appendChild(mdlCardSupportingText);

    let taskSidebar = document.getElementById('task-sidebar');
    let tasks = taskSidebar.getElementsByClassName('task-card');
    let last = tasks.item(2);
    console.log(last)
    taskSidebar.removeChild(last);
    taskSidebar.removeChild(taskSidebar.lastChild);
    taskSidebar.insertBefore(mdlCard, taskSidebar.firstChild);
}
async function deleteTask(event) {
    let parentId = event.target.parentElement.id;
    let id = parentId.substring(parentId.indexOf('-')+1);
    console.log(id);
    let res = await fetch('/post/task', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    }).catch(err => console.log(err));
    console.log(res);
    let taskElement = document.getElementById('task-card-'.concat(`${id}`));
    let parent = taskElement.parentElement;
    parent.removeChild(taskElement);
}

async function completeTask(event) {
    let parentId = event.target.parentElement.id;
    let id = parentId.substring(parentId.indexOf('-')+1);
    console.log(id);
    let res = await fetch('/post/task', {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify([{ id }])
    }).catch(err => console.log(err));
    console.log(res);
}
