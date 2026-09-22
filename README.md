# Musafir Tribe

Travel discovery and booking-request application built with React, Vite, Express and MongoDB. The storefront supports searching/filtering journeys, persistent wishlists, authentication and trip-specific booking enquiries. The admin app manages catalogue entries and existing orders.

## Run locally

Requires Node.js 20+ and a reachable MongoDB database. From the project root:

```sh
npm run install:all
npm run dev
```

Stop any existing servers on ports 4000, 5173 and 5174 before starting the combined command. Alternatively, run `npm run server` in `backend`, and `npm run dev` in `frontend` and `admin` separately.

- Storefront: http://localhost:5173
- Admin: http://localhost:5174
- API readiness: http://localhost:4000/api/health

Copy each app's `.env.example` to `.env` when setting up a new checkout. Keep database, JWT, Cloudinary and email credentials **only in backend/.env**. The storefront's blank `VITE_BACKEND_URL` uses Vite's `/api` proxy to localhost:4000. Production hosting must proxy `/api` or set `VITE_BACKEND_URL` to the deployed API origin and configure backend `ALLOWED_ORIGINS`.

## Booking emails with Resend

`Book now` opens a form requiring the traveller's name, phone number, travel date and group size. `Confirm booking request` calls `POST /api/booking/confirm`. The API validates the request, looks up the journey and its price in MongoDB, and sends the details through Resend to **singhjasnoor1421@gmail.com**. The recipient cannot be overridden by the browser. Optional traveller email becomes the reply-to address.

Set these server-only variables:

```dotenv
RESEND_API_KEY=your_real_resend_api_key
RESEND_FROM_EMAIL="Musafir Tribe <onboarding@resend.dev>"
```

The `onboarding@resend.dev` sender can send only to your Resend account's own email address. For other recipients, verify a domain in Resend and use a sender on that domain. See https://resend.com/docs/knowledge-base/403-error-resend-dev-domain.

The UI shows success only after Resend accepts the email. Provider acceptance does not prove inbox delivery: check the Resend dashboard or recipient inbox. Repeated identical submissions reuse a Resend idempotency key. Booking requests are delivered by email; they do **not** create a paid reservation or a new order in the legacy admin Orders screen. Final availability is confirmed by phone. Stripe has been removed from the server and storefront.

## Interview walkthrough

1. Open the homepage and explain the frontend/API/database separation.
2. Open Journeys, search, filter by category and change sort order.
3. Open a journey, save it to the wishlist and reload to demonstrate persistence.
4. Open the booking form and confirm a clearly labelled test request.
5. Show the received email with traveller contact details and booking reference.
6. Open Contact: the location is **Chitkara University**.
7. Show the admin catalogue and explain JWT authentication, validation and rate limiting.

Before presenting, review real catalogue data: there is one Badrinath journey. Its legacy clothing category and placeholder description have been corrected. Add more genuine itinerary details and journeys through the admin editor if available. The existing `backend/seed/seed.js` is optional sample data: it uploads images and inserts sample journeys into the configured database, so run it only against a demo database. Do not present sample testimonials as verified customer feedback.

## Checks

```sh
npm test
npm run build
npm run lint --prefix frontend
npm run lint --prefix admin
```

Automated tests cover booking validation, fixed email recipient, required contact details, provider rejection, idempotent retries and server-side order pricing. Live email delivery also depends on Resend account configuration and network access.

## Vercel production

The GitHub repository is linked to three Vercel projects:

| App | Project root | Production URL |
| --- | --- | --- |
| Storefront | `frontend` | https://musafir-tribe.vercel.app |
| API | `backend` | https://musafir-tribe-api.vercel.app |
| Admin | `admin` | https://musafir-tribe-admin.vercel.app |

Both web apps use `VITE_BACKEND_URL=https://musafir-tribe-api.vercel.app`. The admin uses `VITE_STOREFRONT_URL=https://musafir-tribe.vercel.app`. Backend credentials are configured privately in Vercel; do not commit `.env` or `.vercel` files. Production API CORS allows the storefront and admin origins.

The API requires MongoDB Atlas network access from the hosting environment. A successful Vercel build alone does not establish database connectivity: verify `/api/health` reports `database: connected`, then load the journey catalogue. Failed initial connections are retried on later requests.
