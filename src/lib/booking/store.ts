import "server-only";
import type { ProviderBooking } from "./types";

type StoredBookingInput = {
  activityCode: string;
  providerCode: string;
  booking: ProviderBooking;
  slotId: string;
  participants: number;
  contactName: string;
  contactEmail: string;
  idempotencyKey: string;
};

function providerStatusToAdminStatus(status: ProviderBooking["status"]) {
  if (status === "pending_manual") return "manual_review" as const;
  return status;
}

function adminStatusToProviderStatus(
  status: string,
): ProviderBooking["status"] {
  if (
    status === "manual_review" ||
    status === "pending_payment" ||
    status === "paid_pending_confirmation"
  )
    return "pending_manual";
  if (status === "cancelled") return "cancelled";
  return "confirmed";
}

async function getPayloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@/payload.config"),
  ]);
  return getPayload({ config });
}

export async function findStoredBooking(
  idempotencyKey: string,
): Promise<ProviderBooking | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "bookings",
    where: { idempotencyKey: { equals: idempotencyKey } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const booking = result.docs[0];
  if (!booking) return null;
  return {
    providerReference: booking.providerReference ?? booking.reference,
    status: adminStatusToProviderStatus(booking.status),
  };
}

export async function storeBooking(input: StoredBookingInput): Promise<void> {
  const payload = await getPayloadClient();
  const activities = await payload.find({
    collection: "activities",
    where: { code: { equals: input.activityCode } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const activity = activities.docs[0];
  if (!activity)
    throw new Error(`Activity ${input.activityCode} is missing from Payload`);

  try {
    await payload.create({
      collection: "bookings",
      overrideAccess: true,
      data: {
        reference: input.booking.providerReference,
        activity: activity.id,
        providerCode: input.providerCode,
        providerReference: input.booking.providerReference,
        slotId: input.slotId,
        participants: input.participants,
        status: providerStatusToAdminStatus(input.booking.status),
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        idempotencyKey: input.idempotencyKey,
      },
    });
  } catch (error) {
    // Two identical requests may race. The unique idempotency key makes the
    // second insert harmless, but genuine database errors must still surface.
    if (!(await findStoredBooking(input.idempotencyKey))) throw error;
  }
}
