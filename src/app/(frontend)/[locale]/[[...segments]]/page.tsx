import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {HomePage} from '@/components/pages/HomePage';
import {AboutPage} from '@/components/pages/AboutPage';
import {ContactPage} from '@/components/pages/ContactPage';
import {EventsPage} from '@/components/pages/EventsPage';
import {TripPage} from '@/components/pages/TripPage';
import {ActivityPage} from '@/components/pages/ActivityPage';
import {getActivities, getActivityBySlug, getActivityLocalizedPaths} from '@/lib/content/activities';
import {dictionary} from '@/lib/content/messages';
import {isLocale, localizedPath, paths, type Locale, type PageKey} from '@/i18n/config';

type Props = {params: Promise<{locale: string; segments?: string[]}>};

async function resolve(locale: Locale, segments: string[] = []) {
  if (segments.length === 0) return {type: 'home' as const};
  for (const key of ['about','contact','events','trip'] as const) if (segments.length === 1 && segments[0] === paths[key][locale]) return {type: key};
  if (segments.length === 2 && segments[0] === paths.activities[locale]) {
    const activity = await getActivityBySlug(locale, segments[1]);
    if (activity) return {type: 'activity' as const, activity};
  }
  return null;
}

export async function generateStaticParams() {
  const result: {locale: Locale; segments?: string[]}[] = [];
  for (const locale of ['en','es','fr','de'] as const) {
    result.push({locale});
    for (const key of ['about','contact','events','trip'] as const) result.push({locale, segments: [paths[key][locale]]});
    for (const activity of await getActivities(locale)) result.push({locale, segments: [paths.activities[locale], activity.slug]});
  }
  return result;
}

function pageAlternates(page?: PageKey) {
  return Object.fromEntries((['en','es','fr','de'] as const).map((locale) => [locale, localizedPath(locale,page)]));
}

async function activityAlternates(code: string) {
  const slugs = await getActivityLocalizedPaths(code);
  return Object.fromEntries(Object.entries(slugs).map(([locale, slug]) => [locale, `${localizedPath(locale as Locale,'activities')}/${slug}`]));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale: rawLocale, segments} = await params; if (!isLocale(rawLocale)) return {};
  const locale = rawLocale; const t = dictionary(locale); const page = await resolve(locale, segments);
  if (!page) return {};
  if (page.type === 'activity') {
    const title = page.activity.seoTitle ?? `${page.activity.title} | No1 Excursiones`;
    const description = page.activity.seoDescription ?? page.activity.summary;
    return {title, description, robots: {index: page.activity.index, follow: page.activity.index}, alternates: {canonical: page.activity.canonical ?? `${localizedPath(locale,'activities')}/${page.activity.slug}`, languages: await activityAlternates(page.activity.code)}, openGraph: {title, description, images: [page.activity.image]}};
  }
  const key = page.type === 'home' ? 'home' : page.type; const pageKey = page.type === 'home' ? undefined : page.type as PageKey;
  return {title: t[`${key}Title`], description: t[`${key}Meta`], alternates: {canonical: localizedPath(locale,pageKey), languages: pageAlternates(pageKey)}};
}

export default async function LocalizedPage({params}: Props) {
  const {locale: rawLocale, segments} = await params; if (!isLocale(rawLocale)) notFound();
  const page = await resolve(rawLocale, segments); if (!page) notFound();
  switch (page.type) {
    case 'home': return <HomePage locale={rawLocale}/>;
    case 'about': return <AboutPage locale={rawLocale}/>;
    case 'contact': return <ContactPage locale={rawLocale}/>;
    case 'events': return <EventsPage locale={rawLocale}/>;
    case 'trip': return <TripPage locale={rawLocale}/>;
    case 'activity': return <ActivityPage locale={rawLocale} activity={page.activity}/>;
  }
}
