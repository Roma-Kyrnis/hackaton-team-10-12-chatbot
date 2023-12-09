import { Keyboard } from 'grammy';

import { locales } from '../../../config';

const mainKeyboard = new Keyboard()
  .text(locales.ua.MAIN_MENU.REGISTRATION)
  .row()
  .text(locales.ua.MAIN_MENU.POPULAR_QUESTIONS)
  .row()
  .text(locales.ua.MAIN_MENU.WHAT_CONCERNS_YOU)
  .row()
  .resized()
  .persistent();

export default mainKeyboard;
