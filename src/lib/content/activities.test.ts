import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getActivities,
  getActivityByCode,
  getActivityLocalizedPaths,
} from "./activities";

const payloadMocks = vi.hoisted(() => ({
  find: vi.fn(),
  getPayload: vi.fn(),
}));

vi.mock("payload", () => ({
  buildConfig: (config: unknown) => config,
  getPayload: payloadMocks.getPayload,
}));
vi.mock("@/payload.config", () => ({ default: {} }));

beforeEach(() => {
  payloadMocks.find.mockReset();
  payloadMocks.getPayload.mockResolvedValue({ find: payloadMocks.find });
});

describe("activity content repository", () => {
  it("maps published Payload documents to localized activities", async () => {
    payloadMocks.find.mockResolvedValue({
      docs: [
        {
          id: 1,
          code: "boat-trips",
          slug: "boat-trips",
          title: "Boat trips",
          shortDescription: "Sail Tenerife",
          description: "A fuller description",
          badge: "Sea",
          duration: "3 hours",
          images: [{ url: "/media/boat.jpg" }],
          priceFromMinor: 5900,
          currency: "EUR",
          bookingProvider: "mock",
          highlights: [{ item: "Small groups" }],
          seo: {
            title: "Boat trips SEO",
            description: "Boat trips meta",
            canonical: "/en/activities/boat-trips",
            index: true,
          },
        },
      ],
    });

    await expect(getActivities("en")).resolves.toEqual([
      {
        code: "boat-trips",
        slug: "boat-trips",
        image: "/media/boat.jpg",
        priceFromMinor: 5900,
        currency: "EUR",
        bookingProvider: "mock",
        title: "Boat trips",
        badge: "Sea",
        duration: "3 hours",
        summary: "Sail Tenerife",
        intro: "A fuller description",
        highlights: ["Small groups"],
        seoTitle: "Boat trips SEO",
        seoDescription: "Boat trips meta",
        canonical: "/en/activities/boat-trips",
        index: true,
      },
    ]);
    expect(payloadMocks.find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "activities", locale: "en" }),
    );
  });

  it("uses Payload per locale to resolve localized paths", async () => {
    payloadMocks.find.mockImplementation(({ locale }) =>
      Promise.resolve({
        docs: [
          {
            code: "boat-trips",
            slug: `${locale}-boat-trips`,
            title: "Boat trips",
            shortDescription: "Sail Tenerife",
            description: "A fuller description",
            images: [{ url: "/media/boat.jpg" }],
            bookingProvider: "mock",
          },
        ],
      }),
    );

    await expect(getActivityByCode("fr", "boat-trips")).resolves.toMatchObject({
      slug: "fr-boat-trips",
    });
    await expect(getActivityLocalizedPaths("boat-trips")).resolves.toEqual({
      en: "en-boat-trips",
      es: "es-boat-trips",
      fr: "fr-boat-trips",
      de: "de-boat-trips",
    });
  });
});
