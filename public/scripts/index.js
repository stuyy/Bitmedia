let addButton = document.getElementById('addBtn');
let dialog = document.querySelector('dialog');
addButton.addEventListener('click', function() {
    dialog.showModal();
});

function closeDialogTask() {
    dialog.close();
}

function createNewTask() {
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let errorDiv = document.getElementById('errors');
    removeChildrenNodes(errorDiv);
    try {
        if(title.length < 10) {
            let errorMsg = 'Title cannot be less than 10 characters!';
            let alertElement = generateBootstrapAlert('danger', errorMsg);
            errorDiv.appendChild(alertElement);
            setTimeout(() => errorDiv.removeChild(alertElement), 5000);
            throw new Error("Title cannot be less than 10 characters")
        }
        if(description.length < 10) {
            let errorMsg = 'Invalid Description';
            let alertElement = generateBootstrapAlert('danger', errorMsg);
            errorDiv.appendChild(alertElement);
            setTimeout(() => errorDiv.removeChild(alertElement), 5000);
            throw new Error("Title cannot be less than 10 characters")
        }
        console.log("Success?")
    } 
    catch(e) {
        console.log(e);
    }
}

function removeChildrenNodes(elementNode) {
    let m = Array.from(elementNode.childNodes)
    m.forEach(m => {
        if(elementNode.hasChildNodes())
            elementNode.removeChild(m)
    })
}
function generateBootstrapAlert(alertType, contents) {
    alertType = ''.concat('alert', '-', alertType)
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('alert', alertType, 'alert-msg')
    mainDiv.setAttribute('role', 'alert');
    let alertContent = document.createElement('span');
    let text = document.createTextNode(contents);
    alertContent.appendChild(text);
    mainDiv.appendChild(alertContent);
    return mainDiv;
}