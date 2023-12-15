/**
 * Initializes the contacts.html
 */
function initContacts() {
    renderContactsList();
}

/**
 * Renders the contact list sorted by the first name
 */
function renderContactsList() {
    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = /* html */ `<div class="contacts-list-padding"></div>`;

    contacts.sort((a, b) => a.name.localeCompare(b.name));
    let letters = [];

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        const firstLetter = element['name'].charAt(0);

        if (letters.indexOf(firstLetter) == -1) {
            contactsList.innerHTML += returnContactsListHTML(0, firstLetter);
            letters.push(firstLetter);
        }
        contactsList.innerHTML += returnContactsListHTML(1, 0, i, element['color'], getInitials(element['name']), element['name'], element['email']);
    }
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
 * Opens the clicked contact and deselects previous one if it exists
 * @param {number} i 
 */
function openContact(i) {
    renderContactsList();
    document.getElementById('contactsInfo').innerHTML = '';

    let contact = contacts[i];
    document.getElementById(`contact${i}`).classList.add('contact-selected');
    document.getElementById('contactsInfo').innerHTML = returnContactsInfoHTML(contact['color'], getInitials(contact['name']), contact['name'], contact['email'], contact['phone']);
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
function returnContactsListHTML(num, letter, i, color, initials, name, email) {
    if (num == 0) {
        return /* html */ `
            <div class="contacts-letter">
                <span>${letter}</span>
            </div>
            <img class="contacts-border" src="./assets/img/Desktop/general_elements/bar/vector_gray_vertical.svg">`;
    } else if (num == 1) {
        return /* html */ `
            <div id="contact${i}" class="contacts-user" onclick="openContact(${i})">
                <div class="contacts-user-icon" style="background-color: ${color};">${initials}</div>
                <div class="contacts-username">
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
 * @returns - HTML Code as string
 */
function returnContactsInfoHTML(color, initials, name, email, phone) {
    return /* html */ `<div class="contacts-info-title">
        <div class="contacts-user-icon icon-big" style="background-color: ${color};">${initials}</div>
        <div class="contacts-info-name">
            <h2>${name}</h2>
            <div class="contacts-info-buttons">
                <div>
                    <img src="./assets/img/Desktop/general_elements/contacts/edit.svg" alt="Edit">
                    <span>Edit</span>
                </div>
                <div>
                    <img src="./assets/img/Desktop/general_elements/contacts/delete.svg" alt="Delete">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    <h6>Contact Information</h6>
    <div class="contacts-info-me">
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