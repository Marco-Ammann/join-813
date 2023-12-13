const contacts = [
    { id: 1, name: "Ammann Marco" },
    { id: 2, name: "Joost Heidrich" },
    { id: 3, name: "Ghulammustafa Kakar" },
    { id: 4, name: "Sebastian Treittinger" }
];


let dropdownState = "closed";
const clickedStates = [];

// switch between open/close state of the Dropdownmenu
function switchDropdownState(dropdownId, inputfieldId, svgId) {
    const dropdown = document.getElementById(dropdownId);
    const inputfield = document.getElementById(inputfieldId);
    const arrowImage = document.getElementById(svgId);
    generateAssignContacts()
    if (dropdownState === "open") {
        closeAssignDropdown(dropdown, inputfield, arrowImage);
    } else {
        openAssignDropdown(dropdown, inputfield, arrowImage);
    }
}


function openAssignDropdown(dropdown, inputfield, arrowImage) {
    dropdown.classList.remove('d-none');
    inputfield.value = "";
    dropdownState = "open";
    arrowImage.src = "assets/img/Desktop/add_task/arrow_dropdown_up.svg";
}


function closeAssignDropdown(dropdown, inputfield, arrowImage) {
    dropdown.classList.add('d-none');
    inputfield.value = "Select contacts to assign";
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


function handleClickedState(contactDiv, checkboxImg) {
    assignClass(contactDiv, 'contactDivClicked');
    changeSrc(checkboxImg, './assets/img/Desktop/add_task/check button_checked_white.svg');
}


function handleUnClickedState(contactDiv, checkboxImg) {
    removeClass(contactDiv, 'contactDivClicked');
    changeSrc(checkboxImg, './assets/img/Desktop/add_task/check_button.svg');
}