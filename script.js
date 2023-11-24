// DOM Elements
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateInput = document.getElementById('date-picker');
const countdownDisplay = document.getElementById('countdown');
const countdownTitleDisplay = document.getElementById('countdown-title');
const timeElements = document.querySelectorAll('span');
const completeDisplay = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const countdownButton = document.getElementById('countdown-button');
const completeButton = document.getElementById('complete-button');

// Constants
const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;

// Countdown variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownInterval;

// Get today's date
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Functions

// Update countdown display
function updateCountdownDisplay() {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / DAY_MS);
    const hours = Math.floor((distance % DAY_MS) / HOUR_MS);
    const minutes = Math.floor((distance % HOUR_MS) / MINUTE_MS);
    const seconds = Math.floor((distance % MINUTE_MS) / SECOND_MS);

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownDisplay.hidden = true;
      clearInterval(countdownInterval);
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeDisplay.hidden = false;
    } else {
      countdownTitleDisplay.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeDisplay.hidden = true;
      countdownDisplay.hidden = false;
    }
  }, SECOND_MS);
}

// Update countdown based on user input
function handleCountdownUpdate(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  const savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateCountdownDisplay();
  }
}

// Reset countdown values
function resetCountdown() {
  countdownDisplay.hidden = true;
  completeDisplay.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownInterval);
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

// Restore countdown from localStorage if available
function restorePreviousCountdown() {
  const storedCountdown = localStorage.getItem('countdown');
  if (storedCountdown) {
    inputContainer.hidden = true;
    const savedCountdown = JSON.parse(storedCountdown);
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateCountdownDisplay();
  }
}

// Event Listeners
countdownForm.addEventListener('submit', handleCountdownUpdate);
countdownButton.addEventListener('click', resetCountdown);
completeButton.addEventListener('click', resetCountdown);

// Check for previous countdown on page load
restorePreviousCountdown();
