import Link from "next/link";
import { Hero } from "@/components/common/Hero";
import { ActivityGrid } from "@/components/activities/ActivityGrid";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { dictionary } from "@/lib/content/messages";
import type { MainPageContent } from "@/lib/content/pages";

export function HomePage({
  locale,
  page,
}: {
  locale: Locale;
  page?: MainPageContent;
}) {
  const t = dictionary(locale);
  const hero = page?.hero;
  const features = page?.featureItems?.length
    ? page.featureItems
    : [
        [t.homeFeature1Title, t.homeFeature1Text],
        [t.homeFeature2Title, t.homeFeature2Text],
        [t.homeFeature3Title, t.homeFeature3Text],
      ].map(([title, text]) => ({ title, text }));
  const primary = page?.primarySection;
  const secondary = page?.secondarySection;
  const fallbackCards = [
    {
      title: t.homeDirectTitle,
      text: t.homeDirectText,
      buttonLabel: t.homeDirectCta,
      target: "activities" as const,
    },
    {
      title: t.homeCallTitle,
      text: t.homeCallText,
      buttonLabel: t.homeCallSmallCta,
      target: "trip" as const,
    },
  ];
  const cards = fallbackCards.map((fallback, index) => {
    const card = page?.cards?.[index];
    return {
      title: card?.title?.trim() || fallback.title,
      text: card?.text?.trim() || fallback.text,
      buttonLabel: card?.buttonLabel?.trim() || fallback.buttonLabel,
      target: card?.target ?? fallback.target,
    };
  });
  const cardHref = (target: "activities" | "trip" | "contact") =>
    target === "activities" ? "#activities" : localizedPath(locale, target);
  return (
    <main id="main-content">
      <Hero
        image={
          hero?.image ??
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
        }
        eyebrow={hero?.eyebrow ?? t.homeEyebrow}
        title={hero?.title ?? t.homeHeroTitle}
        text={hero?.text ?? t.homeHeroText}
      >
        <div className="hero-actions">
          <a className="btn btn-outline-light btn-lg" href="#activities">
            {t.homeBookCta}
          </a>
          <Link
            className="btn btn-primary btn-lg"
            href={localizedPath(locale, "trip")}
          >
            {t.homeCallCta}
          </Link>
        </div>
      </Hero>
      <section className="feature-strip">
        <div className="container">
          <div className="row g-3">
            {features.map(({ title, text }, index) => (
              <div className="col-md-4" key={`feature-${index}`}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="activities">
        <div className="container">
          <div className="row align-items-end g-4 mb-4">
            <div className="col-lg-8">
              <p className="section-kicker">
                {primary?.kicker ?? t.homeActivitiesKicker}
              </p>
              <h2>{primary?.title ?? t.homeActivitiesTitle}</h2>
            </div>
          </div>
          <ActivityGrid locale={locale} />
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <p className="section-kicker">
                {secondary?.kicker ?? t.homeWaysKicker}
              </p>
              <h2>{secondary?.title ?? t.homeWaysTitle}</h2>
              <p className="lead">{secondary?.text ?? t.homeWaysText}</p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {cards.map((card, index) => (
                  <div className="col-sm-6" key={`action-card-${index}`}>
                    <div className="contact-panel h-100">
                      <h3 className="h5">{card.title}</h3>
                      <p>{card.text}</p>
                      <Link
                        className="btn btn-primary"
                        href={cardHref(card.target)}
                      >
                        {card.buttonLabel}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
