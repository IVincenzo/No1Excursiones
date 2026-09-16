import type { Locale } from "@/i18n/config";
import type { MainPageKey } from "@/collections/Pages";

export interface MainPageContent {
  pageKey: MainPageKey;
  hero?: { eyebrow?: string; title?: string; text?: string; image?: string };
  featureItems?: { title: string; text: string }[];
  primarySection?: {
    kicker?: string;
    title?: string;
    lead?: string;
    body?: string;
  };
  details?: { label: string; value: string }[];
  secondarySection?: { kicker?: string; title?: string; text?: string };
  cards?: {
    title: string;
    text: string;
    buttonLabel: string;
    target: "activities" | "trip" | "contact";
  }[];
  cta?: { kicker?: string; title?: string; text?: string };
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    index?: boolean;
  };
}

function clean<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

export async function getMainPage(
  locale: Locale,
  pageKey: MainPageKey,
  draft = false,
): Promise<MainPageContent | undefined> {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@/payload.config"),
  ]);
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    locale,
    fallbackLocale: false,
    draft,
    overrideAccess: draft,
    limit: 1,
    depth: 1,
    where: draft
      ? { pageKey: { equals: pageKey } }
      : {
          and: [
            { pageKey: { equals: pageKey } },
            { _status: { equals: "published" } },
          ],
        },
  });
  const doc = result.docs[0];
  if (!doc) return undefined;
  const uploadedImage =
    doc.hero?.image && typeof doc.hero.image === "object"
      ? doc.hero.image.url
      : undefined;
  return {
    pageKey,
    hero: doc.hero
      ? {
          eyebrow: clean(doc.hero.eyebrow),
          title: clean(doc.hero.title),
          text: clean(doc.hero.text),
          image: clean(uploadedImage),
        }
      : undefined,
    featureItems:
      doc.featureItems?.map((item) => ({
        title: item.title,
        text: item.text,
      })) ?? undefined,
    primarySection: doc.primarySection
      ? {
          kicker: clean(doc.primarySection.kicker),
          title: clean(doc.primarySection.title),
          lead: clean(doc.primarySection.lead),
          body: clean(doc.primarySection.body),
        }
      : undefined,
    details:
      doc.details?.map((item) => ({ label: item.label, value: item.value })) ??
      undefined,
    secondarySection: doc.secondarySection
      ? {
          kicker: clean(doc.secondarySection.kicker),
          title: clean(doc.secondarySection.title),
          text: clean(doc.secondarySection.text),
        }
      : undefined,
    cards:
      doc.cards?.map((item) => ({
        title: item.title,
        text: item.text,
        buttonLabel: item.buttonLabel,
        target: item.target,
      })) ?? undefined,
    cta: doc.cta
      ? {
          kicker: clean(doc.cta.kicker),
          title: clean(doc.cta.title),
          text: clean(doc.cta.text),
        }
      : undefined,
    seo: doc.seo
      ? {
          title: clean(doc.seo.title),
          description: clean(doc.seo.description),
          canonical: clean(doc.seo.canonical),
          index: doc.seo.index ?? true,
        }
      : undefined,
  };
}
