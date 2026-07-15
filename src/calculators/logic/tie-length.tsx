'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Tie Length Calculator suggests the recommended length of necktie you should buy or wear based on your height and chosen tie knot style.`,
  formula: `Recommended tie lengths are calculated using wearer heights and knot volumes:

**1. Base Tie Length ($L_{base}$, in inches):**
- Standard: 57 inches.
- Tall (height > 6'0"): 61-63 inches.
- Short (height < 5'5"): 53-55 inches.

**2. Knot Length Reductions:**
- Four-in-hand (minimal wrap): -0 inches.
- Half Windsor (medium wrap): +1 inch needed.
- Full Windsor (maximum wrap): +2 inches needed.`,
  example: `**Suggest tie length for a person 6'1" (73 inches) tall tying a Full Windsor knot:**
- Tall height base = 61 inches.
- Full Windsor adjustment = +2 inches.
- **Recommended Tie Length = 63 inches** (Extra-Long).`,
  faqs: [
    {
      q: 'Where should the tip of my tie hang?',
      a: 'The tip of your necktie should hang precisely in the middle of your belt buckle when standing straight. Anything higher looks too short, and lower looks too long.',
    },
    {
      q: 'What is the standard necktie length?',
      a: 'Standard neckties measure 57 or 58 inches. Extra-long (XL) ties measure 61 to 63 inches, designed for men over 6 feet tall or those with thicker necks.',
    },
    {
      q: 'Does my neck size affect tie length?',
      a: 'Yes, if you have a neck circumference larger than 17.5 inches, you will consume more tie length in the collar section. Add 1–2 inches to the recommended length.',
    },
  ],
};

export default function TieLengthCalculator() {
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(10);
  const [knot, setKnot] = useState<string>('half_windsor');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setFeet(5);
    setInches(10);
    setKnot('half_windsor');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(feet) && feet > 0 &&
                  !isNaN(inches) && inches >= 0 && inches < 12;

  if (isValid) {
    const totalHeightIn = feet * 12 + inches;
    let baseLength = 57;

    if (totalHeightIn > 72) {
      baseLength = 61; // Tall
    } else if (totalHeightIn < 65) {
      baseLength = 54; // Short
    }

    let knotAdj = 0;
    if (knot === 'half_windsor') knotAdj = 1;
    else if (knot === 'full_windsor') knotAdj = 3;

    const recommended = baseLength + knotAdj;

    results = {
      recommended,
      classification: recommended <= 55 ? 'Short / Kids' : recommended <= 58 ? 'Standard Size' : 'Extra-Long (XL)',
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (feet <= 0 || isNaN(feet)) newErrors.height = 'Height feet must be positive';
    if (inches < 0 || inches >= 12 || isNaN(inches)) newErrors.height = 'Inches must be between 0 and 11';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Height & Knot Setup</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2 font-medium">Your Height</label>
              <div className="flex items-center gap-3">
                <input
                  aria-label="Feet"
                  type="number"
                  value={feet}
                  onChange={(e) => { setFeet(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                <span className="text-foreground/50 font-bold">ft</span>
                <input
                  aria-label="Inches"
                  type="number"
                  value={inches}
                  onChange={(e) => { setInches(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                <span className="text-foreground/50 font-bold">in</span>
              </div>
              {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
            </div>

            <div>
              <label htmlFor="tie-knot-style" className="block text-sm font-semibold text-foreground/80 mb-2">Tie Knot Style</label>
              <select
                id="tie-knot-style"
                value={knot}
                onChange={(e) => { setKnot(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="four_in_hand">Four-in-Hand (Standard small knot)</option>
                <option value="half_windsor">Half Windsor (Medium symmetric knot)</option>
                <option value="full_windsor">Full Windsor (Large triangular knot)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Length
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
            <h2 className="text-xl font-bold text-foreground mb-6">Sizing Recommendation</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Recommended Tie Length</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.recommended} Inches
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Classification: {results.classification}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter height variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
