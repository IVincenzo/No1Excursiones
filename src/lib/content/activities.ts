import type {Locale} from '@/i18n/config';
import type {LocalizedActivity} from '@/types/activity';
import {getActivities as getStaticActivities, getActivityBySlug as getStaticActivityBySlug} from '@/data/legacy/activities';

export async function getActivities(locale: Locale): Promise<LocalizedActivity[]> {
  return getStaticActivities(locale);
}

export async function getActivityBySlug(locale: Locale, slug: string): Promise<LocalizedActivity | undefined> {
  return getStaticActivityBySlug(locale, slug);
}
