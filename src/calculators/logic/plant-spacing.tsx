'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Plant Spacing Calculator plans garden bed layouts, computing total plants or bulbs required based on spacing distances and planting grids.`,
  formula: `Garden density planning utilizes square or triangular spatial geometries:

**1. Square Grid Spacing:**
$$\\text{Area per Plant} = \\text{Spacing (ft)} \\times \\text{Row Spacing (ft)}$$
$$\\text{Total Plants} = \\frac{\\text{Plot Area (sq ft)}}{\\text{Area per Plant}}$$

**2. Triangular / Staggered Spacing:**
$$\\text{Area per Plant} = \\text{Spacing (ft)} \\times \\text{Spacing (ft)} \\times 0.866$$
$$\\text{Total Plants} = \\frac{\\text{Plot Area (sq ft)}}{\\text{Area per Plant}}$$`,
  example: `**Calculate plant counts for a 100 sq ft bed spaced 12 inches (1 foot) apart using triangular spacing:**
- Area per plant = 1 × 1 × 0.866 = **0.866 sq ft**.
- Total Plants = 100 / 0.866 = **115 plants** (versus 100 in a square grid).`,
  faqs: [
    {
      q: 'Why does triangular spacing fit more plants?',
      a: 'Triangular (staggered) spacing offsets alternating rows. This tighter nesting eliminates empty spaces, increasing plant density by roughly 15.5% while maintaining equal distances between all neighboring plants.',
    },
    {
      q: 'When should I use row spacing that differs from plant spacing?',
      a: 'Different row spacing is common in traditional vegetable farming to leave wider walking paths between rows for harvesting and weeding. In raised beds, equal square or triangular grids are preferred.',
    },
    {
      q: 'How do I convert inches to decimal feet for these calculations?',
      a: 'Divide the spacing in inches by 12. For example, 18 inches / 12 = 1.5 feet.',
    },
  ],
};

export default function PlantSpacingCalculator() {
  const [area, setArea] = useState<number>(100);
  const [spacing, setSpacing] = useState<number>(12); // inches
  const [rowSpacing, setRowSpacing] = useState<number>(12); // inches
  const [layout, setLayout] = useState<string>('triangular');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setArea(100);
    setSpacing(12);
    setRowSpacing(12);
    setLayout('triangular');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(area) && area > 0 &&
                  !isNaN(spacing) && spacing > 0 &&
                  !isNaN(rowSpacing) && rowSpacing > 0;

  if (isValid) {
    const sFt = spacing / 12;
    const rFt = rowSpacing / 12;

    let areaPerPlant = 0;
    if (layout === 'square') {
      areaPerPlant = sFt * rFt;
    } else {
      // For triangular, row spacing is equal to spacing * sin(60) or 0.866
      areaPerPlant = sFt * sFt * 0.866025;
    }

    const plantsNeeded = Math.floor(area / areaPerPlant);

    results = {
      plantsNeeded,
      areaPerPlant,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (area <= 0 || isNaN(area)) newErrors.area = 'Plot area must be greater than zero';
    if (spacing <= 0 || isNaN(spacing)) newErrors.spacing = 'Plant spacing must be greater than zero';
    if (rowSpacing <= 0 || isNaN(rowSpacing)) newErrors.rowSpacing = 'Row spacing must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Plot & Spacing Setup</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="bed-area-sqft" className="block text-sm font-semibold text-foreground/80 mb-2">Plot Bed Area (sq ft)</label>
              <input
                id="bed-area-sqft"
                type="number"
                value={area}
                onChange={(e) => { setArea(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.area && <p className="text-xs text-red-500 mt-1 font-medium">{errors.area}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="plant-spacing-in" className="block text-sm font-semibold text-foreground/80 mb-2">Plant Spacing (in)</label>
                <input
                  id="plant-spacing-in"
                  type="number"
                  value={spacing}
                  onChange={(e) => {
                    setSpacing(Number(e.target.value));
                    setRowSpacing(Number(e.target.value)); // default row spacing to match plant spacing
                    setErrors({});
                  }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.spacing && <p className="text-xs text-red-500 mt-1 font-medium">{errors.spacing}</p>}
              </div>

              <div>
                <label htmlFor="row-spacing-in" className="block text-sm font-semibold text-foreground/80 mb-2">Row Spacing (in)</label>
                <input
                  id="row-spacing-in"
                  type="number"
                  value={rowSpacing}
                  disabled={layout === 'triangular'}
                  onChange={(e) => { setRowSpacing(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 disabled:opacity-50"
                />
                {errors.rowSpacing && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rowSpacing}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="spacing-layout-select" className="block text-sm font-semibold text-foreground/80 mb-2">Planting Layout</label>
              <select
                id="spacing-layout-select"
                value={layout}
                onChange={(e) => { setLayout(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="triangular">Triangular / Staggered (15% higher density)</option>
                <option value="square">Square / Rectangular Grid</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Spacing
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
            <h2 className="text-xl font-bold text-foreground mb-6">Plants Required</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Plants Needed</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.plantsNeeded.toLocaleString()} Plants
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Based on {layout} planting grid configuration
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Grow Space per Plant:</span>
                  <span className="text-foreground font-bold">{results.areaPerPlant.toFixed(3)} sq ft</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter gardening parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
