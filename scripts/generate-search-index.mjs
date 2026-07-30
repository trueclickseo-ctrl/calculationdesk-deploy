/**
 * Generates public/search-index.json from calculators.config.ts
 * Run via: node --import tsx/esm scripts/generate-search-index.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Read and parse the config file as text, extract data with regex
const configText = readFileSync(join(root, 'src', 'calculators.config.ts'), 'utf8');

// Use a simple approach: extract each calculator entry
const entries = [];
const entryRegex = /\{\s*slug:\s*'([^']+)'[\s\S]*?(?=\},?\s*\{|\];)/g;

// More robust: parse by finding slug, title, description, category, keywords, implemented
const slugRx = /slug:\s*'([^']+)'/;
const titleRx = /title:\s*'([^']+)'/;
const descRx = /description:\s*'([^']+)'/;
const catRx = /category:\s*'([^']+)'/;
const implRx = /implemented:\s*(true|false)/;
const keywordsRx = /keywords:\s*\[([^\]]+)\]/s;

// Split by top-level calculator objects
const blocks = configText.split(/(?=\s*\{\s*slug:)/);

for (const block of blocks) {
  const slug = slugRx.exec(block)?.[1];
  if (!slug) continue;

  const title = titleRx.exec(block)?.[1] ?? '';
  const description = descRx.exec(block)?.[1] ?? '';
  const category = catRx.exec(block)?.[1] ?? '';
  const implemented = implRx.exec(block)?.[1] === 'true';
  
  const kwMatch = keywordsRx.exec(block);
  const keywords = kwMatch
    ? kwMatch[1].match(/'([^']+)'/g)?.map(k => k.replace(/'/g, '')) ?? []
    : [];

  if (slug && title) {
    entries.push({
      s: slug,
      t: title,
      d: description.slice(0, 140),
      c: category,
      k: keywords.join(' ').toLowerCase(),
      i: implemented ? 1 : 0,
    });
  }
}

const outPath = join(root, 'public', 'search-index.json');
writeFileSync(outPath, JSON.stringify(entries, null, 0));
console.log(`✓ Generated search-index.json with ${entries.length} calculators (${(readFileSync(outPath).length / 1024).toFixed(1)} KB)`);
