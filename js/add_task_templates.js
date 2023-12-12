function generateAssignContactsHTML(contact, index) {
    return /*HTML*/`
    <div class="contactDiv" id="contact${index}" onclick="switchClickedState(${index})">
        <div class="contactDiv-sub">
            <img class="checkbox" src="./assets/img/Desktop/add_task/profile_circle.svg">
            ${contact.name}
        </div>
        <img class="checkbox" id="checkbox${index}" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}