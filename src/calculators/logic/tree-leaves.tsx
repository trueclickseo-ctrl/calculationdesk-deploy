'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Tree Leaves Estimator approximates the total number of leaves on a tree based on its crown height, crown spread, and leaf density classification.`,
  formula: `Foliage volumes are modeled using semi-ellipsoid formulas:

**1. Crown Radius ($R$, in feet):**
$$R = \\frac{\\text{Crown Spread}}{2}$$

**2. Crown Volume ($V$, in cubic feet):**
$$V = \\frac{2}{3} \\pi R^2 H$$
Where $H$ is the crown height.

**3. Estimated Leaf Count ($N$):**
$$N = V \\times \\text{Leaf Density (leaves/cubic foot)}$$`,
  example: `**Estimate leaves for a mature oak tree with a 30-foot crown spread, 20-foot crown height, and medium density (250 leaves/cu ft):**
- Radius $R$ = 15 ft.
- Volume $V$ = (2/3) × π × 15² × 20 = **9,424.78 cubic feet**.
- Estimated Leaves = 9,424.78 × 250 = **2,356,195 leaves**.`,
  faqs: [
    {
      q: 'How many leaves does an average mature tree have?',
      a: 'A mature, healthy deciduous tree (like an oak or maple) typically has between 100,000 and 500,000 leaves. Large, isolated, mature forest giants can exceed 1 to 2 million leaves.',
    },
    {
      q: 'Why does leaf density vary?',
      a: 'Conifers (pines/firs) have higher needle counts, while broadleaf trees vary by species. Sun-exposed outer crowns have higher leaf density compared to shaded inner areas.',
    },
    {
      q: 'Is this calculation exact?',
      a: 'No. This is a scientific estimation based on crown volume profiles and average leaf spacing parameters.',
    },
  ],
};

export default function TreeLeavesEstimator() {
  const [spread, setSpread] = useState<number>(20);
  const [height, setHeight] = useState<number>(15);
  const [density, setDensity] = useState<number>(150); // leaves per cu ft
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSpread(20);
    setHeight(15);
    setDensity(150);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(spread) && spread > 0 &&
                  !isNaN(height) && height > 0 &&
                  !isNaN(density) && density > 0;

  if (isValid) {
    const radius = spread / 2;
    const volume = (2 / 3) * Math.PI * radius * radius * height;
    const leafCount = Math.round(volume * density);

    results = {
      volume,
      leafCount,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (spread <= 0 || isNaN(spread)) newErrors.spread = 'Crown spread must be greater than zero';
    if (height <= 0 || isNaN(height)) newErrors.height = 'Crown height must be greater than zero';
    if (density <= 0 || isNaN(density)) newErrors.density = 'Density must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Tree Crown Specs</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="crown-spread-val" className="block text-sm font-semibold text-foreground/80 mb-2">Crown Spread (feet)</label>
              <input
                id="crown-spread-val"
                type="number"
                value={spread}
                onChange={(e) => { setSpread(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.spread && <p className="text-xs text-red-500 mt-1 font-medium">{errors.spread}</p>}
            </div>

            <div>
              <label htmlFor="crown-height-val" className="block text-sm font-semibold text-foreground/80 mb-2">Crown Height (feet)</label>
              <input
                id="crown-height-val"
                type="number"
                value={height}
                onChange={(e) => { setHeight(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
            </div>

            <div>
              <label htmlFor="crown-density-val" className="block text-sm font-semibold text-foreground/80 mb-2">Leaf Density (leaves per cubic foot)</label>
              <select
                id="crown-density-val"
                value={density}
                onChange={(e) => { setDensity(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="50">Low Density (50 / cu ft)</option>
                <option value="150">Medium Density (150 / cu ft)</option>
                <option value="250">High Density (250 / cu ft)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Leaves
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
            <h2 className="text-xl font-bold text-foreground mb-6">Foliage Summary</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Leaf Count</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.leafCount.toLocaleString()} Leaves
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Based on crown volume of {Math.round(results.volume).toLocaleString()} cu ft
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter tree crown parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
