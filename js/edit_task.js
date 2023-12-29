function acceptAndSetEditOfTask(taskId) {
  // Ermitteln des zu aktualisierenden Tasks
  let task = tasks.find(t => t.id === taskId);

  if (task) {
      // Holen der aktualisierten Werte aus den Eingabefeldern
      task.taskTitle = document.getElementById('task-title-input-popup').value;
      task.description = document.getElementById("task-description-textarea-popup").value;
      task.dueDate = formatDateFromInput(document.getElementById("due-date-input-popup").value);
      task.priority = clickedPriority; // Angenommen, diese Variable hält die aktuelle Priorität
      task.assignedTo = getAssignedContactsFromEdit(); // Eine Funktion, die die ausgewählten Kontakte aus der Bearbeitungsansicht holt

      // Hier können Sie weitere Felder aktualisieren, z.B. Subtasks

      // Aktualisieren des tasks-Arrays im Speicher
      saveTasks(); // Eine Funktion, die das aktualisierte tasks-Array speichert
  }
}


function getAssignedContactsFromEdit() {
  // Implementieren Sie die Logik, um die ausgewählten Kontakte aus der Bearbeitungsansicht zu holen
  return []; // Beispiel-Rückgabewert
}


function saveTasks() {
  // Implementieren Sie die Logik zum Speichern des aktualisierten tasks-Arrays
}


function setValuesInEditCard(i) {
    let openTask = tasks[i];

    let openTaskTitle = document.getElementById('task-title-input-popup');
    openTaskTitle.value = openTask.taskTitle;

    let openTaskDescription = document.getElementById("task-description-textarea-popup");
    openTaskDescription.value = openTask.description;

    let openTaskDate = document.getElementById("due-date-input-popup");
    if (openTask.dueDate) {
        let formattedDate = formatDateToInput(openTask.dueDate);
        openTaskDate.value = formattedDate;
    }

    createSubtaskList(i);

    setTaskPriorityInEditWindow(i);

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


/**
 * Updates the UI with the current list of subtasks.
 * Iterates over the subtasks array and appends each subtask to the subtask container.
 */
function createSubtaskList(i) {
    const subtaskContainer = document.getElementById("subTasks-popup");
    subtaskContainer.innerHTML = "";
  
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
      const subtask = tasks[i].subtasks[j];
      subtaskContainer.innerHTML += generateSubtaskHTML(subtask, j);
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


