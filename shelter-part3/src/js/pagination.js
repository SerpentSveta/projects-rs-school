import { Card } from "./Card.js"

const petsInfo = [
    {
        "id": 1,
        "name": "Jennifer",
        "img": "../assets/img-modal/jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": 2,
        "name": "Sophia",
        "img": "../assets/img-modal/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": 3,
        "name": "Woody",
        "img": "../assets/img-modal/woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "id": 4,
        "name": "Scarlett",
        "img": "../assets/img-modal/scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": 5,
        "name": "Katrine",
        "img": "../assets/img-modal/katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": 6,
        "name": "Timmy",
        "img": "../assets/img-modal/timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "id": 7,
        "name": "Freddie",
        "img": "../assets/img-modal/freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "id": 8,
        "name": "Charly",
        "img": "../assets/img-modal/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]

const pageCardsLayout = {};

const slider = document.querySelector('.slider');
const navigation = document.querySelector('.navigation');
const arrowWrapper = document.querySelectorAll('.arrow-wrapper');

const buttonLeftAll = arrowWrapper[0];
const buttonRightAll = arrowWrapper[4];
const buttonLeft = arrowWrapper[1];
const buttonRight = arrowWrapper[3];

const numberPage = document.querySelector('.page');


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const bigPetsInfo = []

const generateBigPetsInfo = (petsInfo) => {
    for (let i = 0; i < 6; i++) {
        petsInfo.forEach(card => {
            bigPetsInfo.push(new Card(card))
        })
    }
    return bigPetsInfo;
}


generateBigPetsInfo(petsInfo);

// const shuffledBigPetsInfo = shuffle(bigPetsInfo);


let currentPage = 0;
let cardsOnPage = 8;

// Функция для изменения количества карточек на странице в зависимости от ширины окна
function handleResize() {
    const width = window.innerWidth;

    if (width <= 639) {
        cardsOnPage = 3;
    } else if (width <= 929) {
        cardsOnPage = 6;
    } else {
        cardsOnPage = 8;
    }

    currentPage = 0;
    numberPage.innerHTML = 1;

    updateNavigationButtons();

    showCards();
}

function updateNavigationButtons() {
    if (currentPage === 0) {
        buttonLeft.lastChild.classList.add('navigation_inactive');
        buttonLeftAll.lastChild.classList.add('navigation_inactive');
    } else {
        buttonLeft.lastChild.classList.remove('navigation_inactive');
        buttonLeftAll.lastChild.classList.remove('navigation_inactive');
    }

    if ((currentPage + 1) * cardsOnPage >= bigPetsInfo.length) {
        buttonRight.lastChild.classList.add('navigation_inactive');
        buttonRightAll.lastChild.classList.add('navigation_inactive');
    } else {
        buttonRight.lastChild.classList.remove('navigation_inactive');
        buttonRightAll.lastChild.classList.remove('navigation_inactive');
    }
}

handleResize();
window.addEventListener('resize', handleResize);

// const mql = window.matchMedia("(max-width: 929px)");
// const mqlSmall = window.matchMedia("(max-width: 639px)");

// function screenChange() {
//     if (mqlSmall.matches) {
//         cardsOnPage = 3;
//     } else if (mql.matches) {
//         cardsOnPage = 6;
//     } else {
//         cardsOnPage = 8;
//     }
// }

// mql.addEventListener("change", screenChange);
// mqlSmall.addEventListener("change", screenChange);

// screenChange();



// Функция для отображения карточек
function showCards() {
    slider.innerHTML = '';

    const start = currentPage * cardsOnPage;
    const end = start + cardsOnPage;

    // Проверяем, есть ли уже сохраненные карточки для текущей страницы
    if (!pageCardsLayout[currentPage]) {
        const sliceArrayPets = bigPetsInfo.slice(start, end);
        const shuffledSliceArrayPets = shuffle(sliceArrayPets);

        // Сохраняем перемешанные карточки в объект
        pageCardsLayout[currentPage] = shuffledSliceArrayPets;
    }

    pageCardsLayout[currentPage].forEach((card) => {
        slider.append(card.generateCard());
    });
};

showCards();

buttonRight.addEventListener('click', function () {
    // Проверяем, не достигли ли мы последней страницы
    if ((currentPage + 1) * cardsOnPage < bigPetsInfo.length) {
        currentPage++;

        numberPage.innerHTML = +(currentPage + 1);

        showCards();

        if (currentPage > 0) {
            buttonLeft.lastChild.classList.remove('navigation_inactive');
            buttonLeftAll.lastChild.classList.remove('navigation_inactive');
        }

        if ((currentPage + 1) * cardsOnPage >= bigPetsInfo.length) {
            buttonRight.lastChild.classList.add('navigation_inactive');
            buttonRightAll.lastChild.classList.add('navigation_inactive');
        }
    }
});

buttonLeft.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;

        numberPage.innerHTML = +(currentPage + 1);

        showCards();

        buttonRight.lastChild.classList.remove('navigation_inactive');
        buttonRightAll.lastChild.classList.remove('navigation_inactive');
    }

    if (currentPage == 0) {
        buttonLeft.lastChild.classList.add('navigation_inactive');
        buttonLeftAll.lastChild.classList.add('navigation_inactive');
    }
})

buttonRightAll.addEventListener('click', function () {
    if ((currentPage + 1) * cardsOnPage < bigPetsInfo.length) {
        currentPage = (bigPetsInfo.length / cardsOnPage) - 1;

        numberPage.innerHTML = '';
        numberPage.innerHTML = +(currentPage + 1);

        buttonRight.lastChild.classList.add('navigation_inactive');
        buttonRightAll.lastChild.classList.add('navigation_inactive');

        buttonLeft.lastChild.classList.remove('navigation_inactive');
        buttonLeftAll.lastChild.classList.remove('navigation_inactive');

        showCards();
    }
})

buttonLeftAll.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage = 1;
        currentPage--;

        numberPage.innerHTML = '';
        numberPage.innerHTML = +(currentPage + 1);

        buttonLeft.lastChild.classList.add('navigation_inactive');
        buttonLeftAll.lastChild.classList.add('navigation_inactive');
        buttonRight.lastChild.classList.remove('navigation_inactive');
        buttonRightAll.lastChild.classList.remove('navigation_inactive');

        showCards();
    }
})
