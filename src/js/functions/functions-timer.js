import { refs } from '../references';
import { variables } from '../variables';
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
 * Checks if the correct date is set(shows notifications), locks/unlocks the timer start button
 * @function checkDate
 * @param {object} data
 * @param {object} date
 */
const checkDate = (data, date) => {
  //? this.defaultDate from the options object doesn't work in this function... WHY?
  //? It works after saving this.defaultDate in a global variable (const defaultDate = options.defaultDate)
  data > date
    ? (refs.start_timer_btn.disabled = variables.isButtonDisabled)
    : (Notify.failure('Please choose a date in the future', {
        width: '350px',
        showOnlyTheLastOne: true,
        position: 'right-top',
        distance: '50px',
        timeout: 2000,
        fontSize: '18px',
        borderRadius: '8px',
        cssAnimationStyle: 'from-top',
      }),
      (refs.start_timer_btn.disabled = !variables.isButtonDisabled));
};
/**
 * Calculates difference in milliseconds between selected date and default date
 * @function calculateTimeDifference
 * @param {object} data
 * @param {object} date
 */
const calculateTimeDifference = (data, date) => {
  variables.time_difference = data - date;
};
/**
 * Adds 0 to the beginning if the number has less than two characters
 * @function addLeadingZero
 * @param {object} value
 */
function addLeadingZero(value) {
  const arrayOfFormattedData = [],
    keys = Object.keys(value);
  for (const key of keys) {
    arrayOfFormattedData.push(value[key].toString().padStart(2, 0));
  }
  variables.formatted_time = arrayOfFormattedData;
}
/**
 * Adds initial timer values
 * @function addResultToInterface
 * @param {array} array
 */
const addResultToInterface = array => {
  refs.span_timer_elements.forEach((element, i) => {
    element.textContent = array[i];
  });
};
/**
 * Changes timer second styles every 900ms, stops timer, shows modal window after timer stops
 * @function changeTimerValueStyle
 */
const changeTimerValueStyle = () => {
  refs.span_timer_elements[3].classList.toggle('active');
  //? Is it normal practice to use setTimeOut to change styles?
  //?
  setTimeout(() => {
    refs.span_timer_elements[3].classList.toggle('active');
  }, 900);
  if (variables.time_difference <= 1000) {
    clearInterval(variables.timer_interval_id);
    setTimeout(() => {
      Report.success(
        'Thanks for watching!',
        'Want to see the timer again? Just reload the page! ',
        'Okay',
        {
          width: '450px',
          titleFontSize: '24px',
          messageFontSize: '18px',
        }
      );
    }, 1500);
  }
};
/**
 * Starts a timer
 * @function startTimer
 * @param {object} functions
 */
const startTimer = functions => {
  const { zero, result, style } = functions;
  variables.timer_interval_id = setInterval(() => {
    variables.time_difference -= 1000;
    variables.time_object = convertMs(variables.time_difference);
    zero(variables.time_object);
    result(variables.formatted_time);
    style();
  }, 1000);
  refs.start_timer_btn.disabled = !variables.isButtonDisabled;
  refs.input_timer_element.disabled = !variables.isButtonDisabled;
};

export {
  checkDate,
  calculateTimeDifference,
  addLeadingZero,
  addResultToInterface,
  changeTimerValueStyle,
  startTimer,
};
