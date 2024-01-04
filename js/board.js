let ToDoContainer = 'false';
let InProgressContainer = 'false';
let AwaitFeedbackContainer = 'false';
let DoneContainer = 'false';


/**
 * Initializes a variable to track the currently dragged element.
 * @type {Element}
 */
let currentDragedElement;


/**
 * An array of task states.
 * @type {string[]}
 */
const states = ["InProgress", "Done", "AwaitFeedback", "ToDo"];


/**
 * Asynchronously loads the task board.
 * @async
 * @function loadBoard
 */
async function loadBoard() {
    await setTasks();
    sortTaks();
    removeListeners('add-contact-input-popup');
}


/**
 * Asynchronously sets the tasks array by retrieving tasks from storage.
 * If tasks exist in storage, it assigns them to the 'tasks' variable; otherwise, it initializes an empty array.
 * Logs the tasks to the console.
 * @async
 * @function setTasks
 */
async function setTasks() {
    let tasksToSet = await getTasksArray();
    if (Array.isArray(tasksToSet)) {
        tasks = tasksToSet;
    } else {
        tasks = [];
    }
    console.log(tasks);
}


/**
 * Sorts tasks and renders them in their respective containers based on their state.
 * If there are no tasks, displays a message indicating there are no tasks in each container.
 */
function sortTaks() {
    // Clear the task containers
    document.getElementById("ToDoContainer").innerHTML = "";
    document.getElementById("InProgressContainer").innerHTML = "";
    document.getElementById("AwaitFeedbackContainer").innerHTML = "";
    document.getElementById("DoneContainer").innerHTML = "";

    if (tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            const taskStatus = tasks[i]['state'];
            render(taskStatus, i);
        }
    } else {
        // If there are no tasks, add a message indicating there are no tasks in each container
        addNoTaskHTML('ToDoContainer');
        addNoTaskHTML('InProgressContainer');
        addNoTaskHTML('AwaitFeedbackContainer');
        addNoTaskHTML('DoneContainer');
    }
}


/**
 * Renders a task card and adds it to the appropriate task container based on its status.
 *
 * @param {string} taskStatus - The status of the task (ToDo, InProgress, AwaitFeedback, Done).
 * @param {number} taskIndex - The index of the task in the tasks array.
 */
function render(taskStatus, taskIndex) {
    taskStatus = taskStatus + "Container";
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML += /*html*/ `    
        <div onclick="openCard(${taskIndex})" id="card${taskIndex}" draggable="true" ondragstart="startDraggin(${taskIndex})">
            <div class="toDoCard">
                <div class="headerUserStory headerUserStoryPopUp">User Story</div>
                <div>
                    <h3>${tasks[taskIndex][`taskTitle`]}</h3>
                    <p>${tasks[taskIndex][`description`]}</p>
                </div>
                <div id="progressbar${taskIndex}" class="progressbar">
                </div>
                <div class="toDoCardFooter">
                    <div id="cardIcon${taskIndex}" class="userIcon">
                    </div>
                    <img src="./assets/img/Desktop/board/priority_symbols/${tasks[taskIndex][`priority`]}.svg">
                </div>
            </div>
        </div>
`;
    checkAndAddTasks(tasks);
    addTaskIcon(`cardIcon${taskIndex}`, taskIndex);
    addProgressBar(taskIndex);
}


/**
 * Adds a progress bar to a task card based on the completion of subtasks.
 *
 * @param {number} i - The index of the task in the tasks array.
 */
function addProgressBar(i) {
    let taks = tasks[i]["subtasks"].length + tasks[i]["subtasksDone"].length;
    if (taks > 0) {
        let calculatetSubtaks = 100 / taks;
        calculatetSubtaks = calculatetSubtaks * tasks[i]["subtasksDone"].length;
        content = document.getElementById(`progressbar${i}`);
        content.innerHTML = /*html*/ `
                <progress max="100" value="${calculatetSubtaks}"></progress>
                <span>${tasks[i]["subtasksDone"].length}/${taks} Subtaks</span>
                `;
    }
}


/**
 * Opens and displays a detailed card for a task.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 */
