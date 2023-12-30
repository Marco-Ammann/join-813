let currentDragedElement;


const states = ["InProgress", "Done", "AwaitFeedback", "ToDo"];

async function loadBoard() {
    await setTasks();
    sortTaks();
    removeListeners('add-contact-input-popup');
}



async function setTasks() {
    let tasksToSet = await getTasksArray();
    if (Array.isArray(tasksToSet)) {
        tasks = tasksToSet;
    } else {
        tasks = [];
    }
    console.log(tasks);
}


function sortTaks() {
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
        addNoTaskHTML('ToDoContainer');
        addNoTaskHTML('InProgressContainer');
        addNoTaskHTML('AwaitFeedbackContainer');
        addNoTaskHTML('DoneContainer');
    }
}

function render(taskStatus, taskIndex) {
    taskStatus = taskStatus + "Container";
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML += /*html*/ `    
        <div onclick="openCard(${taskIndex})" id="card${taskIndex}" draggable="true" ondragstart="startDraggin(${tasks[taskIndex][`id`]})">
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



function clickPriority(taskIndex){
let setPriority = tasks[taskIndex].priority;
setPrio(setPriority);
}



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

function addOpenCardSubtasks(taskIndex) {
    let content = document.getElementById(`openCardSubtasks${taskIndex}`);
    content.innerHTML = "";

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


function moveSubtaskToDone(subTaskIndex, taskIndex) {
    // Zugriff auf das zu entfernende Subtask-Element
    let subTaskToRemove = tasks[taskIndex]["subtasks"][subTaskIndex];

    // Entfernen des Elements aus tasks[x]['subtasks']
    tasks[taskIndex]["subtasks"].splice(subTaskIndex, 1);

    // Hinzufügen des entfernten Elements zu tasks[x]['subtasksDone']
    tasks[taskIndex]["subtasksDone"].push(subTaskToRemove);

    // Annahme: addopenCardSubtasks ist eine Funktion, die definiert ist und korrekt funktioniert
    addOpenCardSubtasks(taskIndex);
}


function moveSubtaskToNotDone(subTaskIndex, taskIndex) {
    // Zugriff auf das zu entfernende Subtask-Element
    let subTaskToUndo = tasks[taskIndex]["subtasksDone"][subTaskIndex];

    // Entfernen des Elements aus tasks[x]['subtasks']
    tasks[taskIndex]["subtasksDone"].splice(subTaskIndex, 1);

    // Hinzufügen des entfernten Elements zu tasks[x]['subtasksDone']
    tasks[taskIndex]["subtasks"].push(subTaskToUndo);

    // Annahme: addopenCardSubtasks ist eine Funktion, die definiert ist und korrekt funktioniert
    addOpenCardSubtasks(taskIndex);
}






function closeCard() {
    const transout = document.getElementById("openCard");
    transout.style = 'animation: slideOutCard 100ms ease-out;';
    setTimeout(() => {
        const div = document.getElementById("openCardContainer");
        transout.style = '';
        div.classList.add("hidden");
    }, 100);
}

function addTransition() {
    const div = document.getElementById("openCardContainer");
    div.classList.remove("hidden");

    const transitionDiv = document.getElementById("openCard");
    transitionDiv.style = 'animation: slideInCard 100ms ease-out;';

}

function startDraggin(id) {
    currentDraggedElement = id;
    addRotation(id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category, id) {
    tasks[currentDraggedElement]["state"] = category;
    sortTaks();
}

function addRotation(id) {
    let card = document.getElementById('card' + `${id}`);
    card.classList.add('rotateCard')
}

function checkAndAddTasks(tasks) {
    states.forEach((state) => {
        const filteredTasks = tasks.filter((task) => task.state === state);

        if (filteredTasks.length === 0) {
            addNoTaskHTML(state + "Container");
        }
    });
}


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

function createNoTaskHTML(message) {
    return /*html*/ `
        <div class="noTaskFound">
            <p>${message}</p>
        </div>
    `;
}


function sortAndFilterCards() {
    const searchTerm = document
        .getElementById("sortTasksInput")
        .value.toLowerCase(); // Den eingegebenen Suchbegriff abrufen und in Kleinbuchstaben umwandeln
    const cards = document.querySelectorAll(".toDoCard"); // Alle Karten mit der Klasse 'toDoCard' abrufen

    cards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase(); // Den Titel der Karte abrufen und in Kleinbuchstaben umwandeln
        const description = card.querySelector("p").textContent.toLowerCase(); // Die Beschreibung der Karte abrufen und in Kleinbuchstaben umwandeln

        // Überprüfen, ob der Suchbegriff im Titel oder in der Beschreibung der Karte enthalten ist
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.parentNode.style.display = "block"; // Karte anzeigen, falls der Suchbegriff enthalten ist
        } else {
            card.parentNode.style.display = "none"; // Karte ausblenden, falls der Suchbegriff nicht enthalten ist
        }
    });
}

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

function addDnonToAddTaks(assignedContactsAvatarDiv) {
    const transout = document.getElementById("transition");
    transout.style = 'animation: slideOutAddNew 100ms ease-in-out;'
    setTimeout(() => {
        const div = document.getElementById("animationDiv");
        transout.style = '';
        div.classList.add("hidden");
    }, 100);
    clearForm(assignedContactsAvatarDiv, 'subTasks-popup');
}

async function deleteOpenCard(i) {
    tasks.splice(i, 1);
    sortTaks();
    closeCard(); 
    await setItem('tasks', tasks);
}

