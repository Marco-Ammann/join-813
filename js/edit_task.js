function acceptAndSetEditOfTask(taskIndex, context) {
  // Aktualisieren der Task-Eigenschaften
  let updatedTask = getValuesAfterEdit(taskIndex, context);
  tasks[taskIndex] = updatedTask;

  // Aktualisieren des Tasks im Backend
  setItem('tasks', tasks).then(() => {
    closeWindowAfterSavingEdit()
    loadBoard(); // Refreshing the board after updating
  });
}


function getValuesAfterEdit(taskId, context = "main") {
  return {
    "id": taskId,
    "taskTitle": getTaskTitle(context),
    "description": getTaskDescription(context),
    "assignedTo": getAssignedContacts(),
    "dueDate": getDueDate(context),
    "priority": getPriority(),
    "category": getCategoryOfTask(taskId),
    "subtasks": getSubtask(),
    "subtasksDone": getSubtasksDone(taskId),
    "state": getTaskState(taskId),
  };
}

function closeWindowAfterSavingEdit(){
  closeCard();
  sortTaks();
  clearForm('assigned-contacts-popup', 'subTasks-popup');
  removeListeners('add-contact-input-popup');
}

   


function getTaskState(taskIndex) {
  let stateOfTask = tasks[taskIndex].state;
  return stateOfTask;
}

function getSubtasksDone(taskIndex) {
  let subtasksDoneOfTask = tasks[taskIndex].subtasksDone;
  return subtasksDoneOfTask;
}



function setValuesInEditCard(taskIndex, SubTasksDiv) {
    let openTask = tasks[taskIndex];

    let openTaskTitle = document.getElementById('task-title-input-popup');
    openTaskTitle.value = openTask.taskTitle;

    let openTaskDescription = document.getElementById("task-description-textarea-popup");
    openTaskDescription.value = openTask.description;

    let openTaskDate = document.getElementById("due-date-input-popup");
    if (openTask.dueDate) {
        let formattedDate = formatDateToInput(openTask.dueDate);
        openTaskDate.value = formattedDate;
    }

    createSubtaskList(taskIndex, SubTasksDiv);
    setSubtasksOfTask(taskIndex);
    setTaskPriorityInEditWindow(taskIndex);

}


function setSubtasksOfTask(taskIndex) {
  subtasks = [];
  let subTasksOfTask = tasks[taskIndex].subtasks;
  subtasks = subTasksOfTask;
}



function getCategoryOfTask(taskIndex) {
  let categoryOfTaskToEdit = tasks[taskIndex].category;
    return categoryOfTaskToEdit;
}



function formatDateFromInput(dateString) {
  let parts = dateString.split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';
}


/**
 * Konvertiert ein Datum vom Format 'dd/mm/yyyy' in das Format 'yyyy-mm-dd'.
 *
 * @param {string} dateString - Das Datum im Format 'dd/mm/yyyy'.
 * @returns {string} Das Datum im Format 'yyyy-mm-dd'.
 */
function formatDateToInput(dateString) {
  let parts = dateString.split('/');
  if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
      return '';
  }
}




  function createSubtaskList(taskIndex, SubTasksDiv) {
    const subtaskContainer = document.getElementById(SubTasksDiv);
    subtaskContainer.innerHTML = "";
    
    for (let j = 0; j < tasks[taskIndex].subtasks.length; j++) {
      subtasks.push(tasks[taskIndex].subtasks[j]);
      const subtask = subtasks[j];
      subtaskContainer.innerHTML += generateSubtaskHTML(subtask, j, SubTasksDiv);
    }
  }





  function setClickedContacts(i, container) {
    let assignedContacts = tasks[i].assignedTo;
    console.log('Zugewiesene Kontakte im Task:', assignedContacts);
  
    // Initialisiere clickedStates für alle Kontakte als 'false'
    clickedStates = Array(contacts.length).fill(false);
    
    assignedContacts.forEach(assignedContact => {
      let contactIndex = contacts.findIndex(contact => contact.id === assignedContact.id);
      if (contactIndex !== -1) {
        // Setze den Click-Status des zugewiesenen Kontakts auf 'true'
        handleClickOnAssignedContact(contactIndex, container);
      }
    });
  }

  function setTaskPriorityInEditWindow(taskId) {
    let task = tasks.find(t => t.id === taskId);

    if (task) {
        let priority = task.priority;
        setPrio(priority);
          }
}


