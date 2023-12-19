/**
 * Initializes the contacts.html
 */
function initContacts() {
    renderContactList();
}


/**
 * Renders the contact list sorted by the first name
 */
function renderContactList() {
    let contactList = document.getElementById('contactList');
    contactList.innerHTML = /* html */ `<div class="contact-list-padding"></div>`;

    let letters = [];

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        const firstLetter = element['name'].charAt(0);

        if (letters.indexOf(firstLetter) == -1) {
            contactList.innerHTML += returnContactListHTML(0, firstLetter);
            letters.push(firstLetter);
        }
        contactList.innerHTML += returnContactListHTML(1, 0, i, element['color'], getInitials(element['name']), element['name'], element['email']);
    }
}

/**
 * Renders pop up and changes html and styles to add new contact design
 */
function openAddNewContact() {
    const popUpProfile = document.getElementById('popUpProfile');
    document.getElementById('popUpTitle').innerHTML = 'Add contact'
    document.getElementById('popUpVector').classList.remove('vector-margin');
    popUpProfile.style.backgroundColor = '#D1D1D1';
    popUpProfile.innerHTML = /* html */ `<img src="./assets/img/Desktop/contacts/person.svg"
    alt="Profile-Image"></div>`;
    document.getElementById('popUpSubtitle').classList.remove('d-none');
    document.getElementById('popUpSubmit').innerHTML = /* html */ `Create contact<img src="./assets/img/Desktop/contacts/check.svg"
    alt="Create Contact">`
    document.getElementById('popUp').classList.remove('d-none');
}

/**
 * Renders pop up and changes html and styles to edit contact design with the given contact
 * @param {number} i 
 */
function openEditContact(i) {
    const contact = contacts[i]
    const popUpProfile = document.getElementById('popUpProfile');
    const popUpSubmit = document.getElementById('popUpSubmit');
    document.getElementById('popUpTitle').innerHTML = 'Edit contact';
    document.getElementById('popUpVector').classList.add('vector-margin');
    popUpProfile.style.backgroundColor = contact['color'];
    popUpProfile.innerHTML = getInitials(contact['name']);
    document.getElementById('popUpSubtitle').classList.add('d-none');
    popUpSubmit.innerHTML = /* html */ `Save<img src="./assets/img/Desktop/contacts/check.svg"
    alt="Create Contact">`;
    popUpSubmit.onclick = function() {editContact(i)};
    document.getElementById('popUpName').value = contact['name'];
    document.getElementById('popUpEmail').value = contact['email'];
    document.getElementById('popUpPhone').value = contact['phone'];
    document.getElementById('popUp').classList.remove('d-none');
}


/**
 * Opens the clicked contact and deselects previous one if it exists
 * @param {number} i 
 */
function openContact(i) {
    renderContactList();
    document.getElementById('contactsInfo').innerHTML = '';

    let contact = contacts[i];
    document.getElementById(`contact${i}`).classList.add('contact-selected');
    document.getElementById('contactsInfo').innerHTML = returnContactInfoHTML(contact['color'], getInitials(contact['name']), contact['name'], contact['email'], contact['phone'], i);
}


/**
 * Closes the pop up and cleans the input fields
 */
function closePopUp() {
    document.getElementById('popUp').classList.add('d-none')
    document.getElementById('popUpName').value = '';
    document.getElementById('popUpEmail').value = '';
    document.getElementById('popUpPhone').value = '';
}


/**
 * Deletes the clicked contact and removes open contact info
 * @param {number} i 
 */
function deleteContact(i) {
    contacts.splice(i, 1);

    renderContactList();
    document.getElementById('contactsInfo').innerHTML = '';
}


function editContact(i) {
    closePopUp();
}


function addNewContact() {
    event.preventDefault();
    let id = contacts.length;
    let color = randomColor();
    let name = document.getElementById('popUpName').value;
    let email = document.getElementById('popUpEmail').value;
    let phone = document.getElementById('popUpPhone').value;
    let newContact = {
        "id": id,
        "color": color,
        "name": name,
        "email": email,
        "phone": phone
    }
    contacts.push(newContact);
    contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
}


function randomColor() {
    
}


/**
 * Returns the first letter of the first and last name
 * @param {string} name 
 * @returns - name initials
 */
function getInitials(name) {
    let firstLastName = name.split(' ');
    let firstLetter = firstLastName[0].charAt(0);
    let secondLetter = firstLastName[1].charAt(0);
    return firstLetter + secondLetter;
}


/**
 * Stops the clicked element from starting onclick function of the parent div
 * @param {event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Return the requested HTML Code for the contact list
 * @param {number} num 
 * @param {string} letter 
 * @param {number} i 
 * @param {string} color 
 * @param {string} initials 
 * @param {string} name 
 * @param {string} email 
 * @returns - HTML Code as string
 */
function returnContactListHTML(num, letter, i, color, initials, name, email) {
    if (num == 0) {
        return /* html */ `
            <div class="letter">
                <span>${letter}</span>
            </div>
            <img class="border" src="./assets/img/Desktop/general_elements/bar/vector_gray_vertical.svg">`;
    } else if (num == 1) {
        return /* html */ `
            <div id="contact${i}" class="user" onclick="openContact(${i})">
                <div class="user-icon" style="background-color: ${color};">${initials}</div>
                <div class="username">
                    <span>${name}</span>
                    <a href="mailto:${email}">${email}</a>
                </div>
            </div>`;
    }
}


/**
 * Return HTML Code for the opened contact info
 * @param {string} color 
 * @param {string} initials 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone
 * @param {number} i 
 * @returns - HTML Code as string
 */
function returnContactInfoHTML(color, initials, name, email, phone, i) {
    return /* html */ `<div class="info-title">
        <div class="user-icon icon-big" style="background-color: ${color};">${initials}</div>
        <div class="info-name">
            <h2>${name}</h2>
            <div class="info-buttons">
                <div onclick="openEditContact(${i})">
                    <img src="./assets/img/Desktop/contacts/edit.svg" alt="Edit">
                    <span>Edit</span>
                </div>
                <div onclick="deleteContact(${i})">
                    <img src="./assets/img/Desktop/contacts/delete.svg" alt="Delete">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    <h6>Contact Information</h6>
    <div class="info-me">
        <div>
            <h4>Email</h4>
            <a href="mailto:${email}">${email}</a>
        </div>
        <div>
            <h4>Phone</h4>
            <span>${phone}</span>
        </div>
    </div>`;
}