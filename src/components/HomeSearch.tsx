'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { CALCULATORS } from '@/calculators.config';

// Lightweight subset of calc data for search only
const SEARCH_DATA = CALCULATORS.map(c => ({
  slug: c.slug,
  title: c.title,
  description: c.description,
  keywords: c.keywords,
  implemented: c.implemented,
}));

// Default results shown when no query entered
const DEFAULT_RESULTS = CALCULATORS.filter(c => c.implemented).slice(0, 3).map(c => ({
  slug: c.slug,
  title: c.title,
  description: c.description,
  keywords: c.keywords,
  implemented: c.implemented,
}));

export default function HomeSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const searchResults = searchQuery.trim()
    ? (() => {
        const query = searchQuery.toLowerCase().trim();
        const results: typeof SEARCH_DATA = [];
        for (let i = 0; i < SEARCH_DATA.length && results.length < 6; i++) {
          const calc = SEARCH_DATA[i];
          if (
            calc.title.toLowerCase().includes(query) ||
            calc.description.toLowerCase().includes(query) ||
            calc.keywords.some(k => k.toLowerCase().includes(query))
          ) {
            results.push(calc);
          }
        }
        return results;
      })()
    : DEFAULT_RESULTS;

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
          value={searchQuery}
          onChange={handleChange}
          className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-6 text-sm md:text-base outline-none transition-colors placeholder:text-foreground/45 focus:border-primary focus:ring-4 focus:ring-ring-custom"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {searchResults.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 hover:border-primary/30 hover:bg-primary/5 transition-colors text-xs md:text-sm font-semibold text-foreground text-left"
          >
            <span className="truncate">{calc.title}</span>
            <span className={`shrink-0 ml-2 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${calc.implemented ? 'bg-green-500/10 text-green-500' : 'bg-foreground/10 text-foreground/50'}`}>
              {calc.implemented ? 'Active' : 'Soon'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
