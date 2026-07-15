'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `An Investment Return Calculator (ROI Calculator) measures the profitability and performance of an investment. It calculates your absolute returns, total profit, Return on Investment (ROI), and the Compound Annual Growth Rate (CAGR), factoring in any additional income or dividends received during the investment period.`,
  formula: `Investment return metrics are calculated using the following equations:

$$\\text{Total Profit} = \\text{Ending Value} + \\text{Dividends/Income} - \\text{Initial Investment}$$
$$\\text{Return on Investment (ROI)} = \\left(\\frac{\\text{Total Profit}}{\\text{Initial Investment}}\\right) \\times 100$$
$$\\text{CAGR} = \\left(\\frac{\\text{Ending Value} + \\text{Dividends/Income}}{\\text{Initial Investment}}\\right)^{\\frac{1}{t}} - 1$$

Where:
- **Ending Value** is the final or current value of the asset.
- **Dividends/Income** represents any interim cash distributions received.
- **Initial Investment** is the purchase cost.
- **t** is the holding tenure in years.`,
  example: `Suppose you purchase shares for $20,000, hold them for 3 years, sell them for $26,000, and receive $1,000 in dividends during this period.

1. Initial Cost = $20,000. Ending Value = $26,000. Dividends = $1,000.
2. Total Profit = $26,000 + $1,000 - $20,000 = $7,000.
3. ROI = ($7,000 / $20,000) × 100 = 35%.
4. CAGR over 3 years:
   $$\\text{CAGR} = \\left(\\frac{27,000}{20,000}\\right)^{\\frac{1}{3}} - 1$$
   $$\\text{CAGR} = (1.35)^{0.333} - 1 \\approx 10.52\\%$$`,
  faqs: [
    {
      q: 'How does ROI differ from CAGR?',
      a: 'ROI measures the absolute return of an investment from start to finish, regardless of the time taken. CAGR measures the annualized rate of return, allowing you to see what the investment grew by *each year*, which is essential for comparing investments of different durations.',
    },
    {
      q: 'Can ROI be negative?',
      a: 'Yes. If the ending value of your investment plus any income earned is less than your initial purchase cost, your ROI will be negative, representing a net financial loss.',
    },
    {
      q: 'What is a good ROI?',
      a: 'A "good" ROI depends on the asset class and your risk tolerance. Historically, index equities average 8%–12% annually, real estate averages 6%–10%, and government bonds yield 3%–5% annually.',
    },
  ],
};

export default function InvestmentReturnCalculator() {
  const [initialValue, setInitialValue] = useState<number>(20000);
  const [endingValue, setEndingValue] = useState<number>(26000);
  const [dividends, setDividends] = useState<number>(1000);
  const [duration, setDuration] = useState<number>(3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = initialValue > 0 && endingValue >= 0 && dividends >= 0 && duration > 0 && duration <= 100;

  let results = null;
  if (isValid) {
    const totalProfit = endingValue + dividends - initialValue;
    const roi = (totalProfit / initialValue) * 100;
    const cagr = (Math.pow((endingValue + dividends) / initialValue, 1 / duration) - 1) * 100;

    results = {
      totalProfit,
      roi,
      cagr,
      multiplier: (endingValue + dividends) / initialValue,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (initialValue <= 0) newErrors.initialValue = 'Initial investment must be greater than zero';
    if (endingValue < 0) newErrors.endingValue = 'Ending value cannot be negative';
    if (dividends < 0) newErrors.dividends = 'Dividends cannot be negative';
    if (duration <= 0 || duration > 100) newErrors.duration = 'Duration must be between 1 and 100 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInitialValue(20000);
    setEndingValue(26000);
    setDividends(1000);
    setDuration(3);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Investment valuation</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="initial-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Initial Purchase Cost (Principal)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="initial-value"
                  type="number"
                  value={initialValue || ''}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.initialValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.initialValue}</p>}
            </div>

            <div>
              <label htmlFor="ending-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Current / Ending Market Value
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="ending-value"
                  type="number"
                  value={endingValue || ''}
                  onChange={(e) => setEndingValue(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.endingValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.endingValue}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dividends" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Dividends / Income Earned
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    $
                  </div>
                  <input
                    id="dividends"
                    type="number"
                    value={dividends || ''}
                    onChange={(e) => setDividends(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.dividends && <p className="text-xs text-red-500 mt-1 font-medium">{errors.dividends}</p>}
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Holding Tenure (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="duration"
                    type="number"
                    value={duration || ''}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.duration && <p className="text-xs text-red-500 mt-1 font-medium">{errors.duration}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Returns
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Return Summary</h2>
            {results ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-xl p-4 border ${
                    results.totalProfit >= 0 ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'
                  }`}>
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Absolute Return (ROI)
                    </span>
                    <span className="block text-2xl font-extrabold mt-1">
                      {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Annualized Return (CAGR)
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.cagr.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Capital Gains (Profit)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.totalProfit >= 0 ? '' : '-'}${Math.abs(results.totalProfit).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                    x{results.multiplier.toFixed(2)} value
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Value Realized
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    ${(endingValue + dividends).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    Includes current value of ${endingValue.toLocaleString()} + ${dividends.toLocaleString()} dividends.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter asset details to analyze performance.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
