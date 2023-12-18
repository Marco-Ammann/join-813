function loginInit() {
    checkAndPlayAnimation();
}

/**
 * Join Animation
 * 
 */
function checkAndPlayAnimation() {
    let animationPlayed = sessionStorage.getItem("animationPlayed");
    let animationContainer = document.getElementById("animationContainer");
    if (!animationPlayed) {
        sessionStorage.setItem("animationPlayed", "true");
        generateAnimationContainer(animationContainer);

        let logoContainer = document.getElementById("logoContainer");
        let joinLogo = document.getElementById("joinLogo");
        styleAnimation(animationContainer, logoContainer, joinLogo);
    } else {
        animationContainer.classList.add("d-none");
        document.getElementById("join-logo-static").style.display = "block";
    }
}

/**
 * Animation - Container
 * 
 * @param {ID} animationContainer - create Container for/with JoinLogo
 */
function generateAnimationContainer(animationContainer) {
    animationContainer.innerHTML = "";
    animationContainer.innerHTML = `
        <div class="logo-container" id="logoContainer">
            <img class="join-logo" id="joinLogo" src="./assets/img/Desktop/login_signup/Capa_1.svg" alt="Join Logo">
        </div>`;
}

/**
 * Style Animation
 * 
 * @param {ID} animationContainer - Dialogfenster
 * @param {ID} logoContainer - Container for JoinLogo
 * @param {ID} joinLogo - JoinLogo
 */
function styleAnimation(animationContainer, logoContainer, joinLogo) {
    animationContainer.style.animation = "fadeOutBackground 1s forwards";
    logoContainer.style.animation = "moveLogo 1s forwards";
    joinLogo.style.animation = "moveLogo 1s forwards";
    setTimeout(function() {
        animationContainer.classList.add("d-none");
        document.getElementById("join-logo-static").style.display = "block";
    }, 1000);
}