import {
  getRandomHexColor,
  startChangeBgColor,
  stopChangeBgColor,
  showInfoMessage,
  showThxMessage,
} from './functions/functions-color-switcher.js';
import Refs from './references';
import Vars from './variables';

Refs.stop_color_change_btn.disabled = !Vars.isButtonDisabled;

Refs.start_color_change_btn.addEventListener('click', () => {
  startChangeBgColor(getRandomHexColor, Refs.body_element);
});

Refs.stop_color_change_btn.addEventListener('click', () => {
  stopChangeBgColor(showThxMessage);
});
window.addEventListener('load', showInfoMessage);
