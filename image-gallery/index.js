const search = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');
const errors = document.querySelector('.errors');
const columns = document.querySelectorAll('.col-md-4');


const url = "https://api.unsplash.com/photos/?client_id=CVaahuYwRuXc5bwgyNnK6d5bRpvBjn-IH51-sSIGaqs&orientation=portrait";
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

    createImg();
}

const createImg = () => {
    imagesURL.forEach((url, index) => {

        if (index < columns.length) {
            const img = document.createElement("img");
            img.classList.add("w-100", "shadow-1-strong", "rounded", "mb-4");
            img.src = url;
            img.alt = `image`;

            columns[index].append(img);

        }
    })
}
