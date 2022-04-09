
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const flatpickrEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

buttonEl.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
          Notiflix.Notify.info('Please choose a date in the future');
          buttonEl.disabled = true;
      }
      else {
    buttonEl.disabled = false;
      }
        }
};

flatpickr(flatpickrEl, options);

buttonEl.addEventListener('click', () => {  

  timerId = setInterval(() => {
    const dateNow = new Date();
    const inputValue = new Date(flatpickrEl.value);
    const dateSale = inputValue - dateNow;
    const time = convertMs(dateSale);
    updateClock(time);

    if (dateSale < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
  });

function updateClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
};

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


