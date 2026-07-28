import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import FAQSection from '@/components/FAQSection';
import { ArrowRight, Calculator, HelpCircle, Star, Award, Heart, CheckCircle } from 'lucide-react';
import { getCategorySeoContent } from '@/data/categorySeoContent';
import { getCategorySchema } from '@/utils/schema-generator';

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
    title: `${cat.name} Calculators – 100% Free, Instant & Accurate Tools | CalculationDesk`,
    description: `Access our free, accurate suite of ${cat.name} calculators. ${cat.description} Complete with formulas, step-by-step guides, and worked examples online.`,
    alternates: {
      canonical: `/categories/${category}/`,
    },
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
  const activeCalcs = calcs.filter(c => c.implemented);
  const comingSoonCalcs = calcs.filter(c => !c.implemented);

  // SEO Content
  const seoData = getCategorySeoContent(category);

  // Schemas
  const schemas = getCategorySchema(cat.name, category, calcs);

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic SEO JSON-LD Schemas */}
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: cat.name }]} />

        {/* Category Header Card */}
        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/5 border border-border/60 p-8 md:p-12 mb-8 mt-2 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {cat.name} Calculators
          </h1>
          <p className="mt-4 text-base text-foreground/75 max-w-3xl leading-relaxed">
            {seoData.introduction}
          </p>
        </div>

        {/* Ad Slot */}
        <AdSlot position="header" />

        {/* Main Grid: Left is active list, Right is SEO benefits / info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Active Calculators List */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                Active Calculator Tools
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCalcs.map((calc) => (
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
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-500">
                        Active
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

            {/* Coming Soon List if any */}
            {comingSoonCalcs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Upcoming Calculations & Roadmaps
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-75">
                  {comingSoonCalcs.map((calc) => (
                    <div
                      key={calc.slug}
                      className="rounded-2xl border border-border bg-card/65 p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
                          <Calculator className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-foreground/70">
                          {calc.title}
                        </h3>
                        <p className="mt-2 text-xs md:text-sm text-foreground/50 leading-relaxed line-clamp-2">
                          {calc.description}
                        </p>
                      </div>
                      <div className="mt-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-foreground/10 text-foreground/40">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category FAQ Section */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                Frequently Asked Questions ({cat.name})
              </h2>
              <FAQSection faqs={seoData.faqs} />
            </div>

            {/* Link to Pillar Hub */}
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-2">Explore our complete {cat.name} Calculation Guide</h3>
              <p className="text-xs md:text-sm text-foreground/75 leading-relaxed mb-4">
                Learn formulas, variables, step-by-step methods, and detailed examples for everyday planning.
              </p>
              <Link
                href={`/pillar/${category === 'financial' ? 'finance' : category}-calculators/`}
                className="inline-flex items-center gap-1 text-xs font-black text-primary hover:underline"
              >
                <span>Read the Complete Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Sidebar Hub content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category Benefits */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Key Benefits & Insights
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-foreground/75 leading-relaxed">
                {seoData.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-primary font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Use Cases */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Primary Use Cases
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-foreground/75 leading-relaxed">
                {seoData.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-secondary font-bold">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Categories Hub */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4">Related Calculation Hubs</h3>
              <div className="space-y-2">
                {seoData.relatedCategories.map((rcat) => (
                  <Link
                    key={rcat.slug}
                    href={`/categories/${rcat.slug}/`}
                    className="block text-sm font-bold text-primary hover:underline hover:text-secondary-hover transition-colors"
                  >
                    → {rcat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Slot */}
        <AdSlot position="footer" />

      </div>
    </div>
  );
}
