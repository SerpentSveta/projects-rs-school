export class Card {
    constructor({ id, img, name }) {
        this.id = id;
        this.img = img;
        this.name = name;
    }

    // Cards generator
    generateCard() {
        const card = document.createElement('div');
        card.className = 'card our-friends__card';
        card.setAttribute('data-modal-card', `pop-up-${this.id}`);

        if (this.img) {
            const img = document.createElement('img');
            img.className = 'card__img';
            img.src = this.img;
            img.alt = `Pet ${this.name}`;
            card.append(img);
        }

        if (this.name) {
            const title = document.createElement('h4');
            title.className = 'card__title';
            title.textContent = this.name;
            card.append(title);
        }

        const cardButton = document.createElement('div');
        cardButton.className = 'card__button';

        const button = document.createElement('button');
        button.className = 'button';
        button.type = 'button';
        button.textContent = 'Learn more';

        cardButton.append(button);
        card.append(cardButton);
        return card;
    }
}