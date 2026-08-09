'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find water density variations against heat parameters.',
  formula: 'Empirical polynomial density adjustments.',
  example: 'At 20°C, water density is ~998.2 kg/m³.',
  faqs: [{ q: 'When is water most dense?', a: 'Pure liquid water reaches maximum density of 1000 kg/m³ at 3.98°C.' }]
};

export default function WaterDensity() {
  const [temp, setTemp] = useState<number>(20);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setTemp(20); setResult(null); };
  const handleCalculate = () => {
    // Kell (1975) equation for the density of liquid water (kg/m^3), valid 0-100 C
    const t = temp;
    const numerator = 999.83952 + (16.945176 * t) - (7.9870401e-3 * t * t) - (46.170461e-6 * t * t * t) + (105.56302e-9 * t * t * t * t) - (280.54253e-12 * t * t * t * t * t);
    const denominator = 1 + (16.879850e-3 * t);
    setResult(numerator / denominator);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Thermal State</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Temperature (°C)</label>
              <input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Water Density</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Calculated Density</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} kg / m³</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter temperature.</div>
          )}
        </div>
      </div>
    </div>
  );
}