let menu = (function(options) {
    let buttonClick = document.querySelector(options.buttonClick);
    let menu = document.querySelector(options.menu);
    let body = document.querySelector('body');

    let _toggleMenu = function() {
        buttonClick.classList.toggle("is-active");
        menu.classList.toggle("is-active");
        body.classList.toggle('is-locked');
        console.log(buttonClick);
        console.log(menu);
    }
    let addListeners= function () {
        buttonClick.addEventListener("click", _toggleMenu); 
    }

    return {
            open: addListeners
            };
}) ({
    buttonClick: "#hamburger-menu-link",
    menu: "#hamburger-menu"
});


//menu.open();
menu.open();

slider = (function(){   

    let moveslider = function(){

    }

    let addListeners= function () {
        moveslider();
    }

    return {
        init:addListeners
    }
})();

slider.init();