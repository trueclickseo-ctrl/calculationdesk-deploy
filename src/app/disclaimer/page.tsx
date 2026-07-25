import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - CalculationDesk',
  description: 'Read the official CalculationDesk disclaimer regarding the accuracy and educational nature of our online calculators.',
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">Disclaimer</h1>
      <p className="text-sm text-foreground/50 mb-8">Last updated: July 15, 2026</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">1. Accuracy of Calculations</h2>
          <p>
            While we strive for absolute accuracy in the equations, programming, and mathematical formulas supporting CalculationDesk's 275+ calculators, we make no guarantees, warranties, or representations regarding the precision or reliability of the results.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">2. Professional Advice</h2>
          <p>
            Our calculators do not provide professional financial, legal, tax, medical, structural engineering, or scientific advice. Always consult a qualified professional (such as a certified public accountant, licensed medical doctor, structural engineer, or scientist) before making significant choices or implementing project dimensions.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">3. No Warranties</h2>
          <p>
            CalculationDesk disclaims all liability for any loss, damage, or legal consequences resulting from your reliance on the tools, materials, and calculation models provided on this site.
          </p>
        </section>
      </div>
    </div>
  );
}
