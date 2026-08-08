import React from 'react';
import { InlineMarkdown } from '@/components/MarkdownContent';

interface ComparisonTableProps {
  config: {
    title: string;
    headers: string[];
    rows: string[][];
  };
}

export default function ComparisonTable({ config }: ComparisonTableProps) {
  if (!config || !config.headers || !config.rows) return null;
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-left border-collapse text-xs md:text-sm">
        <caption className="p-4 font-black text-left text-foreground bg-muted/20 border-b border-border/80">
          {config.title}
        </caption>
        <thead>
          <tr className="bg-muted/40 border-b border-border text-foreground/80 font-bold">
            {config.headers.map((header, idx) => (
              <th key={idx} className="p-3 font-bold border-r border-border/50 last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {config.rows.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className="border-b border-border/40 last:border-b-0 hover:bg-muted/10 transition-colors"
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="p-3 text-foreground/70 border-r border-border/40 last:border-r-0"
                >
                  <InlineMarkdown text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
