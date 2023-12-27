let assignedContacts = [];
let clickedPriority = "medium";

/**
 * Gathers all task-related information from the user input fields and creates a task object.
 * This includes generating a unique task ID, fetching task title, description, assigned contacts,
 * due date, priority, category, subtasks, and setting the initial task state to "ToDo".
 * 
 * @async
 * @function getValues
 * @returns {Promise<Object>} An object containing all the task information.
 */
async function getValues() {
  let taskId = await createTaskId();
  return {
      "id": taskId,
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
 * Generates a unique task ID by iterating through the tasks array retrieved from the backend.
 * Finds the highest existing task ID and increments it by one to ensure the new ID is unique.
 * 
 * @async
 * @function createTaskId
 * @returns {Promise<number>} A unique task ID, greater than any existing task ID.
 */
async function createTaskId() {
  let maxId = -1;
  let currentTasks = await getTasksArray();
  for (let i = 0; i < currentTasks.length; i++) {
      if (currentTasks[i].id > maxId) {
          maxId = currentTasks[i].id;
      }
  }
  return maxId + 1;
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
 * Retrieves the IDs and names of contacts assigned to a task.
 * Returns an array of objects, each object containing the ID and name of an assigned contact.
 * 
 * @returns {Array<Object>} An array of objects, each with the structure { id: number, name: string }.
 */
function getAssignedContacts() {
  let assignedContactDetails = [];
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = assignedContacts[i];
    assignedContactDetails.push({ id: contact.id, name: contact.name });
  }
  return assignedContactDetails;
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