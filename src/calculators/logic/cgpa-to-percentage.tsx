'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The CGPA to Percentage Calculator converts Cumulative Grade Point Average (CGPA) scores directly into equivalent percentage values. Standard educational boards (like CBSE, GTU, Mumbai University, etc.) define custom multipliers (e.g., 9.5 or 10) to map grading indexes onto percentage scales for admission forms and job applications.`,
  formula: `The conversion equations are:

**CGPA to Percentage:**
$$\\text{Percentage (\\%)} = \\text{CGPA} \\times \\text{Multiplier}$$

**Percentage to CGPA (Reverse Conversion):**
$$\\text{CGPA} = \\frac{\\text{Percentage (\\%)}}{\\text{Multiplier}}$$

Where:
- **Multiplier** is the board conversion constant (standard CBSE constant is 9.5; some universities use 10.0).`,
  example: `Suppose your CGPA is 8.8, and you are converting under standard CBSE board rules (multiplier = 9.5).

1. CGPA = 8.8.
2. Percentage = 8.8 × 9.5 = **83.6%**.

Suppose you got 76% in your board exams, and need to write it as CGPA (multiplier = 9.5):
1. Percentage = 76%.
2. CGPA = 76 / 9.5 ≈ **8.00**.`,
  faqs: [
    {
      q: 'Why does CBSE use a 9.5 multiplier?',
      a: 'CBSE derived the 9.5 factor by analyzing the average percentages obtained by students in past board examinations and mapping them onto CGPA bands for parity.',
    },
    {
      q: 'Can I use a custom multiplier?',
      a: 'Yes. While 9.5 is the most common board multiplier, some college universities use 9.3, 10.0, or custom grading formulas. This calculator allows you to enter any custom multiplier.',
    },
    {
      q: 'Is CGPA out of 10 or 4?',
      a: 'This calculator is designed for the standard 10-point scale common in countries like India. If you are converting from a US 4-point scale, the multiplier rules do not apply directly.',
    },
  ],
};

export default function CgpaToPercentage() {
  const [mode, setMode] = useState<'cgpa-to-pct' | 'pct-to-cgpa'>('cgpa-to-pct');
  const [value, setValue] = useState<number>(8.5);
  const [multiplier, setMultiplier] = useState<number>(9.5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = value >= 0 && (mode === 'cgpa-to-pct' ? value <= 10 : value <= 100) && multiplier > 0;

  let results = null;
  if (isValid) {
    let convertedValue = 0;
    if (mode === 'cgpa-to-pct') {
      convertedValue = value * multiplier;
    } else {
      convertedValue = value / multiplier;
    }

    results = {
      convertedValue,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (value < 0) newErrors.value = 'Value cannot be negative';
    if (mode === 'cgpa-to-pct' && value > 10) newErrors.value = 'CGPA cannot exceed 10.0';
    if (mode === 'pct-to-cgpa' && value > 100) newErrors.value = 'Percentage cannot exceed 100%';
    if (multiplier <= 0) newErrors.multiplier = 'Multiplier must be greater than zero';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setValue(mode === 'cgpa-to-pct' ? 8.5 : 80);
    setMultiplier(9.5);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Conversion setup</h2>
          
          <div className="space-y-5">
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Conversion Type</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setMode('cgpa-to-pct'); setValue(8.5); setErrors({}); }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    mode === 'cgpa-to-pct'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  CGPA to Percentage
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('pct-to-cgpa'); setValue(80); setErrors({}); }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    mode === 'pct-to-cgpa'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Percentage to CGPA
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="value" className="block text-sm font-semibold text-foreground/80 mb-2">
                {mode === 'cgpa-to-pct' ? 'CGPA Score (0 to 10)' : 'Percentage Value (0 to 100)'}
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="value"
                  type="number"
                  step="0.01"
                  value={value || ''}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.value && <p className="text-xs text-red-500 mt-1 font-medium">{errors.value}</p>}
            </div>

            <div>
              <label htmlFor="multiplier" className="block text-sm font-semibold text-foreground/80 mb-2">
                Conversion Multiplier
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="multiplier"
                  type="number"
                  step="0.01"
                  value={multiplier || ''}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setMultiplier(9.5)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                    multiplier === 9.5 ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground/60'
                  }`}
                >
                  CBSE (9.5)
                </button>
                <button
                  type="button"
                  onClick={() => setMultiplier(10.0)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                    multiplier === 10.0 ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground/60'
                  }`}
                >
                  10.0 scale
                </button>
              </div>
              {errors.multiplier && <p className="text-xs text-red-500 mt-1 font-medium">{errors.multiplier}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Convert Value
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Converted Result</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    {mode === 'cgpa-to-pct' ? 'Equivalent Percentage' : 'Equivalent CGPA'}
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {mode === 'cgpa-to-pct' ? `${results.convertedValue.toFixed(2)}%` : `${results.convertedValue.toFixed(2)} / 10.0`}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Formula Used
                  </span>
                  <span className="block text-sm font-semibold text-foreground/80 mt-1.5 leading-relaxed">
                    {mode === 'cgpa-to-pct' 
                      ? `Percentage = CGPA (${value}) × Multiplier (${multiplier})`
                      : `CGPA = Percentage (${value}%) ÷ Multiplier (${multiplier})`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view converted score.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
