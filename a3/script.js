// Preload images for smooth transition
const img1 = new Image();
const img2 = new Image();
img1.src = "p1.svg";
img2.src = "p1-hover.svg";

// Prevent default drag behavior
const images = document.querySelectorAll(".silhouette-base, .silhouette-hover");
images.forEach((img) => {
  img.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });
});
