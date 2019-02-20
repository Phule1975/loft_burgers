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


/*let sendForm = () => {
    let myForm = document.querySelector("#main-form");
    let button1= document.querySelector("#sendButton");
    button1.addEventListener("click", function(e) {
        e.preventDefault();
        let name1 = myForm.elements.name.value;
        let phone1 = myForm.elements.phone.value;
        let comment1 = myForm.elements.comment.value;
        console.log(name1);
        console.log(phone1);
        console.log(comment1);
        let formData = new FormData();
        formData.append("name", myForm.elements.name.value);
        formData.append("phone", myForm.elements.phone.value);
        formData.append("comment", myForm.elements.comment.value);
        formData.append("to", "e.sheleshkov@gmail.com");
        console.dir(formData);
    })
    
    
}
sendForm();*/


/*let sendForm = () => {
    let myForm = document.querySelector("main-form");
    let sendButton = document.querySelector("#sendButton");
    console.log(myForm);

    sendButton.addEventListener("click", function (e) {
        e.preventDefault();
          })
};
*/


var ajaxForm = function (form) {

    let formData = new FormData();
    formData.append("name", form.elements.name.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("comment", form.elements.comment.value);
    formData.append("to", "e.sheleshkov@gmail.com");

    let url = "https://webdev-api.loftschool.com/sendmail/";

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);

    return xhr;    
}



const overlay = (function () {
    let body = document.querySelector("body");
    let link = document.querySelector("a");

    link.classList.add("modal-review__close");
    link.setAttribute("href", "#");

    let openOverlay = function (modalId, content) {
        let overlay = document.querySelector(modalId);
        let innerOverlay = overlay.querySelector(".modal-review__inner");

        link.addEventListener("click", (e) => {
            e.preventDefault();
            closeOverlay(modalId);
        })

        overlay.addEventListener("click", (e) => {
            e.preventDefault();
            if(e.target === overlay){
                closeOverlay(modalId);
            }
        })

        document.addEventListener("keydown", function (e) {
            if(e.keyCode == 27) closeOverlay(modalId);
        });

        if(content){
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);
        }

        overlay.classList.add("is-active");
        body.classList.add("locked");
    }

    closeOverlay = function (modalID) {
        let overlay = document.querySelector(modalID);

        overlay.classList.remove("is-active");
        body.classList.remove("locked");
    }

    let setContent = function (modalId, content) {
        let overlay =document.querySelector(modalId);
        let innerOverlay = overlay.querySelector(".modal-review__inner");

        if(content){
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);
        } 
        
    }

    return {
        open: openOverlay,
        close: closeOverlay,
        setContent: setContent
    }
})();

var submitForm = function (e) {
    e.preventDefault();
    var form = e.target;
    let = request = ajaxForm(form);

    request.addEventListener("load", () => {
        if (request.status >= 400){
            let content = "Ошибка соединения";
            
            overlay.open("#modal-review", content)
            console.log(content);
        } else if (request.response.status){
            let content = request.response.message;
            overlay.open("modal-review", content)
        }
    });
    
};

overlay.open("#modal-review", "khjhjhjjh");