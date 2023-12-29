let currentDragedElement;
const states = ["InProgress", "Done", "AwaitFeedback", "ToDo"];


async function loadBoard() {
    await setTasks();
    sortTaks();
}

/**
 * Clears all tasks in the backend by setting the 'tasks' storage item to an empty array.
 * 
 * @async
 * @function clearAllTasksInBackend
 * @throws {Error} Throws an error if there is an issue while clearing the tasks.
 */
async function clearAllTasksInBackendx() {
    try {
        await setItem('tasks', []);
        console.log('All tasks have been successfully cleared.');
    } catch (error) {
        console.error('Error while clearing tasks: ', error);
    }
    await createTaskx();
}

/**
 * Creates and stores a new task based on user inputs.
 * This function retrieves current tasks, adds a new task to the array, 
 * and updates the backend storage. It also clears the input form upon completion.
 * 
 * @async
 * @function createTask
 */
async function createTaskx() {
    console.log('tasks pushed');
    let currentTasks = await getTasksArray();
    let newTask = await getValues();

    try {
        currentTasks.push(newTask);
        await setItem('tasks', currentTasks);
    } catch (error) {
        console.error('Fehler beim Erstellen der Aufgabe: ', error);
    }
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
    for (let i = 0; i < tasks.length; i++) {
        const taskStatus = tasks[i]['state'];
        render(taskStatus, i);
    }
}

function render(taskStatus, i) {
    taskStatus = taskStatus + "Container";
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML += /*html*/ `    
        <div onclick="openCard(${i})" id="card${i}" draggable="true" ondragstart="startDraggin(${tasks[i][`id`]})">
            <div class="toDoCard">
                <div class="headerUserStory headerUserStoryPopUp">User Story</div>
                <div>
                    <h3>${tasks[i][`taskTitle`]}</h3>
                    <p>${tasks[i][`description`]}</p>
                </div>
                <div id="progressbar${i}" class="progressbar">
                </div>
                <div class="toDoCardFooter">
                    <div id="cardIcon${i}" class="userIcon">
                    </div>
                    <img src="./assets/img/Desktop/board/priority_symbols/${tasks[i][`priority`]}.svg">
                </div>
            </div>
        </div>
`;
    checkAndAddTasks(tasks);
    addTaskIcon(`cardIcon${i}`, i);
    addProgressBar(i);
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


function openCard(i) {
    const content = document.getElementById(`openCard`);
    content.innerHTML = "";
    const openCardContainer = document.getElementById("openCardContainer");
    openCardContainer.classList.remove("hidden");

    content.innerHTML = generateOpenCardHTML(i);
    addOpemTaskIcon(`openCardIcon${i}`, i);
    addTransition();
    addopenCardSubtasks(i);
}






function editCard(i) {
    const card = document.getElementById(`openCard`);
    card.innerHTML = "";
    card.innerHTML = generateEditCardHTML(i);
    setValuesInEditCard(i);
    generateAssignContacts('assignDropdown-popup', 'assigned-contacts-popup');
    setupDropdownCloseListener('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup');
    setupFilterListener();

    toggleDropdown('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup', 'Select contacts to assign');

    // Warte 0.1 Sekunden, bevor setClickedContacts aufgerufen wird
    setTimeout(() => {
        setClickedContacts(i, 'assigned-contacts-popup');

        // Führe das zweite ToggleDropdown nach einer weiteren Verzögerung aus
        setTimeout(() => {
            toggleDropdown('assignDropdown-popup', 'add-contact-input-popup', 'arrowAssign-popup', 'Select contacts to assign');
        }, 100);
    }, 100);
}







function addOpemTaskIcon(id, x) {
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

function addopenCardSubtasks(x) {
    let content = document.getElementById(`openCardSubtasks${x}`);
    content.innerHTML = "";
    console.log(x);

    for (let i = 0; i < tasks[x]["subtasks"].length; i++) {
        content.innerHTML += /*html*/ `
            <div class="hoverPointer openCardSubtasks" id="subtask${i}" onclick="subtaskComplete(${i}, ${x})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
                ${tasks[x]["subtasks"][i]}
            </div>
        `;
    }

    for (let y = 0; y < tasks[x]["subtasksDone"].length; y++) {
        content.innerHTML += /*html*/ `
        <div class="openCardSubtasks">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="textCross">
                ${tasks[x]["subtasksDone"][y]}
                </p>
            </div>
        `;
    }
}

function subtaskComplete(i, x) {
    let content = document.getElementById(`subtask${i}`);
    content.innerHTML = /*html*/ `
    <div class="openCardSubtasks">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${tasks[x]["subtasks"][i]}
    </div>
    `;
    moveSubtaskToDone(i, x);
    clearAllTasksInBackendx();
}

function moveSubtaskToDone(i, x) {
    // Zugriff auf das zu entfernende Subtask-Element
    let removedSubtask = tasks[x]["subtasks"][i];

    // Entfernen des Elements aus tasks[x]['subtasks']
    tasks[x]["subtasks"].splice(i, 1);

    // Hinzufügen des entfernten Elements zu tasks[x]['subtasksDone']
    tasks[x]["subtasksDone"].push(removedSubtask);

    // Annahme: addopenCardSubtasks ist eine Funktion, die definiert ist und korrekt funktioniert
    addopenCardSubtasks(x);
}

function subtaskUnComplete(i, x) {
    let content = document.getElementById(`subtask${i}`);
    content.innerHTML = /*html*/ `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
                ${tasks[x]["subtasks"]}
    `;
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
    const container = document.getElementById(containerId);
    container.innerHTML = /*html*/ `
     <div id="ToDoContainerfillter" class="noTaskFound">
        <p> No task To do</p>
    </div >
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

function addDnonToAddTaks() {
    const transout = document.getElementById("transition");
    transout.style = 'animation: slideOutAddNew 100ms ease-in-out;'
    setTimeout(() => {
        const div = document.getElementById("animationDiv");
        transout.style = '';
        div.classList.add("hidden");
    }, 100);
    clearForm();
}

function deleteOpenCard(i) {
    tasks.splice(i, 1);
    sortTaks();
    closeCard();
    clearAllTasksInBackendx();
}