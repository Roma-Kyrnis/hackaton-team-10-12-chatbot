import { Menu } from '@grammyjs/menu';
import { MyContext } from '../conversations';

const HEARING_LOSS = {
  0: 'Безкоштовні або субсидовані медичні операції для відновлення слуху, включаючи кохлеарну імплантацію',
  1: 'Доступ до високоякісних слухових апаратів за зниженими цінами',
  2: 'Консультації з аудіологами та отоларингологами для моніторингу стану слуху',
};
const visionLossMenu = new Menu<MyContext>('vision-loss');
const limbsAmputationMenu = new Menu<MyContext>('limbs-amputation');
const brainInjuriesMenu = new Menu<MyContext>('brain-injuries');
const stressDisorderMenu = new Menu<MyContext>('stress-disorder');

const whatConcernYouMenu = new Menu<MyContext>('what-concern-you')
  .text('Втрата слуху', ctx =>
    ctx.reply(
      `- ${HEARING_LOSS[0]}[]()\n\n- ${HEARING_LOSS[1]}[]()\n\n- ${HEARING_LOSS[2]}[]()\n\n`,
    ),
  )
  .row()
  .text('Втрата зору', ctx => ctx.reply(`- []()\n\n- []()\n\n- []()\n\n- []()\n\n- []()`))
  .row()
  .text('Ампутація кінцівок', ctx => ctx.reply(`- []()\n\n- []()\n\n- []()\n\n- []()\n\n- []()`))
  .row()
  .text('Контузії та інші черепно-мозкові травми', ctx =>
    ctx.reply(`- []()\n\n- []()\n\n- []()\n\n- []()\n\n- []()`),
  )
  .row()
  .text('Депресія та посттравматичний синдром', ctx =>
    ctx.reply(`- []()\n\n- []()\n\n- []()\n\n- []()\n\n- []()`),
  )
  .row()
  .back('Назад');

export default whatConcernYouMenu;
