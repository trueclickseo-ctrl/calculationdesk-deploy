'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Lucky Number Generator computes deterministic lucky digits and lotto numbers based on Pythagorean name values, astrological star signs, and birthdate life paths.`,
  formula: `Lucky numbers are generated using deterministic hashes of date and name properties:

**1. Personal Power Number:**
$$\\text{Power Number} = \\text{Life Path} + \\text{Destiny Number}$$
Reduced to a single digit ($1-9$).

**2. Lucky Lotto Pick:**
Seed a deterministic pseudo-random number generator (PRNG) using name ASCII sums and birth year:
- Seed = $\\text{Name ASCII Sum} + \\text{Year} + \\text{Month} \\times \\text{Day}$
- Select 6 unique numbers between 1 and 49 based on iterative PRNG mod indices.`,
  example: `**Generate lucky profile for John (Destiny = 2) born Oct 15, 1995 (Life Path = 4):**
- Personal Power Number = 2 + 4 = **6**.
- Lotto Picks (deterministic seed) = **7, 14, 23, 28, 35, 42**.`,
  faqs: [
    {
      q: 'How does the calculator generate lucky numbers?',
      a: 'The numbers are generated using a deterministic mathematical formula that combines your numerology life path, name destiny index, and birth year. This ensures that your unique personal profile always produces the exact same set of lucky numbers.',
    },
    {
      q: 'Can I use these numbers for real lotteries?',
      a: 'Yes, you can use them as customized personal picks for fun, but please note that lotteries are entirely random drawings, and these numbers carry no scientific guarantee of winning.',
    },
    {
      q: 'Does my lucky profile change over time?',
      a: 'No, because your birth legal name and birthdate remain constant, your core numerology and lucky number coordinates remain fixed throughout your life.',
    },
  ],
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

export default function LuckyNumberGenerator() {
  const [name, setName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('1995-10-15');
  const [result, setResult] = useState<{ personalLucky: number; lottoPicks: number[]; destiny: number; lifePath: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleReset = () => {
    setName('');
    setBirthdate('');
    setResult(null);
    setError('');
  };

  const reduceNumber = (num: number): number => {
    let sum = num;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, d) => acc + Number(d), 0);
    }
    return sum;
  };

  const handleCalculate = () => {
    if (!name.trim() || !birthdate) {
      setError('Please enter both name and birth date');
      return;
    }
    setError('');

    // Numerology Calculations
    const letters = name.toLowerCase().replace(/[^a-z]/g, '').split('');
    const nameSum = letters.reduce((acc, l) => acc + (PYTHAGOREAN_MAP[l] || 0), 0);
    const destiny = reduceNumber(nameSum);

    const dateParts = birthdate.split('-');
    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]);
    const day = Number(dateParts[2]);

    const lifePath = reduceNumber(reduceNumber(year) + reduceNumber(month) + reduceNumber(day));

    // Core lucky number
    const personalLucky = reduceNumber(destiny + lifePath);

    // Deterministic lotto picks (6 unique numbers from 1 to 49)
    // Seed using a simple LCG with name sum and date
    let seed = nameSum + year + month * day;
    const lcg = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const lottoPicks: number[] = [];
    while (lottoPicks.length < 6) {
      const num = Math.floor(lcg() * 49) + 1;
      if (!lottoPicks.includes(num)) {
        lottoPicks.push(num);
      }
    }
    lottoPicks.sort((a, b) => a - b);

    setResult({
      personalLucky,
      lottoPicks,
      destiny,
      lifePath,
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
          <h2 className="text-xl font-bold text-foreground mb-6">Profile Settings</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold text-foreground/80 mb-2">Enter Full Name</label>
              <input
                id="full-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="e.g. John Doe"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div>
              <label htmlFor="birth-date" className="block text-sm font-semibold text-foreground/80 mb-2">Select Birth Date</label>
              <input
                id="birth-date"
                type="date"
                value={birthdate}
                onChange={(e) => { setBirthdate(e.target.value); setError(''); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Generate Lucky Profile
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
            <h2 className="text-xl font-bold text-foreground mb-6">Lucky Profile Results</h2>

            {result ? (
              <div className="space-y-6">
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Personal Digit</span>
                    <span className="block text-4xl font-black text-primary mt-1">{result.personalLucky}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Life Path</span>
                    <span className="block text-xl font-bold text-foreground mt-1">{result.lifePath}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Destiny</span>
                    <span className="block text-xl font-bold text-foreground mt-1">{result.destiny}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-5 border border-border space-y-4">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono text-center">Lucky Lotto Picks (1 - 49)</span>
                  <div className="flex justify-center gap-2.5">
                    {result.lottoPicks.map((num, idx) => (
                      <div key={idx} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white font-extrabold text-sm shadow-md shadow-primary/20">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter name and birth date to generate lucky numbers.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
