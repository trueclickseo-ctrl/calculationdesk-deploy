'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest small amounts periodically (daily, monthly, or quarterly) instead of making lump-sum payments. It promotes disciplined investing and leverages rupee cost averaging, meaning you buy more units when prices are low and fewer units when prices are high.`,
  formula: `The formula used to estimate SIP returns is:

$$M = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)$$

Where:
- **M** is the maturity amount (future value of the investment).
- **P** is the monthly investment amount.
- **i** is the periodic (monthly) rate of return (annual return rate divided by 12, and then by 100).
- **n** is the total number of monthly payments (tenure in years multiplied by 12).`,
  example: `Suppose an investor saves $1,000 every month (P) for 2 years (n = 24 payments) at an expected annual return rate of 12%.

1. Monthly rate of return (i) = 12% / 12 / 100 = 0.01 per month.
2. Number of months (n) = 24.
3. Compute maturity amount (M):
   $$M = 1,000 \\times \\frac{(1 + 0.01)^{24} - 1}{0.01} \\times (1 + 0.01)$$
   $$M = 1,000 \\times \\frac{1.26973 - 1}{0.01} \\times 1.01 \\approx \\$27,243.20$$
4. Total Invested = $1,000 × 24 = $24,000.
5. Wealth Gain = $27,243.20 - $24,000 = $3,243.20.`,
  faqs: [
    {
      q: 'Does SIP guarantee mutual fund returns?',
      a: 'No. SIP investments are subjected to market risks. The calculated returns are estimations based on the average historical performance rate you enter.',
    },
    {
      q: 'Can I change my SIP amount during the tenure?',
      a: 'Yes. Most mutual fund platforms allow you to pause, stop, step up (increase), or step down (decrease) your monthly SIP values easily without penalties.',
    },
    {
      q: 'What is the power of compounding in SIP?',
      a: 'Compounding means you earn interest on your accumulated interest. In longer SIP terms (e.g., 10+ years), the interest earned can easily exceed your actual principal investment.',
    },
  ],
};

export default function SipCalculator() {
  const [monthlyInvest, setMonthlyInvest] = useState<number>(5000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = monthlyInvest > 0 && expectedRate > 0 && expectedRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    const P = monthlyInvest;
    const r = expectedRate;
    const n = tenure * 12;
    const i = r / 12 / 100;

    let maturityAmount = 0;
    if (i === 0) {
      maturityAmount = P * n;
    } else {
      maturityAmount = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const totalInvested = P * n;
    const estReturns = Math.max(0, maturityAmount - totalInvested);

    const investedPercent = (totalInvested / maturityAmount) * 100;
    const returnsPercent = (estReturns / maturityAmount) * 100;

    results = {
      totalInvested,
      estReturns,
      maturityAmount,
      investedPercent,
      returnsPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyInvest <= 0) newErrors.monthlyInvest = 'Monthly investment must be greater than zero';
    if (expectedRate <= 0 || expectedRate > 100) newErrors.expectedRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setMonthlyInvest(5000);
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
          <h2 className="text-xl font-bold text-foreground mb-6">SIP Investment Plan</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-invest" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monthly Investment
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="monthly-invest"
                  type="number"
                  value={monthlyInvest || ''}
                  onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.monthlyInvest && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyInvest}</p>}
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
                      Invested Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInvested.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Est. Returns Earned
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
                      <span className="text-foreground/70">Invested ({results.investedPercent.toFixed(0)}%)</span>
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
