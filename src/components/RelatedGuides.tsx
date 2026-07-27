import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface RelatedGuidesProps {
  guideSlugs?: string[];
}

export default function RelatedGuides({ guideSlugs }: RelatedGuidesProps) {
  if (!guideSlugs || !Array.isArray(guideSlugs) || guideSlugs.length === 0) return null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Educational Guides & Explanations
      </h3>
      <div className="space-y-3">
        {guideSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/guides/${slug}`}
            className="block text-sm font-semibold text-primary hover:underline hover:text-secondary-hover transition-colors"
          >
            → How {slug.replace(/-/g, ' ')} Works
          </Link>
        ))}
      </div>
    </div>
  );
}
