let assignedContacts = [];
let clickedPriority = "medium";

/**
 * Gathers all task-related information from the user input fields and creates a task object.
 * This includes generating a unique task ID, fetching task title, description, assigned contacts,
 * due date, priority, category, subtasks, and setting the initial task state to "ToDo".
 * 
 * @returns {Object} An object containing all the task information.
 */
function getValues() {
  return {
    "id": createTaskId(),
    "taskTitle": getTaskTitle(),
    "description": getTaskDescription(),
    "assignedTo": getAssignedContacts(),
    "dueDate": getDueDate(),
    "priority": getPriority(),
    "category": getCategory(),
    "subtasks": getSubtask(),
    "subtasksDone": [],
    "state": "ToDo",
  };
}


/**
 * Generates a unique task ID by iterating through the existing tasks array.
 * Finds the maximum task ID currently in use and increments it by one to ensure uniqueness.
 * 
 * @returns {number} A unique task ID, greater than any existing task ID.
 */
function createTaskId() {
  let maxId = -1;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id > maxId) {
      maxId = tasks[i].id;
    }
  }
  let newID = maxId + 1;
  return newID;
}


/**
 * Retrieves the title of the task from the input field.
 * 
 * @returns {string} The title of the task.
 */
function getTaskTitle() {
  let taskTitle = document.getElementById("task-title-input").value;
  return taskTitle;
}


/**
 * Retrieves the description of the task from the textarea field.
 * 
 * @returns {string} The description of the task.
 */
function getTaskDescription() {
  let taskDescription = document.getElementById("task-description-textarea").value;
  return taskDescription;
}


/**
 * Retrieves the names of the contacts assigned to the task.
 * 
 * @returns {Array} An array of names of the assigned contacts.
 */
function getAssignedContacts() {
  const contactNames = [];
  for (const contact of assignedContacts) {
    contactNames.push(contact.name);
  }
  return contactNames;
}


/**
 * Retrieves the due date of the task and formats it to dd/mm/yyyy.
 * 
 * @returns {string} The formatted due date of the task.
 */
function getDueDate() {
  let dueDate = document.getElementById("due-date-input").value;
  let parts = dueDate.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } else {
    return dueDate;
  }
}


/**
 * Retrieves the priority level of the task.
 * 
 * @returns {string} The priority level of the task.
 */
function getPriority() {
  return clickedPriority;
}


/**
 * Retrieves the category of the task.
 * 
 * @returns {string} The category of the task or an empty string if no category is selected.
 */
function getCategory() {
  let categoryDropdown = document.getElementById("categoryDropdown");
  let selectedCategory = categoryDropdown.querySelector(".contactDivClicked");
  if (selectedCategory) {
    return selectedCategory.textContent.trim();
  } else {
    return "";
  }
}


/**
 * Retrieves the list of subtasks.
 * 
 * @returns {Array} An array of subtasks.
 */
function getSubtask() {
  return subtasks;
}