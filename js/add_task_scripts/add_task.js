const categorys = ["Work", "Personal"];

let dropdownState = "closed";
let clickedStates = [];

function loadAddTaskPage() {
  generateAssignContacts();
  generateCategoryOptions();
  setupDropdownCloseListener();
  setupFilterListener();
}


function validateAndCreateTask() {
  var isValid = true;
  isValid = validateField("task-title-input", "requiredTextTitle") && isValid;
  isValid = validateField("task-description-textarea", "requiredTextDescription") && isValid;
  isValid = validateField("due-date-input", "requiredTextDueDate") && isValid;
  isValid = validateDropdown("add-category-input", "requiredTextCategory") && isValid;

  if (isValid) {
    createTask();
    animateTaskAdded();     
    setTimeout(function() {
      window.location.href = 'board.html';
    }, 1500);
  }
}


function validateDueDate() {
  const dueDateInput = document.getElementById("due-date-input");
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Das erwartete Datumsmuster (dd/mm/yyyy)

  if (!datePattern.test(dueDateInput.value)) {
    alert(
      "Ungültiges Datumsformat. Bitte verwenden Sie das Format dd/mm/yyyy."
    );
    dueDateInput.value = "";
  }
}


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


function updateCategoryInput(selectedCategory) {
  const categoryInput = document.getElementById("add-category-input");
  const categoryDropdown = document.getElementById("categoryDropdown");

  categoryInput.value = `${selectedCategory}`;
  categoryDropdown.classList.add("d-none");
}


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


function updateAvatars() {
  let avatarContainer = document.getElementById("assigned-contacts");
  avatarContainer.innerHTML = assignedContacts
    .map((contact) => generateAvatar(contact))
    .join("");
}


function openDropdown(dropdown, selectedElement, arrowImage) {
  dropdown.classList.remove("d-none");
  selectedElement.value = "";
  dropdownState = "open";
  arrowImage.src = "assets/img/Desktop/add_task/arrow_dropdown_up.svg";
}


function closeDropdown(dropdown, inputfield, arrowImage, setValue) {
  dropdown.classList.add("d-none");
  inputfield.value = `${setValue}`;
  dropdownState = "closed";
  arrowImage.src = "./assets/img/Desktop/add_task/arrow_dropdown_down.svg";
}


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


function generateCategoryOptions() {
  let dropdowncontainer = document.getElementById("categoryDropdown");
  dropdowncontainer.innerHTML = "";
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i].trim();
    dropdowncontainer.innerHTML += generateCategoryOptionsHTML(category, i);
  }
}


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


function setupDropdownCloseListener() {
  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("assignDropdown");
    const inputField = document.getElementById("add-contact-input");
    const arrowImage = document.getElementById("arrowAssign");

    if (
      !dropdown.contains(event.target) &&
      event.target !== inputField &&
      event.target !== arrowImage
    ) {
      closeDropdown(
        dropdown,
        inputField,
        arrowImage,
        "Select contacts to assign"
      );
    }
  });
}


function setupFilterListener() {
  const inputField = document.getElementById("add-contact-input");
  inputField.addEventListener("input", filterContacts);
}



function animateTaskAdded() {
  const taskAddedContainer = document.querySelector('.task-added-container');
  taskAddedContainer.classList.add('task-added-animate');
}