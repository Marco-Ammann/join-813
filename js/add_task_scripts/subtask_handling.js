function setSubtask() {
    const subtaskInput = document.getElementById('subtask-input');
    const subtaskText = subtaskInput.value.trim();

    if (subtaskText) {
        subtasks.push(subtaskText);
        updateSubtaskList();
        subtaskInput.value = '';
    }
}


// Funktion zum Aktualisieren der Subtask-Liste
function updateSubtaskList() {
    const subtaskContainer = document.getElementById('subTasks');
    subtaskContainer.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskContainer.innerHTML += generateSubtaskHTML(subtask, i);

    }
}


// Funktion zum Bearbeiten eines Subtasks
function editSubtask(index) {
    const subtaskContainer = document.getElementById(`task${index}`);
    const subtaskText = subtasks[index];
  
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = subtaskText;
    inputElement.classList.add('edit-subtask-input');
  
    subtaskContainer.textContent = '';
    subtaskContainer.appendChild(inputElement);
  
    inputElement.focus();
  
    inputElement.addEventListener('blur', () => {
      const editedSubtask = inputElement.value.trim();
      subtasks[index] = editedSubtask;
      updateSubtaskList();
    });
}


//cancel creating subtask
function cancelSubtask() {
    let subTaskInput = document.getElementById('subtask-input');
    subTaskInput.value = "";
}


// Funktion zum Löschen eines Subtasks
function deleteSubtask(index) {
    subtasks.splice(index, 1);
    updateSubtaskList();
}


function addFocusClass() {
    const inputDiv = document.getElementById('subtask-input-div');
    inputDiv.classList.add('input-div-focused');

    const plusSymbolDiv = document.getElementById('plus-symbol-div');
    plusSymbolDiv.classList.add('d-none');

    const createTaskDiv = document.getElementById('create-task-div');
    createTaskDiv.classList.remove('d-none');

    document.addEventListener('mousedown', handleMouseDown);
}


function removeFocusClass() {
    const inputDiv = document.getElementById('subtask-input-div');
    inputDiv.classList.remove('input-div-focused');

    const plusSymbolDiv = document.querySelector('.plus-symbol-div');
    plusSymbolDiv.classList.remove('d-none');

    const createTaskDiv = document.querySelector('.create-task-div');
    createTaskDiv.classList.add('d-none');
}


function handleMouseDown(event) {
    const inputDiv = document.getElementById('subtask-input-div');
    if (!inputDiv.contains(event.target)) {
        removeFocusClass();
        document.removeEventListener('mousedown', handleMouseDown);
    }
}