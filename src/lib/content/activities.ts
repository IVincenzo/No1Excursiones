import { locales, type Locale } from "@/i18n/config";
import type { LocalizedActivity } from "@/types/activity";

async function getPayloadActivities(
  locale: Locale,
  draft = false,
): Promise<LocalizedActivity[]> {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@/payload.config"),
  ]);
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "activities",
    locale,
    fallbackLocale: false,
    draft,
    overrideAccess: draft,
    where: draft ? undefined : { _status: { equals: "published" } },
    limit: 100,
    depth: 1,
  });
  return result.docs.flatMap((doc) => {
    if (
      ![doc.slug, doc.title, doc.shortDescription, doc.description].every(
        (value) => typeof value === "string" && value.trim().length > 0,
      )
    )
      return [];
    const firstImage =
      Array.isArray(doc.images) && typeof doc.images[0] === "object"
        ? doc.images[0].url
        : null;
    const image = firstImage;
    if (!image) return [];
    return [
      {
        code: doc.code,
        slug: doc.slug,
        image,
        priceFromMinor: doc.priceFromMinor ?? 0,
        currency: doc.currency ?? "EUR",
        bookingProvider: doc.bookingProvider,
        title: doc.title,
        badge: doc.badge ?? "",
        duration: doc.duration ?? "",
        summary: doc.shortDescription,
        intro: doc.description,
        highlights: doc.highlights?.map((item) => item.item) ?? [],
        seoTitle: doc.seo?.title ?? undefined,
        seoDescription: doc.seo?.description ?? undefined,
        canonical: doc.seo?.canonical ?? undefined,
        index: doc.seo?.index ?? true,
      },
    ];
  });
}

export async function getActivities(
  locale: Locale,
): Promise<LocalizedActivity[]> {
  return getPayloadActivities(locale);
}

export async function getActivityBySlug(
  locale: Locale,
  slug: string,
  draft = false,
): Promise<LocalizedActivity | undefined> {
  return (await getPayloadActivities(locale, draft)).find(
    (activity) => activity.slug === slug,
  );
}

export async function getActivityByCode(
  locale: Locale,
  code: string,
): Promise<LocalizedActivity | undefined> {
  return (await getPayloadActivities(locale)).find(
    (activity) => activity.code === code,
  );
}

export async function getActivityLocalizedPaths(
  code: string,
): Promise<Partial<Record<Locale, string>>> {
  const paths: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    const activity = await getActivityByCode(locale, code);
    if (activity) paths[locale] = activity.slug;
  }
  return paths;
}
