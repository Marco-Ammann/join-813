let nameOfPage = [
    "Summary",
    "Add_task",
    "Board",
    "Contacts",
    "help",
    "privacy-policy",
    "legal_notice",
];

async function init() {
    await includeHTML();
    await whichPageisCurrent();
}

// Template
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
 * Find the currentpage with Url and Names of Content
 *
 */
async function whichPageisCurrent() {
    let url = window.location.pathname;
    for (let i = 0; i < nameOfPage.length; i++) {
        const element = nameOfPage[i];
        let smalLetter = element.toLowerCase();
        if (url.includes(smalLetter)) {
            if (smalLetter === "help") {
                partDisplayNone();
            }
            if (smalLetter === "privacy-policy" || smalLetter === "legal_notice") {
                markEffects(smalLetter);
                headerBtnNone();
            } else {
                currentLinkUsed(element);
            }
        }
    }
}

/**
 * Add and Remove Attributes
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

function partDisplayNone() {
    document.getElementById("helpImageDefault").style = "display: none";
}

function headerBtnNone() {
    document.getElementById("headerButtons").style = "display:none";
}

function markEffects(x){
    document.getElementById(`${x}`).classList.remove(`${x}`);
    document.getElementById(`${x}`).classList.add("current-color-hover");
}
