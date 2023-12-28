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


/**
 * automatic onload in HTML-Code
 * 
 */
async function init() {
    await loadCurrentUser();
    await includeHTML();
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

        await loadTemplateAndExecuteFunctions(file, element);
    }
}


async function loadTemplateAndExecuteFunctions(file, element) {
    let resp = await fetch(file);
    if (resp.ok) {
        let templateHTML = await resp.text();
        element.innerHTML = templateHTML;
        if (currentUser == "#everyone") {
            partDisplayNone("sidebarMainButtons");
        }
    } else {
        element.innerHTML = "Page not found";
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
async function whichPageIsCurrent() {
    let url = window.location.pathname;
    for (let i = 0; i < nameOfPage.length; i++) {
        const element = nameOfPage[i];
        let smalLetter = element.toLowerCase();
        if (url.includes(smalLetter)) {
            nameOfPages(smalLetter, element);
        }
    }
}


/**
 * requiroments from the name of pages
 * 
 * @param {string} smalLetter - the name from the page
 * @param {string} element - a Page from the Array nameOfPage
 */
function nameOfPages(smalLetter, element) {
    if (smalLetter === "help") {
        partDisplayNone("helpImageDefault");
    }
    if (smalLetter === "privacy-policy" || smalLetter === "legal_notice") {
        markEffects(smalLetter);
    }
    if (!filterExcludePages.includes(smalLetter)) {
        currentLinkUsed(element);
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
        openDropDownAni();
        dropDownIsOpen = true;
    } else {
        closeDropDownAni();
    }
}


/**
 * Starts open animation of the drop down menu IF its on mobile version
 */
function openDropDownAni() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById("dropDownMenu").style.animation = 'slideInDropdown 100ms ease-out';
    }
}


/**
 * Starts close animation of the drop down menu IF its on mobile version ELSE it just closes the menu
 */
function closeDropDownAni() {
    let dropDownMenu = document.getElementById("dropDownMenu");
    let headerIcon = document.getElementById("headerIcon");
    let container = document.getElementById("containerDropDown");

    if (window.matchMedia("(max-width: 1000px)").matches) {
        dropDownMenu.style.animation = 'slideOutDropdown 100ms ease-out';
        setTimeout(function () {
            dropDownMenu.style.display = "none";
            headerIcon.style.background = "#FFF";
            container.style.display = "none";
            dropDownIsOpen = false;
        }, 100);
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
    sessionStorage.removeItem("greetingAniPlayed");
    await setItem("currentUser", JSON.stringify(currentUser));
    localStorage.removeItem("joinInputs");
}
