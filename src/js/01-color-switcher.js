import {
  getRandomHexColor,
  startChangeBgColor,
  stopChangeBgColor,
  showInfoMessage,
} from './functions';
import { refs } from './references';
import { variables } from './variables';

refs.stop_color_change_btn.disabled = !variables.isButtonDisabled;

refs.start_color_change_btn.addEventListener('click', () => {
  startChangeBgColor(getRandomHexColor, refs.body_element);
});

refs.stop_color_change_btn.addEventListener('click', () => {
  stopChangeBgColor();
});
window.addEventListener('load', showInfoMessage);
