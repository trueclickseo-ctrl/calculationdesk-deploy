import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CalculationDesk Learning Portal - Blog',
  description: 'Deep-dive financial guides, mathematical formulas, and investment planning advice.',
  alternates: {
    canonical: '/blog/',
  },
};

const BLOG_POSTS = [
  {
    slug: 'how-emi-works-2026',
    title: 'How Loan EMIs are Calculated (Formula & Guide)',
    description: 'Learn the mathematical formula behind Equated Monthly Installments (EMIs) for home and car loans, and how to reduce your overall interest burden.',
    readTime: '5 min read',
    date: 'July 24, 2026',
    category: 'Finance'
  },
  {
    slug: 'understanding-compound-interest',
    title: 'Understanding Compound Interest Compounding Frequencies',
    description: 'A deep-dive into how compounding intervals (daily, monthly, quarterly) affect your savings growth, complete with mathematical comparisons.',
    readTime: '4 min read',
    date: 'July 24, 2026',
    category: 'Investing'
  }
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header navigation */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground mt-4 flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            CalculationDesk Learning Portal
          </h1>
          <p className="text-sm text-foreground/60 mt-1.5">
            Deep-dive financial guides, mathematical formulas, and investment planning advice.
          </p>
        </div>

        {/* List of articles */}
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="group rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm hover:border-primary/20 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 text-xs font-bold text-primary mb-3">
                <span className="bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                <span className="flex items-center gap-1 text-foreground/40 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-foreground/60 mt-2.5 leading-relaxed">
                {post.description}
              </p>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-xs text-foreground/40">{post.date}</span>
                <Link href={`/blog/${post.slug}/`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
