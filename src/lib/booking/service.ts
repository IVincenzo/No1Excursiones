import 'server-only';
import {z} from 'zod';
import {getActivities} from '@/lib/content/activities';
import {getBookingProvider} from './providers/registry';

export const availabilityInput = z.object({activityId: z.string().min(1), from: z.iso.date().optional()});
export const bookingInput = z.object({activityId: z.string().min(1), slotId: z.string().min(1), participants: z.number().int().min(1).max(12), idempotencyKey: z.string().min(8).max(100)});

export const bookingService = {
  async getAvailability(input: unknown) {
    const parsed = availabilityInput.parse(input);
    const activity = (await getActivities('en')).find((item) => item.code === parsed.activityId);
    if (!activity) throw new Error('Activity not found');
    return getBookingProvider(activity.bookingProvider).getAvailability(parsed);
  },
  async createBooking(input: unknown) {
    const parsed = bookingInput.parse(input);
    const activity = (await getActivities('en')).find((item) => item.code === parsed.activityId);
    if (!activity) throw new Error('Activity not found');
    const provider = getBookingProvider(activity.bookingProvider);
    const availability = await provider.getAvailability({activityId: parsed.activityId});
    const slot = availability.days.flatMap((day) => day.slots).find((item) => item.id === parsed.slotId);
    if (!slot || slot.capacity < parsed.participants) throw new Error('Availability changed');
    const quote = await provider.getPricing(parsed);
    const booking = await provider.createBooking(parsed);
    return {booking, quote};
  },
};
