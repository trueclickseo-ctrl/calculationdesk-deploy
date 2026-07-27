'use client';

import React, { useState } from 'react';
import { RefreshCw, Percent } from 'lucide-react';

export default function PercentageDecreaseCalculator() {
  const [originalValue, setOriginalValue] = useState<number>(100);
  const [decreasePercent, setDecreasePercent] = useState<number>(20);

  const finalValue = originalValue - (originalValue * decreasePercent) / 100;
  const totalSaved = (originalValue * decreasePercent) / 100;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Percent className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Percentage Decrease Calculator</h2>
          <p className="text-xs text-foreground/60">Subtract a percentage from a starting value</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">
              Original Value
            </label>
            <input
              type="number"
              value={originalValue}
              onChange={(e) => setOriginalValue(Number(e.target.value))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4"
              placeholder="e.g. 100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">
              Decrease Percentage (%)
            </label>
            <input
              type="number"
              value={decreasePercent}
              onChange={(e) => setDecreasePercent(Number(e.target.value))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4"
              placeholder="e.g. 20"
            />
          </div>
        </div>

        {!isNaN(finalValue) && (
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5 mt-6 space-y-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Final Value</span>
              <p className="text-xl md:text-2xl font-black text-foreground mt-0.5 select-all">
                {finalValue.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">Amount Decreased</span>
              <p className="text-sm font-bold text-foreground mt-0.5">
                {totalSaved.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => {
              setOriginalValue(100);
              setDecreasePercent(20);
            }}
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
