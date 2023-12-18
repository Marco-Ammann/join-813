function generateAssignContactsHTML(contact, index) {
  const name = contact.name;
  return `
    <div class="contactDiv" id="contact${index}" onclick="handleClickOnAssignedContact(${index})">
        <div class="contactDiv-sub">
            <div class="contact-avatar" style="background-color: ${
              contact.color
            };">${getInitials(name)}</div>
            ${contact.name}
        </div>
        <img class="checkbox" id="checkbox${index}" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}

function generateCategoryOptionsHTML(category, index) {
    return `
      <div class="categoryDiv" id="categoryOption${index}" onclick="switchTaskCategoryClickedState('${index}')">${category}</div>
    `;
  }

function generateAvatar(contact) {
  return `
    <div class="contact-avatar" style="background-color: ${
      contact.color
    };">${getInitials(contact.name)}</div>
    `;
}

function generateSubtaskHTML(subtask, index) {
  return /*HTML */ `
    <div class="subTaskDiv">
        <li id="task${index}">${subtask}</li>
        <div class="subTask-subDiv">
            <img class="subTask-icons" src="./assets/img/Desktop/add_task/subtasks_icons/edit.svg" alt="edit" onclick="editSubtask(${index})">
                <div class="subtasks-Seperator">|</div>
            <img class="subTask-icons" src="./assets/img/Desktop/add_task/subtasks_icons/delete.svg" alt="delete" onclick="deleteSubtask(${index})">
        </div>
    </div>
    `;
}
