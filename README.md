# Miyagi — website prototype

A simple 5-page site: **Home, About, Articles (`/learn`), Podcast & Videos (`/podcast`), Contact** — plus individual article pages at `/learn/:slug`. Mobile-first and responsive throughout.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Features and how to go live
| Feature | Where | To go live |
|---|---|---|
| Phone capture on landing | `src/components/PhoneCapture.jsx` — popup after 3.5s; dismissing leaves a "free callback" pill. Also inline on Home and behind every "Free callback" button | Send leads to a CRM / Google Sheet / WhatsApp (currently saved in the browser and sent to GA as `phone_captured`) |
| Newsletter / email capture | `src/components/Newsletter.jsx`, shown on every page | Connect Mailchimp / ConvertKit / Brevo |
| Articles / blog | Content in `src/data.js` (`POSTS`), list at `/learn`, article pages at `/learn/:slug` | Move to a CMS (Sanity, Contentful, Notion) or Markdown files |
| Podcast integration | `/podcast` — set `MEDIA.spotifyShowId` in `src/data.js` to embed the real Spotify player (demo player until then) | Add the show ID and platform links |
| YouTube integration | Add `youtubeId` to each entry in `VIDEOS` (`src/data.js`); videos load only when clicked | Add video IDs and the channel URL |
| Google Analytics 4 | `src/lib/analytics.js` — page views + events (phone capture, newsletter, plays). Logs to console until `VITE_GA_ID` is set in `.env` | Add the GA4 measurement ID |
| Google Search Console | Verification meta tag in `index.html`; `public/sitemap.xml` and `robots.txt` | Paste the GSC token, submit the sitemap |
| Basic SEO | `src/lib/seo.js` — per-page title, description, Open Graph/Twitter tags, canonical URL; Article schema on posts; organisation schema in `index.html` | Real domain; pre-render pages for crawlers |
| Images | Unsplash stock photos in `public/img/` (free licence) | Swap in Miyagi's own photography with the same file names |
