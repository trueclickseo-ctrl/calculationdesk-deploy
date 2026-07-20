'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Aspect Ratio Calculator finds the simplified proportional relationship between width and height, and scales images, videos, and display dimensions.`,
  formula: `Aspect ratios scale dimensions proportionally using the Greatest Common Divisor (GCD):

**1. Simplified Ratio:**
$$\\text{Ratio} = \\frac{\\text{Width}}{\\text{GCD}} : \\frac{\\text{Height}}{\\text{GCD}}$$

**2. Scaling Calculations:**
- If target width ($W_t$) is specified:
  $$H_t = W_t \\times \\left( \\frac{\\text{Height}_o}{\\text{Width}_o} \\right)$$
- If target height ($H_t$) is specified:
  $$W_t = H_t \\times \\left( \\frac{\\text{Width}_o}{\\text{Height}_o} \\right)$$`,
  example: `**Simplify 1920 x 1080 and scale to a target width of 1280:**
- GCD of 1920 and 1080 is 120.
- Simplified Aspect Ratio = (1920/120) : (1080/120) = **16:9**.
- Target Height for width 1280 = 1280 × (1080 / 1920) = **720 px**.`,
  faqs: [
    {
      q: 'What is an Aspect Ratio?',
      a: 'An aspect ratio is the proportional relationship between the width and height of an image, video, or screen, expressed as two numbers separated by a colon.',
    },
    {
      q: 'How do you calculate GCD?',
      a: 'The Greatest Common Divisor (GCD) is calculated using the Euclidean algorithm by repeatedly taking the remainder of the larger number divided by the smaller number until it reaches zero.',
    },
    {
      q: 'What is the aspect ratio of 1080p video?',
      a: 'A standard 1080p video is 1920 pixels wide by 1080 pixels high, which simplifies to a 16:9 aspect ratio.',
    },
  ],
};

export default function AspectRatioCalculator() {
  const [originalW, setOriginalW] = useState<number>(1920);
  const [originalH, setOriginalH] = useState<number>(1080);
  const [targetW, setTargetW] = useState<number>(1280);
  const [targetH, setTargetH] = useState<number>(720);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setOriginalW(1920);
    setOriginalH(1080);
    setTargetW(1280);
    setTargetH(720);
    setErrors({});
  };

  // Helper: GCD
  const getGcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  };

  // Computations
  let results = null;
  const isValidOriginal = !isNaN(originalW) && originalW > 0 && !isNaN(originalH) && originalH > 0;

  if (isValidOriginal) {
    const gcdVal = getGcd(originalW, originalH);
    const ratioW = originalW / gcdVal;
    const ratioH = originalH / gcdVal;

    results = {
      ratio: `${ratioW}:${ratioH}`,
      gcdVal,
    };
  }

  const handleScaleWidth = (val: number) => {
    setTargetW(val);
    if (isValidOriginal && val > 0) {
      setTargetH(Number((val * (originalH / originalW)).toFixed(2)));
    }
  };

  const handleScaleHeight = (val: number) => {
    setTargetH(val);
    if (isValidOriginal && val > 0) {
      setTargetW(Number((val * (originalW / originalH)).toFixed(2)));
    }
  };

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (originalW <= 0 || isNaN(originalW)) newErrors.originalW = 'Width must be greater than zero';
    if (originalH <= 0 || isNaN(originalH)) newErrors.originalH = 'Height must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Original Resolution</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="original-w" className="block text-sm font-semibold text-foreground/80 mb-2">Width</label>
                <input
                  id="original-w"
                  type="number"
                  value={originalW}
                  onChange={(e) => { setOriginalW(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.originalW && <p className="text-xs text-red-500 mt-1 font-medium">{errors.originalW}</p>}
              </div>

              <div>
                <label htmlFor="original-h" className="block text-sm font-semibold text-foreground/80 mb-2">Height</label>
                <input
                  id="original-h"
                  type="number"
                  value={originalH}
                  onChange={(e) => { setOriginalH(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.originalH && <p className="text-xs text-red-500 mt-1 font-medium">{errors.originalH}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-4">
              <h3 className="text-sm font-bold text-foreground">Proportional Scaling</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="target-w" className="block text-xs font-bold text-foreground/75 mb-2">Target Width</label>
                  <input
                    id="target-w"
                    type="number"
                    value={targetW}
                    onChange={(e) => handleScaleWidth(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>

                <div>
                  <label htmlFor="target-h" className="block text-xs font-bold text-foreground/75 mb-2">Target Height</label>
                  <input
                    id="target-h"
                    type="number"
                    value={targetH}
                    onChange={(e) => handleScaleHeight(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Aspect Ratio
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
            <h2 className="text-xl font-bold text-foreground mb-6">Scale Calculations</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Simplified Aspect Ratio</span>
                  <span className="block text-4xl font-black text-primary mt-2">
                    {results.ratio}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Greatest Common Divisor (GCD):</span>
                    <span className="text-foreground font-bold">{results.gcdVal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Proportional Scaling Status:</span>
                    <span className="text-foreground font-bold">
                      {targetW} x {targetH} ({results.ratio})
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter original resolution dimensions.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
