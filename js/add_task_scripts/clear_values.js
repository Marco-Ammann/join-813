function clearForm() {
  clearTaskTitle();
  clearTaskDescription();
  clearTaskDueDate();
  clearPriority();
  clearAssignedContact();
  clearSubtask();
  clearCategory();
}


function clearTaskTitle() {
  let tasktitle = document.getElementById("task-title-input");
  tasktitle.value = "";
}


function clearTaskDescription() {
  let taskDescription = document.getElementById("task-description-textarea");
  taskDescription.value = "";
}


function clearTaskDueDate() {
  let taskDueDate = document.getElementById("due-date-input");
  taskDueDate.value = "";
}


function clearSubtask() {
  let subTaskInput = document.getElementById("subtask-input");
  subTaskInput.value = "";
  subtasks = [];
  updateSubtaskList();
}


function clearAssignedContact() {
  assignedContacts = [];
  for (let i = 0; i < clickedStates.length; i++) {
    if (clickedStates[i]) {
      toggleContact(i);
    }
  }
  updateAvatars();
}


function clearPriority() {
  clickedPriority = "";
  resetPriorityClasses();
}


function clearCategory() {
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = categoryDropdown.querySelector(".contactDivClicked");

  if (selectedCategory) {
    removeClass(selectedCategory, "contactDivClicked");
  }

  const addCategoryInput = document.getElementById("add-category-input");
  addCategoryInput.value = "Select task category";
}
