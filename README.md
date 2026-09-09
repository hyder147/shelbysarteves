# Shelby's Arteves. Company Website

A full project: React frontend, Python (Flask) backend, and a SQLite database.

## What's included

```
shelbys-arteves/
  frontend/        React app (Vite). The actual website.
  backend/         Flask API. Serves services data, stores leads/feedback/pageviews.
  database/        schema.sql (reference) and a seeded copy of the SQLite database.
  README.md        this file
```

## Navbar rebuild (fixed a real bug)

The previous pass added an auto-hide-on-scroll navbar, which had a genuine
bug: once you scrolled down, the whole header (including the hamburger
button) slid off-screen, making the mobile menu unreachable. That behavior
is removed entirely. In its place:

- A gradient pill slides smoothly between nav links to track whichever
  section is active, measured against the real DOM position so it's always
  aligned.
- Mobile menu is now a full-screen slide-in panel from the right with a
  dimmed backdrop, tap-outside-to-close, and staggered link reveal — not a
  dropdown that competes for space in the header.
- The hamburger icon morphs into an X with a pure-CSS animation instead of
  swapping icons.
- "Book a demo" has a subtle diagonal shimmer sweep across it every few
  seconds.
- The navbar itself always stays visible and reachable, on every screen
  size, at every scroll position — no more disappearing header.

## Navbar + color pass (latest)

- Real logo mark (a small gradient "signal bars" icon) instead of a plain
  dot, next to the wordmark.
- Nav links now use a pill-style active background instead of an underline.
- "Book a demo" is a proper gradient CTA that shifts on hover.
- The navbar hides on scroll-down and reappears on scroll-up once you're
  past the hero — the usual pattern on polished SaaS sites.
- Mobile menu links now reveal with a short stagger instead of appearing
  all at once.
- Unified the whole site's accent color under one three-stop brand gradient
  (`--grad-brand` in `index.css`: indigo → violet → teal) instead of a flat
  two-color gradient, and applied it consistently to the hero waveform, the
  call-card illustration, the "how it works" connector line, service card
  hover edges, the CTA banner ring, and all button glows — one coherent
  palette everywhere instead of different gradients per section.

## Animation pass (latest)

- Thin scroll-progress bar fixed to the top of the page (`ScrollProgress.jsx`).
- Hero: floating gradient blobs, a mouse-tracked glow that follows the
  cursor, and a word-by-word headline reveal on load.
