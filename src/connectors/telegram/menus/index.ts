import { Menu } from '@grammyjs/menu';

import { locales } from '../../../config';
import { MyContext } from '../conversations';
import whatConcernYouMenu from './whatConcernYou';

const mainMenu = new Menu<MyContext>('main-menu')
  .text(locales.ua.MAIN_MENU.REGISTRATION, ctx => ctx.conversation.enter('registration'))
  .row()
  .text(locales.ua.MAIN_MENU.POPULAR_QUESTIONS, ctx => ctx.reply('You pressed B!'))
  .row()
  .submenu('Що вас турбує?', 'what-concern-you');

mainMenu.register(whatConcernYouMenu);

export { mainMenu };
