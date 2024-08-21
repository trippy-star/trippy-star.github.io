const words = ["Dev", "YouTuber", "Hacker"];
let currentIndex = 0;
let currentChar = 0;
let isDeleting = false;

const descriptionElement = document.getElementById('description');

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

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.width = '10px';
    trail.style.height = '10px';
    document.body.appendChild(trail);
    setTimeout(() => {
        document.body.removeChild(trail);
    }, 500);
});

window.onload = type;

const audioPlayer = document.getElementById('audio-player');
const pausePlayButton = document.getElementById('pause-play-button');
let isFading = false;

function fadeAudio(volume, duration, callback) {
    let startVolume = audioPlayer.volume;
    let step = (volume - startVolume) / (duration / 10);

    function fade() {
        startVolume += step;
        if ((step > 0 && startVolume >= volume) || (step < 0 && startVolume <= volume)) {
            audioPlayer.volume = volume;
            if (callback) callback();
        } else {
            audioPlayer.volume = startVolume;
            setTimeout(fade, 10);
        }
    }

    fade();
}

pausePlayButton.addEventListener('click', () => {
    if (!isFading) {
        isFading = true;
        if (audioPlayer.paused) {
            fadeAudio(1, 1000, () => {
                audioPlayer.play();
                pausePlayButton.textContent = '||';
                isFading = false;
            });
        } else {
            fadeAudio(0, 1000, () => {
                audioPlayer.pause();
                pausePlayButton.textContent = '►';
                audioPlayer.volume = 1; // Reset volume for next play
                isFading = false;
            });
        }
    }
});
