/**
 * Initializes the selection state of a contact in the clickedStates array.
 *
 * @param {number} index - Index of the contact.
 */
function initializeClickedState(index) {
  if (clickedStates[index] === undefined) {
    clickedStates[index] = false;
  }
}


/**
 * Gets the selection state of a contact from the clickedStates array.
 *
 * @param {number} index - Index of the contact.
 * @returns {boolean} True if selected, false otherwise.
 */
function getClickedState(index) {
  return clickedStates[index];
}


/**
 * Sets the selection state of a contact in the clickedStates array.
 *
 * @param {number} index - Index of the contact.
 * @param {boolean} value - Selection state to set (true for selected, false for not selected).
 */
function updateClickedState(index, value) {
  clickedStates[index] = value;
}


/**
 * Adds a CSS class to a DOM element.
 *
 * @param {Element} element - The element to which the class will be added.
 * @param {string} className - The class name to add.
 */
function assignClass(element, className) {
  element.classList.add(className);
}


/**
 * Removes a specified CSS class from a DOM element.
 *
 * @param {Element} element - The element from which the class will be removed.
 * @param {string} className - The class name to remove.
 */
function removeClass(element, className) {
  element.classList.remove(className);
}


/**
 * Sets the 'src' attribute of an image element.
 *
 * @param {Element} element - The image element.
 * @param {string} src - The source URL.
 */
function changeSrc(element, src) {
  element.src = src;
}


/**
 * Toggles the visibility of an element using the 'd-none' CSS class.
 *
 * @param {string} elementId - ID of the DOM element to be toggled.
 */
function switchVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.classList.toggle("d-none");
}


/**
 * Sets the priority level for a task.
 *
 * @param {string} priority - The priority level to be set.
 */
function setPriority(priority) {
  clickedPriority = priority;
}


/**
 * Adds a contact to the list of assigned contacts and updates the avatars display.
 *
 * @param {Object} contact - The contact object to add.
 * @param {string} container - The ID of the container for avatars display.
 */
function addAvatar(contact, container) {
  assignedContacts.push(contact);
  updateAvatars(container);
}


/**
 * Updates the display of assigned contact avatars.
 *
 * @param {string} container - The ID of the container for avatars display.
 */
function updateAvatars(container) {
  let avatarContainer = document.getElementById(container);
  avatarContainer.innerHTML = ""; 

  for (let i = 0; i < assignedContacts.length; i++) {
    let avatarHTML = generateAvatar(assignedContacts[i]);
    avatarContainer.innerHTML += avatarHTML;
  }
}


/**
 * Removes a contact from the list of assigned contacts and updates the avatars display.
 * 
 * @param {Object} contact - The contact object to remove.
 * @param {string} container - The ID of the container for avatars display.
 */
function removeAvatar(contact, container) {
  const index = assignedContacts.indexOf(contact);
  if (index !== -1) {
    assignedContacts.splice(index, 1);
    updateAvatars(container);
  }
}


/**
 * Opens a dropdown menu and updates its visual state.
 * 
 * @param {string} dropdownId - The ID of the dropdown menu.
 * @param {string} inputfieldId - The ID of the input field associated with the dropdown.
 * @param {string} svgId - The ID of the SVG icon used in the dropdown.
 */
function openDropdownState(dropdownId, inputfieldId, svgId) {
  const dropdown = document.getElementById(dropdownId);
  const inputfield = document.getElementById(inputfieldId);
  const arrowImage = document.getElementById(svgId);
  openDropdown(dropdown, inputfield, arrowImage);
}


/**
 * Closes a dropdown menu and resets its visual state.
 * 
 * @param {string} dropdownId - The ID of the dropdown menu.
 * @param {string} inputfieldId - The ID of the input field associated with the dropdown.
 * @param {string} svgId - The ID of the SVG icon used in the dropdown.
 * @param {string} standardValue - The standard value to set for the input field when the dropdown is closed.
 */
function closeDropdownState(dropdownId, inputfieldId, svgId, standardValue) {
  const dropdown = document.getElementById(dropdownId);
  const inputfield = document.getElementById(inputfieldId);
  const arrowImage = document.getElementById(svgId);
  closeDropdown(dropdown, inputfield, arrowImage, standardValue);
}


/**
 * Checks if a given field is empty.
 * 
 * @param {Element} field - The input field element to check.
 * @returns {boolean} True if the field is empty, false otherwise.
 */
function isFieldEmpty(field) {
  return field.value.trim() === "";
}


/**
 * Displays a warning message by removing the 'invisible' class from the element.
 * 
 * @param {Element} warningElement - The warning message element to display.
 */
