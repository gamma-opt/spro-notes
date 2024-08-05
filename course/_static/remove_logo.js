function removeLogo() {
    const logo = document.getElementsByClassName("btn__qelogo")[0];
    logo.parentNode.removeChild(logo);
}

document.addEventListener('DOMContentLoaded', removeLogo, false);