"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { LocalizedEvent } from "@/lib/content/events";

function periodFor(event: LocalizedEvent) {
  const start = new Date(event.startsAt);
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const startKey = start.toISOString().slice(0, 10);
  if (startKey === todayKey) return "today";
  const day = start.getDay();
  if (day === 0 || day === 6) return "weekend";
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);
  return start <= weekFromNow ? "week" : "later";
}

export function EventsBoard({
  events: allEvents,
  locale,
  labels,
}: {
  events: LocalizedEvent[];
  locale: Locale;
  labels: Record<string, string>;
}) {
  const [period, setPeriod] = useState("all");
  const events = useMemo(
    () =>
      allEvents.filter(
        (event) => period === "all" || periodFor(event) === period,
      ),
    [allEvents, period],
  );
  const date = (event: LocalizedEvent) => new Date(event.startsAt);
  return (
    <div className="events-board">
      <div className="events-board-header">
        <div>
          <p className="section-kicker">{labels.eventsBoardKicker}</p>
          <h2>{labels.eventsBoardTitle}</h2>
        </div>
      </div>
      <div className="events-filters">
        <label className="form-label">
          {labels.eventsFilterPeriod}
          <select
            className="form-select"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option value="all">{labels.eventsPeriodAll}</option>
            <option value="today">{labels.eventsPeriodToday}</option>
            <option value="weekend">{labels.eventsPeriodWeekend}</option>
            <option value="week">{labels.eventsPeriodWeek}</option>
          </select>
        </label>
      </div>
      <div className="events-grid">
        {events.map((event) => {
          const eventDate = date(event);
          const eventPeriod = periodFor(event);
          const badge =
            eventPeriod === "later"
              ? undefined
              : labels[
                  `eventsPeriod${eventPeriod[0].toUpperCase()}${eventPeriod.slice(1)}`
                ];
          return (
            <article className="event-card" key={event.id}>
              <div className="event-date">
                <strong>
                  {new Intl.DateTimeFormat(locale, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  }).format(eventDate)}
                </strong>
                <span>
                  {new Intl.DateTimeFormat(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(eventDate)}
                </span>
              </div>
              <div className="event-content">
                <div className="event-tags">
                  {badge && <span className="event-badge">{badge}</span>}
                  {event.isVerified && (
                    <span className="event-category">
                      {labels.eventsVerified ?? "Verified"}
                    </span>
                  )}
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span>{event.location}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {events.length === 0 && (
        <div className="events-empty">{labels.eventsNoResults}</div>
      )}
    </div>
  );
}
