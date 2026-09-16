import { Hero } from "@/components/common/Hero";
import { DemoForm } from "@/components/common/DemoForm";
import { dictionary } from "@/lib/content/messages";
import type { Locale } from "@/i18n/config";
import type { MainPageContent } from "@/lib/content/pages";

export function TripPage({
  locale,
  page,
}: {
  locale: Locale;
  page?: MainPageContent;
}) {
  const t = dictionary(locale);
  const hero = page?.hero;
  const primary = page?.primarySection;
  const secondary = page?.secondarySection;
  const details = page?.details?.length
    ? page.details
    : [
        { label: t.tripDuration, value: t.tripDurationValue },
        { label: t.tripFormat, value: t.tripFormatValue },
        { label: t.tripResult, value: t.tripResultValue },
      ];
  return (
    <main id="main-content">
      <Hero
        compact
        image={
          hero?.image ??
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
        }
        eyebrow={hero?.eyebrow ?? t.tripEyebrow}
        title={hero?.title ?? t.tripHeroTitle}
        text={hero?.text ?? t.tripHeroText}
      />
      <section className="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <p className="section-kicker">
                {primary?.kicker ?? t.tripKicker}
              </p>
              <h2>{primary?.title ?? t.tripSectionTitle}</h2>
              <p className="lead">{primary?.lead ?? t.tripSectionText}</p>
              <div className="info-panel mt-4">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <DemoForm className="trip-form-card" message={t.tripFormResult}>
                <div className="trip-form-header">
                  <p className="section-kicker">
                    {secondary?.kicker ?? t.tripFormKicker}
                  </p>
                  <h2>{secondary?.title ?? t.tripFormTitle}</h2>
                  <p>{secondary?.text ?? t.tripFormIntro}</p>
                  <div className="demo-notice">
                    Demo only: no request is sent.
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label" htmlFor="trip-name">
                      {t.tripFormName}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-name"
                      name="name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-phone">
                      {t.tripFormPhone}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-email">
                      {t.tripFormEmail}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-people">
                      {t.tripFormPeople}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-people"
                      name="people"
                      type="number"
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-age">
                      {t.tripFormAge}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-age"
                      name="age"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-start">
                      {t.tripFormStartDate}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-start"
                      name="startDate"
                      type="date"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="trip-end">
                      {t.tripFormEndDate}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-end"
                      name="endDate"
                      type="date"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="trip-accommodation">
                      {t.tripFormAccommodation}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="trip-accommodation"
                      name="accommodation"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="trip-experiences">
                      {t.tripFormExperiences}
                    </label>
                    <textarea
                      className="form-control"
                      id="trip-experiences"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="trip-comments">
                      {t.tripFormComments}
                    </label>
                    <textarea
                      className="form-control"
                      id="trip-comments"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="trip-privacy"
                        type="checkbox"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="trip-privacy"
                      >
                        {t.tripFormPrivacy} *
                      </label>
                    </div>
                    <p className="trip-legal mt-3">{t.tripFormDataInfo}</p>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary btn-lg" type="submit">
                      {t.tripFormSubmit}
                    </button>
                  </div>
                </div>
              </DemoForm>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
