import { Card } from "./Card.js"

const frontCovers = ['img/front-cover-1.jpg', 'img/front-cover-2.jpg', 'img/front-cover-3.jpg', 'img/front-cover-4.jpg', 'img/front-cover-5.jpg', 'img/front-cover-6.jpg', 'img/front-cover-7.jpg', 'img/front-cover-8.jpg'];
const game = document.querySelector('.game');

let cardsCount;
let arrayCovers = [];
const cardsArray = [];

// Определяю cardsCount
const level = document.getElementsByName('level');
let level_value;

const changeLevel = () => {
for (let i = 0; i < level.length; i++) {
    if (level[i].checked) {
        level_value = level[i].value;
        break;
    }
}
if (level_value === 'light') {
    cardsCount = 8;
} else if (level_value === 'medium') {
    cardsCount = 12;
} else {
    cardsCount = 16;
}
    resetBoard();
}

level.forEach(radio => radio.addEventListener('change', changeLevel));

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const createArrayCovers = () => {
    const selectedCovers = frontCovers.slice(0, cardsCount / 2);
    arrayCovers = [...selectedCovers, ...selectedCovers];
    shuffle(arrayCovers);
}
createArrayCovers(frontCovers, cardsCount);


const generateCards = () => {
    arrayCovers.forEach(cardImg => {
        const newCard = new Card({ img: cardImg });
        const cardElement = newCard.generateCard();
        cardElement.dataset.image = cardImg;
        game.appendChild(cardElement);
        cardsArray.push(cardElement);

        cardElement.addEventListener('click', flipCard);
    });
};

generateCards(arrayCovers);

const resetBoard = () => {
    game.innerHTML = '';
    cardsArray.length = 0;
    createArrayCovers();
    generateCards();
};

let openCard = false;
let firstCard;
let secondCard;
let lockCards;

const resetGame = () => {
    openCard = false;
    lockCards = false;
    firstCard = null;
    secondCard = null;
};

const audio = document.querySelector('.audio');

const playAudio = () => {
    audio.play();
}

const checkEndGame = () => {
    const matchedCards = cardsArray.filter(card => !card.classList.contains('flip'));
    if (matchedCards.length === 0) {
        playAudio();
        alert('Win!')
        setTimeout(() => {
            cardsArray.forEach(card => {
                card.classList.remove('flip');
                card.addEventListener('click', flipCard);
            });
            resetGame();
        }, 1500);
    }
};

function flipCard() {
    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!openCard) {
        openCard = true;
        firstCard = this;
    } else {
        openCard = false;
        secondCard = this;

        if (firstCard.dataset.image === secondCard.dataset.image) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetGame();
            checkEndGame();
        } else {
            lockCards = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetGame();
            }, 1000);
        }
    }
}

changeLevel();