
const categorys = [
    "User Story",
    "Technical Task"
];


let dropdownState = "closed";
const clickedStates = [];


function loadAddTaskPage() {
    generateAssignContacts();
    generateCategoryOptions();
}


// switch between opend/closed state of the Dropdownmenu
function switchDropdownState(dropdownId, inputfieldId, svgId, standardValue) {
    const dropdown = document.getElementById(dropdownId);
    const inputfield = document.getElementById(inputfieldId);
    const arrowImage = document.getElementById(svgId);

    if (dropdownState === "open") {
        closeDropdown(dropdown, inputfield, arrowImage, standardValue);
    } else {
        openDropdown(dropdown, inputfield, arrowImage);
    }
}


function switchVisibility(elementId) {
    const element = document.getElementById(elementId);

    if (element.classList.contains('d-none')) {
        removeClass(element, 'd-none');
    } else {
        assignClass(element, 'd-none');
    }
}


function switchTaskCategoryClickedState(index) {
    const element = document.getElementById(`categoryOption${index}`);

    if (element.classList.contains('contactDivClicked')) {
        removeClass(element, 'contactDivClicked');
    } else {
        assignClass(element, 'contactDivClicked');
    }
}


function switchClickedState(index) {
    initializeClickedState(index);

    const contactDiv = document.getElementById(`contact${index}`);
    const checkboxImg = document.getElementById(`checkbox${index}`);
    let isClicked = getClickedState(index);

    if (isClicked) {
        handleUnClickedState(contactDiv, checkboxImg);
    } else {
        handleClickedState(contactDiv, checkboxImg);
    }
    updateClickedState(index, !isClicked);
}


function openDropdown(dropdown, selectedElement, arrowImage) {
    dropdown.classList.remove('d-none');
    selectedElement.value = "";
    dropdownState = "open";
    arrowImage.src = "assets/img/Desktop/add_task/arrow_dropdown_up.svg";
}


function closeDropdown(dropdown, inputfield, arrowImage, setValue) {
    dropdown.classList.add('d-none');
    inputfield.value = `${setValue}`;
    dropdownState = "closed";
    arrowImage.src = "./assets/img/Desktop/add_task/arrow_dropdown_down.svg";
}


function generateAssignContacts() {
    let dropdowncontainer = document.getElementById('assignDropdown');
    dropdowncontainer.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const selectableContact = contacts[i];
        dropdowncontainer.innerHTML += generateAssignContactsHTML(selectableContact, i)
    }
}


function generateCategoryOptions() {
    let dropdowncontainer = document.getElementById('categoryDropdown');
    dropdowncontainer.innerHTML = "";
    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        dropdowncontainer.innerHTML += generateCategoryOptionsHTML(category, i);
    }
}


function handleClickedState(div, img) {
    assignClass(div, 'contactDivClicked');
    changeSrc(img, './assets/img/Desktop/add_task/check button_checked_white.svg');
}


function handleUnClickedState(div, img) {
    removeClass(div, 'contactDivClicked');
    changeSrc(img, './assets/img/Desktop/add_task/check_button.svg');
}