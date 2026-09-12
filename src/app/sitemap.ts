import type {MetadataRoute} from 'next';
import {activities} from '@/data/legacy/activities';
import {localizedPath, type Locale} from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'; const locales: Locale[] = ['en','es','fr','de']; const urls: string[] = [];
  for (const locale of locales) {
    urls.push(localizedPath(locale), ...(['about','contact','events','trip'] as const).map((page) => localizedPath(locale,page)), ...activities.map((activity) => `${localizedPath(locale,'activities')}/${activity.slug[locale]}`));
  }
  return urls.map((url) => ({url: `${base}${url}`, changeFrequency: 'weekly', priority: url.split('/').length === 2 ? 1 : .7}));
}

