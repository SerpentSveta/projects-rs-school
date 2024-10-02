export class Card {
    constructor({ img }) {
        this.img = img;
    }

    // Cards generator
    generateCard() {
        const card = document.createElement('div');
        card.className = 'card';

        const frontImage = document.createElement('img');
        frontImage.className = 'card__img front-cover';
        frontImage.src = this.img;
        frontImage.alt = `Halloween`;
        card.append(frontImage);

        const backImage = document.createElement('img');
        backImage.className = 'card__img back-cover';
        backImage.src = `img/back-cover.jpg`;
        frontImage.alt = `Scary Halloween`;
        card.append(backImage);

        return card;
    }
}