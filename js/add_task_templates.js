function generateAssignContactsHTML(contact, index) {
    return /*HTML*/`
    <div class="contactDiv" id="contact${index}">

        <div class="contactDiv-sub">
            <img class="checkbox" src="./assets/img/Desktop/add_task/profile_circle.svg" alt="">
            ${contact.name}
        </div>

        <img class="checkbox" src="./assets/img/Desktop/add_task/check_button.svg" alt="">
    </div>
    `;
}