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


function assignClass(element, className) {
    element.classList.add(className);
}


function removeClass(element, className) {
    element.classList.remove(className);
}


function changeSrc(element, src) {
    element.src = src;
}


function switchVisibility(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle("d-none");
  }

function setPriority(priority) {
    clickedPriority = priority;
}


function addAvatar(contact) {
    assignedContacts.push(contact);
    updateAvatars();
}


function removeAvatar(contact) {
    const index = assignedContacts.indexOf(contact);
    if (index !== -1) {
        assignedContacts.splice(index, 1);
        updateAvatars();
    }
}


function openDropdownState(dropdownId, inputfieldId, svgId) {
    const dropdown = document.getElementById(dropdownId);
    const inputfield = document.getElementById(inputfieldId);
    const arrowImage = document.getElementById(svgId);
    openDropdown(dropdown, inputfield, arrowImage);
}


function closeDropdownState(dropdownId, inputfieldId, svgId, standardValue) {
    const dropdown = document.getElementById(dropdownId);
    const inputfield = document.getElementById(inputfieldId);
    const arrowImage = document.getElementById(svgId);
    closeDropdown(dropdown, inputfield, arrowImage, standardValue);
}