import Refs from '../references';
import Vars from '../variables';
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
  Refs.start_color_change_btn.disabled = !Vars.isButtonDisabled;
  Refs.stop_color_change_btn.disabled = Vars.isButtonDisabled;
  Vars.changeColorIntervalId = setInterval(() => {
    target.style.backgroundColor = callback();
  }, 1000);
};
/**
 * @callback callback
 */
/**
 * Stops changing background color
 * @function stopChangeBgColor
 * @param {callback} callback
 */
const stopChangeBgColor = callback => {
  Refs.start_color_change_btn.disabled = Vars.isButtonDisabled;
  Refs.stop_color_change_btn.disabled = !Vars.isButtonDisabled;
  clearInterval(Vars.changeColorIntervalId);
  setTimeout(() => {
    callback();
  }, 1500);
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
  showThxMessage,
};
