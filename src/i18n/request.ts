import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import messages from '@/data/legacy/messages.json';
import {defaultLocale, locales} from './config';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;
  return {locale, messages: messages[locale]};
});

