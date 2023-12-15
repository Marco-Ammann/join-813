function initContacts() {
    //renderContactsScroll(); // TODO: New contacts must be pusht in sorted by the first letter of their name 
    
}


function openContact(id) {
    document.getElementById('contactsInfo').innerHTML = '';
    document.getElementById(`contact${id}`).classList.add('contact-selected');
    document.getElementById('contactsInfo').innerHTML = returnContactsInfoHTML();
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
    </div>`
}