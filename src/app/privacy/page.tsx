import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CalculationDesk',
  description: 'Understand how CalculationDesk respects your privacy. We do not collect or track your personal calculation inputs.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-sm text-foreground/50 mb-8">Last updated: July 15, 2026</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">1. Information We Do Not Collect</h2>
          <p>
            CalculationDesk is designed to operate without user accounts, logins, or tracking databases. We do not collect, store, or sell any personal data or details you input into any of our 275+ calculators.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">2. Local Storage</h2>
          <p>
            Features like the "Favorites" and "Recently Used" panels rely on your browser's local storage to save your preference list. This information is stored entirely locally on your device and is never sent to our servers.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3 text-foreground">3. Analytics & Ad Cookies</h2>
          <p>
            We may use third-party analytics services (such as Google Analytics) and advertisement networks to support the website. These partners may place cookies on your browser to measure site traffic and serve relevant ads. You can disable cookies in your browser settings if you prefer not to participate.
          </p>
        </section>
      </div>
    </div>
  );
}
