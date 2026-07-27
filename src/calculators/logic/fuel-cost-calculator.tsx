'use client';
import React, { useState } from 'react';
import { Settings } from 'lucide-react';

export default function FuelCostCalculatorComponent() {
  const [val, setVal] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    setResult(val * 1.05);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Fuel Cost Calculator</h2>
      </div>
      <div className="space-y-4">
        <input
          type="number"
          value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
        />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">
          Calculate
        </button>
        {result !== null && (
          <p className="text-sm font-bold text-primary text-center mt-4">
            Result: {result}
          </p>
        )}
      </div>
    </div>
  );
}
