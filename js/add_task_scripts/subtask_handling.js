let subtasks = [];


/**
 * Adds a subtask to the list of subtasks and updates the UI.
 * The subtask text is trimmed and added only if it's not empty.
 */
function setSubtask(inputField, subtaskContainer) {
  const subtaskInput = document.getElementById(`${inputField}`);
  const subtaskText = subtaskInput.value.trim();

  if (subtaskText) {
    subtasks.push(subtaskText);
    updateSubtaskList(subtaskContainer);
    subtaskInput.value = "";
  }
}


/**
 * Updates the UI with the current list of subtasks.
 * Iterates over the subtasks array and appends each subtask to the subtask container.
 */
function updateSubtaskList(subtaskDiv) {
  const subtaskContainer = document.getElementById(`${subtaskDiv}`);
  subtaskContainer.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    subtaskContainer.innerHTML += generateSubtaskHTML(subtask, i, subtaskDiv);
  }
}


/**
 * Clears the subtask input field.
 */
function clearSubtaskInput(inputToClear) {
  const subtaskInput = document.getElementById(inputToClear);
  subtaskInput.value = "";
}


/**
 * Initiates the editing of a subtask.
 * Hides the subtask display element and shows the subtask input field with the current subtask value.
 *
 * @param {number} index - Index of the subtask being edited.
 */
function editSubtask(index, divToEdit) {
  const editSubtaskDiv = document.getElementById(`subTaskDiv${index}`);
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  const editSubtaskDivEdit = document.getElementById(`${divToEdit}`);
  const taskText = document.getElementById(`task${index}`);

  editSubtaskDiv.classList.add("d-none");
  editSubtaskDivEdit.classList.remove("d-none");

  editSubtaskInput.value = taskText.textContent;

  editSubtaskInput.focus();
}


/**
 * Saves the edited subtask text to the subtasks array and updates the UI.
 *
 * @param {number} index - Index of the subtask being saved.
 */
function saveEditedSubtask(index) {
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  subtasks[index] = editSubtaskInput.value;
  updateSubtaskList();
}


/**
 * Cancels the editing of a subtask.
 * Hides the subtask input field and displays the original subtask text.
 *
 * @param {number} index - Index of the subtask being canceled.
 */
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


/**
 * Deletes a subtask from the list and updates the UI.
 *
 * @param {number} index - Index of the subtask being deleted.
 */
function deleteSubtask(index, subtaskDiv) {
  const subTaskDiv = document.getElementById(`subTaskDiv${index}`);
  subTaskDiv.remove();
  subtasks.splice(index, 1);
  updateSubtaskList(subtaskDiv);
}


/**
 * Adds focus styling to the subtask input area.
 * Hides the plus symbol and shows the subtask creation UI.
 */
function addFocusClass() {
  const inputDiv = document.getElementById("subtask-input-div");
  inputDiv.classList.add("input-div-focused");

  const plusSymbolDiv = document.getElementById("plus-symbol-div");
  plusSymbolDiv.classList.add("d-none");

  const createTaskDiv = document.getElementById("create-task-div");
  createTaskDiv.classList.remove("d-none");

  document.addEventListener("mousedown", handleMouseDown);
}


/**
 * Removes focus styling from the subtask input area.
 * Shows the plus symbol and hides the subtask creation UI.
 */
function removeFocusClass() {
  const inputDiv = document.getElementById("subtask-input-div");
  inputDiv.classList.remove("input-div-focused");

  const plusSymbolDiv = document.querySelector(".plus-symbol-div");
  plusSymbolDiv.classList.remove("d-none");

  const createTaskDiv = document.querySelector(".create-task-div");
  createTaskDiv.classList.add("d-none");
}


/**
 * Handles mouse click events to detect clicks outside the subtask input area.
 * Removes focus styling if a click outside is detected.
 *
 * @param {Event} event - The mouse event.
 */
function handleMouseDown(event) {
  const inputDiv = document.getElementById("subtask-input-div");
  if (!inputDiv.contains(event.target)) {
    removeFocusClass();
    document.removeEventListener("mousedown", handleMouseDown);
  }
}


/**
 * Saves the currently edited subtask when the check icon is clicked.
 *
 * @param {number} index - Index of the subtask being saved.
 */
function handleCheckClick(index, subtaskDiv) {
  const editSubtaskInput = document.getElementById(`editInput${index}`);
  subtasks[index] = editSubtaskInput.value;
  updateSubtaskList(subtaskDiv);
}


/**
 * Handles clicks outside the subtask edit area.
 * Saves the edited subtask text if a click outside the edit area is detected.
 *
 * @param {Event} event - The mouse event.
 * @param {number} index - Index of the subtask being edited.
 */
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