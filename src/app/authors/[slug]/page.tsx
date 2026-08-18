import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { Award, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react';
import { getAuthorProfile } from '@/utils/seo-helpers';
import { CALCULATORS } from '@/calculators.config';

interface Props {
  params: Promise<{ slug: string }>;
}

const AUTHOR_SLUGS = ['editorial-team', 'sarah-jenkins'];

export async function generateStaticParams() {
  return AUTHOR_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorProfile(slug);
  if (!author) return { title: 'Author Profile' };

  return {
    title: `${author.name} – Author & Editorial Profile | CalculationDesk`,
    description: author.bio,
    alternates: {
      canonical: `/authors/${slug}/`,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorProfile(slug);

  if (!author) {
    notFound();
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `https://www.calculationdesk.com/authors/${slug}/`,
    worksFor: {
      '@type': 'Organization',
      name: 'CalculationDesk',
      url: 'https://www.calculationdesk.com/',
    },
  };

  const featuredCalcs = CALCULATORS.filter((c) => c.implemented).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Authors', path: '#' }, { label: author.name }]} />

        <div className="mt-6 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-border/60 pb-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-primary">Verified Contributor</span>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                {author.name}
              </h1>
              <p className="text-sm text-foreground/60 font-semibold mt-1">{author.role}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-base font-bold text-foreground mb-2">Biography & Expertise</h2>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {author.bio}
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">Core Expertise & Focus Areas</h2>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {author.expertise}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3.5 py-1 text-xs font-bold text-secondary">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mathematical Modeling
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Algorithm Verification
                </span>
              </div>
            </div>
          </div>
        </div>

        <AdSlot position="header" />

        {/* Featured Calculators verified by author */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <h2 className="text-lg md:text-xl font-black text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Verified Calculator Tools & Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCalcs.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}/`}
                className="block p-4 rounded-2xl border border-border bg-background hover:border-primary hover:shadow-sm font-semibold text-foreground hover:text-primary transition-all text-sm"
              >
                <div className="font-bold">{calc.title}</div>
                <p className="text-xs text-foreground/60 line-clamp-1 font-normal mt-1">{calc.description}</p>
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
      </div>
    </div>
  );
}
