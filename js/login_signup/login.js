let registerUsers = [];
let registerUser = false;
let saveRememberMe = 'false';


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
        for (let user of registerUsers) {
            if (user.email === email && user.password === password) {
                registerUser = true;
                console.log(user); //TODO; User for summary
                if (saveRememberMe === 'true') {
                    RememberMeSaveToLocalStorage();
                } 
                emailAndPasswordIsValid();
            }
        }
        if (registerUser == false) {
            showTextFailLogin();
        }
        registerUser = false;
    }
}

function emailAndPasswordIsValid() {
    document.getElementById("loginEmail").value = "";
    document.getElementById(`loginPassword`).value = "";
    document.getElementById("rememberMeEmptyImageBox").src = "assets/img/Desktop/login_signup/checkbox/empty.svg";
    // window.location.href = "summary.html"; TODO; aktiv for submit
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
        saveRememberMe = 'true';
    } else {
        currentImagebox.src = emptyImagebox;
        saveRememberMe = 'false';
    }
}

/**
 * Remember me - save in LocalStorage for the next Login
 * 
 */
//TODO: Bugfixen!
let inputsArray = [];    
function RememberMeSaveToLocalStorage(){
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    console.log(email, password);

    inputsArray.push({
        email: email,
        password: password,
        // save: saveRememberMe,
    });

    console.log(inputs);

    let inputsAsText = JSON.stringify(inputsArray);
    localStorage.setItem("joinInputs", inputsAsText); 
}

function loadStorage() {
    try {
        let inputsAsText = localStorage.getItem("joinInputs");
        inputsArray = JSON.parse(inputsAsText); 
    } catch (error){
        console.log('kein Eintrag im LocalStorage');
    }
}
