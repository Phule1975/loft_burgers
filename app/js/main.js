let menu = (function(options) {
    let button = document.querySelector("#hamburger-menu-link");
    let menu = document.querySelector("#hamburger-menu");

    let _toggleMenu = function(e) {
        button.classList.toggle("is-activ");
        menu.classList.toggle("is-activ");
        console.log(button);
    }
    let addListeners= function () {
        button.addEventListener("click", _toggleMenu); 
    }

    return {openMenu: addListeners};
}) ({
    button: "#hamburger-menu-link",
    menu: "#hamburger-menu"
});
button = 1;
console.log(button);
console.log(menu);
