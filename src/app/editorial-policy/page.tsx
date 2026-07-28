import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Editorial Policy & Standards | CalculationDesk',
  description: 'Learn about our content standards, editorial integrity, and calculator validation processes.',
  alternates: {
    canonical: '/editorial-policy/',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />
        
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-4 leading-tight">
          Editorial Policy & Code of Conduct
        </h1>

        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6 mt-8">
          <p>
            At CalculationDesk, we are dedicated to providing the public with highly accurate, free calculation utilities. Our goal is to explain calculations clearly, empowering readers to make informed quantitative decisions.
          </p>

          <h2 className="text-xl font-bold text-foreground">1. Accuracy & Verification</h2>
          <p>
            Every mathematical calculator is vetted by a qualified specialist or educator before publishing. We double-check formulas against standard textbooks, ISO standards, and relevant regional regulatory tax slabs.
          </p>

          <h2 className="text-xl font-bold text-foreground">2. Editorial Independence</h2>
          <p>
            Our calculation results are generated purely based on math. We do not skew calculations or outputs to benefit any third-party financial institution, sponsor, or lender.
          </p>

          <h2 className="text-xl font-bold text-foreground">3. Regular Updates</h2>
          <p>
            When tax regimes, currency exchange rates, or scientific standards change, we update our calculations. Each page clearly notes when it was last reviewed and by whom.
          </p>
        </div>
      </div>
    </div>
  );
}
