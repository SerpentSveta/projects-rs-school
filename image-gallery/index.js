const search = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');
const errors = document.querySelector('.errors');
const galleryContainer = document.querySelector('.gallery__container');
const modalBody = document.querySelector('.modal-body');
const form = document.querySelector('.form-inline');

const apiUrl = "https://api.unsplash.com/photos/?client_id=CVaahuYwRuXc5bwgyNnK6d5bRpvBjn-IH51-sSIGaqs&per_page=15";
const searchUrl = "https://api.unsplash.com/search/photos/?client_id=CVaahuYwRuXc5bwgyNnK6d5bRpvBjn-IH51-sSIGaqs&per_page=15&query=";

let imagesURL = [];

// Получение данных с API
async function getData(apiUrl) {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        imagesURL = [];

        const imageArray = data.results ? data.results : data;

        imageArray.forEach(element => {
            imagesURL.push({
                url: element.urls.regular,
                width: element.width,
                height: element.height
            });
        });

        showData();
    } catch (error) {
        errors.innerHTML = `Error loading data. Try again later`;
        console.error(error);
    }
}

window.onload = () => {
    getData(apiUrl);
    search.focus();
}

// Показ изображений
const showData = () => {
    galleryContainer.innerHTML = '';

    if (imagesURL.length === 0) {
        errors.innerHTML = `Try again later`;
        return;
    }

    createImg();
}

// Создание изображений
const createImg = () => {
    imagesURL.forEach((imageData, index) => {
        const img = document.createElement("img");
        img.classList.add("gallery__img");
        img.src = imageData.url;
        img.alt = `image ${index + 1}`;
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#exampleModal");

        // Модальное окно
        img.addEventListener('click', () => {
            modalBody.innerHTML = '';

            const imgBig = document.createElement("img");
            imgBig.classList.add("img-fluid");
            imgBig.src = imageData.url;
            imgBig.alt = `image ${index + 1}`;
            modalBody.appendChild(imgBig);
        });

        galleryContainer.appendChild(img);
    });
}

// Отправка формы поиска
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Убираем перезагрузку страницы по умолчанию

    if (search.value.trim()) {
        const searchUrlSent = `${searchUrl}${search.value.trim()}`;
        getData(searchUrlSent); 

        search.value = '';
    }
});

