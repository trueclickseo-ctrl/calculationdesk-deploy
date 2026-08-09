'use client';
import React, { useState } from 'react';
import { Fuel } from 'lucide-react';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState(300);
  const [mpg, setMpg] = useState(30);
  const [pricePerGallon, setPricePerGallon] = useState(3.5);
  const [result, setResult] = useState<{ gallons: number; cost: number } | null>(null);

  const calculate = () => {
    if (mpg <= 0) return;
    const gallons = distance / mpg;
    const cost = gallons * pricePerGallon;
    setResult({ gallons: Math.round(gallons * 100) / 100, cost: Math.round(cost * 100) / 100 });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Fuel className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Fuel Cost Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} placeholder="Trip Distance (miles)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={mpg} onChange={e => setMpg(Number(e.target.value))} placeholder="Fuel Efficiency (mpg)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={pricePerGallon} onChange={e => setPricePerGallon(Number(e.target.value))} placeholder="Price per Gallon ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Fuel Cost</button>
        {result !== null && (
          <p className="text-sm font-bold text-primary text-center">
            {result.gallons} gallons needed — Total Cost: ${result.cost}
          </p>
        )}
      </div>
    </div>
  );
}
