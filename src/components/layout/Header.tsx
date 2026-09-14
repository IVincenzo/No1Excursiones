import type {Locale} from '@/i18n/config';
import {getActivities} from '@/lib/content/activities';
import {dictionary} from '@/lib/content/messages';
import {HeaderClient} from './HeaderClient';

export async function Header({locale}: {locale: Locale}) {
  const t = dictionary(locale);
  const activities = (await getActivities(locale)).map(({code, slug, title}) => ({code, slug, title}));
  return <HeaderClient locale={locale} activities={activities} labels={{home: t.navHome, activities: t.navActivities, events: t.navLocalEvents, about: t.navAbout, contact: t.navContact, trip: t.navTrip, open: t.navOpen}} />;
}
