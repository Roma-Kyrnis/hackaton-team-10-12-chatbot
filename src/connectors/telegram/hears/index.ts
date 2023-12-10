import { HearsMiddleware } from 'grammy';

import conversations, { MyContext } from '../conversations';
import mainKeyboard from '../keyboards';
import whatConcernYouKeyboard from '../keyboards/whatConcernYou';
import popularQuestionsKeyboard from '../keyboards/popularQuestions';
import registrationKeyboard from '../keyboards/registration';

export const registrationHears: HearsMiddleware<MyContext> = async ctx => {
  await ctx.reply(
    'Раді вас привітати з вашим рішення доєднатись до проекту *Помічник ветерана*',
    { reply_markup: registrationKeyboard, parse_mode: 'MarkdownV2' },
  );
  await ctx.conversation.enter('registration');
};

export const popularQuestionsHears: HearsMiddleware<MyContext> = async ctx => {
  await ctx.reply('Ви перейшли в секцію "Популярні питання"', {
    reply_markup: popularQuestionsKeyboard,
  });
};

export const whatConcernYouHears: HearsMiddleware<MyContext> = async ctx => {
  await ctx.reply('Ви перейшли в секцію "Що турбує вас?"', {
    reply_markup: whatConcernYouKeyboard,
  });
};

export const backToMainMenu: HearsMiddleware<MyContext> = async (ctx) => {
  await conversations.exitRegistration(ctx);
  await ctx.reply('Повернення до головного меню', { reply_markup: mainKeyboard });
};

export * from './whatConcernYou';
