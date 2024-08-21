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

pausePlayButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            pausePlayButton.textContent = '||'; // Change icon to pause
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    } else {
        audioPlayer.pause();
        pausePlayButton.textContent = '►'; // Change icon to play
    }
});

// Start audio automatically with a slight delay for browser compatibility
window.addEventListener('load', () => {
    setTimeout(() => {
        audioPlayer.volume = 1;
        audioPlayer.play().then(() => {
            pausePlayButton.textContent = '||'; // Set the button to "pause" if playing on load
        }).catch(error => {
            console.log('Audio playback error:', error);
        });
    }, 100); // Short delay to handle initial page load
});
