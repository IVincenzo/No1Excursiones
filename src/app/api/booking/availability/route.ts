import {NextResponse} from 'next/server';
import {ZodError} from 'zod';
import {bookingService} from '@/lib/booking/service';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const url = new URL(request.url);
  try {
    return NextResponse.json(await bookingService.getAvailability({activityId: url.searchParams.get('activityId'), from: url.searchParams.get('from') ?? undefined}), {headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({error: 'Invalid request'}, {status: 400});
    if (error instanceof Error && error.message === 'Activity not found') return NextResponse.json({error: error.message}, {status: 404});
    return NextResponse.json({error: 'Availability provider unavailable'}, {status: 503});
  }
}

