// Video player functionality
const video = document.getElementById("custom-video-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = document.getElementById("play-pause-icon");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");
const volumeBtn = document.getElementById("volume-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const mediaPlayer = document.getElementById("mediaPlayer");

// Play/Pause functionality
function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseIcon.textContent = "⏸";
  } else {
    video.pause();
    playPauseIcon.textContent = "▶";
  }
}

playPauseBtn.addEventListener("click", togglePlayPause);

// Progress bar functionality
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("loadedmetadata", updateTimeDisplay);
progressContainer.addEventListener("click", setProgress);

function updateProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const current = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  timeDisplay.textContent = `${current} / ${duration}`;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function setProgress(e) {
  const clickX = e.offsetX;
  const width = progressContainer.offsetWidth;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}

// Volume control
volumeSlider.addEventListener("input", setVolume);
volumeBtn.addEventListener("click", toggleMute);

function setVolume() {
  const volume = volumeSlider.value / 100;
  video.volume = volume;
  updateVolumeIcon(volume);
}

function toggleMute() {
  if (video.muted) {
    video.muted = false;
    volumeSlider.value = video.volume * 100;
    updateVolumeIcon(video.volume);
  } else {
    video.muted = true;
    updateVolumeIcon(0);
  }
}

function updateVolumeIcon(volume) {
  if (volume === 0 || video.muted) {
    volumeIcon.textContent = "🔇";
  } else if (volume < 0.5) {
    volumeIcon.textContent = "🔉";
  } else {
    volumeIcon.textContent = "🔊";
  }
}

// Fullscreen functionality
fullscreenBtn.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    mediaPlayer.requestFullscreen().then(() => {
      mediaPlayer.classList.add("fullscreen");
    });
  } else {
    document.exitFullscreen().then(() => {
      mediaPlayer.classList.remove("fullscreen");
    });
  }
}

// Gallery functionality
function loadVideo(src) {
  video.src = src;
  video.load();
  // Scroll to video player
  document
    .querySelector(".video-section")
    .scrollIntoView({ behavior: "smooth" });
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlayPause();
      break;
    case "ArrowLeft":
      video.currentTime -= 10;
      break;
    case "ArrowRight":
      video.currentTime += 10;
      break;
    case "ArrowUp":
      e.preventDefault();
      video.volume = Math.min(1, video.volume + 0.1);
      volumeSlider.value = video.volume * 100;
      updateVolumeIcon(video.volume);
      break;
    case "ArrowDown":
      e.preventDefault();
      video.volume = Math.max(0, video.volume - 0.1);
      volumeSlider.value = video.volume * 100;
      updateVolumeIcon(video.volume);
      break;
    case "KeyF":
      toggleFullscreen();
      break;
  }
});

// Auto-hide controls
let controlsTimeout;
mediaPlayer.addEventListener("mousemove", () => {
  document.getElementById("customControls").style.opacity = "1";
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    if (!video.paused) {
      document.getElementById("customControls").style.opacity = "0";
    }
  }, 3000);
});

function loadVideo(src, title) {
  const video = document.getElementById("custom-video-player");
  const videoTitle = document.getElementById("videoTitle");

  // Update video source and title
  video.src = src;
  video.load();
  video.play();
  videoTitle.textContent = title;

  // Update play/pause button icon
  document.getElementById("play-pause-icon").textContent = "⏸";

  // Scroll to video player
  document
    .querySelector(".video-section")
    .scrollIntoView({ behavior: "smooth" });
}
// Initialize
video.volume = 1;
updateVolumeIcon(1);
