# No1 Excursiones

Next.js and Payload CMS booking platform for Tenerife excursions.

## Stack and local setup

Node.js 22, pnpm 11, Next.js 16 App Router, React 19, strict TypeScript, Bootstrap 5.3.3, `next-intl`, Payload CMS 3/PostgreSQL, Stripe's server SDK, Vitest and Playwright.

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. `/` negotiates `Accept-Language` and falls back to `/en`.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Playwright browsers require the separate command `pnpm exec playwright install chromium`.

## Content and Payload

Public content is served from Payload. Local development requires PostgreSQL and seeded or manually created Payload documents.

```bash
docker compose up -d postgres
pnpm payload migrate:create
pnpm payload:migrate-media
pnpm payload migrate
pnpm payload:validate
pnpm dev
```

The admin is at `/admin`. `payload:import-pages` creates or refreshes only the five editable main-page documents (`home`, `about`, `contact`, `events`, `trip`) in all four languages. Activities and local events are managed directly in Payload. `payload:migrate-media` is a one-time helper for existing databases that still have old image URL columns; run it before the cleanup migration. `payload:validate` performs a reversible draft/publish/restore check and verifies that an absent translation never falls back to another language.

Main pages and activities expose Payload's Preview and Live Preview controls. The authenticated preview route enables Next.js draft mode, and autosave refreshes the embedded site without exposing draft content publicly. Published edits invalidate the public pages and sitemap. Localized activity links, language switching, canonical metadata and hreflang are resolved from the active content source rather than from hard-coded fixture slugs.

For serverless PostgreSQL, use a pooler URL at runtime and the provider's direct URL for migrations. Development uploads use disk; Vercel needs persistent object storage (the environment contract reserves Vercel Blob variables).

## Architecture

```text
Browser
  -> Next.js pages, localized SEO and React islands
      -> content repository -> Payload -> PostgreSQL
      -> BookingService -> Mock / Manual / Bókun / FareHarbor / Rezdy
      -> PaymentGateway -> Mock / Stripe
```

- `src/app/(frontend)/[locale]`: localized public site
- `src/app/(payload)`: Payload admin/API
- `src/components`: layout, pages, activities, events and booking UI
- `src/lib/content`: Payload-backed content readers
- `src/i18n`: localized interface messages and route mappings
- `src/lib/booking`: contract, validation, service and adapters
- `src/lib/stripe`: server-only payment gateway
- `src/collections`: editorial and private operational collections

## Booking and payments

The browser only calls No1 endpoints. `BookingService` reloads the activity, selects its configured provider, rechecks availability and recalculates integer minor-unit prices. `MockBookingProvider` exposes deterministic 42-day availability; `ManualBookingProvider` returns pending manual confirmation. External adapters intentionally throw `ProviderNotConfiguredError` until credentials, commercial access, mappings and contract tests exist.

`PAYMENT_MODE=mock` is the development default. Stripe code creates hosted Checkout sessions server-side with idempotency and verifies raw-body webhook signatures. Processed event IDs are unique private Payload records. Browser redirects never confirm a booking.

Before enabling Stripe in production, finish and integration-test the fulfillment transaction: persist `pending_payment`, attach Checkout, transition to `paid_pending_confirmation`, create the supplier booking exactly once, then set `confirmed` or `manual_review`. The webhook currently verifies and deduplicates but deliberately does not invent supplier confirmation.

## Environment and deployment guardrails

`.env.example` lists every public and server-only variable without real secrets. Production needs real site/contact details, PostgreSQL, `PAYLOAD_SECRET`, `BOOKING_TOKEN_SECRET`, persistent media storage and configured providers. Do not deploy mock bookings, placeholder contacts or Unsplash seed images as real business data.

Historic `.html` routes redirect to Spanish by default and respect `?lang=en|es|fr|de`.
