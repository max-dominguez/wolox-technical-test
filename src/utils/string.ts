export const convertToUnderscoreSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '_');
