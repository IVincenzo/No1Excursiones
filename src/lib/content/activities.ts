import {locales, type Locale} from '@/i18n/config';
import type {LocalizedActivity} from '@/types/activity';
import {activities as staticDefinitions, getActivities as getStaticActivities, getActivityByCode as getStaticActivityByCode, getActivityBySlug as getStaticActivityBySlug} from '@/data/legacy/activities';

function source() {
  const configured = process.env.CONTENT_SOURCE;
  if (!configured && process.env.NODE_ENV === 'production') throw new Error('CONTENT_SOURCE must be explicitly configured in production');
  const selected = configured ?? 'static';
  if (selected === 'static' && process.env.NODE_ENV === 'production' && process.env.ENABLE_MOCK_CONTENT !== 'true') throw new Error('Static content is disabled in production');
  return selected;
}

async function getPayloadActivities(locale: Locale): Promise<LocalizedActivity[]> {
  const [{getPayload}, {default: config}] = await Promise.all([import('payload'), import('@/payload.config')]);
  const payload = await getPayload({config});
  const result = await payload.find({collection: 'activities', locale, fallbackLocale: false, overrideAccess: false, where: {_status: {equals: 'published'}}, limit: 100, depth: 1});
  return result.docs.flatMap((doc) => {
    if (![doc.slug, doc.title, doc.shortDescription, doc.description].every((value) => typeof value === 'string' && value.trim().length > 0)) return [];
    const firstImage = Array.isArray(doc.images) && typeof doc.images[0] === 'object' ? doc.images[0].url : null;
    const image = firstImage ?? doc.legacyImageUrl;
    if (!image) return [];
    return [{code: doc.code, slug: doc.slug, image, priceFromMinor: doc.priceFromMinor ?? 0, currency: doc.currency ?? 'EUR', bookingProvider: doc.bookingProvider, title: doc.title, badge: doc.badge ?? '', duration: doc.duration ?? '', summary: doc.shortDescription, intro: doc.description, highlights: doc.highlights?.map((item) => item.item) ?? [], seoTitle: doc.seo?.title ?? undefined, seoDescription: doc.seo?.description ?? undefined, canonical: doc.seo?.canonical ?? undefined, index: doc.seo?.index ?? true}];
  });
}

export async function getActivities(locale: Locale): Promise<LocalizedActivity[]> {
  if (source() === 'static') return getStaticActivities(locale);
  if (source() === 'payload') return getPayloadActivities(locale);
  throw new Error(`Unsupported CONTENT_SOURCE: ${source()}`);
}

export async function getActivityBySlug(locale: Locale, slug: string): Promise<LocalizedActivity | undefined> {
  if (source() === 'static') return getStaticActivityBySlug(locale, slug);
  return (await getPayloadActivities(locale)).find((activity) => activity.slug === slug);
}

export async function getActivityByCode(locale: Locale, code: string): Promise<LocalizedActivity | undefined> {
  if (source() === 'static') return getStaticActivityByCode(locale, code);
  return (await getPayloadActivities(locale)).find((activity) => activity.code === code);
}

export async function getActivityLocalizedPaths(code: string): Promise<Partial<Record<Locale, string>>> {
  if (source() === 'static') {
    const activity = staticDefinitions.find((item) => item.code === code);
    return activity ? Object.fromEntries(locales.map((locale) => [locale, activity.slug[locale]])) : {};
  }
  const translations = await Promise.all(locales.map(async (locale) => [locale, await getActivityByCode(locale, code)] as const));
  return Object.fromEntries(translations.flatMap(([locale, activity]) => activity ? [[locale, activity.slug]] : []));
}
