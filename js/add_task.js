const contacts = [
    { id: 1, name: "Ammann Marco" },
    { id: 2, name: "Joost Heidrich" },
    { id: 3, name: "Ghulammustafa Kakar" },
    { id: 4, name: "Sebastian Treittinger" }
];


let dropdownState = "closed";


// open/close the Dropdown
function switchDropdownState(dropdownId, inputfieldId, svgId) {
    const dropdown = document.getElementById(dropdownId);
    const inputfield = document.getElementById(inputfieldId);
    const arrowImage = document.getElementById(svgId);
    generateAssignContacts()
    if (dropdownState === "open") {
        closeAssignDropdown(dropdown, inputfield, arrowImage);
    } else {
        openAssignDropdown(dropdown, inputfield, arrowImage);
    }
}


function openAssignDropdown(dropdown, inputfield, arrowImage) {
    dropdown.classList.remove('d-none');
    inputfield.value = "";
    dropdownState = "open";
    arrowImage.src = "assets/img/Desktop/add_task/arrow_dropdown_up.svg";
}


function closeAssignDropdown(dropdown, inputfield, arrowImage) {
    dropdown.classList.add('d-none');
    inputfield.value = "Select contacts to assign";
    dropdownState = "closed";
    arrowImage.src = "./assets/img/Desktop/add_task/arrow_dropdown_down.svg";
}


function generateAssignContacts() {
    let dropdowncontainer = document.getElementById('assignDropdown');
    dropdowncontainer.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const selectableContact = contacts[i];
        dropdowncontainer.innerHTML += generateAssignContactsHTML(selectableContact, i)
    }
}


function generateAssignContactsHTML(contact, index) {
    return /*HTML*/`
    <div class="contactDiv contact${index}">${contact.name}
        <img class="checkbox" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}