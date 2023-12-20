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
        <div id="card${i}" draggable="true" ondragstart="startDraggin(${tasks[i][`id`]})">
            <div class="toDoCard">
                <div class="headerUserStory">User Story</div>
                <div>
                    <h3>${tasks[i][`taskTitle`]}</h3>
                    <p>${tasks[i][`description`]}</p>
                </div>
                <div>
                    <progress max="100" value="50"></progress>
                    <span>1/2 Subtaks</span>
                </div>
                <div class="toDoCardFooter">
                    <div class="userIcon">
                        <div class="icon">AM</div>
                        <div class="icon">EM</div>
                        <div class="icon">MB</div>
                    </div>
                    <img src="./assets/img/Desktop/board/priority_symbols/${tasks[i][`priority`]}.svg">
                </div>
            </div>
        </div>
`;
    checkAndAddTasks(tasks);
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
    const div = document.getElementById('animationDiv');
    div.classList.remove('hidden');
    const transitionDiv = document.getElementById('transition');
    transitionDiv.classList.add('addTaskMenu');
}

function addDnonToAddTaks() {
    const transitionDiv = document.getElementById('transition');
    transitionDiv.classList.remove('addTaskMenu');
    const div = document.getElementById('animationDiv');
    div.classList.add('hidden');
}
