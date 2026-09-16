import { Hero } from "@/components/common/Hero";
import { EventsBoard } from "@/components/events/EventsBoard";
import { dictionary } from "@/lib/content/messages";
import type { Locale } from "@/i18n/config";
import type { MainPageContent } from "@/lib/content/pages";
import type { LocalizedEvent } from "@/lib/content/events";

export function EventsPage({
  events,
  locale,
  page,
}: {
  events: LocalizedEvent[];
  locale: Locale;
  page?: MainPageContent;
}) {
  const t = dictionary(locale);
  const hero = page?.hero;
  const labels = {
    ...t,
    eventsBoardKicker: page?.primarySection?.kicker ?? t.eventsBoardKicker,
    eventsBoardTitle: page?.primarySection?.title ?? t.eventsBoardTitle,
  };
  return (
    <main id="main-content">
      <Hero
        compact
        image={
          hero?.image ??
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80"
        }
        eyebrow={hero?.eyebrow ?? t.eventsEyebrow}
        title={hero?.title ?? t.eventsHeroTitle}
        text={hero?.text ?? t.eventsHeroText}
      />
      <section className="section section-muted">
        <div className="container">
          <EventsBoard events={events} locale={locale} labels={labels} />
        </div>
      </section>
    </main>
  );
}
