import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import FAQSection from '@/components/FAQSection';
import { BookOpen, Star, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const PILLARS_CONFIG: Record<string, {
  title: string;
  description: string;
  categorySlug: string;
  introduction: string;
  faqs: { q: string; a: string }[];
  guides: { title: string; slug: string }[];
}> = {
  'finance-calculators': {
    title: 'Finance & Investment Authority Hub',
    description: 'Learn how to calculate compounding yields, loan interest rates, and retirement targets.',
    categorySlug: 'financial',
    introduction: 'This hub contains verified algorithms and step-by-step math breakdowns for calculating personal wealth, investments, and home loan repayment schedules.',
    faqs: [
      { q: "What is the difference between APR and interest rate?", a: "Interest rate is the annual cost of borrowing. APR includes both the interest rate and other bank administrative fees." }
    ],
    guides: [
      { title: "How Compound Interest Works", slug: "how-compound-interest-works" },
      { title: "How Loan Interest Is Calculated", slug: "how-loan-interest-calculated" }
    ]
  },
  'percentage-calculators': {
    title: 'Percentage Calculations Authority Hub',
    description: 'Calculate percentages, growth margins, percentage differences, and reverse values.',
    categorySlug: 'education',
    introduction: 'Explore our complete percentage hub containing all formulas for percentage change, discounts, and weighted averages.',
    faqs: [
      { q: "How do you calculate a percentage increase?", a: "Subtract the original value from the new value, divide by the original, and multiply by 100." }
    ],
    guides: [
      { title: "How To Calculate Percentages", slug: "how-to-calculate-percentages" }
    ]
  },
  'math-calculators': {
    title: 'Mathematics Calculations Hub',
    description: 'Solve equations, fractions, square roots, and algebraic expressions.',
    categorySlug: 'education',
    introduction: 'Get step-by-step guides for basic arithmetic, algebra, fraction conversions, and linear equations.',
    faqs: [
      { q: "How do you simplify fractions?", a: "Divide the numerator and denominator by their greatest common divisor." }
    ],
    guides: []
  },
  'date-time-calculators': {
    title: 'Date & Time Authority Hub',
    description: 'Calculate date offsets, business days, timezone differences, and chronological intervals.',
    categorySlug: 'date-time',
    introduction: 'Plan projects, track ages, count days between dates, and convert timezones instantly.',
    faqs: [
      { q: "How many business days are in a typical year?", a: "Around 260 to 262 days depending on weekends and regional public holidays." }
    ],
    guides: []
  },
  'conversion-calculators': {
    title: 'Unit Conversion Authority Hub',
    description: 'Convert between metric and imperial systems for length, weight, area, and temperature.',
    categorySlug: 'unit-converter',
    introduction: 'Convert meters to feet, grams to ounces, liters to gallons, and Celsius to Fahrenheit instantly.',
    faqs: [
      { q: "Why use standard conversion coefficients?", a: "To ensure absolute precision across scientific, engineering, and culinary calculations." }
    ],
    guides: []
  },
  'health-calculators': {
    title: 'Health & Fitness Calculations Hub',
    description: 'Track BMI, calories, weight, target heart zones, and overall metabolic metrics.',
    categorySlug: 'health',
    introduction: 'Our health calculators are structured to aid in weight management and daily fitness plans.',
    faqs: [
      { q: "Is BMI accurate for active athletes?", a: "Athletes with high muscle mass may be classified as overweight because muscle weighs more than fat." }
    ],
    guides: []
  },
  'statistics-calculators': {
    title: 'Statistics & Probability Hub',
    description: 'Compute mean, median, mode, standard deviation, and p-value scores.',
    categorySlug: 'statistics',
    introduction: 'Explore descriptive and inferential statistics solvers designed for classrooms and data analysis.',
    faqs: [
      { q: "What is standard deviation?", a: "A metric that quantifies the amount of variation or dispersion in a set of data values." }
    ],
    guides: []
  },
  'education-calculators': {
    title: 'Education & Grade Estimators Hub',
    description: 'Calculate GPA, cumulative grade point averages, and target exam percentages.',
    categorySlug: 'education',
    introduction: 'Track your academic goals and calculate grades required on final exams to maintain specific grade targets.',
    faqs: [
      { q: "How is a weighted GPA calculated?", a: "By multiplying grade point scores by class credits, summing them, and dividing by total credit hours." }
    ],
    guides: []
  }
};

export async function generateStaticParams() {
  return Object.keys(PILLARS_CONFIG).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = PILLARS_CONFIG[slug];
  if (!config) return { title: 'Pillar Hub' };

  return {
    title: `${config.title} – Free Tools | CalculationDesk`,
    description: config.description,
    alternates: {
      canonical: `/pillar/${slug}`,
    },
  };
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  const config = PILLARS_CONFIG[slug];

  if (!config) {
    notFound();
  }

  const category = CATEGORIES.find(c => c.slug === config.categorySlug);
  const categoryName = category ? category.name : 'Category';
  const relatedCalcs = CALCULATORS.filter(c => c.category === config.categorySlug && c.implemented).slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: config.title }]} />

        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/5 border border-border/60 p-8 md:p-12 mb-8 mt-2 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {config.title}
          </h1>
          <p className="mt-4 text-base text-foreground/75 max-w-3xl leading-relaxed">
            {config.introduction}
          </p>
        </div>

        <AdSlot position="header" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                Featured Tools & Calculators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCalcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {calc.title}
                      </h3>
                      <p className="mt-2 text-xs md:text-sm text-foreground/60 leading-relaxed line-clamp-2">
                        {calc.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-bold text-primary">
                      <span>Open Tool</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                Frequently Asked Questions
              </h2>
              <FAQSection faqs={config.faqs} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Guides & Explanations
              </h3>
              <div className="space-y-3">
                {config.guides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="block text-sm font-bold text-primary hover:underline hover:text-secondary-hover"
                  >
                    → {g.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
