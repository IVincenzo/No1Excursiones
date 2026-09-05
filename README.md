# No1 Excursiones

Static Bootstrap website for a Tenerife tourism agency.

## Open Locally

Open `index.html` in a browser. The site uses Bootstrap and remote images through CDN URLs, so an internet connection is needed for the final visual styling and imagery.

## Structure

- `index.html` - homepage
- `local-events.html` - editable local events board
- `plan-your-trip.html` - 15-minute call page
- `about.html` - agency page
- `contact.html` - contact form demo
- `activities/` - one HTML page per activity category
- `assets/css/styles.css` - custom responsive styles
- `assets/js/api.js` - mock activity data, availability, and booking service
- `assets/js/calendar.js` - calendar UI and booking interactions
- `assets/js/events.js` - editable mock local events board
- `assets/js/main.js` - shared navigation, footer, cards, Calendly fallback, forms

## Calendly

To connect the real 15-minute call scheduler, edit `plan-your-trip.html` and set:

```html
data-calendly-url="https://calendly.com/your-account/15min"
```

## Partner APIs

Replace the mock methods in `assets/js/api.js`:

- `getAvailability(activitySlug)`
- `createBooking(payload)`

The calendar and forms already call those methods, so partner API integration should not require rewriting the UI.

## Languages

The site supports Spanish, English, French, and German through `assets/js/i18n.js`.

- Spanish is the default language.
- The navbar language selector stores the visitor choice in `localStorage`.
- A page can also be opened with `?lang=en`, `?lang=fr`, or `?lang=de`.
- Activity translations live in `assets/js/api.js` because the activity pages and cards are rendered from shared activity data.

## WhatsApp Widget

The floating WhatsApp widget is rendered from `assets/js/main.js` on every page.

To connect the real WhatsApp number, replace the placeholder `34000000000` in `renderWhatsAppWidget()`.
