import Link from "next/link";
import { Hero } from "@/components/common/Hero";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import type { LocalizedActivity } from "@/types/activity";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { dictionary } from "@/lib/content/messages";
import { formatMoney } from "@/lib/format";

export function ActivityPage({
  activity,
  locale,
}: {
  activity: LocalizedActivity;
  locale: Locale;
}) {
  const t = dictionary(locale);
  return (
    <main id="main-content">
      <Hero
        compact
        image={activity.image}
        eyebrow={activity.badge}
        title={activity.title}
        text={activity.summary}
      >
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href="#availability">
            {t.activityAvailabilityCta}
          </a>
          <Link
            className="btn btn-outline-light btn-lg"
            href={localizedPath(locale, "trip")}
          >
            {t.activityAdviceCta}
          </Link>
        </div>
      </Hero>
      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <p className="section-kicker">{t.activityExperience}</p>
              <h2>{t.activitySectionTitle}</h2>
              <p className="lead">{activity.intro}</p>
            </div>
            <div className="col-lg-5">
              <div className="info-panel">
                <div>
                  <span>{t.activityPrice}</span>
                  <strong>
                    {t.activityFrom}{" "}
                    {formatMoney(
                      activity.priceFromMinor,
                      activity.currency,
                      locale,
                    )}
                  </strong>
                </div>
                <div>
                  <span>{t.activityDuration}</span>
                  <strong>{activity.duration}</strong>
                </div>
                <div>
                  <span>{t.activityConfirmation}</span>
                  <strong>Mock / development</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 mt-4">
            {activity.highlights.map((highlight) => (
              <div className="col-md-4" key={highlight}>
                <div className="highlight-item">{highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted" id="availability">
        <div className="container">
          <BookingCalendar
            activityId={activity.code}
            activityTitle={activity.title}
            locale={locale}
            labels={{
              availability: t.calendarAvailability,
              choose: t.calendarChoose,
              prompt: t.calendarSelectPrompt,
              places: t.calendarAvailablePlaces,
              selectedDate: t.calendarSelectedDate,
              confirm: t.calendarConfirm,
              confirmed: t.calendarConfirmed,
              reference: t.calendarReference,
              name: t.formName,
              phone: t.formPhone,
              people: t.formPeople,
            }}
          />
        </div>
      </section>
      <section className="cta-band">
        <div className="container d-lg-flex align-items-center justify-content-between gap-4">
          <div>
            <p className="eyebrow mb-1">{t.activityTripKicker}</p>
            <h2 className="mb-2">{t.activityCtaTitle}</h2>
            <p className="mb-lg-0">{t.activityCtaText}</p>
          </div>
          <Link
            className="btn btn-primary btn-lg"
            href={localizedPath(locale, "trip")}
          >
            {t.footerCall}
          </Link>
        </div>
      </section>
    </main>
  );
}
