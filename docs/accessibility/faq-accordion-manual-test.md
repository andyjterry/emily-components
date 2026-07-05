# FAQ Accordion (details/summary) — Manual Accessibility Test Checklist

**Last Updated:** 2026-07-05
**Status:** NOT TESTED. This is the checklist for a manual test that has not yet been run.
No assistive technology or manual browser testing has been performed against these examples.
Statuses in `component-manifest.json` stay `needs-a11y-review` until this checklist is completed by a human and results are recorded below.

## Purpose

The FAQ pattern uses native `<details>`/`<summary>` — no JavaScript, no ARIA. Static review says the markup is sound; the one open question is real-world announcement quality when several items are grouped as an FAQ list. This checklist is the single remaining gate between `needs-a11y-review` and `built` for:

| Manifest id | Item |
|---|---|
| `organism-informational-sections-faq-accordion` | FAQ accordion organism |
| `template-core-pages-faq-page` | FAQ page template |

## Files / examples under test

Primary target (full styled page — test this one in the browser):

- `emily-starters/one-page-business/index.html` — "Common questions" section, 2 FAQ items, real built CSS in `dist/emily.css`

Markup references (same pattern, snippet files):

- `emily-components/organisms/informational.html` — FAQ accordion, 3 items
- `emily-components/templates/content-pages.html` — FAQ page template, grouped by topic
- `emily-components/molecules/content.html` — single FAQ item

Pattern under test:

```html
<details class="card">
  <summary class="text-lg font-semibold cursor-pointer">Question?</summary>
  <p class="text-neutral-60" style="margin-top: 0.75rem">Answer.</p>
</details>
```

## Environment matrix

Browsers:

- [ ] Chrome (current)
- [ ] Edge (current)
- [ ] Firefox (if available)

Assistive technology:

- [ ] Keyboard only (no AT)
- [ ] NVDA on Windows (Chrome, then Edge; Firefox if available)
- [ ] VoiceOver/Safari — optional, later, if a Mac is available

## Keyboard checks (per browser)

- [ ] Tab reaches every `summary` control in order
- [ ] Enter toggles open/closed
- [ ] Space toggles open/closed
- [ ] Focus indicator stays visible on the focused summary at all times
- [ ] Focus order is logical (top to bottom, no jumps)
- [ ] Expanded content is not skipped when tabbing onward (any links inside the answer are reachable)
- [ ] Collapsing an item does not strand or lose focus

## Screen reader checks (NVDA, per browser)

- [ ] Summary text is announced clearly and completely
- [ ] Role/state announced (e.g. "button, collapsed/expanded" or equivalent) — record the exact phrasing per browser
- [ ] After expanding, the answer content is reachable with reading commands
- [ ] With several items, each is distinguishable — no ambiguity about which question an answer belongs to
- [ ] No duplicate, missing, or confusing announcements when toggling repeatedly
- [ ] Browse mode and focus mode both behave sensibly

## Visual checks

- [ ] Focus indicator clearly visible against the card background
- [ ] Open/closed state not conveyed by colour alone (native marker/triangle visible, or state otherwise evident)
- [ ] Expanded answer has enough spacing from the question and the next item
- [ ] Layout holds at mobile width (≈360px): no overflow, summary text wraps, marker stays aligned
- [ ] 200% browser zoom: still readable and operable

## Results

| Check group | Chrome | Edge | Firefox | Notes |
|---|---|---|---|---|
| Keyboard | — | — | — | |
| NVDA announcements | — | — | — | |
| Visual / zoom / mobile | — | — | — | |

**Overall: NOT RUN**

## Findings / notes

_(Record exact announcement phrasing, any surprises, versions of browser + NVDA used, date, tester.)_

## Decision (complete after testing)

- [ ] Keep `needs-a11y-review` — issues found, list them above
- [ ] Mark `built` — all checks pass, record tester + date here
- [ ] Move to `needs-js` — native behaviour insufficient, JS enhancement required
- [ ] Move to `planned` — pattern needs rethinking

Whoever completes this updates `component-manifest.json` (both ids above) with the outcome and links this file's results.
