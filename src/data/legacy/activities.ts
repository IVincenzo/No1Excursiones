import rawActivities from './activities.json';
import type {Activity, ActivityTranslation, LocalizedActivity} from '@/types/activity';
import type {Locale} from '@/i18n/config';

const localizedSlugs: Record<string, Record<Locale, string>> = {
  'boat-trips': {en: 'boat-trips', es: 'excursiones-en-barco', fr: 'sorties-en-bateau', de: 'bootsausfluege'},
  'scuba-diving': {en: 'scuba-diving', es: 'buceo', fr: 'plongee', de: 'tauchen'},
  explorations: {en: 'explorations', es: 'exploraciones', fr: 'explorations', de: 'erkundungen'},
  adventure: {en: 'adventure', es: 'aventura', fr: 'aventure', de: 'abenteuer'},
  'island-routes': {en: 'island-routes', es: 'rutas-por-la-isla', fr: 'routes-autour-de-l-ile', de: 'routen-ueber-die-insel'},
  'water-sports': {en: 'water-sports', es: 'deportes-acuaticos', fr: 'sports-nautiques', de: 'wassersport'},
  gastronomy: {en: 'gastronomy', es: 'gastronomia', fr: 'gastronomie', de: 'gastronomie'},
  discoveries: {en: 'discoveries', es: 'descubrimientos', fr: 'decouvertes', de: 'entdeckungen'},
  'cultural-visits': {en: 'cultural-visits', es: 'visitas-culturales', fr: 'visites-culturelles', de: 'kulturelle-besuche'},
};

type RawActivity = {
  slug: string;
  image: string;
  priceFrom: number;
  translations: Record<Locale, ActivityTranslation>;
};

export const activities: Activity[] = (rawActivities as RawActivity[]).map((activity) => ({
  code: activity.slug,
  slug: localizedSlugs[activity.slug],
  image: activity.image,
  priceFromMinor: activity.priceFrom * 100,
  currency: 'EUR',
  bookingProvider: 'mock',
  translations: activity.translations,
}));

export function getActivities(locale: Locale): LocalizedActivity[] {
  return activities.map((activity) => ({
    ...activity,
    slug: activity.slug[locale],
    ...activity.translations[locale],
    index: true,
  }));
}

export function getActivityBySlug(locale: Locale, slug: string): LocalizedActivity | undefined {
  return getActivities(locale).find((activity) => activity.slug === slug);
}

export function getActivityByCode(locale: Locale, code: string): LocalizedActivity | undefined {
  return getActivities(locale).find((activity) => activity.code === code);
}
