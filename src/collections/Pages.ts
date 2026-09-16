import type { CollectionConfig, Field } from "payload";
import { localizedPath, locales, type Locale } from "@/i18n/config";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "@/lib/content/revalidation";
import { authenticated, publishedOrAuthenticated } from "./access";

export const mainPageKeys = [
  "home",
  "about",
  "contact",
  "events",
  "trip",
] as const;
export type MainPageKey = (typeof mainPageKeys)[number];

const pageOptions = [
  { label: "Home", value: "home" },
  { label: "About us", value: "about" },
  { label: "Contact", value: "contact" },
  { label: "Local Events", value: "events" },
  { label: "Plan your trip", value: "trip" },
];

const localizedText = (
  name: string,
  label: string,
  required = false,
): Field => ({
  name,
  label,
  type: "text",
  localized: true,
  required,
});

const localizedTextarea = (
  name: string,
  label: string,
  required = false,
): Field => ({
  name,
  label,
  type: "textarea",
  localized: true,
  required,
});

function localeCode(locale: unknown): Locale {
  const value =
    typeof locale === "string"
      ? locale
      : locale && typeof locale === "object" && "code" in locale
        ? String(locale.code)
        : "en";
  return locales.includes(value as Locale) ? (value as Locale) : "en";
}

function pagePath(pageKey: unknown, locale: unknown): string | null {
  if (!mainPageKeys.includes(pageKey as MainPageKey)) return null;
  const key = pageKey as MainPageKey;
  const resolvedLocale = localeCode(locale);
  return key === "home"
    ? localizedPath(resolvedLocale)
    : localizedPath(resolvedLocale, key);
}

function draftPreviewURL(path: string): string {
  return `/api/preview?${new URLSearchParams({ path }).toString()}`;
}

const seoFields: Field = {
  name: "seo",
  label: "Référencement",
  type: "group",
  fields: [
    localizedText("title", "Titre SEO"),
    localizedTextarea("description", "Description SEO"),
    localizedText("canonical", "URL canonique"),
    {
      name: "index",
      label: "Autoriser l’indexation",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Main page", plural: "Main pages" },
  admin: {
    group: "Editorial",
    useAsTitle: "pageKey",
    defaultColumns: ["pageKey", "_status", "updatedAt"],
    description:
      "The five main website pages. Switch language at the top of the editor to update each translation.",
    preview: (doc, { locale }) => {
      const path = pagePath(doc.pageKey, locale);
      return path ? draftPreviewURL(path) : null;
    },
    livePreview: {
      openByDefault: true,
      url: ({ data, locale }) => {
        const path = pagePath(data.pageKey, locale);
        return path ? draftPreviewURL(path) : null;
      },
      breakpoints: [
        { name: "mobile", label: "Mobile", width: 390, height: 844 },
        { name: "tablet", label: "Tablette", width: 768, height: 1024 },
        { name: "desktop", label: "Bureau", width: 1440, height: 900 },
      ],
    },
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: "pageKey",
      label: "Page",
      type: "select",
      options: pageOptions,
      required: true,
      unique: true,
      index: true,
      admin: { description: "Only one entry can exist for each main page." },
    },
    {
      name: "hero",
      label: "Bannière",
      type: "group",
      fields: [
        localizedText("eyebrow", "Sur-titre"),
        localizedText("title", "Titre", true),
        localizedTextarea("text", "Introduction", true),
        { name: "image", label: "Image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "featureItems",
      label: "Points forts (accueil)",
      type: "array",
      maxRows: 3,
      admin: { condition: (data) => data.pageKey === "home" },
      fields: [
        localizedText("title", "Titre", true),
        localizedTextarea("text", "Texte", true),
      ],
    },
    {
      name: "primarySection",
      label: "Section principale",
      type: "group",
      fields: [
        localizedText("kicker", "Sur-titre"),
        localizedText("title", "Titre"),
        localizedTextarea("lead", "Introduction"),
        localizedTextarea("body", "Texte complémentaire"),
      ],
    },
    {
      name: "details",
      label: "Informations clés",
      type: "array",
      admin: {
        condition: (data) =>
          ["about", "contact", "trip"].includes(data.pageKey),
      },
      fields: [
        localizedText("label", "Libellé", true),
        localizedText("value", "Valeur", true),
      ],
    },
    {
      name: "secondarySection",
      label: "Section secondaire",
      type: "group",
      admin: { condition: (data) => ["home", "trip"].includes(data.pageKey) },
      fields: [
        localizedText("kicker", "Sur-titre"),
        localizedText("title", "Titre"),
        localizedTextarea("text", "Texte"),
      ],
    },
    {
      name: "cards",
      label: "Cartes d’action (accueil)",
      type: "array",
      maxRows: 2,
      admin: { condition: (data) => data.pageKey === "home" },
      fields: [
        localizedText("title", "Titre", true),
        localizedTextarea("text", "Texte", true),
        localizedText("buttonLabel", "Texte du bouton", true),
        {
          name: "target",
          label: "Destination",
          type: "select",
          required: true,
          options: [
            { label: "Liste des activités", value: "activities" },
            { label: "Organiser votre voyage", value: "trip" },
            { label: "Contact", value: "contact" },
          ],
        },
      ],
    },
    {
      name: "cta",
      label: "Bandeau d’appel à l’action",
      type: "group",
      admin: { condition: (data) => data.pageKey === "about" },
      fields: [
        localizedText("kicker", "Sur-titre"),
        localizedText("title", "Titre"),
        localizedTextarea("text", "Texte"),
      ],
    },
    seoFields,
  ],
};
