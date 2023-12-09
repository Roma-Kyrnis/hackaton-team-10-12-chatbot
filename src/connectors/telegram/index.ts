import { session } from 'grammy';
import { conversations as initConversations, createConversation } from '@grammyjs/conversations';

import bot from './bot';
import config, { locales } from '../../config';
import conversations from './conversations';
import mainKeyboard from './keyboards';
import {
  backToMainMenu,
  brainInjuriesHears,
  hearingLossHears,
  limbsAmputationHears,
  popularQuestionsHears,
  registrationHears,
  stressDisorderHears,
  visionLossHears,
  whatConcernYouHears,
} from './hears';
import {
  findSpecializedPsychologistForConsultationHears,
  howToUseEDictionaryHears,
  partialVisionLossHowToFindJobHears,
  whatGroupChooseWithHearLoosAndLimbsAmputationHears,
} from './hears/popularQuestions';

bot.use(
  session({
    initial: () => ({}),
  }),
);
bot.use(initConversations());
// TODO: add to config
bot.use(createConversation(conversations.registration, { id: 'registration' }));

/** MAIN_MENU */
bot.hears(locales.ua.MAIN_MENU.REGISTRATION, registrationHears);
bot.hears(locales.ua.MAIN_MENU.POPULAR_QUESTIONS, popularQuestionsHears);
bot.hears(locales.ua.MAIN_MENU.WHAT_CONCERNS_YOU, whatConcernYouHears);
bot.hears(locales.ua.MAIN_MENU.BACK_TO_MAIN_MENU, backToMainMenu);

/** WHAT_CONCERNS_YOU */
bot.hears(locales.ua.WHAT_CONCERNS_YOU.HEARING_LOSS, hearingLossHears);
bot.hears(locales.ua.WHAT_CONCERNS_YOU.VISION_LOSS, visionLossHears);
bot.hears(locales.ua.WHAT_CONCERNS_YOU.LIMBS_AMPUTATION, limbsAmputationHears);
bot.hears(locales.ua.WHAT_CONCERNS_YOU.BRAIN_INJURIES, brainInjuriesHears);
bot.hears(locales.ua.WHAT_CONCERNS_YOU.STRESS_DISORDER, stressDisorderHears);

/** POPULAR_QUESTIONS */
bot.hears('Як користуватись електронним щоденником здоров`я?', howToUseEDictionaryHears);
bot.hears(
  'До якої групи підтримки мені приєднатись якщо в мене втрата слуху і ампутація кінцівки?',
  whatGroupChooseWithHearLoosAndLimbsAmputationHears,
);
bot.hears(
  'Де я можу знайти спеціалізованого психолога для консультації?',
  findSpecializedPsychologistForConsultationHears,
);
bot.hears(
  'У мене часткова втрата зору, як мені знайти роботу?',
  partialVisionLossHowToFindJobHears,
);

bot.command(
  'start',
  ctx => ctx.reply(config.locales.ua.WELCOME_MESSAGE, { reply_markup: mainKeyboard }),
  // ctx.reply(config.locales.ua.WELCOME_MESSAGE, { reply_markup: mainMenu }),
);

export const runBot = () =>
  bot.start({ onStart: botInfo => console.log(`Bot ${botInfo.username} started`) });
