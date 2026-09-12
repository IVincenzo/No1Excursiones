import type {Locale} from '@/i18n/config';

const localeTags: Record<Locale, string> = {en: 'en-GB', es: 'es-ES', fr: 'fr-FR', de: 'de-DE'};

export function formatMoney(minor: number, currency: string, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {style: 'currency', currency, maximumFractionDigits: 0}).format(minor / 100);
}

