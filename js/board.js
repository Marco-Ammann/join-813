let currentDragedElement;

function loadBoard() {
    console.log(tasks);
    sortTaks();
}

function sortTaks() {
    document.getElementById("ToDoContainer").innerHTML = "";
    document.getElementById("InProgressContainer").innerHTML = "";
    document.getElementById("AwaitFeedbackContainer").innerHTML = "";
    document.getElementById("DoneContainer").innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const taskStatus = tasks[i][`state`];
        render(taskStatus, i);
    }
}

function render(taskStatus, i) {
    taskStatus = taskStatus + "Container";
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML += /*html*/ `    
        <div onclick="openCard(${i})" id="card${i}" draggable="true" ondragstart="startDraggin(${tasks[i][`id`]
        })">
            <div class="toDoCard">
                <div class="headerUserStory">User Story</div>
                <div>
                    <h3>${tasks[i][`taskTitle`]}</h3>
                    <p>${tasks[i][`description`]}</p>
                </div>
                <div id="progressbar${i}" class="progressbar">
                </div>
                <div class="toDoCardFooter">
                    <div id="cardIcon${i}" class="userIcon">
                    </div>
                    <img src="./assets/img/Desktop/board/priority_symbols/${tasks[i][`priority`]
        }.svg">
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
    if (taks > 1) {
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

    content.innerHTML = /*html*/`        
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
            <h3>${tasks[i][`taskTitle`]}</h3>
            <h4>${tasks[i][`description`]}</h4>
            <div class="openCardTable">
            <p>Due date:</p><span>${tasks[i][`dueDate`]}<span>
            </div>
            <div class="openCardTable">
            <p>Priority:</p>
                <div class="openCardPriority">
                <span>${tasks[i][`priority`]}</span>
                <img src="./assets/img/Desktop/board/priority_symbols/${tasks[i][`priority`]}.svg">
                </div>
            </div>
        </div>
        <div id="openCardIcon" class="openCardAssigned">
            <p>Assigned To:</p>
        </div>
        <div class="openCardSubtasks-container">
            <p>Subtaks</p>
            <div id="openCardSubtasks"></div>
        </div>
        <div class="openCardFooter">
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <a href="#" onclick="editCard()">
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
    addOpemTaskIcon('openCardIcon', i);
    addTransition();
    addopenCardSubtasks(i);
}








function editCard() {
    const card = document.getElementById(`openCard`);
    card.innerHTML = "";
    card.innerHTML = generateEditCardHTML();
}







function addOpemTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]["assignedTo"].length; i++) {
        const element = tasks[x]["assignedTo"][i];
        let color = contacts[element]["color"];

        const nameParts = contacts[element]["name"].split(" ");
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

        content.innerHTML += /*html*/ `
        <div class="openCardIcon">
          <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
          <p>${contacts[element]["name"]}</p>
        </div>
        `;
    }
}

function addTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]["assignedTo"].length; i++) {
        const element = tasks[x]["assignedTo"][i];
        let color = contacts[element]["color"];

        const nameParts = contacts[element]["name"].split(" ");
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial =
            nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

        content.innerHTML += /*html*/ `
          <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
        `;
    }
}

function addopenCardSubtasks(x) {
    let content = document.getElementById("openCardSubtasks");
    content.innerHTML = "";

    for (let i = 0; i < tasks[x]["subtasks"].length; i++) {
        content.innerHTML += generateSubtaskHTML(tasks[x]["subtasks"][i], i, x);
    }

    for (let y = 0; y < tasks[x]["subtasksDone"].length; y++) {
        content.innerHTML += generateSubtaskDoneHTML(tasks[x]["subtasksDone"][y]);
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
    transout.classList.add("tansoutCard");
    transout.classList.remove("tansinCard");
    setTimeout(() => {
        const div = document.getElementById("openCardContainer");
        div.classList.add("hidden");
    }, 400);
}

function addTransition() {
    const div = document.getElementById("openCardContainer");
    div.classList.remove("hidden");

    const transitionDiv = document.getElementById("openCard");
    transitionDiv.classList.add("tansinCard");
    transitionDiv.classList.remove("tansoutCard");

}

function startDraggin(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]["state"] = category;
    sortTaks();
}

function highlight(id) {
    // document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    // document.getElementById(id).classList.remove('drag-area-highlight');
}

function checkAndAddTasks(tasks) {
    const states = ["InProgress", "Done", "AwaitFeedback", "ToDo"];

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

function openAddTaskMenu() {
    if (window.innerWidth < 1000) {
        window.location.href = "add_task.html";
    } else {
        const transout = document.getElementById("transition");
        transout.classList.remove("transout");

        const div = document.getElementById("animationDiv");
        div.classList.remove("hidden");

        const transitionDiv = document.getElementById("transition");
        transitionDiv.classList.add("tansin");
    }
}

function addDnonToAddTaks() {
    const transout = document.getElementById("transition");
    transout.classList.add("transout");
    setTimeout(() => {
        const div = document.getElementById("animationDiv");
        div.classList.add("hidden");
    }, 400);
}
