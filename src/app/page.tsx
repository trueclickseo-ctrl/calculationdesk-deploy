// SERVER COMPONENT — no 'use client'. Renders as static HTML, zero client JS.
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};
import AdSlot from '@/components/AdSlot';
import HomeSearch from '@/components/HomeSearch';
import {
  ArrowRight, TrendingUp, BookOpen, Calendar, Heart,
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

// Pre-compute at build time (server-side only)
const FEATURED_CALCS = CALCULATORS.filter(c => c.implemented).slice(0, 12);
const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORIES.map(cat => [
    cat.slug,
    CALCULATORS.filter(c => c.category === cat.slug).length,
  ])
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free Online Calculators for{' '}
              <span className="text-primary font-extrabold">
                Finance, Education, Health &amp; Business
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-foreground/70">
              Simple, accurate, and fast calculators for every need. Choose from over 280 specialized tools updated for 2026.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#categories-grid"
                className="rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Browse Categories
              </a>
              <a
                href="#search-section"
                className="rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground/80 hover:bg-background transition-colors cursor-pointer"
              >
                Search Directory
              </a>
            </div>
          </div>

          {/* Quick-Access Top Calculators — static HTML, no JS */}
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { href: '/calculators/emi-calculator', label: 'Popular', color: 'text-primary', title: 'EMI Calculator', desc: 'Compute home, car, and personal loan EMIs with amortization schedules.' },
              { href: '/calculators/sip-calculator', label: 'Wealth', color: 'text-emerald-500', title: 'SIP Calculator', desc: 'Calculate mutual fund returns and systematic investments.' },
              { href: '/calculators/indian-income-tax-calculator', label: 'Tax', color: 'text-amber-500', title: 'Income Tax India', desc: 'Compare new vs old tax regime slabs for FY 2025-26.' },
              { href: '/calculators/bmi-calculator', label: 'Health', color: 'text-rose-500', title: 'BMI Calculator', desc: 'Check your Body Mass Index and healthy weight range instantly.' },
            ].map(card => (
              <Link
                key={card.href}
                href={card.href}
                prefetch={false}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${card.color}`}>{card.label}</span>
                  <h3 className="mt-1.5 font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/50 line-clamp-2">{card.desc}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                  Calculate →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Top Ad banner */}
        <AdSlot position="header" />

        {/* Featured Tools — server-rendered, no client JS */}
        <section className="my-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-black text-foreground">Featured Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_CALCS.map((calc) => {
              const Icon = CATEGORY_ICONS[calc.category] || Star;
              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  prefetch={false}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
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

        {/* Search Section — the ONLY client island on this page */}
        <div id="search-section">
          <HomeSearch />
        </div>

        {/* Categories Grid — server-rendered */}
        <section id="categories-grid" className="my-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-foreground mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Star;
              const count = CATEGORY_COUNTS[cat.slug] ?? 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  prefetch={false}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
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
