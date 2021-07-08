let menu = (function(options) {
    let buttonClick = document.querySelector(options.buttonClick);
    let menu = document.querySelector(options.menu);
    let body = document.querySelector('body');

    let _toggleMenu = function() {
        buttonClick.classList.toggle("is-active");
        menu.classList.toggle("is-active");
        body.classList.toggle('is-locked');
        
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

menu.open();


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
        let reqWidth = windowWidth - linksWidht * links.length;
        return reqWidth > 550 ? 550 :reqWidth;
    };

    let oTeamLink = document.querySelectorAll(".menu-acco__trigger");
    oTeamLink.forEach(function(personName) {
        personName.addEventListener("click", function(e) {
            e.preventDefault();
            let activePerson = document.querySelector(".menu-acco__item.active");
            let linkActive = e.target.closest('.menu-acco__trigger');
            if (activePerson) {
                let teamAccordionDetails = activePerson.querySelector(".menu-acco__content")

                teamAccordionDetails.style.width = "0px";
                activePerson.classList.remove("active");
            }
            
            if(!activePerson || activePerson.querySelector(".menu-acco__trigger") !== linkActive){
                let currentPerson = e.target.closest(".menu-acco__item");
                currentPerson.classList.add("active");
               
                let currentPersonInfo = currentPerson.querySelector(".menu-acco__content");
                currentPersonInfo.style.width = calculateWidth() + "px";
            }
        })
    })
};
verticalAcco();

const slide = (function () {
    const left = document.querySelector(".slider__btn_prev");
    const right = document.querySelector(".slider__btn_next");
    const slider = document.querySelector(".slider__list");
    const computed = getComputedStyle(slider);
    var sliderWidth = parseInt(computed.width);
    
    window.addEventListener("resize", function () {
        currentRight = 0;
        sliderWidth = parseInt(computed.width);
        slider.style.right = currentRight;
        
    }, true);

    var sliderItemsCounter = slider.children.length;
    
    let moveSlide = function (direction) {
        direction.addEventListener("click", function (e) {
            e.preventDefault();
            let currentRight = parseInt(computed.right);

            if (currentRight < (sliderItemsCounter-1) * sliderWidth && direction==right) {
                slider.style.right = currentRight + sliderWidth + "px";
            }

            if (currentRight > 0 && direction==left) {
                slider.style.right = currentRight - sliderWidth + "px";
            }
        });
    }

    let addListeners = function () {
        moveSlide(right);
        moveSlide(left);
    }
    return {init:addListeners}
})();

slide.init();


/*-------------------------------------------------------------------------*/
var overlay = (function(){

    /* Закрыть модальное окно */

    let closeOverlay = function(modalId, content){
        let overlay = document.querySelector(modalId);
        let innerOverlay = document.querySelector(`.${modalId.substr(1)}__inner`);
        let link = document.querySelector(`.${modalId.substr(1)}__close`);
        overlay.classList.remove('modal_active');
        document.body.classList.remove('is-locked');
        content.remove();
        link.remove();
        innerOverlay.remove();
    };


    let openOverlay = function(modalId, content){
        let overlay = document.querySelector(modalId);
        let innerOverlay = document.createElement('div');
        innerOverlay.classList.add(`${modalId.substr(1)}__inner`)
        overlay.appendChild(innerOverlay);
        innerOverlay.appendChild(content);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.classList.add(`${modalId.substr(1)}__close`);
        innerOverlay.appendChild(link);

        overlay.addEventListener('click', function(e){
        e.preventDefault();
        if ((e.target === e.currentTarget)||(e.target.className === link.className)){
            closeOverlay(modalId, content);
        }
        })

        overlay.classList.add('modal_active');
        document.body.classList.add('is-locked');
        };

    return {
        open: openOverlay,
        close: closeOverlay
    };
})();

var ajaxForm = function (form) {

    let formData = new FormData();
    formData.append("name", form.elements.name.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("comment", form.elements.comment.value);
    formData.append("to", "e.sheleshkov@gmail.com");
    
    let url = "https://webdev-api.loftschool.com/sendmail/";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.responseType = "json";
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);
    return xhr;    
}



var submitForm = function(e){
    e.preventDefault();
    var form = e.target;
    let request = ajaxForm(form);
    request.addEventListener('load', function(){
        let content = document.createElement('div');
        content.classList.add('modal-black');
        content.innerHTML = request.response.message;
        overlay.open('#modalForm', content);
        })
};


const form = document.querySelector('#main-form');
form.addEventListener('submit', submitForm);

let reviewOpen = function(){
    let button = document.querySelector('.review__btn');
    let container = document.querySelector('.reviews__list');
   
    container.addEventListener('click', function(e){
        e.preventDefault();
        let target = e.target;
        let btnWrap = target.closest('.review__btn')
        if(btnWrap.className === button.className){
            let desc = btnWrap.previousElementSibling;
            let titleHTML = desc.previousElementSibling.outerHTML;
            let descHTML = desc.outerHTML;
            let content = document.createElement('div');
            content.classList.add('modal-black');
            content.innerHTML = titleHTML + descHTML;
            let descIsActive = content.querySelector('.review__text');
            descIsActive.style.display = 'block';
            overlay.open('#modal', content);
        }
    })
};

reviewOpen();