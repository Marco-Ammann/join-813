/**
 * Generates HTML markup for the edit task card popup.
 *
 * @param {number} i - The index of the task to be edited.
 * @returns {string} HTML markup for the edit task card.
 */
function generateEditCardHTML(i) {
  return /*HTML*/ `
<div class="add-tasks-popup pos-static">

<div class="editor-wrapper">
    <div class="addTaskHeader">
        <h1 class="content-title">Add Task</h1>
        <button id="closeAddTaskButton" onclick="closeCard(), clearForm('assigned-contacts-popup', 'subTasks-popup'), removeListeners('add-contact-input'),setEditFormOpenedToFalse();"><svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_116223_1910" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                    width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_116223_1910)">
                    <path
                        d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                        fill="#2A3647" />
                </g>
            </svg>
        </button>
    </div>

    <div>
        <section class="task-forms task-forms-editor">
            <div class="forms-sides">
                <div class="form-div">
                    <span class="form-span required-asteriks">Title</span>
                    <div class="form-subcontainer">
                        <input id="task-title-input-popup" maxlength="48" class="task-title-input" type="text"
                            placeholder="Enter a title" required />
                        <p class="input-required-warning invisible" id="requiredTextTitle">This field is
                            required</p>
                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span required-asteriks">Description</span>
                    <div class="form-subcontainer">
                        <textarea id="task-description-textarea-popup" class="task-description-textarea"
                            name="inputDescription" placeholder="Enter a Description" required></textarea>
                        <p class="input-required-warning invisible" id="requiredTextDescription">This
                            field is required</p>
                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span">Assigned to</span>
                    <div class="input-div-wrapper">
                        <div class="input-div">
                            <input id="add-contact-input-popup" class="add-contact-input" type="text"
                                placeholder="Select contacts to assign" required
                                onclick="toggleDropdown('assignDropdown-popup', 'arrowAssign-popup');" />
                            <img class="arrow-symbol input-symbol" id="arrowAssign-popup"
                                src="./assets/img/Desktop/add-task/arrow_dropdown_down.svg" alt="Pfeil runter"
                                onclick="toggleDropdown('assignDropdown-popup', 'arrowAssign-popup')" />
                        </div>
                        <div class="assignDropdown-popup d-none" id="assignDropdown-popup"></div>
                    </div>
                    <div class="assigned-contacts" id="assigned-contacts-popup"></div>

                </div>
            </div>

            <div class="seperator-vertical"></div>

            <div class="forms-sides">
                <div class="form-div">
                    <span class="form-span required-asteriks">Due
                        date</span>
                    <div class="form-subcontainer">

                        <div class="input-div">
                            <input id="due-date-input-popup" maxlength="48" class="due-date-input" type="date"
                                placeholder="dd/mm/yyyy" required />
                        </div>

                        <p class="input-required-warning invisible" id="requiredTextDueDate">This field
                            is required</p>

                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span">Prio</span>
                    <div class="prio-buttons">
                        <button type="button" class="prio-btn" id="urgentBtn" onclick="setPrio('urgent')">
                            <span>Urgent</span>
                            <img src="./assets/img/Desktop/add-task/priority_icons/urgent.svg" id="urgentSymbol" />
                        </button>
                        <button type="button" class="prio-btn medium" id="mediumBtn" onclick="setPrio('medium')">
                            <span>Medium</span>
                            <img src="./assets/img/Desktop/add-task/priority_icons/medium_white.svg" id="mediumSymbol" />
                        </button>
                        <button type="button" class="prio-btn" id="lowBtn" onclick="setPrio('low')">
                            <span>Low</span>
                            <img src="./assets/img/Desktop/add-task/priority_icons/low.svg" id="lowSymbol" />
                        </button>
                    </div>
                </div>


                <div class="form-div">
                    <span class="form-span">Subtasks</span>
                    <div class="form-subcontainer">

                        <div class="input-div" id="subtask-input-div">
                            <input id="subtask-input-popup" maxlength="48" class="subtask-input" type="text"
                                placeholder="Add new subtask" onfocus="addFocusClass()" />

                            <div class="plus-symbol-div" id="plus-symbol-div">
                                <img class="plus-symbol input-symbol" id="plus-symbol-subtask>"
                                    onclick="addFocusClass()"
                                    src="./assets/img/Desktop/add-task/subtasks_icons/add.svg" alt="plus" />
                            </div>

                            <div class="create-task-div d-none" id="create-task-div">
                                <img class="plus-symbol input-symbol" id="close-symbol-subtask"
                                    onclick="clearSubtaskInput()"
                                    src="./assets/img/Desktop/add-task/subtasks_icons/close.svg"
                                    alt="cancel-symbol" />

                                <img class="check-symbol input-symbol" id="check-symbol-subtask"
                                    onclick="setSubtask('subtask-input-popup', 'subTasks-popup')"
                                    src="./assets/img/Desktop/add-task/subtasks_icons/check.svg" alt="check-symbol" />
                            </div>
                        </div>
                    </div>
                    <div id="subTasks-popup" class="subTasks"></div>
                </div>
        </section>
    </div>
</div>

<div class="footer-container">


    <div class="footer-btn-container">


        <button id="createTaskBtn" type="submit" class="addTaskBtnOk createBtn"
            onclick="acceptAndSetEditOfTask(${i}, 'popup'), setEditFormOpenedToFalse()">
            <span>OK</span>
            <img src="./assets/img/Desktop/add-task/check.svg" alt="weißer Haken" />
        </button>
    </div>
</div>

</div>
    `;
}

