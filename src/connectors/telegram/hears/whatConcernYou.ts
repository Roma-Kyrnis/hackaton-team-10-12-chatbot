import { HearsMiddleware } from 'grammy';
import { MyContext } from '../conversations';
import { stringToMarkdownV2 } from '../utils';

const HEARING_LOSS = {
  0: 'Безкоштовні або субсидовані медичні операції для відновлення слуху, включаючи кохлеарну імплантацію',
  1: 'Доступ до високоякісних слухових апаратів за зниженими цінами',
  2: 'Консультації з аудіологами та отоларингологами для моніторингу стану слуху',
};

const VISION_LOSS = {
  0: "Консультації з кар'єрного розвитку та допомога у пошуку роботи, включаючи тренінги з написання резюме та підготовки до співбесід",
  1: 'Рекомендовані вакансії для людей з частковою або повною втратою слуху',
};

const LIMBS_AMPUTATION = {
  0: 'Безкоштовні курси та тренінги з жестової мови для ветеранів та їхніх сімей',
  1: 'Доступ до онлайн-ресурсів та платформ для самоосвіти',
};

const BRAIN_INJURIES = {
  0: 'Знижки на медичні послуги та ліки',
  1: 'Пільгове оподаткування для ветеранів з втратою слуху',
  2: 'Пільги на комунальні послуги та транспорт',
};

const STRESS_DISORDER = {
  0: 'Групи підтримки для допомоги у впорядкуванні емоційного стану та адаптації до нового способу життя',
  1: 'Соціальні заходи та зустрічі для спілкування та обміну досвідом між ветеранами',
};

const getMessageList = (list: Record<number, string>) => {
  let message = '';
  for (const value of Object.values(list)) {
    message += `- ${value} [посилання](https://eveteran.gov.ua/searchresult?key=%D0%B1%D0%BE%D0%B9%D0%BE%D0%B2%D0%B8%D1%85%20%D0%B4%D1%96%D0%B9)\n\n`;
  }
  return message;
};
//TODO: add another layer of abstraction because it's all hearing loss problems but not types that described below
export const hearingLossHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `Програми Медичної Підтримки та Операції`;
  const resList = getMessageList(HEARING_LOSS);
  ctx.reply(stringToMarkdownV2(`${message}:\n\n${resList}`), { parse_mode: 'MarkdownV2' });
};

export const visionLossHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `Програми з Працевлаштування`;
  const resList = getMessageList(VISION_LOSS);
  ctx.reply(stringToMarkdownV2(`${message}:\n\n${resList}`), { parse_mode: 'MarkdownV2' });
};
export const limbsAmputationHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `Освітні Програми та Тренінги`;
  const resList = getMessageList(LIMBS_AMPUTATION);
  ctx.reply(stringToMarkdownV2(`${message}:\n\n${resList}`), { parse_mode: 'MarkdownV2' });
};
export const brainInjuriesHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `Пільги та державні субсидії`;
  const resList = getMessageList(BRAIN_INJURIES);
  ctx.reply(stringToMarkdownV2(`${message}:\n\n${resList}`), { parse_mode: 'MarkdownV2' });
};
export const stressDisorderHears: HearsMiddleware<MyContext> = async ctx => {
  const message = `Соціальні та Психологічні Послуги`;
  const resList = getMessageList(STRESS_DISORDER);
  ctx.reply(stringToMarkdownV2(`${message}:\n\n${resList}`), { parse_mode: 'MarkdownV2' });
};
