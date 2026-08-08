#!/usr/bin/env node
/**
 * CalculationDesk Content Validation Script
 * 
 * Purpose: Detect any LaTeX / math markup in calculator .md files that will
 * appear as raw corrupt text in the browser (because there is no LaTeX renderer
 * in the pipeline — content is rendered as plain React text nodes).
 * 
 * CANONICAL FORMAT: Plain text arithmetic only.
 * Use × ÷ = − + ≈ ≠ ≤ ≥ √ % for math.
 * Currency stays as ordinary text ($5,000). Never inside math delimiters.
 * 
 * Run: node scripts/validate-content.js
 * Exit code 0 = clean, Exit code 1 = corruption found
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'calculators');

// Patterns that indicate LaTeX corruption
const PATTERNS = [
  { name: 'Double-dollar math block ($$)', regex: /\$\$/ },
  { name: 'Inline LaTeX delimiter \\(', regex: /\\\(/ },
  { name: 'Inline LaTeX delimiter \\)', regex: /\\\)/ },
  { name: 'Block LaTeX delimiter \\[', regex: /\\\[/ },
  { name: 'Block LaTeX delimiter \\]', regex: /\\\]/ },
  { name: 'LaTeX fraction \\frac', regex: /\\frac/ },
  { name: 'LaTeX times \\times', regex: /\\times/ },
  { name: 'LaTeX text command \\text{', regex: /\\text\{/ },
  { name: 'LaTeX bold \\mathbf{', regex: /\\mathbf\{/ },
  { name: 'LaTeX italic \\mathit{', regex: /\\mathit\{/ },
  { name: 'LaTeX \\left bracket', regex: /\\left/ },
  { name: 'LaTeX \\right bracket', regex: /\\right/ },
  { name: 'LaTeX \\max command', regex: /\\max\(/ },
  { name: 'LaTeX \\approx', regex: /\\approx/ },
  { name: 'LaTeX \\quad space', regex: /\\quad/ },
  { name: 'LaTeX \\sqrt', regex: /\\sqrt/ },
  { name: 'LaTeX \\sum', regex: /\\sum/ },
  { name: 'LaTeX \\sigma', regex: /\\sigma/ },
  { name: 'LaTeX \\mu', regex: /\\mu/ },
  { name: 'LaTeX \\alpha', regex: /\\alpha/ },
  { name: 'LaTeX \\beta', regex: /\\beta/ },
  { name: 'LaTeX \\Delta', regex: /\\Delta/ },
  { name: 'LaTeX \\bar{', regex: /\\bar\{/ },
  { name: 'LaTeX \\hat{', regex: /\\hat\{/ },
  { name: 'LaTeX \\ln', regex: /\\ln/ },
  { name: 'LaTeX \\log', regex: /\\log/ },
  { name: 'LaTeX \\cdot', regex: /\\cdot/ },
  { name: 'LaTeX \\pm', regex: /\\pm/ },
  { name: 'LaTeX escaped %  \\%', regex: /\\%/ },
  { name: 'Currency escaped as \\$digit (inside LaTeX)', regex: /\\\$[0-9]/ },
  { name: 'LaTeX \\geq', regex: /\\geq/ },
  { name: 'LaTeX \\leq', regex: /\\leq/ },
  { name: 'LaTeX \\ne or \\neq', regex: /\\ne[q\s}]/ },
  { name: 'LaTeX \\infty', regex: /\\infty/ },
  { name: 'LaTeX \\int', regex: /\\int/ },
  { name: 'LaTeX \\pi', regex: /\\pi[^a-z]/ },
  { name: 'LaTeX \\gamma', regex: /\\gamma/ },
  { name: 'LaTeX \\lambda', regex: /\\lambda/ },
  { name: 'LaTeX \\chi', regex: /\\chi/ },
  { name: 'LaTeX \\phi', regex: /\\phi/ },
  { name: 'LaTeX \\theta', regex: /\\theta/ },
  { name: 'LaTeX mathrm', regex: /\\mathrm\{/ },
  { name: 'LaTeX operatorname', regex: /\\operatorname/ },
];

let totalFiles = 0;
let affectedFiles = 0;
let totalIssues = 0;
const report = [];

try {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
  totalFiles = files.length;

  for (const filename of files) {
    const filePath = path.join(DATA_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const fileIssues = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const pattern of PATTERNS) {
        if (pattern.regex.test(line)) {
          fileIssues.push({
            line: i + 1,
            pattern: pattern.name,
            content: line.trim().substring(0, 120),
          });
          break; // one issue per line is enough
        }
      }
    }

    if (fileIssues.length > 0) {
      affectedFiles++;
      totalIssues += fileIssues.length;
      report.push({ file: filename, issues: fileIssues });
    }
  }
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}

console.log('=== CalculationDesk Content Validation Report ===');
console.log(`Files scanned:    ${totalFiles}`);
console.log(`Files with issues: ${affectedFiles}`);
console.log(`Total issue lines: ${totalIssues}`);
console.log('');

if (report.length === 0) {
  console.log('✓ PASS — Zero LaTeX/math corruption detected.');
  process.exit(0);
} else {
  console.log('✗ FAIL — LaTeX corruption found in the following files:\n');
  for (const entry of report) {
    console.log(`  [${entry.file}] — ${entry.issues.length} issues`);
    for (const issue of entry.issues.slice(0, 3)) {
      console.log(`    Line ${issue.line}: [${issue.pattern}]`);
      console.log(`    Content: ${issue.content}`);
    }
    if (entry.issues.length > 3) {
      console.log(`    ... and ${entry.issues.length - 3} more`);
    }
    console.log('');
  }
  console.log(`\nCanonical format: Plain text arithmetic only.`);
  console.log(`Use × ÷ = − + ≈ ≠ ≤ ≥ √ % for math.`);
  console.log(`Currency ($5,000) stays as plain text — never inside math delimiters.`);
  process.exit(1);
}
