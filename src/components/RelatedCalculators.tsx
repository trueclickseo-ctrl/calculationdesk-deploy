import React from 'react';
import Link from 'next/link';
import { CALCULATORS } from '@/calculators.config';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface RelatedCalculatorsProps {
  categorySlug: string;
  currentSlug: string;
}

export default function RelatedCalculators({ categorySlug, currentSlug }: RelatedCalculatorsProps) {
  // Find other calculators in the same category
  const related = CALCULATORS.filter(
    (calc) => calc.category === categorySlug && calc.slug !== currentSlug
  ).slice(0, 5); // display top 5 related items

  if (related.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-200">
      <h3 className="text-lg font-bold text-foreground">Related Calculators</h3>
      <p className="text-xs text-foreground/50 mt-1 mb-4">Other useful calculators in this category</p>
      
      <div className="flex flex-col gap-2.5">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            prefetch={false}
            className="flex items-center justify-between group rounded-xl border border-border bg-background/50 p-3 hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div className="overflow-hidden pr-2">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors block truncate">
                {calc.title}
              </span>
              <span className="text-xs text-foreground/50 block truncate">
                {calc.description}
              </span>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shrink-0">
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-5 text-center">
        <Link 
          href={`/categories/${categorySlug}`}
          prefetch={false}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary hover:underline transition-all"
        >
          View all in category
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
