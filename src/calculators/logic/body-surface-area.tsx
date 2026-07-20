'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Body Surface Area (BSA) Calculator estimates the total surface area of the human body. BSA is widely used in clinical medicine to calculate precise dosages for chemotherapy, cardiovascular drugs, and fluid replacements.`,
  formula: `BSA is computed using several classic mathematical models (with height $H$ in cm and weight $W$ in kg):

**1. Mosteller Formula (Standard & Most Common):**
$$BSA = \\sqrt{\\frac{H \\times W}{3600}}$$

**2. DuBois & DuBois Formula:**
$$BSA = 0.007184 \\times W^{0.425} \\times H^{0.725}$$

**3. Haycock Formula:**
$$BSA = 0.024265 \\times W^{0.5378} \\times H^{0.3964}$$

**4. Gehan & George Formula:**
$$BSA = 0.0235 \\times W^{0.51456} \\times H^{0.42246}$$`,
  example: `**Calculate BSA for a person: Height = 180 cm, Weight = 80 kg (Mosteller):**
- BSA = √(180 × 80 / 3600) = √(14400 / 3600) = √4 = **2.00 m²**.`,
  faqs: [
    {
      q: 'Why is BSA preferred over weight for drug dosing?',
      a: 'BSA correlates better with metabolic rate, cardiac output, and blood flow than body weight alone, making it a more reliable metric for administering highly sensitive drugs like chemotherapy.',
    },
    {
      q: 'What is the average body surface area?',
      a: 'The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m².',
    },
    {
      q: 'Which BSA formula is the most accurate?',
      a: 'The Mosteller formula is the most widely used due to its simple calculation and high correlation with the more complex DuBois formula, which is considered the historical clinical standard.',
    },
  ],
};

type System = 'metric' | 'imperial';

export default function BodySurfaceAreaCalculator() {
  const [system, setSystem] = useState<System>('metric');

  // Metric states
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial states
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setWeightKg(70);
    setHeightCm(175);
    setWeightLbs(154);
    setHeightFt(5);
    setHeightIn(9);
    setErrors({});
  };

  // Convert inputs to metric values for calculation
  const w = system === 'metric' ? weightKg : weightLbs * 0.45359237;
  const h = system === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;

  const isValid = w > 0 && h > 0;

  let results = null;
  if (isValid) {
    // Mosteller
    const mosteller = Math.sqrt((h * w) / 3600);

    // DuBois
    const dubois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);

    // Haycock
    const haycock = 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964);

    // Gehan & George
    const gehan = 0.0235 * Math.pow(w, 0.51456) * Math.pow(h, 0.42246);

    results = {
      mosteller,
      dubois,
      haycock,
      gehan,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric') {
      if (weightKg <= 0) newErrors.weight = 'Weight must be greater than zero';
      if (heightCm <= 0) newErrors.height = 'Height must be greater than zero';
    } else {
      if (weightLbs <= 0) newErrors.weight = 'Weight must be greater than zero';
      if (heightFt < 0 || heightIn < 0 || isNaN(heightFt) || isNaN(heightIn)) newErrors.height = 'Height must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Physique Data</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setSystem('metric'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                system === 'metric'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Metric Units
            </button>
            <button
              type="button"
              onClick={() => { setSystem('imperial'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                system === 'imperial'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Imperial Units
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {system === 'metric' ? (
                <div>
                  <label htmlFor="weight-kg" className="block text-sm font-semibold text-foreground/80 mb-2">Weight (kg)</label>
                  <input
                    id="weight-kg"
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              ) : (
                <div>
                  <label htmlFor="weight-lbs" className="block text-sm font-semibold text-foreground/80 mb-2">Weight (lbs)</label>
                  <input
                    id="weight-lbs"
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              )}

              {system === 'metric' ? (
                <div>
                  <label htmlFor="height-cm" className="block text-sm font-semibold text-foreground/80 mb-2">Height (cm)</label>
                  <input
                    id="height-cm"
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              ) : (
                <div>
                  <span className="block text-sm font-semibold text-foreground/80 mb-2">Height</span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="Ft"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="In"
                    />
                  </div>
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve BSA
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
            <h2 className="text-xl font-bold text-foreground mb-6">BSA Estimates Comparison</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Mosteller BSA Estimate (Recommended)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.mosteller.toFixed(3)} m²
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-sm font-bold text-foreground">{results.dubois.toFixed(3)} m²</span>
                    <span className="block text-[9px] font-bold text-foreground/50 uppercase mt-0.5">DuBois</span>
                  </div>

                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-sm font-bold text-foreground">{results.haycock.toFixed(3)} m²</span>
                    <span className="block text-[9px] font-bold text-foreground/50 uppercase mt-0.5">Haycock</span>
                  </div>

                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-sm font-bold text-foreground">{results.gehan.toFixed(3)} m²</span>
                    <span className="block text-[9px] font-bold text-foreground/50 uppercase mt-0.5">Gehan</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter stats to estimate body surface area.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
