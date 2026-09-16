import type { Locale } from "./config";

export const legacyActivityRedirects: Record<string, Record<Locale, string>> = {
  adventure: {
    en: "adventure",
    es: "aventura",
    fr: "aventure",
    de: "abenteuer",
  },
  "boat-trips": {
    en: "boat-trips",
    es: "excursiones-en-barco",
    fr: "sorties-en-bateau",
    de: "bootsausfluege",
  },
  "cultural-visits": {
    en: "cultural-visits",
    es: "visitas-culturales",
    fr: "visites-culturelles",
    de: "kulturelle-besuche",
  },
  discoveries: {
    en: "discoveries",
    es: "descubrimientos",
    fr: "decouvertes",
    de: "entdeckungen",
  },
  explorations: {
    en: "explorations",
    es: "exploraciones",
    fr: "explorations",
    de: "erkundungen",
  },
  gastronomy: {
    en: "gastronomy",
    es: "gastronomia",
    fr: "gastronomie",
    de: "gastronomie",
  },
  "island-routes": {
    en: "island-routes",
    es: "rutas-por-la-isla",
    fr: "routes-autour-de-l-ile",
    de: "routen-ueber-die-insel",
  },
  "scuba-diving": {
    en: "scuba-diving",
    es: "buceo",
    fr: "plongee",
    de: "tauchen",
  },
  "water-sports": {
    en: "water-sports",
    es: "deportes-acuaticos",
    fr: "sports-nautiques",
    de: "wassersport",
  },
};
