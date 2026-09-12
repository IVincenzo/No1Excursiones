import {getPayload} from 'payload';
import config from '../src/payload.config';
import {activities} from '../src/data/legacy/activities';
import type {Locale} from '../src/i18n/config';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required to import legacy content.');
const payload = await getPayload({config});
const locales: Locale[] = ['en', 'es', 'fr', 'de'];

for (const activity of activities) {
  const existing = await payload.find({collection: 'activities', where: {code: {equals: activity.code}}, limit: 1, locale: 'en'});
  let id = existing.docs[0]?.id;
  for (const locale of locales) {
    const text = activity.translations[locale];
    const data = {
      code: activity.code,
      slug: activity.slug[locale],
      title: text.title,
      shortDescription: text.summary,
      badge: text.badge,
      description: text.intro,
      duration: text.duration,
      highlights: text.highlights.map((item) => ({item})),
      priceFromMinor: activity.priceFromMinor,
      currency: activity.currency,
      bookingProvider: 'mock' as const,
      legacyImageUrl: activity.image,
      seo: {title: text.title, description: text.summary, index: false},
      _status: 'published' as const,
    };
    if (!id) {
      const created = await payload.create({collection: 'activities', locale, data});
      id = created.id;
    } else {
      await payload.update({collection: 'activities', id, locale, data});
    }
  }
  payload.logger.info(`Imported legacy activity: ${activity.code}`);
}

payload.logger.info('Legacy activity import complete. Re-running is safe.');
process.exit(0);
