import { Keyboard } from 'grammy';

import { locales } from '../../../config';

const registrationKeyboard = new Keyboard()
  .text(locales.ua.MAIN_MENU.BACK_TO_MAIN_MENU)
  .placeholder('Дайте відповідь на питання');
