import { HearsMiddleware } from 'grammy';

import { MyContext } from '../conversations';
import mainKeyboard from '../keyboards';
import whatConcernYouKeyboard from '../keyboards/whatConcernYou';
import popularQuestionsKeyboard from '../keyboards/popularQuestions';

export const registrationHears: HearsMiddleware<MyContext> = async ctx => {
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

export const backToMainMenu: HearsMiddleware<MyContext> = async ctx => {
  await ctx.reply('Повернення до головного меню', { reply_markup: mainKeyboard });
};

export * from './whatConcernYou';
