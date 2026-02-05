# Pythia Website

Marketing website for Pythia Insights — Eric's fractional CFO/FP&A consulting practice.

## Quick Context

- **URL:** pythiainsights.com
- **Tech:** Astro + Tailwind CSS (static site)
- **Hosting:** Cloudflare Pages (auto-deploys from GitHub)
- **Repo:** github.com/rambouhh/pythia-website

## Current Status

✅ **Live and functional** — All core pages built
- Homepage with problem/solution messaging
- Services page (bookkeeping, FP&A, fractional CFO, payroll, tax)
- About page
- Contact page with form

🔲 **Needs work:**
- Analytics setup (Cloudflare Web Analytics or Plausible)
- SEO optimization (meta tags, sitemap, structured data)
- Blog/content section for SEO
- Testimonials section (once available)

## Key Files

```
src/
├── pages/
│   ├── index.astro      # Homepage
│   ├── services.astro   # Service offerings
│   ├── about.astro      # About Eric/company
│   ├── contact.astro    # Contact form
│   └── success.astro    # Form submission success
├── layouts/
│   └── Layout.astro     # Base layout with nav/footer
└── components/          # Reusable components
```

## Deployment

**Auto-deploy:** Push to `main` branch → GitHub Actions → Cloudflare Pages

**Manual build:**
```bash
cd /root/clawd/projects/pythia-website
npm run build    # Output in ./dist/
npm run dev      # Local dev server on :4321
```

**⚠️ Git push requires valid PAT** — Currently expired, needs refresh from Eric.

## Related Docs

- `/root/My Big Vault/Pythia/Website Planning.md` — Positioning, messaging strategy
- `/root/My Big Vault/Pythia/Website Build Spec.md` — Original technical spec
- `/root/My Big Vault/Pythia/Positioning Document.md` — Brand voice, differentiators

## Services Listed

1. Bookkeeping & Accounting
2. FP&A & Financial Analysis
3. Fractional CFO Services
4. Payroll processing and tax filings
5. Tax Planning (coming soon)
6. BI & Dashboard Development

---

*Last updated: 2026-02-02*
