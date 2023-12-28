/**
 * Clears all inputs and selections in the task creation form. It resets the title,
 * description, due date, priority selection, assigned contacts, subtasks, and the 
 * task category to their default states.
 */
function clearForm(titleInput, descriptionArea, dueDateInput, avatarContainer, subTaskInput) {
  clearTaskTitle(titleInput);
  clearTaskDescription(descriptionArea);
  clearTaskDueDate(dueDateInput);
  clearPriority();
  clearAssignedContact(avatarContainer);
  clearSubtask(subTaskInput);
  clearCategory();
}


/**
 * Clears the content of the task title input field.
 */
function clearTaskTitle(titleInput) {
  let tasktitle = document.getElementById(titleInput);
  tasktitle.value = "";
}


/**
 * Clears the content of the task description textarea.
 */
function clearTaskDescription(descriptionArea) {
  let taskDescription = document.getElementById(descriptionArea);
  taskDescription.value = "";
}


/**
 * Resets the due date input field to empty.
 */
function clearTaskDueDate(dueDateInput) {
  let taskDueDate = document.getElementById(dueDateInput);
  taskDueDate.value = "";
}


/**
 * Clears the subtask input field and removes all existing subtasks from the list.
 */
function clearSubtask(subTaskInputs) {
  let subTaskInput = document.getElementById(subTaskInputs);
  subTaskInput.value = "";
  subtasks = [];
  updateSubtaskList();
}


/**
 * Clears all selected contacts for task assignment. 
 * It iterates through the clicked states array, 
 * resets each selected contact, and updates the avatar display accordingly.
 */
function clearAssignedContact(avatarContainer) {
  assignedContacts = [];
  for (let i = 0; i < clickedStates.length; i++) {
    if (clickedStates[i]) {
      toggleContact(i);
    }
  }
  updateAvatars(avatarContainer);
}


/**
 * Clears the selected task priority. 
 * It resets the clickedPriority variable to an empty string 
 * and calls resetPriorityClasses to update the UI accordingly.
 */
function clearPriority() {
  clickedPriority = "";
  resetPriorityClasses();
}


/**
 * Clears the selected category from the category dropdown. 
 * If a category is selected (highlighted), it removes the highlighting class. 
 * It also resets the category input field to its default placeholder value.
 */
function clearCategory() {
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = categoryDropdown.querySelector(".contactDivClicked");

  if (selectedCategory) {
    removeClass(selectedCategory, "contactDivClicked");
  }

  const addCategoryInput = document.getElementById("add-category-input");
  addCategoryInput.value = "Select task category";
}