'use client';

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

// Slim record shape (matches public/search-index.json)
interface SlimCalc {
  s: string;  // slug
  t: string;  // title
  d: string;  // description (truncated)
  c: string;  // category
  k: string;  // keywords joined
  i: number;  // implemented: 1|0
}

const DEFAULTS = [
  { s: 'emi-calculator', t: 'EMI Calculator', i: 1 },
  { s: 'sip-calculator', t: 'SIP Calculator', i: 1 },
  { s: 'bmi-calculator', t: 'BMI Calculator', i: 1 },
];

export default function HomeSearch() {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SlimCalc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  // Lazy-load search index only when user starts typing
  const loadIndex = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    try {
      const res = await fetch('/search-index.json');
      const data: SlimCalc[] = await res.json();
      setIndex(data);
    } catch {
      // silently fail — search just won't work
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      loadIndex();
    },
    [loadIndex]
  );

  const results: { s: string; t: string; i: number }[] = query.trim()
    ? (() => {
        if (!index) return [];
        const q = query.toLowerCase();
        const out: SlimCalc[] = [];
        for (let i = 0; i < index.length && out.length < 6; i++) {
          const c = index[i];
          if (c.t.toLowerCase().includes(q) || c.d.toLowerCase().includes(q) || c.k.includes(q)) {
            out.push(c);
          }
        }
        return out;
      })()
    : DEFAULTS;

  return (
    <section className="my-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Search Any Calculator</h2>
      <p className="text-sm text-foreground/60 mb-6">
        Instantly lookup formulas and calculations across 280+ specialized calculators.
      </p>
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/35 pointer-events-none" />
        <input
          id="global-search"
          type="text"
          placeholder="Type e.g. emi, percentage, weight, compound..."
          value={query}
          onChange={handleChange}
          className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-6 text-sm md:text-base outline-none transition-colors placeholder:text-foreground/45 focus:border-primary focus:ring-4 focus:ring-ring-custom"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {loading && (
          <div className="col-span-3 text-sm text-foreground/40 py-4">Loading…</div>
        )}
        {!loading && results.map((calc) => (
          <Link
            key={calc.s}
            href={`/calculators/${calc.s}/`}
            prefetch={false}
            className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 hover:border-primary/30 hover:bg-primary/5 transition-colors text-xs md:text-sm font-semibold text-foreground text-left"
          >
            <span className="truncate">{calc.t}</span>
            <span className={`shrink-0 ml-2 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${calc.i ? 'bg-green-500/10 text-green-500' : 'bg-foreground/10 text-foreground/50'}`}>
              {calc.i ? 'Active' : 'Soon'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
