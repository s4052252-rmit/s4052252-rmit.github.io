// ===== Scroll notificatiom =====
function initScrollNotification() {
  const notification = document.querySelector(".scroll-notification");
  const silhouetteSection = document.querySelector(".silhouette-section");

  function handleScroll() {
    if (!silhouetteSection) return;

    const silhouetteRect = silhouetteSection.getBoundingClientRect();
    const silhouetteTop = silhouetteRect.top;

    // Hide notification when next section appears
    if (silhouetteTop < window.innerHeight) {
      notification.classList.add("hidden");
    } else {
      notification.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
}

// ===== Typing animation =====
function typewriterEffect(element, text, speed = 50) {
  element.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      if (text.substring(index, index + 4) === "<br>") {
        element.innerHTML += "<br>";
        index += 4;
      } else {
        element.textContent += text[index];
        index++;
      }
      setTimeout(type, speed);
    } else {
      element.classList.add("typing-complete");
    }
  }

  type();
}

function drawThread() {
  const svg = document.getElementById("threadSvg");
  const path = document.getElementById("threadPath");

  if (!svg || !path) return;

  const images = document.querySelectorAll(
    ".photo, .p4-base, .p5-base, .p6-base, .p7-base, .p8-base, .p9-base, " +
      ".p10-base, .p11-base, .p12-base, .p10-small-base, .p13-base, .p15-base, " +
      ".silhouette-base:not(.p4-base):not(.p5-base):not(.p6-base):not(.p7-base):not(.p8-base):not(.p9-base):not(.p10-base):not(.p11-base):not(.p12-base):not(.p10-small-base):not(.p13-base):not(.p15-base), " +
      ".chesstable, .pbackground-image"
  );

  const points = [];

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2 + window.scrollY;
    points.push({ x, y });
  });

  if (points.length < 2) return;

  let pathData = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const current = points[i];
    const previous = points[i - 1];

    const mx = (previous.x + current.x) / 2;
    const my = (previous.y + current.y) / 2;

    pathData += ` Q ${previous.x} ${previous.y} ${mx} ${my}`;
  }

  const lastPoint = points[points.length - 1];
  pathData += ` T ${lastPoint.x} ${lastPoint.y}`;

  path.setAttribute("d", pathData);
}

// ===== Scroll reveal =====
function initScrollReveal() {
  const textLines = document.querySelectorAll(".text-line");
  const textLayoutSection = document.querySelector(".text-layout-section");

  if (!textLayoutSection) return;

  let sectionTriggered = false;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === textLayoutSection) {
        if (entry.isIntersecting && !sectionTriggered) {
          sectionTriggered = true;
          textLines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add("text-revealed");
            }, index * 400);
          });
        } else if (!entry.isIntersecting) {
          sectionTriggered = false;
          textLines.forEach((line) => {
            line.classList.remove("text-revealed");
          });
        }
      }
    });
  }, observerOptions);

  observer.observe(textLayoutSection);
}

// ===== Scroll reveal P13-P14-P15 section =====
function initSectionTitleReveal() {
  const sectionTitles = document.querySelectorAll(".section-title");
  const p13Section = document.querySelector(".p13-p14-p15-section");

  if (!p13Section) return;

  let sectionTriggered = false;

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === p13Section) {
        if (entry.isIntersecting && !sectionTriggered) {
          sectionTriggered = true;
          sectionTitles.forEach((title, index) => {
            setTimeout(() => {
              title.classList.add("title-revealed");
            }, index * 400);
          });
        } else if (!entry.isIntersecting) {
          sectionTriggered = false;
          sectionTitles.forEach((title) => {
            title.classList.remove("title-revealed");
          });
        }
      }
    });
  }, observerOptions);

  observer.observe(p13Section);
}

