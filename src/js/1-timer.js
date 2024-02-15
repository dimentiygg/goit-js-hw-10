import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
const input = document.querySelector('input');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate = 0;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    console.log(selectedDates[0]);
    if (new Date().getTime() > selectedDates[0].getTime()) {
      button.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else if (new Date().getTime() == selectedDates[0].getTime()) {
      button.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (let key in value) {
    if (value[key] >= 0 && value[key] < 10) {
      value[key] = value[key].toString().padStart(2, '0');
    }
  }
  return value;
}

button.addEventListener('click', () => {
  button.disabled = true;
  input.disabled = true;
  const timer = setInterval(() => {
    const value = addLeadingZero(convertMs(userSelectedDate - Date.now()));

    days.textContent = `${value.days}`;
    hours.textContent = `${value.hours}`;
    minutes.textContent = `${value.minutes}`;
    seconds.textContent = `${value.seconds}`;
    if (userSelectedDate - Date.now() <= 999) {
      clearInterval(timer);
      button.disabled = false;
      input.disabled = false;
    }
  }, 1000);
});
//
