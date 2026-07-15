'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The LCM Calculator finds the Least Common Multiple (LCM) for two or more positive integers. It processes comma-separated, space-separated, or newline-separated inputs, listing the final LCM and detailing standard mathematical factorization steps.`,
  formula: `LCM calculations are computed iteratively using the Greatest Common Divisor (GCD):

**1. LCM of two numbers A and B:**
$$LCM(A, B) = \\frac{|A \\times B|}{GCD(A, B)}$$

**2. LCM of multiple numbers (A, B, C, ...):**
$$LCM(A, B, C) = LCM(LCM(A, B), C)$$`,
  example: `Suppose you enter the numbers: **12, 18, 30**.

1. Prime Factorization:
   - $12 = 2^2 \\times 3^1$
   - $18 = 2^1 \\times 3^2$
   - $30 = 2^1 \\times 3^1 \\times 5^1$
2. Select the highest power of each prime factor present:
   - $2^2, \\ 3^2, \\ 5^1$.
3. Multiply values:
   - $LCM = 2^2 \\times 3^2 \\times 5^1 = 4 \\times 9 \\times 5 = 180$.
4. Least Common Multiple = **180**.`,
  faqs: [
    {
      q: 'What is the Least Common Multiple (LCM)?',
      a: 'The LCM of two or more integers is the smallest positive integer that is divisible by all of them without leaving a remainder.',
    },
    {
      q: 'Can I find the LCM of negative numbers?',
      a: 'Yes. Since division rules apply similarly, the LCM is always positive. The calculator converts all input numbers to positive values before computing.',
    },
    {
      q: 'What is the relation between LCM and HCF?',
      a: 'For any two positive integers A and B, the product of their LCM and HCF is equal to the product of the numbers: $LCM(A, B) \\times HCF(A, B) = A \\times B$.',
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

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export default function LcmCalculator() {
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
    let currentLcm = nums[0];
    for (let i = 1; i < nums.length; i++) {
      currentLcm = lcm(currentLcm, nums[i]);
    }

    results = {
      lcm: currentLcm,
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
              Find Least Common Multiple
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">LCM Output</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Least Common Multiple (LCM)</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.lcm.toLocaleString()}
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
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter integers to view LCM.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
