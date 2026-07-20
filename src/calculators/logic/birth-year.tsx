'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Birth Year Calculator calculates the calendar year you were born based on your current age and whether your birthday has passed this year.`,
  formula: `Birth year calculations utilize simple calendar offsets:

- If birthday has **passed** this year:
  $$\\text{Birth Year} = \\text{Current Year} - \\text{Age}$$
- If birthday has **not passed** this year:
  $$\\text{Birth Year} = \\text{Current Year} - \\text{Age} - 1$$`,
  example: `**Calculate birth year for a 25-year-old in 2026 whose birthday has not yet passed:**
- Birth Year = 2026 - 25 - 1 = **2000**.`,
  faqs: [
    {
      q: 'Why does my birthday status matter?',
      a: 'If your birthday has not yet occurred in the current calendar year, you have not yet celebrated your birthday, meaning you were born one year earlier than a simple subtraction would suggest.',
    },
    {
      q: 'Which generation do I belong to?',
      a: 'Generation classifications: Baby Boomers (1946–1964), Gen X (1965–1980), Millennials/Gen Y (1981–1996), Gen Z (1997–2012), and Gen Alpha (2013–2025).',
    },
  ],
};

export default function BirthYearCalculator() {
  const [age, setAge] = useState<number>(25);
  const [passed, setPassed] = useState<string>('yes');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    birthYear: number;
    generation: string;
    chineseZodiac: string;
  } | null>(null);

  const CHINESE_ZODIAC = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];

  const getChineseZodiac = (year: number): string => {
    // 1900 was a Year of the Rat
    const index = (year - 1900) % 12;
    return CHINESE_ZODIAC[index >= 0 ? index : index + 12];
  };

  const getGeneration = (year: number): string => {
    if (year >= 2013) return 'Generation Alpha';
    if (year >= 1997) return 'Generation Z (Gen Z)';
    if (year >= 1981) return 'Millennials (Gen Y)';
    if (year >= 1965) return 'Generation X (Gen X)';
    if (year >= 1946) return 'Baby Boomers';
    if (year >= 1928) return 'Silent Generation';
    return 'Greatest Generation';
  };

  const handleReset = () => {
    setAge(25);
    setPassed('yes');
    setErrors({});
    setResult(null);
  };

  const handleCalculate = () => {
    if (age < 0 || isNaN(age)) {
      setErrors({ age: 'Age cannot be negative' });
      return;
    }
    setErrors({});

    const currentYear = new Date().getFullYear();
    const birthYear = passed === 'yes' ? currentYear - age : currentYear - age - 1;

    setResult({
      birthYear,
      generation: getGeneration(birthYear),
      chineseZodiac: getChineseZodiac(birthYear),
    });
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
          <h2 className="text-xl font-bold text-foreground mb-6">Age Settings</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="user-age-input" className="block text-sm font-semibold text-foreground/80 mb-2">Your Current Age</label>
              <input
                id="user-age-input"
                type="number"
                value={age}
                onChange={(e) => { setAge(Number(e.target.value)); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="birthday-status" className="block text-sm font-semibold text-foreground/80 mb-2">Has your birthday passed this year?</label>
              <select
                id="birthday-status"
                value={passed}
                onChange={(e) => { setPassed(e.target.value); setResult(null); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="yes">Yes, it has already passed</option>
                <option value="no">No, it has not passed yet</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Birth Year
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
            <h2 className="text-xl font-bold text-foreground mb-6">Birth Year Summary</h2>

            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Birth Year</span>
                  <span className="block text-4xl font-extrabold text-primary mt-2">
                    {result.birthYear}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider font-mono">Generation</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.generation}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider font-mono">Chinese Zodiac</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.chineseZodiac}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter your age variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
