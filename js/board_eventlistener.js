let isEditFormOpened = false;
let cardIsOpened = false

function setEditFormOpenedToFalse() {
    isEditFormOpened = false;
}


function handleOpenCardContainerClick() {
    if (isEditFormOpened) {
        closeCard();
        clearForm('assigned-contacts-popup', 'subTasks-popup');
        removeListeners('add-contact-input');
    } else if (cardIsOpened) {
        closeCard();
    }
    isEditFormOpened = cardIsOpened = false;
}


