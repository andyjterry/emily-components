'use strict';
// Regenerates docs/build-status.md from component-manifest.json.
// Run from anywhere: node docs/generate-build-status.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const m = JSON.parse(fs.readFileSync(path.join(root, 'component-manifest.json'), 'utf8'));

const LAYERS = ['token', 'atom', 'molecule', 'organism', 'template', 'page'];
const BLOCKED = ['needs-css', 'needs-js', 'needs-a11y-review', 'planned', 'deferred'];

const today = new Date().toISOString().slice(0, 10);
let out = `# Emily UI Build Status

**Last Updated:** ${today}
**Generated from \`component-manifest.json\` — do not edit by hand.** Regenerate with:

\`\`\`bash
node docs/generate-build-status.js
\`\`\`

## Counts

| Layer | Total | built | planned | needs-css | needs-js | needs-a11y-review | deferred |
|---|---|---|---|---|---|---|---|
`;
for (const layer of LAYERS) {
  const c = m.counts[layer] || {};
  out += `| ${layer} | ${c.total || 0} | ${c.built || 0} | ${c.planned || 0} | ${c['needs-css'] || 0} | ${c['needs-js'] || 0} | ${c['needs-a11y-review'] || 0} | ${c.deferred || 0} |\n`;
}

for (const layer of LAYERS) {
  const built = m.components.filter(c => c.layer === layer && c.status === 'built');
  if (!built.length) continue;
  out += `\n## Built: ${layer}s (${built.length})\n\n| Name | Category | Example |\n|---|---|---|\n`;
  for (const c of built) {
    out += `| ${c.name} | ${c.category} | ${c.examplesPath ? '`' + c.examplesPath + '`' : '—'} |\n`;
  }
}

out += `\n## Blocked items, grouped by reason\n`;
for (const status of BLOCKED) {
  const items = m.components.filter(c => c.status === status);
  if (!items.length) continue;
  out += `\n### ${status} (${items.length})\n\n| Name | Layer | Why |\n|---|---|---|\n`;
  for (const c of items) {
    out += `| ${c.name} | ${c.layer} | ${(c.accessibilityNotes || '—').replace(/\|/g, '/')} |\n`;
  }
}

fs.writeFileSync(path.join(__dirname, 'build-status.md'), out);
console.log('Wrote docs/build-status.md —', m.components.length, 'entries');
