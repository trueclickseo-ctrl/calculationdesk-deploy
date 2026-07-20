'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Fraction Calculator performs arithmetic operations (addition, subtraction, multiplication, division) on common fractions, returning both the simplified proper fraction, the mixed number format, and its equivalent decimal representation.`,
  formula: `Basic fractional operations are calculated using these standard rules:

**1. Addition:**
$$\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\times d + b \\times c}{b \\times d}$$

**2. Subtraction:**
$$\\frac{a}{b} - \\frac{c}{d} = \\frac{a \\times d - b \\times c}{b \\times d}$$

**3. Multiplication:**
$$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$$

**4. Division:**
$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\times d}{b \\times c}$$

To **simplify**, the calculator finds the Greatest Common Divisor (GCD) of the resulting numerator and denominator and divides both by it.`,
  example: `Suppose you want to add 1/2 and 2/3:

1. Operation: 1/2 + 2/3.
2. Cross-multiply: (1 × 3 + 2 × 2) / (2 × 3).
3. Result = (3 + 4) / 6 = **7/6**.
4. Mixed Fraction format: 7/6 = **1 1/6**.
5. Decimal equivalent: 7 / 6 ≈ **1.1667**.`,
  faqs: [
    {
      q: 'How do you convert an improper fraction to a mixed number?',
      a: 'Divide the numerator by the denominator. The quotient becomes the whole number, the remainder becomes the new numerator, and the denominator remains the same. For example, 7 divided by 6 is 1 with a remainder of 1, yielding 1 1/6.',
    },
    {
      q: 'What is a simplified or reduced fraction?',
      a: 'A fraction is simplified (reduced to lowest terms) when the numerator and the denominator have no common positive factors other than 1.',
    },
    {
      q: 'Can denominators be negative or zero?',
      a: 'Denominators cannot be zero, as division by zero is undefined. Negative denominators are standardly rewritten by shifting the negative sign to the numerator (e.g., 1 / -2 is simplified as -1 / 2).',
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

export default function FractionCalculator() {
  const [num1, setNum1] = useState<number>(1);
  const [den1, setDen1] = useState<number>(2);
  const [num2, setNum2] = useState<number>(2);
  const [den2, setDen2] = useState<number>(3);
  const [op, setOp] = useState<string>('+');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = den1 !== 0 && den2 !== 0 && !isNaN(num1) && !isNaN(num2);

  let results = null;
  if (isValid) {
    let finalNum = 0;
    let finalDen = 1;

    switch (op) {
      case '+':
        finalNum = num1 * den2 + num2 * den1;
        finalDen = den1 * den2;
        break;
      case '-':
        finalNum = num1 * den2 - num2 * den1;
        finalDen = den1 * den2;
        break;
      case '*':
        finalNum = num1 * num2;
        finalDen = den1 * den2;
        break;
      case '/':
        finalNum = num1 * den2;
        finalDen = den1 * num2;
        break;
      default:
        break;
    }

    if (finalDen === 0) {
      // division by zero on denominator evaluation
    } else {
      // Simplify signs
      if (finalDen < 0) {
        finalNum = -finalNum;
        finalDen = -finalDen;
      }

      const divisor = gcd(finalNum, finalDen);
      const reducedNum = finalNum / divisor;
      const reducedDen = finalDen / divisor;

      // Mixed fraction format
      let whole = 0;
      let mixedNum = 0;
      if (Math.abs(reducedNum) >= reducedDen) {
        whole = Math.trunc(reducedNum / reducedDen);
        mixedNum = Math.abs(reducedNum) % reducedDen;
      }

      results = {
        rawNum: finalNum,
        rawDen: finalDen,
        reducedNum,
        reducedDen,
        whole,
        mixedNum,
        decimal: reducedNum / reducedDen,
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (den1 === 0) newErrors.den1 = 'Denominator cannot be zero';
    if (den2 === 0) newErrors.den2 = 'Denominator cannot be zero';
    if (op === '/' && num2 === 0) newErrors.num2 = 'Cannot divide by a fraction with a zero numerator';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setNum1(1);
    setDen1(2);
    setNum2(2);
    setDen2(3);
    setOp('+');
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Fraction Algebra</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Fraction 1</span>
              <div className="w-20 rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                <input
                  type="number"
                  value={num1 || ''}
                  onChange={(e) => setNum1(Number(e.target.value))}
                  className="block w-full py-2 px-2 text-center text-sm font-semibold outline-none bg-transparent"
                  placeholder="Num"
                />
              </div>
              <div className="w-16 h-[2px] bg-foreground/30" />
              <div className="w-20 rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                <input
                  type="number"
                  value={den1 || ''}
                  onChange={(e) => setDen1(Number(e.target.value))}
                  className="block w-full py-2 px-2 text-center text-sm font-semibold outline-none bg-transparent"
                  placeholder="Den"
                />
              </div>
              {errors.den1 && <p className="text-[10px] text-red-500 font-semibold">{errors.den1}</p>}
            </div>

            {/* Operator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Op</span>
              <select
                value={op}
                onChange={(e) => setOp(e.target.value)}
                className="block w-16 py-4 border border-border bg-background rounded-xl text-center text-base font-extrabold focus:border-primary outline-none"
              >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
              </select>
            </div>

            {/* Fraction 2 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Fraction 2</span>
              <div className="w-20 rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                <input
                  type="number"
                  value={num2 || ''}
                  onChange={(e) => setNum2(Number(e.target.value))}
                  className="block w-full py-2 px-2 text-center text-sm font-semibold outline-none bg-transparent"
                  placeholder="Num"
                />
              </div>
              <div className="w-16 h-[2px] bg-foreground/30" />
              <div className="w-20 rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                <input
                  type="number"
                  value={den2 || ''}
                  onChange={(e) => setDen2(Number(e.target.value))}
                  className="block w-full py-2 px-2 text-center text-sm font-semibold outline-none bg-transparent"
                  placeholder="Den"
                />
              </div>
              {errors.den2 && <p className="text-[10px] text-red-500 font-semibold">{errors.den2}</p>}
            </div>
          </div>

          {errors.num2 && <p className="text-xs text-red-500 text-center font-semibold mb-4">{errors.num2}</p>}

          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Solve Fractions
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

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Equation Result</h2>
            {results && results.rawDen !== 0 ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Reduced Fraction
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.reducedNum === 0 ? '0' : results.reducedDen === 1 ? results.reducedNum : `${results.reducedNum} / ${results.reducedDen}`}
                    </span>
                  </div>
                  {results.whole !== 0 && results.mixedNum !== 0 && (
                    <div className="text-right">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                        Mixed Fraction
                      </span>
                      <span className="block text-xl font-bold text-foreground mt-1">
                        {results.whole} &nbsp;{results.mixedNum}/{results.reducedDen}
                      </span>
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Decimal Representation
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Raw Formula Equation
                  </span>
                  <span className="block text-xs font-semibold text-foreground/70 mt-1.5 font-mono">
                    ({num1}/{den1}) {op} ({num2}/{den2}) = {results.rawNum}/{results.rawDen}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter valid fractions to compute.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
