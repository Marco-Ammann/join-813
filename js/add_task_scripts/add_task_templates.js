function generateAssignContactsHTML(contact, index) {
    const name = contact.name;
    return `
    <div class="contactDiv" id="contact${index}" onclick="handleClickOnAssignedContact(${index})">
        <div class="contactDiv-sub">
            <div class="contact-avatar" style="background-color: ${contact.color};">${getInitials(name)}</div>
            ${contact.name}
        </div>
        <img class="checkbox" id="checkbox${index}" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}


function generateCategoryOptionsHTML(category, index) {
    return `
    <div class="categoryDiv" id="categoryOption${index}" onclick="switchTaskCategoryClickedState('${index}')">
        ${category}
    </div>
    `;
}


function generateAvatar(contact) {
    return `
    <div class="contact-avatar" style="background-color: ${contact.color};">${getInitials(contact.name)}</div>
    `;
}
