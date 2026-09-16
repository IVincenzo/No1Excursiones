import type {MetadataRoute} from 'next';
import {getActivities} from '@/lib/content/activities';
import {localizedPath, type Locale} from '@/i18n/config';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'; const locales: Locale[] = ['en','es','fr','de']; const urls: string[] = [];
  for (const locale of locales) {
    const activities = await getActivities(locale);
    urls.push(localizedPath(locale), ...(['about','contact','events','trip'] as const).map((page) => localizedPath(locale,page)), ...activities.filter((activity) => activity.index).map((activity) => `${localizedPath(locale,'activities')}/${activity.slug}`));
  }
  return urls.map((url) => ({url: `${base}${url}`, changeFrequency: 'weekly', priority: url.split('/').length === 2 ? 1 : .7}));
}
