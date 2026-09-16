export type BookingProviderCode =
  "mock" | "manual" | "bokun" | "fareharbor" | "rezdy";

export interface AvailabilitySlot {
  id: string;
  startsAt: string;
  capacity: number;
}
export interface AvailabilityDay {
  date: string;
  status: "available" | "unavailable";
  remaining: number;
  slots: AvailabilitySlot[];
}
export interface AvailabilityResult {
  activityId: string;
  timezone: "Atlantic/Canary";
  days: AvailabilityDay[];
}
export interface PriceQuote {
  id: string;
  activityId: string;
  slotId: string;
  participants: number;
  amountMinor: number;
  currency: "EUR";
  expiresAt: string;
}
export interface ProviderBooking {
  providerReference: string;
  status: "confirmed" | "pending_manual" | "cancelled";
}

export interface BookingProvider {
  getAvailability(input: {
    activityId: string;
    from?: string;
  }): Promise<AvailabilityResult>;
  getPricing(input: {
    activityId: string;
    slotId: string;
    participants: number;
  }): Promise<PriceQuote>;
  createBooking(input: {
    activityId: string;
    slotId: string;
    participants: number;
    idempotencyKey: string;
  }): Promise<ProviderBooking>;
  cancelBooking(input: { providerReference: string }): Promise<ProviderBooking>;
  getBooking(input: {
    providerReference: string;
  }): Promise<ProviderBooking | null>;
}
