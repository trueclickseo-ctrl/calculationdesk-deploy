import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, Award, Calculator, Settings } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'CalculationDesk Learning Center – Math, Finance & Science Guides',
  description: 'Explore our comprehensive library of math formulas, financial guides, statistics tutorials, and conversion cheat sheets.',
  alternates: {
    canonical: '/learn',
  },
};

const SECTIONS = [
  {
    title: 'Financial Mathematics',
    description: 'Master compound interest, amortization formulas, and retirement planning equations.',
    slug: 'finance',
    links: [
      { title: 'How Compound Interest Works', href: '/guides/how-compound-interest-works' },
      { title: 'The Financial Formula Handbook', href: '/guides/finance-formula-handbook' }
    ]
  },
  {
    title: 'General Math & Percentages',
    description: 'Solve percentage increases, decrease ratios, fractions, and quadratic algebra.',
    slug: 'math',
    links: [
      { title: 'How To Calculate Percentages', href: '/guides/how-to-calculate-percentages' },
      { title: 'College Math Formula Sheet', href: '/guides/math-formulas-reference' }
    ]
  }
];

export default function LearnPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "CalculationDesk Learning Center",
    "description": "Educational resource hub explaining formulas, calculations, and real-world math applications.",
    "url": "https://www.calculationdesk.com/learn",
    "publisher": {
      "@type": "Organization",
      "name": "CalculationDesk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.calculationdesk.com/icon.svg"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Learning Center' }]} />

        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/5 border border-border/60 p-8 md:p-12 mb-8 mt-2 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-primary" />
            CalculationDesk Learning Center
          </h1>
          <p className="mt-4 text-base text-foreground/75 max-w-3xl leading-relaxed">
            Gain deep understanding of financial math, algebraic formulas, unit systems, and statistical methodologies with verified guides and interactive collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {SECTIONS.map((section) => (
            <div
              key={section.slug}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {section.title}
              </h2>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed mb-6">
                {section.description}
              </p>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-bold text-primary hover:underline hover:text-secondary-hover transition-colors"
                  >
                    → {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
