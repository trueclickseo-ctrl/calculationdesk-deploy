'use client';
import React, { useState } from 'react';
import { Globe2 } from 'lucide-react';

export default function TimeZoneCalculator() {
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(30);
  const [fromOffset, setFromOffset] = useState(0);
  const [toOffset, setToOffset] = useState(5.5);
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const totalMinutesStart = hour * 60 + minute;
    const offsetDiffMinutes = (toOffset - fromOffset) * 60;
    let totalMinutes = totalMinutesStart + offsetDiffMinutes;
    let dayShift = 0;
    while (totalMinutes < 0) { totalMinutes += 24 * 60; dayShift -= 1; }
    while (totalMinutes >= 24 * 60) { totalMinutes -= 24 * 60; dayShift += 1; }
    const h = Math.floor(totalMinutes / 60);
    const m = Math.round(totalMinutes % 60);
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const dayLabel = dayShift === 0 ? '' : dayShift > 0 ? ' (next day)' : ' (previous day)';
    setResult(`${hh}:${mm}${dayLabel}`);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Globe2 className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Time Zone Calculator</h2>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input type="number" value={hour} onChange={e => setHour(Number(e.target.value))} placeholder="Hour (0-23)" className="w-1/2 rounded-xl border border-border bg-background px-4 py-3 text-sm" />
          <input type="number" value={minute} onChange={e => setMinute(Number(e.target.value))} placeholder="Minute" className="w-1/2 rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        </div>
        <input type="number" step="0.5" value={fromOffset} onChange={e => setFromOffset(Number(e.target.value))} placeholder="From UTC Offset (e.g. -5)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" step="0.5" value={toOffset} onChange={e => setToOffset(Number(e.target.value))} placeholder="To UTC Offset (e.g. 5.5)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Convert Time</button>
        {result && <p className="text-sm font-bold text-primary text-center">Converted Time: {result}</p>}
      </div>
    </div>
  );
}
