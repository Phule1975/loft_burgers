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

let teamAccoJS = () => {
    let oTeamLink = document.querySelectorAll(".team-accordion__link");
    oTeamLink.forEach(function(personName) {
        personName.addEventListener("click", function(e) {
            e.preventDefault();
            let activePerson = document.querySelector(".team-accordion__item.is-active");

            if (activePerson) {
                let teamAccordionDetails = activePerson.querySelector(".team-accordion__details")

                teamAccordionDetails.style.height = "0px";
                activePerson.classList.remove("is-active");
            }
            
            if(!activePerson || activePerson.querySelector(".team-accordion__link") !== e.target){
                let currentPerson = e.target.closest(".team-accordion__item");
                currentPerson.classList.add("is-active");

                let currentPersonInfo = currentPerson.querySelector(".team-accordion__details");
                currentPersonInfo.style.height = currentPersonInfo.scrollHeight + "px";
            }
        })
    })
};
teamAccoJS();


let verticalAcco = () => {

    let calculateWidth = () => {
        let windowWidth = window.innerWidth;
        
        let links = document.querySelectorAll(".menu-acco__trigger");
        let linksWidht = parseFloat(getComputedStyle(links[0]).width);
        let reqWidth = windowWidth - linksWidht * links.clientHeight;
        return reqWidth > 550 ? 550 :reqWidth;
    };

    let oTeamLink = document.querySelectorAll(".menu-acco__trigger");
    oTeamLink.forEach(function(personName) {
        personName.addEventListener("click", function(e) {
            e.preventDefault();
            let activePerson = document.querySelector(".menu-acco__item.active");

            if (activePerson) {
                let teamAccordionDetails = activePerson.querySelector(".menu-acco__content")

                teamAccordionDetails.style.width = "0px";
                activePerson.classList.remove("active");
            }
            
            if(!activePerson || activePerson.querySelector(".menu-acco__trigger") !== e.target){
                let currentPerson = e.target.closest(".menu-acco__item");
                currentPerson.classList.add("active");

                let currentPersonInfo = currentPerson.querySelector(".menu-acco__content");
                currentPersonInfo.style.width = calculateWidth() + "px";
            }
        })
    })
};
verticalAcco();