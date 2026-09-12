import {ActivityCard} from './ActivityCard';
import {getActivities} from '@/lib/content/activities';
import type {Locale} from '@/i18n/config';
import {dictionary} from '@/lib/content/messages';

export async function ActivityGrid({locale}: {locale: Locale}) {
  const t = dictionary(locale);
  return <div className="row g-4">{(await getActivities(locale)).map((activity) => <ActivityCard key={activity.code} activity={activity} locale={locale} from={t.activityFrom} />)}</div>;
}
