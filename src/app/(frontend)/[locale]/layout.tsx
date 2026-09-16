import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/site.css";
import "@/styles/app.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { BootstrapClient } from "@/components/common/BootstrapClient";
import { dictionary } from "@/lib/content/messages";
import { isLocale, locales } from "@/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) notFound();
  const locale = requestedLocale;
  setRequestLocale(locale);
  const t = dictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <WhatsAppWidget
            phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
            labels={{
              open: t.whatsappOpen,
              close: t.whatsappClose,
              online: t.whatsappOnline,
              greeting: t.whatsappGreeting,
              button: t.whatsappButton,
              prefill: t.whatsappPrefill,
            }}
          />
          <BootstrapClient />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
