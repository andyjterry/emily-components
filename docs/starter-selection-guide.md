# Starter Selection Guide

**Last Updated:** 2026-07-05

Six working starters live in `emily-starters/`. Each is a complete page (or site) with its own `emily.config.json` and built CSS — re-branding is a config edit + rebuild, never an HTML edit.

## Pick by situation

| Starter | Pick when | Signature sections |
|---|---|---|
| `local-service-business/` | Trade/service business serving an area: plumber, electrician, cleaner | Hero, trust strip, services grid, why-us split, CTA band, quote form |
| `one-page-business/` | Small business that needs everything on one scrolling page — fastest to launch | Sticky header with anchor nav, services, about, testimonials, FAQ, contact |
| `professional-services/` | Firm selling expertise where credibility does the selling: advisory, legal, accounting | Utility top bar, credentials strip, process steps, team, client outcomes, consultation form |
| `charity-community/` | Charity or community organisation | Mission hero, impact stats, programmes, story + pull quote, donate CTA (external link), volunteer form |
| `portfolio-case-study/` | Work-led business where the portfolio sells: studio, maker, agency | Portfolio grid with flush-image cards, featured case study, approach, contact band |
| `campaign-landing/` | One campaign, one conversion goal — PPC/offer traffic | Minimal chrome (logo + phone), offer alert, message-matched hero, single short form, `noindex` |

## Decision shortcuts

- Fewer than ~5 services and no blog → `one-page-business`.
- Paid traffic to a single offer → `campaign-landing` (never send ads to a full homepage).
- Selling trust in people → `professional-services`. Selling visible output → `portfolio-case-study`.
- Everything local-trade shaped → `local-service-business`, the most complete reference.

## After copying

1. Edit `emily.config.json`: brand/accent colours, fonts.
2. Rebuild: `node ../../emily-css/bin/emilyui.js build`, then `node -e "require('../../emily-css/src/index.js').purge()"`.
3. Replace placeholder copy and drop images into `images/placeholders/` under the documented names.
4. Add pages by copying section orders from `emily-components/templates/`.

## Not available yet

Health/wellness, hospitality/venue, consultant/freelancer, event, course/workshop, grant microsite, ecommerce, membership — all `planned` (or blocked) in the manifest with reasons. Do not promise them to clients; compose from templates instead.
