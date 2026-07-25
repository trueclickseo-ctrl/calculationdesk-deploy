import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Loan EMIs are Calculated (Formula & Guide) - CalculationDesk',
  description: 'Learn the mathematical formula behind Equated Monthly Installments (EMIs) for home and car loans, and how to reduce your overall interest burden.',
  alternates: {
    canonical: '/blog/how-emi-works-2026/',
  },
};

export default function EmiArticle() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/blog/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Articles
          </Link>
        </div>

        <article className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm space-y-6">
          <header className="space-y-3 border-b border-border/60 pb-6">
            <div className="text-xs font-bold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-full inline-block">Finance Guide</div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">How Loan EMIs are Calculated (Formula & Guide)</h1>
            <div className="flex gap-4 text-xs text-foreground/50 font-medium">
              <span>Published: July 24, 2026</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </header>

          <section className="text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
            <p>
              When taking a loan (whether a home loan, car loan, or personal loan), one of the most important concepts to understand is the **Equated Monthly Installment (EMI)**. An EMI is a fixed payment made by a borrower to a lender on a specified date each calendar month.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-foreground pt-4">The Mathematical EMI Formula</h2>
            <p>
              The standard mathematical formula used to calculate EMIs on a reducing balance basis is:
            </p>
            <div className="bg-background border border-border p-4 rounded-xl text-center font-mono my-4 text-sm md:text-base overflow-x-auto">
              EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
            </div>
            <p>
              Where:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-foreground/75">
              <li><strong>P:</strong> Principal loan amount (the base borrowing sum).</li>
              <li><strong>r:</strong> Monthly interest rate (Annual Rate / 12 / 100).</li>
              <li><strong>n:</strong> Loan tenure in number of monthly installments.</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-foreground pt-4">Worked Example</h2>
            <p>
              Suppose you take a car loan of $20,000 at an annual interest rate of 12% for a tenure of 3 years (36 months).
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-foreground/75">
              <li>Monthly rate (r) = 12 / 12 / 100 = 0.01</li>
              <li>Tenure (n) = 36 months</li>
              <li>EMI = [20,000 x 0.01 x (1.01)^36] / [(1.01)^36 - 1] = $664.29 per month.</li>
            </ul>

            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-primary flex items-center gap-1.5 text-sm md:text-base">
                  <Calculator className="h-4.5 w-4.5" />
                  Try it yourself!
                </h4>
                <p className="text-xs text-foreground/60 mt-1">
                  Adjust principal, interest rates, and loan terms in real-time.
                </p>
              </div>
              <Link
                href="/calculators/emi-calculator/"
                className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary-hover text-xs shadow-md shadow-primary/10 shrink-0"
              >
                Go to EMI Calculator
              </Link>
            </div>
          </section>
        </article>

      </div>
    </div>
  );
}
