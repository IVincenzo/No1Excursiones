import type {Locale} from '@/i18n/config';

export interface ActivityTranslation {
  title: string;
  badge: string;
  duration: string;
  summary: string;
  intro: string;
  highlights: string[];
}

export interface Activity {
  code: string;
  slug: Record<Locale, string>;
  image: string;
  priceFromMinor: number;
  currency: 'EUR';
  bookingProvider: 'mock' | 'manual' | 'bokun' | 'fareharbor' | 'rezdy';
  translations: Record<Locale, ActivityTranslation>;
}

export interface LocalizedActivity extends Omit<Activity, 'translations' | 'slug'>, ActivityTranslation {
  slug: string;
}
