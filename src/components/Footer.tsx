'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/calculators.config';
import { Calculator, Mail, Shield, BookOpen } from 'lucide-react';
import { triggerScrollToTop } from '@/components/MathScrollAnimation';
import Logo from '@/components/Logo';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const POPULAR_CALCS = [
    { name: 'EMI Calculator', slug: 'emi-calculator' },
    { name: 'BMI Calculator', slug: 'bmi-calculator' },
    { name: 'Age Calculator', slug: 'age-calculator' },
    { name: 'SIP Calculator', slug: 'sip-calculator' },
    { name: 'GST Calculator', slug: 'gst-calculator' },
  ];

  return (
    <footer className="w-full border-t border-border bg-card text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Logo & About */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  triggerScrollToTop();
                }
              }}
              className="flex items-center gap-2 text-primary font-bold text-lg"
            >
              <Logo className="h-5 w-5" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CalculationDesk</span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs leading-relaxed">
              Fast, accurate, and completely free online calculators. CalculationDesk provides over 500+ specialized calculation tools for finance, education, health, lifestyle, and business.
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 font-mono">Categories</h3>
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90 font-mono">Specialty Calcs</h3>
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

          {/* Contact & Policy Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Legal & Support</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-foreground/75 hover:text-primary hover:underline transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50 text-center md:text-left">
            &copy; {currentYear} CalculationDesk. All rights reserved. Designed and Developed by <a href="https://www.trueclickseo.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline font-medium">True Click</a>. Calculations are for educational and estimation purposes only.
          </p>
          <div className="flex gap-4 text-foreground/50">
            <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub"><GithubIcon className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Contact"><Mail className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Privacy"><Shield className="h-4 w-4" /></a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Terms"><BookOpen className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
