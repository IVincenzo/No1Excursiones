import Image from "next/image";
import Link from "next/link";
import type { LocalizedActivity } from "@/types/activity";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { formatMoney } from "@/lib/format";

export function ActivityCard({
  activity,
  locale,
  from,
}: {
  activity: LocalizedActivity;
  locale: Locale;
  from: string;
}) {
  return (
    <article className="col-md-6 col-xl-4">
      <Link
        className="activity-card"
        href={`${localizedPath(locale, "activities")}/${activity.slug}`}
      >
        <Image
          src={activity.image}
          alt={activity.title}
          width={800}
          height={530}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
        />
        <span className="activity-card-body">
          <strong>{activity.title}</strong>
          <span className="activity-card-summary">{activity.summary}</span>
          <span className="activity-card-footer">
            <span className="activity-duration">{activity.duration}</span>
            <span className="activity-price">
              <span>{from}</span>{" "}
              {formatMoney(activity.priceFromMinor, activity.currency, locale)}
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}
