const buttonLeft = document.querySelector('#button-left');
const buttonRight = document.querySelector('#button-right');
const sliderContent = document.querySelector('.slider__content');
const cardsLeft = document.querySelector("#cards_left");
const cardsActive = document.querySelector("#cards_active");
const cardsRight = document.querySelector("#cards_right");

buttonLeft.addEventListener('click', () => {
    sliderContent.classList.add('transition-left');
})

buttonRight.addEventListener('click', () => {
    sliderContent.classList.add('transition-right');
})

sliderContent.addEventListener('animationend', (event) => {
    let cardsHelp;
    if (event.animationName === "move-left") {
        sliderContent.classList.remove('transition-left');
        cardsHelp = cardsActive.innerHTML;
        cardsActive.innerHTML = cardsLeft.innerHTML;
        cardsLeft.innerHTML = cardsRight.innerHTML;
        cardsRight.innerHTML = cardsHelp;
    } else {
        sliderContent.classList.remove('transition-right');
        cardsHelp = cardsActive.innerHTML;
        cardsActive.innerHTML = cardsRight.innerHTML;
        cardsRight.innerHTML = cardsLeft.innerHTML;
        cardsLeft.innerHTML = cardsHelp;
    }
})

