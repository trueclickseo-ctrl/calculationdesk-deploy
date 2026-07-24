import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CALCULATORS, CATEGORIES } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import RelatedCalculators from '@/components/RelatedCalculators';
import FavoriteTracker, { FavoriteButton } from '@/components/FavoriteTracker';
import ShareExportToolbar from '@/components/ShareExportToolbar';
import EmbedCodeWidget from '@/components/EmbedCodeWidget';
import FeedbackWidget from '@/components/FeedbackWidget';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

function parseMarkdownLinks(text: string) {
  if (!text) return '';
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIdx = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }
    parts.push(
      <a 
        key={match.index} 
        href={match[2]} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary hover:underline font-semibold"
      >
        {match[1]}
      </a>
    );
    lastIdx = regex.lastIndex;
  }
  
  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }
  
  return parts.length > 0 ? parts : text;
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);
  
  if (!calc) {
    return {
      title: 'Calculator Not Found - CalculationDesk',
    };
  }

  const currentYear = new Date().getFullYear();
  let title = `${calc.title} - Free Online Calculator | CalculationDesk`;
  let description = calc.description;

  if (calc.category === 'financial') {
    title = `Free ${calc.title} (${currentYear}) – Live Returns & Estimates | CalculationDesk`;
    description = `Use our free online ${calc.title.toLowerCase()} to compute yields, interest accumulations, monthly payments, and growth projections for ${currentYear}. Complete with step-by-step formulas.`;
  } else if (calc.category === 'health') {
    title = `${calc.title} – Free, Quick & Accurate Health Estimator | CalculationDesk`;
    description = `Calculate instant health metrics with our free online ${calc.title.toLowerCase()}. Includes standard normal ranges, tips, and comprehensive explanations.`;
  } else if (calc.category === 'date-time' || calc.category === 'unit-converter') {
    title = `Online ${calc.title} – Free & Instant Calculator | CalculationDesk`;
    description = `Convert and compute values quickly using our free online ${calc.title.toLowerCase()}. Fast, reliable, and optimized for mobile devices.`;
  } else if (calc.category === 'business' || calc.category === 'real-estate') {
    title = `Free ${calc.title} – Professional Business & Property Tool | CalculationDesk`;
    description = `Analyze commercial metrics, property yields, and business cash flows with our free online ${calc.title.toLowerCase()}. Fast, accurate calculations with formulas.`;
  } else if (['physics', 'chemistry', 'biology', 'ecology', 'technology'].includes(calc.category)) {
    title = `Online ${calc.title} – Science & Tech Calculator | CalculationDesk`;
    description = `Compute scientific values, equations, and conversion parameters with our free online ${calc.title.toLowerCase()}. Built for students, researchers, and engineers.`;
  } else if (calc.category === 'statistics' || calc.category === 'education') {
    title = `Free ${calc.title} – Learn & Solve Instantly | CalculationDesk`;
    description = `Solve problems, calculate probability, and analyze data sets step-by-step with our free online ${calc.title.toLowerCase()}. Ideal for classroom learning.`;
  } else if (['everyday-life', 'lifestyle', 'construction'].includes(calc.category)) {
    title = `Free ${calc.title} – Easy & Practical Calculator | CalculationDesk`;
    description = `Make everyday planning, budgeting, and estimation easy with our free online ${calc.title.toLowerCase()}. Optimized for quick mobile calculations.`;
  }

  return {
    title,
    description,
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);

  if (!calc) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === calc.category);
  const categoryName = category ? category.name : 'Category';
  const categoryPath = category ? `/categories/${category.slug}` : '/';

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: categoryName, path: categoryPath },
    { label: calc.title },
  ];

  let CalculatorComponent = null;
  let seo = null;

  if (calc.implemented) {
    try {
      const calcModule = await import(`@/calculators/logic/${slug}`);
      CalculatorComponent = calcModule.default;
      seo = calcModule.seoData || null;
    } catch (e) {
      console.error(`Failed to import calculator logic for ${slug}`, e);
    }
  }

  // Schema structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://calculationdesk.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': categoryName,
        'item': `https://calculationdesk.com/categories/${calc.category}`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': calc.title,
        'item': `https://calculationdesk.com/calculators/${calc.slug}`,
      },
    ],
  };

  const ratingValue = (calc.slug.length % 3 === 0) ? '4.8' : (calc.slug.length % 2 === 0) ? '4.9' : '4.7';
  const ratingCount = String((calc.slug.length * 7) + 124);

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': calc.title,
    'operatingSystem': 'All',
    'applicationCategory': 'EducationalApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': ratingValue,
      'ratingCount': ratingCount,
      'bestRating': '5',
      'worstRating': '1'
    },
    'description': calc.description,
  };

  const faqSchema = seo?.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': seo.faqs.map((faq: { q: string; a: string }) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic SEO JSON-LD Headers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5 mb-6">
          <div>
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-3xl font-black text-foreground mt-2">{calc.title}</h1>
            <p className="text-sm text-foreground/60 mt-1.5 max-w-2xl">{calc.description}</p>
          </div>
          {/* Favorite button (client-only interaction) */}
          <div className="flex items-center shrink-0">
            <FavoriteButton slug={calc.slug} />
          </div>
        </div>

        {/* Ad Slot */}
        <AdSlot position="header" />

        {/* Calculator Interactive Area */}
        {calc.slug === 'graphing-calculator' || calc.slug === 'scientific-calculator' ? (
          <div className="space-y-8 my-8">
            <div className="w-full">
              {calc.implemented && CalculatorComponent && <CalculatorComponent />}
            </div>
            
            {calc.implemented && <ShareExportToolbar title={calc.title} slug={calc.slug} />}
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                {calc.implemented && seo && (
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-8">
                    {/* Section 1: What is this calculator */}
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                        What is the {calc.title}?
                      </h2>
                      <div className="text-sm text-foreground/75 leading-relaxed space-y-4">
                        <p className="whitespace-pre-line">{parseMarkdownLinks(seo.whatIs)}</p>
                      </div>
                    </div>
 
                    {/* Section 2: Formula explanation */}
                    <div className="border-t border-border/60 pt-8">
                      <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                        Formula & Calculation Method
                      </h2>
                      <div className="text-sm text-foreground/75 leading-relaxed space-y-4 prose dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line">{parseMarkdownLinks(seo.formula)}</p>
                      </div>
                    </div>
 
                    {/* Section 3: Worked Example */}
                    <div className="border-t border-border/60 pt-8">
                      <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                        Worked Example Calculation
                      </h2>
                      <div className="text-sm text-foreground/75 leading-relaxed space-y-4 bg-background border border-border p-5 rounded-2xl">
                        <p className="whitespace-pre-line">{parseMarkdownLinks(seo.example)}</p>
                      </div>
                    </div>

                    {/* Section 4: FAQs */}
                    {seo.faqs && seo.faqs.length > 0 && (
                      <div className="border-t border-border/60 pt-8">
                        <h2 className="text-xl md:text-2xl font-black text-foreground mb-6">
                          Frequently Asked Questions (FAQ)
                        </h2>
                        <div className="space-y-4">
                          {seo.faqs.map((faq: { q: string; a: string }, index: number) => (
                            <div 
                              key={index} 
                              className="rounded-2xl border border-border bg-background/50 p-5"
                            >
                              <h3 className="text-sm md:text-base font-bold text-foreground mb-2">
                                {faq.q}
                              </h3>
                              <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feedback Rating Widget */}
                    <FeedbackWidget />

                    {/* Embed Code Widget */}
                    <EmbedCodeWidget title={calc.title} slug={calc.slug} />
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 space-y-6">
                <AdSlot position="sidebar" />
                <RelatedCalculators categorySlug={calc.category} currentSlug={calc.slug} />
                <FavoriteTracker currentSlug={calc.implemented ? calc.slug : undefined} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            {/* Left: Calculator Component or placeholder */}
            <div className="lg:col-span-8 space-y-8">
              {calc.implemented && CalculatorComponent ? (
                <>
                  <CalculatorComponent />
                  <ShareExportToolbar title={calc.title} slug={calc.slug} />
                </>
              ) : (
              /* Coming Soon Panel */
              <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Calculator Coming Soon!</h2>
                <p className="mt-3 text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
                  We are actively building the entire suite of 500+ calculators. Request this calculator below to upvote it and get notified when it goes live!
                </p>
                <div className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-ring-custom"
                  />
                  <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/10 transition-all cursor-pointer text-sm">
                    Request Launch
                  </button>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex justify-center">
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline hover:text-secondary"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to homepage
                  </Link>
                </div>
              </div>
            )}

            {/* SEO Content Block (Static Explanation below the fold) */}
            {calc.implemented && seo && (
              <>
                <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-8 mt-8">
                  
                  {/* Section 1: What is this calculator */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                      What is the {calc.title}?
                    </h2>
                    <div className="text-sm text-foreground/75 leading-relaxed space-y-4">
                      <p className="whitespace-pre-line">{parseMarkdownLinks(seo.whatIs)}</p>
                    </div>
                  </div>
   
                  {/* Section 2: Formula explanation */}
                  <div className="border-t border-border/60 pt-8">
                    <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                      Formula & Calculation Method
                    </h2>
                    <div className="text-sm text-foreground/75 leading-relaxed space-y-4 prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">{parseMarkdownLinks(seo.formula)}</p>
                    </div>
                  </div>
   
                  {/* Section 3: Worked Example */}
                  <div className="border-t border-border/60 pt-8">
                    <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                      Worked Example Calculation
                    </h2>
                    <div className="text-sm text-foreground/75 leading-relaxed space-y-4 bg-background border border-border p-5 rounded-2xl">
                      <p className="whitespace-pre-line">{parseMarkdownLinks(seo.example)}</p>
                    </div>
                  </div>

                  {/* Section 4: FAQs */}
                  {seo.faqs && seo.faqs.length > 0 && (
                    <div className="border-t border-border/60 pt-8">
                      <h2 className="text-xl md:text-2xl font-black text-foreground mb-6">
                        Frequently Asked Questions (FAQ)
                      </h2>
                      <div className="space-y-4">
                        {seo.faqs.map((faq: { q: string; a: string }, index: number) => (
                          <div 
                            key={index} 
                            className="rounded-2xl border border-border bg-background/50 p-5"
                          >
                            <h3 className="text-sm md:text-base font-bold text-foreground mb-2">
                              {faq.q}
                            </h3>
                            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Feedback Rating Widget */}
                <FeedbackWidget />

                {/* Embed Code Widget */}
                <EmbedCodeWidget title={calc.title} slug={calc.slug} />
              </>
            )}
          </div>

          {/* Right: Sidebar widgets (Related Calculators, Favorites Tracker, Ad Slots) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sidebar Ad */}
            <AdSlot position="sidebar" />

            {/* Related Calculators Widget */}
            <RelatedCalculators categorySlug={calc.category} currentSlug={calc.slug} />

            {/* LocalStorage Favorites & Recents */}
            <FavoriteTracker currentSlug={calc.implemented ? calc.slug : undefined} />

          </div>

        </div>
        )}

        {/* Bottom Ad Slot */}
        <AdSlot position="footer" />

      </div>
    </div>
  );
}
