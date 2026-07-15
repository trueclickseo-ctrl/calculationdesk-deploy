'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Battery Life Calculator estimates the operational run time of rechargeable battery cells based on nominal capacity, load current, and safety discharge thresholds.`,
  formula: `Battery duration estimates account for safety margins (Depth of Discharge):

$$\\text{Run Time (Hours)} = \\frac{\\text{Capacity (mAh)} \\times \\left(1 - \\frac{\\text{Discharge Margin \\%}}{100}\\right)}{\\text{Device Consumption (mA)}}$$
Where the safety margin prevents full voltage collapse (usually set to 15-30% for Li-ion).`,
  example: `**Calculate runtime for a 2,000 mAh battery powering a 200 mA sensor with a 20% safety margin:**
- Usable capacity = 2,000 mAh × (1 - 0.20) = 1,600 mAh.
- Run Time = 1,600 mAh / 200 mA = **8 hours** (8h 0m).`,
  faqs: [
    {
      q: 'What is battery capacity (mAh)?',
      a: 'mAh stands for Milliampere-hour. It measures the electric charge a battery can deliver at a specific current rate over one hour.',
    },
    {
      q: 'Why should I leave a discharge safety margin?',
      a: 'Completely discharging batteries (especially lithium-ion or lead-acid chemistries) to 0% degrades active materials, reduces cycle life, and can cause permanent cell damage or failure.',
    },
    {
      q: 'How does temperature affect battery life?',
      a: 'Cold temperatures increase internal battery resistance, temporarily reducing usable capacity, whereas excessive heat speeds up chemical degradation and shortens the battery\'s overall lifespan.',
    },
  ],
};

export default function BatteryLifeCalculator() {
  const [capacity, setCapacity] = useState<number>(2000);
  const [draw, setDraw] = useState<number>(200);
  const [margin, setMargin] = useState<number>(20);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setCapacity(2000);
    setDraw(200);
    setMargin(20);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(capacity) && capacity > 0 &&
                  !isNaN(draw) && draw > 0 &&
                  !isNaN(margin) && margin >= 0 && margin < 100;

  if (isValid) {
    const usableCapacity = capacity * (1 - margin / 100);
    const totalHours = usableCapacity / draw;
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);
    const minutes = Math.round((totalHours * 60) % 60);

    const formattedTime = [];
    if (days > 0) formattedTime.push(`${days}d`);
    if (hours > 0 || days > 0) formattedTime.push(`${hours}h`);
    formattedTime.push(`${minutes}m`);

    results = {
      hours: totalHours,
      formatted: formattedTime.join(' '),
      usableCapacity,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (capacity <= 0 || isNaN(capacity)) newErrors.capacity = 'Capacity must be greater than zero';
    if (draw <= 0 || isNaN(draw)) newErrors.draw = 'Current draw must be greater than zero';
    if (margin < 0 || margin >= 100 || isNaN(margin)) newErrors.margin = 'Safety margin must be between 0% and 99%';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Battery Parameters</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="battery-capacity" className="block text-sm font-semibold text-foreground/80 mb-2">Battery Capacity (mAh)</label>
              <input
                id="battery-capacity"
                type="number"
                value={capacity}
                onChange={(e) => { setCapacity(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.capacity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.capacity}</p>}
            </div>

            <div>
              <label htmlFor="current-draw" className="block text-sm font-semibold text-foreground/80 mb-2">Device Current Draw (mA)</label>
              <input
                id="current-draw"
                type="number"
                value={draw}
                onChange={(e) => { setDraw(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.draw && <p className="text-xs text-red-500 mt-1 font-medium">{errors.draw}</p>}
            </div>

            <div>
              <label htmlFor="discharge-margin" className="block text-sm font-semibold text-foreground/80 mb-2">Safety Discharge Margin (%)</label>
              <input
                id="discharge-margin"
                type="number"
                value={margin}
                onChange={(e) => { setMargin(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.margin && <p className="text-xs text-red-500 mt-1 font-medium">{errors.margin}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Battery Life
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
            <h2 className="text-xl font-bold text-foreground mb-6">Runtime Estimates</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Battery Run Time</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.formatted}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Usable Capacity</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {Math.round(results.usableCapacity).toLocaleString()} mAh
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Estimated Run Hours</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.hours.toFixed(2)} hours
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter battery specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
