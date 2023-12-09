import { Keyboard } from 'grammy';

import { locales } from '../../../config';

const popularQuestionsKeyboard = new Keyboard()
  .text('Як користуватись електронним щоденником здоров`я?')
  .row()
  .text('До якої групи підтримки мені приєднатись якщо в мене втрата слуху і ампутація кінцівки?')
  .row()
  .text('Де я можу знайти спеціалізованого психолога для консультації?')
  .row()
  .text('У мене часткова втрата зору, як мені знайти роботу?')
  .row()
  .text(locales.ua.MAIN_MENU.BACK_TO_MAIN_MENU)
  .resized();

export default popularQuestionsKeyboard;
