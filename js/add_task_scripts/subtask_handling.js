function setSubtask() {
  const subtaskInput = document.getElementById("subtask-input");
  const subtaskText = subtaskInput.value.trim();

  if (subtaskText) {
    subtasks.push(subtaskText);
    updateSubtaskList();
    subtaskInput.value = "";
  }
}


// Funktion zum Aktualisieren der Subtask-Liste
function updateSubtaskList() {
  const subtaskContainer = document.getElementById("subTasks");
  subtaskContainer.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    subtaskContainer.innerHTML += generateSubtaskHTML(subtask, i);
  }
}


function clearSubtaskInput() {
  const subtaskInput = document.getElementById("subtask-input");
  subtaskInput.value = "";
}


// Funktion zum Bearbeiten eines Subtasks
function editSubtask(index) {
  const editSubtaskDiv = document.getElementById(`subTaskDiv${index}`);
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  const editSubtaskDivEdit = document.getElementById(
    `edit-subtask-div${index}`
  );
  const taskText = document.getElementById(`task${index}`);

  editSubtaskDiv.classList.add("d-none");
  editSubtaskDivEdit.classList.remove("d-none");

  editSubtaskInput.value = taskText.textContent;

  editSubtaskInput.focus();
}


// Funktion zum Speichern eines bearbeiteten Subtasks
function saveEditedSubtask(index) {
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  subtasks[index] = editSubtaskInput.value;
  updateSubtaskList();
}


// Funktion zum Abbrechen der Bearbeitung eines Subtasks
function cancelEditSubtask(index) {
  const editSubtaskDiv = document.getElementById(`subTaskDiv${index}`);
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  const editSubtaskDivEdit = document.getElementById(
    `edit-subtask-div${index}`
  );

  editSubtaskDiv.style.display = "block";
  editSubtaskDivEdit.style.display = "none";
  editSubtaskInput.value = "";
}


// Funktion zum Löschen eines Subtasks
function deleteSubtask(index) {
  const subTaskDiv = document.getElementById(`subTaskDiv${index}`);
  subTaskDiv.remove();
  subtasks.splice(index, 1);
  updateSubtaskList();
}


function addFocusClass() {
  const inputDiv = document.getElementById("subtask-input-div");
  inputDiv.classList.add("input-div-focused");

  const plusSymbolDiv = document.getElementById("plus-symbol-div");
  plusSymbolDiv.classList.add("d-none");

  const createTaskDiv = document.getElementById("create-task-div");
  createTaskDiv.classList.remove("d-none");

  document.addEventListener("mousedown", handleMouseDown);
}


function removeFocusClass() {
  const inputDiv = document.getElementById("subtask-input-div");
  inputDiv.classList.remove("input-div-focused");

  const plusSymbolDiv = document.querySelector(".plus-symbol-div");
  plusSymbolDiv.classList.remove("d-none");

  const createTaskDiv = document.querySelector(".create-task-div");
  createTaskDiv.classList.add("d-none");
}


function handleMouseDown(event) {
  const inputDiv = document.getElementById("subtask-input-div");
  if (!inputDiv.contains(event.target)) {
    removeFocusClass();
    document.removeEventListener("mousedown", handleMouseDown);
  }
}


// Funktion zum Speichern des bearbeiteten Subtasks
function handleCheckClick(index) {
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  subtasks[index] = editSubtaskInput.value;
  updateSubtaskList();
}


// Event-Handler für das Klicken außerhalb des bearbeiteten Subtasks
function handleOutsideClick(event, index) {
  const editSubtaskDiv = document.getElementById(`subTaskDiv${index}`);
  const inputElement = document.getElementById(`editInput${index}`);
  const taskText = document.getElementById(`task${index}`);

  if (!editSubtaskDiv.contains(event.target)) {
    taskText.textContent = inputElement.value;

    editSubtaskDiv.classList.remove("d-none");
    inputElement.value = "";
  }
}
