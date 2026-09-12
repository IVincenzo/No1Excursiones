import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/i18n/config';
import {getActivities} from '@/lib/content/activities';
import {dictionary} from '@/lib/content/messages';
import {LanguageSwitcher} from './LanguageSwitcher';

export async function Header({locale}: {locale: Locale}) {
  const t = dictionary(locale);
  const activities = await getActivities(locale);
  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top site-navbar" aria-label={t.navHome}>
        <div className="container">
          <Link className="navbar-brand" href={localizedPath(locale)} aria-label="No1 Excursiones">
            <span className="brand-mark">N1</span><span>No1 Excursiones</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label={t.navOpen}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><Link className="nav-link" href={localizedPath(locale)}>{t.navHome}</Link></li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{t.navActivities}</button>
                <ul className="dropdown-menu">
                  {activities.map((activity) => <li key={activity.code}><Link className="dropdown-item" href={`${localizedPath(locale, 'activities')}/${activity.slug}`}>{activity.title}</Link></li>)}
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" href={localizedPath(locale, 'events')}>{t.navLocalEvents}</Link></li>
              <li className="nav-item"><Link className="nav-link" href={localizedPath(locale, 'about')}>{t.navAbout}</Link></li>
              <li className="nav-item"><Link className="nav-link" href={localizedPath(locale, 'contact')}>{t.navContact}</Link></li>
              <li className="nav-item"><Link className="nav-link nav-cta-trip" href={localizedPath(locale, 'trip')}>{t.navTrip}</Link></li>
              <LanguageSwitcher locale={locale} />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
