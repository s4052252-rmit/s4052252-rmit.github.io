// Typewriter animation for sonder definition
function typewriterEffect(element, text, speed = 50) {
  element.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      // Handle line breaks
      if (text.substring(index, index + 4) === "<br>") {
        element.innerHTML += "<br>";
        index += 4;
      } else {
        element.textContent += text[index];
        index++;
      }
      setTimeout(type, speed);
    } else {
      // Animation complete - remove cursor
      element.classList.add("typing-complete");
    }
  }

  type();
}

// Start typewriter animation when page loads
document.addEventListener("DOMContentLoaded", function () {
  const definitionElement = document.getElementById("sonder-definition");
  const originalText =
    "the strong feeling of realizing that every person you see has\ntheir own life story in which they are the most important person";

  // Use textContent to preserve line breaks
  typewriterEffect(definitionElement, originalText, 40);
});

// Preload images for smooth transition
const img1 = new Image();
const img2 = new Image();
img1.src = "p1.svg";
img2.src = "p1-hover.png";

// Prevent default drag behavior
const images = document.querySelectorAll(".silhouette-base, .silhouette-hover");
images.forEach((img) => {
  img.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });
});

// Add this to your existing script.js

document.addEventListener("DOMContentLoaded", function () {
  // Reveal box functionality
  const revealBoxes = document.querySelectorAll(".reveal-box");

  revealBoxes.forEach((box) => {
    box.addEventListener("click", function (e) {
      e.stopPropagation();

      // Remove glitch class if it exists
      this.classList.remove("glitch");

      // Trigger reflow to restart animation
      void this.offsetWidth;

      // Add glitch effect
      this.classList.add("glitch");

      // After glitch animation, reveal the text
      setTimeout(() => {
        this.classList.add("revealed");
      }, 300);

      // Optional: Hide again after delay
      setTimeout(() => {
        this.classList.remove("glitch");
      }, 600);
    });
  });

  // Close reveal when clicking elsewhere
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".reveal-box")) {
      revealBoxes.forEach((box) => {
        box.classList.remove("revealed", "glitch");
      });
    }
  });
});
