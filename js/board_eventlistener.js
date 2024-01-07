let isEditFormOpened = false;

function setEditFormOpenedToFalse() {
    isEditFormOpened = false;
}


function handleOpenCardContainerClick() {
    if (isEditFormOpened) {
        closeCard();
        sortTask();
        clearForm('assigned-contacts-popup', 'subTasks-popup');
        removeListeners('add-contact-input');
        isEditFormOpened = false;
    } else {
        closeCard();
        sortTask();
    }
}