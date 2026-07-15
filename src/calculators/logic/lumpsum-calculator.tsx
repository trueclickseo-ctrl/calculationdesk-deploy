'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Lumpsum Investment is a one-time allocation of funds into a financial vehicle (like mutual funds, stocks, or bank deposits) rather than distributing the investment over periodic installments (such as SIPs). It is suitable for investors who have acquired surplus capital (e.g., through bonuses, inheritances, or assets sales) and want it to compound over a long term.`,
  formula: `Lumpsum investments compound annually using the standard compound interest equation:

$$A = P \\times (1 + r)^t$$

Where:
- **A** is the estimated maturity amount.
- **P** is the initial lumpsum principal investment.
- **r** is the expected annual rate of return (divided by 100).
- **t** is the investment tenure in years.`,
  example: `Suppose you invest a lumpsum amount of $50,000 (P) for 10 years (t) at an expected annual rate of return of 12% (r = 0.12).

1. Expected rate (r) = 12% = 0.12.
2. Tenure (t) = 10.
3. Compute maturity amount (A):
   $$A = 50,000 \\times (1 + 0.12)^{10}$$
   $$A = 50,000 \\times (1.12)^{10}$$
   $$A = 50,000 \\times 3.10585 \\approx \\$155,292.41$$
4. Total Invested = $50,000.
5. Wealth Gain = $155,292.41 - $50,000 = $105,292.41.`,
  faqs: [
    {
      q: 'When is a lumpsum investment better than an SIP?',
      a: 'Lumpsum investments generally outperform SIPs in a bullish or trending up-market because the entire capital gets maximum time to compound. However, SIPs are safer during market corrections due to cost averaging.',
    },
    {
      q: 'What is the compounding frequency of mutual fund lumpsum estimations?',
      a: 'Standard lumpsum mutual fund calculators assume annual compounding returns. Real-life equity fund yields depend on NAV changes, but annual compounding is the standard industry practice for projections.',
    },
    {
      q: 'Does lumpsum investment have lock-in periods?',
      a: 'Most open-ended mutual funds have no lock-in, except tax-saving mutual funds (like ELSS, which have a 3-year lock-in). Equity funds may charge a small exit load if redeemed within 1 year.',
    },
  ],
};

export default function LumpsumCalculator() {
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(50000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = lumpsumAmount > 0 && expectedRate > 0 && expectedRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    const P = lumpsumAmount;
    const r = expectedRate;
    const t = tenure;
    const i = r / 100;

    const maturityAmount = P * Math.pow(1 + i, t);
    const estReturns = Math.max(0, maturityAmount - P);

    const investedPercent = (P / maturityAmount) * 100;
    const returnsPercent = (estReturns / maturityAmount) * 100;

    results = {
      maturityAmount,
      estReturns,
      investedPercent,
      returnsPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (lumpsumAmount <= 0) newErrors.lumpsumAmount = 'Lumpsum amount must be greater than zero';
    if (expectedRate <= 0 || expectedRate > 100) newErrors.expectedRate = 'Expected rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setLumpsumAmount(50000);
    setExpectedRate(12);
    setTenure(10);
    setErrors({});
  };

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const investedStroke = results ? (results.investedPercent / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Lumpsum Investment Return</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="lumpsum-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Total Lumpsum Investment
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="lumpsum-amount"
                  type="number"
                  value={lumpsumAmount || ''}
                  onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.lumpsumAmount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.lumpsumAmount}</p>}
            </div>

            <div>
              <label htmlFor="expected-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                Expected Return Rate (p.a.)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="expected-rate"
                  type="number"
                  step="0.1"
                  value={expectedRate || ''}
                  onChange={(e) => setExpectedRate(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.expectedRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.expectedRate}</p>}
            </div>

            <div>
              <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                Time Period (years)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="tenure"
                  type="number"
                  value={tenure || ''}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate
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
            <h2 className="text-xl font-bold text-foreground mb-6">Investment Projection</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Expected Maturity Amount
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Invested Principal
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${lumpsumAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Est. Wealth returns
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.estReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-44 w-44">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--primary)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--accent)"
                        strokeWidth="12.5"
                        strokeDasharray={circ}
                        strokeDashoffset={investedStroke}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Wealth Gain
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.returnsPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Principal ({results.investedPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Returns ({results.returnsPercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view projections.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
