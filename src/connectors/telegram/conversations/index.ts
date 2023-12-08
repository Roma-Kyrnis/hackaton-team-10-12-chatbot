import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context } from 'grammy';

import registration from './registration';

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

export default {
  registration,
};
