



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


}

function formatDateToInput(dateString) {
    let parts = dateString.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}



/**
 * Updates the UI with the current list of subtasks.
 * Iterates over the subtasks array and appends each subtask to the subtask container.
 */
function createSubtaskList(i) {
    const subtaskContainer = document.getElementById("subTasks-popup");
    subtaskContainer.innerHTML = "";
  
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
      const subtask = tasks[i].subtasks[i];
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


