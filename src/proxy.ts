import {NextRequest, NextResponse} from 'next/server';
import {isLocale, localizedPath, paths, type Locale} from '@/i18n/config';
import {activities} from '@/data/legacy/activities';

function preferredLocale(request: NextRequest): Locale {
  const query = request.nextUrl.searchParams.get('lang');
  if (query && isLocale(query)) return query;
  const accepted = request.headers.get('accept-language')?.toLowerCase() ?? '';
  for (const part of accepted.split(',')) { const locale = part.trim().slice(0,2); if (isLocale(locale)) return locale; }
  return 'en';
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/') return NextResponse.redirect(new URL(`/${preferredLocale(request)}`, request.url));
  const legacyRoot: Record<string, keyof typeof paths | 'home'> = {'/index.html':'home','/about.html':'about','/contact.html':'contact','/local-events.html':'events','/plan-your-trip.html':'trip'};
  if (pathname in legacyRoot) {
    const locale = request.nextUrl.searchParams.has('lang') ? preferredLocale(request) : 'es';
    const page = legacyRoot[pathname]; return NextResponse.redirect(new URL(page === 'home' ? localizedPath(locale) : localizedPath(locale,page), request.url), 308);
  }
  const match = pathname.match(/^\/activities\/([^/]+)\.html$/);
  if (match) {
    const locale = request.nextUrl.searchParams.has('lang') ? preferredLocale(request) : 'es';
    const activity = activities.find((item) => item.code === match[1]);
    if (activity) return NextResponse.redirect(new URL(`/${locale}/${paths.activities[locale]}/${activity.slug[locale]}`, request.url), 308);
  }
  return NextResponse.next();
}

export const config = {matcher: ['/','/:path*.html']};

