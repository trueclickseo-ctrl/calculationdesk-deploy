'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Target Heart Rate Calculator maps out your cardiovascular workout intensity training zones (such as Fat Burn, Aerobic, and Anaerobic thresholds) using your age, resting heart rate, and the standard Karvonen formula.`,
  formula: `Workout heart rate target zones are computed using two methods:

**1. Standard Method (Astrand Formula):**
- Maximum Heart Rate (MHR):
  $$MHR = 220 - \\text{Age}$$
- Target Zone boundaries:
  $$\\text{HR} = MHR \\times \\text{Intensity Percentage}$$

**2. Karvonen Method (Recommended):**
- Heart Rate Reserve (HRR):
  $$HRR = MHR - \\text{Resting Heart Rate (RHR)}$$
- Target Zone boundaries:
  $$\\text{HR} = RHR + (HRR \\times \\text{Intensity Percentage})$$`,
  example: `**Calculate Aerobic target (70% to 80%) for a 30-year-old with RHR of 60 bpm (Karvonen):**
- MHR = 220 - 30 = 190 bpm.
- HRR = 190 - 60 = 130 bpm.
- 70% Limit = 60 + 0.70(130) = **151 bpm**.
- 80% Limit = 60 + 0.80(130) = **164 bpm**.
- Target Aerobic Range = **151 to 164 bpm**.`,
  faqs: [
    {
      q: 'Why is the Karvonen formula preferred?',
      a: 'The Karvonen formula is more personalized because it incorporates your resting heart rate (RHR), which serves as an indicator of your baseline cardiorespiratory fitness level.',
    },
    {
      q: 'What is the "Fat Burn" zone?',
      a: 'The Fat Burn zone is typically between 60% and 70% of your maximum heart rate. At this intensity, your body burns a higher percentage of calories from fat, although total calorie burn is lower than at high intensities.',
    },
    {
      q: 'Is the "220 - Age" formula accurate?',
      a: 'It is a general population estimate. Individual maximum heart rates can vary by 10 to 15 beats per minute due to genetics, fitness history, and altitude.',
    },
  ],
};

type HRMethod = 'standard' | 'karvonen';

interface Zone {
  name: string;
  intensity: string;
  lowerPct: number;
  upperPct: number;
  color: string;
  desc: string;
}

const ZONES: Zone[] = [
  { name: 'Zone 1: Warm Up', intensity: '50% - 60%', lowerPct: 0.5, upperPct: 0.6, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', desc: 'Active recovery, easy breathing' },
  { name: 'Zone 2: Fat Burn', intensity: '60% - 70%', lowerPct: 0.6, upperPct: 0.7, color: 'text-teal-500 bg-teal-500/10 border-teal-500/20', desc: 'Basic endurance, moderate conversation possible' },
  { name: 'Zone 3: Aerobic', intensity: '70% - 80%', lowerPct: 0.7, upperPct: 0.8, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', desc: 'Cardiovascular fitness expansion, deeper breathing' },
  { name: 'Zone 4: Anaerobic', intensity: '80% - 90%', lowerPct: 0.8, upperPct: 0.9, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', desc: 'Improved lactic acid tolerance, hard effort' },
  { name: 'Zone 5: Maximum', intensity: '90% - 100%', lowerPct: 0.9, upperPct: 1.0, color: 'text-red-500 bg-red-500/10 border-red-500/20', desc: 'Sprints, maximal performance effort' }
];

export default function HeartRateCalculator() {
  const [method, setMethod] = useState<HRMethod>('karvonen');
  const [age, setAge] = useState<number>(25);
  const [rhr, setRhr] = useState<number>(60);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setMethod('karvonen');
    setAge(25);
    setRhr(60);
    setErrors({});
  };

  const isValid = !isNaN(age) && age > 0 && !isNaN(rhr) && rhr >= 30 && rhr <= 120;

  let results = null;
  if (isValid) {
    const mhr = 220 - age;
    const hrr = mhr - rhr;

    const zoneRanges = ZONES.map(z => {
      let lower = 0;
      let upper = 0;

      if (method === 'standard') {
        lower = Math.round(mhr * z.lowerPct);
        upper = Math.round(mhr * z.upperPct);
      } else {
        lower = Math.round(rhr + hrr * z.lowerPct);
        upper = Math.round(rhr + hrr * z.upperPct);
      }

      return {
        ...z,
        lower,
        upper,
      };
    });

    results = {
      mhr,
      hrr,
      zoneRanges,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (age <= 0 || isNaN(age) || age > 110) newErrors.age = 'Age must be between 1 and 110 years';
    if (rhr < 30 || rhr > 120 || isNaN(rhr)) newErrors.rhr = 'Resting Heart Rate must be between 30 and 120 bpm';
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
              onClick={() => setMethod('karvonen')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                method === 'karvonen'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Karvonen Method
            </button>
            <button
              type="button"
              onClick={() => setMethod('standard')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                method === 'standard'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Standard Method
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="age-num" className="block text-sm font-semibold text-foreground/80 mb-2">Age (Years)</label>
              <input
                id="age-num"
                type="number"
                value={age}
                onChange={(e) => { setAge(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
            </div>

            {method === 'karvonen' && (
              <div>
                <label htmlFor="rhr-num" className="block text-sm font-semibold text-foreground/80 mb-2">Resting Heart Rate (bpm)</label>
                <input
                  id="rhr-num"
                  type="number"
                  value={rhr}
                  onChange={(e) => { setRhr(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.rhr && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rhr}</p>}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Heart Zones
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
            <h2 className="text-xl font-bold text-foreground mb-6">Target Heart Rate Zones</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Max Heart Rate</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">{results.mhr} bpm</span>
                  </div>
                  {method === 'karvonen' && (
                    <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Heart Rate Reserve</span>
                      <span className="block text-2xl font-extrabold text-accent mt-1">{results.hrr} bpm</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {results.zoneRanges.map((z, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex justify-between items-center ${z.color}`}>
                      <div>
                        <span className="block text-xs font-bold">{z.name} ({z.intensity})</span>
                        <span className="block text-[10px] opacity-75 mt-0.5">{z.desc}</span>
                      </div>
                      <div className="text-right text-sm font-extrabold">
                        {z.lower} – {z.upper} bpm
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter heart statistics.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
