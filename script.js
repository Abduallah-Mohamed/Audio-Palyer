// Get DOM Elements
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressBarContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
let currentTimeEl = document.getElementById('current-time');
let durationEl = document.getElementById('duration');


const songs = [{
        name: 'jacinto-1',
        songDiscription: 'Hello from the dramz',
        artist: 'KIKA'
    },
    {
        name: 'jacinto-2',
        songDiscription: 'BoOom Is Here ... ',
        artist: 'LoOoL'
    },
    {
        name: 'jacinto-3',
        songDiscription: 'Ana 3naPpp',
        artist: 'Sayed'
    },
    {
        name: 'metric-1',
        songDiscription: 'Mango BoOom',
        artist: 'Omar'
    },
]

// for trigger if the song is playing or not
let isPlaying = false;

// Function that add the data in the array in our dom objects
function addTheDataIntoDomObjects(song) {
    title.textContent = song.songDiscription;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
}

addTheDataIntoDomObjects(songs[3]);

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// Pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// Previous Song
let songIndex = 0;

// Next Song Function
function nextSong() {
    songIndex++;
    if (songIndex > 3) {
        songIndex = 0;
    }
    addTheDataIntoDomObjects(songs[songIndex]);
    playSong();
}

// Previous song function
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    addTheDataIntoDomObjects(songs[songIndex]);
    playSong();
}

// Event Listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Update Progress Bar
function updateProgressBar(event) {
    if (isPlaying) {
        const {
            currentTime,
            duration
        } = event.srcElement;

        const durationPerMinutes = Math.floor(duration / 60);
        // let durationInSeconds = new Date(duration * 1000).toISOString().substr(11, 8);;
        let durationInSeconds = Math.floor(duration % 60);
        if (durationInSeconds < 10) {
            durationInSeconds = `0${durationInSeconds}`;
        }

        // Get the Percentage and update the width with
        const progressPercentage = (currentTime / duration) * 100;

        // set the width of the progress bar
        progress.style.width = `${progressPercentage}%`;

        // set the duration of the Song
        // delay the duration from switching to avoid NaN
        if (durationInSeconds) {
            durationEl.textContent = `${durationPerMinutes}:${durationInSeconds}`;
        }


        // Calculate the current time
        const curTimeInMins = Math.floor(currentTime / 60);
        let curTimeInSecs = Math.floor(currentTime % 60);
        if (curTimeInSecs < 10) {
            curTimeInSecs = `0${curTimeInSecs}`;
        }

        if (curTimeInSecs) {
            currentTimeEl.textContent = `${curTimeInMins}:${curTimeInSecs}`;
        }
    }
}

// Set the progressBar
function setProgressBar(event) {

    const width = this.clientWidth;
    const offsX = event.offsetX;
    const {
        duration
    } = music;
    const pre = (offsX / width) * duration;
    music.currentTime = pre;
}

// another event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressBarContainer.addEventListener('click', setProgressBar);