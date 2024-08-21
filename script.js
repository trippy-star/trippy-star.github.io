const pausePlayButton = document.getElementById('pause-play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeBarContainer = document.querySelector('.volume-bar-container');
const volumeBar = document.querySelector('.volume-bar');
const volumeFill = document.querySelector('.volume-fill');
const volumePercentage = document.querySelector('.volume-percentage');

const audioPlayer = document.getElementById('background-music');
let isFading = false;

function updateVolumeDisplay() {
    const volume = audioPlayer.volume * 100;
    volumeFill.style.height = `${volume}%`;
    volumePercentage.textContent = `${Math.round(volume)}%`;
}

volumeIcon.addEventListener('mouseover', () => {
    volumeBarContainer.style.display = 'flex';
});

volumeIcon.addEventListener('mouseout', () => {
    volumeBarContainer.style.display = 'none';
});

volumeBar.addEventListener('click', (event) => {
    const rect = volumeBar.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;
    const newVolume = 1 - (offsetY / volumeBar.clientHeight);
    audioPlayer.volume = Math.max(0, Math.min(newVolume, 1));
    updateVolumeDisplay();
});

pausePlayButton.addEventListener('click', () => {
    if (!isFading) {
        isFading = true;
        if (audioPlayer.paused) {
            audioPlayer.play();
            pausePlayButton.textContent = '||'; // Change icon to pause
        } else {
            audioPlayer.pause();
            pausePlayButton.textContent = '►'; // Change icon to play
        }
        isFading = false;
    }
});

// Update volume display on load
window.onload = () => {
    audioPlayer.volume = 1;
    updateVolumeDisplay();
    audioPlayer.play().catch(error => {
        console.log('Audio playback error:', error);
    });
};

// Update volume display on volume change
audioPlayer.addEventListener('volumechange', updateVolumeDisplay);
