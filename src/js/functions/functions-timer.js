import Refs from '../references';
import Vars from '../variables';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

/**
 * Converts milliseconds to days, hours, minutes, seconds
 * @function convertMs
 * @param {number} ms
 * @returns {object} Object with days, hours, minutes, seconds
 */
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
/**
 * Checks if the correct date is set(shows notifications),
 * updates default_date if time between checks exceeds 1 minute or more,
 * locks/unlocks the timer start and reset buttons
 * @function checkDate
 * @param {object} selected_date
 * @param {object} default_date
 */
const checkDate = (selected_date, default_date) => {
  default_date = new Date();
  if (
    selected_date < default_date ||
    ((selected_date - default_date) / 1000).toFixed(3) < 10
  ) {
    Notify.failure('Please choose a date in the future', {
      width: '260px',
      showOnlyTheLastOne: true,
      position: 'right-bottom',
      distance: '40px',
      timeout: 2000,
      fontSize: '15px',
      borderRadius: '8px',
      cssAnimationStyle: 'from-bottom',
    });
  } else {
    Refs.start_timer_btn.disabled = Vars.isButtonDisabled;
    Refs.reset_timer_btn.disabled = Vars.isButtonDisabled;
  }
};
/**
 * @callback callback
 */
/**
 * Calculates difference between user selected date and current date,
 * stops timer, shows modal window after timer stops
 * @function calculateTimeDifference
 * @param {object} value
 * @param {callback} callback
 */
function calculateTimeDifference(value, callback) {
  const currentDate = Date.now();
  Vars.time_difference = value - currentDate;
  Vars.formatted_time = callback(Vars.time_difference);

  if (currentDate >= Vars.user_selected_date - 1000) {
    clearInterval(Vars.timer_interval_id);
    setTimeout(() => {
      Report.success(
        'Thanks for watching!',
        'Want to see the timer again? Just choose a new date!',
        'Okay',
        () => {
          document.location.reload();
        },
        {
          width: '450px',
          titleFontSize: '24px',
          messageFontSize: '18px',
        }
      );
    }, 1200);
  }
}
/**
 * Adds timer values to interface, adds 0 to the beginning if the number has less than two characters
 * @function addLeadingZero
 * @param {object} formatted_time
 */
const addLeadingZero = formatted_time => {
  const { days, hours, minutes, seconds } = formatted_time;
  Refs.data_days_element.textContent = days.toString().padStart(2, 0);
  Refs.data_hours_element.textContent = hours.toString().padStart(2, 0);
  Refs.data_minutes_element.textContent = minutes.toString().padStart(2, 0);
  Refs.data_seconds_element.textContent = seconds.toString().padStart(2, 0);
};
/**
 * Changes timer second styles every 900ms
 * @function changeTimerValueStyle
 */
const changeTimerValueStyle = () => {
  Refs.data_seconds_element.classList.toggle('active');
  setTimeout(() => {
    Refs.data_seconds_element.classList.toggle('active');
  }, 900);
};
/**
 * Starts a timer
 * @function startTimer
 * @param {object} functions
 */
const startTimer = functions => {
  const { calculateDiff, addZero, changeStyle } = functions;
  Vars.timer_interval_id = setInterval(() => {
    calculateDiff(Vars.user_selected_date, convertMs);
    addZero(Vars.formatted_time);
    changeStyle();
  }, 1000);
  Refs.start_timer_btn.disabled = !Vars.isButtonDisabled;
  Refs.input_timer_element.disabled = !Vars.isButtonDisabled;
};
/**
 * Resets timer
 * @function resetTimer
 */
const resetTimer = () => {
  Refs.input_timer_element.classList.toggle('animation');
  setTimeout(() => {
    Refs.input_timer_element.classList.toggle('animation');
  }, 1000);
  setTimeout(() => {
    document.location.reload();
  }, 800);
};

export default {
  checkDate,
  calculateTimeDifference,
  addLeadingZero,
  changeTimerValueStyle,
  startTimer,
  resetTimer,
};
