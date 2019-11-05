let addButton = document.getElementById('addBtn');
let dialog = document.querySelector('dialog');
addButton.addEventListener('click', function() {
    dialog.showModal();
});

function closeDialogTask() {
    dialog.close();
}