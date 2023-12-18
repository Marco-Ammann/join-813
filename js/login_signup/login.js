let ArrayToSave = [];
let registerUsers = [];
let currentUser =[];
let registerUser = false;
let saveRememberMe = "false";
let guest = {
    name: 'Sofia Müller',
    email: 'sofiam@gmail.com',
    password: 'mypassword123',
};

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
 * Checked Password and Useremail
 *
 */
function loginCheckEmailAndPassword() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById(`loginPassword`).value.trim();
    if (email === "" || password === "") {
        showTextFailLogin();
    } else {
        isUserOfRegisertUser (email, password);
        if (registerUser == false) {
            showTextFailLogin();
        }
        registerUser = false;
    }
}

/**
 * is the User in the Array of RegisterUser; save currentUser in Backend
 * 
 * @param {string} email - string from the inputfield email
 * @param {string} password - sting from the inputfield password
 */
async function isUserOfRegisertUser (email, password){
    for (let user of registerUsers) {
        if (user.email === email && user.password === password) {

            registerUser = true;
            currentUser = user;
            await setItem("currentUser", JSON.stringify(currentUser));

            if (saveRememberMe === "true") {
                RememberMeSaveToLocalStorage();
            }
            emailAndPasswordIsValid();
        }
    }
}

/**
 * Forward to the next Page, if the email and password are valid
 * 
 */
function emailAndPasswordIsValid() {
    document.getElementById("loginEmail").value = "";
    document.getElementById(`loginPassword`).value = "";
    document.getElementById("rememberMeEmptyImageBox").src =
        "assets/img/Desktop/login_signup/checkbox/empty.svg";
    console.log(currentUser);
    window.location.href = "summary.html"; 
}

function showTextFailLogin() {
    document.getElementById("fail-login").style.color = "#FF8190";
}

function changeShowTextFailLogin() {
    document.getElementById("fail-login").style.color = "transparent";
}

/**
 * Imagebox Remember me
 *
 */
function addRememberMe() {
    let emptyImagebox = "assets/img/Desktop/login_signup/checkbox/empty.svg";
    let currentImagebox = document.getElementById("rememberMeEmptyImageBox");
    if (currentImagebox.src.endsWith(emptyImagebox)) {
        currentImagebox.src = "assets/img/Desktop/login_signup/checkbox/hover_checked.svg";
        saveRememberMe = "true";
    } else {
        currentImagebox.src = emptyImagebox;
        saveRememberMe = "false";
        deleteJoinInputs();
    }
}

/**
 * Remember me - save in LocalStorage for the next Login
 *
 */
function RememberMeSaveToLocalStorage() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    ArrayToSave = {
        email: email,
        password: password,
        save: saveRememberMe,
    };

    let ArrayAsText = JSON.stringify(ArrayToSave);
    localStorage.setItem("joinInputs", ArrayAsText);
}

/**
 * Load from LocalStorage
 * 
 */
function loadStorage() {
    let ArrayAsText = localStorage.getItem("joinInputs");
    if (ArrayAsText === null) {
        loadUsers();
    } else {
        ArrayToSave = JSON.parse(ArrayAsText);
        loadUsers();
        loadFillInput();
    }
}

/**
 * Delete from LocalStorage
 * 
 */
function deleteJoinInputs() {
    localStorage.removeItem("joinInputs");
}

/**
 * Automaic fillout from LocalStorage
 * 
 */
function loadFillInput() {
    document.getElementById("loginEmail").value = ArrayToSave["email"];
    document.getElementById("loginPassword").value = ArrayToSave["password"];
    document.getElementById("rememberMeEmptyImageBox").src =
        "assets/img/Desktop/login_signup/checkbox/hover_checked.svg";
}


function guestAccount(){
    document.getElementById("loginEmail").value = guest["email"];
    document.getElementById("loginPassword").value = guest["password"];
    setTimeout(function() {
        window.location.href = "summary.html";
    }, 500);
    
}