import { session } from 'grammy';
import { conversations as initConversations, createConversation } from '@grammyjs/conversations';

import bot from './bot';
import config from '../../config';
import { mainMenu } from './menu';
import conversations from './conversations';

bot.use(
  session({
    initial: () => ({}),
  }),
);
bot.use(initConversations());
// TODO: add to config
bot.use(createConversation(conversations.registration, { id: 'registration' }));

bot.use(mainMenu);

bot.command('start', ctx =>
  ctx.reply(config.locales.ua.WELCOME_MESSAGE, { reply_markup: mainMenu }),
);

export const runBot = () =>
  bot.start({ onStart: botInfo => console.log(`Bot ${botInfo.username} started`) });
