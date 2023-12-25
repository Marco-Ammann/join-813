/**
 * Initializes the contacts.html
 */
function initContacts() {
    renderContactList();

}


/**
 * Renders the contact list sorted by their names
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
    const popUpSubmit = document.getElementById('popUpSubmit');
    const popUp = document.getElementById('popUp');

    document.getElementById('popUpTitle').innerHTML = 'Add contact'
    document.getElementById('popUpVector').classList.remove('vector-margin');
    popUpProfile.style.backgroundColor = '#D1D1D1';
    popUpProfile.innerHTML = /* html */ `<img src="./assets/img/Desktop/contacts/person.svg"
    alt="Profile-Image"></div>`;
    document.getElementById('popUpSubtitle').classList.remove('d-none');
    popUpSubmit.innerHTML = /* html */ `Create contact<img src="./assets/img/Desktop/contacts/check.svg"
    alt="Create Contact">`
    popUpSubmit.parentNode.parentNode.onsubmit = function () { return addNewContact() };
    popUpSubmit.previousElementSibling.innerHTML = /* html */ `Cancel<img src="./assets/img/Desktop/contacts/iconoir_cancel.svg" alt="Cancel">`
    popUpSubmit.previousElementSibling.onclick = function () { closePopUp() };
    popUp.classList.remove('d-none');
    popUp.style = 'animation: blendIn 300ms ease-out;'
    if ((window.matchMedia("(max-width: 428px)").matches)) {
        popUp.firstElementChild.style = 'animation: slideInPopUpMobile 300ms ease-out;';
    } else {
        popUp.firstElementChild.style = 'animation: slideInPopUp 300ms ease-out;';
    }
}


/**
 * Renders pop up and changes html and styles to edit contact design with the given contact
 * @param {number} i 
 */
function openEditContact(i) {
    const contact = contacts[i];
    const popUpProfile = document.getElementById('popUpProfile');
    const popUpSubmit = document.getElementById('popUpSubmit');
    const popUp = document.getElementById('popUp');

    document.getElementById('popUp')
    document.getElementById('popUpTitle').innerHTML = 'Edit contact';
    document.getElementById('popUpVector').classList.add('vector-margin');
    popUpProfile.style.backgroundColor = contact['color'];
    popUpProfile.innerHTML = getInitials(contact['name']);
    document.getElementById('popUpSubtitle').classList.add('d-none');
    popUpSubmit.innerHTML = /* html */ `Save<img src="./assets/img/Desktop/contacts/check.svg"
    alt="Create Contact">`;
    popUpSubmit.parentNode.parentNode.onsubmit = function () { return editContact(i) };
    popUpSubmit.previousElementSibling.innerHTML = 'Delete'
    popUpSubmit.previousElementSibling.onclick = function () { deleteContact(i) };
    document.getElementById('popUpName').value = contact['name'];
    document.getElementById('popUpEmail').value = contact['email'];
    document.getElementById('popUpPhone').value = contact['phone'];
    popUp.classList.remove('d-none');
    popUp.style = 'animation: blendIn 300ms ease-out;'
    if ((window.matchMedia("(max-width: 428px)").matches)) {
        popUp.firstElementChild.style = 'animation: slideInPopUpMobile 300ms ease-out;';
    } else {
        popUp.firstElementChild.style = 'animation: slideInPopUp 300ms ease-out;';
    }
}


/**
 * Opens the clicked contact and deselects previous one if it exists
 * @param {number} i 
 */
function openContact(i) {
    let contactsInfo = document.getElementById('contactsInfo');
    renderContactList();
    contactsInfo.innerHTML = '';


    let contact = contacts[i];
    let contactElement = document.getElementById(`contact${i}`);
    contactElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('contactsInfo').innerHTML = returnContactInfoHTML(contact['color'], getInitials(contact['name']), contact['name'], contact['email'], contact['phone'], i);

    if (window.matchMedia("(max-width: 428px)").matches) {
        openContactMobile(i);
    } else {
        contactElement.classList.add('contact-selected');
        contactsInfo.style = 'animation: slideInInfo 100ms ease-in-out;';
        setTimeout(function () {
            contactsInfo.style = '';
        }, 100);
    }
}


