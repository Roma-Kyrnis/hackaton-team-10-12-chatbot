import { MyContext, MyConversation } from '.';
import { createUser, getRegions } from '../../../services/backend';

const regionsTranslate = {
  vinnytsia: 'Вінницька',
  volyn: 'Волинська',
  dnipropetrovsk: 'Дніпропетровська',
  donetsk: 'Донецька',
  zhytomyr: 'Житомирська',
  zakarpattia: 'Закарпатська',
  zaporizhzhia: 'Запорізька',
  ivano_frankivsk: 'Івано-Франківська',
  kyiv: 'Київська',
  kirovohrad: 'Кіровоградська',
  luhansk: 'Луганська',
  lviv: 'Львівська',
  Lviv: 'Львівська',
  mykolaiv: 'Миколаївська',
  odessa: 'Одеська',
  poltava: 'Полтавська',
  rivne: 'Рівненська',
  sumy: 'Сумська',
  ternopil: 'Тернопільська',
  kharkiv: 'Харківська',
  kherson: 'Херсонська',
  khmelnytskyi: 'Хмельницька',
  cherkasy: 'Черкаська',
  chernivtsi: 'Чернівецька',
  chernihiv: 'Чернігівська',
  crimea: 'Крим',
};

const getListUARegions = (regions: string[]) => {
  const availableRegions: string[] = [];
  const regionsTranslateEntries = Object.entries(regionsTranslate);
  for (const region of regions) {
    const foundRegion = regionsTranslateEntries.find(([key, value]) => region === key);
    if (foundRegion) {
      availableRegions.push(foundRegion[1]);
    }
  }
  return availableRegions;
};

export default async (conversation: MyConversation, ctx: MyContext) => {
  await ctx.reply('Введіть ваше Імя:');
  const username = await conversation.form.text();
  await ctx.reply(`Ваше ім'я, ${username}`);

  await ctx.reply('Введіть дату народження:');
  const { msg: dateOfBirthMsg } = await conversation.waitUntil(
    ctx => {
      // TODO: update Date and move to config
      const dateRegExp = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{2,4}$/);
      const isDate = dateRegExp.test(ctx.msg?.text ?? '');

      return isDate;
    },
    {
      otherwise: ctx => ctx.reply('Будь-ласка введіть правильну дату. Наприклад 09.12.2023'),
    },
  );
  if (!dateOfBirthMsg) throw new Error('incorrect date of birth');
  const dateOfBirth = dateOfBirthMsg.text;

  await ctx.reply(`Дата народження, ${dateOfBirth}`);

  await ctx.reply('Введіть ваш номер телефону:');
  const {
    msg: { text: phone },
  } = await conversation.waitFor('msg::phone_number', {
    otherwise: ctx => ctx.reply('Будь-ласка введіть вірний номер телефону. +380123456789'),
  });
  await ctx.reply(`Ваш номер телефону, ${phone}`);

  const regions = await getRegions();
  const translatedRegions = getListUARegions(regions);
  const usersRegions = `\n- ${translatedRegions.join('\n- ')}`;
  await ctx.reply(`Виберіть область проживання:${usersRegions}`);
  const region = await conversation.form.select(translatedRegions, ctx =>
    ctx.reply(`Будь-ласка виберіть регіон або місто зі списку:${usersRegions}`),
  );
  await ctx.reply(`Область проживання, ${region}`);

  await ctx.reply('Чи хочете ви взяти участь у програмі «Помічник ветерана»?');
  const takePartInProject = await conversation.form.select(['Так', 'Ні']);
  await ctx.reply(`Ви сказали ${takePartInProject} на участь в проекті`);

  const finalMessage = `Ім'я: ${username}\nДата народження: ${dateOfBirth}\nВаш номер телефону, ${phone}\nОбласть проживання: ${region}\nВи сказали ${takePartInProject} на участь в проекті`;
  await ctx.reply(`Перевірте, чи все вірно вказано:\n\n${finalMessage}`);

  await createUser({ username, dateOfBirth, phone, region, takePartInProject });
  await ctx.reply(`Вітаємо🎉\n Ви зареєстровані в програмі <b>Помічник ветерана</b>`);

  // await ctx.conversation.exit();
};
