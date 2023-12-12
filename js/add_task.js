const contacts = [
    { id: 1, name: "Ammann Marco" },
    { id: 2, name: "Joost Heidrich" },
    { id: 3, name: "Ghulammustafa Kakar" },
    { id: 4, name: "Sebastian Treittinger" }
];


let dropdownState = "closed";
let isClicked = false;


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
    const contactDiv = document.getElementById(`contact${index}`);
    const checkboxImg = document.getElementById(`checkbox${index}`);

    if (!isClicked) {
        assignClass(contactDiv, 'contactDivClicked');
        changeSrc(checkboxImg, './assets/img/Desktop/add_task/check button_checked_white.svg');
        isClicked = true;
    } else {
        removeClass(contactDiv, 'contactDivClicked');
        changeSrc(checkboxImg, './assets/img/Desktop/add_task/check_button.svg');
        isClicked = false;
    }
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