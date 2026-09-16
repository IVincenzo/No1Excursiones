import type {BookingProvider} from '../types';
import {ProviderNotConfiguredError} from '../errors';

abstract class UnconfiguredProvider implements BookingProvider {
  abstract readonly name: string;
  private fail(): never { throw new ProviderNotConfiguredError(this.name); }
  async getAvailability(): ReturnType<BookingProvider['getAvailability']> { return this.fail(); }
  async getPricing(): ReturnType<BookingProvider['getPricing']> { return this.fail(); }
  async createBooking(): ReturnType<BookingProvider['createBooking']> { return this.fail(); }
  async cancelBooking(): ReturnType<BookingProvider['cancelBooking']> { return this.fail(); }
  async getBooking(): ReturnType<BookingProvider['getBooking']> { return this.fail(); }
}
export class BokunBookingProvider extends UnconfiguredProvider { readonly name = 'Bókun'; }
export class FareHarborBookingProvider extends UnconfiguredProvider { readonly name = 'FareHarbor'; }
export class RezdyBookingProvider extends UnconfiguredProvider { readonly name = 'Rezdy'; }

