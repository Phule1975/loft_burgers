let menu = (function(options) {
    let buttonClick = document.querySelector(options.buttonClick);
    let menu = document.querySelector(options.menu);

    let _toggleMenu = function(e) {
        buttonClick.classList.toggle("is-active");
        menu.classList.toggle("is-active");
        console.log(buttonClick);
        console.log(menu);
    }
    let addListeners= function () {
        buttonClick.addEventListener("click", _toggleMenu); 
    }

    return {open: addListeners};
}) ({
    buttonClick: "#hamburger-menu-link",
    menu: "#hamburger-menu"
});


menu.open();