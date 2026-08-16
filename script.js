
const track = document.getElementById("featuredTrack");
const prev = document.getElementById("prevFeatured");
const next = document.getElementById("nextFeatured");

let isAnimating = false;
const gap = 18;

function cardStep() {
  const firstCard = track.querySelector(".carousel-card");
  if (!firstCard) return 0;
  return firstCard.getBoundingClientRect().width + gap;
}

function moveNext() {
  if (isAnimating) return;
  isAnimating = true;

  const step = cardStep();
  track.style.transition = "transform .45s cubic-bezier(.2,.8,.2,1)";
  track.style.transform = `translateX(-${step}px)`;

  const onEnd = () => {
    track.removeEventListener("transitionend", onEnd);
    const firstCard = track.querySelector(".carousel-card");
    track.appendChild(firstCard);
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.offsetHeight;
    isAnimating = false;
  };

  track.addEventListener("transitionend", onEnd);
}

function movePrev() {
  if (isAnimating) return;
  isAnimating = true;

  const step = cardStep();
  const lastCard = track.querySelector(".carousel-card:last-child");
  track.insertBefore(lastCard, track.firstChild);

  track.style.transition = "none";
  track.style.transform = `translateX(-${step}px)`;
  track.offsetHeight;

  track.style.transition = "transform .45s cubic-bezier(.2,.8,.2,1)";
  track.style.transform = "translateX(0)";

  const onEnd = () => {
    track.removeEventListener("transitionend", onEnd);
    isAnimating = false;
  };

  track.addEventListener("transitionend", onEnd);
}

next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);

window.addEventListener("resize", () => {
  track.style.transition = "none";
  track.style.transform = "translateX(0)";
});

document.querySelectorAll(".accordion-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.classList.contains("open");

    document.querySelectorAll(".accordion-panel").forEach(p => p.classList.remove("open"));
    document.querySelectorAll(".accordion-trigger").forEach(b => b.setAttribute("aria-expanded", "false"));

    if (!isOpen) {
      panel.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

// All Articles: always show the first 5, then expand/collapse the rest.
const showAllButton = document.getElementById("showAllArticles");
const articleRows = [...document.querySelectorAll(".article-list .article-row")];
let articlesExpanded = false;

function renderArticles() {
  articleRows.forEach((row, index) => {
    row.style.display = (articlesExpanded || index < 5) ? "grid" : "none";
  });
  showAllButton.textContent = articlesExpanded ? "Show fewer" : "Show all";
  showAllButton.setAttribute("aria-expanded", String(articlesExpanded));
}

showAllButton.addEventListener("click", () => {
  articlesExpanded = !articlesExpanded;
  renderArticles();
});

renderArticles();


// Global Expand All control.
const expandAllTop = document.getElementById("expandAllTop");
let everythingExpanded = false;

function setEverythingExpanded(expanded) {
  everythingExpanded = expanded;

  // Articles
  articlesExpanded = expanded;
  renderArticles();

  // Other Work accordion sections
  document.querySelectorAll(".accordion-panel").forEach(panel => {
    panel.classList.toggle("open", expanded);
  });
  document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.setAttribute("aria-expanded", String(expanded));
  });

  expandAllTop.textContent = expanded ? "Collapse all" : "Expand all";
  expandAllTop.setAttribute("aria-expanded", String(expanded));
}

expandAllTop.addEventListener("click", () => {
  setEverythingExpanded(!everythingExpanded);
});

// Embedded Pitch-Off deck.
const pitchSlide = document.getElementById("pitchSlide");
const pitchPrev = document.getElementById("pitchPrev");
const pitchNext = document.getElementById("pitchNext");
const pitchCounter = document.getElementById("pitchCounter");
const pitchViewer = document.querySelector(".pitch-viewer");
const pitchTotal = 14;
let pitchIndex = 1;

function renderPitchSlide() {
  const n = String(pitchIndex).padStart(2, "0");
  pitchSlide.src = `files/pitch-off-slides/slide-${n}.jpg`;
  pitchSlide.alt = `Booth & The Great Idiot Conspiracy pitch deck, slide ${pitchIndex}`;
  pitchCounter.textContent = `${pitchIndex} / ${pitchTotal}`;
}
function changePitchSlide(delta) {
  pitchIndex = ((pitchIndex - 1 + delta + pitchTotal) % pitchTotal) + 1;
  renderPitchSlide();
}
pitchPrev.addEventListener("click", () => changePitchSlide(-1));
pitchNext.addEventListener("click", () => changePitchSlide(1));
pitchViewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") { event.preventDefault(); changePitchSlide(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); changePitchSlide(1); }
});
