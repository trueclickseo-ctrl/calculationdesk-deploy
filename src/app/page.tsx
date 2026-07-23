'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';
import AdSlot from '@/components/AdSlot';
import { 
  ArrowRight, Search, TrendingUp, BookOpen, Calendar, Heart, 
  Briefcase, Scale, Sparkles, Cpu, Home, Star,
  Leaf, Globe, BarChart, Smile, FlaskConical, Atom, Hammer
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  financial: TrendingUp,
  education: BookOpen,
  'date-time': Calendar,
  health: Heart,
  business: Briefcase,
  'unit-converter': Scale,
  lifestyle: Sparkles,
  technology: Cpu,
  'real-estate': Home,
  biology: Leaf,
  ecology: Globe,
  statistics: BarChart,
  'everyday-life': Smile,
  chemistry: FlaskConical,
  physics: Atom,
  construction: Hammer,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim()
    ? CALCULATORS.filter(calc => {
        const query = searchQuery.toLowerCase().trim();
        return (
          calc.title.toLowerCase().includes(query) ||
          calc.description.toLowerCase().includes(query) ||
          calc.keywords.some(k => k.toLowerCase().includes(query))
        );
      }).slice(0, 6)
    : CALCULATORS.filter(c => c.implemented).slice(0, 3);

  // Helper to count calculators in category
  const getCalcCount = (categorySlug: string) => {
    return CALCULATORS.filter(calc => calc.category === categorySlug).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free Online Calculators for{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Finance, Education, Health & Business
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-foreground/70">
              Simple, accurate, and fast calculators for every need. Choose from over 280 specialized tools updated for 2026.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#categories-grid"
                className="rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Browse Categories
              </a>
              <button
                onClick={() => {
                  const input = document.getElementById('global-search') as HTMLInputElement | null;
                  input?.focus();
                  input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground/80 hover:bg-background transition-all cursor-pointer"
              >
                Search Directory
              </button>
            </div>
          </div>

          {/* Quick-Access Top Calculators Above the Fold */}
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <Link
              href="/calculators/emi-calculator/"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Popular</span>
                <h3 className="mt-1.5 font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  EMI Calculator
                </h3>
                <p className="mt-1 text-xs text-foreground/50 line-clamp-2">
                  Compute home, car, and personal loan EMIs with amortization schedules.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                Calculate &rarr;
              </span>
            </Link>

            <Link
              href="/calculators/sip-calculator/"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">Wealth</span>
                <h3 className="mt-1.5 font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  SIP Calculator
                </h3>
                <p className="mt-1 text-xs text-foreground/50 line-clamp-2">
                  Calculate mutual fund returns and systematic investments.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                Calculate &rarr;
              </span>
            </Link>

            <Link
              href="/calculators/indian-income-tax-calculator/"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500">Tax</span>
                <h3 className="mt-1.5 font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  Income Tax India
                </h3>
                <p className="mt-1 text-xs text-foreground/50 line-clamp-2">
                  Compare new vs old tax regime slabs for FY 2025-26.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                Calculate &rarr;
              </span>
            </Link>

            <Link
              href="/calculators/crypto-tax-calculator/"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500">Crypto</span>
                <h3 className="mt-1.5 font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                  Crypto Tax
                </h3>
                <p className="mt-1 text-xs text-foreground/50 line-clamp-2">
                  Estimate capital gains and TDS under section 115BBH rules.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                Calculate &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Top Ad banner */}
        <AdSlot position="header" />

        {/* Popular / Feature Calculators */}
        <section className="my-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-black text-foreground">Featured Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CALCULATORS.filter(c => c.implemented).map((calc) => {
              const Icon = CATEGORY_ICONS[calc.category] || Star;
              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/30 hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {calc.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-bold text-primary">
                    <span>Calculate Now</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Dynamic Calculator Search Input */}
        <section className="my-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Fuzzy Directory Search</h2>
          <p className="text-sm text-foreground/60 mb-6">Instantly lookup formulas and calculations across 124 specialized calculators.</p>
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/35" />
            <input
              id="global-search"
              type="text"
              placeholder="Type e.g. emi, percentage, weight, compound..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-6 text-sm md:text-base outline-none transition-all placeholder:text-foreground/45 focus:border-primary focus:ring-4 focus:ring-ring-custom"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {searchResults.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 hover:border-primary/30 hover:bg-primary/5 transition-all text-xs md:text-sm font-semibold text-foreground text-left"
              >
                <span className="truncate">{calc.title}</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${calc.implemented ? 'bg-green-500/10 text-green-500' : 'bg-foreground/10 text-foreground/50'}`}>
                  {calc.implemented ? 'Active' : 'Soon'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section id="categories-grid" className="my-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-foreground mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Star;
              const count = getCalcCount(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/20 hover:shadow-md hover:scale-[1.01] transition-all flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-foreground/60 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                    <span className="inline-block mt-3 text-[10px] font-bold tracking-wider uppercase text-foreground/40 bg-background border border-border px-2 py-0.5 rounded-full">
                      {count} {count === 1 ? 'Calculator' : 'Calculators'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* In-content banner */}
        <AdSlot position="in-content" />

      </div>
    </div>
  );
}
