let addButton = document.getElementById('addBtn');
let dialog = document.querySelector('dialog');
addButton.addEventListener('click', function() {
    dialog.showModal();
});

function closeDialogTask() {
    dialog.close();
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