import 'server-only';

const dictionaries = {
  en: () => import('./public/locales/en/translation.json').then((module) => module.default),
  ar: () => import('./public/locales/ar/translation.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.ar();
};