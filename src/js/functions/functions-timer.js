import { refs } from '../references';
import { variables } from '../variables';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

/**
 * Converts milliseconds to days, hours, minutes, seconds
 * @param {number} ms
 * @returns {object}
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
 * @param {object} data
 * @param {object} date
 */
const checkDate = (data, date) => {
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
 * @param {object} data
 * @param {object} date
 */
const calculateTimeDifference = (data, date) => {
  variables.time_difference = data - date;
};
/**
 * Adds 0 to the beginning if the number has less than two characters
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
 * @param {array} array
 */
const addResultToInterface = array => {
  refs.span_timer_elements.forEach((element, i) => {
    element.textContent = array[i];
  });
};
/**
 * @callback callback
 */
/**
/**
 * Starts a timer
 * @param {callback} zero 
 * @param {callback} result 
 */
const startTimer = (zero, result) => {
  setInterval(() => {
    variables.time_difference -= 1000;
    variables.time_object = convertMs(variables.time_difference);
    zero(variables.time_object);
    result(variables.formatted_time);
  }, 1000);
  refs.start_timer_btn.disabled = !variables.isButtonDisabled;
  refs.input_timer_element.disabled = !variables.isButtonDisabled;
};

export {
  checkDate,
  calculateTimeDifference,
  addLeadingZero,
  addResultToInterface,
  startTimer,
};
