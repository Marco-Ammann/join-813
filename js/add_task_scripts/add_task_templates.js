function generateAssignContactsHTML(contact, index) {
    let name = contact.name;
    return /*HTML*/`
    <div class="contactDiv" id="contact${index}" onclick="switchClickedState(${index})">
        <div class="contactDiv-sub">
        <div class="contact-avatar" style="background-color: ${contact.color};">${getInitials(name)}</div>
            ${contact.name}
        </div>
        <img class="checkbox" id="checkbox${index}" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}


function generateCategoryOptionsHTML(category, index) {
    return /*HTML*/`
    <div class="categoryDiv" id="categoryOption${index}" onclick="switchTaskCategoryClickedState('${index}')">
        ${category}
    </div>
    `;
}
