import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { EventsPage } from "@/components/pages/EventsPage";
import { TripPage } from "@/components/pages/TripPage";
import { ActivityPage } from "@/components/pages/ActivityPage";
import {
  getActivities,
  getActivityBySlug,
  getActivityLocalizedPaths,
} from "@/lib/content/activities";
import { dictionary } from "@/lib/content/messages";
import { getMainPage } from "@/lib/content/pages";
import { getEvents } from "@/lib/content/events";
import {
  isLocale,
  localizedPath,
  paths,
  type Locale,
  type PageKey,
} from "@/i18n/config";
import { draftMode } from "next/headers";
import { RefreshRouteOnSave } from "@/components/common/RefreshRouteOnSave";

type Props = { params: Promise<{ locale: string; segments?: string[] }> };

async function resolve(locale: Locale, segments: string[] = [], draft = false) {
  if (segments.length === 0) return { type: "home" as const };
  for (const key of ["about", "contact", "events", "trip"] as const)
    if (segments.length === 1 && segments[0] === paths[key][locale])
      return { type: key };
  if (segments.length === 2 && segments[0] === paths.activities[locale]) {
    const activity = await getActivityBySlug(locale, segments[1], draft);
    if (activity) return { type: "activity" as const, activity };
  }
  return null;
}

export async function generateStaticParams() {
  const result: { locale: Locale; segments?: string[] }[] = [];
  for (const locale of ["en", "es", "fr", "de"] as const) {
    result.push({ locale });
    for (const key of ["about", "contact", "events", "trip"] as const)
      result.push({ locale, segments: [paths[key][locale]] });
    for (const activity of await getActivities(locale))
      result.push({
        locale,
        segments: [paths.activities[locale], activity.slug],
      });
  }
  return result;
}

function pageAlternates(page?: PageKey) {
  return Object.fromEntries(
    (["en", "es", "fr", "de"] as const).map((locale) => [
      locale,
      localizedPath(locale, page),
    ]),
  );
}

async function activityAlternates(code: string) {
  const slugs = await getActivityLocalizedPaths(code);
  return Object.fromEntries(
    Object.entries(slugs).map(([locale, slug]) => [
      locale,
      `${localizedPath(locale as Locale, "activities")}/${slug}`,
    ]),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, segments } = await params;
  if (!isLocale(rawLocale)) return {};
  const { isEnabled: draft } = await draftMode();
  const locale = rawLocale;
  const t = dictionary(locale);
  const page = await resolve(locale, segments, draft);
  if (!page) return {};
  if (page.type === "activity") {
    const title =
      page.activity.seoTitle ?? `${page.activity.title} | No1 Excursiones`;
    const description = page.activity.seoDescription ?? page.activity.summary;
    return {
      title,
      description,
      robots: {
        index: draft ? false : page.activity.index,
        follow: draft ? false : page.activity.index,
      },
      alternates: {
        canonical:
          page.activity.canonical ??
          `${localizedPath(locale, "activities")}/${page.activity.slug}`,
        languages: await activityAlternates(page.activity.code),
      },
      openGraph: { title, description, images: [page.activity.image] },
    };
  }
  const key = page.type === "home" ? "home" : page.type;
  const pageKey = page.type === "home" ? undefined : (page.type as PageKey);
  const content = await getMainPage(locale, key, draft);
  return {
    title: content?.seo?.title ?? t[`${key}Title`],
    description: content?.seo?.description ?? t[`${key}Meta`],
    robots: draft
      ? { index: false, follow: false }
      : content?.seo
        ? { index: content.seo.index, follow: content.seo.index }
        : undefined,
    alternates: {
      canonical: content?.seo?.canonical ?? localizedPath(locale, pageKey),
      languages: pageAlternates(pageKey),
    },
  };
}

export default async function LocalizedPage({ params }: Props) {
  const { locale: rawLocale, segments } = await params;
  if (!isLocale(rawLocale)) notFound();
  const { isEnabled: draft } = await draftMode();
  const page = await resolve(rawLocale, segments, draft);
  if (!page) notFound();
  const editablePage =
    page.type === "activity"
      ? undefined
      : await getMainPage(rawLocale, page.type, draft);
  const preview = draft ? <RefreshRouteOnSave /> : null;
  switch (page.type) {
    case "home":
      return (
        <>
          {preview}
          <HomePage locale={rawLocale} page={editablePage} />
        </>
      );
    case "about":
      return (
        <>
          {preview}
          <AboutPage locale={rawLocale} page={editablePage} />
        </>
      );
    case "contact":
      return (
        <>
          {preview}
          <ContactPage locale={rawLocale} page={editablePage} />
        </>
      );
    case "events":
      return (
        <>
          {preview}
          <EventsPage
            events={await getEvents(rawLocale, draft)}
            locale={rawLocale}
            page={editablePage}
          />
        </>
      );
    case "trip":
      return (
        <>
          {preview}
          <TripPage locale={rawLocale} page={editablePage} />
        </>
      );
    case "activity":
      return (
        <>
          {preview}
          <ActivityPage locale={rawLocale} activity={page.activity} />
        </>
      );
  }
}
