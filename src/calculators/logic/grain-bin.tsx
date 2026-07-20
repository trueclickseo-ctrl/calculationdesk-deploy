'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Grain Bin Capacity Planner calculates the total volume and bushel storage capacity of round agricultural grain bins based on diameter, ring wall height, and pack factors.`,
  formula: `Grain bin volume estimations model cylindrical storage structures:

**1. Cylinder Volume ($V$, in cubic feet):**
$$V = \\pi \\times R^2 \\times H$$
Where $R$ is radius (diameter / 2), and $H$ is wall height.

**2. Standard Bushel Capacity ($C_{std}$):**
$$C_{std} = V \\times 0.80356$$

**3. Packed Bushel Capacity ($C_{pack}$):**
$$C_{pack} = C_{std} \\times \\left(1 + \\frac{\\text{Pack Factor \\%}}{100}\\right)$$`,
  example: `**Calculate storage for a bin 24 feet in diameter, with an 18-foot wall height, and a 5% pack factor:**
- Radius $R$ = 12 ft.
- Volume $V$ = π × 12² × 18 = **8,143.0 cubic feet**.
- Standard Bushels $C_{std}$ = 8,143.0 × 0.80356 = **6,543.4 bushels**.
- Packed Bushels $C_{pack}$ = 6,543.4 × 1.05 = **6,870.6 bushels**.`,
  faqs: [
    {
      q: 'What is a grain bin pack factor?',
      a: 'As grain sits in a bin, the weight of the upper grain compresses the grain below, increasing density. A pack factor (usually 3% to 8%) is applied to adjust for this compaction and estimate actual storage.',
    },
    {
      q: 'How does moisture content affect storage?',
      a: 'Drier grain packs more than wet grain. If moisture content is high, you should assume lower pack factors to prevent overloading structural load limits.',
    },
    {
      q: 'Does this calculate the cone top capacity?',
      a: 'This calculator solves for the main cylinder body. The cone roof adds roughly 10-15% additional storage, which is usually left empty for ventilation and drying.',
    },
  ],
};

export default function GrainBinCalculator() {
  const [diameter, setDiameter] = useState<number>(24);
  const [height, setHeight] = useState<number>(18);
  const [packFactor, setPackFactor] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDiameter(24);
    setHeight(18);
    setPackFactor(5);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(diameter) && diameter > 0 &&
                  !isNaN(height) && height > 0 &&
                  !isNaN(packFactor) && packFactor >= 0;

  if (isValid) {
    const radius = diameter / 2;
    const volumeCuFt = Math.PI * radius * radius * height;
    const stdBushels = volumeCuFt * 0.803564;
    const packedBushels = stdBushels * (1 + packFactor / 100);

    results = {
      volumeCuFt,
      stdBushels,
      packedBushels,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (diameter <= 0 || isNaN(diameter)) newErrors.diameter = 'Diameter must be greater than zero';
    if (height <= 0 || isNaN(height)) newErrors.height = 'Wall height must be greater than zero';
    if (packFactor < 0 || isNaN(packFactor)) newErrors.packFactor = 'Pack factor cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Bin Dimensions</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="bin-dia" className="block text-sm font-semibold text-foreground/80 mb-2">Bin Diameter (feet)</label>
              <input
                id="bin-dia"
                type="number"
                value={diameter}
                onChange={(e) => { setDiameter(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.diameter && <p className="text-xs text-red-500 mt-1 font-medium">{errors.diameter}</p>}
            </div>

            <div>
              <label htmlFor="bin-height" className="block text-sm font-semibold text-foreground/80 mb-2">Ring Wall Height (feet)</label>
              <input
                id="bin-height"
                type="number"
                value={height}
                onChange={(e) => { setHeight(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
            </div>

            <div>
              <label htmlFor="bin-pack" className="block text-sm font-semibold text-foreground/80 mb-2">Compaction / Pack Factor (%)</label>
              <input
                id="bin-pack"
                type="number"
                value={packFactor}
                onChange={(e) => { setPackFactor(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.packFactor && <p className="text-xs text-red-500 mt-1 font-medium">{errors.packFactor}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Capacity
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
            <h2 className="text-xl font-bold text-foreground mb-6">Storage Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Packed Bushel Capacity</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {Math.round(results.packedBushels).toLocaleString()} Bushels
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    At {packFactor}% compaction index
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Standard Bushels</span>
                    <span className="block text-base font-bold text-foreground mt-1">{Math.round(results.stdBushels).toLocaleString()} bu</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Cylinder Volume</span>
                    <span className="block text-base font-bold text-foreground mt-1">{Math.round(results.volumeCuFt).toLocaleString()} cu ft</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter bin specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
