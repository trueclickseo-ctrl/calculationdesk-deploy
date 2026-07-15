'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Tree Age Calculator estimates the age of living trees using trunk circumference measurements and species-specific growth factor rates.`,
  formula: `Tree age estimations model radial growth velocities:

**1. Trunk Diameter ($D$, in inches):**
$$D = \\frac{\\text{Circumference}}{\\pi}$$

**2. Estimated Tree Age (years):**
$$\\text{Age} = D \\times \\text{Growth Factor}$$`,
  example: `**Estimate age of a White Oak with a 60-inch circumference:**
- Diameter $D$ = 60 / π = **19.10 inches**.
- White Oak Growth Factor = 5.0.
- Estimated Age = 19.10 × 5.0 = **95.5 Years Old**.`,
  faqs: [
    {
      q: 'What is a tree growth factor?',
      a: 'A growth factor is a multiplier representing the average rate of ring width expansion for specific tree species growing in average soil conditions.',
    },
    {
      q: 'How accurate is this method?',
      a: 'It provides a reliable approximation for trees growing in forested or park conditions. However, urban trees with supplementary water and fertilizers may grow much faster, making them appear younger than they are.',
    },
    {
      q: 'Where should I measure the circumference?',
      a: 'Measure the circumference at Breast Height (DBH), which is standardized at 4.5 feet (54 inches) above the ground on the uphill side of the tree.',
    },
  ],
};

const GROWTH_FACTORS: Record<string, { name: string; factor: number }> = {
  white_oak: { name: 'White Oak', factor: 5.0 },
  red_oak: { name: 'Red Oak', factor: 4.0 },
  sugar_maple: { name: 'Sugar Maple', factor: 5.5 },
  silver_maple: { name: 'Silver Maple', factor: 3.0 },
  shagbark_hickory: { name: 'Shagbark Hickory', factor: 7.5 },
  green_ash: { name: 'Green Ash', factor: 4.0 },
  white_birch: { name: 'White Birch', factor: 5.0 },
  white_pine: { name: 'White Pine', factor: 5.0 },
  american_elm: { name: 'American Elm', factor: 4.0 },
  sycamore: { name: 'American Sycamore', factor: 4.0 },
};

export default function TreeAgeCalculator() {
  const [circumference, setCircumference] = useState<number>(60);
  const [species, setSpecies] = useState<string>('white_oak');
  const [unit, setUnit] = useState<string>('inches');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setCircumference(60);
    setSpecies('white_oak');
    setUnit('inches');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(circumference) && circumference > 0;

  if (isValid) {
    const circIn = unit === 'inches' ? circumference : circumference / 2.54;
    const diameter = circIn / Math.PI;
    const factorObj = GROWTH_FACTORS[species] || { name: 'Custom', factor: 4.0 };
    const age = diameter * factorObj.factor;

    results = {
      diameter: unit === 'inches' ? diameter : diameter * 2.54,
      age: Math.round(age),
      speciesName: factorObj.name,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (circumference <= 0 || isNaN(circumference)) {
      newErrors.circumference = 'Circumference must be greater than zero';
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Trunk Measurements</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tree-circ" className="block text-sm font-semibold text-foreground/80 mb-2">Circumference</label>
                <input
                  id="tree-circ"
                  type="number"
                  value={circumference}
                  onChange={(e) => { setCircumference(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
              <div>
                <label htmlFor="tree-units" className="block text-sm font-semibold text-foreground/80 mb-2">Unit</label>
                <select
                  id="tree-units"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    if (e.target.value === 'cm') {
                      setCircumference(Math.round(circumference * 2.54));
                    } else {
                      setCircumference(Math.round(circumference / 2.54));
                    }
                    setErrors({});
                  }}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="inches">Inches</option>
                  <option value="cm">Centimeters</option>
                </select>
              </div>
            </div>
            {errors.circumference && <p className="text-xs text-red-500 mt-1 font-medium">{errors.circumference}</p>}

            <div>
              <label htmlFor="tree-species-select" className="block text-sm font-semibold text-foreground/80 mb-2">Tree Species</label>
              <select
                id="tree-species-select"
                value={species}
                onChange={(e) => { setSpecies(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                {Object.entries(GROWTH_FACTORS).map(([key, obj]) => (
                  <option key={key} value={key}>{obj.name} (Factor: {obj.factor})</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Age
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
            <h2 className="text-xl font-bold text-foreground mb-6">Age Forecast</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Tree Age</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.age} Years Old
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Specimen: {results.speciesName}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Trunk Diameter (DBH):</span>
                  <span className="text-foreground font-bold">
                    {results.diameter.toFixed(2)} {unit === 'inches' ? 'inches' : 'cm'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter trunk specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
