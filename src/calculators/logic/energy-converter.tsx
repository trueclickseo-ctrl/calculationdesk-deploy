'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Energy Converter translates scientific and thermal energy metrics, including Joules (J), Kilojoules (kJ), Calories (cal), Food Kilocalories (kcal), Watt-hours (Wh), Kilowatt-hours (kWh), and BTUs.`,
  formula: `Energy conversions map values to a base unit of Joules ($J$):

- Value in Joules ($J$):
  $$J = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{J}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 1 Kilowatt-hour (kWh) to Megajoules (MJ):**
- 1 kWh = 3,600,000 Joules (3.6 MJ).
- Output = **3.6 MJ**.`,
  faqs: [
    {
      q: 'What is the difference between a calorie and a Calorie?',
      a: 'In nutrition, "Calories" (capital C) refers to Kilocalories (kcal or 1,000 small chemistry calories), which is the energy required to raise the temperature of 1 kg of water by 1°C.',
    },
    {
      q: 'What is a British Thermal Unit (BTU)?',
      a: 'A BTU is an traditional English unit of energy equal to the amount of heat required to raise the temperature of one pound of liquid water by 1°F. It is equal to approximately 1,055 Joules.',
    },
    {
      q: 'How are Kilowatt-hours (kWh) related to Joules?',
      a: 'One Kilowatt-hour is equivalent to exactly 3.6 million Joules (3.6 MJ).',
    },
  ],
};

const ENERGY_UNITS = [
  { name: 'Joule (J)', key: 'J', factor: 1 },
  { name: 'Kiloule (kJ)', key: 'kJ', factor: 1000 },
  { name: 'Calorie (cal)', key: 'cal', factor: 4.184 },
  { name: 'Kilocalorie (kcal / Cal)', key: 'kcal', factor: 4184 },
  { name: 'Watt-hour (Wh)', key: 'Wh', factor: 3600 },
  { name: 'Kilowatt-hour (kWh)', key: 'kWh', factor: 3600000 },
  { name: 'British Thermal Unit (BTU)', key: 'BTU', factor: 1055.05585262 },
  { name: 'Foot-pound (ft·lb)', key: 'ft·lb', factor: 1.3558179483314 },
];

export default function EnergyConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('kWh');
  const [toUnit, setToUnit] = useState<string>('kcal');

  const handleReset = () => {
    setValue(1);
    setFromUnit('kWh');
    setToUnit('kcal');
  };

  const fromObj = ENERGY_UNITS.find((u) => u.key === fromUnit) || ENERGY_UNITS[5];
  const toObj = ENERGY_UNITS.find((u) => u.key === toUnit) || ENERGY_UNITS[3];

  // Convert
  const joulesVal = value * fromObj.factor;
  const convertedVal = joulesVal / toObj.factor;

  // Equivalencies
  const gridResults = ENERGY_UNITS.map((u) => ({
    ...u,
    val: joulesVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Energy</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="convert-value" className="block text-sm font-semibold text-foreground/80 mb-2">Value to Convert</label>
              <input
                id="convert-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from-unit" className="block text-sm font-semibold text-foreground/80 mb-2">From Unit</label>
                <select
                  id="from-unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {ENERGY_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="to-unit" className="block text-sm font-semibold text-foreground/80 mb-2">To Unit</label>
                <select
                  id="to-unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {ENERGY_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
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
            <h2 className="text-xl font-bold text-foreground mb-6">Conversion Result</h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Converted Output</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  {value.toLocaleString(undefined, { maximumFractionDigits: 6 })} {fromObj.key} = {convertedVal.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toObj.key}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">All Equivalencies</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gridResults.map((u) => (
                    <div key={u.key} className="rounded-lg bg-background p-3 border border-border text-center">
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">{u.key}</span>
                      <span className="block text-sm font-bold text-foreground mt-0.5 truncate" title={u.val.toString()}>
                        {u.val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
