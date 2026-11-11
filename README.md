# Century Financial Group website

Next.js 16 (App Router, TypeScript, Tailwind CSS v4, shadcn/ui on Base UI) for
[centuryfinancialgroup.net](https://centuryfinancialgroup.net).

## Routes

| Route | Notes |
| --- | --- |
| `/` | Mortgage welcome + LIMinistries partnership narrative, inquiry form, FAQ |
| `/mortgage-readiness` | California Mortgage Readiness Assessment + lead form |
| `/blog`, `/blog/[slug]` | On-site archive (`?category=` / `?archive=` filters) |
| `/dashboard/mortgage-leads` | Internal lead review + CSV/Excel export (Basic Auth) |

Site-wide: page translator (header globe, Google Translate), disclaimer modal
(first visit, reopen from any footer), ElevenLabs assistant, gold `#c9a84c` favicon.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, Open Graph |
| `DATABASE_URL` | MySQL database for inquiries and leads (schema in `drizzle/`) |
| `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` | Dashboard login; dashboard stays locked if unset |

## Scripts

`dev`, `build`, `start`, `lint`, `typecheck`, `test`, `format`,
`db:generate` / `db:migrate` (drizzle-kit, reads `.env.local`).

## Where things live

- `app/` – routes, metadata, Server Actions (`app/actions.ts`), icons, sitemap/robots
- `components/` – header, footers, translator, disclaimer, page sections, `ui/` (shadcn)
- `lib/` – site config, content, validation (zod), DB access, export helpers
- `drizzle/` – schema + existing migrations (keep in sync with the live DB)
- `proxy.ts` – Basic Auth for `/dashboard`
- `docs/legacy-notes/` – planning notes carried over from the previous build
