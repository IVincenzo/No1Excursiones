'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/i18n/config';
import {LanguageSwitcher} from './LanguageSwitcher';

type ActivityLink = {code: string; slug: string; title: string};
type Labels = {home: string; activities: string; events: string; about: string; contact: string; trip: string; open: string};

export function HeaderClient({locale, activities, labels}: {locale: Locale; activities: ActivityLink[]; labels: Labels}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setActivitiesOpen(false); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  const closeMenu = () => { setMenuOpen(false); setActivitiesOpen(false); };
  return <header><nav className="navbar navbar-expand-lg fixed-top site-navbar" aria-label={labels.home}><div className="container">
    <Link className="navbar-brand" href={localizedPath(locale)} aria-label="No1 Excursiones" onClick={closeMenu}><span className="brand-mark">N1</span><span>No1 Excursiones</span></Link>
    <button className="navbar-toggler" type="button" aria-controls="mainNav" aria-expanded={menuOpen} aria-label={labels.open} onClick={() => setMenuOpen((value) => !value)}><span className="navbar-toggler-icon" /></button>
    <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="mainNav"><ul className="navbar-nav ms-auto align-items-lg-center">
      <li className="nav-item"><Link className="nav-link" href={localizedPath(locale)} onClick={closeMenu}>{labels.home}</Link></li>
      <li className="nav-item dropdown"><button className="nav-link dropdown-toggle" type="button" aria-expanded={activitiesOpen} onClick={() => setActivitiesOpen((value) => !value)}>{labels.activities}</button><ul className={`dropdown-menu${activitiesOpen ? ' show' : ''}`}>{activities.map((activity) => <li key={activity.code}><Link className="dropdown-item" href={`${localizedPath(locale,'activities')}/${activity.slug}`} onClick={closeMenu}>{activity.title}</Link></li>)}</ul></li>
      <li className="nav-item"><Link className="nav-link" href={localizedPath(locale,'events')} onClick={closeMenu}>{labels.events}</Link></li>
      <li className="nav-item"><Link className="nav-link" href={localizedPath(locale,'about')} onClick={closeMenu}>{labels.about}</Link></li>
      <li className="nav-item"><Link className="nav-link" href={localizedPath(locale,'contact')} onClick={closeMenu}>{labels.contact}</Link></li>
      <li className="nav-item"><Link className="nav-link nav-cta-trip" href={localizedPath(locale,'trip')} onClick={closeMenu}>{labels.trip}</Link></li>
      <LanguageSwitcher locale={locale} />
    </ul></div>
  </div></nav></header>;
}
