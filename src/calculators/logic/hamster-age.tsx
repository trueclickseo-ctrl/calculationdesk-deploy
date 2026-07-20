'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Hamster Age Calculator converts your pet hamster's age in months or years into equivalent human years to help understand their life stages.`,
  formula: `Hamster lifespan is much shorter than humans. The translation scale is modeled as:

**1. Infancy (first month):**
- 1 month $\\approx$ 14 human years.

**2. Adulthood & Seniority:**
- 6 months $\\approx$ 18 human years.
- 1 year $\\approx$ 30 human years.
- 2 years $\\approx$ 57 human years.
- 3 years $\\approx$ 82 human years.
- 4 years $\\approx$ 110 human years.`,
  example: `**A hamster that is 1.5 years old (18 months):**
- Interpolated human age is **45 human years** (mid-adulthood).`,
  faqs: [
    {
      q: 'What is the average lifespan of a hamster?',
      a: 'Most pet hamsters live between 2 and 3 years. Dwarf hamsters average 1.5 to 2 years, while Syrian hamsters frequently live 2.5 to 3 years.',
    },
    {
      q: 'At what age is a hamster considered senior?',
      a: 'A hamster is considered senior once they reach about 1.5 to 2 years of age, which corresponds to 45–60 human years.',
    },
    {
      q: 'Do different hamster species age differently?',
      a: 'While lifespans vary slightly by breed, their rate of development is highly similar, reaching sexual maturity in just 4–6 weeks.',
    },
  ],
};

export default function HamsterAgeCalculator() {
  const [ageMonths, setAgeMonths] = useState<number>(12);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setAgeMonths(12);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(ageMonths) && ageMonths >= 0;

  if (isValid) {
    let humanAge = 0;

    if (ageMonths <= 1) {
      humanAge = ageMonths * 14;
    } else if (ageMonths <= 6) {
      // 1 to 6 months: 14 to 18 human years
      humanAge = 14 + ((ageMonths - 1) / 5) * 4;
    } else if (ageMonths <= 12) {
      // 6 to 12 months: 18 to 30 human years
      humanAge = 18 + ((ageMonths - 6) / 6) * 12;
    } else if (ageMonths <= 24) {
      // 12 to 24 months: 30 to 57 human years
      humanAge = 30 + ((ageMonths - 12) / 12) * 27;
    } else if (ageMonths <= 36) {
      // 24 to 36 months: 57 to 82 human years
      humanAge = 57 + ((ageMonths - 24) / 12) * 25;
    } else {
      // 36+ months: 82 + 2.3 human years per hamster month
      humanAge = 82 + (ageMonths - 36) * 2.33;
    }

    results = {
      humanYears: Math.round(humanAge),
      stage: ageMonths < 3 ? 'Juvenile' : ageMonths < 18 ? 'Adult' : 'Senior',
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (ageMonths < 0 || isNaN(ageMonths)) newErrors.age = 'Age cannot be negative';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Hamster Age Settings</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="hamster-months" className="block text-sm font-semibold text-foreground/80 mb-2">Age in Months</label>
              <input
                id="hamster-months"
                type="number"
                value={ageMonths}
                onChange={(e) => { setAgeMonths(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Age
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Human Age Equivalent</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Equivalent Human Age</span>
                  <span className="block text-4xl font-extrabold text-primary mt-2">
                    {results.humanYears} Years Old
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Life Stage: {results.stage}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter hamster months.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
