'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Livestock Fence Calculator determines the total number of fence posts and wire reel lengths needed to secure pasture perimeters.`,
  formula: `Material counts are computed based on perimeter and strand settings:

**1. Number of Posts ($N_{posts}$):**
- For closed loop perimeters:
  $$N_{posts} = \\frac{\\text{Perimeter}}{\\text{Spacing}}$$
- For straight line fences:
  $$N_{posts} = \\frac{\\text{Perimeter}}{\\text{Spacing}} + 1$$

**2. Total Wire Length ($L_{wire}$):**
$$L_{wire} = \\text{Perimeter} \\times \\text{Strands}$$`,
  example: `**Calculate materials for a 1,000-foot straight line fence with posts spaced every 10 feet, using 4 wire strands:**
- Posts needed = 1,000 / 10 + 1 = **101 posts**.
- Total wire = 1,000 × 4 = **4,000 feet** (8 reels of 500-foot wire).`,
  faqs: [
    {
      q: 'What is the standard spacing for livestock fence posts?',
      a: 'For high-tensile electric wire, post spacing typically ranges from 15 to 30 feet. For barbed wire, spacing of 10 to 12 feet is standard.',
    },
    {
      q: 'How many wire strands are recommended for cattle?',
      a: 'For cattle, a 4-strand barbed wire or 3 to 5-strand high-tensile electric wire is recommended. Sheep and goats usually require 5 to 6 strands at closer spacings.',
    },
    {
      q: 'Should I choose wood or T-posts?',
      a: 'Wood posts offer maximum structural stability at corners and gates. Metal T-posts are cheaper, easier to drive, and perfect for mid-spans.',
    },
  ],
};

export default function LivestockFenceCalculator() {
  const [perimeter, setPerimeter] = useState<number>(1000);
  const [spacing, setSpacing] = useState<number>(10);
  const [strands, setStrands] = useState<number>(4);
  const [fenceType, setFenceType] = useState<string>('straight');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPerimeter(1000);
    setSpacing(10);
    setStrands(4);
    setFenceType('straight');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(perimeter) && perimeter > 0 &&
                  !isNaN(spacing) && spacing > 0 &&
                  !isNaN(strands) && strands > 0;

  if (isValid) {
    const rawPosts = perimeter / spacing;
    const posts = fenceType === 'straight' ? Math.floor(rawPosts) + 1 : Math.round(rawPosts);
    const wireLength = perimeter * strands;

    results = {
      posts,
      wireLength,
      reels500: Math.ceil(wireLength / 500),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (perimeter <= 0 || isNaN(perimeter)) newErrors.perimeter = 'Perimeter must be greater than zero';
    if (spacing <= 0 || isNaN(spacing)) newErrors.spacing = 'Post spacing must be greater than zero';
    if (strands <= 0 || isNaN(strands)) newErrors.strands = 'Strand count must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Fence Parameters</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="fence-len" className="block text-sm font-semibold text-foreground/80 mb-2">Total Fence Length (feet)</label>
              <input
                id="fence-len"
                type="number"
                value={perimeter}
                onChange={(e) => { setPerimeter(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.perimeter && <p className="text-xs text-red-500 mt-1 font-medium">{errors.perimeter}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="post-gaps" className="block text-sm font-semibold text-foreground/80 mb-2">Post Spacing (feet)</label>
                <input
                  id="post-gaps"
                  type="number"
                  value={spacing}
                  onChange={(e) => { setSpacing(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.spacing && <p className="text-xs text-red-500 mt-1 font-medium">{errors.spacing}</p>}
              </div>

              <div>
                <label htmlFor="wire-strands" className="block text-sm font-semibold text-foreground/80 mb-2">Wire Strands</label>
                <input
                  id="wire-strands"
                  type="number"
                  value={strands}
                  onChange={(e) => { setStrands(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.strands && <p className="text-xs text-red-500 mt-1 font-medium">{errors.strands}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="fence-layout-type" className="block text-sm font-semibold text-foreground/80 mb-2">Fence Layout</label>
              <select
                id="fence-layout-type"
                value={fenceType}
                onChange={(e) => { setFenceType(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="straight">Straight Line (Starts and Ends with post)</option>
                <option value="closed">Closed Loop (Pasture Boundary)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Materials
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
            <h2 className="text-xl font-bold text-foreground mb-6">Material Quantities</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Posts Required</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.posts} Posts
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Wire Needed</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.wireLength.toLocaleString()} feet</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">500ft reels required</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.reels500} reels</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter pasture fence parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
