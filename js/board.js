let currentDragedElement;

function loadBoard() {
    console.log(tasks);
    sortTaks()
}


function sortTaks() {
    console.log('sortTaks')
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
        <div draggable="true" ondragstart="startDraggin(${tasks[i][`id`]})">
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