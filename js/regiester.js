let users = [];

async function registerInit() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function register() {
    let firstPassword = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (firstPassword === confirmPassword) {
        registerBtn.disabled = true;
        users.push({
            name: userName.value,
            email: email.value,
            password: firstPassword,
        });

        await setItem("users", JSON.stringify(users));
        resetForm();
    } else {
        console.log("Passwort confirm ist falsch!");
    }
}

function resetForm() {
    userName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    registerBtn.disabled = false;
}

function checkConfirmPassword() {
    let password = document.getElementById(`password`).value.trim();
    let passwordConfirm = document.getElementById(`confirmPassword`).value.trim();

    if (!password.includes(passwordConfirm)) {
        document.getElementById("fail-confirm-password").style.color = "#FF8190";
    } else{
        document.getElementById("fail-confirm-password").style.color = "transparent";
    }; 
}
