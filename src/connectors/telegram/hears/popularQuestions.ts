import { HearsMiddleware } from 'grammy';
import { MyContext } from '../conversations';
import { stringToMarkdownV2 } from '../utils';

export const howToUseEDictionaryHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `*Відповідь*: Чат бот працює на базі ШІ, ви описуєте свій стан, а система буде надавати рекомендації на основі ваших відповідей\\. Може запропонувати відвідати якісь заходи, або підбере психолога по вашим побажанням і очікуванням`;
  ctx.reply(stringToMarkdownV2(message), { parse_mode: 'MarkdownV2' });
};

export const whatGroupChooseWithHearLoosAndLimbsAmputationHears: HearsMiddleware<
  MyContext
> = async ctx => {
  const message = `*Відповідь*: Вам потрібно вибрати групу фізичне і ментальне здоров'я і вибрати дві підкатегорії «втрата слуху» і «ампутація кінцівки» \\. В цій групі ви знайдете психолога відповідно до Ваших потреб і травм, а також соціальні програми та пільги, групи підтримки та багато іншого\\.`;
  ctx.reply(stringToMarkdownV2(message), { parse_mode: 'MarkdownV2' });
};

export const findSpecializedPsychologistForConsultationHears: HearsMiddleware<
  MyContext
> = async ctx => {
  const message = `*Відповідь*: Вам потрібно вибрати групу фізичне і ментальне здоров'я, підгрупу яка описують ваші травми\\. В цих групі є інформація та посилання на спеціалізованих психологів, які працюють з відповідними травмами\\.`;
  ctx.reply(stringToMarkdownV2(message), { parse_mode: 'MarkdownV2' });
};

export const partialVisionLossHowToFindJobHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `*Відповідь*: У нашому чат боті є групи розділені по категоріях за певними фізичними вадами, зокрема є група для людей з втратою зору\\. У цій групі ви або члени вашої родини зможуть знайти, бескоштовні курси по навчанню шрифту брайля, спеціалізовані програми для допомоги з пошуку роботи та перелік вакансій для людей частково або повністю незрячих\\.`;
  ctx.reply(stringToMarkdownV2(message), { parse_mode: 'MarkdownV2' });
};
