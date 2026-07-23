'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function CompoundInterestArticle() {
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
            <div className="text-xs font-bold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-full inline-block">Investing Guide</div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">Understanding Compound Interest Frequencies</h1>
            <div className="flex gap-4 text-xs text-foreground/50 font-medium">
              <span>Published: July 24, 2026</span>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </header>

          <section className="text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
            <p>
              Albert Einstein famously called compound interest the "eighth wonder of the world." Unlike simple interest, which is paid only on the principal amount, compound interest is calculated on both the initial principal and the accumulated interest from previous periods.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-foreground pt-4">The Compound Interest Formula</h2>
            <div className="bg-background border border-border p-4 rounded-xl text-center font-mono my-4 text-sm md:text-base overflow-x-auto">
              A = P x (1 + r/n)^(n x t)
            </div>
            <p>
              Where:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-foreground/75">
              <li><strong>A:</strong> The future value of the investment, including interest.</li>
              <li><strong>P:</strong> The initial principal balance.</li>
              <li><strong>r:</strong> Annual interest rate (as a decimal, e.g. 5% = 0.05).</li>
              <li><strong>n:</strong> The number of times interest compounds per year (e.g. daily = 365, monthly = 12).</li>
              <li><strong>t:</strong> The time period in years.</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-foreground pt-4">How Frequency Boosts Yield</h2>
            <p>
              The more frequently interest is added to your account, the faster your investment grows:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-foreground/75">
              <li><strong>Annual compounding (n=1):</strong> Reinvests gains once a year.</li>
              <li><strong>Monthly compounding (n=12):</strong> Reinvests gains every calendar month, creating accelerated loops.</li>
              <li><strong>Daily compounding (n=365):</strong> Reinvests gains every single day.</li>
            </ul>

            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-primary flex items-center gap-1.5 text-sm md:text-base">
                  <Calculator className="h-4.5 w-4.5" />
                  Calculate Compounding Growth
                </h4>
                <p className="text-xs text-foreground/60 mt-1">
                  Adjust principal, rates, and compounding frequencies in real-time.
                </p>
              </div>
              <Link
                href="/calculators/compound-interest-calculator/"
                className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary-hover text-xs shadow-md shadow-primary/10 shrink-0"
              >
                Go to Compound Calculator
              </Link>
            </div>
          </section>
        </article>

      </div>
    </div>
  );
}
