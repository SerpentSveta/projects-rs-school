const pleerWrapper = document.querySelector('.pleer__wrapper')
const pleer = document.querySelector('.pleer');
const cover = document.querySelector('.cover');
const titleArtist = document.querySelector('.title__artist');
const titleSong = document.querySelector('.title__song');
const pleerAudio = document.querySelector('.pleer__audio');
const btnPrev = document.querySelector('.prev');
const btnPlay = document.querySelector('.play');
const btnNext = document.querySelector('.next');
const imgChanged = document.querySelector('.img__play');
const audioDuration = document.querySelector('.audio-duration');
const audioCurrentTime = document.querySelector('.audio-current-time');
const progressBar = document.querySelector('.progress-bar');

const allAudio = ['audio1', 'audio2', 'audio3', 'audio4'];
const allTitles = ['Wrecked', 'Dernière danse', 'Waste', 'So Handsome Hello'];
const allArtist = ['Imagine Dragons', 'Indila', 'Kxllswxtch', 'Woodkid'];

let isPlay = false;
let audioIndex = 0;

// Коневертация времени в формат мин:сек
function convertTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

//Загрузка аудио и получение времени
pleerAudio.onloadedmetadata = function () {
    audioDuration.innerHTML = convertTime(pleerAudio.duration);
    audioCurrentTime.innerHTML = convertTime(pleerAudio.currentTime);
}

// текущая песня
const currentAudio = () => {
    titleArtist.innerHTML = allArtist[audioIndex];
    titleSong.innerHTML = allTitles[audioIndex];
    pleerAudio.src = `assets/audio/${allAudio[audioIndex]}.mp3`;
    cover.src = `assets/img/cover${audioIndex + 1}.jpg`;

    // удаляю классы у враппера
    pleerWrapper.classList.remove(...pleerWrapper.classList);
    // добавляю классы у враппера в зависимости от песни
    pleerWrapper.classList.add('pleer__wrapper', `cover${audioIndex + 1}`);
}

currentAudio();

const playAudio = () => {
    pleerAudio.play();
}

const pauseAudio = () => {
    pleerAudio.pause();
}

btnPlay.addEventListener('click', function () {
    if (!isPlay) {
        playAudio();
        imgChanged.src = `assets/btn/pause.png`;
        isPlay = true;
    } else {
        pauseAudio();
        imgChanged.src = `assets/btn/play.png`;
        isPlay = false;
    }
})

const nextAudio = () => {
    audioIndex++;

    if (audioIndex >= allAudio.length) {
        audioIndex = 0;
    }

    currentAudio();
    playAudio();
    isPlay = true;
    imgChanged.src = `assets/btn/pause.png`;
}

const prevAudio = () => {
    audioIndex--;

    if (audioIndex < 0) {
        audioIndex = allAudio.length - 1;
    }

    currentAudio();
    playAudio();
    isPlay = true;
    imgChanged.src = `assets/btn/pause.png`;
}

btnNext.addEventListener('click', nextAudio);

btnPrev.addEventListener('click', prevAudio);

const changeProgress = () => {
    audioCurrentTime.innerHTML = convertTime(pleerAudio.currentTime);
    // вычисляю проигранное время
    const progressPercent = (pleerAudio.currentTime / pleerAudio.duration) * 100;
    progressBar.value = progressPercent;
}

pleerAudio.addEventListener('timeupdate', changeProgress);

// Перематывание аудио
const changeTime = (event) => {
    const mouseX = Math.floor(event.pageX - progressBar.offsetLeft);
    const progress = mouseX / (progressBar.offsetWidth / 100);
    pleerAudio.currentTime = pleerAudio.duration * (progress / 100);
    progressBar.value = progress;
}

progressBar.addEventListener('click', changeTime);

