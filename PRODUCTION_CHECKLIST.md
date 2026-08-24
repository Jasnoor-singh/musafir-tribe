# Going live — checklist

Your code is now production-hardened (see "What changed" below). This is
the short list of **things only you can do** before real visitors arrive.

## Must do before launch

- [ ] **Change the admin password.** `ADMIN_PASSWORD=admin123` in
      `backend/.env` is a placeholder. Pick a strong password and update
      both `backend/.env` and wherever you deploy your environment
      variables (Vercel dashboard, etc.).
- [ ] **Generate a real `JWT_SECRET`.** Replace `musafirtribe2024secret`
      with a long random string, e.g. run `openssl rand -hex 32` and paste
      the output in. If this leaks, anyone can forge login tokens.
- [ ] **Set `ALLOWED_ORIGINS`** once you know your real domains, e.g.:
      ```
      ALLOWED_ORIGINS=https://musafirtribe.com,https://admin.musafirtribe.com
      ```
      Until you set this, the API accepts requests from any website —
      fine for development, not for production.
- [ ] **Set `NODE_ENV=production`** on your hosting platform. This hides
      internal error details from API responses (Vercel/Render/Railway do
      this automatically; if self-hosting, set it yourself).
- [ ] **Never commit `.env`.** It's already git-ignored. Set the same
      values via your host's environment-variable settings instead.
      Use `.env.example` (included, no real secrets) as the reference for
      which variables are needed.

## Recommended before launch

- [ ] Buy/point your real domain at the frontend deployment, and a
      subdomain (e.g. `admin.musafirtribe.com`) at the admin deployment.
- [ ] Run `node backend/seed/seed.js` once against your real database if
      you want the 6 starter trips in place immediately.
- [ ] Test the Book Now / WhatsApp / enquiry flow end-to-end with your own
      phone number once deployed — see note in-app about the WhatsApp
      number format.
- [ ] Confirm your Web3Forms access key is active (submit a real test and
      check your inbox, incl. spam folder).
- [ ] Test the admin login, Add Trip (with real photo upload to
      Cloudinary), and Edit Trip flows once deployed.

## What changed to make this "live-ready"

**Backend**
- Fixed a real bug: `config/mongodb.js` was appending a hardcoded
  `/e-commerce` onto your connection string, corrupting it. Removed —
  the database name now comes from your `MONGODB_URI` as intended.
- Fixed `process.env.port` → `process.env.PORT` (most hosts set the
  uppercase version; the old code would silently ignore it).
- Added **Helmet** for standard security headers.
- Added **rate limiting** — general API limit plus a stricter one on
  login/register endpoints, to slow down brute-force attempts.
- CORS now restricts to `ALLOWED_ORIGINS` when set, instead of always
  allowing every origin.
- Added a centralized error handler that hides internal error details in
  production and a proper 404 JSON response for unmatched routes.
- Added `GET /api/health` for uptime monitors.
- `app.set('trust proxy', 1)` so client IPs are read correctly behind
  Vercel/any reverse proxy.

**Frontend**
- Added a branded **404 page** for unmatched routes (previously any typo'd
  URL rendered blank).
- Added an **error boundary** so a runtime bug shows a friendly "refresh"
  screen instead of a blank white page.
- Added SEO meta tags (description, Open Graph, Twitter card) — previously
  missing entirely, meaning shared links had no preview.

**Admin**
- Fixed the browser tab title, which read **"Forever Admin Panel"** — a
  leftover from the original e-commerce template, not your brand.
- Fixed the favicon, which was the default Vite logo.
- Added a "View website" link and made it configurable via
  `VITE_STOREFRONT_URL`.

**Both apps**
- `.env.example` files added for backend/frontend/admin so anyone
  deploying this knows exactly which variables are required, without any
  real secrets being committed.
- `.gitignore` tightened.