- Buttons: a magnetic gradient-glow hover effect (`.btn-magnetic`, used on
  the hero's primary CTA) plus a subtle press-scale on every button.
- "Why Shelby's Arteves" cards: a cursor-tracked spotlight glow that follows
  your mouse inside each card on hover.
- The feature showcase illustration tilts slightly in 3D on hover.
- The closing CTA banner now has a slow-rotating conic gradient ring behind
  the drifting glow.
- Every new effect is disabled automatically for visitors with
  `prefers-reduced-motion` set, so nothing depends on motion to use the site.

All of this is original CSS/SVG/JS written for this project — nothing was
copied from cognigy.com or any other site. Their pages were used only as a
structural reference (image+text feature blocks, benefits grid, closing CTA
banner) for the earlier redesign pass below.

## UI redesign (latest pass)

- Sticky navbar with a mobile hamburger menu, scroll shadow, and active
  section highlighting as you scroll.
- One signature hero animation (radar pulse + call waveform) instead of
  scattered effects everywhere, plus a single staggered entrance for the
  headline/CTA on load.
- A new feature showcase section ("A phone call that actually gets
  handled") with an original SVG illustration of a call being answered and
  booked, next to icon-led copy — inspired by the image-and-copy layout on
  cognigy.com's solutions pages, but built as original artwork rather than
  reused/stock imagery (see note on images below).
- A "Why Shelby's Arteves" benefits grid (6 cards, icon + heading + line).
- Scroll-triggered reveals on section headers and cards
  (`src/hooks/useReveal.js`, `src/components/Reveal.jsx`), all respecting
  `prefers-reduced-motion`.
- Animated count-up numbers in the stat strip.
- Service and benefit cards lift on hover.
- A drawing connector line across the "How it works" steps as you scroll
  to them, since that content really is a sequence.
- An auto-scrolling marquee of the industries list (pauses on hover).
- A closing CTA banner with a slow-drifting gradient glow, mirroring the
  "take your business further" banner pattern on large SaaS sites.
- Real Instagram/email icons (via `react-icons`) in the navbar and footer,
  with a hover animation on the footer's icon buttons.

**On images:** cognigy.com's pages lean heavily on real product screenshots,
customer logos, and photography they own the rights to. This site can't
legally reuse those, and there aren't yet real screenshots or customer
photos of Shelby's Arteves to use instead. Rather than pull random stock
photos of unrelated people/offices (which would look generic and carries
its own licensing risk if sourced carelessly), the new feature section uses
an original SVG illustration built to match your existing signal-panel
style. If you send over real product screenshots, team photos, or licensed
stock images, they can be dropped in directly — the layout (`FeatureShowcase.jsx`)
is already built to take a real image in place of the illustration.

New dependency: `react-icons` (added to `frontend/package.json`).

## What changed in this pass (deploy-readiness fixes)

- **Auth on `/api/leads`** — now requires `Authorization: Bearer <ADMIN_TOKEN>`.
  If `ADMIN_TOKEN` isn't set, the route is disabled (503) rather than open.
- **Gunicorn instead of the Flask dev server** — see `backend/wsgi.py` and
  `backend/Procfile`. `python app.py` still works for local development only.
- **CORS locked down** — only origins listed in `ALLOWED_ORIGINS` can call the
  API. No more wide-open CORS.
- **Rate limiting** — the contact form (5/hour/IP) and feedback form
  (10/hour/IP) are throttled with Flask-Limiter to cut down on spam bots.
- **Safe error handling** — `debug=True` is off by default, unhandled errors
  are logged server-side and return a generic message to visitors, and the
  contact form now shows a "Try again" retry option plus a direct email
  fallback if the API is unreachable.
- **Star rating / feedback widget** — a new "Rate your experience" section
  posts to `/api/feedback`, with a public aggregate average via
  `/api/feedback/summary` (no PII, no individual comments exposed).
- **First-party analytics** — a cookie-free page-view counter
  (`/api/analytics/pageview`, admin-only summary at `/api/analytics/summary`).
  No third-party account needed to start; see "Adding real analytics" below
  if you want more detail later.
- **Privacy Policy** — `frontend/public/privacy.html`, linked from the
  footer. **This is a starting template, not legal advice** — have someone
  review it against GDPR/CCPA/your local requirements before relying on it.
- **SEO basics** — meta description, Open Graph/Twitter tags, canonical URL,
  a favicon, `robots.txt`, and a `sitemap.xml` placeholder.
- **No data scraping of any kind** — to be explicit: nothing in this codebase
  collects, scrapes, or purchases data from Google Maps or any other source.
  The site only stores what a visitor directly submits through the contact
  or feedback forms. The footer says this plainly, and it's in the privacy
  policy too.

## Quick start

### 1. Backend (Flask + SQLite)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then fill in ADMIN_TOKEN, ALLOWED_ORIGINS, etc.
python database.py              # creates/seeds shelbys_arteves.db if needed
python app.py                   # local dev only, runs on http://localhost:5000
```

Generate an admin token:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

API endpoints:
- `GET /api/services` — the 8 services, pulled from the database
- `POST /api/contact` — saves a lead (rate limited, validated)
- `GET /api/leads` — admin-only, requires `Authorization: Bearer <ADMIN_TOKEN>`
- `POST /api/feedback` — saves a 1–5 star rating + optional comment
- `GET /api/feedback/summary` — public aggregate rating (count + average)
- `POST /api/analytics/pageview` — records a page view (no cookies/PII)
- `GET /api/analytics/summary` — admin-only page view totals
- `GET /api/health` — health check

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev                     # http://localhost:5173
npm run build                   # outputs to frontend/dist
```

Vite proxies `/api` to `http://localhost:5000` in dev, so the two work
together automatically.

## Deploying for real

1. **Backend**: deploy to Render / Railway / a VPS with:
   ```
   web: gunicorn wsgi:app --workers 3 --threads 2 --bind 0.0.0.0:$PORT
   ```
   (already in `backend/Procfile`). Set the environment variables from
   `.env.example` on the host — especially `ADMIN_TOKEN` and
   `ALLOWED_ORIGINS` (your real frontend domain, not localhost).
2. **Frontend**: deploy `frontend/dist` (after `npm run build`) to
   Netlify/Vercel/GitHub Pages, or serve it from the same host as the API.
3. **Domain + HTTPS**: buy a domain and point it at your host. Netlify/
   Vercel/Render provision HTTPS automatically once the domain is connected.
4. Update `robots.txt`, `sitemap.xml`, and the `og:url`/`canonical` tags in
   `frontend/index.html` with your real domain once you have one.
5. SQLite is fine at this volume. If lead volume grows and you start seeing
   concurrent-write issues, migrate to Postgres — `database/schema.sql` is
   plain SQL and translates directly.

## Adding real analytics later

The built-in page-view counter needs no account and respects privacy by
design, but it's basic. To add Google Analytics or Plausible later, drop
their script tag in `frontend/index.html` (there's a comment marking where),
or wire up a `VITE_GA_ID` environment variable in `main.jsx`. No code here
needs to change for that to work.

## Before this goes live — remaining items

- Confirm the contact email (`shelbysarteves@gmail.com`) and Instagram handle
  (`@shelbysarteves`) are correct.
- The testimonial in `frontend/src/components/Testimonial.jsx` is still
  clearly-labeled placeholder copy — swap in a real customer quote once you
  have one, or remove the section.
- Add a real screenshot of the product for the Open Graph social-share image
  (`og:image` tag is commented out in `index.html` until you have one).
- Have the privacy policy reviewed by someone qualified for your
  jurisdiction — the included one is a solid starting template, not legal
  advice.
- Set up a staging environment and basic automated tests before this scales
  past a handful of leads a week.
