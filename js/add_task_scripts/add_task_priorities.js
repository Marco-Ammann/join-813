function setPrio(prio) {
    resetPriorityClasses();

    const elementId = `${prio}Btn`;
    switchButtonColor(elementId, prio);

    let imgId = document.getElementById(`${prio}Symbol`);
    const imagePath = `./assets/img/Desktop/add_task/priority_icons/${prio}_white.svg`;
    changeSrc(imgId, imagePath);
}

function switchButtonColor(elementId, elementClass) {
    const element = document.getElementById(elementId);

    if (element.classList.contains(elementClass)) {
        removeClass(element, elementClass);
    } else {
        assignClass(element, elementClass);
    }
}

function resetPriorityClasses() {
    let priorities = ['urgent', 'medium', 'low'];

    for (let i = 0; i < priorities.length; i++) {
        let prio = priorities[i];
        let elementId = `${prio}Btn`;
        let imgId = `${prio}Symbol`;

        removeClass(document.getElementById(elementId), prio);
        const imgElement = document.getElementById(imgId);
        const imagePath = `./assets/img/Desktop/add_task/priority_icons/${prio}.svg`;
        changeSrc(imgElement, imagePath);
    }
}