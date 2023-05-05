import { refs } from '../references';
import { variables } from '../variables';
import { Report } from 'notiflix';
/**
 * Generates random color
 * @function getRandomHexColor
 * @returns {string} String in hex format
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
/**
 * @callback callback
 */
/**
 * Changes background color
 * @function startChangeBgColor
 * @param {callback} callback
 * @param {HTMLElement} target
 */
const startChangeBgColor = (callback, target) => {
  refs.start_color_change_btn.disabled = !variables.isButtonDisabled;
  refs.stop_color_change_btn.disabled = variables.isButtonDisabled;
  variables.changeColorIntervalId = setInterval(() => {
    target.style.backgroundColor = callback();
  }, 1000);
};
/**
 * Stops changing background color
 * @function stopChangeBgColor
 */
const stopChangeBgColor = () => {
  refs.start_color_change_btn.disabled = variables.isButtonDisabled;
  refs.stop_color_change_btn.disabled = !variables.isButtonDisabled;
  clearInterval(variables.changeColorIntervalId);
  showThxMessage();
};
/**
 * Shows modal window with info about application
 * @function showInfoMessage
 */
const showInfoMessage = () => {
  Report.info(
    'Background color switcher',
    'Just press "Start" button to begin',
    'Okay',
    {
      width: '350px',
      titleFontSize: '24px',
      messageFontSize: '20px',
    }
  );
  window.removeEventListener('load', showInfoMessage);
};
/**
 * Shows a thank you modal window
 * @function showThxMessage
 */
function showThxMessage() {
  Report.success('Thanks for watching!', '', 'Okay', {
    width: '350px',
    titleFontSize: '24px',
  });
}
export {
  getRandomHexColor,
  startChangeBgColor,
  stopChangeBgColor,
  showInfoMessage,
};
