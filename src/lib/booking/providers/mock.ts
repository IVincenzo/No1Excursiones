import type {AvailabilityDay, AvailabilityResult, BookingProvider, PriceQuote, ProviderBooking} from '../types';
import {activities} from '@/data/legacy/activities';

function dateKey(date: Date) { return date.toISOString().slice(0, 10); }

export class MockBookingProvider implements BookingProvider {
  async getAvailability({activityId, from}: {activityId: string; from?: string}): Promise<AvailabilityResult> {
    const start = from ? new Date(`${from}T12:00:00Z`) : new Date();
    start.setUTCHours(12, 0, 0, 0);
    const seed = Math.max(0, activities.findIndex((item) => item.code === activityId)) + 2;
    const times = ['09:30', '11:30', '15:00', '17:30'];
    const days: AvailabilityDay[] = Array.from({length: 42}, (_, index) => {
      const date = new Date(start); date.setUTCDate(start.getUTCDate() + index);
      const closed = (index + seed) % 7 === 0 || date.getUTCDay() === 1;
      const remaining = closed ? 0 : ((index + seed) % 5) + 1;
      const dateString = dateKey(date);
      return {date: dateString, status: closed ? 'unavailable' : 'available', remaining, slots: closed ? [] : times.filter((_, slotIndex) => (slotIndex + index + seed) % 3 !== 0).map((time, slotIndex) => ({id: `${activityId}:${dateString}:${time}`, startsAt: `${dateString}T${time}:00+01:00`, capacity: Math.max(1, remaining - slotIndex)}))};
    });
    return {activityId, timezone: 'Atlantic/Canary', days};
  }

  async getPricing({activityId, slotId, participants}: {activityId: string; slotId: string; participants: number}): Promise<PriceQuote> {
    const activity = activities.find((item) => item.code === activityId);
    if (!activity) throw new Error('Activity not found');
    return {id: `mock-quote:${activityId}:${participants}`, activityId, slotId, participants, amountMinor: activity.priceFromMinor * participants, currency: 'EUR', expiresAt: new Date(Date.now() + 15 * 60_000).toISOString()};
  }

  async createBooking({activityId, slotId, participants, idempotencyKey}: {activityId: string; slotId: string; participants: number; idempotencyKey: string}): Promise<ProviderBooking> {
    const token = Buffer.from(`${activityId}:${slotId}:${participants}:${idempotencyKey}`).toString('base64url').slice(0, 12).toUpperCase();
    return {providerReference: `MOCK-${token}`, status: 'confirmed'};
  }
  async cancelBooking({providerReference}: {providerReference: string}): Promise<ProviderBooking> { return {providerReference, status: 'cancelled'}; }
  async getBooking({providerReference}: {providerReference: string}): Promise<ProviderBooking | null> { return {providerReference, status: 'confirmed'}; }
}

