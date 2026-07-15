'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Grass Seed Calculator estimates total pounds of grass seed needed for planting new lawns or overseeding existing lawns based on grass species.`,
  formula: `Seed requirements factor in plot coverage areas and planting goals:

**Total Seed Weight (lbs):**
$$\\text{Weight} = \\text{Lawn Area (sq ft)} \\times \\frac{\\text{Seeding Rate (lbs per 1,000 sq ft)}}{1,000}$$`,
  example: `**Estimate seed for a 5,000 sq ft new lawn using Tall Fescue (rate 8 lbs per 1,000 sq ft):**
- Weight = 5,000 × (8 / 1000) = **40 lbs of seed**.`,
  faqs: [
    {
      q: 'How does seed size affect the planting rate?',
      a: 'Kentucky Bluegrass has extremely small seeds (over 2 million per pound), so it requires lower weight (2–3 lbs per 1,000 sq ft). Tall Fescue has much larger seeds, requiring higher weight (6–9 lbs per 1,000 sq ft) for the same area.',
    },
    {
      q: 'What is the difference between new seeding and overseeding?',
      a: 'New seeding is planting grass on bare soil. Overseeding is spreading seed over an existing, thin lawn. Overseeding requires exactly 50% of the seed rate compared to a new lawn.',
    },
    {
      q: 'When is the best time to plant grass seed?',
      a: 'For cool-season grasses (fescue, bluegrass, ryegrass), fall is the ideal time. For warm-season grasses (bermuda, zoysia), late spring to early summer is best.',
    },
  ],
};

const SEED_RATES: Record<string, { name: string; newLawn: number }> = {
  bluegrass: { name: 'Kentucky Bluegrass', newLawn: 2.5 },
  tall_fescue: { name: 'Tall Fescue', newLawn: 8.0 },
  fine_fescue: { name: 'Fine Fescue', newLawn: 5.0 },
  perennial_ryegrass: { name: 'Perennial Ryegrass', newLawn: 7.0 },
  bermudagrass: { name: 'Bermuda Grass', newLawn: 2.0 },
};

export default function GrassSeedCalculator() {
  const [area, setArea] = useState<number>(5000);
  const [seedType, setSeedType] = useState<string>('tall_fescue');
  const [method, setMethod] = useState<string>('new');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setArea(5000);
    setSeedType('tall_fescue');
    setMethod('new');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(area) && area > 0;

  if (isValid) {
    const seedRateObj = SEED_RATES[seedType] || { name: 'Custom', newLawn: 5.0 };
    const ratePer1000 = method === 'new' ? seedRateObj.newLawn : seedRateObj.newLawn * 0.5;
    const totalLbs = (area * ratePer1000) / 1000;

    results = {
      seedName: seedRateObj.name,
      ratePer1000,
      totalLbs,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (area <= 0 || isNaN(area)) newErrors.area = 'Area must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Lawn Configuration</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="lawn-size-sqft" className="block text-sm font-semibold text-foreground/80 mb-2">Lawn Size (sq ft)</label>
              <input
                id="lawn-size-sqft"
                type="number"
                value={area}
                onChange={(e) => { setArea(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.area && <p className="text-xs text-red-500 mt-1 font-medium">{errors.area}</p>}
            </div>

            <div>
              <label htmlFor="grass-species-select" className="block text-sm font-semibold text-foreground/80 mb-2">Grass Type</label>
              <select
                id="grass-species-select"
                value={seedType}
                onChange={(e) => { setSeedType(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                {Object.entries(SEED_RATES).map(([key, obj]) => (
                  <option key={key} value={key}>{obj.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="seeding-method-select" className="block text-sm font-semibold text-foreground/80 mb-2">Seeding Method</label>
              <select
                id="seeding-method-select"
                value={method}
                onChange={(e) => { setMethod(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="new">New Lawn (Bare Soil)</option>
                <option value="overseed">Overseeding (Thin Lawn Repair)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Seed
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
            <h2 className="text-xl font-bold text-foreground mb-6">Seed Requirements</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Grass Seed Required</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.totalLbs.toFixed(1)} lbs
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Grass Class: {results.seedName}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Target Seeding Rate:</span>
                  <span className="text-foreground font-bold">{results.ratePer1000} lbs per 1,000 sq ft</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter lawn parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
