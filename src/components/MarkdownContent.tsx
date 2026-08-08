import React from 'react';

/**
 * Lightweight, dependency-free markdown renderer for calculator page content.
 *
 * Why this exists: the site's .md content files (src/data/calculators/*.md) are
 * parsed for frontmatter only — the body text and several frontmatter string
 * fields were previously dumped straight into <p> tags with zero transformation,
 * so headings, bold text, lists, tables, callouts, and LaTeX all rendered as raw
 * literal characters on the live site. There is no react-markdown/remark/rehype
 * in package.json, and adding one requires an `npm install` this session can't
 * run on your machine, so this parses the safe subset of markdown actually used
 * across the content files by hand, in plain TypeScript, with no new dependencies.
 *
 * Supported: ## / ### / #### headings, **bold**, *italic*, `inline code`,
 * [text](url) links, - / * bullet lists, 1. numbered lists, pipe tables,
 * > [!NOTE] / [!IMPORTANT] / [!WARNING] / [!TIP] callouts, --- horizontal rules,
 * ``` fenced code blocks, and plain paragraphs.
 *
 * LaTeX handling: $$...$$ and $...$ delimited math is NOT rendered as real math
 * (no KaTeX/MathJax is installed) — it's converted to clean plain-text notation
 * instead (\times -> ×, \frac{a}{b} -> (a / b), etc.), which matches the
 * source content guidance of preferring plain-text formulas over broken markup.
 */

function cleanLatexInner(tex: string): string {
  let t = tex;
  t = t.replace(/\\text\{([^}]*)\}/g, '$1');
  t = t.replace(/\\mathbf\{([^}]*)\}/g, '$1');
  t = t.replace(/\\mathrm\{([^}]*)\}/g, '$1');
  t = t.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1 / $2)');
  t = t.replace(/\\sqrt\{([^}]*)\}/g, '√($1)');
  t = t.replace(/\\times/g, '×');
  t = t.replace(/\\div/g, '÷');
  t = t.replace(/\\cdot/g, '·');
  t = t.replace(/\\pm/g, '±');
  t = t.replace(/\\approx/g, '≈');
  t = t.replace(/\\neq/g, '≠');
  t = t.replace(/\\le/g, '≤');
  t = t.replace(/\\ge/g, '≥');
  t = t.replace(/\\left|\\right/g, '');
  t = t.replace(/\\,/g, ' ');
  t = t.replace(/\^\{([^}]*)\}/g, '^$1');
  t = t.replace(/_\{([^}]*)\}/g, '_$1');
  t = t.replace(/[{}]/g, '');
  t = t.replace(/\\/g, '');
  return t.trim();
}

function delatex(input: string): string {
  let s = input;
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (_m, inner) => cleanLatexInner(inner));
  s = s.replace(/\$([^$\n]+?)\$/g, (_m, inner) => cleanLatexInner(inner));
  return s;
}

let inlineKeyCounter = 0;

function renderInline(text: string): React.ReactNode[] {
  if (!text) return [];
  const clean = delatex(text);
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))|(\*([^*]+)\*)/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(clean)) !== null) {
    if (m.index > lastIdx) nodes.push(clean.slice(lastIdx, m.index));
    const k = `md-${inlineKeyCounter++}`;
    if (m[1]) {
      nodes.push(<strong key={k} className="font-semibold text-foreground">{m[2]}</strong>);
    } else if (m[3]) {
      nodes.push(<code key={k} className="rounded bg-muted/40 px-1.5 py-0.5 text-[0.85em] font-mono">{m[4]}</code>);
    } else if (m[5]) {
      nodes.push(<a key={k} href={m[7]} className="text-primary hover:underline font-semibold">{m[6]}</a>);
    } else if (m[8]) {
      nodes.push(<em key={k}>{m[9]}</em>);
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < clean.length) nodes.push(clean.slice(lastIdx));
  return nodes;
}

/** Use for a single short string (FAQ answer, table cell, list item) that only needs inline formatting. */
export function InlineMarkdown({ text }: { text: string }) {
  return <>{renderInline(text || '')}</>;
}