function openCard(taskIndex) {
    const content = document.getElementById(`openCard`);
    content.innerHTML = "";
    const openCardContainer = document.getElementById("openCardContainer");
    openCardContainer.classList.remove("hidden");

    content.innerHTML = generateOpenCardHTML(taskIndex);
    addOpenTaskIcon(`openCardIcon${taskIndex}`, taskIndex);
    addTransition();
    addOpenCardSubtasks(taskIndex);
}


/**
 * Opens and displays an editable card for a task, allowing for task details modification.
 *
 * @async
 * @param {number} taskIndex - The index of the task in the tasks array.
 */
async function editCard(taskIndex) {
    const card = document.getElementById(`openCard`);
    card.innerHTML = generateEditCardHTML(taskIndex);
    setValuesInEditCard(taskIndex, 'subTasks-popup');

    // Assuming generateAssignContacts is an async function
    await generateAssignContacts('assignDropdown-popup', 'assigned-contacts-popup');

    setupDropdownCloseListener('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup');
    setupFilterListener('add-contact-input-popup', 'assignDropdown-popup');

    toggleDropdown('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup', 'Select contacts to assign');
    setClickedContacts(taskIndex, 'assigned-contacts-popup');
    toggleDropdown('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup', 'Select contacts to assign');
    clickPriority(taskIndex)
}


/**
 * Sets the priority of the task to match the specified priority.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 */
function clickPriority(taskIndex) {
    let setPriority = tasks[taskIndex].priority;
    setPrio(setPriority);
}


/**
 * Adds icons for assigned contacts to the open card.
 *
 * @param {string} id - The ID of the HTML element where icons will be added.
 * @param {number} x - The index of the task in the tasks array.
 */
function addOpenTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]["assignedTo"].length; i++) {
        let assignedContactId = tasks[x]["assignedTo"][i].id;
        let contact = contacts.find(c => c.id === assignedContactId);
        if (contact) {
            let color = contact["color"];
            const nameParts = contact["name"].split(" ");
            const firstNameInitial = nameParts[0].charAt(0);
            const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

            content.innerHTML += /*html*/ `
            <div class="openCardIcon">
              <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
              <p>${contact["name"]}</p>
            </div>
            `;
        }
    }
}


/**
 * Adds icons for assigned contacts to a task card.
 *
 * @param {string} id - The ID of the HTML element where icons will be added.
 * @param {number} x - The index of the task in the tasks array.
 */
function addTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]["assignedTo"].length; i++) {
        let assignedContactId = tasks[x]["assignedTo"][i].id;
        let contact = contacts.find(c => c.id === assignedContactId);
        if (contact) {
            let color = contact["color"];
            const nameParts = contact["name"].split(" ");
            const firstNameInitial = nameParts[0].charAt(0);
            const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

            content.innerHTML += /*html*/ `
              <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
            `;
        }
    }
}



/**
 * Adds subtasks to the open task card.
 *
 * @param {number} taskIndex - The index of the task in the tasks array.
 */
function addOpenCardSubtasks(taskIndex) {
    // Get the HTML element where subtasks will be added
    let content = document.getElementById(`openCardSubtasks${taskIndex}`);
    content.innerHTML = "";

    // Add incomplete subtasks
    for (let i = 0; i < tasks[taskIndex]["subtasks"].length; i++) {
        content.innerHTML += /*html*/ `
        <div class="hoverPointer openCardSubtasks" id="subtask${i}" onclick="subtaskComplete(${i}, ${taskIndex})">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
          </svg>
          ${tasks[taskIndex]["subtasks"][i]}
        </div>
      `;
    }

    // Add completed subtasks
    for (let y = 0; y < tasks[taskIndex]["subtasksDone"].length; y++) {
        content.innerHTML += /*html*/ `
        <div class="openCardSubtasks" id="subtaskDone${y}" onclick="subtaskUnComplete(${y}, ${taskIndex})">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="textCross">
            ${tasks[taskIndex]["subtasksDone"][y]}
          </p>
        </div>
      `;
    }
}


