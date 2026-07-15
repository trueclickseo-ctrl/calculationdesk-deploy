'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Corn Yield Estimator calculates expected bushels of corn per acre using standard kernel counts and row lengths representing 1/1000th of an acre.`,
  formula: `Agricultural corn yield estimations utilize standard kernel density averages:

**Estimated Bushels per Acre (bu/acre):**
$$\\text{Yield} = \\frac{\\text{Ear Count} \\times \\text{Kernel Rows per Ear} \\times \\text{Kernels per Row}}{\\text{Kernel Size Factor}}$$
*The Kernel Size Factor defaults to 90 (representing 90,000 kernels per bushel).*

**Row Length for 1/1000th Acre:**
- 30-inch rows = 17 feet 5 inches.
- 36-inch rows = 14 feet 6 inches.
- 38-inch rows = 13 feet 9 inches.`,
  example: `**Estimate yield for a field with 30-inch rows, containing 32 ears in 17'5" length, averaging 16 kernel rows and 40 kernels per row:**
- Total kernels per 1/1000th acre = 32 × 16 × 40 = 20,480 kernels.
- Estimated Yield = 20,480 / 90 = **227.6 Bushels per Acre**.`,
  faqs: [
    {
      q: 'What is the 1/1000th of an acre row method?',
      a: 'It is a standard field estimation method. Because counting an entire acre is impossible, farmers count the ears in a specific short row length representing exactly 1/1000th of an acre and multiply the results.',
    },
    {
      q: 'What is the kernel size factor?',
      a: 'The factor represents the number of kernels in a bushel. 90 (90,000 kernels/bu) is the standard for average-sized grain. If the season is dry and kernels are small, you should increase the factor (e.g. to 100 or 110) to avoid overestimating yield.',
    },
    {
      q: 'When should I estimate corn yield?',
      a: 'The best time is during the "R3" milk stage or later (usually in August) when kernels are fully formed and countable.',
    },
  ],
};

export default function CornYieldCalculator() {
  const [rowSpacing, setRowSpacing] = useState<number>(30); // inches
  const [ears, setEars] = useState<number>(32); // in 1/1000th acre
  const [kernelRows, setKernelRows] = useState<number>(16);
  const [kernelsPerRow, setKernelsPerRow] = useState<number>(40);
  const [grainFactor, setGrainFactor] = useState<number>(90); // 90 = 90,000 kernels/bu
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setRowSpacing(30);
    setEars(32);
    setKernelRows(16);
    setKernelsPerRow(40);
    setGrainFactor(90);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(ears) && ears > 0 &&
                  !isNaN(kernelRows) && kernelRows > 0 &&
                  !isNaN(kernelsPerRow) && kernelsPerRow > 0 &&
                  !isNaN(grainFactor) && grainFactor > 0;

  if (isValid) {
    const yieldEstimate = (ears * kernelRows * kernelsPerRow) / grainFactor;
    
    // Row length for 1/1000th acre
    let rowLengthStr = "17' 5\"";
    if (rowSpacing === 36) rowLengthStr = "14' 6\"";
    else if (rowSpacing === 38) rowLengthStr = "13' 9\"";
    else {
      // General formula: 43560 sq ft / 1000 / (spacing / 12) = row length in feet
      const lenFt = 43.56 / (rowSpacing / 12);
      const ft = Math.floor(lenFt);
      const inches = Math.round((lenFt - ft) * 12);
      rowLengthStr = `${ft}' ${inches}"`;
    }

    results = {
      yieldEstimate,
      rowLengthStr,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (ears <= 0 || isNaN(ears)) newErrors.ears = 'Ear count must be greater than zero';
    if (kernelRows <= 0 || isNaN(kernelRows)) newErrors.rows = 'Kernel rows must be greater than zero';
    if (kernelsPerRow <= 0 || isNaN(kernelsPerRow)) newErrors.kernels = 'Kernels per row must be greater than zero';
    if (grainFactor <= 0 || isNaN(grainFactor)) newErrors.factor = 'Factor must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Field Sample Setup</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="row-spacing-select" className="block text-sm font-semibold text-foreground/80 mb-2">Row Spacing (inches)</label>
              <select
                id="row-spacing-select"
                value={rowSpacing}
                onChange={(e) => { setRowSpacing(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="30">30 inches (Row length: 17&apos; 5&quot;)</option>
                <option value="36">36 inches (Row length: 14&apos; 6&quot;)</option>
                <option value="38">38 inches (Row length: 13&apos; 9&quot;)</option>
              </select>
            </div>

            <div>
              <label htmlFor="ear-count-field" className="block text-sm font-semibold text-foreground/80 mb-2">Ear Count (in 1/1000th acre)</label>
              <input
                id="ear-count-field"
                type="number"
                value={ears}
                onChange={(e) => { setEars(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.ears && <p className="text-xs text-red-500 mt-1 font-medium">{errors.ears}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="kernel-rows-field" className="block text-sm font-semibold text-foreground/80 mb-2">Rows per Ear</label>
                <input
                  id="kernel-rows-field"
                  type="number"
                  value={kernelRows}
                  onChange={(e) => { setKernelRows(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.rows && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rows}</p>}
              </div>

              <div>
                <label htmlFor="kernels-row-field" className="block text-sm font-semibold text-foreground/80 mb-2">Kernels per Row</label>
                <input
                  id="kernels-row-field"
                  type="number"
                  value={kernelsPerRow}
                  onChange={(e) => { setKernelsPerRow(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.kernels && <p className="text-xs text-red-500 mt-1 font-medium">{errors.kernels}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="kernel-factor-select" className="block text-sm font-semibold text-foreground/80 mb-2">Kernel size factor (x 1000)</label>
              <select
                id="kernel-factor-select"
                value={grainFactor}
                onChange={(e) => { setGrainFactor(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="75">Large Kernel / Wet (75,000/bu)</option>
                <option value="90">Average size (90,000/bu)</option>
                <option value="105">Small Kernel / Dry (105,000/bu)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Yield
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
            <h2 className="text-xl font-bold text-foreground mb-6">Yield Estimate</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Crop Yield</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.yieldEstimate.toFixed(1)} Bu / Acre
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Based on standard row sampling length: {results.rowLengthStr}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter field test measurements.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
