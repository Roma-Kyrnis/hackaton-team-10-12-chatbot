import { MyContext, MyConversation } from '.';
import { createUser, getRegions } from '../../../services/backend';
import mainKeyboard from '../keyboards';

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

const getRegionEng = (region: string): string => {
  const regionT = Object.entries(regionsTranslate).find(([key, value]) => value === region);
  if (!regionT) {
    throw new Error('Не вірно вказаний регіон');
  }
  return regionT[0];
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

const ifUserEnteredCommand = async (ctx: MyContext, str: string): Promise<boolean> => {
  if (!str.startsWith('/')) {
    return false;
  }

  await ctx.reply(`${str}`);
  return true;
};

let enterConversation;

export default async (conversation: MyConversation, ctx: MyContext) => {
  if (ctx.conversation?.enter) {
    enterConversation = ctx.conversation.enter;
  }

  await ctx.reply('Введіть ваше Імя:');
  const username = await conversation.form.text();
  const isCommand = await ifUserEnteredCommand(ctx, username);
  if (isCommand) {
    return;
  }
  await ctx.reply(`Ваше ім'я, ${username}`);

  await ctx.reply('Введіть дату народження:');
  const { msg: birthdayMsg } = await conversation.waitUntil(
    ctx => {
      const date = ctx.msg?.text;
      // TODO: update Date and move to config
      const dateRegExp = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{2,4}$/);
      const isDate = dateRegExp.test(date ?? '');
      const nowYear = new Date().getFullYear();
      const year = parseInt(date?.split('.')[2] ?? nowYear.toString(), 10);

      if (nowYear - year < 16) {
        return false;
      }

      return isDate;
    },
    {
      otherwise: ctx =>
        ctx.reply(
          'Вам має бути більше 15 років. Будь-ласка введіть правильну дату. Наприклад 09.12.2023',
        ),
    },
  );
  if (!birthdayMsg) throw new Error('incorrect date of birth');
  const birthday = birthdayMsg.text;

  await ctx.reply(`Дата народження, ${birthday}`);

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
  const takePartInProject = await conversation.form.select(['Так', 'Ні'], ctx =>
    ctx.reply('Будь\\-ласка дайте відповідь *Так* або *Ні*', { parse_mode: 'MarkdownV2' }),
  );
  await ctx.reply(`Ви сказали ${takePartInProject} на участь в проекті`);

  const finalMessage = `Ім'я: ${username}\nДата народження: ${birthday}\nВаш номер телефону, ${phone}\nОбласть проживання: ${region}\nВи сказали ${takePartInProject} на участь в проекті`;
  await ctx.reply(`Перевірте, чи все вірно вказано?\n\n${finalMessage}`);

  const isEverythingCorrect = await conversation.form.select(['Так', 'Ні'], ctx =>
    ctx.reply('Будь\\-ласка дайте відповідь *Так* або *Ні*', { parse_mode: 'MarkdownV2' }),
  );

  if (isEverythingCorrect === 'Ні') {
    return enterConversation('registration');
  }

  await ctx.reply(`Вітаємо🎉\n Ви зареєстровані в програмі *Помічник ветерана*`, {
    parse_mode: 'MarkdownV2',
  });
  await ctx.reply('Повернення до головного меню', { reply_markup: mainKeyboard });

  // ctx.session = { username: { registered: true } };
  const birthdayDate = birthday && new Date(birthday.split('.').reverse().join('-')).toISOString();

  const user = {
    username,
    birthday: birthdayDate,
    phoneNumber: phone?.replace('+', ''),
    location: getRegionEng(region),
    takePartInProject: takePartInProject === 'Так',
    telegramName: ctx.from?.first_name,
    messenger: 'telegram',
    userStatus: 'veteran',
  };

  // NOT WORKING
  await createUser(user);
};
