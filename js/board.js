let currentDragedElement;

function loadBoard() {
    console.log(tasks);
    sortTaks()
}


function sortTaks() {
    document.getElementById('ToDoContainer').innerHTML = '';
    document.getElementById('InProgressContainer').innerHTML = '';
    document.getElementById('AwaitFeedbackContainer').innerHTML = '';
    document.getElementById('DoneContainer').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const taskStatus = tasks[i][`state`];
        render(taskStatus, i);
    }
}

function render(taskStatus, i) {
    taskStatus = taskStatus + 'Container';
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML +=/*html*/`    
        <div onclick="openCard(${i})" id="card${i}" draggable="true" ondragstart="startDraggin(${tasks[i][`id`]})">
            <div class="toDoCard">
                <div class="headerUserStory">User Story</div>
                <div>
                    <h3>${tasks[i][`taskTitle`]}</h3>
                    <p>${tasks[i][`description`]}</p>
                </div>
                <div id="progressbar${i}">
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
    addProgressBar(i)
}

function addProgressBar(i) {
    let taks = tasks[i]['subtasks'].length;
    if (taks > 1) {
        let calculatetSubtaks = 100 / taks;
        calculatetSubtaks = calculatetSubtaks * tasks[i]['subtasksDone'];
        content = document.getElementById(`progressbar${i}`);
        content.innerHTML =/*html*/`
                <progress max="100" value="${calculatetSubtaks}"></progress>
                <span>${tasks[i]['subtasksDone']}/${tasks[i]['subtasks'].length} Subtaks</span>
                `
    };
}
function openCard(i) {
    const content = document.getElementById(`openCard`);
    const openCardContainer = document.getElementById('openCardContainer');
    openCardContainer.classList.remove('hidden');

    content.innerHTML = /*html*/`        
    <div class="toDoCard">
        <div class="headerUserStory">User Story</div>
        <div>
            <h3>${tasks[i][`taskTitle`]}</h3>
            <p>${tasks[i][`description`]}</p>
            <p>Due date ${tasks[i][`dueDate`]}</p>
            <p>Priority:${tasks[i][`priority`]}
                <img src="./assets/img/Desktop/board/priority_symbols/${tasks[i][`priority`]}.svg">
            </p>
        </div>
    <div id="openCardIcon"><p>Assigned To:</p></div>

    <div class="toDoCardFooter">
        <div class="userIcon">

        </div>
    </div>
    </div>
    `;
    addOpemTaskIcon('openCardIcon', i);
    addTransition();
}

function addOpemTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]['assignedTo'].length; i++) {
        const element = tasks[x]['assignedTo'][i];
        let color = contacts[element]['color'];

        const nameParts = contacts[element]['name'].split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '';

        content.innerHTML += /*html*/`
          <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
          <p>${contacts[element]['name']}</p>
        `;
    }
}

function addTaskIcon(id, x) {
    let content = document.getElementById(id);
    for (let i = 0; i < tasks[x]['assignedTo'].length; i++) {
        const element = tasks[x]['assignedTo'][i];
        let color = contacts[element]['color'];

        const nameParts = contacts[element]['name'].split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '';

        content.innerHTML += /*html*/`
          <div class="icon" style="background-color: ${color};">${firstNameInitial}${lastNameInitial}</div>
        `;
    }
}

function closeCard() {
    const openCardContainer = document.getElementById('openCardContainer');
    openCardContainer.classList.add('hidden');
    const transitionDiv = document.getElementById('openCard');
    transitionDiv.classList.remove('tansinCard');
}

function addTransition() {
    const transitionDiv = document.getElementById('openCard');
    transitionDiv.classList.add('tansinCard');
}

function startDraggin(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['state'] = category;
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

    states.forEach(state => {
        const filteredTasks = tasks.filter(task => task.state === state);

        if (filteredTasks.length === 0) {
            addNoTaskHTML(state + "Container");
        }
    });
}

function addNoTaskHTML(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML =/*html*/`
     <div id="ToDoContainerfillter" class="noTaskFound">
        <p> No task To do</p>
    </div >
    `
}

function sortAndFilterCards() {
    const searchTerm = document.getElementById('sortTasksInput').value.toLowerCase(); // Den eingegebenen Suchbegriff abrufen und in Kleinbuchstaben umwandeln
    const cards = document.querySelectorAll('.toDoCard'); // Alle Karten mit der Klasse 'toDoCard' abrufen

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase(); // Den Titel der Karte abrufen und in Kleinbuchstaben umwandeln
        const description = card.querySelector('p').textContent.toLowerCase(); // Die Beschreibung der Karte abrufen und in Kleinbuchstaben umwandeln

        // Überprüfen, ob der Suchbegriff im Titel oder in der Beschreibung der Karte enthalten ist
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.parentNode.style.display = 'block'; // Karte anzeigen, falls der Suchbegriff enthalten ist
        } else {
            card.parentNode.style.display = 'none'; // Karte ausblenden, falls der Suchbegriff nicht enthalten ist
        }
    });
}

function openAddTaskMenu() {
    if (window.innerWidth < 428) {
        window.location.href = "add_task.html";
    } else {
        const transout = document.getElementById('transition');
        transout.classList.remove('transout');

        const div = document.getElementById('animationDiv');
        div.classList.remove('hidden');

        const transitionDiv = document.getElementById('transition');
        transitionDiv.classList.add('tansin');
    }
}

function addDnonToAddTaks() {
    const transitionDiv = document.getElementById('transition');
    transitionDiv.classList.remove('addTaskMenu');

    const transout = document.getElementById('transition');
    transout.classList.add('transout');
    setTimeout(() => {
        const div = document.getElementById('animationDiv');
        div.classList.add('hidden');
    }, 400);
}

