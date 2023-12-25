const categorys = ["Work", "Personal"];

let dropdownState = "closed";
let clickedStates = [];

/**
 * Initializes the Add Task page by loading necessary components. It generates the 
 * list of assignable contacts, the category options for tasks, and sets up listeners 
 * for handling dropdown interactions and filtering contacts.
 */
function loadAddTaskPage() {
  generateAssignContacts();
  generateCategoryOptions();
  setupDropdownCloseListener();
  setupFilterListener();
}


/**
 * Validates form fields and creates a task if all validations pass. 
 * It then triggers an animation to indicate that the task has been added
 * and redirects to the board page after a short delay.
 */
function validateAndCreateTask() {
  var isValid = true;
  isValid = validateField("task-title-input", "requiredTextTitle") && isValid;
  isValid = validateField("task-description-textarea", "requiredTextDescription") && isValid;
  isValid = validateField("due-date-input", "requiredTextDueDate") && isValid;
  isValid = validateDropdown("add-category-input", "requiredTextCategory") && isValid;

  if (isValid) {
    createTask();
    animateTaskAdded();
    setTimeout(function () {
      window.location.href = 'board.html';
    }, 1500);
  }
}


/**
 * Exclusively for add-Task popup window
 * Validates form fields and creates a task if all validations pass. 
 * It then triggers an animation to indicate that the task has been added
 * and closes the Popup after a short delay.
 */
function validateAndCreateTaskPopup() {
  var isValid = true;
  isValid = validateField("task-title-input", "requiredTextTitle") && isValid;
  isValid = validateField("task-description-textarea", "requiredTextDescription") && isValid;
  isValid = validateField("due-date-input", "requiredTextDueDate") && isValid;
  isValid = validateDropdown("add-category-input", "requiredTextCategory") && isValid;

  if (isValid) {
    createTask();
    setTimeout(function () {
      addDnonToAddTaks();
    }, 500);
  }
}


/**
 * Validates the format of the due date entered in the input field.
 * If the format does not match the expected pattern (dd/mm/yyyy), 
 * it alerts the user and clears the input field. 
 */
function validateDueDate() {
  const dueDateInput = document.getElementById("due-date-input");
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(dueDateInput.value)) {
    alert("Ungültiges Datumsformat. Bitte verwenden Sie das Format dd/mm/yyyy.");
    dueDateInput.value = "";
  }
}


/**
 * Handles the selection state for task category options.
 * It ensures that only the clicked category option has the 'contactDivClicked' class for styling,
 * while others don't. It also updates the category input with the selected category's text.
 * 
 * @param {number} index - The index of the category option that was clicked.
 */
function switchTaskCategoryClickedState(index) {
  const element = document.getElementById(`categoryOption${index}`);
  const categoryOptions = document.getElementsByClassName("categoryDiv");

  for (const option of categoryOptions) {
    removeClass(option, "contactDivClicked");
  }

  assignClass(element, "contactDivClicked");
  const selectedCategory = element.textContent;
  updateCategoryInput(selectedCategory);
}


/**
 * Updates the category input field with the selected category and hides the category dropdown.
 * It sets the value of the category input to the selected category and adds the 'd-none' class
 * to the category dropdown to hide it from view.
 *
 * @param {string} selectedCategory - The category selected by the user.
 */
function updateCategoryInput(selectedCategory) {
  const categoryInput = document.getElementById("add-category-input");
  const categoryDropdown = document.getElementById("categoryDropdown");

  categoryInput.value = `${selectedCategory}`;
  categoryDropdown.classList.add("d-none");
}


/**
 * Toggles the selection state of a contact. It initializes the clicked state for the contact,
 * updates the appearance of the contact div and the checkbox image based on whether the contact
 * is selected or not, and adds or removes the contact's avatar from the assigned contacts.
 * It also updates the clicked state array to reflect the new state of the contact.
 *
 * @param {number} index - The index of the contact in the contacts array.
 */
function toggleContact(index) {
  initializeClickedState(index);
  const contactDiv = document.getElementById(`contact${index}`);
  const checkboxImg = document.getElementById(`checkbox${index}`);
  const isClicked = getClickedState(index);
  const contact = contacts[index];
  if (isClicked) {
    handleClickedState(contactDiv, checkboxImg, false, "./assets/img/Desktop/add_task/check_button.svg");
    removeAvatar(contact);
  } else {
    handleClickedState(contactDiv, checkboxImg, true, "./assets/img/Desktop/add_task/check button_checked_white.svg");
    addAvatar(contact);
  }
  updateClickedState(index, !isClicked);
}


