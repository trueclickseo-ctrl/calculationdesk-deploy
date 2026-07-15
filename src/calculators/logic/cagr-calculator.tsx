'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `Compound Annual Growth Rate (CAGR) is the rate of return that would be required for an investment to grow from its initial balance to its final balance, assuming the profits were reinvested at the end of each year of the investment's lifespan. It is one of the most accurate ways to compare the performance of different investments (like stocks, mutual funds, or real estate) over time.`,
  formula: `The formula to calculate the Compound Annual Growth Rate (CAGR) is:

$$\\text{CAGR} = \\left(\\frac{\\text{Ending Value}}{\\text{Beginning Value}}\\right)^{\\frac{1}{t}} - 1$$

Where:
- **Ending Value** is the current or final valuation of the investment.
- **Beginning Value** is the initial investment purchase price.
- **t** is the total time period in years.
- To express CAGR as a percentage, multiply the result by 100.`,
  example: `Suppose you invested $10,000 in a mutual fund in 2021, and by 2026, the value grows to $20,000.

1. Beginning Value = $10,000.
2. Ending Value = $20,000.
3. Duration (t) = 5 years.
4. Calculate CAGR:
   $$\\text{CAGR} = \\left(\\frac{20,000}{10,000}\\right)^{\\frac{1}{5}} - 1$$
   $$\\text{CAGR} = (2)^{0.2} - 1$$
   $$\\text{CAGR} = 1.1487 - 1 = 0.1487 \\text{ or } 14.87\\%$$
5. The investment grew at a compound annual rate of **14.87%** over the 5 years.`,
  faqs: [
    {
      q: 'How does CAGR differ from Absolute Return?',
      a: 'Absolute Return measures the total gain or loss of an investment without considering the time factor (e.g., doubling your money is a 100% absolute return). CAGR factors in the time period, showing what the investment grew by *each year* on a compound basis.',
    },
    {
      q: 'Does CAGR account for mid-term volatility?',
      a: 'No. CAGR is a geometric average. It represents a smooth, constant annual growth rate from the starting point to the ending point, completely ignoring year-to-year market fluctuations and drawdowns.',
    },
    {
      q: 'Is CAGR useful for comparing different assets?',
      a: 'Yes, it is the industry standard for comparing performance because it normalizes returns over different time frames, allowing you to compare a stock held for 3 years with a property held for 10 years.',
    },
  ],
};

export default function CagrCalculator() {
  const [initialValue, setInitialValue] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(20000);
  const [duration, setDuration] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = initialValue > 0 && finalValue > 0 && duration > 0 && duration <= 100;

  let results = null;
  if (isValid) {
    const cagrValue = (Math.pow(finalValue / initialValue, 1 / duration) - 1) * 100;
    const absoluteReturn = ((finalValue - initialValue) / initialValue) * 100;
    const totalProfit = finalValue - initialValue;

    results = {
      cagrValue,
      absoluteReturn,
      totalProfit,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (initialValue <= 0) newErrors.initialValue = 'Initial value must be greater than zero';
    if (finalValue <= 0) newErrors.finalValue = 'Final value must be greater than zero';
    if (duration <= 0 || duration > 100) newErrors.duration = 'Duration must be between 1 and 100 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInitialValue(10000);
    setFinalValue(20000);
    setDuration(5);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Investment Valuation</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="initial-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Initial Investment Value
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
              <label htmlFor="final-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Final Valuation Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="final-value"
                  type="number"
                  value={finalValue || ''}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.finalValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.finalValue}</p>}
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-foreground/80 mb-2">
                Holding Period (years)
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

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate CAGR
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
            <h2 className="text-xl font-bold text-foreground mb-6">CAGR Calculation</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Compound Annual Growth Rate (CAGR)
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.cagrValue.toFixed(2)}%
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Absolute Return Rate
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.absoluteReturn.toFixed(2)}%
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                    x{(finalValue / initialValue).toFixed(2)} return
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Absolute Profit
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    ${results.totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter values to calculate compound growth rate.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
