'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Return on Investment (ROI) Calculator computes the overall profitability of an investment. It calculates net profit, total ROI percentages, and annualized returns based on duration.`,
  formula: `ROI calculations determine total efficiency percentages and CAGR equivalent yields:

**1. Net Profit:**
$$\\text{Net Profit} = \\text{Final Value} - \\text{Initial Investment}$$

**2. Return on Investment (ROI %):**
$$\\text{ROI (\\%)} = \\left( \\frac{\\text{Net Profit}}{\\text{Initial Investment}} \\right) \\times 100$$

**3. Annualized ROI (%):**
$$\\text{Annualized ROI (\\%)} = \\left[ \\left( \\frac{\\text{Final Value}}{\\text{Initial Investment}} \\right)^{\\frac{1}{T}} - 1 \\right] \\times 100$$
Where $T$ is the investment duration in years.`,
  example: `**Calculate ROI for a $1,000 initial investment worth $1,500 after 3 years:**
- Initial Investment = $1,000. Final Value = $1,500. Duration = 3 years.
- Net Profit = 1,500 - 1,000 = **$500**.
- Total ROI = (500 / 1,000) × 100 = **50.00%**.
- Annualized ROI = [(1,500 / 1,000)^(1/3) - 1] × 100 = **14.47%** per year.`,
  faqs: [
    {
      q: 'What is Return on Investment (ROI)?',
      a: 'ROI is a financial ratio used to measure the benefit or gain of an investment relative to its initial cost, expressed as a percentage.',
    },
    {
      q: 'Why calculate Annualized ROI?',
      a: 'Annualized ROI accounts for the length of time an investment is held. It allows you to compare investments of different durations on an equal yearly basis.',
    },
    {
      q: 'Can ROI be negative?',
      a: 'Yes. If the final value of the investment is lower than the initial cost, the net profit is negative, resulting in a negative ROI (a financial loss).',
    },
  ],
};

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [finalValue, setFinalValue] = useState<number>(1200);
  const [years, setYears] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setInitialInvestment(1000);
    setFinalValue(1200);
    setYears(1);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(initialInvestment) && initialInvestment > 0 && !isNaN(finalValue) && finalValue >= 0 && !isNaN(years) && years > 0;
  if (isValid) {
    const netProfit = finalValue - initialInvestment;
    const totalRoi = (netProfit / initialInvestment) * 100;
    const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;

    results = {
      netProfit,
      totalRoi,
      annualizedRoi,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (initialInvestment <= 0 || isNaN(initialInvestment)) newErrors.initialInvestment = 'Initial investment must be greater than zero';
    if (finalValue < 0 || isNaN(finalValue)) newErrors.finalValue = 'Final value cannot be negative';
    if (years <= 0 || isNaN(years)) newErrors.years = 'Investment duration must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Investment Data</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="initial-investment" className="block text-sm font-semibold text-foreground/80 mb-2">Initial Cost ($)</label>
              <input
                id="initial-investment"
                type="number"
                value={initialInvestment}
                onChange={(e) => { setInitialInvestment(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.initialInvestment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.initialInvestment}</p>}
            </div>

            <div>
              <label htmlFor="final-value" className="block text-sm font-semibold text-foreground/80 mb-2">Final Value / Return ($)</label>
              <input
                id="final-value"
                type="number"
                value={finalValue}
                onChange={(e) => { setFinalValue(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.finalValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.finalValue}</p>}
            </div>

            <div>
              <label htmlFor="investment-years" className="block text-sm font-semibold text-foreground/80 mb-2">Duration (Years)</label>
              <input
                id="investment-years"
                type="number"
                value={years}
                onChange={(e) => { setYears(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.years && <p className="text-xs text-red-500 mt-1 font-medium">{errors.years}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Returns
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
            <h2 className="text-xl font-bold text-foreground mb-6">Investment Returns</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Net Profit Gain</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Return (ROI)</span>
                    <span className={`block text-lg font-bold mt-1 ${results.totalRoi >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {results.totalRoi.toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Annualized Return (CAGR)</span>
                    <span className={`block text-lg font-bold mt-1 ${results.annualizedRoi >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {results.annualizedRoi.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter investment values.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
