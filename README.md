# Miyagi — website prototype

React + Vite prototype covering the site map: Home, About, Team, Programs (audience filter → 8 program pages → enquiry form), Corporate, Events (upcoming / past gallery → event page → Razorpay-style checkout → confirmation), Learn (articles, podcast, YouTube), Contact, and a client-editable admin at `/admin`.

```bash
npm install
npm run dev      # http://localhost:5173
```

## What's real vs. mocked
| Area | Prototype behaviour | To go live |
|---|---|---|
| Data | Saved in the browser's localStorage (`src/lib/store.js`). "Reset demo data" is in the admin sidebar | Backend API + database |
| Payments | Mock payment sheet in `src/pages/EventDetail.jsx` | Razorpay Orders API + server-side signature check |
| Confirmation email | Shown on screen only | Transactional email (e.g. Resend / SES) |
| Admin login | Any password works | Real auth |
| Phone capture | Popup after 3.5s; dismissing it leaves a "free callback" pill. Leads show up in Admin → Leads | Push to CRM / WhatsApp |
| Analytics | `src/lib/analytics.js`. Logs events to the console; set `VITE_GA_ID` to send them to GA4 | Add the GA4 ID |
| SEO | Per-page titles and descriptions, OG tags, `robots.txt`, `sitemap.xml`, GSC meta tag in `index.html` | Pre-render pages, real domain, GSC token |
| YouTube / podcast | Click-to-load embeds and a simulated player | Add video IDs and podcast RSS |
| Images | Unsplash stock photos in `public/img/` (free licence), mapped in `src/data.js` | Swap in Miyagi's own photography, keeping the same file names or paths |
