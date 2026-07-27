'use client';
import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function CorrelationCalculator() {
  const [x, setX] = useState('1,2,3,4,5');
  const [y, setY] = useState('2,4,5,4,5');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const arrX = x.split(',').map(Number);
    const arrY = y.split(',').map(Number);
    if (arrX.length !== arrY.length || arrX.length === 0) {
      alert("Lists must have equal size.");
      return;
    }
    const n = arrX.length;
    const sumX = arrX.reduce((a, b) => a + b, 0);
    const sumY = arrY.reduce((a, b) => a + b, 0);
    const sumXY = arrX.reduce((acc, val, i) => acc + val * arrY[i], 0);
    const sumX2 = arrX.reduce((acc, val) => acc + val * val, 0);
    const sumY2 = arrY.reduce((acc, val) => acc + val * val, 0);

    const num = n * sumXY - sumX * sumY;
    const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    setResult(den === 0 ? 0 : Math.round((num / den) * 1000) / 1000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Correlation Coefficient Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="text" value={x} onChange={e => setX(e.target.value)} placeholder="X values (comma separated)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={y} onChange={e => setY(e.target.value)} placeholder="Y values (comma separated)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Pearson r</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Pearson r: {result}</p>}
      </div>
    </div>
  );
}