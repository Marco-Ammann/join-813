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
  return /*HTML*/`

<div class="subTask-Wrapper">

  <div class="subTaskDiv" id="subTaskDiv${index}">
    <li id="task${index}" onclick="editSubtask(${index})">${subtask}</li>
    <div class="subTask-subDiv" id="subTask-subDiv${index}">
    <img class="subTask-icons" id="editSubtaskSVG${index}" src="./assets/img/Desktop/add_task/subtasks_icons/edit.svg" alt="edit" onclick="editSubtask(${index})">
      <div class="subtasks-Seperator">|</div>
      <img class="subTask-icons" id="deleteSVG${index}" src="./assets/img/Desktop/add_task/subtasks_icons/delete.svg" alt="delete" onclick="deleteSubtask(${index})">
    </div>
  </div>

  <div class="edit-subtask-div d-none" id="edit-subtask-div${index}">
    <input type="text" class="editInput" id="editInput${index}">
    <div class="edit-subTask-subDiv" id="edit-subTask-subDiv${index}">
      <img class="subTask-icons" id="deleteEditSVG${index}" src="./assets/img/Desktop/add_task/subtasks_icons/delete.svg" alt="edit" onclick="cancelEditSubtask(${index})">
      <div class="subtasks-Seperator">|</div>
      <img class="subTask-icons" id="saveSVG${index}" src="./assets/img/Desktop/add_task/subtasks_icons/check.svg" alt="delete" onclick="handleCheckClick(${index})">
    </div>
  </div>
</div>

</div>

  `;
}
