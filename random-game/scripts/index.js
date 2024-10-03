import { Card } from "./Card.js"

const frontCovers = ['img/front-cover-1.jpg', 'img/front-cover-2.jpg', 'img/front-cover-3.jpg', 'img/front-cover-4.jpg', 'img/front-cover-5.jpg', 'img/front-cover-6.jpg'];
const doublefrontCovers = [...frontCovers, ...frontCovers];

const game = document.querySelector('.game');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledDoubleFrontCovers = shuffle(doublefrontCovers);

// Массив для хранения созданных карточек
const cardsArray = [];

const generateCards = (shuffledDoubleFrontCovers) => {
    shuffledDoubleFrontCovers.forEach(cardImg => {
        const newCard = new Card({ img: cardImg });
        const cardElement = newCard.generateCard();
        cardElement.dataset.image = cardImg;
        game.appendChild(cardElement);
        cardsArray.push(cardElement);
    });
};

generateCards(shuffledDoubleFrontCovers);

let openCard = false;
let firstCard;
let secondCard;
let lockCards;

function flipCard() {
    if (lockCards) {
        return;
    }

    this.classList.add('flip');
    if (!openCard) {
        // первый клик
        openCard = true;
        firstCard = this;
    } else {
        // второй клик
        openCard = false;
        secondCard = this;

        if (firstCard.dataset.image === secondCard.dataset.image) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            lockCards = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                lockCards = false;
            }, 1000);
        }
    }
}

cardsArray.forEach(card => card.addEventListener('click', flipCard));