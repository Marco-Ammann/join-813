let isEditFormOpened = false;
let cardIsOpened = false

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
             if (cardIsOpened){
        closeCard();
        sortTask();
        cardIsOpened = false;
        }
    }
}