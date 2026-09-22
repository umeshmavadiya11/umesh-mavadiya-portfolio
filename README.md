# Umesh Mavadiya — personal portfolio

An engineering-led portfolio built with Next.js App Router, React, TypeScript, locally hosted fonts, Lucide icons, and PostgreSQL through Drizzle ORM. The warm editorial design combines original HTML/SVG product previews with small, keyboard-accessible interactive components.

## Run locally

1. Install dependencies with `npm ci`.
2. Configure the variables in `.env.example` in your local `.env`. Never commit production secrets.
3. Start PostgreSQL and apply the schema with `npx drizzle-kit push` (the sandbox uses the provided local Drizzle configuration).
4. Run `npm run dev`.

The portfolio pages are server-rendered/static where possible. `/contact` reads optional service, project, and channel parameters on the server. `/api/inquiries` is a Node.js route handler.

## Content and honesty

- `src/data/projects.ts`: six **illustrative project concepts**, their architectural approaches, and intended—not measured—outcomes. Replace concepts with verified case studies as real portfolio evidence becomes available.
- `src/data/content.ts`: skills, services, working style, process, and FAQ.
- No fabricated clients, testimonials, revenue, user counts, or performance results.
- Dashboard screens are original interface mockups and are marked UI CONCEPT.
- The workspace photograph is illustrative, not a claim about Umesh’s office.
- No public Contra or GitHub account was supplied. Their links deliberately lead to an explanatory contact flow until verified URLs are configured. The LinkedIn URL was found through a public profile reference; verify it before launch.

## Configuration before production

Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain; it powers canonical URLs, JSON-LD, the sitemap, and Open Graph links. Configure `NEXT_PUBLIC_CONTRA_URL`, `NEXT_PUBLIC_GITHUB_URL`, and `NEXT_PUBLIC_LINKEDIN_URL` with verified HTTPS profile URLs. Do not put API secrets in `NEXT_PUBLIC_*` variables.

For a remote production database, configure Drizzle migrations with that environment’s connection rather than using the sandbox’s local `drizzle.config.json`. Use managed PostgreSQL backups, encrypted transport, and a restricted application role. Terminate HTTPS at the hosting platform or reverse proxy.

## Inquiry workflow

- The accessible form validates on the client and independently on the server.
- Fields: name, email, project type, budget, message, consent, referral source.
- A honeypot, minimum completion time, bounded request size, same-origin checks, and durable hashed IP/email rate limits reduce spam.
- Limits: five inquiries per IP and three per email in a fixed 15-minute window. Configure a trusted reverse proxy to overwrite client-supplied forwarding headers.
- A unique client submission UUID makes network retries idempotent.
- Drizzle stores each accepted inquiry in `portfolio_inquiries` and returns a short `UM-...` reference derived from its primary key.
- Expired rate-limit records are cleaned up on subsequent valid submissions.
- **No email delivery is implied.** Submissions are saved to PostgreSQL. This version intentionally has no admin panel, mailbox integration, or third-party notification dependency. The operator must review the table using a secured database management workflow (for example, Drizzle Studio bound to localhost). Do not expose the table through a public GET endpoint.
- To add notifications later, send them from a server-only integration with environment-based credentials, without weakening the database save guarantee.
- Honor deletion/correction requests according to the privacy notice and your legal obligations. Define an operational retention schedule before production launch.

## Accessibility and performance

Semantic landmarks and headings; skip link; visible focus; native FAQ disclosure elements; labeled inputs and inline errors; mobile menu Escape/focus behavior; keyboard-operable architecture tabs; reduced-motion support. Decorative previews are hidden from assistive technology. Project content and important links are available in server HTML.

Fonts are self-hosted and preloaded via `next/font/local`. The photograph uses `next/image` with responsive sizes and AVIF/WebP output. No tracking scripts, video backgrounds, animation framework, or external font requests. Motion is CSS-based and progressively enhanced with a small IntersectionObserver.

Security headers include a CSP, MIME-sniffing prevention, a strict referrer policy, and restricted permissions. The CSP allows inline scripts/styles needed by the statically rendered Next.js app; an independently deployed version can adopt per-request nonces if stricter script policies are required. Embedding is left available for the managed preview.

## Checks

- `npm run lint`
- `npx next typegen`
- `npm exec tsc -- --noEmit --pretty false`
- `node --experimental-strip-types --test tests/contact.test.mjs`
- `npm run build`
- `/api/health` checks PostgreSQL connectivity via Drizzle.

With the production preview already running, the browser checks can be run with:

- `npx playwright install --with-deps chromium` (once per test environment)
- `npx tsx tests/database-check.ts --reset` (local test database only)
- `node tests/browser-check.mjs`
- `npx tsx tests/database-check.ts` (verify persisted test inquiries and remove them)
- `node tests/accessibility-check.mjs`

Set `TEST_BASE_URL` if the preview is not at `http://localhost:3000`. The end-to-end suite checks all eight requested homepage widths, secondary-page layouts, keyboard interactions, project filters, service/project-prefilled contact flows, persistence, duplicate protection, spam/origin checks, rate limits, metadata routes, and health. Screenshots and audit reports are written to the ignored `artifacts/` directory. The database helper refuses non-local connections and removes only inquiries using the reserved `@portfolio-test.example` domain; it also resets local rate-limit records. Do not run test resets against a live customer database.

The axe audit checks WCAG A/AA rules across the main page types. Only decorative miniature dashboard illustrations are excluded from contrast analysis—not the real UI or content. Automated checks complement, rather than replace, keyboard and visual review.

GitHub Actions runs lint, route type generation, TypeScript, unit tests, and a production build against a PostgreSQL service. Deployment is deliberately not attached to a guessed account or cloud resource. Connect the repository to your verified Vercel, Azure, or AWS deployment pipeline after providing production configuration.

## Asset credits

- Manrope, Google Fonts, SIL Open Font License (included in `public/fonts/manrope-OFL.txt`).
- DM Sans, Google Fonts, SIL Open Font License (included in `public/fonts/dm-sans-OFL.txt`).
- Workspace photograph by Hanna Pad / Anna Nekrashevich, Pexels: https://www.pexels.com/photo/a-laptop-beside-a-notebook-8534455/
- Lucide icons, ISC license.
- All code/architecture/product interface illustrations are original HTML, CSS, and SVG in this project.
