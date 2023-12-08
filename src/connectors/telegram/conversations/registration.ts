import { MyContext, MyConversation } from '.';
import { createUser, getRegions } from '../../../services/backend';

export default async (conversation: MyConversation, ctx: MyContext) => {
  await ctx.reply('Введіть ваше Імя:');
  const username = await conversation.form.text();
  await ctx.reply(`Ваше ім'я, ${username}`);

  await ctx.reply('Введіть дату народження:');
  const {
    msg: { date: dateOfBirth },
  } = await conversation.waitFor('msg:forward_date', {
    otherwise: ctx => ctx.reply('Будь-ласка в ведіть правильну дату. Наприклад 09.12.2023'),
  });
  await ctx.reply(`Дата народження, ${dateOfBirth}`);

  await ctx.reply('Введіть ваш номер телефону:');
  const {
    msg: { text: phone },
  } = await conversation.waitFor('msg::phone_number');
  await ctx.reply(`Ваш номер телефону, ${phone}`);

  const regions = await getRegions();
  await ctx.reply('Виберіть область проживання:');
  const region = await conversation.form.select(
    regions,
    ctx => 'Будь-ласка виберіть регіон або місто зі списку',
  );
  await ctx.reply(`Область проживання, ${region}`);

  await ctx.reply('Чи хочете ви взяти участь у програмі «Помічник ветерана»?');
  const takePartInProject = await conversation.form.select(['Так', 'Ні']);
  await ctx.reply(`Ви сказали ${takePartInProject} на участь в проекті`);

  const finalMessage = `Ім'я: ${username}\nДата народження: ${dateOfBirth}\nВаш номер телефону, ${phone}\nОбласть проживання: ${region}\nВи сказали ${takePartInProject} на участь в проекті`;
  await ctx.reply(`Перевірте, чи все вірно вказано:\n\n${finalMessage}`);

  await createUser({ username, dateOfBirth, phone, region, takePartInProject });
  await ctx.reply(`Вітаємо ви зареєстровані як учасник програми «Помічник ветерана»!`);
};
