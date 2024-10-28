import { Card } from "./Card.js"

const petsInfo = [
    {
        "id": 1,
        "name": "Jennifer",
        "img": "./assets/img-modal/jennifer.png",
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
        "img": "./assets/img-modal/sophia.png",
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
        "img": "./assets/img-modal/woody.png",
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
        "img": "./assets/img-modal/scarlett.png",
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
        "img": "./assets/img-modal/katrine.png",
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
        "img": "./assets/img-modal/timmy.png",
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
        "img": "./assets/img-modal/freddie.png",
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
        "img": "./assets/img-modal/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]

const sliderContent = document.querySelector('.slider__content');
const buttonLeft = document.querySelector('#button-left');
const buttonRight = document.querySelector('#button-right');
const cardsLeft = document.querySelector('#cards_left');
const cardsActive = document.querySelector('#cards_active');
const cardsRight = document.querySelector('#cards_right');


// Функция для перемешивания массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let leftClick = 0;
let rightClick = 0;

// Render Cards
const shuffledData = shuffle(petsInfo);
shuffledData.push(shuffledData[4]);

const generateCards = (data) => {
    const cards = [];
    data.forEach(card => {
        cards.push(new Card(card))
    });
    return cards;
}

let cardsVisible = 3;

const mql = window.matchMedia("(max-width: 1220px)");
const mqlSmall = window.matchMedia("(max-width: 767px)");

const clearCards = () => {
    cardsLeft.innerHTML = '';
    cardsActive.innerHTML = '';
    cardsRight.innerHTML = '';
}

const renderCards = () => {
    clearCards(); // без нее карточки перестраиваются только после обновления страницы
    generateCards(shuffledData).forEach((card, index) => {
        if (index < cardsVisible) {
            cardsLeft.append(card.generateCard());
        }

        if (index >= cardsVisible && index < (cardsVisible * 2)) {
            cardsActive.append(card.generateCard());
        }

        if (index >= (cardsVisible * 2) && index < (cardsVisible * 3)) {
            cardsRight.append(card.generateCard());
        }
    });
}

function screenChange() {
    if (mqlSmall.matches) {
        cardsVisible = 1;
    } else if (mql.matches) {
        cardsVisible = 2;
    }
    else {
        cardsVisible = 3;
    }

    renderCards();
}

mql.addEventListener("change", screenChange);
mqlSmall.addEventListener("change", screenChange);

screenChange();


buttonLeft.addEventListener('click', (event) => {

    if (mqlSmall.matches) {
        sliderContent.classList.add('transition-left-small');
    } else if (mql.matches) {
        sliderContent.classList.add('transition-left-medium');
    } else {
        sliderContent.classList.add('transition-left');
    }

})

buttonRight.addEventListener('click', (event) => {

    if (mqlSmall.matches) {
        sliderContent.classList.add('transition-right-small');
    } else if (mql.matches) {
        sliderContent.classList.add('transition-right-medium');
    } else {
        sliderContent.classList.add('transition-right');
    }

})

sliderContent.addEventListener('animationend', (event) => {
    event.preventDefault()

    let cardsHelp;

    if (event.animationName === "move-left" || event.animationName === "move-left-medium" || event.animationName === "move-left-small") {
        if (mqlSmall.matches) {
            sliderContent.classList.remove('transition-left-small');
        } else if (mql.matches) {
            sliderContent.classList.remove('transition-left-medium');
        } else {
            sliderContent.classList.remove('transition-left');
        }

        cardsHelp = cardsActive.innerHTML;
        cardsActive.innerHTML = cardsLeft.innerHTML;
        cardsLeft.innerHTML = cardsRight.innerHTML;
        cardsRight.innerHTML = cardsHelp;

    } else {
        if (mqlSmall.matches) {
            sliderContent.classList.remove('transition-right-small');
        } else if (mql.matches) {
            sliderContent.classList.remove('transition-right-medium');
        } else {
            sliderContent.classList.remove('transition-right');
        }

        cardsHelp = cardsActive.innerHTML;
        cardsActive.innerHTML = cardsRight.innerHTML;
        cardsRight.innerHTML = cardsLeft.innerHTML;
        cardsLeft.innerHTML = cardsHelp;
    }
});