/**
 * Generates HTML markup for an open task card.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @returns {string} HTML markup for the open task card.
 */
function generateOpenCardHTML(taskIndex) {
  return /*html*/ `        
    <div class="toDoCard openCard">
        <div class="openCardHeader">
        <div class="headerUserStory headerUserStoryPopUp">User Story</div>
            <a onclick="closeCard()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_117782_4211" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_117782_4211)">
                        <path d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                    </g>
                </svg>
            </a>
        </div>
        <div class="openCardContent">
            <h3 id="openCardTitle${taskIndex}">${
    tasks[taskIndex][`taskTitle`]
  }</h3>
            <h4 id="openCardDescription${taskIndex}">${
    tasks[taskIndex][`description`]
  }</h4>
            <div class="openCardTable">
            <p>Due date:</p><span id="openCardDate${taskIndex}">${
    tasks[taskIndex][`dueDate`]
  }<span>
            </div>
            <div class="openCardTable">
            <p>Priority:</p>
                <div class="openCardPriority">
                <span id="openCardPriority${taskIndex}">${
    tasks[taskIndex][`priority`]
  }</span>
                <img src="./assets/img/Desktop/board/priority_symbols/${
                  tasks[taskIndex][`priority`]
                }.svg">
                </div>
            </div>
        </div>
        <div id="openCardIcon${taskIndex}" class="openCardAssigned">
            <p>Assigned To:</p>
        </div>
        <div class="openCardSubtasks-container">
            <p>Subtask</p>
            <div id="openCardSubtasks${taskIndex}"></div>
        </div>
        <div class="openCardFooter">
            <a href="#" onclick="deleteOpenCard(${taskIndex})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_118031_2295" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_118031_2295)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
                </svg>
                <p>Delete</p></a>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="24" viewBox="0 0 2 24" fill="none">
                <path d="M1 0V24" stroke="#D1D1D1"/>
                </svg>
                </div>
            <a href="#" onclick="editCard(${taskIndex}), loadFromAddTaskPage()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_118031_4276" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_118031_4276)">
                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                </g>
                </svg>
                <p>Edit</p>
            </a>
        </div>
    </div>
    `;
}

/**
 * Creates an icon for a contact.
 *
 * @param {Object} contact - The contact object.
 * @returns {string} - HTML string for the contact icon.
 */
function createContactIcon(contact) {
  let color = contact["color"];
  const nameParts = contact["name"].split(" ");
  const firstNameInitial = nameParts[0].charAt(0);
  const lastNameInitial =
    nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

  return /*html*/ `
        <div class="openCardIcon">
          <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
          <p>${contact["name"]}</p>
        </div>
    `;
}

/**
 * Generates HTML for a contact icon.
 *
 * @param {Object} contact - The contact object.
 * @param {number} index - The current index in the loop.
 * @returns {string} HTML string for the contact icon.
 */
function createContactIconHTML(contact, index) {
  if (index === 3) {
    return /*html*/ `<div class="icon" style="background-color: #F6F7F8; color: #2A3647"><b>...</b></div>`;
  }

  let names = getInitials(contact["name"]);
  return /*html*/ `<div class="icon" style="background-color: ${contact["color"]};">${names}</div>`;
}

/**
 * Creates HTML for an incomplete subtask.
 *
 * @param {string} subtask - The subtask text.
 * @param {number} index - The index of the subtask.
 * @param {number} taskIndex - The index of the task.
 * @returns {string} HTML string for the incomplete subtask.
 */
function createIncompleteSubtaskHTML(subtask, index, taskIndex) {
  return /*html*/ `
        <div class="hoverPointer openCardSubtasks" id="subtask${index}" onclick="subtaskComplete(${index}, ${taskIndex})">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
          </svg>
          ${subtask}
        </div>
    `;
}

/**
 * Creates HTML for a completed subtask.
 *
 * @param {string} subtask - The subtask text.
 * @param {number} index - The index of the subtask.
 * @param {number} taskIndex - The index of the task.
 * @returns {string} HTML string for the completed subtask.
 */
function createCompleteSubtaskHTML(subtask, index, taskIndex) {
  return /*html*/ `
        <div class="openCardSubtasks" id="subtaskDone${index}" onclick="subtaskUnComplete(${index}, ${taskIndex})">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="textCross">
            ${subtask}
          </p>
        </div>
    `;
}

/**
 * Generates HTML markup for a task card.
 *
 * @param {Object} task - The task object.
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @returns {string} HTML markup for the task card.
 */
function generateTaskCardHTML(task, taskIndex) {
  return /*html*/ `    
        <div class="hoverPointer" onclick="openCard(${taskIndex})" id="card${taskIndex}" draggable="true" ondragstart="startDraggin(${taskIndex}), highlight('${
    task.state
  }')">
            <div class="toDoCard">
                <div class="${category(task.category)} headerUserStoryPopUp">${
    task.category
  }</div>
                <div>
                    <h3>${task.taskTitle}</h3>
                    <p>${addDescription(task.description)}</p>
                </div>
                <div id="progressbar${taskIndex}" class="progressbar"></div>
                <div class="toDoCardFooter">
                    <div id="cardIcon${taskIndex}" class="userIcon"></div>
                    <img src="./assets/img/Desktop/board/priority_symbols/${
                      task.priority
                    }.svg">
                </div>
            </div>
        </div>
    `;
}
