// Preload images for smooth transition
const img1 = new Image();
const img2 = new Image();
img1.src = "p1.svg";
img2.src = "p1-hover.svg";

// Optional: Toggle for mobile devices
const container = document.querySelector(".silhouette-container");
let isToggled = false;

container.addEventListener("click", function () {
  if (window.innerWidth <= 768) {
    const hoverImg = document.querySelector(".silhouette-hover");
    isToggled = !isToggled;
    hoverImg.style.opacity = isToggled ? "1" : "0";
  }
});
