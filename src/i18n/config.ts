export const locales = ['en', 'es', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const paths = {
  activities: {en: 'activities', es: 'actividades', fr: 'activites', de: 'aktivitaeten'},
  events: {en: 'events', es: 'eventos', fr: 'evenements', de: 'veranstaltungen'},
  about: {en: 'about', es: 'sobre-nosotros', fr: 'a-propos', de: 'ueber-uns'},
  contact: {en: 'contact', es: 'contacto', fr: 'contact', de: 'kontakt'},
  trip: {en: 'plan-your-trip', es: 'organiza-tu-viaje', fr: 'organisez-votre-voyage', de: 'reise-planen'},
} as const;

export type PageKey = keyof typeof paths;

export function localizedPath(locale: Locale, page?: PageKey): string {
  return page ? `/${locale}/${paths[page][locale]}` : `/${locale}`;
}

