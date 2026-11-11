# Century Financial Group website

Next.js 16 (App Router, TypeScript, Tailwind CSS v4, shadcn/ui on Base UI) for
[centuryfinancialgroup.net](https://centuryfinancialgroup.net).

## Routes

| Route                                        | Notes                                                                                                |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/`                                          | Mortgage welcome + LIMinistries partnership narrative, inquiry form, FAQ                             |
| `/mortgage-readiness`                        | California Mortgage Readiness Assessment + lead form                                                 |
| `/blog`, `/blog/[slug]`                      | On-site archive (`?category=` / `?archive=` filters)                                                 |
| `/privacy`, `/disclosures`, `/accessibility` | Privacy policy; licensing, agency, fair-housing and advertising disclosures; accessibility statement |
| `/dashboard/mortgage-leads`                  | Internal lead review + CSV/Excel export (Basic Auth)                                                 |

Site-wide: page translator (header globe, Google Translate, with a machine-translation
notice), disclaimer modal (first visit, reopen from any footer), licensee and Equal
Housing Opportunity strip in every footer, ElevenLabs assistant, gold `#c9a84c` favicon.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

| Variable                                    | Purpose                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                      | Canonical URL for metadata, sitemap, Open Graph                         |
| `SITE_FORMS_KEY`                            | Secret `X-Form-Key` for the n8n form handler (server-only)              |
| `SITE_NAME` / `SITE_CONTACT_EMAIL`          | Site name and recipient inbox sent to n8n                               |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`            | Cloudflare Turnstile site key (public)                                  |
| `TURNSTILE_SECRET_KEY`                      | Turnstile secret (server-only). **Forms are rejected until it is set.** |
| `TURNSTILE_HOSTNAMES`                       | Optional allowlist of form hostnames; defaults to the site host + `www` |
| `DATABASE_URL`                              | Optional MySQL database for inquiries and leads (feeds the dashboard)   |
| `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` | Dashboard login; dashboard stays locked if unset                        |

## Forms → n8n

Both forms (Partnership Inquiry on `/`, Mortgage Readiness request on
`/mortgage-readiness`) submit to Server Actions in `app/actions.ts`. Each action:

1. Verifies the Cloudflare Turnstile token (success, expected action, approved hostname).
2. Validates the input with the same zod schema the browser uses.
3. Saves to MySQL when `DATABASE_URL` is set (the lead dashboard reads this).
4. Forwards a flat, snake_case payload to the n8n handler with the `X-Form-Key`
   header (`form_type: "inquiry"`, plus `form_name` to tell the two forms apart).
   n8n sends the notification and the visitor's confirmation email.

The visitor sees success if either the database or n8n accepted the submission.
The key and the n8n URL never reach the browser. The hidden `website` honeypot is
forwarded as-is; honeypot submissions are never stored.

Test the handler directly:

```bash
curl -X POST https://liministries.app.n8n.cloud/webhook/site-forms \
  -H "Content-Type: application/json" \
  -H "X-Form-Key: $SITE_FORMS_KEY" \
  -d '{"site_name":"Century Financial Group Net","contact_email":"info@centuryfinancialgroup.net","form_type":"inquiry","name":"Test User","email":"you@example.com","message":"Hello","website":""}'
```

### Turnstile

The widget renders explicitly (`components/forms/turnstile-widget.tsx`) and is reset
after every attempt, because tokens are single-use. Actions: `partnership_inquiry`
and `mortgage_readiness`.

- Production: set `TURNSTILE_SECRET_KEY` in Vercel. Hostnames default to
  `centuryfinancialgroup.net` and `www.centuryfinancialgroup.net`.
- Vercel previews: add the preview hostname to `TURNSTILE_HOSTNAMES` for that
  environment (and to the widget's domains in Cloudflare).
- Local: set `TURNSTILE_SECRET_KEY` and `TURNSTILE_HOSTNAMES=localhost` in
  `.env.local`; the widget must list `localhost` as an allowed domain. Never put
  `localhost` in the production allowlist.

## Scripts

`dev`, `build`, `start`, `lint`, `typecheck`, `test`, `format`,
`db:generate` / `db:migrate` (drizzle-kit, reads `.env.local`).

## Where things live

- `app/` – routes, metadata, Server Actions (`app/actions.ts`), icons, sitemap/robots
- `components/` – header, footers, forms, translator, disclaimer, page sections, `ui/` (shadcn)
- `lib/` – site config, content, compliance text, validation (zod), forms (n8n, Turnstile), DB access
- `drizzle/` – schema + existing migrations (keep in sync with the live DB)
- `proxy.ts` – Basic Auth for `/dashboard`
- `docs/legacy-notes/` – planning notes carried over from the previous build
