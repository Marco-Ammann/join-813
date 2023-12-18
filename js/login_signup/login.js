let registerUsers = [];

/**
 * Imagebox Remember me
 *
 */
function addRememberMe() {
    let emptyImagebox = "assets/img/Desktop/login_signup/checkbox/empty.svg";
    let currentImagebox = document.getElementById("rememberMeEmptyImageBox");
    if (currentImagebox.src.endsWith(emptyImagebox)) {
        currentImagebox.src = "assets/img/Desktop/login_signup/checkbox/hover_checked.svg";
    } else {
        currentImagebox.src = emptyImagebox;
    }
}

/**
 * add Fokus/ blur Fokus - Passwordfield change Image
 *
 */
function handleImageFocus() {
    let passwordImage = document.getElementById("passwordImage");
    let passwordField = document.getElementById("loginPassword");

    passwordField.addEventListener("click", function () {
        if (passwordField.value === "") {
            passwordImage.src = "./assets/img/Desktop/login_signup/visibility_off.svg";
        }
    });

    passwordField.addEventListener("blur", function () {
        if (passwordField.value === "") {
            passwordImage.src = "./assets/img/Desktop/login_signup/lock.svg";
        }
    });
}
handleImageFocus();

/**
 * Images of visibility and password as text
 *
 */
function visibilityOnOffImage() {
    let passwordImage = document.getElementById(`passwordImage`);
    let password = document.getElementById(`loginPassword`);

    if (password.type === "password") {
        passwordImage.src = "./assets/img/Desktop/login_signup/visibility_on.svg";
        password.type = "text";
    } else {
        password.type = "password";
        passwordImage.src = "./assets/img/Desktop/login_signup/visibility_off.svg";
    }
}

/**
 * Load Users from Backend
 *
 */
async function loadUsers() {
    try {
        registerUsers = JSON.parse(await getItem("users"));
        console.log(registerUsers);
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Checked the Passwords
 *
 */
function loginCheckEmailAndPassword() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById(`loginPassword`).value.trim();

    for (let user of registerUsers) {
        if (user.email === email && user.password === password) {
            console.log("ok");
            window.location.href = "summary.html";
        } else {
            showTextFailLogin();
        }
    }
}

function showTextFailLogin(){
    let failLogin = document.getElementById('fail-login');
    failLogin.style.color = "#FF8190";

}
