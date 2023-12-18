const categorys = [
    "Work",
    "Personal"
];


let dropdownState = "closed";
let clickedStates = [];


function loadAddTaskPage() {
    generateAssignContacts();
    generateCategoryOptions();
    setupDropdownCloseListener();
    setupFilterListener();
}


function validateDueDate() {
    const dueDateInput = document.getElementById('due-date-input');
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Das erwartete Datumsmuster (dd/mm/yyyy)
    
    if (!datePattern.test(dueDateInput.value)) {
        alert('Ungültiges Datumsformat. Bitte verwenden Sie das Format dd/mm/yyyy.');
        dueDateInput.value = '';
    }
}


function toggleDropdown(dropdownId, inputfieldId, svgId, standardValue) {
    if (dropdownState === "closed") {
        openDropdownState(dropdownId, inputfieldId, svgId);
    } else {
        closeDropdownState(dropdownId, inputfieldId, svgId, standardValue);
    }
}


function handleClickOnAssignedContact(index) {
    toggleContact(index);
    updateAvatars(index);
}


function switchTaskCategoryClickedState(index) {
    const element = document.getElementById(`categoryOption${index}`);

    const categoryOptions = document.getElementsByClassName('categoryDiv');
    for (const option of categoryOptions) {
        removeClass(option, 'contactDivClicked');
    }
    assignClass(element, 'contactDivClicked');
}


function toggleContact(index) {
    initializeClickedState(index);

    const contactDiv = document.getElementById(`contact${index}`);
    const checkboxImg = document.getElementById(`checkbox${index}`);
    const isClicked = getClickedState(index);

    const contact = contacts[index];

    if (isClicked) {
        handleState(contactDiv, checkboxImg, false, './assets/img/Desktop/add_task/check_button.svg');
        removeAvatar(contact);
    } else {
        handleState(contactDiv, checkboxImg, true, './assets/img/Desktop/add_task/check button_checked_white.svg');
        addAvatar(contact);
    }
    updateClickedState(index, !isClicked);
}


function updateAvatars() {
    let avatarContainer = document.getElementById("assigned-contacts");
    avatarContainer.innerHTML = assignedContacts.map(contact => generateAvatar(contact)).join('');
}


function handleState(div, img, clicked, src) {
    div.classList.toggle('contactDivClicked', clicked);
    img.src = src;
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
        dropdowncontainer.innerHTML += generateAssignContactsHTML(selectableContact, i);
    }

    clickedStates = Array(contacts.length).fill(false);
}


function generateCategoryOptions() {
    let dropdowncontainer = document.getElementById('categoryDropdown');
    dropdowncontainer.innerHTML = "";
    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        dropdowncontainer.innerHTML += generateCategoryOptionsHTML(category, i);
    }
}


function filterContacts() {
    const input = document.getElementById('add-contact-input');
    const value = input.value.toLowerCase();
    const dropdown = document.getElementById('assignDropdown');
    const contacts = dropdown.getElementsByClassName('contactDiv');

    for (const contact of contacts) {
        const name = contact.textContent.toLowerCase();
        contact.style.display = name.includes(value) ? 'flex' : 'none';
    }
}


function setupDropdownCloseListener() {
    document.addEventListener('click', function (event) {
        const dropdown = document.getElementById('assignDropdown');
        const inputField = document.getElementById('add-contact-input');
        const arrowImage = document.getElementById('arrowAssign');

        if (!dropdown.contains(event.target) && event.target !== inputField && event.target !== arrowImage) {
            closeDropdown(dropdown, inputField, arrowImage, 'Select contacts to assign');
        }
    });
}


function setupFilterListener() {
    const inputField = document.getElementById('add-contact-input');
    inputField.addEventListener('input', filterContacts);
}



function createTask(event) {
    event.preventDefault();
    let newTask = getValues();
    tasks.push(newTask);
    clearForm(event)
}


function clearForm(event) {
    event.preventDefault();
    document.getElementById('task-title-input').value = '';
    document.getElementById('task-description-textarea').value = '';
    document.getElementById('due-date-input').value = '';
    clickedPriority = 'medium';
    assignedContacts = [];
    updateAvatars();
    subtasks = [];
    updateSubtaskList();
}