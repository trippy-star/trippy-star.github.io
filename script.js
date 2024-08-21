const pausePlayButton = document.getElementById('pause-play-button');
const audioPlayer = document.getElementById('background-music');

let isPlaying = true;

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(error => console.log('Playback error:', error));
        pausePlayButton.textContent = '||'; // Change icon to pause
    } else {
        audioPlayer.pause();
        pausePlayButton.textContent = '►'; // Change icon to play
    }
}

// Add event listener to play/pause button
pausePlayButton.addEventListener('click', togglePlayPause);

// Start playback on window load
window.onload = () => {
    audioPlayer.play().catch(error => console.log('Playback error:', error));
};
