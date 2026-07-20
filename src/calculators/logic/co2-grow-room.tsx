'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The CO2 Grow Room Calculator computes the volume of carbon dioxide ($CO_2$) required to raise grow room levels to target concentration ppm limits.`,
  formula: `CO2 injection calculations determine enrichment gas volumes:

**1. Grow Room Volume ($V$, in cubic feet):**
$$V = \\text{Width} \\times \\text{Length} \\times \\text{Height}$$

**2. Carbon Dioxide Injection Volume ($V_{CO2}$, in cubic feet):**
$$V_{CO2} = V \\times \\frac{\\text{Target PPM} - \\text{Current PPM}}{1,000,000}$$`,
  example: `**Calculate CO2 injection for a room 10 ft wide, 10 ft long, and 8 ft high, increasing levels from 400 ppm to 1,200 ppm:**
- Volume $V$ = 10 × 10 × 8 = **800 cubic feet**.
- $V_{CO2}$ = 800 × (1200 - 400) / 1,000,000 = 800 × 0.0008 = **0.64 cubic feet** of pure $CO_2$.`,
  faqs: [
    {
      q: 'Why do growers enrich grow rooms with CO2?',
      a: 'Plants use carbon dioxide during photosynthesis. Standard atmospheric levels are ~400 ppm. Raising this to 1,200–1,500 ppm in high-light environments can boost growth rates by up to 20-30%.',
    },
    {
      q: 'When should CO2 be injected?',
      a: 'Only inject carbon dioxide during daylight (lights-on) periods. Plants do not photosynthesize or consume CO2 in the dark, so running it at night wastes gas.',
    },
    {
      q: 'Is high CO2 dangerous to humans?',
      a: 'Typical grow room targets (1,200–1,500 ppm) are completely safe for humans. However, concentrations exceeding 5,000 ppm can cause headaches, dizziness, and cognitive impairment.',
    },
  ],
};

export default function Co2GrowRoomCalculator() {
  const [width, setWidth] = useState<number>(10);
  const [length, setLength] = useState<number>(10);
  const [height, setHeight] = useState<number>(8);
  const [currentPpm, setCurrentPpm] = useState<number>(400);
  const [targetPpm, setTargetPpm] = useState<number>(1200);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setWidth(10);
    setLength(10);
    setHeight(8);
    setCurrentPpm(400);
    setTargetPpm(1200);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(width) && width > 0 &&
                  !isNaN(length) && length > 0 &&
                  !isNaN(height) && height > 0 &&
                  !isNaN(currentPpm) && currentPpm >= 0 &&
                  !isNaN(targetPpm) && targetPpm > currentPpm;

  if (isValid) {
    const volume = width * length * height;
    const ppmDiff = targetPpm - currentPpm;
    const co2Required = volume * (ppmDiff / 1000000);

    results = {
      volume,
      ppmDiff,
      co2Required,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (width <= 0 || isNaN(width)) newErrors.width = 'Width must be positive';
    if (length <= 0 || isNaN(length)) newErrors.length = 'Length must be positive';
    if (height <= 0 || isNaN(height)) newErrors.height = 'Height must be positive';
    if (currentPpm < 0 || isNaN(currentPpm)) newErrors.currentPpm = 'Current PPM cannot be negative';
    if (targetPpm <= currentPpm || isNaN(targetPpm)) {
      newErrors.targetPpm = 'Target PPM must be greater than current PPM';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Room Dimensions</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="room-w" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Width (ft)</label>
                <input
                  id="room-w"
                  type="number"
                  value={width}
                  onChange={(e) => { setWidth(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                {errors.width && <p className="text-xs text-red-500 mt-1 font-medium">{errors.width}</p>}
              </div>

              <div>
                <label htmlFor="room-l" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Length (ft)</label>
                <input
                  id="room-l"
                  type="number"
                  value={length}
                  onChange={(e) => { setLength(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                {errors.length && <p className="text-xs text-red-500 mt-1 font-medium">{errors.length}</p>}
              </div>

              <div>
                <label htmlFor="room-h" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">Height (ft)</label>
                <input
                  id="room-h"
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cur-ppm" className="block text-sm font-semibold text-foreground/80 mb-2">Current PPM</label>
                <input
                  id="cur-ppm"
                  type="number"
                  value={currentPpm}
                  onChange={(e) => { setCurrentPpm(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.currentPpm && <p className="text-xs text-red-500 mt-1 font-medium">{errors.currentPpm}</p>}
              </div>

              <div>
                <label htmlFor="tar-ppm" className="block text-sm font-semibold text-foreground/80 mb-2">Target PPM</label>
                <input
                  id="tar-ppm"
                  type="number"
                  value={targetPpm}
                  onChange={(e) => { setTargetPpm(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.targetPpm && <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetPpm}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve CO2
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
            <h2 className="text-xl font-bold text-foreground mb-6">Injection Required</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">CO2 Required Volume</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.co2Required.toFixed(4)} cu ft
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    To increase concentration by {results.ppmDiff} PPM
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Grow Room Volume:</span>
                  <span className="text-foreground font-bold">{results.volume.toLocaleString()} cu ft</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter grow room variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
