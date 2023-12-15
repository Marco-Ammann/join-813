function initContacts() {
    renderContactsList();
    // TODO: New contacts must be pusht in sorted by the first letter of their name 

}


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


function getInitials(name) {
    let firstLastName = name.split(' ');
    let firstLetter = firstLastName[0].charAt(0);
    let secondLetter = firstLastName[1].charAt(0);
    return firstLetter + secondLetter;
}


function openContact(i) {
    document.getElementById('contactsInfo').innerHTML = '';
    document.getElementById(`contact${i}`).classList.add('contact-selected');
    document.getElementById('contactsInfo').innerHTML = returnContactsInfoHTML();
}


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


function returnContactsInfoHTML() {
    return /* html */ `<div class="contacts-info-title">
        <div class="contacts-user-icon icon-big" style="background-color: #FF7A00;">AM</div>
        <div class="contacts-info-name">
            <h2>Anton Mayer</h2>
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
            <a href="#">antom@gmail.com</a>
        </div>
        <div>
            <h4>Phone</h4>
            <span>+49 1111 111 11 1</span>
        </div>
    </div>`;
}