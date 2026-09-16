import Link from "next/link";
import { Hero } from "@/components/common/Hero";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { dictionary } from "@/lib/content/messages";
import type { MainPageContent } from "@/lib/content/pages";

export function AboutPage({
  locale,
  page,
}: {
  locale: Locale;
  page?: MainPageContent;
}) {
  const t = dictionary(locale);
  const hero = page?.hero;
  const primary = page?.primarySection;
  const details = page?.details?.length
    ? page.details
    : [
        { label: t.aboutDestination, value: t.aboutDestinationValue },
        { label: t.aboutSpecialty, value: t.aboutSpecialtyValue },
        { label: t.aboutFocus, value: t.aboutFocusValue },
      ];
  return (
    <main id="main-content">
      <Hero
        compact
        image={
          hero?.image ??
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
        }
        eyebrow={hero?.eyebrow ?? t.aboutEyebrow}
        title={hero?.title ?? t.aboutHeroTitle}
        text={hero?.text ?? t.aboutHeroText}
      />
      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <p className="section-kicker">
                {primary?.kicker ?? t.aboutKicker}
              </p>
              <h2>{primary?.title ?? t.aboutSectionTitle}</h2>
              <p className="lead">{primary?.lead ?? t.aboutLead}</p>
              <p>{primary?.body ?? t.aboutText}</p>
            </div>
            <div className="col-lg-5">
              <div className="info-panel">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-band">
        <div className="container d-lg-flex align-items-center justify-content-between gap-4">
          <div>
            <p className="eyebrow mb-1">
              {page?.cta?.kicker ?? t.aboutCtaKicker}
            </p>
            <h2 className="mb-2">{page?.cta?.title ?? t.aboutCtaTitle}</h2>
            {page?.cta?.text && <p>{page.cta.text}</p>}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link
              className="btn btn-light btn-lg"
              href={`${localizedPath(locale)}#activities`}
            >
              {t.homeDirectCta}
            </Link>
            <Link
              className="btn btn-outline-light btn-lg"
              href={localizedPath(locale, "contact")}
            >
              {t.navContact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
