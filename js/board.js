function loadBoard() {
    console.log(tasks);
    sortTaks()
}


function sortTaks() {
    for (let i = 0; i < tasks.length; i++) {
        const taskStatus = tasks[i][`state`];
        render(taskStatus, i);
    }
}

function render(taskStatus, i) {
    taskStatus = taskStatus + 'Container';
    console.log(taskStatus)
    let sortetContainer = document.getElementById(taskStatus);
    sortetContainer.innerHTML +=/*html*/`    
<table draggable="true" ondragstart="startDraggin()">
    <tr>
        <th>
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
        </th>
    </tr>
</table>
`;
}