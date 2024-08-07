document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('burger-btn').addEventListener('click', function() {
      document.querySelector('header').classList.toggle('open')
    })
})

// const navItems = document.querySelectorAll('.nav__item');

// for (let navItem in navItems) {
//     navItems.addEventListener('click', function() {
//         document.querySelector('header').classList.toggle('open')
//     })
// }

window.onload = function() {
addLinkMenuClickHandler();
}

const addLinkMenuClickHandler = () => {
    document.querySelector('.nav__list').addEventListener('click', (e) => {
    closeMobileMenu();
    })
}

const closeMobileMenu = () => {
    let navItem = document.querySelectorAll('.nav__item .link');
    navItem.forEach(link => {
    document.querySelector('header').classList.remove('open');
    })
}


