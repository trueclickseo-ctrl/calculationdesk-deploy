#!/usr/bin/env node
/**
 * CalculationDesk Content LaTeX Corruption Fix Script
 * 
 * Removes LaTeX delimiters and replaces LaTeX commands with plain-text equivalents
 * throughout all calculator .md files.
 * 
 * Rules:
 * - $$...$$  → strip delimiters, keep content as plain text
 * - $...$    → strip delimiters if they wrap expressions (not standalone $ used as currency)
 * - \\times   → ×
 * - \\div     → ÷
 * - \\approx  → ≈
 * - \\pm      → ±
 * - \\ne, \\neq → ≠
 * - \\geq    → ≥
 * - \\leq    → ≤
 * - \\infty  → ∞
 * - \\text{X} → X (strip wrapper)
 * - \\mathbf{X} → X (strip wrapper)
 * - \\mathit{X} → X (strip wrapper)
 * - \\mathrm{X} → X (strip wrapper)
 * - \\left, \\right → strip
 * - \\frac{A}{B} → (A / B)
 * - \\sqrt{X} → sqrt(X)
 * - \\ln → ln
 * - \\log → log
 * - \\cdot → ×
 * - \\quad, \\qquad → space
 * - \\%    → %
 * - \\$ (escaped dollar sign inside LaTeX) → strip (handled via delimiters)
 * - \\operatorname{X} → X
 * - \\\\ (line break in LaTeX) inside display math → space
 * - \\begin{}, \\end{} environments → strip
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'calculators');

let totalFixed = 0;
let filesFixed = 0;

function fixContent(content, filename) {
  let text = content;
  let changed = false;

  // -------------------------------------------------------------------------
  // Pass 1: Remove display math blocks $$ ... $$ (possibly multiline)
  // -------------------------------------------------------------------------
  const prev1 = text;
  // Replace $$ ... $$ (greedy across newlines within reason)
  // We pull out the inner content and keep it as plain text
  text = text.replace(/\$\$([^$]*?)\$\$/gs, (match, inner) => {
    return inner.trim();
  });
  if (text !== prev1) changed = true;

  // -------------------------------------------------------------------------
  // Pass 2: Replace known LaTeX command sequences (before stripping $...$)
  // -------------------------------------------------------------------------
  
  // \frac{A}{B} → (A / B) — do this BEFORE stripping $ delimiters
  const prev2 = text;
  text = text.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1 / $2)');
  if (text !== prev2) changed = true;

  // \sqrt{X} → sqrt(X)
  text = text.replace(/\\sqrt\{([^}]*)\}/g, 'sqrt($1)');

  // \text{X} → X
  text = text.replace(/\\text\{([^}]*)\}/g, '$1');

  // \mathbf{X} → X
  text = text.replace(/\\mathbf\{([^}]*)\}/g, '$1');

  // \mathit{X} → X
  text = text.replace(/\\mathit\{([^}]*)\}/g, '$1');

  // \mathrm{X} → X
  text = text.replace(/\\mathrm\{([^}]*)\}/g, '$1');

  // \hat{X} → X
  text = text.replace(/\\hat\{([^}]*)\}/g, '$1');

  // \bar{X} → X
  text = text.replace(/\\bar\{([^}]*)\}/g, '$1');

  // \operatorname{X} → X
  text = text.replace(/\\operatorname\{([^}]*)\}/g, '$1');

  // \begin{...} \end{...} → strip
  text = text.replace(/\\begin\{[^}]*\}/g, '');
  text = text.replace(/\\end\{[^}]*\}/g, '');

  // \left and \right (with bracket) → strip
  text = text.replace(/\\left[\(\[\{|.]/g, '');
  text = text.replace(/\\right[\)\]\}|.]/g, '');
  text = text.replace(/\\left/g, '');
  text = text.replace(/\\right/g, '');

  // Specific symbol replacements
  const symbolReplacements = [
    [/\\times/g, '×'],
    [/\\cdot/g, '×'],
    [/\\div/g, '÷'],
    [/\\approx/g, '≈'],
    [/\\pm/g, '±'],
    [/\\geq/g, '≥'],
    [/\\leq/g, '≤'],
    [/\\neq/g, '≠'],
    [/\\ne(?=[^a-zA-Z])/g, '≠'],
    [/\\infty/g, '∞'],
    [/\\ln(?=[^a-zA-Z])/g, 'ln'],
    [/\\log(?=[^a-zA-Z])/g, 'log'],
    [/\\max(?=[^a-zA-Z])/g, 'max'],
    [/\\min(?=[^a-zA-Z])/g, 'min'],
    [/\\sum/g, 'sum'],
    [/\\int/g, 'integral'],
    [/\\sigma/g, 'σ'],
    [/\\mu/g, 'μ'],
    [/\\alpha/g, 'α'],
    [/\\beta/g, 'β'],
    [/\\gamma/g, 'γ'],
    [/\\lambda/g, 'λ'],
    [/\\theta/g, 'θ'],
    [/\\phi/g, 'φ'],
    [/\\chi/g, 'χ'],
    [/\\pi(?=[^a-zA-Z])/g, 'π'],
    [/\\Delta/g, 'Δ'],
    [/\\delta/g, 'δ'],
    [/\\quad/g, ' '],
    [/\\qquad/g, '  '],
    [/\\%/g, '%'],
    [/\\,/g, ' '],
    [/\\;/g, ' '],
    [/\\\\/g, ' '],  // LaTeX line break \\
  ];

  for (const [pattern, replacement] of symbolReplacements) {
    const before = text;
    text = text.replace(pattern, replacement);
    if (text !== before) changed = true;
  }

  // -------------------------------------------------------------------------
  // Pass 3: Strip inline math $...$ delimiters
  // Only strip when there's non-currency content inside them.
  // Strategy: strip when the $ is immediately followed by a letter, backslash,
  // or arithmetic expression (not by a digit that could be currency)
  // Currency patterns: $1, $100, $1,000 — these start with $ followed by digit
  // Math patterns: $x$, $A = B$, $\text{...}$ — start with $[letter\(...]
  // -------------------------------------------------------------------------
  const prev3 = text;

  // Remove $...$ where content starts with a letter (math variable), backslash, or parenthesis
  text = text.replace(/\$([A-Za-z\\(^_\-+][^$\n]*?)\$/g, '$1');

  // Also remove orphaned lone $ if they appear to be LaTeX delimiters (no digit follows)
  // This is more conservative — only remove $ followed by non-space non-digit
  text = text.replace(/\$(?=[A-Za-z\\])/g, '');
  text = text.replace(/(?<=[A-Za-z\s])\$/g, '');

  if (text !== prev3) changed = true;

  // -------------------------------------------------------------------------
  // Pass 4: Clean up leftover artifacts
  // -------------------------------------------------------------------------
  const prev4 = text;

  // Double spaces from stripping
  text = text.replace(/ {3,}/g, ' ');
  // Underscores used for LaTeX subscripts: x_{value} → x(value)
  text = text.replace(/([A-Za-z])\{([^}]+)\}/g, '$1($2)');
  // Carets used for LaTeX superscripts: x^{2} → x^2, x^2 stays as is (used in math)
  text = text.replace(/\^{([^}]+)}/g, '^$1');
  // Remove remaining backslashes that are followed by a known LaTeX word
  text = text.replace(/\\circ/g, '°');
  text = text.replace(/\\cdot/g, '×');
  text = text.replace(/\\(?=[A-Za-z])/g, '');  // strip remaining single backslashes before letters

  if (text !== prev4) changed = true;

  return { text, changed };
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));

for (const filename of files) {
  const filePath = path.join(DATA_DIR, filename);
  const original = fs.readFileSync(filePath, 'utf-8');
  const { text, changed } = fixContent(original, filename);

  if (changed) {
    fs.writeFileSync(filePath, text, 'utf-8');
    filesFixed++;
    totalFixed++;
    console.log(`  Fixed: ${filename}`);
  }
}

console.log(`\n=== Fix Complete ===`);
console.log(`Files modified: ${filesFixed}`);
