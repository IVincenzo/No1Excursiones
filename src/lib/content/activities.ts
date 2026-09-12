import type {Locale} from '@/i18n/config';
import type {LocalizedActivity} from '@/types/activity';
import {getActivities as getStaticActivities, getActivityBySlug as getStaticActivityBySlug} from '@/data/legacy/activities';

function source() { return process.env.CONTENT_SOURCE ?? 'static'; }

async function getPayloadActivities(locale: Locale): Promise<LocalizedActivity[]> {
  const [{getPayload}, {default: config}] = await Promise.all([import('payload'), import('@/payload.config')]);
  const payload = await getPayload({config});
  const result = await payload.find({collection: 'activities', locale, fallbackLocale: false, where: {_status: {equals: 'published'}}, limit: 100, depth: 1});
  return result.docs.flatMap((doc) => {
    const firstImage = Array.isArray(doc.images) && typeof doc.images[0] === 'object' ? doc.images[0].url : null;
    const image = doc.legacyImageUrl ?? firstImage;
    if (!image) return [];
    return [{code: doc.code, slug: doc.slug, image, priceFromMinor: doc.priceFromMinor ?? 0, currency: doc.currency ?? 'EUR', bookingProvider: doc.bookingProvider, title: doc.title, badge: doc.badge ?? '', duration: doc.duration ?? '', summary: doc.shortDescription, intro: doc.description, highlights: doc.highlights?.map((item) => item.item) ?? []}];
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
