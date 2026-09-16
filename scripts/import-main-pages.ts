import { getPayload } from "payload";
import config from "../src/payload.config";
import messages from "../src/i18n/messages.json";
import { mainPageKeys, type MainPageKey } from "../src/collections/Pages";
import type { Locale } from "../src/i18n/config";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is required to import Payload content.");

const payload = await getPayload({ config });
const locales: Locale[] = ["en", "es", "fr", "de"];
const heroImages: Record<MainPageKey, string> = {
  home: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  about:
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80",
  contact:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  events:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
  trip: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
};

async function createMediaFromURL(
  url: string,
  filename: string,
  alt: string,
): Promise<number> {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    locale: "en",
  });
  if (existing.docs[0]) return existing.docs[0].id;

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Could not download ${url}: ${response.status} ${response.statusText}`,
    );
  const data = Buffer.from(await response.arrayBuffer());
  const mimetype =
    response.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  const media = await payload.create({
    collection: "media",
    locale: "en",
    context: { skipRevalidation: true },
    data: { alt },
    file: { data, mimetype, name: filename, size: data.length },
  });
  return media.id;
}

function pageData(locale: Locale, pageKey: MainPageKey, image: number) {
  const t = messages[locale];
  const common = {
    pageKey,
    hero: {
      eyebrow: t[`${pageKey}Eyebrow`],
      title: t[`${pageKey}HeroTitle`],
      text: t[`${pageKey}HeroText`],
      image,
    },
    seo: {
      title: t[`${pageKey}Title`],
      description: t[`${pageKey}Meta`],
      index: true,
    },
    _status: "published" as const,
  };
  switch (pageKey) {
    case "home":
      return {
        ...common,
        featureItems: [1, 2, 3].map((index) => ({
          title: t[`homeFeature${index}Title` as keyof typeof t],
          text: t[`homeFeature${index}Text` as keyof typeof t],
        })),
        primarySection: {
          kicker: t.homeActivitiesKicker,
          title: t.homeActivitiesTitle,
        },
        secondarySection: {
          kicker: t.homeWaysKicker,
          title: t.homeWaysTitle,
          text: t.homeWaysText,
        },
        cards: [
          {
            title: t.homeDirectTitle,
            text: t.homeDirectText,
            buttonLabel: t.homeDirectCta,
            target: "activities" as const,
          },
          {
            title: t.homeCallTitle,
            text: t.homeCallText,
            buttonLabel: t.homeCallSmallCta,
            target: "trip" as const,
          },
        ],
      };
    case "about":
      return {
        ...common,
        primarySection: {
          kicker: t.aboutKicker,
          title: t.aboutSectionTitle,
          lead: t.aboutLead,
          body: t.aboutText,
        },
        details: [
          { label: t.aboutDestination, value: t.aboutDestinationValue },
          { label: t.aboutSpecialty, value: t.aboutSpecialtyValue },
          { label: t.aboutFocus, value: t.aboutFocusValue },
        ],
        cta: { kicker: t.aboutCtaKicker, title: t.aboutCtaTitle },
      };
    case "contact":
      return {
        ...common,
        primarySection: {
          kicker: t.contactDetails,
          title: t.contactSectionTitle,
        },
        details: [
          { label: t.contactEmail, value: "hola@no1excursiones.com" },
          { label: t.contactPhone, value: "TODO" },
          { label: t.contactHours, value: t.contactHoursValue },
        ],
      };
    case "events":
      return {
        ...common,
        primarySection: {
          kicker: t.eventsBoardKicker,
          title: t.eventsBoardTitle,
        },
      };
    case "trip":
      return {
        ...common,
        primarySection: {
          kicker: t.tripKicker,
          title: t.tripSectionTitle,
          lead: t.tripSectionText,
        },
        details: [
          { label: t.tripDuration, value: t.tripDurationValue },
          { label: t.tripFormat, value: t.tripFormatValue },
          { label: t.tripResult, value: t.tripResultValue },
        ],
        secondarySection: {
          kicker: t.tripFormKicker,
          title: t.tripFormTitle,
          text: t.tripFormIntro,
        },
      };
  }
}

for (const pageKey of mainPageKeys) {
  const image = await createMediaFromURL(
    heroImages[pageKey],
    `main-page-${pageKey}.jpg`,
    `${pageKey} hero`,
  );
  const existing = await payload.find({
    collection: "pages",
    where: { pageKey: { equals: pageKey } },
    limit: 1,
    locale: "en",
  });
  let id = existing.docs[0]?.id;
  for (const locale of locales) {
    const data = pageData(locale, pageKey, image);
    if (!id) {
      const created = await payload.create({
        collection: "pages",
        locale,
        data,
        context: { skipRevalidation: true },
      });
      id = created.id;
    } else {
      await payload.update({
        collection: "pages",
        id,
        locale,
        data,
        context: { skipRevalidation: true },
      });
    }
  }
  payload.logger.info(`Imported main page: ${pageKey}`);
}

payload.logger.info("Main page import complete. Re-running is safe.");
process.exit(0);
