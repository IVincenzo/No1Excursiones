import {NextResponse} from 'next/server';
import {getActivityByCode, getActivityBySlug} from '@/lib/content/activities';
import {isLocale, localizedPath} from '@/i18n/config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const slug = url.searchParams.get('slug');
  if (!from || !to || !slug || !isLocale(from) || !isLocale(to)) return NextResponse.json({error: 'Invalid locale switch request'}, {status: 400});

  const source = await getActivityBySlug(from, slug);
  if (!source) return NextResponse.json({error: 'Source translation not found'}, {status: 404});
  const target = await getActivityByCode(to, source.code);
  if (!target) return NextResponse.json({error: 'Target translation not published'}, {status: 404});

  return NextResponse.redirect(new URL(`${localizedPath(to, 'activities')}/${target.slug}`, request.url), 307);
}
