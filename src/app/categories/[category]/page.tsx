import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { ArrowRight, Calculator } from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  
  if (!cat) {
    return {
      title: 'Category Not Found - CalculationDesk',
    };
  }

  return {
    title: `${cat.name} Calculators - Free Tools | CalculationDesk`,
    description: `Free, accurate ${cat.name} calculators. ${cat.description} Explore calculators, calculations, and formulas online.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  // Get calculators in this category
  const calcs = CALCULATORS.filter((calc) => calc.category === category);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: cat.name }]} />

        {/* Category Header Card */}
        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/5 border border-border/60 p-8 md:p-12 mb-8 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {cat.name} Calculators
          </h1>
          <p className="mt-4 text-base text-foreground/70 max-w-2xl leading-relaxed">
            {cat.description} Choose from our suite of specialized online tools below for instant calculations and breakdowns.
          </p>
        </div>

        {/* Ad Slot */}
        <AdSlot position="header" />

        {/* Calculators List */}
        <div className="my-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Calculators in this Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calcs.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}/`}
                prefetch={false}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/20 hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-150 shrink-0">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-foreground/60 leading-relaxed line-clamp-2">
                    {calc.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${calc.implemented ? 'bg-green-500/10 text-green-600 dark:text-green-500' : 'bg-foreground/10 text-foreground/50'}`}>
                    {calc.implemented ? 'Active' : 'Coming Soon'}
                  </span>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Calculate</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ad Slot */}
        <AdSlot position="footer" />

      </div>
    </div>
  );
}
