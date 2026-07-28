import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CALCULATORS } from '@/calculators.config';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import FAQSection from '@/components/FAQSection';
import { Star, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SUBCATEGORIES_CONFIG: Record<string, {
  title: string;
  description: string;
  categorySlug: string;
  introduction: string;
  faqs: { q: string; a: string }[];
  tags: string[];
}> = {
  'loan-calculators': {
    title: 'Loan & Repayment Calculators Hub',
    description: 'Calculate monthly EMIs, mortgages, auto loans, and outstanding debt payoffs.',
    categorySlug: 'financial',
    introduction: 'Plan loan repayment plans using mathematical equations that determine interest, amortizations, and principal deductions.',
    faqs: [
      { q: "What is amortization?", a: "Amortization refers to the process of spreading out a loan into a series of equal periodic payments." }
    ],
    tags: ['loan', 'emi', 'mortgage', 'repayment']
  },
  'investment-calculators': {
    title: 'Wealth & Investment Calculators Hub',
    description: 'Calculate mutual fund returns, systematic investments, and compound growth.',
    categorySlug: 'financial',
    introduction: 'Model your investment returns, analyze progressive step-up SIPs, and track portfolio asset allocations.',
    faqs: [
      { q: "What is a Systematic Investment Plan (SIP)?", a: "An investment channel that lets you contribute a fixed sum regularly into a mutual fund." }
    ],
    tags: ['investment', 'sip', 'mutual-fund']
  },
  'tax-calculators': {
    title: 'Tax Estimators & Slabs Hub',
    description: 'Compute federal income tax slabs, GST invoices, and freelancer liabilities.',
    categorySlug: 'financial',
    introduction: 'Compare old vs new tax regimes, calculate income tax brackets, and analyze deductions.',
    faqs: [
      { q: "What is a standard tax slab?", a: "Slabs represent the marginal income rates taxed at specified percentage thresholds." }
    ],
    tags: ['tax', 'gst', 'income-tax']
  },
  'retirement-calculators': {
    title: 'Retirement Corpus & Goal Planners',
    description: 'Model inflation-adjusted retirement targets and pension payouts.',
    categorySlug: 'financial',
    introduction: 'Determine the target corpus required to maintain living standards and withdraw payouts safely.',
    faqs: [
      { q: "What is inflation-adjusted projection?", a: "It scales up future expenses by inflation rates to calculate the real purchasing power required." }
    ],
    tags: ['retirement', 'pension', 'epf']
  },
  'interest-calculators': {
    title: 'Compounding & Simple Interest Solvers',
    description: 'Solve annual, monthly, and daily compound calculations.',
    categorySlug: 'financial',
    introduction: 'Analyze how interest accrues over deposits, loans, and other financial channels.',
    faqs: [
      { q: "What is compound interest?", a: "Interest calculated on the initial principal and the accumulated interest of previous periods." }
    ],
    tags: ['interest', 'compound', 'simple-interest']
  },
  'debt-calculators': {
    title: 'Debt Consolidation & Payoff Tools',
    description: 'Compare snowball and avalanche debt repayment methods.',
    categorySlug: 'financial',
    introduction: 'Structure payoff timelines to pay down outstanding credit cards and loans with minimal total interest cost.',
    faqs: [
      { q: "What is the avalanche method?", a: "Paying off high-interest debts first while maintaining minimum payments on all other loans." }
    ],
    tags: ['debt', 'payoff', 'consolidation']
  },
  'algebra-calculators': {
    title: 'Algebra & Matrix Math Solvers',
    description: 'Simplify equations, solve quadratic structures, and analyze matrices.',
    categorySlug: 'education',
    introduction: 'Step-by-step math solvers designed to help students learn algebraic and matrix concepts.',
    faqs: [
      { q: "What is matrix decomposition?", a: "Splitting a matrix into a product of simpler matrices, useful for solving linear equations." }
    ],
    tags: ['algebra', 'matrix', 'quadratic']
  },
  'statistics-calculators': {
    title: 'Statistics & Probability Solvers',
    description: 'Calculate mean, median, mode, standard deviation, and variance.',
    categorySlug: 'statistics',
    introduction: 'Classroom helpers designed to resolve statistical parameters and probability sets.',
    faqs: [
      { q: "What is variance?", a: "The expectation of the squared deviation of a random variable from its mean." }
    ],
    tags: ['statistics', 'variance', 'mean', 'probability']
  },
  'geometry-calculators': {
    title: 'Geometry & Volume Solvers',
    description: 'Compute cross-sectional areas, volumes, and standard perimeter shapes.',
    categorySlug: 'education',
    introduction: 'Find standard area and volume parameters for cylinders, cubes, circles, and rectangles.',
    faqs: [
      { q: "How is cylinder volume calculated?", a: "By multiplying the base area (pi times radius squared) by height." }
    ],
    tags: ['geometry', 'area', 'volume']
  },
  'percentage-calculators': {
    title: 'Percentage Math Tools',
    description: 'Calculate percentage change, difference, increase, and decrease.',
    categorySlug: 'education',
    introduction: 'Solve compound fractions and simple percentage offsets for everyday math.',
    faqs: [
      { q: "What is the percentage difference?", a: "The difference between two values divided by the average of those two values, multiplied by 100." }
    ],
    tags: ['percentage', 'increase', 'decrease']
  },
  'nutrition-calculators': {
    title: 'Calorie & Nutrition Planning Hub',
    description: 'Estimate daily caloric targets, macronutrient breakdowns, and diet logs.',
    categorySlug: 'health',
    introduction: 'Structure your nutritional targets based on weight management and active fitness plans.',
    faqs: [
      { q: "What are macros?", a: "Macronutrients (carbohydrates, fats, and proteins) that provide the calorie energy required by the body." }
    ],
    tags: ['nutrition', 'calories', 'macro']
  },
  'body-calculators': {
    title: 'Body Mass & Composition Hub',
    description: 'Estimate BMI, body fat percentage, and lean body mass indexes.',
    categorySlug: 'health',
    introduction: 'Check body fat margins and weight proportions based on tapeline and scale parameters.',
    faqs: [
      { q: "What is lean body mass?", a: "The weight of the body minus the weight of the fat tissue." }
    ],
    tags: ['body', 'bmi', 'fat']
  },
  'fitness-calculators': {
    title: 'Target Heart Zone & Fitness Solvers',
    description: 'Track daily energy expenditures, activity factors, and workout metrics.',
    categorySlug: 'health',
    introduction: 'Optimize workout zones and daily calorie deficits for active fitness training.',
    faqs: [
      { q: "What is TDEE?", a: "Total Daily Energy Expenditure, the total number of calories you burn per day." }
    ],
    tags: ['fitness', 'tdee', 'heart-rate']
  }
};

export async function generateStaticParams() {
  return Object.keys(SUBCATEGORIES_CONFIG).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = SUBCATEGORIES_CONFIG[slug];
  if (!config) return { title: 'Subcategory Hub' };

  return {
    title: `${config.title} – Free Tools | CalculationDesk`,
    description: config.description,
    alternates: {
      canonical: `/subcategory/${slug}/`,
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug } = await params;
  const config = SUBCATEGORIES_CONFIG[slug];

  if (!config) {
    notFound();
  }

  // Filter calculators matching tags or subcategory configuration
  const relatedCalcs = CALCULATORS.filter(c => 
    c.category === config.categorySlug && 
    c.implemented && 
    (c.slug.includes(slug.split('-')[0]) || c.keywords?.some(k => config.tags.includes(k)))
  ).slice(0, 10);

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
                Calculators in this Cluster
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCalcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}/`}
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
                      <span>Calculate</span>
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

          <div className="lg:col-span-4">
            <AdSlot position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
