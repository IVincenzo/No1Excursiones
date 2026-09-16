import {Hero} from '@/components/common/Hero';
import {EventsBoard} from '@/components/events/EventsBoard';
import {dictionary} from '@/lib/content/messages';
import type {Locale} from '@/i18n/config';

export function EventsPage({locale}: {locale: Locale}) { const t = dictionary(locale); return <main id="main-content"><Hero compact image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80" eyebrow={t.eventsEyebrow} title={t.eventsHeroTitle} text={t.eventsHeroText}/><section className="section section-muted"><div className="container"><EventsBoard locale={locale} labels={t}/></div></section></main>; }