/**
 * Marks a subtask as complete and moves it to the "Done" section.
 *
 * @param {number} i - Index of the subtask to mark as complete.
 * @param {number} taskIndex - Index of the task containing the subtask.
 */
async function subtaskComplete(i, taskIndex) {
    let content = document.getElementById(`subtask${i}`);
    content.innerHTML = /*html*/ `
    <div class="openCardSubtasks" id="subtaskDone${i}" onclick="subtaskUnComplete(${i}, ${taskIndex})">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${tasks[taskIndex]["subtasks"][i]}
    </div>
    `;
    moveSubtaskToDone(i, taskIndex);
    await setItem('tasks', tasks);
    addOpenCardSubtasks(taskIndex);
    console.log(tasks[taskIndex].subtasks);
}


/**
 * Marks a completed subtask as incomplete and moves it back to the "To Do" subtasks list.
 *
 * @param {number} i - Index of the completed subtask to mark as incomplete.
 * @param {number} taskIndex - Index of the task containing the subtasks.
 */
async function subtaskUnComplete(i, taskIndex) {
    let content = document.getElementById(`subtaskDone${i}`);
    content.innerHTML = /*html*/ `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
                ${tasks[taskIndex]["subtasks"]}
    `;
    moveSubtaskToNotDone(i, taskIndex);
    await setItem('tasks', tasks);
    addOpenCardSubtasks(taskIndex);
    console.log(tasks[taskIndex].subtasksDone);

}


/**
 * Moves a subtask from the "To Do" subtasks list to the "Done" subtasks list of a task.
 *
 * @param {number} subTaskIndex - Index of the subtask to move.
 * @param {number} taskIndex - Index of the task containing the subtasks.
 */
function moveSubtaskToDone(subTaskIndex, taskIndex) {
    let subTaskToRemove = tasks[taskIndex]["subtasks"][subTaskIndex];
    tasks[taskIndex]["subtasks"].splice(subTaskIndex, 1);
    tasks[taskIndex]["subtasksDone"].push(subTaskToRemove);
    addOpenCardSubtasks(taskIndex);
}


/**
 * Moves a subtask from the "Done" subtasks list to the "To Do" subtasks list of a task.
 *
 * @param {number} subTaskIndex - Index of the subtask to move.
 * @param {number} taskIndex - Index of the task containing the subtasks.
 */
function moveSubtaskToNotDone(subTaskIndex, taskIndex) {
    let subTaskToUndo = tasks[taskIndex]["subtasksDone"][subTaskIndex];
    tasks[taskIndex]["subtasksDone"].splice(subTaskIndex, 1);
    tasks[taskIndex]["subtasks"].push(subTaskToUndo);
    addOpenCardSubtasks(taskIndex);
}


/**
 * Closes the open task card and hides it from the view.
 */
function closeCard() {
    const transout = document.getElementById("openCard");
    transout.style = 'animation: slideOutCard 100ms ease-out;';
    setTimeout(() => {
        const div = document.getElementById("openCardContainer");
        transout.style = '';
        div.classList.add("hidden");
    }, 100);
}


/**
 * Adds a transition effect to show the open task card.
 */
function addTransition() {
    const div = document.getElementById("openCardContainer");
    div.classList.remove("hidden");

    const transitionDiv = document.getElementById("openCard");
    transitionDiv.style = 'animation: slideInCard 100ms ease-out;';
}


/**
 * Initiates the drag operation when an element is being dragged.
 *
 * @param {number} id - The unique identifier of the element being dragged.
 */
function startDraggin(id) {
    currentDraggedElement = id;
    addRotation(id);
}


/**
 * Allows a drop operation by preventing the default behavior of the dragover event.
 *
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

function highlight(id) {

}

function removeHighlight(id) {

}


/**
 * Moves a task to a different category.
 *
 * @param {string} category - The category to which the task should be moved.
 * @param {number} id - The ID of the task to be moved.
 */
function moveTo(category) {
    tasks[currentDraggedElement][`state`] = category;
    sortTaks();

}


/**
 * Adds a rotation class to a task card element.
 *
 * @param {number} id - The ID of the task card to which the rotation class should be added.
 */