// ===== Animation P13 and P15 =====
function initP13P15ScrollAnimation() {
  const p13Section = document.querySelector(".p13-p14-p15-section");
  const topTitle = document.querySelector(".top-title");
  const p13Base = document.querySelector(".p13-base");
  const p15Base = document.querySelector(".p15-base");
  const p13Container = document.querySelector(".p13-container");
  const p15Container = document.querySelector(".p15-container");

  if (!p13Section || !p13Base || !p15Base) return;

  function handleP13P15Scroll() {
    const sectionRect = p13Section.getBoundingClientRect();
    const titleRect = topTitle.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const p13ContainerRect = p13Container.getBoundingClientRect();
    const p15ContainerRect = p15Container.getBoundingClientRect();

    const sectionStartScroll = sectionRect.top + window.scrollY;
    const titleEndScroll = titleRect.top + window.scrollY;
    const currentScroll = window.scrollY;

    let progress =
      (currentScroll - sectionStartScroll) /
      (titleEndScroll - sectionStartScroll);
    progress = Math.max(0, Math.min(1, progress));

    // P13
    const p13TranslateX =
      -1.5 * window.innerWidth + progress * 1.5 * window.innerWidth;
    p13Base.style.transform = `translateX(${p13TranslateX}px)`;

    // P15
    const p15TranslateX =
      1.5 * window.innerWidth - progress * 1.5 * window.innerWidth;
    p15Base.style.transform = `translateX(${p15TranslateX}px)`;
  }

  window.addEventListener("scroll", handleP13P15Scroll, { passive: true });
  handleP13P15Scroll(); // Initial call
}

// ===== Load event =====
document.addEventListener("DOMContentLoaded", function () {
  // 1. Typewriter animation
  const definitionElement = document.getElementById("sonder-definition");
  const originalText =
    "the strong feeling of realizing that every person you see has\ntheir own life story in which they are the most important person";
  typewriterEffect(definitionElement, originalText, 40);

  // 2. Scroll reveal for text lines
  initScrollReveal();

  // 3. Scroll Reveal for section titles
  initSectionTitleReveal();

  // 4. P13 and P15 scroll animation
  initP13P15ScrollAnimation();

  // 5. Scroll notification
  initScrollNotification();

  // 6. Preload images
  const img1 = new Image();
  const img2 = new Image();
  img1.src = "p1.svg";
  img2.src = "p1-hover.png";

  // 7. Prevent drag behavior, i don't know why there is a bug that I can grab the image so I just put it here
  const images = document.querySelectorAll(
    ".silhouette-base, .silhouette-hover"
  );
  images.forEach((img) => {
    img.addEventListener("dragstart", (e) => {
      e.preventDefault();
      return false;
    });
  });

  // 8. Reveal box functionality
  const revealBoxes = document.querySelectorAll(".reveal-box");
  revealBoxes.forEach((box) => {
    box.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.remove("glitch");
      void this.offsetWidth;
      this.classList.add("glitch");

      setTimeout(() => {
        this.classList.add("revealed");
      }, 300);

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

  // 9. Animation for main photo
  const heroSection = document.querySelector(".hero-section");
  const photos = document.querySelectorAll(".photo-animate");

  if (heroSection && photos.length > 0) {
    photos.forEach((photo) => {
      photo.classList.remove("photo-animate");
      photo.style.opacity = "1";
    });

    function handleScroll() {
      const heroRect = heroSection.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroHeight = heroRect.height;
      const windowHeight = window.innerHeight;

      let progress = 1 - heroTop / (windowHeight + heroHeight);
      progress = Math.max(0, Math.min(1, progress));

      photos.forEach((photo) => {
        let translateX = 0;
        let translateY = 0;

        if (
          photo.classList.contains("photo-1") ||
          photo.classList.contains("photo-2") ||
          photo.classList.contains("photo-3")
        ) {
          translateY = (1 - progress) * -150;
        } else if (photo.classList.contains("photo-8")) {
          translateX = (1 - progress) * -200;
        } else if (
          photo.classList.contains("photo-4") ||
          photo.classList.contains("photo-5")
        ) {
          translateX = (1 - progress) * 200;
        } else if (
          photo.classList.contains("photo-6") ||
          photo.classList.contains("photo-7")
        ) {
          translateY = (1 - progress) * 150;
        }

        photo.style.transform = `translate(${translateX}px, ${translateY}px)`;
        photo.style.opacity = "1";
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }
});
