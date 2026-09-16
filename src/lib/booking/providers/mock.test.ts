import { beforeEach, describe, expect, it, vi } from "vitest";
import { MockBookingProvider } from "./mock";

const contentMocks = vi.hoisted(() => ({
  getActivityByCode: vi.fn(),
}));

vi.mock("@/lib/content/activities", () => ({
  getActivityByCode: contentMocks.getActivityByCode,
}));

describe("MockBookingProvider", () => {
  const provider = new MockBookingProvider();
  beforeEach(() => {
    contentMocks.getActivityByCode.mockResolvedValue({
      code: "boat-trips",
      priceFromMinor: 3900,
      currency: "EUR",
    });
  });

  it("returns 42 deterministic days and opaque slots", async () => {
    const first = await provider.getAvailability({
      activityId: "boat-trips",
      from: "2026-01-01",
    });
    const second = await provider.getAvailability({
      activityId: "boat-trips",
      from: "2026-01-01",
    });
    expect(first).toEqual(second);
    expect(first.days).toHaveLength(42);
    expect(first.timezone).toBe("Atlantic/Canary");
    expect(first.days.flatMap((day) => day.slots)[0]?.id).toContain(
      "boat-trips:",
    );
  });
  it("calculates the authoritative total in minor units", async () => {
    const quote = await provider.getPricing({
      activityId: "boat-trips",
      slotId: "opaque",
      participants: 3,
    });
    expect(quote.amountMinor).toBe(11_700);
    expect(quote.currency).toBe("EUR");
    expect(contentMocks.getActivityByCode).toHaveBeenCalledWith(
      "en",
      "boat-trips",
    );
  });
});