function addRotation(id) {
    let card = document.getElementById('card' + `${id}`);
    card.classList.add('rotateCard')
}


/**
 * Checks if there are tasks for each state and adds a "No Task" message if no tasks exist.
 *
 * @param {Array} tasks - An array of tasks to be checked.
 */
function checkAndAddTasks(tasks) {
    states.forEach((state) => {
        const filteredTasks = tasks.filter((task) => task.state === state);

        if (filteredTasks.length === 0) {
            addNoTaskHTML(state + "Container");
        }
    });
}


/**
 * Adds a "No Task" message to the specified container based on its ID.
 *
 * @param {string} containerId - The ID of the container where the message should be added.
 */
function addNoTaskHTML(containerId) {
    const messages = {
        'ToDoContainer': "No task To do",
        'InProgressContainer': "No task in progress",
        'AwaitFeedbackContainer': "No task awaiting feedback",
        'DoneContainer': "No completed tasks"
    };

    const message = messages[containerId];
    document.getElementById(containerId).innerHTML = createNoTaskHTML(message);
}


/**
 * Creates HTML for displaying a "No Task" message with the specified message text.
 *
 * @param {string} message - The message text to display.
 * @returns {string} HTML string for the "No Task" message.
 */
function createNoTaskHTML(message) {
    return /*html*/ `
        <div class="noTaskFound">
            <p>${message}</p>
        </div>
    `;
}



/**
 * Sorts and filters the cards based on a search term.
 * Retrieves the search term from the "sortTasksInput" input field, converts it to lowercase,
 * and filters the cards with titles or descriptions that contain the search term.
 * Displays matching cards and hides non-matching cards.
 */
function sortAndFilterCards(inputId) {
    const searchTerm = document.getElementById(`${inputId}`).value.toLowerCase(); // Get the entered search term and convert it to lowercase
    const cards = document.querySelectorAll(".toDoCard"); // Get all cards with the class 'toDoCard'

    cards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase(); // Get the title of the card and convert it to lowercase

        // Check if the search term is found in the title or description of the card
        if (title.includes(searchTerm)) {
            card.parentNode.style.display = "block"; // Display the card if the search term is found
        } else {
            card.parentNode.style.display = "none"; // Hide the card if the search term is not found
        }
    });
}


/**
 * Opens the add task menu and sets the current task state based on the selected state.
 * If the window width is less than 1000 pixels, it redirects to the "add_task.html" page.
 * Otherwise, it displays the add task menu with a sliding animation.
 *
 * @param {string} state - The selected task state ("ToDo", "InProgress", "AwaitFeedback", "Done").
 */
function openAddTaskMenu(state) {
    currentTaskState = state;
    if (window.innerWidth < 1000) {
        window.location.href = "add_task.html";
    } else {
        const transout = document.getElementById("transition");

        const div = document.getElementById("animationDiv");
        div.classList.remove("hidden");

        const transitionDiv = document.getElementById("transition");
        transitionDiv.style = 'animation: slideInAddNew 100ms ease-in-out;'
    }
}


/**
 * Adds the "d-none" class to the add task menu and clears the form.
 * It also removes the sliding animation from the menu.
 *
 * @param {string} assignedContactsAvatarDiv - The ID of the assigned contacts avatar div.
 */
function addDnonToAddTaks(assignedContactsAvatarDiv) {
    const transout = document.getElementById("transition");
    transout.style = 'animation: slideOutAddNew 100ms ease-in-out;'
    setTimeout(() => {
        const div = document.getElementById("animationDiv");
        transout.style = '';
        div.classList.add("hidden");
    }, 100);
    clearForm(assignedContactsAvatarDiv, 'subTasks');
}


/**
 * Deletes the currently open card from the tasks list, sorts the tasks, and closes the card.
 * Also updates the tasks data in storage.
 *
 * @async
 * @param {number} i - The index of the task to delete.
 */
async function deleteOpenCard(i) {
    tasks.splice(i, 1);
    sortTaks();
    closeCard();
    await setItem('tasks', tasks);
}