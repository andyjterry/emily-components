# Branching Init — Product Spec (v1 draft)

**Last Updated:** 2026-07-05
**Status:** Spec only. Not implemented. Do not build without sign-off.

## Purpose

A guided init flow that takes a developer from *nothing* to *branded, accessible, reviewable site scaffold* in one sitting: first tokens (the existing `emily-css init`), then site assembly questions that select from the Emily UI templates and starters.

## User problem

Today the fast path is: run `emily-css init`, then manually copy a starter, then manually swap patterns. Each step is documented but disconnected. The people EmilyCSS serves best (mixed-skill teams, freelancers, no-build-pipeline projects) lose time at exactly the joins the products are supposed to remove. The manifest already knows every buildable section — the user shouldn't have to.

## Why this helps EmilyCSS and Emily UI

- Shortens "blank config → usable branded page" — the core decision filter.
- Turns the component manifest from documentation into product: the same file that tracks build status drives what init can offer.
- Keeps agents honest too: a CLI (or AI agent) reading the manifest offers only `built` entries — no guessing, no hallucinated components.

## Relationship between emily-css init and Emily UI init

Boundary stays sharp:

| Layer | Owns | Init responsibility |
|---|---|---|
| `emily-css` | tokens, utilities, generated classes | Phase 1 questions: brand/accent/neutral colours, fonts, spacing, radius, shadows, focus ring, semantic roles → writes `emily.config.json`, builds CSS |
| Emily UI (`emily-components` + `emily-starters`) | patterns, templates, starters | Phase 2 questions: site type, section choices → copies/assembles HTML from templates |

The branching init **connects** them — phase 2 consumes phase 1's output; neither layer reaches into the other's internals.

## Command shape — trade-offs and recommendation

| Option | For | Against |
|---|---|---|
| `emily-css init --ui` | One CLI, zero new packaging, natural upgrade of existing flow | UI layer name hidden behind css tool |
| `emily-css init site` | Reads well | Introduces subcommand-of-subcommand pattern the CLI doesn't use |
| `emily-ui init` / `emily-ui create` | Cleanest naming long-term | Requires a new published package + bin — publishing is currently a non-goal; emily-components is internal-first |

**Recommendation (v1): `emily-css init --ui`.**
Ship inside the existing CLI: run standard token init, then branch into UI questions when the flag is present. When Emily UI later becomes a published package, add `emily-ui init` that *delegates* to `emily-css init` for phase 1 — the flag becomes an alias, nothing breaks. Naming purity is not worth a packaging project today.

## Proposed question flow

Phase 1 — tokens (existing `emily-css init`, unchanged):
brand colour → accent → neutral → status colours → fonts → spacing scale → radius → shadows → focus ring → semantic roles.

Phase 2 — site (new, only with `--ui`):

1. **Site type** (selects a starter or template set):
   - Local service business
   - One-page business
   - Professional services
   - Charity/community
   - Portfolio/case study
   - Campaign landing
   - Custom from templates
2. **Navigation:** simple header · header with CTA · header with top bar · minimal landing header · *(drawer/mega menu listed but disabled: needs-js)*
3. **Hero:** standard · split · CTA pair · quote form · review proof · *(full-bleed disabled: needs-a11y-review)*
4. **CTA:** CTA band · split CTA · sticky call button · campaign conversion block
5. **Footer:** simple · multi-column · newsletter
6. **Form:** short enquiry · detailed quote · callback request
7. **Trust/proof:** testimonials grid · trust badges · insurance/guarantee · local proof (multi-select)
8. **Content sections:** services grid · process steps · FAQ · gallery · pricing · blog grid · case studies (multi-select)
9. **Extra pages:** contact · legal set (privacy/terms/accessibility) · 404 · thank-you (multi-select, default on)

Every option list is **generated from the manifest**, not hard-coded (see Manifest integration).

## Example CLI session

