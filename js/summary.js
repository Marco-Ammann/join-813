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


/**
 * Gets the daytime and displays a daytime specific greeting with the username or guest
 */
function renderSummaryGreeting() {
    let greet = document.getElementById('greeting');
    let time = new Date();
    time = time.getHours();

    if (time < 12 && time > 4) {
        greet.firstElementChild.innerHTML = 'Good morning,';
    } else if (time < 18 && time > 12) {
        greet.firstElementChild.innerHTML = 'Good afternoon,';
    } else if (time < 24 || time < 4) {
        greet.firstElementChild.innerHTML = 'Good evening,';
    }
    loadCurrentUser(greet);
}


/**
 * Displays the name of the registered user in the greeting or leaves it blank
 * @param {DOM element} greet 
 */
async function loadCurrentUser(greet) {
    let nameElement = greet.lastElementChild;
    let timeElement = greet.firstElementChild;
    try {
        let currentUser = JSON.parse(await getItem("currentUser"));
        nameElement.innerHTML = currentUser['name'];
    } catch (e) {
        console.error("Loading error:", e);
        nameElement.remove();
        timeElement.innerHTML = timeElement.innerHTML.slice(0, -1);
    }
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