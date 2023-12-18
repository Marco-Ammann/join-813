let subtasks = [];
let assignedContacts = [];
let clickedPriority = "medium";



function getValues() {
  return {
    id: createTaskId(),
    taskTitle: getTaskTitle(),
    description: getTaskDescription(),
    assignedTo: getAssignedContacts(),
    dueDate: getDueDate(),
    priority: getPriority(),
    category: getCategory(),
    subtasks: getSubtask(),
    state: "ToDo",
  };
}

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

function getTaskTitle() {
  let taskTitle = document.getElementById("task-title-input").value;
  return taskTitle;
}

function getTaskDescription() {
  let taskDescription = document.getElementById(
    "task-description-textarea"
  ).value;
  return taskDescription;
}

function getAssignedContacts() {
  const contactNames = [];
  for (const contact of assignedContacts) {
    contactNames.push(contact.name);
  }
  return contactNames;
}

function getDueDate() {
  let dueDate = document.getElementById("due-date-input").value;
  let parts = dueDate.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } else {
    return dueDate;
  }
}

function getPriority() {
  return clickedPriority;
}

function getCategory() {
  let categoryDropdown = document.getElementById("categoryDropdown");
  let selectedCategory = categoryDropdown.querySelector(".contactDivClicked");
  if (selectedCategory) {
    return selectedCategory.textContent.trim();
  } else {
    return "";
  }
}

function getSubtask() {
  return subtasks;
}