function openAddNewContactMobile() {

}


function openContactMobile(i) {
    document.getElementById('contact-list-container').classList.add('d-none');
}


function closeContactMobile() {
    document.getElementById('contact-list-container').classList.remove('d-none');
}

/**
 * Closes the pop up and cleans the input fields
 */
function closePopUp(submitted) {
    let popUp = document.getElementById('popUp');

    if (!submitted) {
        popUp.style = 'animation: blendOut 300ms ease-out;'
        if ((window.matchMedia("(max-width: 428px)").matches)) {
            popUp.firstElementChild.style = 'animation: slideOutPopUpMobile 300ms ease-out;';
        } else {
            popUp.firstElementChild.style = 'animation: slideOutPopUp 300ms ease-out;';
        }
        
        setTimeout(function () {
            popUp.classList.add('d-none');
            document.getElementById('popUpName').value = '';
            document.getElementById('popUpEmail').value = '';
            document.getElementById('popUpPhone').value = '';
        }, 300);
    } else {
        popUp.classList.add('d-none');
        document.getElementById('popUpName').value = '';
        document.getElementById('popUpEmail').value = '';
        document.getElementById('popUpPhone').value = '';
    }
}


/**
 * Deletes the clicked contact and removes open contact info
 * @param {number} i 
 */
function deleteContact(i) {
    contacts.splice(i, 1);

    renderContactList();
    document.getElementById('contactsInfo').innerHTML = '';

    closePopUp(true);
}


/**
 * Changes the edited contact information like entered and sorts the contacts by their names
 * @param {number} i 
 */
function editContact(i) {
    event.preventDefault();

    let lastId = contacts[i]['id'];

    contacts[i].name = document.getElementById('popUpName').value;
    contacts[i].email = document.getElementById('popUpEmail').value;
    contacts[i].phone = document.getElementById('popUpPhone').value;

    contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    let index = contacts.findIndex(c => c.id == lastId);

    closePopUp(true);
    openContact(index);
}


/**
 * Adds the new contact sorted by the name
 */
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

    let lastId = id;

    contacts.push(newContact);
    contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    let index = contacts.findIndex(c => c.id == lastId);

    closePopUp(true);
    renderContactList();
    openContact(index);
    playMessageAni();
}


/**
 * Displays the "Contact succesfully created" message for 2.5s
 */
function playMessageAni() {
    let message = document.getElementById('message');
    message.classList.remove('d-none');
    if (window.matchMedia("(max-width: 428px)").matches) {
        message.classList.add('message-animation-mobile'); // start animation
        setTimeout(function () {
            message.classList.remove('message-animation-mobile'); // reset animation
            message.classList.add('d-none');
        }, 2500);
    } else {
        message.classList.add('message-animation'); // start animation
        setTimeout(function () {
            message.classList.remove('message-animation'); // reset animation
            message.classList.add('d-none');
        }, 2500);
    }
}


/**
 * Returns 1 of 10 random colors
 * @returns - random HEX color code
 */
function randomColor() {
    let colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];
    let num = Math.floor(Math.random() * 15);
    return colors[num];
}


/**
 * Returns the first letter of the first and last name in upper case
 * @param {string} name 
 * @returns - name initials
 */
function getInitials(name) {
    let firstLastName = name.split(' ');
    let firstLetter = firstLastName[0].charAt(0).toLocaleUpperCase();
    if (firstLastName[1]) {
        let secondLetter = firstLastName[1].charAt(0).toLocaleUpperCase();
        return firstLetter + secondLetter;
    } else {
        return firstLetter;
    }
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
                    <a>${email}</a>
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
                    <span name="Edit">Edit</span>
                </div>
                <div onclick="deleteContact(${i})">
                    <img src="./assets/img/Desktop/contacts/delete.svg" alt="Delete">
                    <span name="Delete">Delete</span>
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

// TODO: Clean coding (JSDoc + Funtion Length / Script Length)