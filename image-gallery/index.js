const search = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');
const errors = document.querySelector('.errors');


const url = "https://api.unsplash.com/photos/?client_id=CVaahuYwRuXc5bwgyNnK6d5bRpvBjn-IH51-sSIGaqs&per_page=30";
const imagesURL = [];


async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    const imageArray = data;

    imageArray.forEach(element => {
        imagesURL.push(element.urls.regular);
    });

    showData();
}

window.onload = (event) => {
    getData();
}

const showData = () => {
    if (imagesURL == 0) {
        errors.innerHTML = `Try to come back later`;
    }
}