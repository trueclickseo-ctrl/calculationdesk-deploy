import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { BookOpen, Calendar, User, ArrowLeft } from 'lucide-react';
import { getGuideSchema } from '@/utils/schema-generator';

interface Props {
  params: Promise<{ slug: string }>;
}

import { GUIDES_CONFIG } from '@/data/guides-data';

export async function generateStaticParams() {
  return Object.keys(GUIDES_CONFIG).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = GUIDES_CONFIG[slug];
  if (!config) return { title: 'Guide' };

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const config = GUIDES_CONFIG[slug];

  if (!config) {
    notFound();
  }

  const schemas = getGuideSchema(config.title, slug, config.description, config.date, config.author);

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Guides', path: '#' }, { label: config.title }]} />

        <article className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
            {config.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center mt-4 text-xs font-semibold text-foreground/50 border-b border-border/50 pb-5">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-primary" />
              <span>By {config.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Published: {config.date}</span>
            </div>
          </div>

          <AdSlot position="header" />

          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6 mt-8 whitespace-pre-line text-sm md:text-base">
            {config.content}
          </div>

          <AdSlot position="in-content" />

          {/* Links back to tools */}
          <div className="mt-12 p-6 rounded-3xl border border-primary/20 bg-primary/5">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Try Our Free Interactive Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.calculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="block p-4 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-sm font-semibold text-primary hover:text-secondary text-sm"
                >
                  {calc.title} →
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to homepage
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
