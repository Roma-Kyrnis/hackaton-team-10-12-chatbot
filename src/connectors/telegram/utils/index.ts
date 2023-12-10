export const stringToMarkdownV2 = (str: string) =>
  str.replaceAll(/[.\-!]/g, subscribe => `\\${subscribe}`);
