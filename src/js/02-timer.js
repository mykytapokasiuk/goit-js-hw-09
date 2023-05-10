import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Vars from './variables';
import Refs from './references';
import Functions from './functions/functions-timer.js';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  disableMobile: true,
  onClose(selectedDates) {
    Vars.user_selected_date = selectedDates[0];
    Functions.checkDate(Vars.user_selected_date, options.defaultDate);
  },
};

flatpickr('input#datetime-picker', options);
Refs.start_timer_btn.disabled = !Vars.isButtonDisabled;
Refs.reset_timer_btn.disabled = !Vars.isButtonDisabled;

Refs.start_timer_btn.addEventListener('click', () => {
  Functions.startTimer({
    calculateDiff: Functions.calculateTimeDifference,
    addZero: Functions.addLeadingZero,
    changeStyle: Functions.changeTimerValueStyle,
  });
});

Refs.reset_timer_btn.addEventListener('click', Functions.resetTimer);
