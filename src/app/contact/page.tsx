import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - CalculationDesk',
  description: 'Have a suggestion, feedback, or need help with a calculator? Get in touch with the CalculationDesk team.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl font-black text-foreground tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="text-sm font-semibold text-foreground/60 max-w-md mx-auto">
          Have a suggestion, feedback, or need help with a calculator? Drop us a message below.
        </p>
      </div>

      <ContactForm />
    </main>
  );
}
