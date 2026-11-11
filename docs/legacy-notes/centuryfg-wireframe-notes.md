# CenturyFG Wireframe Integration Notes

## Verified Reference Findings

The supplied wireframe defines a mortgage-focused public experience with a **white, full-width header**, a simple primary navigation, compact dark-green conversion actions, a substantial visual opening area, an introductory mortgage narrative, a direct-conversion row, a client-review area, a full-width conversion band, and a dense multi-column footer. The reference palette centers on deep forest green (`#0E5030`), soft green-gray (`#F1F5F1`), white, and muted green outline text.

The sitemap reference identifies Purchase, Refinance, Loan Options, About Us, Contact Us, and Blog as principal marketing categories. It also highlights Quote, Apply Online, and mortgage-calculator paths as conversion utilities, and treats privacy, consent, and calculator disclaimers as first-class content areas.

## Applied Scope

The implementation will add a dedicated **California Mortgage Readiness** public route rather than replace the existing LIMinistries partnership page. The mortgage route will use the wireframe’s white-and-forest-green conversion system, mortgage education hierarchy, direct conversion choices, and disclosure emphasis. It will not copy testimonial content, application-routing content, or unverified rate/product claims.

The public content at `https://centuryfinancialgroup.net` could not be retrieved in this environment: browser navigation returned a connection-closed error and text extraction returned no content. The supplied wireframe therefore serves as the verified design and content reference for this iteration.

## Live CenturyFG Front-Layout Verification

On September 16, 2026, `https://centuryfg.com` was directly reviewed. Its public header uses the following verified navigation labels: **Purchase, Refinance, Loan Options, About Us, Contact Us, and Blog**. Its two primary header actions are **Apply Online** and **Get A Quote**. The visible page hierarchy begins with a large introductory visual region, followed by a welcome narrative, direct conversion actions, client reviews, a full-width conversion prompt, and a dense multi-column footer.

The adapted homepage uses this verified header/menu hierarchy and action arrangement, maps the applicable links to the current mortgage-readiness and partnership sections, and retains an external link to CenturyFG’s existing Blog and Apply Online paths. It does not import testimonials or loan claims from the source site.

## Responsive QA Note

Desktop review confirmed a clear white masthead, the full six-item CenturyFG menu, paired **Apply Online** and **Get A Quote** actions, and a mortgage-first conversion hierarchy. Mobile review confirmed the compact header and menu control. To preserve text contrast at the narrower width, the transactional hero photograph is intentionally deferred until the tablet breakpoint; mobile retains the white, spacious CenturyFG-style opening with readable title, licensing line, and conversion actions.

## Navigation Validation

The public mortgage-readiness destination was opened successfully at `/mortgage-readiness`, confirming that the header’s Purchase, Refinance, Loan Options, and Get A Quote mappings resolve to the intended mortgage education and assessment experience. The homepage’s verified About Us mapping resolves to the existing `#mission` partnership-mission section. The remaining public Contact Us mapping targets the existing `#inquiry` form section.

The Contact Us destination was opened successfully at `/#inquiry`. The browser positioned the document below the top of the page and exposed the professional inquiry form fields, confirming that the page anchor resolves to the intended direct-contact experience.

## Shared Navigation and Local Blog Update

The public homepage, mortgage-readiness route, and local `/blog` archive now render one shared public masthead. The menu labels remain **Purchase, Refinance, Loan Options, About Us, Contact Us, and Blog**. The Blog menu item is local (`/blog`); no public client file retains a link to `https://www.centuryfg.com/blog/`.

The local blog uses the observed CenturyFG archive pattern—compact title/breadcrumb strip, left-aligned post list with imagery and metadata, and a category/archive sidebar—while the titles, summaries, labels, dates, and calls to action are original project content. Desktop and mobile reviews confirm the common header on all three public routes and a readable one-column blog presentation at narrow widths.
