import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context, NextFunction } from 'grammy';

import registration from './registration';

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

const exitRegistration = async (ctx: MyContext, next?: NextFunction) => {
  const activeConversations = await ctx.conversation.active();
  const isRegistration = activeConversations['registration'];
  console.log('isRegistration', isRegistration);
  if (isRegistration) {
    await ctx.conversation.exit('registration');
  }
  next && await next();
};

export default {
  registration,
  exitRegistration,
};
