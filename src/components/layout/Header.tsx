import type { Locale } from "@/i18n/config";
import { dictionary } from "@/lib/content/messages";
import { HeaderClient } from "./HeaderClient";

export async function Header({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <HeaderClient
      locale={locale}
      labels={{
        home: t.navHome,
        events: t.navLocalEvents,
        about: t.navAbout,
        contact: t.navContact,
        trip: t.navTrip,
        open: t.navOpen,
      }}
    />
  );
}
