const search = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');
const errors = document.querySelector('.errors');
const galleryContainer = document.querySelector('.gallery__container');
const modalBody = document.querySelector('.modal-body');



const url = "https://api.unsplash.com/photos/?client_id=CVaahuYwRuXc5bwgyNnK6d5bRpvBjn-IH51-sSIGaqs&per_page=15";
const imagesURL = [];


async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    const imageArray = data;

    console.log(data);

    imageArray.forEach(element => {
        imagesURL.push(element.urls.regular);
        width: element.width;
        height: element.height;
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
        const img = document.createElement("img");
        img.classList.add("gallery__img");
        img.src = url;
        img.alt = `image`;
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#exampleModal");

        if (img.width > img.height) {
            img.classList.add("horizontal");
        } else {
            img.classList.add("vertical");
        }
        img.addEventListener('click', () => {
            modalBody.innerHTML = '';

            const imgBig = document.createElement("img");
            imgBig.classList.add("img-fluid");
            imgBig.src = url;
            imgBig.alt = `image ${index + 1}`;
            modalBody.appendChild(imgBig);
        })
        galleryContainer.appendChild(img);
    })
}