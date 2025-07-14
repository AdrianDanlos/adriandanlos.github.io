// Configuration
const TARGET_DATE = new Date("March 16, 2026 00:00:00").getTime();
const CARD_IDS = ["adrian", "asier", "hodei", "joel"];
const MOTIVATIONAL_MESSAGES = [
  "You've got this! 🚀",
  "Stay strong! 💪",
  "Keep pushing! 🔥",
  "You're unstoppable! ⚡",
  "Dream big! 🏆",
  "You're a champion! 🏃‍♂️",
];

// DOM elements
const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

// Countdown functionality
function updateCountdown() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    Object.values(countdownElements).forEach((el) => (el.textContent = "00"));
    updateMarathonDayContent();
    return;
  }

  const timeUnits = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };

  Object.entries(countdownElements).forEach(([unit, element]) => {
    element.textContent = timeUnits[unit].toString().padStart(2, "0");
  });
}

function updateMarathonDayContent() {
  const elements = {
    ".title": "IT'S MARATHON DAY! 🏃‍♂️",
    ".subtitle": "Go crush it! You've got this! 💪",
    ".motivation-text": "Let's do this! 🚀",
    ".friends-mention": "Time to show what you're made of! 🏆",
  };

  Object.entries(elements).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  });
}

// Interactive effects
function addInteractiveEffects() {
  // Countdown click effects
  document.querySelectorAll(".countdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "scale(0.95)";
      setTimeout(() => (item.style.transform = "scale(1)"), 150);
    });
  });

  // Sparkle effects
  setInterval(createSparkle, 3000);
}

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.innerHTML = "✨";
  sparkle.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    font-size: 1rem;
    opacity: 0.8;
    pointer-events: none;
    z-index: 5;
    animation: sparkle 2s ease-out forwards;
  `;

  document.querySelector(".container").appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}

// Motivational messages
function cycleMotivationalMessages() {
  let messageIndex = 1;

  setInterval(() => {
    const motivationText = document.querySelector(".motivation-text");
    if (!motivationText) return;

    motivationText.style.transition = "opacity 0.3s ease";
    motivationText.style.opacity = "0.3";

    setTimeout(() => {
      motivationText.textContent = MOTIVATIONAL_MESSAGES[messageIndex];
      motivationText.style.opacity = "1";
      messageIndex = (messageIndex + 1) % MOTIVATIONAL_MESSAGES.length;
    }, 300);
  }, 3000);
}

// Strava data handling
function displayStravaData() {
  const spinnerDivs = {};

  // Show loading spinners
  CARD_IDS.forEach((cardId) => {
    const card = document.getElementById(cardId);
    const loadingDiv = document.createElement("div");
    loadingDiv.id = `${cardId}-loading`;
    loadingDiv.className = "runner-result-area";

    const spinnerImg = document.createElement("img");
    spinnerImg.src = "images/spinner.png";
    spinnerImg.alt = "Loading...";
    spinnerImg.className = "spinner-img";

    loadingDiv.appendChild(spinnerImg);
    card.appendChild(loadingDiv);
    spinnerDivs[cardId] = loadingDiv;
  });

  // Fetch Strava data
  fetch("/api/strava")
    .then((res) => res.json())
    .then(({ activities }) => {
      activities.forEach((runnerData) => {
        const cardId = Object.keys(runnerData)[0];
        displayKmForAllRunners(
          cardId,
          `${Object.values(runnerData)[0].totalKm} KM`
        );
        displayTimeForAllRunners(
          cardId,
          Object.values(runnerData)[0].totalTime
        );
      });

      updateTotalKmCombined(activities);
    })
    .catch((err) => {
      console.error("Failed to fetch Strava data:", err);
    });
}

function displayKmForAllRunners(cardId, kmText) {
  const card = document.getElementById(cardId);
  const loadingDiv = document.getElementById(`${cardId}-loading`);
  if (loadingDiv) loadingDiv.remove();

  // Remove existing km div
  const existingKmDiv = document.getElementById(`${cardId}-totalKm`);
  if (existingKmDiv) existingKmDiv.remove();

  // Create a result area container if not exists
  let resultArea = card.querySelector(".runner-result-area");
  if (!resultArea) {
    resultArea = document.createElement("div");
    resultArea.className = "runner-result-area";
    card.appendChild(resultArea);
  }

  // Create km div
  const kmDiv = document.createElement("div");
  kmDiv.id = `${cardId}-totalKm`;
  kmDiv.textContent = kmText;
  resultArea.appendChild(kmDiv);
}

function displayTimeForAllRunners(cardId, timeData) {
  const card = document.getElementById(cardId);
  // Remove existing time div
  const existingTimeDiv = document.getElementById(`${cardId}-totalTime`);
  if (existingTimeDiv) existingTimeDiv.remove();

  // Find or create result area
  let resultArea = card.querySelector(".runner-result-area");
  if (!resultArea) {
    resultArea = document.createElement("div");
    resultArea.className = "runner-result-area";
    card.appendChild(resultArea);
  }

  // Determine the time to display for this runner
  let timeText = "";
  if (timeData && typeof timeData === "object" && !Array.isArray(timeData)) {
    // If timeData is an object with per-runner times
    if (timeData[cardId]) {
      timeText = timeData[cardId];
    } else if (timeData.time) {
      // fallback to .time property if present
      timeText = timeData.time;
    }
  } else if (typeof timeData === "string") {
    timeText = timeData;
  }

  // Create time div if time text exists
  if (timeText) {
    const timeDiv = document.createElement("div");
    timeDiv.id = `${cardId}-totalTime`;
    timeDiv.className = "runner-time";
    timeDiv.textContent = timeText;
    resultArea.appendChild(timeDiv);
  }
}

function updateTotalKmCombined(activities) {
  // Sum up all totalKm and totalTime from your array
  let totalKm = 0;
  let totalMinutes = 0;

  activities.forEach((item) => {
    const person = Object.values(item)[0]; // Get the person data

    // Add up kilometers
    totalKm += person.totalKm;

    // Add up time (convert to minutes)
    const timeStr = person.totalTime.time;
    const hours = (timeStr.match(/(\d+)h/) || [0, 0])[1];
    const minutes = (timeStr.match(/(\d+)m/) || [0, 0])[1];
    totalMinutes += parseInt(hours) * 60 + parseInt(minutes);
  });

  // Round to two decimal places
  totalKm = Math.round(totalKm * 100) / 100;

  // Convert back to hours and minutes
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const totalTime = `${totalHours}h ${remainingMinutes}m`;

  const totalDiv = document.getElementById("total-km-combined");
  totalDiv.innerHTML = `<span class="total-distance">${totalKm} KM</span> <span class="total-time">${totalTime}</span>`;
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  addInteractiveEffects();
  cycleMotivationalMessages();
  displayStravaData();
});

// Add sparkle animation CSS
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
  @keyframes sparkle {
    0% { opacity: 0.8; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
  }
`;
document.head.appendChild(sparkleStyle);

// Start countdown
const countdownInterval = setInterval(updateCountdown, 1000);
