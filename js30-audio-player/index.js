const pleerWrapper = document.querySelector('.pleer__wrapper')
const pleer = document.querySelector('.pleer');
const cover = document.querySelector('.cover');
const titleArtist = document.querySelector('.title__artist');
const titleSong = document.querySelector('.title__song');
const pleerAudio = document.querySelector('.pleer__audio');
const progressBar = document.querySelector('.progress-bar');
const btnPrev = document.querySelector('.prev');
const btnPlay = document.querySelector('.play');
const btnNext = document.querySelector('.next');
const imgChanged = document.querySelector('.img__play');

const allAudio = ['audio1', 'audio2', 'audio3', 'audio4'];
const allTitles = ['Wrecked', 'Dernière danse', 'Waste', 'So Handsome Hello'];
const allArtist = ['Imagine Dragons', 'Indila', 'Kxllswxtch', 'Woodkid'];

let audioIndex = 0;

// текущая песня
const currentAudio = () => {
    titleArtist.innerHTML = allArtist[audioIndex];
    titleSong.innerHTML = allTitles[audioIndex];
    pleerAudio.src = `assets/audio/${allAudio[audioIndex]}.mp3`;
    cover.src = `assets/img/cover${audioIndex + 1}.jpg`;
}

currentAudio(allAudio[audioIndex]);

const playAudio = () => {
    pleerAudio.play();
}