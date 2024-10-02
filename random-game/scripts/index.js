import { Card } from "./Card.js"

const frontCovers = ['img/front-cover-1.jpg', 'img/front-cover-2.jpg', 'img/front-cover-3.jpg', 'img/front-cover-4.jpg', 'img/front-cover-5.jpg', 'img/front-cover-6.jpg', 'img/front-cover-7.jpg', 'img/front-cover-8.jpg', 'img/front-cover-9.jpg', 'img/front-cover-10.jpg', 'img/front-cover-11.jpg', 'img/front-cover-12.jpg'];

const game = document.querySelector('.game');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledFrontCovers = shuffle(frontCovers);

const generateCards = (shuffledFrontCovers) => {
    shuffledFrontCovers.forEach(card => {
        const newCard = new Card({ img: card });
        game.appendChild(newCard.generateCard());
    });
};

generateCards(shuffledFrontCovers);