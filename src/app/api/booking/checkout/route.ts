import {NextResponse} from 'next/server';
import {ZodError} from 'zod';
import {bookingService} from '@/lib/booking/service';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = await bookingService.createBooking(body);
    return NextResponse.json({...result, paymentMode: 'mock'});
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({error: 'Invalid request'}, {status: 400});
    if (error instanceof Error && error.message === 'Availability changed') return NextResponse.json({error: error.message}, {status: 409});
    return NextResponse.json({error: 'Booking failed'}, {status: 503});
  }
}

