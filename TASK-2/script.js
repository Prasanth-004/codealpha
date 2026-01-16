const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');
const playlistList = document.getElementById('playlist-list');

// Sample playlist - replace with actual audio files
const playlist = [
    { title: 'Song 1', artist: 'Artist 1', src: 'piano-studyingreadingfocusriverbird-chipping-203328.mp3' },
    { title: 'Song 2', artist: 'Artist 2', src: 'reading-soft-piano-221781.mp3' },
    { title: 'Song 3', artist: 'Artist 3', src: 'song3.mp3' }
];

let currentSongIndex = 0;

// Load song
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    updatePlaylistUI();
}

// Update playlist UI
function updatePlaylistUI() {
    playlistList.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        if (index === currentSongIndex) {
            li.classList.add('active');
        }
        playlistList.appendChild(li);
    });
}

// Play song
function playSong() {
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Pause song
function pauseSong() {
    audio.pause();
    playPauseBtn.textContent = 'Play';
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration: audioDuration } = audio;
    const progressPercent = (currentTime / audioDuration) * 100;
    progressBar.value = progressPercent;
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(audioDuration / 60);
    const durationSeconds = Math.floor(audioDuration % 60);
    duration.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

// Seek
function setProgress() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Set volume
function setVolume() {
    audio.volume = volumeControl.value;
}

// Event listeners
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeControl.addEventListener('input', setVolume); 

// Autoplay next song when current ends
audio.addEventListener('ended', nextSong);

// Load initial song
loadSong(currentSongIndex);