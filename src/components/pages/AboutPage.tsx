import Link from 'next/link';
import {Hero} from '@/components/common/Hero';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/i18n/config';
import {dictionary} from '@/lib/content/messages';

export function AboutPage({locale}: {locale: Locale}) { const t = dictionary(locale); return <main id="main-content">
  <Hero compact image="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80" eyebrow={t.aboutEyebrow} title={t.aboutHeroTitle} text={t.aboutHeroText} />
  <section className="section"><div className="container"><div className="row g-4 align-items-start"><div className="col-lg-7"><p className="section-kicker">{t.aboutKicker}</p><h2>{t.aboutSectionTitle}</h2><p className="lead">{t.aboutLead}</p><p>{t.aboutText}</p></div><div className="col-lg-5"><div className="info-panel"><div><span>{t.aboutDestination}</span><strong>{t.aboutDestinationValue}</strong></div><div><span>{t.aboutSpecialty}</span><strong>{t.aboutSpecialtyValue}</strong></div><div><span>{t.aboutFocus}</span><strong>{t.aboutFocusValue}</strong></div></div></div></div></div></section>
  <section className="cta-band"><div className="container d-lg-flex align-items-center justify-content-between gap-4"><div><p className="eyebrow mb-1">{t.aboutCtaKicker}</p><h2 className="mb-2">{t.aboutCtaTitle}</h2></div><div className="d-flex flex-wrap gap-2"><Link className="btn btn-light btn-lg" href={`${localizedPath(locale)}#activities`}>{t.homeDirectCta}</Link><Link className="btn btn-outline-light btn-lg" href={localizedPath(locale,'contact')}>{t.navContact}</Link></div></div></section>
  </main>; }