```text
$ npx emily-css init --ui

  EmilyCSS tokens
  ✔ Brand colour … #0F766E
  ✔ Accent colour … #B45309
  ✔ Fonts … Atkinson / Inter
  ✔ (…existing init questions…)
  ✓ emily.config.json written, CSS built

  Emily UI site setup
  ? What are you building?        › Local service business
  ? Header                        › Header with CTA
  ? Hero                          › Hero with CTA pair
  ? Main call to action           › CTA band
  ? Footer                        › Multi-column
  ? Enquiry form                  › Detailed quote form
  ? Proof sections (space to pick)› ◉ Testimonials  ◉ Trust badges  ◯ Local proof
  ? Content sections              › ◉ Services grid ◉ Process steps ◉ FAQ
  ? Extra pages                   › ◉ Contact  ◉ Legal set  ◉ 404  ◉ Thank-you

  ✓ 6 pages scaffolded to ./site
  ✓ CSS purged: dist/emily.css (91 KB)
  → Open site/index.html to review. FAQ pattern pending manual AT check — see manifest.
```

## Mapping answers → manifest entries

Selections resolve to manifest ids; the scaffolder concatenates the corresponding example blocks:

| Answer | Manifest id (examples) |
|---|---|
| Local service business | `page-starters-local-trade-service-business-starter` |
| Header with CTA | `organism-navigation-header-with-cta` |
| Hero with CTA pair | `organism-hero-sections-hero-with-cta-pair` |
| CTA band | `organism-conversion-sections-cta-banner` |
| Multi-column footer | `organism-navigation-footer-multi-column` |
| Detailed quote form | `organism-conversion-sections-detailed-quote-form` |
| FAQ | `organism-informational-sections-faq-accordion` *(offered with its needs-a11y-review caveat surfaced)* |
| Legal set | `template-core-pages-legal-privacy-page`, `-terms-page`, `-accessibility-statement-page` |

Rules:

- Only `status: "built"` entries are selectable. `needs-js` / `needs-a11y-review` entries appear greyed with the reason from `accessibilityNotes` (FAQ is the one deliberate exception — selectable with its caveat printed).
- `dependencies` arrays drive auto-inclusion (picking a services grid pulls the service card molecule's markup with it).
- `examplesPath` tells the scaffolder which file to lift markup from.

## Output folder structure

```text
my-site/
├─ emily.config.json          # phase 1 output — the only brand surface
├─ dist/emily.css             # built + purged
├─ index.html                 # assembled from selections
├─ contact.html               # optional pages as selected
├─ privacy.html  terms.html  accessibility.html  404.html  thank-you.html
└─ images/placeholders/       # empty dir + README naming expected files
```

## Accessibility requirements

Generated output must preserve what the examples already guarantee: skip link first, one h1 per page, labelled nav landmarks, labels on every control, `aria-describedby` wiring for hints/errors, no colour-only meaning, focus ring untouched. Anything selected that carries a manifest caveat (FAQ) is flagged in the CLI summary — init never silently launders a needs-a11y-review status into shipped code.

## Image placeholder rules

Same as the component/starter docs: scaffold references `images/placeholders/<name>` local paths only; the generated `images/placeholders/README` lists expected filenames; no third-party image hosts, no API keys. If an Unsplash integration is ever considered, attribution + download-tracking requirements make it a separate, explicit project.

## Manifest integration

`component-manifest.json` is the single source the flow reads:

- question options = manifest query (`layer` + `category` + `status`)
- selectability = `status === "built"`
- caveats = `accessibilityNotes`
- markup source = `examplesPath`
- auto-includes = `dependencies`

This is what makes the flow safe for AI agents as well as the CLI: both read the same file and can only offer what actually exists.

## Non-goals for v1

- No JavaScript behaviours in generated output (no drawers, carousels, wizards)
- No CMS integration, no deployment, no hosting hooks
- No npm publishing of a new package
- No image service integration
- No visual/interactive picker UI — text prompts only
- No Brandbadger-specific presets

## Future options

- `emily-ui init` as the promoted command once Emily UI is a published package
- Preset files (`--preset local-service.json`) for repeatable agency scaffolds
- `emily-css doctor` extension that re-validates a scaffolded site against the manifest
- emily-js wiring step for needs-js patterns once those graduate
- Multi-page microsite flows (grant/funding microsite starter depends on this)
