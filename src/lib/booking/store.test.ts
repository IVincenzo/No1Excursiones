import { beforeEach, describe, expect, it, vi } from "vitest";

const payload = {
  find: vi.fn(),
  create: vi.fn(),
};

vi.mock("server-only", () => ({}));
vi.mock("payload", () => ({ getPayload: vi.fn(async () => payload) }));
vi.mock("@/payload.config", () => ({ default: {} }));

import { findStoredBooking, storeBooking } from "./store";

describe("booking store", () => {
  beforeEach(() => {
    payload.find.mockReset();
    payload.create.mockReset();
  });

  it("persists a provider booking in the Payload admin collection", async () => {
    payload.find.mockResolvedValueOnce({ docs: [{ id: 42 }] });
    payload.create.mockResolvedValueOnce({ id: 7 });

    await storeBooking({
      activityCode: "boat-trips",
      providerCode: "mock",
      booking: { providerReference: "MOCK-ABC", status: "confirmed" },
      slotId: "boat-trips:2026-09-20:09:30",
      participants: 2,
      contactName: "Ada Lovelace",
      contactEmail: "ada@example.com",
      idempotencyKey: "request-123",
    });

    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "bookings",
        data: expect.objectContaining({
          activity: 42,
          reference: "MOCK-ABC",
          contactName: "Ada Lovelace",
          contactEmail: "ada@example.com",
          idempotencyKey: "request-123",
          status: "confirmed",
        }),
      }),
    );
  });

  it("restores an existing manual booking for an idempotent retry", async () => {
    payload.find.mockResolvedValueOnce({
      docs: [
        {
          reference: "MANUAL-1",
          providerReference: null,
          status: "manual_review",
        },
      ],
    });

    await expect(findStoredBooking("request-123")).resolves.toEqual({
      providerReference: "MANUAL-1",
      status: "pending_manual",
    });
  });
});