const CALLOUT_STYLES: Record<string, string> = {
  important: 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300',
  warning: 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-300',
  tip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300',
  note: 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-300',
};

/** Full block-level renderer for a markdown body (headings, lists, tables, callouts, paragraphs, etc). */
export default function MarkdownContent({ text, className }: { text: string; className?: string }) {
  if (!text) return null;
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let paraBuf: string[] = [];

  const flushParagraph = () => {
    const joined = paraBuf.join(' ').trim();
    paraBuf = [];
    if (joined) {
      blocks.push(
        <p key={`p-${key++}`} className="text-sm text-foreground/75 leading-relaxed mb-4">
          {renderInline(joined)}
        </p>
      );
    }
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === '') {
      flushParagraph();
      i++;
      continue;
    }

    if (/^-{3,}$/.test(line) || /^\*{3,}$/.test(line)) {
      flushParagraph();
      blocks.push(<hr key={`hr-${key++}`} className="my-6 border-border/60" />);
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      const content = headingMatch[2].replace(/#+\s*$/, '').trim();
      if (level <= 2) {
        blocks.push(<h2 key={`h-${key++}`} className="text-lg md:text-xl font-black text-foreground mt-6 mb-3">{renderInline(content)}</h2>);
      } else if (level === 3) {
        blocks.push(<h3 key={`h-${key++}`} className="text-base md:text-lg font-bold text-foreground mt-5 mb-2">{renderInline(content)}</h3>);
      } else {
        blocks.push(<h4 key={`h-${key++}`} className="text-sm md:text-base font-bold text-foreground mt-4 mb-2">{renderInline(content)}</h4>);
      }
      i++;
      continue;
    }

    if (line.startsWith('>')) {
      flushParagraph();
      const calloutLines: string[] = [];
      let type = 'note';
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        let content = lines[i].trim().replace(/^>\s?/, '');
        const typeMatch = content.match(/^\[!(NOTE|IMPORTANT|WARNING|TIP)\]\s*/i);
        if (typeMatch) {
          type = typeMatch[1].toLowerCase();
          content = content.replace(typeMatch[0], '');
        }
        if (content.trim()) calloutLines.push(content);
        i++;
      }
      const calloutText = calloutLines.join(' ').trim();
      if (calloutText) {
        blocks.push(
          <div key={`cb-${key++}`} className={`rounded-xl border p-4 my-4 text-xs md:text-sm leading-relaxed ${CALLOUT_STYLES[type] || CALLOUT_STYLES.note}`}>
            {renderInline(calloutText)}
          </div>
        );
      }
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-5 space-y-1.5 text-sm text-foreground/75 mb-4">
          {items.map((it, idx) => <li key={idx}>{renderInline(it)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${key++}`} className="list-decimal pl-5 space-y-1.5 text-sm text-foreground/75 mb-4">
          {items.map((it, idx) => <li key={idx}>{renderInline(it)}</li>)}
        </ol>
      );
      continue;
    }

    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?[\s:|-]*\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      flushParagraph();
      const headerCells = line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
        i++;
      }
      blocks.push(
        <div key={`tbl-${key++}`} className="my-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {headerCells.map((h, idx) => (
                  <th key={idx} className="p-2.5 font-bold text-foreground/80 border-r border-border/40 last:border-r-0">{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ridx) => (
                <tr key={ridx} className="border-b border-border/30 last:border-b-0">
                  {r.map((c, cidx) => (
                    <td key={cidx} className="p-2.5 text-foreground/70 border-r border-border/30 last:border-r-0">{renderInline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith('```')) {
      flushParagraph();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={`code-${key++}`} className="my-4 overflow-x-auto rounded-xl bg-muted/30 border border-border p-4 text-xs font-mono text-foreground/80 whitespace-pre">
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    paraBuf.push(line);
    i++;
  }

  flushParagraph();

  return <div className={className}>{blocks}</div>;
}