/**
 * Updates the display of assigned contact avatars.
 */
function updateAvatars() {
  let avatarContainer = document.getElementById("assigned-contacts");
  avatarContainer.innerHTML = assignedContacts
    .map((contact) => generateAvatar(contact))
    .join("");
}


/**
 * Opens a dropdown menu by removing its 'd-none' class, clears the selected element's value,
 * sets the dropdown state to 'open', and changes the arrow image to indicate the dropdown is open.
 * 
 * @param {HTMLElement} dropdown - The dropdown element to be opened.
 * @param {HTMLElement} selectedElement - The element whose value is to be cleared.
 * @param {HTMLElement} arrowImage - The image element used as an arrow indicator.
 */
function openDropdown(dropdown, selectedElement, arrowImage) {
  dropdown.classList.remove("d-none");
  selectedElement.value = "";
  dropdownState = "open";
  arrowImage.src = "assets/img/Desktop/add_task/arrow_dropdown_up.svg";
}


/**
 * Closes a dropdown menu by adding the 'd-none' class, sets the value of the input field,
 * changes the dropdown state to 'closed', and updates the arrow image to indicate the dropdown is closed.
 * 
 * @param {HTMLElement} dropdown - The dropdown element to be closed.
 * @param {HTMLElement} inputfield - The input field whose value is to be set.
 * @param {HTMLElement} arrowImage - The image element used as an arrow indicator.
 * @param {string} setValue - The value to set for the input field when the dropdown is closed.
 */
function closeDropdown(dropdown, inputfield, arrowImage, setValue) {
  dropdown.classList.add("d-none");
  inputfield.value = `${setValue}`;
  dropdownState = "closed";
  arrowImage.src = "./assets/img/Desktop/add_task/arrow_dropdown_down.svg";
}


/**
 * Generates and populates the 'assign to' dropdown menu with contact options.
 * Each contact is added to the dropdown, and the clickedStates array is initialized with false for each contact.
 */
function generateAssignContacts() {
  let dropdowncontainer = document.getElementById("assignDropdown");
  dropdowncontainer.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const selectableContact = contacts[i];
    dropdowncontainer.innerHTML += generateAssignContactsHTML(
      selectableContact,
      i
    );
  }

  clickedStates = Array(contacts.length).fill(false);
}


/**
 * Populates the 'category' dropdown menu with predefined category options.
 * It iterates through the 'categorys' array, adding each category to the dropdown menu.
 */
function generateCategoryOptions() {
  let dropdowncontainer = document.getElementById("categoryDropdown");
  dropdowncontainer.innerHTML = "";
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i].trim();
    dropdowncontainer.innerHTML += generateCategoryOptionsHTML(category, i);
  }
}


/**
 * Filters the contacts in the dropdown menu based on user input.
 * It matches the input text with the contact names, displaying only those that include the typed value.
 */
function filterContacts() {
  const input = document.getElementById("add-contact-input");
  const value = input.value.toLowerCase();
  const dropdown = document.getElementById("assignDropdown");
  const contacts = dropdown.getElementsByClassName("contactDiv");

  for (const contact of contacts) {
    const name = contact.textContent.toLowerCase();
    contact.style.display = name.includes(value) ? "flex" : "none";
  }
}


/**
 * Sets up a global click listener to close the dropdown menu when the user clicks outside of it.
 * The dropdown closes if the clicked element is neither the dropdown itself, the input field, nor the dropdown arrow.
 */
function setupDropdownCloseListener() {
  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("assignDropdown");
    const inputField = document.getElementById("add-contact-input");
    const arrowImage = document.getElementById("arrowAssign");

    if (!dropdown.contains(event.target) && event.target !== inputField && event.target !== arrowImage) {
      closeDropdown(dropdown, inputField, arrowImage, "Select contacts to assign");
    }
  });
}


/**
 * Attaches an input event listener to the contact input field for live filtering of contact options in the dropdown menu.
 */
function setupFilterListener() {
  const inputField = document.getElementById("add-contact-input");
  inputField.addEventListener("input", filterContacts);
}


/**
 * Triggers the animation for the task-added notification.
 * It adds a CSS class to the task-added-container which controls the animation.
 */
function animateTaskAdded() {
  const taskAddedContainer = document.querySelector('.task-added-container');
  taskAddedContainer.classList.add('task-added-animate');
}