#!/usr/bin/env node
/**
 * CalculationDesk Content Fix - Pass 2
 * 
 * Targets the remaining issues after pass 1:
 * 1. \$digit patterns: \$5,000 → $5,000 (backslash before currency dollar)
 * 2. Remaining $$ delimiters that weren't fully removed
 * 3. Trailing $ signs after numbers: 100$ → 100
 * 4. Orphaned \$ patterns that are NOT currency amounts
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'calculators');

// Patterns for remaining issues (from validator output)
const REMAINING_PATTERNS = [
  /\$\$/,
  /\\\([^)]*?\\\)/,
  /\\\[[^\]]*?\\\]/,
  /\\frac/,
  /\\times/,
  /\\text\{/,
  /\\mathbf\{/,
  /\\\$[0-9]/,
];

function hasIssues(text) {
  return REMAINING_PATTERNS.some(p => p.test(text));
}

function fixPass2(content) {
  let text = content;
  let changed = false;

  // -------------------------------------------------------------------------
  // Fix 1: \$digit → $digit (currency that got an accidental backslash)
  // This happens when the previous pass stripped LaTeX but left a backslash
  // -------------------------------------------------------------------------
  const prev1 = text;
  // Pattern: \$NNN (backslash-dollar followed by digit)
  text = text.replace(/\\(\$[0-9])/g, '$1');
  // Also: \$ followed by number after space (like "= \$5,000")
  text = text.replace(/\\\$(?=[0-9])/g, '$');
  if (text !== prev1) changed = true;

  // -------------------------------------------------------------------------
  // Fix 2: Remove trailing dollar sign after numbers
  // Pattern: "100$" or "$100.00$" at end of clause
  // But NOT currency at start: "$100" is fine
  // Trailing $ after number: 100$ → 100
  // -------------------------------------------------------------------------
  const prev2 = text;
  // Number followed by $ at end of word boundary
  text = text.replace(/([0-9,.)]+)\$(?=[^0-9])/g, '$1');
  // Pattern like "50%$" → "50%"
  text = text.replace(/([0-9%]+)\$\s/g, '$1 ');
  text = text.replace(/([0-9%]+)\$\n/g, '$1\n');
  text = text.replace(/([0-9%]+)\$"/g, '$1"');
  text = text.replace(/([0-9%]+)\$\)/g, '$1)');
  text = text.replace(/([0-9%]+)\$\./g, '$1.');
  text = text.replace(/([0-9%]+)\$,/g, '$1,');
  if (text !== prev2) changed = true;

  // -------------------------------------------------------------------------
  // Fix 3: Remaining $$ blocks
  // -------------------------------------------------------------------------
  const prev3 = text;
  text = text.replace(/\$\$([^$]*?)\$\$/gs, (match, inner) => inner.trim());
  // Single dollar blocks: $expression$ where expression starts with non-digit
  text = text.replace(/\$([A-Za-z\\(^_+][^$\n]*?)\$/g, '$1');
  if (text !== prev3) changed = true;

  // -------------------------------------------------------------------------
  // Fix 4: Any remaining \$ that are NOT before a digit (orphan backslash)
  // -------------------------------------------------------------------------
  const prev4 = text;
  text = text.replace(/\\(?=\$[0-9])/g, '');
  // Backslash before space or letter after being stripped:
  text = text.replace(/\\(?= )/g, '');
  if (text !== prev4) changed = true;

  return { text, changed };
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
let filesFixed = 0;

for (const filename of files) {
  const filePath = path.join(DATA_DIR, filename);
  const original = fs.readFileSync(filePath, 'utf-8');
  
  if (!hasIssues(original)) continue;
  
  const { text, changed } = fixPass2(original);
  if (changed) {
    fs.writeFileSync(filePath, text, 'utf-8');
    filesFixed++;
    console.log(`  Fixed (pass 2): ${filename}`);
  }
}

console.log(`\n=== Pass 2 Complete — ${filesFixed} files updated ===`);
