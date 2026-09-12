import type {BookingProvider, BookingProviderCode} from '../types';
import {MockBookingProvider} from './mock';
import {ManualBookingProvider} from './manual';
import {BokunBookingProvider, FareHarborBookingProvider, RezdyBookingProvider} from './external';

const providers: Record<BookingProviderCode, BookingProvider> = {
  mock: new MockBookingProvider(), manual: new ManualBookingProvider(), bokun: new BokunBookingProvider(), fareharbor: new FareHarborBookingProvider(), rezdy: new RezdyBookingProvider(),
};
export function getBookingProvider(code: BookingProviderCode): BookingProvider { return providers[code]; }

