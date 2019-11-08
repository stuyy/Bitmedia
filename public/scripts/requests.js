async function postStatus() {
    let status = document.getElementById('status');
    if(status.value.length !== 0) {
        let statusObj = { status: status.value }
        try {
            let res = await fetch('/user/post/status', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(statusObj)
            });
            let alert = generateBootstrapAlert('success', 'Status Updated!');
            status.value = '';
        }
        catch(err) {
            console.log(err);
        }
    }
    
}

async function createNewTask() {
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let errorDiv = document.getElementById('errors');
    removeChildrenNodes(errorDiv);
    try {
        if(title.length < 10 || description.length < 10)
            throw new Error("Invalid field data.")
        
        await fetch('/user/post/task', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ title: title, desc: description })
        });
        closeDialogTask();
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

async function deleteTask(event) {
    console.log("Hello?");
    let id = event.target.id;
    let res = await fetch('/user/post/task', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    }).catch(err => console.log(err));
    console.log(res);
    let taskElement = document.getElementById(id);
    let childToDelete = taskElement.parentElement.parentElement;
    let parent = childToDelete.parentElement;
    parent.removeChild(childToDelete);
}