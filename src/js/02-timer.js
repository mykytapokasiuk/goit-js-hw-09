import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { variables } from './variables';
import { refs } from './references';
import {
  checkDate,
  calculateTimeDifference,
  addLeadingZero,
  addResultToInterface,
  changeTimerValueStyle,
  startTimer,
} from './functions/functions-timer';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    [
      checkDate(selectedDates[0], defaultDate),
      calculateTimeDifference(selectedDates[0], defaultDate),
    ];
  },
};

flatpickr('input#datetime-picker', options);

const defaultDate = options.defaultDate;
refs.start_timer_btn.disabled = !variables.isButtonDisabled;

refs.start_timer_btn.addEventListener('click', () => {
  startTimer({
    zero: addLeadingZero,
    result: addResultToInterface,
    style: changeTimerValueStyle,
  });
});
