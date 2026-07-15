'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Dog Harness Size Calculator recommends the optimal harness size (XS, S, M, L, XL) for your dog using chest girth and body weight measurements.`,
  formula: `Sizing allocations map measurements to standard manufacture guidelines:

**Size Classifications:**
- **XS (Extra Small):** Girth $10-15$ in ($25-38$ cm), Weight $5-10$ lbs ($2-5$ kg).
- **S (Small):** Girth $15-22$ in ($38-56$ cm), Weight $10-25$ lbs ($5-11$ kg).
- **M (Medium):** Girth $22-30$ in ($56-76$ cm), Weight $25-50$ lbs ($11-23$ kg).
- **L (Large):** Girth $30-38$ in ($76-97$ cm), Weight $50-80$ lbs ($23-36$ kg).
- **XL (Extra Large):** Girth $38-48$ in ($97-122$ cm), Weight $80-120$ lbs ($36-54$ kg).`,
  example: `**A beagle with a chest girth of 24 inches and weight of 30 lbs:**
- Girth matches Medium (22-30 in).
- Weight matches Medium (25-50 lbs).
- **Recommended Size = Medium**.`,
  faqs: [
    {
      q: 'How do I measure my dog’s chest girth?',
      a: 'Wrap a soft measuring tape around the widest part of your dog’s rib cage, which is typically 2–3 inches behind their front legs.',
    },
    {
      q: 'What if my dog’s girth and weight point to two different sizes?',
      a: 'Always prioritize the chest girth measurement first. If girth falls on the border, choose the larger size for comfortable breathing.',
    },
    {
      q: 'How snug should a dog harness fit?',
      a: 'You should be able to comfortably fit two fingers flat underneath any strap of the adjusted harness. If you can’t, it is too tight.',
    },
  ],
};

export default function DogHarnessSizeCalculator() {
  const [girth, setGirth] = useState<number>(24);
  const [weight, setWeight] = useState<number>(30);
  const [unit, setUnit] = useState<string>('imperial');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setGirth(24);
    setWeight(30);
    setUnit('imperial');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(girth) && girth > 0 &&
                  !isNaN(weight) && weight > 0;

  if (isValid) {
    // Standardize to imperial for check logic
    const gIn = unit === 'imperial' ? girth : girth / 2.54;
    const wLbs = unit === 'imperial' ? weight : weight * 2.20462;

    let size = 'Medium';
    let minGirth = 22;
    let maxGirth = 30;

    if (gIn <= 15) {
      size = 'Extra Small (XS)';
      minGirth = 10;
      maxGirth = 15;
    } else if (gIn <= 22) {
      size = 'Small (S)';
      minGirth = 15;
      maxGirth = 22;
    } else if (gIn <= 30) {
      size = 'Medium (M)';
      minGirth = 22;
      maxGirth = 30;
    } else if (gIn <= 38) {
      size = 'Large (L)';
      minGirth = 30;
      maxGirth = 38;
    } else {
      size = 'Extra Large (XL)';
      minGirth = 38;
      maxGirth = 48;
    }

    results = {
      size,
      girthRange: unit === 'imperial' ? `${minGirth} - ${maxGirth} inches` : `${Math.round(minGirth * 2.54)} - ${Math.round(maxGirth * 2.54)} cm`,
      weightLbs: wLbs,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (girth <= 0 || isNaN(girth)) newErrors.girth = 'Chest girth must be greater than zero';
    if (weight <= 0 || isNaN(weight)) newErrors.weight = 'Weight must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Dog Measurements</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="dog-unit-type" className="block text-sm font-semibold text-foreground/80 mb-2">Unit System</label>
              <select
                id="dog-unit-type"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  if (e.target.value === 'metric') {
                    setGirth(Math.round(girth * 2.54));
                    setWeight(Math.round(weight / 2.20462));
                  } else {
                    setGirth(Math.round(girth / 2.54));
                    setWeight(Math.round(weight * 2.20462));
                  }
                  setErrors({});
                }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="imperial">Imperial (inches / lbs)</option>
                <option value="metric">Metric (cm / kg)</option>
              </select>
            </div>

            <div>
              <label htmlFor="dog-girth" className="block text-sm font-semibold text-foreground/80 mb-2">
                Chest Girth ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                id="dog-girth"
                type="number"
                value={girth}
                onChange={(e) => { setGirth(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.girth && <p className="text-xs text-red-500 mt-1 font-medium">{errors.girth}</p>}
            </div>

            <div>
              <label htmlFor="dog-weight-val" className="block text-sm font-semibold text-foreground/80 mb-2">
                Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <input
                id="dog-weight-val"
                type="number"
                value={weight}
                onChange={(e) => { setWeight(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Size
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
            <h2 className="text-xl font-bold text-foreground mb-6">Size Recommendation</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Recommended Harness Size</span>
                  <span className="block text-2xl font-extrabold text-primary mt-2">
                    {results.size}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Girth coverage: {results.girthRange}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter dog specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
