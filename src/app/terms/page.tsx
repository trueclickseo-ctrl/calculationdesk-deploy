import React from 'react';

export const metadata = {
  title: 'Terms & Conditions - CalculationDesk',
  description: 'Review the Terms & Conditions governing your use of the CalculationDesk website and free calculation directory.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">Terms & Conditions</h1>
      <p className="text-sm text-foreground/50 mb-8">Last updated: July 15, 2026</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using CalculationDesk, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should immediately cease using the site.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">2. Permitted Use</h2>
          <p>
            All calculators and calculations provided on CalculationDesk are for educational, estimation, and personal planning purposes only. You may not scrape, copy, redistribute, or use our algorithms for commercial resale without written authorization.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">3. Limitation of Liability</h2>
          <p>
            CalculationDesk is provided on an "as-is" and "as-available" basis. We do not guarantee that the calculators will always produce 100% correct answers. We are not responsible for any financial, business, mathematical, or physical decisions made based on outputs from our website.
          </p>
        </section>
      </div>
    </div>
  );
}
