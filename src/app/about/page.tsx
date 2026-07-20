import React from 'react';

export const metadata = {
  title: 'About Us - CalcHub',
  description: 'Learn about CalcHub, the ultimate online resource for fast, accurate, and completely free calculations across finance, education, health, lifestyle, and science.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">About CalcHub</h1>
      <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
        Welcome to CalcHub, the ultimate online directory and calculation resource. Our mission is to make math, finance, sciences, and everyday decision-making simpler, faster, and accessible to everyone worldwide.
      </p>

      <div className="space-y-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3">Our Mission</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            We believe that accurate information should be free and instant. Whether you are a student solving complex calculus equations, a contractor estimating concrete volume, a homeowner calculating a mortgage, or simply curious about how old your hamster is in human years, CalcHub is designed to provide you with precise answers in seconds.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3">A Diverse Directory of Tools</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            With over 275+ unique, custom-built calculators spanning 16 major categories, CalcHub covers everything from basic conversion tools to advanced statistics, financial projections, physics formulas, and everyday life calculators. We are committed to expanding our library and continuously improving our calculation algorithms.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3">Privacy & Security First</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Your data belongs to you. CalcHub processes calculations entirely client-side or instantly without collecting, tracking, or storing your personal financial, medical, or calculation logs. Features like "Favorites" run locally in your browser's local storage.
          </p>
        </section>
      </div>
    </div>
  );
}
