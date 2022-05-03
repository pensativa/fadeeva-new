const pageSlider = new Swiper(".swiper-container", {
    direction: "vertical",
    speed: 1000,
    parallax: true,
    autoplay: false,
    effect: "fade",
    mousewheel: true,
    keyboard: {
        enabled: true,
    },
    simulateTouch: false,
    init: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        init: function () {
            menuSlider();
            headerButtonMove();
            showFullFooter();
        },
        slideChange: function () {
            menuSlider();
            headerButtonMove();
            showFullFooter();
        },
    },
});

//Удаление активыных стилей для ссылок
let menuLinks = document.querySelectorAll('.main-nav__link');
function menuSliderRemove() {
    let menuLinkActive = document.querySelectorAll('.main-nav__link.active');
    if (menuLinkActive) {
        menuLinkActive.forEach(element => {
          element.classList.remove('active');
        });
    }
}

//Активные стили для ссылок
function menuSlider() {
    menuSliderRemove();
    menuLinks[pageSlider.realIndex].classList.add('active');   
}
  
//Стили по клику
for (let i = 0; i < menuLinks.length; i+=1) {
    menuLinks[i].onclick = function(e) {
        e.preventDefault();
        menuSliderRemove();
        menuLinks[i].classList.add('active');
        pageSlider.slideTo(i, 1000);
  }
}

//Кнопка на первом слайде
function headerButtonMove() {
    const headerButton = document.querySelector('.header__button');
    const fragment = document.createDocumentFragment();
	fragment.appendChild(headerButton);
    if (pageSlider.realIndex === 0) {
        document.querySelector('.first-screen__wrapper').appendChild(fragment);
    } else {
        document.querySelector('.main-nav').appendChild(fragment);
    }
}

//Footer

function showFullFooter() {
    const footer = document.querySelector('.footer')
    if (pageSlider.realIndex === 5) {
        footer.classList.remove('footer--slider');
    } else {
        footer.classList.add('footer--slider');
    }
}

pageSlider.init();

//Prices

(function() {
    const pricesOpenButtons = document.querySelectorAll('.forth-screen__header');
    const pricesCloseButtons = document.querySelectorAll('.forth-screen__body-close');
    const pricesOderButtons = document.querySelectorAll('.forth-screen__body-footer .button');

    pricesOpenButtons.forEach(element => {
        element.onclick = function() {
            element.nextElementSibling.classList.add('show');
        }
    });

    pricesCloseButtons.forEach(element => {
        element.onclick = function() {
            element.closest('.forth-screen__body').classList.remove('show');
        }
    });

    pricesOderButtons.forEach(element => {
        element.onclick = function() {
            element.closest('.forth-screen__body').classList.remove('show');
            pageSlider.slideTo(5, 1000);
        }
    });
})();

//Reviews 

var swiper2 = new Swiper(".review", {
    effect: "cards",
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
});

document.querySelector('.review').addEventListener('wheel', e => {
      e.preventDefault()  
});

(function(){
    const showFormButton = document.querySelector('.header__button');
    showFormButton.onclick = function(e) {
        e.preventDefault();
        pageSlider.slideTo(5, 1000);
    };
})();

(function(){
    const callbackInputs = document.querySelectorAll('.six-screen__form-input');
    callbackInputs.forEach(element => { 
        element.oninput = function() {
            if (element.value !== '') {
                element.nextElementSibling.classList.add('not-empty');
            } else {
                element.nextElementSibling.classList.remove('not-empty');
            }
        };
    });
})();
