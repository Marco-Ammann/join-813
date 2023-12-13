function initializeClickedState(index) {
    if (clickedStates[index] === undefined) {
        clickedStates[index] = false;
    }
}


function getClickedState(index) {
    return clickedStates[index];
}


function updateClickedState(index, value) {
    clickedStates[index] = value;
}


function assignClass(element, classname) {
    element.classList.add(classname);
}


function removeClass(element, classname) {
    element.classList.remove(classname);
}


function changeSrc(element, src) {
    element.src = src;
}