'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Potting Soil Calculator determines the total volume of soil needed to fill round or rectangular planter boxes in Liters, quarts, and cubic feet.`,
  formula: `Soil volumes are calculated using standard solid geometry profiles:

**1. Round Planters (Cylindrical):**
$$V = \\pi \\times R^2 \\times D$$
Where $R$ is radius (diameter / 2), and $D$ is planter depth.

**2. Rectangular Planters (Box):**
$$V = W \\times L \\times D$$
Where $W$ is width, $L$ is length, and $D$ is depth.

*Volume conversions:*
- 1 cubic foot $\\approx 28.3168$ Liters $\\approx 25.714$ dry quarts.`,
  example: `**Calculate soil needed for a rectangular planter box 4 feet long, 2 feet wide, and 1.5 feet deep:**
- Volume = 4 × 2 × 1.5 = **12 cubic feet**.
- Soil in Liters = 12 × 28.3168 = **339.8 Liters**.
- Soil in Quarts = 12 × 25.714 = **308.6 Dry Quarts**.`,
  faqs: [
    {
      q: 'Should I buy potting soil by weight or by volume?',
      a: 'Always buy potting soil by volume (cubic feet, dry quarts, or Liters). Soil weight varies drastically depending on how wet or dry the mixture is.',
    },
    {
      q: 'How many Liters are in a standard bag of soil?',
      a: 'In the US, large soil bags are usually 1 or 2 cubic feet (approx. 28 or 56 Liters). Small bags are often sold in dry quarts (e.g. 8 dry quarts is about 8.8 Liters).',
    },
    {
      q: 'Should I pack the soil down when filling my pots?',
      a: 'No. Lightly tap the container to settle the soil, but do not pack it tightly. Packing soil collapses air pockets, restricting root growth and causing poor water drainage.',
    },
  ],
};

export default function PottingSoilCalculator() {
  const [shape, setShape] = useState<string>('rectangular');
  const [length, setLength] = useState<number>(4);
  const [width, setWidth] = useState<number>(2);
  const [diameter, setDiameter] = useState<number>(2);
  const [depth, setDepth] = useState<number>(1.5);
  const [unit, setUnit] = useState<string>('feet');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setShape('rectangular');
    setLength(4);
    setWidth(2);
    setDiameter(2);
    setDepth(1.5);
    setUnit('feet');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = shape === 'rectangular'
    ? (!isNaN(length) && length > 0 && !isNaN(width) && width > 0 && !isNaN(depth) && depth > 0)
    : (!isNaN(diameter) && diameter > 0 && !isNaN(depth) && depth > 0);

  if (isValid) {
    let volumeCuFt = 0;

    const scale = unit === 'feet' ? 1 : 1 / 12; // convert inches to feet

    if (shape === 'rectangular') {
      const lFt = length * scale;
      const wFt = width * scale;
      const dFt = depth * scale;
      volumeCuFt = lFt * wFt * dFt;
    } else {
      const rFt = (diameter / 2) * scale;
      const dFt = depth * scale;
      volumeCuFt = Math.PI * rFt * rFt * dFt;
    }

    const liters = volumeCuFt * 28.3168466;
    const quarts = volumeCuFt * 25.7140463; // dry quarts

    results = {
      volumeCuFt,
      liters,
      quarts,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (shape === 'rectangular') {
      if (length <= 0 || isNaN(length)) newErrors.length = 'Length must be positive';
      if (width <= 0 || isNaN(width)) newErrors.width = 'Width must be positive';
    } else {
      if (diameter <= 0 || isNaN(diameter)) newErrors.diameter = 'Diameter must be positive';
    }
    if (depth <= 0 || isNaN(depth)) newErrors.depth = 'Depth must be positive';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Planter Box Specs</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="planter-shape" className="block text-sm font-semibold text-foreground/80 mb-2">Planter Shape</label>
              <select
                id="planter-shape"
                value={shape}
                onChange={(e) => { setShape(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="rectangular">Rectangular / Square</option>
                <option value="round">Round / Cylindrical</option>
              </select>
            </div>

            <div>
              <label htmlFor="measurement-unit" className="block text-sm font-semibold text-foreground/80 mb-2">Measurement Unit</label>
              <select
                id="measurement-unit"
                value={unit}
                onChange={(e) => { setUnit(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="feet">Feet</option>
                <option value="inches">Inches</option>
              </select>
            </div>

            {shape === 'rectangular' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="planter-len" className="block text-sm font-semibold text-foreground/80 mb-2">Length</label>
                  <input
                    id="planter-len"
                    type="number"
                    value={length}
                    onChange={(e) => { setLength(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.length && <p className="text-xs text-red-500 mt-1 font-medium">{errors.length}</p>}
                </div>

                <div>
                  <label htmlFor="planter-wid" className="block text-sm font-semibold text-foreground/80 mb-2">Width</label>
                  <input
                    id="planter-wid"
                    type="number"
                    value={width}
                    onChange={(e) => { setWidth(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.width && <p className="text-xs text-red-500 mt-1 font-medium">{errors.width}</p>}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="planter-dia" className="block text-sm font-semibold text-foreground/80 mb-2">Diameter</label>
                <input
                  id="planter-dia"
                  type="number"
                  value={diameter}
                  onChange={(e) => { setDiameter(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.diameter && <p className="text-xs text-red-500 mt-1 font-medium">{errors.diameter}</p>}
              </div>
            )}

            <div>
              <label htmlFor="planter-depth" className="block text-sm font-semibold text-foreground/80 mb-2">Depth / Height</label>
              <input
                id="planter-depth"
                type="number"
                value={depth}
                onChange={(e) => { setDepth(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.depth && <p className="text-xs text-red-500 mt-1 font-medium">{errors.depth}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Volume
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
            <h2 className="text-xl font-bold text-foreground mb-6">Soil Volume Needed</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Soil Volume (Liters)</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.liters.toFixed(1)} Liters
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Cubic Feet</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.volumeCuFt.toFixed(2)} cu ft</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Dry Quarts</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.quarts.toFixed(1)} dry qt</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter container variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
