'use client';

import {useMemo, useState} from 'react';
import eventsData from '@/data/legacy/events.json';
import type {Locale} from '@/i18n/config';

type EventItem = (typeof eventsData.events)[number];

export function EventsBoard({locale, labels}: {locale: Locale; labels: Record<string, string>}) {
  const [category, setCategory] = useState('all'); const [period, setPeriod] = useState('all');
  const events = useMemo(() => eventsData.events.filter((event) => (category === 'all' || event.category === category) && (period === 'all' || event.period === period)), [category, period]);
  const date = (event: EventItem) => { const value = new Date(); value.setDate(value.getDate() + event.dateOffset); return value; };
  return <div className="events-board"><div className="demo-notice mb-4" role="note">Demo: these events are fictional and are never published as structured data.</div>
    <div className="events-board-header"><div><p className="section-kicker">{labels.eventsBoardKicker}</p><h2>{labels.eventsBoardTitle}</h2></div></div>
    <div className="events-filters"><label className="form-label">{labels.eventsFilterCategory}<select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">{labels.eventsCategoryAll}</option>{Object.entries(eventsData.categories).map(([key,value]) => <option key={key} value={key}>{value[locale]}</option>)}</select></label><label className="form-label">{labels.eventsFilterPeriod}<select className="form-select" value={period} onChange={(event) => setPeriod(event.target.value)}><option value="all">{labels.eventsPeriodAll}</option><option value="today">{labels.eventsPeriodToday}</option><option value="weekend">{labels.eventsPeriodWeekend}</option><option value="week">{labels.eventsPeriodWeek}</option></select></label></div>
    <div className="events-grid">{events.map((event) => { const text = event.translations[locale]; return <article className="event-card" key={event.id}><div className="event-date"><strong>{new Intl.DateTimeFormat(locale,{weekday:'short',day:'numeric',month:'short'}).format(date(event))}</strong><span>{event.time}</span></div><div className="event-content"><div className="event-tags"><span className="event-badge">{labels[`eventsPeriod${event.period[0].toUpperCase()}${event.period.slice(1)}`]}</span><span className="event-category">{eventsData.categories[event.category as keyof typeof eventsData.categories][locale]}</span></div><h3>{text.title}</h3><p>{text.description}</p><div className="event-meta"><span>{event.location}</span><strong>{event.price === 'free' ? labels.eventsPriceFree : event.price}</strong></div></div></article>; })}</div>
    {events.length === 0 && <div className="events-empty">{labels.eventsNoResults}</div>}
  </div>;
}

