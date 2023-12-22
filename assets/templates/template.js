let nameOfPage = [
    "Summary",
    "Add_task",
    "Board",
    "Contacts",
    "help",
    "privacy-policy",
    "legal_notice",
];
let filterExcludePages = ["help", "privacy-policy", "legal_notice"];

let currentUser = [];
let dropDownIsOpen = false;

async function init() {
    await includeHTML();
    await loadCurrentUser();
    await getInitialsCurrentUser();
    await whichPageIsCurrent();
}

/**
 * load Template Header and Sidebar in some pages
 *
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/desktop_template.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

/**
 * load CurrentUser from the Backend
 *
 */
async function loadCurrentUser() {
    try {
        currentUser = JSON.parse(await getItem("currentUser"));
    } catch (e) {
        console.error("Loading error:", e);
        console.log("CurrentUserFail");
    }
}

/**
 * Find the currentpage with Url and Names of Content
 *
 */
//TODO: Clean Code
async function whichPageIsCurrent() {
    let url = window.location.pathname;
    for (let i = 0; i < nameOfPage.length; i++) {
        const element = nameOfPage[i];
        let smalLetter = element.toLowerCase();
        if (url.includes(smalLetter)) {
            if (smalLetter === "help") {
                partDisplayNone("helpImageDefault");
            }
            if (smalLetter === "privacy-policy" || smalLetter === "legal_notice") {
                if (currentUser == "#everyone") {
                    partDisplayNone("headerButtons");
                    partDisplayNone("sidebarMainButtons");
                    markEffects(smalLetter);
                }
                markEffects(smalLetter);
                partDisplayNone("headerButtons");
            }
            if (!filterExcludePages.includes(smalLetter)) {
                currentLinkUsed(element);
            }
        }
    }
}

/**
 * Add and Remove Attributes (Hovereffects) and parts hide
 *
 * @param {string} x - the string is the name of the page includes in the URL; the first letter is capitalized
 */
function currentLinkUsed(x) {
    let link = document.getElementById(`link${x}`);
    link.classList.remove("hover-menu-btn");
    link.classList.add("current-color-hover");
    document.getElementById(`text${x}`).style = "color: #FFF";
    let image = document.getElementById(`image${x}`);
    y = x.toLowerCase();
    image.src = `./assets/img/Desktop/general_elements/menu_symbols/${y}_light.svg`;
}

/**
 * This function hide same parts of the header and sidebar
 *
 * @param {string} x the string are the names of ID´s from the parts
 */
function partDisplayNone(x) {
    document.getElementById(x).style = "display: none";
}

/**
 * This function designed same parts of the header and sidebar
 *
 * @param {string} x - the string are the names of the ID`s, who will designed
 */
function markEffects(x) {
    document.getElementById(`${x}`).classList.remove(`${x}-link`);
    document.getElementById(`${x}`).classList.add("current-color-hover");
}

/**
 * get the first letter of the names from Users
 *
 */
async function getInitialsCurrentUser() {
    let textArea = document.getElementById("headerIconText");
    let userName = currentUser["name"];
    if (!(currentUser == "#everyone")) {
        let firstLastName = userName.split(" ");
        let firstLetter = firstLastName[0].charAt(0).toLocaleUpperCase();
        if (firstLastName[1]) {
            let secondLetter = firstLastName[1].charAt(0).toLocaleUpperCase();
            textArea.innerHTML = firstLetter + secondLetter;
        } else {
            textArea.innerHTML = firstLetter;
        }
    }
}

/**
 * open and close the dropdownmenu
 *
 */
function moveDropDownMenu() {
    let dropDownMenu = document.getElementById("dropDownMenu");
    let headerIcon = document.getElementById("headerIcon");
    let container = document.getElementById("containerDropDown");
    if (dropDownIsOpen === false) {
        dropDownMenu.style.display = "block";
        headerIcon.style.background = "#0C2E621F";
        container.style.display = "block";
        dropDownIsOpen = true;
    } else {
        dropDownMenu.style.display = "none";
        headerIcon.style.background = "#FFF";
        container.style.display = "none";
        dropDownIsOpen = false;
    }
}

/**
 * add clickfunction about all the page
 *
 * @param {Event-Object} event - clickevent about the page, without dropdownmenu
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * User logout and earse datas
 *
 */
async function logOut() {
    currentUser = "";
    console.log(currentUser);
    await setItem("currentUser", JSON.stringify(currentUser));
    localStorage.removeItem("joinInputs");
}
