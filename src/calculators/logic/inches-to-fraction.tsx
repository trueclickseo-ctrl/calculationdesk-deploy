'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Inches to Fraction Converter is a specialized tool designed to translate decimal inches into their nearest fractional measurements. Carpenters, woodworkers, engineers, machinists, and DIY enthusiasts use this utility to match precise mathematical calculations with real-world measuring tapes, rulers, and standard hardware sizes. Instead of trying to estimate fractional values manually, this tool gives you instant, accurate fractions at custom levels of precision.',
  formula: `To convert decimal inches to a fraction, separate the whole number from the decimal portion and follow these steps:

1. Determine your desired precision denominator ($D$), such as 8, 16, 32, or 64.
2. Multiply the decimal fraction by the denominator ($D$):
   $$\\text{Numerator} = \\text{round}(\\text{Decimal} \\times D)$$
3. Simplify the resulting fraction by finding the Greatest Common Divisor (GCD) between the Numerator and the Denominator:
   $$\\text{Fraction} = \\frac{\\text{Numerator} / \\text{GCD}}{D / \\text{GCD}}$$

This method rounds to the nearest increments defined by the selected precision, matching the standard graduations on a tape measure. Understanding how to convert decimal inches to fraction is essential for hands-on construction.`,
  example: `Let's go through a step-by-step example. Suppose we want to convert 5.683 inches to a fraction, using a precision of 1/16 of an inch.

1. Separate the whole part and the decimal part:
   - Whole part = 5
   - Decimal part = 0.683
2. Multiply the decimal part by the precision denominator (16):
   $$0.683 \\times 16 = 10.928$$
3. Round this to the nearest whole integer to find the numerator:
   $$\\text{Numerator} = \\text{round}(10.928) = 11$$
4. Combine the whole part and the fraction:
   $$\\text{Result} = 5 \\frac{11}{16}$$

Thus, 5.683 inches is approximately 5 11/16 inches when rounded to the nearest 1/16th.`,
  faqs: [
    {
      q: 'How do you read a tape measure?',
      a: 'A standard tape measure has markings representing fractions of an inch. The longest lines represent whole inches, followed by half-inches, quarter-inches, eighths, and sixteenths. The smaller the division, the shorter the line on the scale.',
    },
    {
      q: 'Why do we need an inches to fraction converter?',
      a: 'Most scientific calculations, CAD designs, and digital readouts produce decimal results. However, hand tools and manufacturing materials in North America typically use fractional inches (like 3/4 or 5/8). This tool bridges that gap quickly.',
    },
    {
      q: 'What is the GCD in fraction simplification?',
      a: 'The Greatest Common Divisor (GCD) is the largest integer that divides both the numerator and the denominator without leaving a remainder. Dividing both numbers by the GCD simplifies the fraction to its lowest terms.',
    },
    {
      q: 'What is 0.75 in a fraction?',
      a: 'The decimal value 0.75 converts directly to 3/4 of an inch. In sixteenths, it would be 12/16, which simplifies to 3/4 when divided by the GCD of 4.',
    },
    {
      q: 'How do you choose the right precision?',
      a: 'Select the precision based on the tool you are using. Rough carpentry typically requires 1/8 or 1/16-inch precision, whereas precision machining and cabinetry often require 1/32 or 1/64-inch measurements.',
    },
  ],
};

export default function InchesFractionCalculator() {
  const [val, setVal] = useState<number>(0.625);
  const [prec, setPrec] = useState<number>(16);
  const [result, setResult] = useState<string>('5/8');

  const handleReset = () => { setVal(0.625); setPrec(16); setResult('5/8'); };
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  const handleCalculate = () => {
    const whole = Math.floor(val);
    const dec = val - whole;
    const numerator = Math.round(dec * prec);
    if (numerator === 0) {
      setResult(whole.toString());
      return;
    }
    if (numerator === prec) {
      setResult((whole + 1).toString());
      return;
    }
    const divisor = gcd(numerator, prec);
    const n = numerator / divisor;
    const d = prec / divisor;
    setResult(whole > 0 ? `${whole} ${n}/${d}` : `${n}/${d}`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Inches</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Decimal Inches</label>
              <input type="number" step="0.001" value={val} onChange={e => setVal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2 font-medium">Precision</label>
              <select value={prec} onChange={e => setPrec(Number(e.target.value))} className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer">
                <option value="8">Nearest 1/8 inch</option>
                <option value="16">Nearest 1/16 inch</option>
                <option value="32">Nearest 1/32 inch</option>
                <option value="64">Nearest 1/64 inch</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Fractional Value</h2>
          <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
            <span className="block text-[10px] font-bold text-foreground/50 uppercase font-mono">Resulting Measurement</span>
            <span className="block text-4xl font-extrabold text-primary mt-2">{result} inches</span>
          </div>
        </div>
      </div>
    </div>
  );
}