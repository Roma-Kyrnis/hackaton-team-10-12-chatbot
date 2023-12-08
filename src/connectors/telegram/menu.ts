import { Menu } from '@grammyjs/menu';

import { locales } from '../../config';
import { MyContext } from './conversations';

const mainMenu = new Menu<MyContext>('main-menu')
  .text(locales.ua.MAIN_MENU.REGISTRATION, ctx => ctx.conversation.enter('registration'))
  .row()
  .text(locales.ua.MAIN_MENU.POPULAR_QUESTIONS, ctx => ctx.reply('You pressed B!'));
export { mainMenu };
