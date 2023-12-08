import { Bot } from 'grammy';

import config from '../../config';
import { MyContext } from './conversations';

export default new Bot<MyContext>(config.env.TELEGRAM_TOKEN);
