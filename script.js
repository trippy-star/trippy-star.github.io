const audioPlayer = document.getElementById('audio-player');
const pausePlayButton = document.getElementById('pause-play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeFill = document.getElementById('volume-fill');
const volumePercentage = document.getElementById('volume-percentage');
let isFading = false;

function updateVolumeDisplay() {
    const volume = audioPlayer.volume * 100;
    volumeFill.style.height = `${volume}%`;
    volumePercentage.textContent = `${Math.round(volume)}%`;
}

volumeIcon.addEventListener('click', () => {
    audioPlayer.volume = audioPlayer.volume === 0 ? 1 : 0;
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
