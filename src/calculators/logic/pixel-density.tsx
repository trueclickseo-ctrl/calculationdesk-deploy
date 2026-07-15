'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Pixel Density (PPI) Calculator finds display crispness in Pixels Per Inch (PPI) and computes dot pitch distances based on horizontal pixels, vertical pixels, and diagonal screen size.`,
  formula: `Pixel density utilizes display resolution coordinates and physical screen measurements:

**1. Diagonal Resolution in pixels ($P_d$):**
$$P_d = \\sqrt{\\text{Width}^2 + \\text{Height}^2}$$

**2. Pixels Per Inch (PPI):**
$$\\text{PPI} = \\frac{P_d}{\\text{Diagonal Inches}}$$

**3. Dot Pitch ($d_p$, in mm):**
$$d_p = \\frac{25.4}{\\text{PPI}}$$`,
  example: `**Calculate specs for a standard 15.6-inch Full HD (1920 x 1080) laptop display:**
- Diagonal Pixels = \\(\\sqrt{1920^2 + 1080^2} = \\sqrt{3,686,400 + 1,166,400} \\approx 2202.91\\) px.
- PPI = 2202.91 / 15.6 = **141.21 PPI**.
- Dot Pitch = 25.4 / 141.21 = **0.1800 mm**.`,
  faqs: [
    {
      q: 'What is Pixels Per Inch (PPI)?',
      a: 'PPI (Pixels Per Inch) is a measurement of display resolution density, indicating how many individual pixels are packed into a single linear inch of the screen. Higher PPI values yield sharper text and images.',
    },
    {
      q: 'What is Dot Pitch?',
      a: 'Dot pitch (sometimes called pixel pitch) is the distance between the center points of two adjacent pixels of the same color on a screen, measured in millimeters. Smaller dot pitches yield finer detail.',
    },
    {
      q: 'At what distance does a screen become "Retina"?',
      a: 'Apple defines a "Retina" display as one where normal human vision cannot distinguish individual pixels at typical viewing distances. For smartphones (10-12 inches away), this requires ~300+ PPI. For laptops (20 inches away), ~220 PPI is sufficient.',
    },
  ],
};

export default function PixelDensityCalculator() {
  const [horiz, setHoriz] = useState<number>(1920);
  const [vert, setVert] = useState<number>(1080);
  const [diagonal, setDiagonal] = useState<number>(15.6);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setHoriz(1920);
    setVert(1080);
    setDiagonal(15.6);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(horiz) && horiz > 0 &&
                  !isNaN(vert) && vert > 0 &&
                  !isNaN(diagonal) && diagonal > 0;

  if (isValid) {
    const diagPixels = Math.sqrt(horiz * horiz + vert * vert);
    const ppi = diagPixels / diagonal;
    const dotPitch = 25.4 / ppi;
    const totalMegapixels = (horiz * vert) / 1000000;

    results = {
      diagPixels,
      ppi,
      dotPitch,
      totalMegapixels,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (horiz <= 0 || isNaN(horiz)) newErrors.horiz = 'Width pixels must be greater than zero';
    if (vert <= 0 || isNaN(vert)) newErrors.vert = 'Height pixels must be greater than zero';
    if (diagonal <= 0 || isNaN(diagonal)) newErrors.diagonal = 'Diagonal size must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Display Attributes</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="horiz-res" className="block text-sm font-semibold text-foreground/80 mb-2">Horizontal Pixels</label>
              <input
                id="horiz-res"
                type="number"
                value={horiz}
                onChange={(e) => { setHoriz(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.horiz && <p className="text-xs text-red-500 mt-1 font-medium">{errors.horiz}</p>}
            </div>

            <div>
              <label htmlFor="vert-res" className="block text-sm font-semibold text-foreground/80 mb-2">Vertical Pixels</label>
              <input
                id="vert-res"
                type="number"
                value={vert}
                onChange={(e) => { setVert(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.vert && <p className="text-xs text-red-500 mt-1 font-medium">{errors.vert}</p>}
            </div>

            <div>
              <label htmlFor="screen-diagonal" className="block text-sm font-semibold text-foreground/80 mb-2">Diagonal Screen Size (inches)</label>
              <input
                id="screen-diagonal"
                type="number"
                value={diagonal}
                onChange={(e) => { setDiagonal(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.diagonal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.diagonal}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Density
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
            <h2 className="text-xl font-bold text-foreground mb-6">Density Metrics</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Pixels Per Inch (PPI)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.ppi.toFixed(2)} PPI
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Dot Pitch</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.dotPitch.toFixed(4)} mm
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Resolution</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.totalMegapixels.toFixed(2)} Megapixels
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Diagonal Pixels:</span>
                  <span className="text-foreground font-bold">
                    {Math.round(results.diagPixels).toLocaleString()} px
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter display specs.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
