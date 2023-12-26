function generateEditCardHTML() {
    return /*HTML*/`
<div class="add-tasks-popup">

<div>
    <div class="addTaskHeader">
        <h1 class="content-title">Add Task</h1>
        <button id="closeAddTaksButton" onclick="closeCard()"><svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_116223_1910" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                    width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_116223_1910)">
                    <path
                        d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88333 5.51672 6.11667 5.42505 6.4 5.42505C6.68333 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                        fill="#2A3647" />
                </g>
            </svg>
        </button>
    </div>

    <div>
        <section class="task-forms">
            <div class="forms-sides">
                <div class="form-div">
                    <span class="form-span required-asteriks">Title</span>
                    <div class="form-subcontainer">
                        <input id="task-title-input" maxlength="48" class="task-title-input" type="text"
                            placeholder="Enter a title" required />
                        <p class="input-required-warning invisible" id="requiredTextTitle">This field is
                            required</p>
                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span">Description</span>
                    <div class="form-subcontainer">
                        <textarea id="task-description-textarea" class="task-description-textarea"
                            name="inputDescription" placeholder="Enter a Description" required></textarea>
                        <p class="input-required-warning invisible" id="requiredTextDescription">This
                            field is required</p>
                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span">Assigned to</span>
                    <div class="input-div-wrapper">
                        <div class="input-div">
                            <input id="add-contact-input" class="add-contact-input" type="text"
                                value="Select contacts to assign" required
                                onclick="toggleDropdown('assignDropdown', 'add-contact-input', 'arrowAssign', 'Select contacts to assign')" />
                            <img class="arrow-symbol input-symbol" id="arrowAssign"
                                src="assets/img/Desktop/add_task/arrow_dropdown_down.svg" alt="Pfeil runter"
                                onclick="toggleDropdown('assignDropdown', 'add-contact-input', 'arrowAssign', 'Select contacts to assign')" />
                        </div>
                        <div class="assignDropdown-popup d-none" id="assignDropdown"></div>
                    </div>
                    <div class="assigned-contacts" id="assigned-contacts"></div>

                </div>
            </div>

            <div class="seperator-vertical"></div>

            <div class="forms-sides">
                <div class="form-div">
                    <span class="form-span required-asteriks">Due
                        date</span>
                    <div class="form-subcontainer">

                        <div class="input-div">
                            <input id="due-date-input" maxlength="48" class="due-date-input" type="date"
                                placeholder="dd/mm/yyyy" required />
                        </div>

                        <p class="input-required-warning invisible" id="requiredTextDueDate">This field
                            is required</p>

                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span">Prio</span>
                    <div class="prio-buttons">
                        <button type="button" class="prio-btn" id="urgentBtn" onclick="setPrio('urgent')">
                            Urgent
                            <img src="./assets/img/Desktop/add_task/priority_icons/urgent.svg" id="urgentSymbol" />
                        </button>
                        <button type="button" class="prio-btn" id="mediumBtn" onclick="setPrio('medium')">
                            Medium
                            <img src="./assets/img/Desktop/add_task/priority_icons/medium.svg" id="mediumSymbol" />
                        </button>
                        <button type="button" class="prio-btn" id="lowBtn" onclick="setPrio('low')">
                            Low
                            <img src="./assets/img/Desktop/add_task/priority_icons/low.svg" id="lowSymbol" />
                        </button>
                    </div>
                </div>

                <div class="form-div">
                    <span class="form-span required-asteriks">Category</span>
                    <div class="input-div-wrapper">
                        <div class="input-div">
                            <input onclick="switchVisibility('categoryDropdown')" id="add-category-input"
                                class="add-category-input" type="text" value="Select task category" required />

                            <img onclick="switchVisibility('categoryDropdown')" class="arrow-symbol input-symbol"
                                id="arrowCategory" src="assets/img/Desktop/add_task/arrow_dropdown_down.svg"
                                alt="Pfeil runter" />
                        </div>

                        <div class="categoryDropdown-popup d-none" id="categoryDropdown"></div>
                    </div>
                    <p class="input-required-warning invisible" id="requiredTextCategory">This field is
                        required</p>
                </div>

                <div class="form-div">
                    <span class="form-span">Subtasks</span>
                    <div class="form-subcontainer">

                        <div class="input-div" id="subtask-input-div">
                            <input id="subtask-input" maxlength="48" class="subtask-input" type="text"
                                placeholder="Add new subtask" onfocus="addFocusClass()" />

                            <div class="plus-symbol-div" id="plus-symbol-div">
                                <img class="plus-symbol input-symbol" id="plus-symbol-subtask>"
                                    onclick="addFocusClass()"
                                    src="assets/img/Desktop/add_task/subtasks_icons/add.svg" alt="plus" />
                            </div>

                            <div class="create-task-div d-none" id="create-task-div">
                                <img class="plus-symbol input-symbol" id="close-symbol-subtask"
                                    onclick="clearSubtaskInput()"
                                    src="assets/img/Desktop/add_task/subtasks_icons/close.svg"
                                    alt="cancel-symbol" />

                                <img class="check-symbol input-symbol" id="check-symbol-subtask"
                                    onclick="setSubtask()"
                                    src="assets/img/Desktop/add_task/subtasks_icons/check.svg" alt="check-symbol" />
                            </div>
                        </div>
                    </div>
                    <div id="subTasks" class="subTasks"></div>
                </div>
        </section>
    </div>
</div>

<div class="footer-container">
    <span class="footer-required-field required-asteriks-before">This
        field is required</span>

    <div class="footer-btn-container">
        <button id="clearBtn" type="button" class="addTaskBtn clearBtn" onclick="clearForm()">
            Clear
            <img src="./assets/img/Desktop/add_task/cancel.svg" alt="weißer Haken" />
        </button>

        <button id="createTaskBtn" type="submit" class="addTaskBtn createBtn"
            onclick="validateAndCreateTaskPopup()">
            Create Task
            <img src="assets/img/Desktop/add_task/check.svg" alt="weißer Haken" />
        </button>
        <div id="okBtnDiv"></div>
    </div>
</div>

</div>
    `;
}
