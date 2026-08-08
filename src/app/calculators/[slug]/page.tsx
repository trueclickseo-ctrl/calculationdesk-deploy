import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CALCULATORS, CATEGORIES } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import FavoriteTracker, { FavoriteButton } from '@/components/FavoriteTracker';
import ShareExportToolbar from '@/components/ShareExportToolbar';
import EmbedCodeWidget from '@/components/EmbedCodeWidget';
import FeedbackWidget from '@/components/FeedbackWidget';
import ComparisonTable from '@/components/ComparisonTable';
import EEATAuthorCard from '@/components/EEATAuthorCard';
import FAQSection from '@/components/FAQSection';
import CalculatorExamples from '@/components/CalculatorExamples';
import RelatedGuides from '@/components/RelatedGuides';
import { ArrowLeft, Send, Sparkles, BookOpen, AlertCircle, Info, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { getCalculatorSeoData } from '@/utils/seo-helpers';
import { getCalculatorSchema } from '@/utils/schema-generator';
import { getSemanticLinks } from '@/utils/internal-linking';
import MarkdownContent, { InlineMarkdown } from '@/components/MarkdownContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seoData = getCalculatorSeoData(slug);
  
  return {
    title: seoData.seoTitle,
    description: seoData.metaDescription,
    alternates: {
      canonical: `/calculators/${slug}/`,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);

  if (!calc) {
    notFound();
  }

  const seoData = getCalculatorSeoData(slug);
  const category = CATEGORIES.find((c) => c.slug === calc.category);
  const categoryName = category ? category.name : 'Category';
  const categoryPath = category ? `/categories/${category.slug}/` : '/';

  // Semantic related links
  const semanticLinks = getSemanticLinks(slug);

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: categoryName, path: categoryPath },
    { label: calc.title },
  ];

  let CalculatorComponent = null;

  if (calc.implemented) {
    try {
      const calcModule = await import(`@/calculators/logic/${slug}`);
      CalculatorComponent = calcModule.default;
    } catch (e) {
      console.error(`Failed to import calculator logic for ${slug}`, e);
    }
  }

  const schemas = getCalculatorSchema(
    seoData.title,
    slug,
    seoData.metaDescription,
    categoryName,
    calc.category,
    seoData.faqs
  );

  return (
    <div className="min-h-screen bg-background" data-calculator-slug={slug}>
      {/* Dynamic SEO JSON-LD Schemas */}
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb path */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5 mb-6 mt-2">
          <div>
            <h1 className="text-3xl font-black text-foreground mt-2">{seoData.title}</h1>
            <p className="text-sm text-foreground/60 mt-1.5 max-w-2xl">{seoData.metaDescription}</p>
          </div>
          <div className="flex items-center shrink-0">
            <FavoriteButton slug={calc.slug} />
          </div>
        </div>

        {/* AI Overview Summary Box for AI Search and Quick-Answer optimization */}
        {seoData.aiSummary && (
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider">AI Quick Summary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground/80 leading-relaxed">
              <div>
                <p className="font-bold text-foreground mb-1">Definition & Purpose:</p>
                <p className="text-xs md:text-sm"><InlineMarkdown text={seoData.aiSummary.definition} /></p>
                <p className="font-bold text-foreground mt-3 mb-1">When to Use:</p>
                <p className="text-xs md:text-sm"><InlineMarkdown text={seoData.aiSummary.whenToUse} /></p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">Key Takeaway Insights:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm">
                  {Array.isArray(seoData.aiSummary.keyTakeaways) ? (
                    seoData.aiSummary.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx}><InlineMarkdown text={takeaway} /></li>
                    ))
                  ) : (
                    <li>{typeof seoData.aiSummary?.keyTakeaways === 'string' ? seoData.aiSummary.keyTakeaways : 'Check loan repayment details.'}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Ad Slot */}
        <AdSlot position="header" />

        {/* Calculator Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Left: Calculator Component or placeholder */}
          <div className="lg:col-span-8 space-y-8">
            {calc.implemented && CalculatorComponent ? (
              <div data-analytics-event="calculator_viewed">
                <CalculatorComponent />
                <ShareExportToolbar title={calc.title} slug={calc.slug} />
              </div>
            ) : (
              /* Coming Soon Panel */
              <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Calculator Coming Soon!</h2>
                <p className="mt-3 text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
                  We are actively building the entire suite of calculators. Request this calculator below to upvote it and get notified when it goes live!
                </p>
                <div className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4"
                  />
                  <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-hover shadow-lg transition-all cursor-pointer text-sm">
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
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-8 mt-8">
              {/* Introduction */}
              <div>
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  Introduction
                </h2>
                <MarkdownContent text={seoData.introduction} />
              </div>

              {/* Formula explanation */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  Formula & Variables Explained
                </h2>
                <div className="text-sm text-foreground/75 leading-relaxed bg-muted/20 border border-border p-5 rounded-2xl mb-4 font-mono select-all">
                  {seoData.aiSummary.formulaSummary}
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  <InlineMarkdown text={seoData.formulaDescription} />
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Variables:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/70">
                    {Array.isArray(seoData.variablesExplained) && seoData.variablesExplained.map((v, i) => (
                      <li key={i}>
                        <strong className="text-foreground">{v.name}</strong>: <InlineMarkdown text={v.description} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step by Step Guide */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  How to Calculate (Step-by-Step)
                </h2>
                <MarkdownContent text={seoData.stepByStep} />
              </div>

              {/* Worked Examples */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  Worked Examples Calculation
                </h2>
                <CalculatorExamples examples={seoData.examples} />
              </div>

              {/* Configurable Comparison Tables */}
              {seoData.comparisonTable && (
                <div className="border-t border-border/60 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                    Comparison Table Reference
                  </h2>
                  <ComparisonTable config={seoData.comparisonTable} />
                </div>
              )}

              {/* Real World Uses */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  Real-World Applications
                </h2>
                <MarkdownContent text={seoData.realWorldUses} />
              </div>

              {/* Limitations & Mistakes */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                  Limitations & Common Mistakes
                </h2>
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start bg-amber-500/10 text-amber-800 dark:text-amber-300 p-4 rounded-xl text-xs md:text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <span className="font-bold">Caution & Mistakes:</span>
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        {Array.isArray(seoData.commonMistakes) && seoData.commonMistakes.map((m, idx) => (
                          <li key={idx}><InlineMarkdown text={m} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start bg-blue-500/10 text-blue-800 dark:text-blue-300 p-4 rounded-xl text-xs md:text-sm">
                    <Info className="h-5 w-5 shrink-0 text-blue-500" />
                    <div>
                      <span className="font-bold">Limitations:</span>
                      <p className="mt-1"><InlineMarkdown text={seoData.aiSummary.limitations} /></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-6">
                  Frequently Asked Questions (FAQ)
                </h2>
                <FAQSection faqs={seoData.faqs} />
              </div>

              {/* References */}
              {seoData.references && seoData.references.length > 0 && (
                <div className="border-t border-border/60 pt-8">
                  <h2 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">References & Citations</h2>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/60 font-medium">
                    {Array.isArray(seoData.references) && seoData.references.map((ref, idx) => (
                      <li key={idx}>
                        <a href={ref} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* EEAT Author / Reviewer profiles */}
            <EEATAuthorCard
              authorId={seoData.authorId}
              reviewerId={seoData.reviewerId}
              lastUpdated={seoData.lastUpdated}
              formulaVerified={seoData.formulaVerified}
            />

            {/* Feedback Rating Widget */}
            <FeedbackWidget />

            {/* Embed Code Widget */}
            <EmbedCodeWidget title={calc.title} slug={calc.slug} />
          </div>

          {/* Right: Sidebar widgets */}
          <div className="lg:col-span-4 space-y-6">
            <AdSlot position="sidebar" />
            
            {/* Semantic Internal Links Widget */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Related Calculators
              </h3>
              <div className="space-y-3">
                {semanticLinks.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/calculators/${link.slug}/`}
                    className="block text-sm hover:underline"
                    data-analytics-event="related_calculator_clicked"
                  >
                    <span className="font-bold text-primary mr-1">→</span>
                    <span className="font-medium text-foreground/80 hover:text-primary">{link.title}</span>
                    <span className="block text-[10px] text-foreground/40 mt-0.5 ml-3 font-semibold uppercase">{link.relationshipType}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related guides if defined */}
            {seoData.relationships?.relatedGuides && (
              <RelatedGuides guideSlugs={seoData.relationships.relatedGuides} />
            )}

            <FavoriteTracker currentSlug={calc.implemented ? calc.slug : undefined} />
          </div>
        </div>

        {/* Bottom Ad Slot */}
        <AdSlot position="footer" />
      </div>
    </div>
  );
}
