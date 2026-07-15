'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Decimal to Fraction Converter changes terminating or repeating decimal values into their simplified proper or mixed fraction equivalents.`,
  formula: `Decimals are converted to fractions based on their type:

**1. Terminating Decimals (e.g., 0.125):**
- Count the number of digits after the decimal point ($k$).
- Numerator = $\\text{Decimal Value} \\times 10^k$.
- Denominator = $10^k$.
- Simplify by dividing both by their Greatest Common Divisor (GCD).

**2. Repeating Decimals (e.g., 0.333...):**
- Let the repeating digit block be $R$ with length $k$.
- The fractional equivalent is:
  $$\\text{Fraction} = \\frac{R}{10^k - 1}$$
  (e.g., $0.333... = 3 / (10^1 - 1) = 3 / 9 = 1 / 3$).`,
  example: `**1. Convert 0.375 to a fraction:**
- 3 digits after decimal point $\\rightarrow$ Denominator = $10^3 = 1000$.
- Fraction = 375 / 1000.
- GCD of 375 and 1000 is 125.
- Reduced Fraction = (375/125) / (1000/125) = **3 / 8**.

**2. Convert repeating 0.1818... to a fraction:**
- Repeating block (R) = 18. Length (k) = 2.
- Fraction = 18 / (10^2 - 1) = 18 / 99.
- GCD of 18 and 99 is 9.
- Reduced Fraction = (18/9) / (99/9) = **2 / 11** = 0.1818...`,
  faqs: [
    {
      q: 'What is a repeating decimal?',
      a: 'A repeating decimal (or recurring decimal) is a decimal representation of a number whose digits are periodic (repeating values at regular intervals) after the decimal point (e.g. 1/3 = 0.333... or 1/7 = 0.142857...).',
    },
    {
      q: 'How do you reduce a fraction to its lowest terms?',
      a: 'To reduce a fraction, find the Greatest Common Divisor (GCD) of the numerator and the denominator, and divide both numbers by it.',
    },
    {
      q: 'Can all decimals be converted to fractions?',
      a: 'Only rational numbers (terminating or repeating decimals) can be written as fractions. Irrational numbers (like Pi = 3.14159... or √2 = 1.4142...) have non-terminating, non-repeating decimals and cannot be expressed as fractions.',
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

type DecMode = 'terminating' | 'repeating';

export default function DecimalFraction() {
  const [mode, setMode] = useState<DecMode>('terminating');
  const [value, setValue] = useState<string>('0.375');
  const [repeatValue, setRepeatValue] = useState<string>('3'); // repeating digits after '0.'
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setValue('0.375');
    setRepeatValue('3');
    setErrors({});
  };

  // Computations
  let results = null;

  if (mode === 'terminating') {
    const numVal = Number(value);
    if (!isNaN(numVal) && value.includes('.')) {
      const parts = value.split('.');
      const decimalsCount = parts[1].length;
      const den = Math.pow(10, decimalsCount);
      const num = Math.round(numVal * den);

      const common = gcd(num, den);
      const reducedNum = num / common;
      const reducedDen = den / common;

      // Mixed fraction format
      let whole = 0;
      let mixedNum = 0;
      if (Math.abs(reducedNum) >= reducedDen) {
        whole = Math.trunc(reducedNum / reducedDen);
        mixedNum = Math.abs(reducedNum) % reducedDen;
      }

      results = {
        num: reducedNum,
        den: reducedDen,
        whole,
        mixedNum,
        text: `${reducedNum} / ${reducedDen}`,
      };
    } else if (!isNaN(numVal)) {
      results = {
        num: numVal,
        den: 1,
        whole: numVal,
        mixedNum: 0,
        text: `${numVal} / 1`,
      };
    }
  } else {
    // Repeating
    const cleanDigits = repeatValue.replace(/\D/g, '');
    if (cleanDigits.length > 0) {
      const num = Number(cleanDigits);
      const den = Math.pow(10, cleanDigits.length) - 1;

      const common = gcd(num, den);
      const reducedNum = num / common;
      const reducedDen = den / common;

      results = {
        num: reducedNum,
        den: reducedDen,
        whole: 0,
        mixedNum: 0,
        text: `${reducedNum} / ${reducedDen}`,
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (mode === 'terminating') {
      if (isNaN(Number(value))) newErrors.value = 'Please enter a valid decimal number';
    } else {
      if (repeatValue.replace(/\D/g, '').length === 0) newErrors.repeatValue = 'Please enter repeating digits';
    }
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Decimal Value</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('terminating'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'terminating'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Terminating Decimal
            </button>
            <button
              type="button"
              onClick={() => { setMode('repeating'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'repeating'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Repeating Decimal
            </button>
          </div>

          <div className="space-y-5">
            {mode === 'terminating' ? (
              <div>
                <label htmlFor="decimal-val" className="block text-sm font-semibold text-foreground/80 mb-2">Decimal Number</label>
                <input
                  id="decimal-val"
                  type="text"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  placeholder="e.g. 0.375"
                />
                {errors.value && <p className="text-xs text-red-500 mt-1 font-medium">{errors.value}</p>}
              </div>
            ) : (
              <div>
                <label htmlFor="repeat-digits" className="block text-sm font-semibold text-foreground/80 mb-2">Repeating Digits (after 0.)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground/50">0.</span>
                  <input
                    id="repeat-digits"
                    type="text"
                    value={repeatValue}
                    onChange={(e) => { setRepeatValue(e.target.value); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                    placeholder="e.g. 18 (for 0.181818...)"
                  />
                </div>
                {errors.repeatValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.repeatValue}</p>}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Convert Value
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Fraction Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Reduced Fraction</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.text}
                    </span>
                  </div>
                  {results.whole !== 0 && results.mixedNum !== 0 && (
                    <div className="text-right">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Mixed Number</span>
                      <span className="block text-xl font-bold text-foreground mt-1">
                        {results.whole} &nbsp;{results.mixedNum}/{results.den}
                      </span>
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Verification (Decimal Equivalent)</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {(results.num / results.den).toLocaleString(undefined, { maximumFractionDigits: 9 })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter a decimal value.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
