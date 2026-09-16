import type { Locale } from "@/i18n/config";

export interface LocalizedEvent {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  location?: string;
  isVerified: boolean;
}

export async function getEvents(
  locale: Locale,
  draft = false,
): Promise<LocalizedEvent[]> {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@/payload.config"),
  ]);
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "events",
    locale,
    fallbackLocale: false,
    draft,
    overrideAccess: draft,
    limit: 100,
    sort: "startsAt",
    where: draft ? undefined : { _status: { equals: "published" } },
  });
  return result.docs.flatMap((doc) => {
    if (
      ![doc.title, doc.description, doc.startsAt].every(
        (value) => typeof value === "string" && value.trim(),
      )
    )
      return [];
    return [
      {
        id: String(doc.id),
        title: doc.title,
        description: doc.description,
        startsAt: doc.startsAt,
        endsAt: doc.endsAt ?? undefined,
        location: doc.location ?? undefined,
        isVerified: doc.isVerified ?? false,
      },
    ];
  });
}
