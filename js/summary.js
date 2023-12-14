/**
 * Initializes the summary.html
 */
function initSummary() {
    renderSummaryBoard();
    renderSummaryGreeting();
}

/**
 * Replaces the numbers and "urgent"/deadline box
 */
function renderSummaryBoard() {
    document.getElementById('toDoNum').innerHTML = findTaskQuantitys('state', 'ToDo');
    document.getElementById('doneNum').innerHTML = findTaskQuantitys('state', 'Done');
    document.getElementById('urgentNum').innerHTML = findTaskQuantitys('priority', 'high');
    renderDeadlineBox()
    document.getElementById('tasksNum').innerHTML = tasks.length;
    document.getElementById('inProgressNum').innerHTML = findTaskQuantitys('state', 'InProgress');
    document.getElementById('awaitFeedbackNum').innerHTML = findTaskQuantitys('state', 'AwaitFeedback');
}


function renderSummaryGreeting() {
    
    // TODO: Change username when logged in or guest
}

/**
 *  Searches in the tasks-array for matches in the subcategory
 * @param {string} subcategory 
 * @param {string} match 
 * @returns - count of matches
 */
function findTaskQuantitys(subcategory, match) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];

        if (element[subcategory] == match) {
            count++;
        }
    }
    return count;
}

/**
 * Replaces the date in the deadline box
 */
function renderDeadlineBox() {
    let dates = [];
    let today = new Date();

    for (let i = 0; i < tasks.length; i++) {
        let dateParts = tasks[i]['dueDate'].split('-');
        let taskDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        if (taskDate > today) {
            dates.push(tasks[i]['dueDate']);
        }
    }
    document.getElementById('deadlineDate').innerHTML = sortDates(dates);
}

/**
 * Sorts Dates from closest to farthest and formats it in 'month DD, YYYY'
 * @param {array} dates 
 * @returns - formatted closest date to today
 */
function sortDates(dates) {
    dates.sort((a, b) => convertToDate(a) - convertToDate(b));

    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return convertToDate(dates[0]).toLocaleDateString('en-US', options);
}

/**
 * Formats date to be compatible with javascript date methods
 * @param {string} dateString 
 * @returns formatted date
 */
function convertToDate(dateString) {
    let [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
}