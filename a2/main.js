// script.js

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("mainVideo");
  const playBtn = document.querySelector(".play-btn");
  const progressBar = document.querySelector(".progress-bar");
  const progressFill = document.querySelector(".progress-fill");
  const volumeBtn = document.querySelector(".volume-btn");
  const volumeSlider = document.querySelector(".volume-slider");
  const volumeFill = document.querySelector(".volume-fill");
  const timeDisplay = document.querySelector(".time-display");
  const fullscreenBtn = document.querySelector(".fullscreen-btn");
  const spinner = document.querySelector(".loading-spinner");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const videoTitle = document.querySelector(".video-title");

  // Dummy video list (replace with real sources if available)
  const videoSources = [
    {
      title: "MIAC Digital Art",
      src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
    },
    {
      title: "DigitalVideo art 02",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: "DigitalVideo art 03",
      src: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      title: "DigitalVideo art 04",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: "DigitalVideo art 05",
      src: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      title: "DigitalVideo art 06",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  // Play/Pause
  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playBtn.textContent = "⏸";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  });

  // Update progress
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFill.style.width = `${percent}%`;
    updateTimeDisplay();
  });

  // Seek on progress click
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / progressBar.offsetWidth;
    video.currentTime = percent * video.duration;
  });

  // Volume control
  volumeSlider.addEventListener("click", (e) => {
    const rect = volumeSlider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / volumeSlider.offsetWidth;
    video.volume = percent;
    volumeFill.style.width = `${percent * 100}%`;
  });

  // Mute toggle
  volumeBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    volumeBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  // Fullscreen toggle
  fullscreenBtn.addEventListener("click", () => {
    const container = video.closest(".video-container");
    if (!document.fullscreenElement) {
      container.requestFullscreen?.() ||
        container.webkitRequestFullscreen?.() ||
        container.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  });

  // Update time
  function updateTimeDisplay() {
    const formatTime = (time) => {
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${mins}:${secs}`;
    };

    const current = formatTime(video.currentTime);
    const total = formatTime(video.duration || 0);
    timeDisplay.textContent = `${current} / ${total}`;
  }

  // Spinner for loading
  video.addEventListener("waiting", () => (spinner.style.display = "block"));
  video.addEventListener("canplay", () => (spinner.style.display = "none"));

  // Error handling
  video.addEventListener("error", () => {
    const errorBox = document.createElement("div");
    errorBox.className = "video-error";
    errorBox.textContent = "Failed to load video. Please try again later.";
    document.body.appendChild(errorBox);
  });

  // Gallery click to switch video
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (videoSources[index]) {
        // Set active class
        galleryItems.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        // Update video
        video.pause();
        video.src = videoSources[index].src;
        video.load();
        video.play().catch(() => {
          playBtn.textContent = "▶";
        });

        // Update title
        videoTitle.textContent = `Title: ${videoSources[index].title}`;
      }
    });
  });

  // Initialize volume fill
  volumeFill.style.width = `${video.volume * 100}%`;
});
