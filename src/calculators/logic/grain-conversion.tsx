'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Grain Weight Conversion calculator translates grain quantities between bushels, pounds, metric tons, and short tons based on crop-specific test weight standards.`,
  formula: `Bushels represent dry volume; conversions to weights use crop density indexes:

**Standard Bushel Weights:**
- **Corn / Soybeans / Rye:** $1 \\text{ bushel} = 56 \\text{ lbs}$
- **Wheat / Soybeans:** $1 \\text{ bushel} = 60 \\text{ lbs}$
- **Barley:** $1 \\text{ bushel} = 48 \\text{ lbs}$
- **Oats:** $1 \\text{ bushel} = 32 \\text{ lbs}$

*Ton conversions:*
- 1 Metric Ton = 2,204.62 lbs.
- 1 Short Ton (US) = 2,000.00 lbs.`,
  example: `**Convert 1,000 bushels of Wheat to Metric Tons:**
- Wheat density: 60 lbs per bushel.
- Total pounds = 1,000 × 60 = **60,000 lbs**.
- Metric Tons = 60,000 / 2,204.62 = **27.21 Metric Tons**.`,
  faqs: [
    {
      q: 'Why does grain type affect weight conversions?',
      a: 'A bushel is a unit of volume, not weight. Because grains have different sizes, shapes, and densities, a bushel basket filled with wheat is heavier (60 lbs) than one filled with oats (32 lbs).',
    },
    {
      q: 'What is standard test weight?',
      a: 'Test weight is the measure of grain density (pounds per bushel). Grain elevators use standard values to buy and sell, adjusting prices if the crop is lighter than standard due to disease or drought.',
    },
    {
      q: 'How many pounds are in a metric ton versus a short ton?',
      a: 'A metric ton (used globally) equals 2,204.62 pounds (1,000 kg). A short ton (standard US ton) equals exactly 2,000 pounds.',
    },
  ],
};

const GRAIN_DENSITIES: Record<string, { name: string; lbsPerBu: number }> = {
  corn: { name: 'Corn (56 lbs/bu)', lbsPerBu: 56 },
  wheat: { name: 'Wheat (60 lbs/bu)', lbsPerBu: 60 },
  soybeans: { name: 'Soybeans (60 lbs/bu)', lbsPerBu: 60 },
  barley: { name: 'Barley (48 lbs/bu)', lbsPerBu: 48 },
  oats: { name: 'Oats (32 lbs/bu)', lbsPerBu: 32 },
  rye: { name: 'Rye (56 lbs/bu)', lbsPerBu: 56 },
};

export default function GrainConversionCalculator() {
  const [val, setVal] = useState<number>(100);
  const [unit, setUnit] = useState<string>('bushels');
  const [grainType, setGrainType] = useState<string>('corn');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setVal(100);
    setUnit('bushels');
    setGrainType('corn');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(val) && val >= 0;

  if (isValid) {
    const densityObj = GRAIN_DENSITIES[grainType] || { name: 'Custom', lbsPerBu: 56 };
    const lbsPerBu = densityObj.lbsPerBu;

    // Convert everything to pounds first
    let totalLbs = 0;
    if (unit === 'bushels') totalLbs = val * lbsPerBu;
    else if (unit === 'pounds') totalLbs = val;
    else if (unit === 'metric_tons') totalLbs = val * 2204.62262;
    else totalLbs = val * 2000; // short tons

    // Convert from pounds to all others
    const bushels = totalLbs / lbsPerBu;
    const metricTons = totalLbs / 2204.62262;
    const shortTons = totalLbs / 2000;

    results = {
      grainName: densityObj.name,
      bushels,
      pounds: totalLbs,
      metricTons,
      shortTons,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (val < 0 || isNaN(val)) newErrors.value = 'Value cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Grain Details</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="grain-select" className="block text-sm font-semibold text-foreground/80 mb-2">Grain Type</label>
              <select
                id="grain-select"
                value={grainType}
                onChange={(e) => { setGrainType(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                {Object.entries(GRAIN_DENSITIES).map(([key, obj]) => (
                  <option key={key} value={key}>{obj.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="grain-val" className="block text-sm font-semibold text-foreground/80 mb-2">Quantity</label>
                <input
                  id="grain-val"
                  type="number"
                  value={val}
                  onChange={(e) => { setVal(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="grain-unit-select" className="block text-sm font-semibold text-foreground/80 mb-2">Source Unit</label>
                <select
                  id="grain-unit-select"
                  value={unit}
                  onChange={(e) => { setUnit(e.target.value); setErrors({}); }}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="bushels">Bushels (bu)</option>
                  <option value="pounds">Pounds (lbs)</option>
                  <option value="metric_tons">Metric Tons (t)</option>
                  <option value="short_tons">Short Tons (ton)</option>
                </select>
              </div>
            </div>
            {errors.value && <p className="text-xs text-red-500 mt-1 font-medium">{errors.value}</p>}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Weights
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
            <h2 className="text-xl font-bold text-foreground mb-6">Conversions</h2>

            {results ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Bushels (bu):</span>
                    <span className="text-foreground font-bold">{results.bushels.toFixed(2).toLocaleString()} bu</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Pounds (lbs):</span>
                    <span className="text-foreground font-bold">{Math.round(results.pounds).toLocaleString()} lbs</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Metric Tons (t):</span>
                    <span className="text-foreground font-bold">{results.metricTons.toFixed(3)} t</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Short Tons (ton):</span>
                    <span className="text-foreground font-bold">{results.shortTons.toFixed(3)} ton</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter grain quantities.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
