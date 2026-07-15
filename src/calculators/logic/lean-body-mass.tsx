'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Lean Body Mass (LBM) Calculator estimates your fat-free body weight (the mass of your bones, muscles, organs, and skin) using standard clinical formulas established by Boer and James.`,
  formula: `LBM estimates are based on height ($H$ in cm) and weight ($W$ in kg):

**1. Boer Formula:**
- Men:
  $$LBM = 0.407 \\times W + 0.267 \\times H - 19.2$$
- Women:
  $$LBM = 0.252 \\times W + 0.473 \\times H - 48.3$$

**2. James Formula:**
- Men:
  $$LBM = 1.10 \\times W - 128 \\times \\left(\\frac{W}{H}\\right)^2$$
- Women:
  $$LBM = 1.07 \\times W - 148 \\times \\left(\\frac{W}{H}\\right)^2$$`,
  example: `**Calculate LBM for a male: Weight = 80 kg, Height = 180 cm (Boer):**
- LBM = 0.407(80) + 0.267(180) - 19.2 = 32.56 + 48.06 - 19.2 = **61.42 kg** (76.8% lean mass, 18.58 kg fat mass).`,
  faqs: [
    {
      q: 'What is Lean Body Mass (LBM)?',
      a: 'Lean Body Mass is the total weight of your body minus your fat mass. It represents the weight of muscles, organs, bones, connective tissue, and water.',
    },
    {
      q: 'Why is LBM important for fitness?',
      a: 'Tracking LBM helps ensure that when you lose weight, you are losing fat rather than valuable muscle tissue. It is also useful for calculating protein intake goals.',
    },
    {
      q: 'Which formula is better?',
      a: 'The Boer formula is generally preferred for individuals with moderate to high body fat levels, whereas the James formula is historically popular but can underestimate LBM in extremely muscular or obese individuals.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function LeanBodyMassCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');

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
    setGender('male');
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
    // Boer
    const boer = gender === 'male'
      ? 0.407 * w + 0.267 * h - 19.2
      : 0.252 * w + 0.473 * h - 48.3;

    // James
    const james = gender === 'male'
      ? 1.1 * w - 128 * Math.pow(w / h, 2)
      : 1.07 * w - 148 * Math.pow(w / h, 2);

    results = {
      boer: Math.max(0, boer),
      james: Math.max(0, james),
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

  const formatWeight = (kg: number) => {
    if (system === 'metric') {
      return `${kg.toFixed(1)} kg`;
    } else {
      const lbs = kg * 2.20462262;
      return `${lbs.toFixed(1)} lbs`;
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
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Gender</span>
              <div className="flex gap-2">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g as Gender)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border cursor-pointer capitalize transition-all ${
                      gender === g
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background hover:bg-border text-foreground/70'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

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
                Solve Lean Mass
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
            <h2 className="text-xl font-bold text-foreground mb-6">Lean Estimates comparison</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Boer LBM Estimate (Recommended)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {formatWeight(results.boer)}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    Lean Fraction: {((results.boer / w) * 100).toFixed(1)}% &nbsp;|&nbsp; Fat Mass: {formatWeight(w - results.boer)}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider font-mono">James LBM Estimate</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {formatWeight(results.james)}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    Lean Fraction: {((results.james / w) * 100).toFixed(1)}% &nbsp;|&nbsp; Fat Mass: {formatWeight(w - results.james)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter height & weight data.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