function showWarning(warningElement) {
  warningElement.classList.remove("invisible");
}


/**
 * Hides a warning message by adding the 'invisible' class to the element.
 * 
 * @param {Element} warningElement - The warning message element to hide.
 */
function hideWarning(warningElement) {
  warningElement.classList.add("invisible");
}


/**
 * Checks if a dropdown menu is unselected.
 * 
 * @param {Element} dropdown - The dropdown menu element to check.
 * @returns {boolean} True if the dropdown is unselected, false otherwise.
 */
function isDropdownUnselected(dropdown) {
  return dropdown.value === "Select task category" || dropdown.value.trim() === "";
}


/**
 * Validates the content of a specified input field and displays a warning if it's empty.
 * Adds a visual indication for invalid fields.
 * 
 * @param {string} inputId - The ID of the input field to validate.
 * @param {string} warningId - The ID of the warning element associated with the input field.
 * @returns {boolean} True if the input field is valid, false otherwise.
 */
function validateField(inputId, warningId) {
  var inputElement = document.getElementById(inputId);
  var warningElement = document.getElementById(warningId);
  var inputDiv = inputElement.closest('.input-div');

  if (isFieldEmpty(inputElement)) {
    showWarning(warningElement);
    if(inputDiv) {
      inputDiv.classList.add("invalid-field");
    } else {
      inputElement.classList.add("invalid-field");
    }
    return false;
  } else {
    hideWarning(warningElement);
    if(inputDiv) {
      inputDiv.classList.remove("invalid-field");
    } else {
      inputElement.classList.remove("invalid-field");
    }
    return true;
  }
}


/**
 * Validates the selection of a dropdown menu and displays a warning if unselected.
 * Adds a visual indication for unselected dropdowns.
 * 
 * @param {string} inputId - The ID of the dropdown menu to validate.
 * @param {string} warningId - The ID of the warning element associated with the dropdown.
 * @returns {boolean} True if the dropdown selection is valid, false otherwise.
 */
function validateDropdown(inputId, warningId) {
  var dropdownElement = document.getElementById(inputId);
  var warningElement = document.getElementById(warningId);
  var inputDiv = dropdownElement.closest('.input-div');

  if (isDropdownUnselected(dropdownElement)) {
    showWarning(warningElement);
    if (inputDiv) inputDiv.classList.add("invalid-field");
    return false;
  } else {
    hideWarning(warningElement);
    if (inputDiv) inputDiv.classList.remove("invalid-field"); 
    return true;
  }
}


/**
 * Creates and stores a new task based on user inputs.
 * This function retrieves current tasks, adds a new task to the array, 
 * and updates the backend storage. It also clears the input form upon completion.
 * 
 * @async
 * @function createTask
 * @param {Object} context - The context object containing user inputs.
 */
async function createTask(context) {
  let currentTasks = await getTasksArray();
  let newTask = await getValues(context); // Kontext an getValues übergeben

  try {
    currentTasks.push(newTask);
    await setItem('tasks', currentTasks);
  } catch (error) {
    console.error('Fehler beim Erstellen der Aufgabe: ', error);
  }
}


/**
 * Toggles the state of a dropdown menu between open and closed.
 * 
 * @param {string} dropdownId - The ID of the dropdown menu.
 * @param {string} inputfieldId - The ID of the input field associated with the dropdown.
 * @param {string} svgId - The ID of the SVG icon used in the dropdown.
 * @param {string} standardValue - The value to set for the input field when the dropdown is closed.
 */
function toggleDropdown(dropdownId, inputfieldId, svgId, standardValue) {
  if (dropdownState === "closed") {
    openDropdownState(dropdownId, inputfieldId, svgId);
  } else {
    closeDropdownState(dropdownId, inputfieldId, svgId, standardValue);
  }
}


/**
 * Handles the click event on an assigned contact.
 * 
 * @param {number} index - The index of the contact in the contacts array.
 * @param {string} container - The ID of the container element to update.
 */
function handleClickOnAssignedContact(index, container) {
  toggleContact(index, container);
  updateAvatars(container);
}


/**
 * Updates the clicked state of a contact and modifies its visual representation.
 * 
 * @param {Element} div - The contact element to toggle.
 * @param {Element} img - The image element to update.
 * @param {boolean} clicked - The new clicked state.
 * @param {string} src - The source path for the image.
 */
function handleClickedState(div, img, clicked, src) {
  // Toggles the contact's visual representation and updates the image source
  div.classList.toggle("contactDivClicked", clicked);
  img.src = src;
}