import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { dictionary } from "@/lib/content/messages";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <Link className="footer-brand" href={localizedPath(locale)}>
              <span className="brand-mark">N1</span>
              <span>No1 Excursiones</span>
            </Link>
            <p className="mt-3 mb-0">{t.footerText}</p>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h2 className="footer-title">{t.footerContact}</h2>
            <p className="mb-1">{t.footerLocation}</p>
            <p className="mb-1">
              {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? (
                <a href={`tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>
                  +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </a>
              ) : (
                <span className="text-white-50">TODO: phone</span>
              )}
            </p>
            <p className="mb-0">
              <a href="mailto:hola@no1excursiones.com">
                hola@no1excursiones.com
              </a>
            </p>
          </div>
          <div className="col-sm-6 col-lg-4">
            <h2 className="footer-title">{t.footerBookings}</h2>
            <p className="mb-3">{t.footerBookingText}</p>
            <Link
              className="btn btn-primary btn-sm"
              href={localizedPath(locale, "trip")}
            >
              {t.footerCall}
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} No1 Excursiones</span>
        </div>
      </div>
    </footer>
  );
}
