let nameOfPage = [
    "Summary",
    "Add_task",
    "Board",
    "Contacts",
    "help",
    "privacy-policy",
    "legal_notice",
];

let currentUser = [];

async function init() {
    await includeHTML();
    await loadCurrentUser();
    await whichPageisCurrent();
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
            currentUser = '';
        }
    }
}

/**
 * load CurrentUser from the Backend
 * 
 */
async function loadCurrentUser () {
    try {
        currentUser = JSON.parse(await getItem("currentUser"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Find the currentpage with Url and Names of Content
 *
 */
async function whichPageisCurrent() {
    let url = window.location.pathname;
    let currentUserName = currentUser["name"];
    for (let i = 0; i < nameOfPage.length; i++) {
        const element = nameOfPage[i];
        let smalLetter = element.toLowerCase();
        if (url.includes(smalLetter)) {
            if (smalLetter === "help") {
                partDisplayNone("helpImageDefault");
            }
            if (smalLetter === "privacy-policy" || smalLetter === "legal_notice") {
                if (currentUserName.toLowerCase() === "guest" || currentUser === "") {
                    partDisplayNone("sidebarMainButtons");
                } else {
                    markEffects(smalLetter);
                    partDisplayNone("headerButtons");
                }
            } else {
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
    document.getElementById(`${x}`).classList.remove(`${x}`);
    document.getElementById(`${x}`).classList.add("current-color-hover");
}
