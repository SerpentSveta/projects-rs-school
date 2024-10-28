import { Card } from "./Card.js";

const frontCovers = [
    'img/front-cover-1.jpg',
    'img/front-cover-2.jpg',
    'img/front-cover-3.jpg',
    'img/front-cover-4.jpg',
    'img/front-cover-5.jpg',
    'img/front-cover-6.jpg',
    'img/front-cover-7.jpg',
    'img/front-cover-8.jpg'
];
const game = document.querySelector('.game');

let cardsCount;
let arrayCovers = [];
const cardsArray = [];
let clickCount = 0;

let countScore = document.querySelector('.count__score');
countScore.innerHTML = 0;

// Определяю cardsCount
const level = document.getElementsByName('level');
let level_value;

const updateTotalScore = () => {
    const totalResults = document.querySelector('.total__results');
    totalResults.innerHTML = '';

    scores.forEach((score, index) => {
        const totalScore = document.createElement('div');
        totalScore.className = 'total__score';
        totalResults.append(totalScore);

        const playCount = document.createElement('div');
        playCount.className = 'play__count';
        playCount.innerHTML = `Game ${index + 1}`;
        totalScore.append(playCount);

        const playScore = document.createElement('div');
        playScore.className = 'play__score';
        playScore.innerHTML = score;
        totalScore.append(playScore);
    });
}

// Считываю предыдущие результаты в локалсторадж
const scores = JSON.parse(localStorage.getItem('gameScores')) || [];


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

// Сброс игрового поля
const resetBoard = () => {
    game.innerHTML = '';
    cardsArray.length = 0;
    createArrayCovers();
    shuffle(arrayCovers);
    generateCards();
};

createArrayCovers();
generateCards();

let openCard = false;
let firstCard;
let secondCard;
let lockCards;

// Сбрасываю состояние игры
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

// Проверяю конец игры
const checkEndGame = () => {
    const matchedCards = cardsArray.filter(card => !card.classList.contains('flip'));
    if (matchedCards.length === 0) {
        playAudio();

        scores.push(clickCount);
        localStorage.setItem('gameScores', JSON.stringify(scores));

        alert(`Win! Your score ${clickCount};`)

        clickCount = 0;
        countScore.innerHTML = clickCount;

        updateTotalScore();

        if (scores.length >= 10) {
            scores.length = 0;
            localStorage.removeItem('gameScores');
        }

        setTimeout(() => {
            cardsArray.forEach(card => {
                card.classList.remove('flip');
                card.addEventListener('click', flipCard);
            });
            resetGame();
            resetBoard();
        }, 1500);
    }
};

// Переворот карточек
function flipCard() {
    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    clickCount++;
    countScore.innerHTML = clickCount;

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
updateTotalScore(); 
