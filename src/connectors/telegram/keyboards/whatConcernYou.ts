import { Keyboard } from 'grammy';

import { locales } from '../../../config';

const whatConcernYouKeyboard = new Keyboard()
  .text(locales.ua.WHAT_CONCERNS_YOU.HEARING_LOSS)
  .row()
  .text(locales.ua.WHAT_CONCERNS_YOU.VISION_LOSS)
  .row()
  .text(locales.ua.WHAT_CONCERNS_YOU.LIMBS_AMPUTATION)
  .row()
  .text(locales.ua.WHAT_CONCERNS_YOU.BRAIN_INJURIES)
  .row()
  .text(locales.ua.WHAT_CONCERNS_YOU.STRESS_DISORDER)
  .row()
  .text(locales.ua.MAIN_MENU.BACK_TO_MAIN_MENU)
  .resized();

export default whatConcernYouKeyboard;
