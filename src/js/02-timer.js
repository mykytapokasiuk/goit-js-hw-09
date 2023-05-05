import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { variables } from './variables';
import { refs } from './references';
import {
  checkDate,
  calculateTimeDifference,
  addLeadingZero,
  addResultToInterface,
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
const defaultDate = options.defaultDate;
refs.start_timer_btn.disabled = !variables.isButtonDisabled;

flatpickr('input#datetime-picker', options);

refs.start_timer_btn.addEventListener('click', () => {
  startTimer(addLeadingZero, addResultToInterface);
});
