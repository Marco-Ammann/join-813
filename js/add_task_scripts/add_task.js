const categorys = [
    "Work",
    "Personal"
];


let dropdownState = "closed";
let clickedStates = [];
let assignedContacts = [];
let subtasks = [];
let clickedPriority = "medium";

function loadAddTaskPage() {
    generateAssignContacts();
    generateCategoryOptions();
    setupDropdownCloseListener();
    setupFilterListener();
}


function getTaskTitle() {
    let taskTitle = document.getElementById('task-title-input').value;
    return taskTitle;
}

function getTaskDescription() {
    let taskDescription = document.getElementById('task-description-textarea').value;
    return taskDescription;
}

function getAssignedContacts() {
    const contactNames = [];
    for (const contact of assignedContacts) {
        contactNames.push(contact.name);
    }
    return contactNames;
}

function getDueDate() {
    let dueDate = document.getElementById('due-date-input').value;
    let parts = dueDate.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else {
        return dueDate;
    }
}

function getPriority() {
    return clickedPriority;
}

function getCategory() {
    let categoryDropdown = document.getElementById('categoryDropdown');
    let selectedCategory = categoryDropdown.querySelector('.contactDivClicked');
    if (selectedCategory) {
        return selectedCategory.textContent.trim();
    } else {
        return '';
    }
}

function getSubtask() {
    return subtasks;
}




function validateDueDate() {
    const dueDateInput = document.getElementById('due-date-input');
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Das erwartete Datumsmuster (dd/mm/yyyy)
    
    if (!datePattern.test(dueDateInput.value)) {
        alert('Ungültiges Datumsformat. Bitte verwenden Sie das Format dd/mm/yyyy.');
        dueDateInput.value = '';
    }
}


function setSubtask() {
    const subtaskInput = document.getElementById('subtask-input');
    const subtaskText = subtaskInput.value.trim();

    if (subtaskText) {
        subtasks.push(subtaskText);
        updateSubtaskList();
        subtaskInput.value = '';
    }
}


// Funktion zum Aktualisieren der Subtask-Liste
function updateSubtaskList() {
    const subtaskContainer = document.getElementById('subTasks');
    subtaskContainer.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskContainer.innerHTML += generateSubtaskHTML(subtask, i);

    }
}


// Funktion zum Bearbeiten eines Subtasks
function editSubtask(index) {
    const subtaskContainer = document.getElementById(`task${index}`);
    const subtaskText = subtasks[index];

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = subtaskText;
    inputElement.classList.add('edit-subtask-input');

    subtaskContainer.textContent = '';
    subtaskContainer.appendChild(inputElement);

    inputElement.focus();

    inputElement.addEventListener('blur', () => {
        const editedSubtask = inputElement.value.trim();
        subtasks[index] = editedSubtask;
        updateSubtaskList();
    });
}

function cancelSubtask() {
    let subTaskInput = document.getElementById('subtask-input');
    subTaskInput.value = "";
}

// Funktion zum Löschen eines Subtasks
function deleteSubtask(index) {
    subtasks.splice(index, 1);
    updateSubtaskList();
}



function toggleDropdown(dropdownId, inputfieldId, svgId, standardValue) {
    if (dropdownState === "closed") {
        openDropdownState(dropdownId, inputfieldId, svgId);
    } else {
        closeDropdownState(dropdownId, inputfieldId, svgId, standardValue);
    }
}


function handleClickOnAssignedContact(index) {
    switchClickedState(index);
    updateAvatars(index);
}


function switchTaskCategoryClickedState(index) {
    const element = document.getElementById(`categoryOption${index}`);

    // Alle Kategorien deaktivieren
    const categoryOptions = document.getElementsByClassName('categoryDiv');
    for (const option of categoryOptions) {
        removeClass(option, 'contactDivClicked');
    }

    // Die ausgewählte Kategorie aktivieren
    assignClass(element, 'contactDivClicked');
}


function switchClickedState(index) {
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


function addFocusClass() {
    const inputDiv = document.getElementById('subtask-input-div');
    inputDiv.classList.add('input-div-focused');

    const plusSymbolDiv = document.getElementById('plus-symbol-div');
    plusSymbolDiv.classList.add('d-none');

    const createTaskDiv = document.getElementById('create-task-div');
    createTaskDiv.classList.remove('d-none');

    document.addEventListener('mousedown', handleMouseDown);
}

function removeFocusClass() {
    const inputDiv = document.getElementById('subtask-input-div');
    inputDiv.classList.remove('input-div-focused');

    const plusSymbolDiv = document.querySelector('.plus-symbol-div');
    plusSymbolDiv.classList.remove('d-none');

    const createTaskDiv = document.querySelector('.create-task-div');
    createTaskDiv.classList.add('d-none');
}

function handleMouseDown(event) {
    const inputDiv = document.getElementById('subtask-input-div');
    if (!inputDiv.contains(event.target)) {
        removeFocusClass();
        document.removeEventListener('mousedown', handleMouseDown);
    }
}