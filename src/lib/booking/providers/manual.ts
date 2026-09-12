import type {BookingProvider, ProviderBooking} from '../types';
import {MockBookingProvider} from './mock';

export class ManualBookingProvider extends MockBookingProvider implements BookingProvider {
  override async createBooking(input: Parameters<BookingProvider['createBooking']>[0]): Promise<ProviderBooking> {
    const booking = await super.createBooking(input);
    return {...booking, status: 'pending_manual'};
  }
}

