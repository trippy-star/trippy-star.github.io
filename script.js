const words = ["Dev", "YouTuber", "Hacker"];
let currentIndex = 0;
let currentChar = 0;
let isDeleting = false;

const descriptionElement = document.getElementById('description');
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('pause-play-button');
const progressBar = document.getElementById('progress');
const elapsedTimeElement = document.getElementById('elapsed-time');
const totalTimeElement = document.getElementById('total-time');
let isPlaying = true;

function type() {
    const currentWord = words[currentIndex];
    let displayText = currentWord.substring(0, currentChar);
    descriptionElement.textContent = displayText;

    if (isDeleting) {
        if (currentChar > 0) {
            currentChar--;
        } else {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % words.length;
        }
    } else {
        if (currentChar < currentWord.length) {
            currentChar++;
        } else {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }
    }

    setTimeout(type, isDeleting ? 100 : 200);
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = '▶';
    } else {
        audio.play();
        playPauseButton.textContent = '||';
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    elapsedTimeElement.textContent = formatTime(currentTime);
    totalTimeElement.textContent = `-${formatTime(duration - currentTime)}`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('timeupdate', updateProgress);
playPauseButton.addEventListener('click', togglePlayPause);
audio.addEventListener('loadedmetadata', () => {
    totalTimeElement.textContent = `-${formatTime(audio.duration)}`;
});

window.onload = () => {
    type();
    audio.play();  // Autoplay the audio on load
};
