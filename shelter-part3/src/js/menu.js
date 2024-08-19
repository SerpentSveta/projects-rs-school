const header = document.querySelector('.header');
const bodyWrapper = document.querySelector('.body-wrapper');

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger-btn').addEventListener('click', function () {
        header.classList.toggle('open');

        if (header.classList.contains('open')) {
            bodyWrapper.classList.add('shading');
        } else {
            bodyWrapper.classList.remove('shading');
        }
    })
})


window.onload = function () {
    addLinkMenuClickHandler();
}

const addLinkMenuClickHandler = () => {
    document.querySelector('.nav__list').addEventListener('click', (e) => {
        closeMobileMenu();
        if (header.classList.contains('open')) {
            bodyWrapper.classList.add('shading');
        } else {
            bodyWrapper.classList.remove('shading');
        }
    })
}

const closeMobileMenu = () => {
    let navItem = document.querySelectorAll('.nav__item .link');
    navItem.forEach(link => {
        header.classList.remove('open');
    })
}

bodyWrapper.addEventListener('click', function () {
    header.classList.toggle('open');
    bodyWrapper.classList.remove('shading');
})

bodyWrapper.querySelector('header').addEventListener('click', function (e) {
    e.stopPropagation();
})