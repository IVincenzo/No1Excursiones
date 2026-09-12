# No1 Excursiones

Progressive migration of the original Bootstrap prototype to a server-rendered booking platform for Tenerife. The original HTML/CSS/JavaScript implementation remains untouched at the repository root and is copied to `/legacy/index.html` for visual and functional comparison.

## Stack and local setup

Node.js 22, pnpm 11, Next.js 16 App Router, React 19, strict TypeScript, Bootstrap 5.3.3, `next-intl`, Payload CMS 3/PostgreSQL, Stripe's server SDK, Vitest and Playwright.

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. `/` negotiates `Accept-Language` and falls back to `/en`. The legacy reference is available at `/legacy/index.html` with `X-Robots-Tag: noindex, nofollow`.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Playwright browsers require the separate command `pnpm exec playwright install chromium`.

## Content and Payload

`CONTENT_SOURCE=static` (default) runs without a database using the exact legacy fixtures. `CONTENT_SOURCE=payload` reads published localized documents through Payload's Local API. There is no automatic production fallback.

```bash
docker compose up -d postgres
pnpm payload migrate:create
pnpm payload migrate
pnpm payload:import
pnpm dev
```

The admin is at `/admin`. The idempotent import matches the stable activity `code`, imports all four translations, leaves unavailable business fields empty and sets legacy SEO indexing off. Fictional events are never imported.

For serverless PostgreSQL, use a pooler URL at runtime and the provider's direct URL for migrations. Development uploads use disk; Vercel needs persistent object storage (the environment contract reserves Vercel Blob variables).

## Architecture

```text
Browser
  -> Next.js pages, localized SEO and React islands
      -> content repository -> static fixtures or Payload -> PostgreSQL
      -> BookingService -> Mock / Manual / Bókun / FareHarbor / Rezdy
      -> PaymentGateway -> Mock / Stripe
```

- `src/app/(frontend)/[locale]`: localized public site
- `src/app/(payload)`: Payload admin/API
- `src/components`: layout, pages, activities, events and booking UI
- `src/data/legacy`: extracted activities, events and 165 messages × 4 languages
- `src/lib/content`: explicit static/Payload data boundary
- `src/lib/booking`: contract, validation, service and adapters
- `src/lib/stripe`: server-only payment gateway
- `src/collections`: editorial and private operational collections
- `public/legacy`: preserved `noindex` reference

## Booking and payments

The browser only calls No1 endpoints. `BookingService` reloads the activity, selects its configured provider, rechecks availability and recalculates integer minor-unit prices. `MockBookingProvider` exposes deterministic 42-day availability; `ManualBookingProvider` returns pending manual confirmation. External adapters intentionally throw `ProviderNotConfiguredError` until credentials, commercial access, mappings and contract tests exist.

`PAYMENT_MODE=mock` is the development default. Stripe code creates hosted Checkout sessions server-side with idempotency and verifies raw-body webhook signatures. Processed event IDs are unique private Payload records. Browser redirects never confirm a booking.

Before enabling Stripe in production, finish and integration-test the fulfillment transaction: persist `pending_payment`, attach Checkout, transition to `paid_pending_confirmation`, create the supplier booking exactly once, then set `confirmed` or `manual_review`. The webhook currently verifies and deduplicates but deliberately does not invent supplier confirmation.

## Environment and deployment guardrails

`.env.example` lists every public and server-only variable without real secrets. Production needs real site/contact details, PostgreSQL, `PAYLOAD_SECRET`, `BOOKING_TOKEN_SECRET`, persistent media storage and configured providers. Do not deploy mock content, fictional events, placeholder contacts or Unsplash references as real business data.

Root HTML files and `assets/` remain the reference. `pnpm legacy:extract` regenerates fixtures after an intentional legacy data edit. Historic `.html` routes redirect to Spanish by default and respect `?lang=en|es|fr|de`.
