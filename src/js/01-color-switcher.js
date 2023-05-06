import {
  getRandomHexColor,
  startChangeBgColor,
  stopChangeBgColor,
  showInfoMessage,
  showThxMessage,
} from './functions/functions-color-switcher.js';
import { refs } from './references';
import { variables } from './variables';

const { stop_color_change_btn, start_color_change_btn, body_element } = refs;
stop_color_change_btn.disabled = !variables.isButtonDisabled;

start_color_change_btn.addEventListener('click', () => {
  startChangeBgColor(getRandomHexColor, body_element);
});

stop_color_change_btn.addEventListener('click', () => {
  stopChangeBgColor(showThxMessage);
});
window.addEventListener('load', showInfoMessage);
