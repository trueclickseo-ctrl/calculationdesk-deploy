import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Formula Verification Policy | CalculationDesk',
  description: 'Understand how we test, audit, and verify the mathematical and scientific formulas used in our calculators.',
  alternates: {
    canonical: '/formula-verification/',
  },
};

export default function FormulaVerificationPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Formula Verification Policy' }]} />
        
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-4 leading-tight">
          Formula Verification Policy
        </h1>

        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6 mt-8">
          <p>
            To guarantee complete reliability, CalculationDesk operates a structured, three-step formula audit process before any calculator goes live.
          </p>

          <h2 className="text-xl font-bold text-foreground">Step 1: Reference Sourcing</h2>
          <p>
            We compile equations exclusively from verified academic sources, peer-reviewed scientific journals, government bureaus, and corporate finance textbooks.
          </p>

          <h2 className="text-xl font-bold text-foreground">Step 2: Cross-Verification Testing</h2>
          <p>
            Developers write test fixtures checking boundary conditions (e.g. infinite terms, zero values, negative numbers) and compare outcomes against manual worksheets and alternative software solutions.
          </p>

          <h2 className="text-xl font-bold text-foreground">Step 3: Peer Review</h2>
          <p>
            An editor or reviewer (possessing credentials in the specific field) audits the code logic, formula formatting, and explanations to ensure they are accessible and free from mathematical bias.
          </p>
        </div>
      </div>
    </div>
  );
}
