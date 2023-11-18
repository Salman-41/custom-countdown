const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Set Date Input Min with Today's Date
function updateCountdown(e) {
  e.preventDefault();
}
//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
