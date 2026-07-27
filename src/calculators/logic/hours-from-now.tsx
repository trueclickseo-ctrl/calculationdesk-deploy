'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock } from 'lucide-react';

export default function HoursFromNowCalculator() {
  const [hours, setHours] = useState<number>(24);
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
    setResult(futureDate.toLocaleString());
  };

  useEffect(() => {
    calculate();
  }, [hours]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Hours From Now Calculator</h2>
          <p className="text-xs text-foreground/60">Find the exact time and date in the future</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">
            Number of Hours
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-ring-custom"
            placeholder="e.g. 24"
          />
        </div>

        {result && (
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5 mt-6">
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Resulting Date & Time</span>
            <p className="text-xl md:text-2xl font-black text-foreground mt-1 select-all">
              {result}
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              Exactly {hours} hours from current local time.
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setHours(24)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground/80 hover:bg-background transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
