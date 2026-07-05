# Accessibility Status

**Last Updated:** 2026-07-05

What Emily UI guarantees today, what is still under review, and what that means for anyone shipping with it.

## What every built example already does

- Semantic HTML first; ARIA only where native elements can't carry the meaning
- Visible label on every form control; hints/errors linked via `aria-describedby`; error styling driven by `aria-invalid`
- Skip link first, labelled nav landmarks, one h1 per page in page-level examples
- No colour-only meaning (status text leads, glyphs are `aria-hidden`)
- Token-driven focus ring, never removed
- Reduced-motion handling on animated atoms (spinner, skeleton)

**No WCAG conformance claim is made.** Static review is not manual AT testing. Production projects still own their own audit.

## Under manual review (needs-a11y-review)

| Item | Why it waits | Next step |
|---|---|---|
| FAQ accordion (organism) | Grouped details/summary announcement quality needs a human AT pass | Run `accessibility/faq-accordion-manual-test.md` — checklist ready, NOT yet run |
| FAQ page (template) | Same gate as the accordion | Same checklist |
| Transparent-over-hero header | Text-over-image contrast can't be verified statically | Needs per-image contrast strategy + tested example |
| Full-bleed image hero | Same contrast problem; needs a tested scrim treatment | Tested example before anything ships |
| Comparison table | Needs real content in a caption + `th[scope]` table inside `.scroll-area`, tested on mobile + AT | Build example only alongside real testing; card comparison is the built alternative |

Statuses move only on evidence: completed checklist results or a tested example — never on plausibility.

## Resolved by static review (2026-07-05)

- **Rating stars** → built as display-only (glyphs decorative, text carries the score). Interactive rating input remains a needs-js widget.
- **Multi-step progress** → built as static one-page-per-step (`aria-current="step"` + visible step text). JS wizards remain needs-js.
- **Accordion item (ARIA pattern)** → reclassified needs-js: button + `aria-expanded` cannot work without JS. No-JS disclosure = FAQ item (details/summary).

## Rules for consumers

- `needs-a11y-review` ≠ production-ready. Prototype with them if you accept the risk; do not ship unreviewed.
- `needs-js` items must wait for emily-js behaviours — do not bolt on ad-hoc scripts and keep the Emily class names.
- When a manual test completes, record results in the checklist file, update the manifest statuses, and regenerate `build-status.md`.
