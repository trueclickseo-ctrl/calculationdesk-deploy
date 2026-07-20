'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Solar Panel Capacity Planner calculates home solar system sizing, total panels required, and estimated daily energy generation based on average household electricity usage and sunlight hours.`,
  formula: `Solar array sizing projects daily energy usage adjusted for equipment efficiencies:

**1. Daily Target Energy ($E_{day}$, in kWh):**
$$E_{day} = \\frac{\\text{Monthly kWh Usage}}{30.4}$$

**2. Required DC System Size ($P_{sys}$, in kW):**
$$P_{sys} = \\frac{E_{day}}{\\text{Sun Hours} \\times \\left(\\frac{\\text{Efficiency \\%}}{100}\\right)}$$

**3. Solar Panels Required ($N$):**
$$N = \\frac{P_{sys} \\times 1,000}{\\text{Panel Wattage (W)}}$$`,
  example: `**Size a system for 900 kWh/month usage, 4.5 peak sun hours, using 400W panels at 80% system efficiency:**
- Daily Target $E_{day}$ = 900 / 30.4 = **29.61 kWh/day**.
- Required Size $P_{sys}$ = 29.61 / (4.5 × 0.8) = **8.225 kW** (8,225 Watts).
- Panel count $N$ = 8,225 / 400 = 20.56 (**21 panels**).`,
  faqs: [
    {
      q: 'What are peak sun hours?',
      a: 'Peak sun hours is the duration during which solar irradiance averages 1,000 Watts per square meter. It is not the total daylight hours, but a normalized value representing solar intensity (ranging from 3 to 6 hours daily in most regions).',
    },
    {
      q: 'Why is system efficiency set to 80%?',
      a: 'A solar power system suffers energy losses during DC-to-AC conversion (inverters), wiring resistances, dust accumulation, shading, and panel heating. 75% to 80% is the industry standard for realistic net output planning.',
    },
    {
      q: 'How much roof space do I need for solar panels?',
      a: 'A standard residential solar panel (approx. 400W) measures about 17.5 square feet. A 20-panel system requires approximately 350 square feet of unshaded roof space.',
    },
  ],
};

export default function SolarPanelCalculator() {
  const [usage, setUsage] = useState<number>(800);
  const [sunHours, setSunHours] = useState<number>(4.5);
  const [panelWattage, setPanelWattage] = useState<number>(400);
  const [efficiency, setEfficiency] = useState<number>(80);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setUsage(800);
    setSunHours(4.5);
    setPanelWattage(400);
    setEfficiency(80);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(usage) && usage > 0 &&
                  !isNaN(sunHours) && sunHours > 0 &&
                  !isNaN(panelWattage) && panelWattage > 0 &&
                  !isNaN(efficiency) && efficiency > 0 && efficiency <= 100;

  if (isValid) {
    const dailyKwh = usage / 30.4;
    const sysSizeKw = dailyKwh / (sunHours * (efficiency / 100));
    const panelsNeeded = Math.ceil((sysSizeKw * 1000) / panelWattage);
    const actualSystemWatts = panelsNeeded * panelWattage;

    results = {
      dailyKwh,
      sysSizeKw,
      panelsNeeded,
      actualSystemWatts,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (usage <= 0 || isNaN(usage)) newErrors.usage = 'Monthly usage must be greater than zero';
    if (sunHours <= 0 || isNaN(sunHours)) newErrors.sunHours = 'Peak sun hours must be greater than zero';
    if (panelWattage <= 0 || isNaN(panelWattage)) newErrors.panelWattage = 'Panel wattage must be greater than zero';
    if (efficiency <= 0 || efficiency > 100 || isNaN(efficiency)) {
      newErrors.efficiency = 'System efficiency must be between 1% and 100%';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Solar System Settings</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-usage" className="block text-sm font-semibold text-foreground/80 mb-2">Monthly Usage (kWh)</label>
              <input
                id="monthly-usage"
                type="number"
                value={usage}
                onChange={(e) => { setUsage(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.usage && <p className="text-xs text-red-500 mt-1 font-medium">{errors.usage}</p>}
            </div>

            <div>
              <label htmlFor="sun-hours" className="block text-sm font-semibold text-foreground/80 mb-2">Average Daily Sun Hours</label>
              <input
                id="sun-hours"
                type="number"
                step="0.1"
                value={sunHours}
                onChange={(e) => { setSunHours(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.sunHours && <p className="text-xs text-red-500 mt-1 font-medium">{errors.sunHours}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="panel-watts" className="block text-sm font-semibold text-foreground/80 mb-2">Panel Wattage (W)</label>
                <input
                  id="panel-watts"
                  type="number"
                  value={panelWattage}
                  onChange={(e) => { setPanelWattage(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.panelWattage && <p className="text-xs text-red-500 mt-1 font-medium">{errors.panelWattage}</p>}
              </div>

              <div>
                <label htmlFor="efficiency-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Efficiency (%)</label>
                <input
                  id="efficiency-rate"
                  type="number"
                  value={efficiency}
                  onChange={(e) => { setEfficiency(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.efficiency && <p className="text-xs text-red-500 mt-1 font-medium">{errors.efficiency}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Solar System
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
            <h2 className="text-xl font-bold text-foreground mb-6">System Requirements</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Recommended Solar Panels</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.panelsNeeded} Panels
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    using {panelWattage}W modules
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Required System Size</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.sysSizeKw.toFixed(2)} kW
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Actual Array Wattage</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {(results.actualSystemWatts / 1000).toFixed(2)} kW ({results.actualSystemWatts.toLocaleString()}W)
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Daily Energy Required:</span>
                  <span className="text-foreground font-bold">{results.dailyKwh.toFixed(2)} kWh / day</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter household electricity variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
