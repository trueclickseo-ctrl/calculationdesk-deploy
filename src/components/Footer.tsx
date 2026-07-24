// SERVER COMPONENT — no 'use client'. Footer is entirely static HTML.
import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { Calculator, Mail, Shield, BookOpen } from 'lucide-react';
import Logo from '@/components/Logo';



const POPULAR_CALCS = [
  { name: 'EMI Calculator', slug: 'emi-calculator' },
  { name: 'BMI Calculator', slug: 'bmi-calculator' },
  { name: 'Age Calculator', slug: 'age-calculator' },
  { name: 'SIP Calculator', slug: 'sip-calculator' },
  { name: 'GST Calculator', slug: 'gst-calculator' },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

          {/* Logo & About */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary font-bold text-lg"
            >
              <Logo className="h-5 w-5" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CalculationDesk</span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs leading-relaxed">
              Fast, accurate, and completely free online calculators. CalculationDesk provides over 280+ specialized calculation tools for finance, education, health, lifestyle, and business.
            </p>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Popular Calculators</h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_CALCS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/calculators/${item.slug}`}
                    className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Specialty Calcs</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.slice(8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Legal &amp; Support</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/blog/', label: 'Learning Blog' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Support' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50 text-center md:text-left">
            &copy; {currentYear} CalculationDesk. All rights reserved. Designed and Developed by{' '}
            <a href="https://www.trueclickseo.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline font-medium">
              True Click
            </a>
            . Calculations are for educational and estimation purposes only.
          </p>
          <div className="flex gap-4 text-foreground/50">
            <Link href="/contact" className="hover:text-primary transition-colors" aria-label="Contact Support"><Mail className="h-4 w-4" /></Link>
            <Link href="/privacy" className="hover:text-primary transition-colors" aria-label="Privacy Policy"><Shield className="h-4 w-4" /></Link>
            <Link href="/terms" className="hover:text-primary transition-colors" aria-label="Terms of Service"><BookOpen className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
