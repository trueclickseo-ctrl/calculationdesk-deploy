'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Screen Size & Area Calculator calculates screen width, height, and total display area using diagonal measurements and aspect ratio proportions.`,
  formula: `Display dimensions utilize trigonometric relations derived from Pythagorean right triangles:

**1. Aspect Ratio Angle ($\\theta$):**
$$\\theta = \\arctan\\left( \\frac{\\text{Aspect Height}}{\\text{Aspect Width}} \\right)$$

**2. Width ($W$) and Height ($H$):**
$$W = \\text{Diagonal} \\times \\cos(\\theta)$$
$$H = \\text{Diagonal} \\times \\sin(\\theta)$$

**3. Total Surface Area ($A$):**
$$A = W \\times H$$`,
  example: `**Calculate dimensions for a 15.6-inch screen with a 16:9 aspect ratio:**
- Aspect Width = 16. Aspect Height = 9. Angle $\\theta = \\arctan(9/16) \\approx 29.36^{\\circ}$.
- Width = 15.6 × cos(29.36°) = **13.59 inches**.
- Height = 15.6 × sin(29.36°) = **7.65 inches**.
- Surface Area = 13.59 × 7.65 = **103.95 sq inches**.`,
  faqs: [
    {
      q: 'How is screen size measured?',
      a: 'Screen size is measured diagonally from one corner of the display panel to the opposite corner (excluding the plastic bezel or frame).',
    },
    {
      q: 'Why does aspect ratio affect screen area?',
      a: 'For a given diagonal measurement, a screen with a squarer aspect ratio (like 4:3) has a larger total surface area than a wider screen (like 21:9 or 32:9) because a square maximizes area-to-perimeter efficiency.',
    },
    {
      q: 'What is the standard aspect ratio for modern monitors?',
      a: '16:9 is the universal standard for modern TVs, computer monitors, and laptop displays.',
    },
  ],
};

export default function ScreenSizeCalculator() {
  const [diagonal, setDiagonal] = useState<number>(15.6);
  const [aspectW, setAspectW] = useState<number>(16);
  const [aspectH, setAspectH] = useState<number>(9);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDiagonal(15.6);
    setAspectW(16);
    setAspectH(9);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(diagonal) && diagonal > 0 &&
                  !isNaN(aspectW) && aspectW > 0 &&
                  !isNaN(aspectH) && aspectH > 0;

  if (isValid) {
    const angle = Math.atan(aspectH / aspectW);
    const width = diagonal * Math.cos(angle);
    const height = diagonal * Math.sin(angle);
    const area = width * height;

    results = {
      width,
      height,
      area,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (diagonal <= 0 || isNaN(diagonal)) newErrors.diagonal = 'Diagonal size must be greater than zero';
    if (aspectW <= 0 || isNaN(aspectW)) newErrors.aspectW = 'Aspect width must be greater than zero';
    if (aspectH <= 0 || isNaN(aspectH)) newErrors.aspectH = 'Aspect height must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Display Specs</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="screen-diagonal" className="block text-sm font-semibold text-foreground/80 mb-2">Diagonal Size (inches)</label>
              <input
                id="screen-diagonal"
                type="number"
                value={diagonal}
                onChange={(e) => { setDiagonal(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.diagonal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.diagonal}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="aspect-w" className="block text-sm font-semibold text-foreground/80 mb-2">Aspect Width</label>
                <input
                  id="aspect-w"
                  type="number"
                  value={aspectW}
                  onChange={(e) => { setAspectW(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.aspectW && <p className="text-xs text-red-500 mt-1 font-medium">{errors.aspectW}</p>}
              </div>

              <div>
                <label htmlFor="aspect-h" className="block text-sm font-semibold text-foreground/80 mb-2">Aspect Height</label>
                <input
                  id="aspect-h"
                  type="number"
                  value={aspectH}
                  onChange={(e) => { setAspectH(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.aspectH && <p className="text-xs text-red-500 mt-1 font-medium">{errors.aspectH}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Dimensions
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
            <h2 className="text-xl font-bold text-foreground mb-6">Display Dimensions</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Screen Area</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.area.toFixed(2)} sq inches
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Screen Width</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.width.toFixed(2)} inches</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Screen Height</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.height.toFixed(2)} inches</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter screen specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
