'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {activities} from '@/data/legacy/activities';
import {localizedPath, paths, type Locale, type PageKey} from '@/i18n/config';

const locales: Locale[] = ['en','es','fr','de'];

export function LanguageSwitcher({locale}: {locale: Locale}) {
  const pathname = usePathname(); const segments = pathname.split('/').filter(Boolean).slice(1);
  function href(target: Locale) {
    if (segments.length === 0) return localizedPath(target);
    const page = (Object.keys(paths) as PageKey[]).find((key) => paths[key][locale] === segments[0]);
    if (!page) return localizedPath(target);
    if (page === 'activities' && segments[1]) {
      const activity = activities.find((item) => item.slug[locale] === segments[1]);
      if (activity) return `${localizedPath(target,'activities')}/${activity.slug[target]}`;
    }
    return localizedPath(target,page);
  }
  return <li className="nav-item dropdown language-switcher"><button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Language">{locale.toUpperCase()}</button><ul className="dropdown-menu dropdown-menu-end">{locales.map((target) => <li key={target}><Link className={`dropdown-item${target === locale ? ' active' : ''}`} href={href(target)} hrefLang={target}>{target.toUpperCase()}</Link></li>)}</ul></li>;
}

