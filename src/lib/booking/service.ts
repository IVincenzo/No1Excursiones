import "server-only";
import { z } from "zod";
import { getActivities } from "@/lib/content/activities";
import { getBookingProvider } from "./providers/registry";
import { findStoredBooking, storeBooking } from "./store";

export const availabilityInput = z.object({
  activityId: z.string().min(1),
  from: z.iso.date().optional(),
});
export const bookingInput = z.object({
  activityId: z.string().min(1),
  slotId: z.string().min(1),
  participants: z.number().int().min(1).max(12),
  contactName: z.string().trim().min(1).max(120),
  contactEmail: z
    .email()
    .max(254)
    .transform((email) => email.toLowerCase()),
  idempotencyKey: z.string().min(8).max(100),
});

export const bookingService = {
  async getAvailability(input: unknown) {
    const parsed = availabilityInput.parse(input);
    const activity = (await getActivities("en")).find(
      (item) => item.code === parsed.activityId,
    );
    if (!activity) throw new Error("Activity not found");
    return getBookingProvider(activity.bookingProvider).getAvailability(parsed);
  },
  async createBooking(input: unknown) {
    const parsed = bookingInput.parse(input);
    const activity = (await getActivities("en")).find(
      (item) => item.code === parsed.activityId,
    );
    if (!activity) throw new Error("Activity not found");
    const provider = getBookingProvider(activity.bookingProvider);
    const existing = await findStoredBooking(parsed.idempotencyKey);
    if (existing)
      return { booking: existing, quote: await provider.getPricing(parsed) };
    const availability = await provider.getAvailability({
      activityId: parsed.activityId,
    });
    const slot = availability.days
      .flatMap((day) => day.slots)
      .find((item) => item.id === parsed.slotId);
    if (!slot || slot.capacity < parsed.participants)
      throw new Error("Availability changed");
    const quote = await provider.getPricing(parsed);
    const booking = await provider.createBooking(parsed);
    await storeBooking({
      activityCode: activity.code,
      providerCode: activity.bookingProvider,
      booking,
      slotId: parsed.slotId,
      participants: parsed.participants,
      contactName: parsed.contactName,
      contactEmail: parsed.contactEmail,
      idempotencyKey: parsed.idempotencyKey,
    });
    return { booking, quote };
  },
};
