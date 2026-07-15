'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The HCF & GCD Calculator finds the Highest Common Factor (HCF) and Greatest Common Divisor (GCD) for a group of positive integers. It resolves common divisions using Euclidean algorithms, displaying divisors and factorization summaries.`,
  formula: `HCF/GCD calculations are computed iteratively using the Euclidean algorithm:

**1. HCF of two numbers A and B:**
$$HCF(A, B) = Euclidean(A, B)$$
(e.g., repeatedly applying $A \\pmod B$ until remainder is zero).

**2. HCF of multiple numbers (A, B, C, ...):**
$$HCF(A, B, C) = HCF(HCF(A, B), C)$$`,
  example: `Suppose you enter the numbers: **12, 18, 30**.

1. List all positive factors for each number:
   - Factors of 12: 1, 2, 3, 4, **6**, 12.
   - Factors of 18: 1, 2, 3, **6**, 9, 18.
   - Factors of 30: 1, 2, 3, 5, **6**, 10, 15, 30.
2. Common factors are: 1, 2, 3, 6.
3. The largest common factor is **6**.
4. HCF / GCD = **6**.`,
  faqs: [
    {
      q: 'What is the difference between HCF and GCD?',
      a: 'There is no mathematical difference. Highest Common Factor (HCF) and Greatest Common Divisor (GCD) are synonymous terms referring to the largest integer that divides all numbers in a group without a remainder.',
    },
    {
      q: 'What is the Euclidean algorithm?',
      a: 'The Euclidean algorithm is an efficient method for computing the greatest common divisor of two integers. It works by repeatedly replacing the larger number with its remainder when divided by the smaller number until the remainder is zero.',
    },
    {
      q: 'What are coprime numbers?',
      a: 'Two numbers are coprime (or relatively prime) if their HCF/GCD is exactly 1, meaning they share no positive factors other than 1.',
    },
  ],
};

function gcd(a: number, b: number): number {
  let tempA = Math.abs(a);
  let tempB = Math.abs(b);
  while (tempB) {
    const t = tempB;
    tempB = tempA % tempB;
    tempA = t;
  }
  return tempA;
}

export default function HcfCalculator() {
  const [inputText, setInputText] = useState<string>(`12, 18, 30`);
  const [errors, setErrors] = useState<string>('');

  const parseNumbers = (text: string): number[] => {
    const tokens = text.split(/[,\s;\n]+/);
    const nums: number[] = [];
    tokens.forEach(t => {
      const clean = t.trim();
      if (clean !== '') {
        const n = Math.floor(Number(clean));
        if (!isNaN(n) && n > 0 && n <= 1000000) {
          nums.push(n);
        }
      }
    });
    return nums;
  };

  const nums = parseNumbers(inputText);
  const isValid = nums.length > 1;

  let results = null;
  if (isValid) {
    let currentGcd = nums[0];
    for (let i = 1; i < nums.length; i++) {
      currentGcd = gcd(currentGcd, nums[i]);
    }

    results = {
      gcd: currentGcd,
      count: nums.length,
    };
  }

  const handleCalculate = () => {
    if (nums.length <= 1) {
      setErrors('Please enter at least 2 positive integers between 1 and 1,000,000');
    } else {
      setErrors('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInputText('12, 18, 30');
    setErrors('');
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Integer Series</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-text" className="block text-sm font-semibold text-foreground/80 mb-2">
                Enter integers (comma or space separated)
              </label>
              <textarea
                id="input-text"
                rows={6}
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setErrors(''); }}
                placeholder="e.g. 12, 18, 30"
                className="block w-full rounded-xl border border-border bg-background py-3 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-ring-custom transition-all"
              />
              <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">Separate values by commas or spaces. Ctrl + Enter to calculate.</span>
            </div>

            {errors && <p className="text-xs text-red-500 font-semibold">{errors}</p>}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Find HCF & GCD
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">HCF & GCD Output</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Highest Common Factor (HCF / GCD)</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.gcd.toLocaleString()}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider font-mono">
                    Evaluation Details
                  </span>
                  <span className="block text-xs font-semibold text-foreground/75 mt-1">
                    Processed {results.count} integers.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter integers to view HCF/GCD.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
