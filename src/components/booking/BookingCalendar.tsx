"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type {
  AvailabilityDay,
  AvailabilityResult,
  AvailabilitySlot,
} from "@/lib/booking/types";
import type { Locale } from "@/i18n/config";

type Labels = {
  availability: string;
  choose: string;
  prompt: string;
  places: string;
  selectedDate: string;
  confirm: string;
  confirmed: string;
  reference: string;
  name: string;
  phone: string;
  people: string;
};

export function BookingCalendar({
  activityId,
  activityTitle,
  locale,
  labels,
}: {
  activityId: string;
  activityTitle: string;
  locale: Locale;
  labels: Labels;
}) {
  const [data, setData] = useState<AvailabilityResult>();
  const [error, setError] = useState("");
  const [day, setDay] = useState<AvailabilityDay>();
  const [slot, setSlot] = useState<AvailabilitySlot>();
  const [result, setResult] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `/api/booking/availability?activityId=${encodeURIComponent(activityId)}`,
      { cache: "no-store", signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<AvailabilityResult>;
      })
      .then(setData)
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError"))
          setError("Availability temporarily unavailable.");
      });
    return () => controller.abort();
  }, [activityId]);
  const visibleDays = useMemo(() => data?.days.slice(0, 21) ?? [], [data]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slot) return;
    const form = new FormData(event.currentTarget);
    const participants = Number(form.get("participants"));
    const contactName = String(form.get("name") ?? "");
    const contactEmail = String(form.get("email") ?? "");
    setResult("");
    const response = await fetch("/api/booking/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        activityId,
        slotId: slot.id,
        participants,
        contactName,
        contactEmail,
        idempotencyKey: crypto.randomUUID(),
      }),
    });
    const payload = (await response.json()) as {
      booking?: { providerReference: string };
      error?: string;
    };
    setResult(
      response.ok && payload.booking
        ? `${labels.confirmed} ${activityTitle}. ${labels.reference}: ${payload.booking.providerReference}.`
        : (payload.error ?? "Booking failed"),
    );
  }
  return (
    <div className="booking-widget" aria-busy={!data && !error}>
      <div className="booking-toolbar">
        <div>
          <p className="section-kicker mb-1">{labels.availability}</p>
          <h2 className="mb-0">{labels.choose}</h2>
        </div>
        <span className="badge text-bg-warning">Mock / development</span>
      </div>
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      {!data && !error && <p aria-live="polite">Loading…</p>}
      {data && (
        <div className="calendar-grid" role="group" aria-label={labels.choose}>
          {visibleDays.map((item) => {
            const date = new Date(`${item.date}T12:00:00Z`);
            const available = item.status === "available";
            return (
              <button
                key={item.date}
                type="button"
                disabled={!available}
                className={`calendar-day ${available ? "is-available" : "is-unavailable"}${day?.date === item.date ? " is-selected" : ""}`}
                onClick={() => {
                  setDay(item);
                  setSlot(undefined);
                  setResult("");
                }}
                aria-pressed={day?.date === item.date}
              >
                {available && (
                  <span className="calendar-available-dot" aria-hidden="true" />
                )}
                <span className="calendar-day-heading">
                  <span className="calendar-day-week">
                    {new Intl.DateTimeFormat(locale, {
                      weekday: "short",
                    }).format(date)}
                  </span>
                  <span className="calendar-day-number">
                    {date.getUTCDate()}
                  </span>
                </span>
                <span className="calendar-day-status">
                  {available ? `${item.remaining} ${labels.places}` : "—"}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="booking-panel" aria-live="polite">
        {!day ? (
          <p className="text-secondary mb-0">{labels.prompt}</p>
        ) : (
          <>
            <p className="eyebrow mb-1">{labels.selectedDate}</p>
            <h3 className="h5">
              {new Intl.DateTimeFormat(locale, {
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date(`${day.date}T12:00:00Z`))}
            </h3>
            <div className="slot-list">
              {day.slots.map((item) => (
                <button
                  className={`slot-button${slot?.id === item.id ? " is-selected" : ""}`}
                  type="button"
                  key={item.id}
                  onClick={() => setSlot(item)}
                  aria-pressed={slot?.id === item.id}
                >
                  {item.startsAt.slice(11, 16)}
                  <span>
                    {item.capacity} {labels.places}
                  </span>
                </button>
              ))}
            </div>
            <form className="booking-form mt-4" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label" htmlFor="booking-name">
                    {labels.name}
                  </label>
                  <input
                    id="booking-name"
                    className="form-control"
                    name="name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="booking-email">
                    Email
                  </label>
                  <input
                    id="booking-email"
                    className="form-control"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label" htmlFor="booking-people">
                    {labels.people}
                  </label>
                  <input
                    id="booking-people"
                    className="form-control"
                    type="number"
                    name="participants"
                    min="1"
                    max="12"
                    defaultValue="2"
                    required
                  />
                </div>
                <div className="col-md-2 d-grid">
                  <button
                    className="btn btn-primary align-self-end"
                    disabled={!slot}
                    type="submit"
                  >
                    {labels.confirm}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
        {result && (
          <div
            className={`alert mt-3 ${result.includes("MOCK-") ? "alert-success" : "alert-warning"}`}
            role="status"
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
