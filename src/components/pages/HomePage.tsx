import Link from 'next/link';
import {Hero} from '@/components/common/Hero';
import {ActivityGrid} from '@/components/activities/ActivityGrid';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/i18n/config';
import {dictionary} from '@/lib/content/messages';

export function HomePage({locale}: {locale: Locale}) {
  const t = dictionary(locale);
  return <main id="main-content">
    <Hero image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80" eyebrow={t.homeEyebrow} title={t.homeHeroTitle} text={t.homeHeroText}>
      <div className="hero-actions"><a className="btn btn-outline-light btn-lg" href="#activities">{t.homeBookCta}</a><Link className="btn btn-primary btn-lg" href={localizedPath(locale, 'trip')}>{t.homeCallCta}</Link></div>
    </Hero>
    <section className="feature-strip"><div className="container"><div className="row g-3">
      {[[t.homeFeature1Title,t.homeFeature1Text],[t.homeFeature2Title,t.homeFeature2Text],[t.homeFeature3Title,t.homeFeature3Text]].map(([title,text]) => <div className="col-md-4" key={title}><strong>{title}</strong><span>{text}</span></div>)}
    </div></div></section>
    <section className="section" id="activities"><div className="container"><div className="row align-items-end g-4 mb-4"><div className="col-lg-8"><p className="section-kicker">{t.homeActivitiesKicker}</p><h2>{t.homeActivitiesTitle}</h2></div></div><ActivityGrid locale={locale} /></div></section>
    <section className="section section-muted"><div className="container"><div className="row g-4 align-items-center"><div className="col-lg-6"><p className="section-kicker">{t.homeWaysKicker}</p><h2>{t.homeWaysTitle}</h2><p className="lead">{t.homeWaysText}</p></div><div className="col-lg-6"><div className="row g-3">
      <div className="col-sm-6"><div className="contact-panel h-100"><h3 className="h5">{t.homeDirectTitle}</h3><p>{t.homeDirectText}</p><a className="btn btn-primary" href="#activities">{t.homeDirectCta}</a></div></div>
      <div className="col-sm-6"><div className="contact-panel h-100"><h3 className="h5">{t.homeCallTitle}</h3><p>{t.homeCallText}</p><Link className="btn btn-primary" href={localizedPath(locale, 'trip')}>{t.homeCallSmallCta}</Link></div></div>
    </div></div></div></div></section>
  </main>;
}

