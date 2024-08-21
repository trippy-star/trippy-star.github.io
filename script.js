const pausePlayButton = document.getElementById('pause-play-button');
const audioPlayer = document.getElementById('background-music');
const visualizerContainer = document.querySelector('.visualizer');

let isFading = false;

// Create Audio Context and Analyzer
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Set up visualizer bars
const numBars = 60; // Number of bars
const barWidth = 100 / numBars; // Percentage width
for (let i = 0; i < numBars; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    visualizerContainer.appendChild(bar);
}

const bars = document.querySelectorAll('.bar');

// Function to update visualizer
function updateVisualizer() {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    
    frequencyData.forEach((value, index) => {
        const bar = bars[index % bars.length];
        bar.style.transform = `scaleY(${value / 256})`;
    });
    
    requestAnimationFrame(updateVisualizer);
}

function togglePlayPause() {
    if (!isFading) {
        isFading = true;
        if (audioPlayer.paused) {
            audioPlayer.play();
            pausePlayButton.textContent = '||'; // Change icon to pause
            // Start audio context if it's not already running
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        } else {
            audioPlayer.pause();
            pausePlayButton.textContent = '►'; // Change icon to play
        }
        isFading = false;
    }
}

// Add event listener to play/pause button
pausePlayButton.addEventListener('click', togglePlayPause);

// Start visualizer on window load
window.onload = () => {
    audioPlayer.volume = 1;
    audioPlayer.play().catch(error => {
        console.log('Audio playback error:', error);
    });
    updateVisualizer();
};
