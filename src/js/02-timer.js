import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// all modules
import Notiflix from 'notiflix';

// const inputElement = document.getElementById
// (datetime-picker);
const btnStart = document.querySelector('[data-start]');
const days =  document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
btnStart.addEventListener('click', onStart);
btnStart.disabled = true;

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0] < options.defaultDate){
        Notiflix.Notify.failure('Please choose a date in the future');
        return btnStart.disabled = true;;
      } 
      else 
      btnStart.disabled = false;
      targetTime = selectedDates[0];
    },
  };
  
  function onStart() {
    
    btnStart.disabled = true;
    timerId = setInterval(() => {
    
      const targetTime = new Date(calendar.selectedDates[0]).getTime();
      const currentTime = Date.now();
      const countdown = targetTime - currentTime;
      console.log(countdown);
      if (countdown <= 0) {
        clearInterval(timerId);
        Notiflix.Notify.info('Your time is out!');
        btnStart.disabled = false;
      } else {
        const { days, hours, minutes, seconds } = convertMs(countdown);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        updateClockFace({ days, hours, minutes, seconds });
      }
    }, 1000);
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
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  const calendar = flatpickr('input[id=datetime-picker]', options);

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  function updateClockFace({ days, hours, minutes, seconds }) {
    days.textContent = `${days}`;
    hours.textContent = `${hours}`;
    minutes.textContent = `${minutes}`;
    seconds.textContent = `${seconds}`;
  }


