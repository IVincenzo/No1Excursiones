export interface LocalizedActivity {
  code: string;
  slug: string;
  image: string;
  priceFromMinor: number;
  currency: "EUR";
  bookingProvider: "mock" | "manual" | "bokun" | "fareharbor" | "rezdy";
  title: string;
  badge: string;
  duration: string;
  summary: string;
  intro: string;
  highlights: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  index: boolean;
}
