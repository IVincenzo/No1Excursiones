import messages from '@/data/legacy/messages.json';
import type {Locale} from '@/i18n/config';

export type MessageKey = keyof (typeof messages)['en'];

export function dictionary(locale: Locale) {
  return messages[locale];
}

export function translate(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

