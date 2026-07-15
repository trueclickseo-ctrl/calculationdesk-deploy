'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Mutual Fund Returns Calculator estimates the maturity amount of your investments in mutual fund schemes. It supports both Systematic Investment Plans (SIP) and Lumpsum one-time investments, helping you project wealth creation based on expected annualized growth rates (CAGR).`,
  formula: `The calculator applies compound interest based on the selection:

**For SIP (Systematic Investment Plan):**
$$M = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)$$

**For Lumpsum (One-time Investment):**
$$M = P \\times (1 + r)^t$$

Where:
- **P** is the contribution (monthly for SIP, total for Lumpsum).
- **i** is the monthly return rate ($r / 12 / 100$).
- **n** is the number of months.
- **r** is the annual growth rate (divided by 100).
- **t** is the tenure in years.`,
  example: `If you invest a lumpsum amount of $10,000 at 12% p.a. expected mutual fund returns for 10 years:

1. Principal = $10,000.
2. Growth rate (r) = 12% = 0.12.
3. Tenure (t) = 10.
4. Maturity Value = $10,000 × (1.12)^{10} ≈ $31,058.48.
5. Capital Gain = $31,058.48 - $10,000 = $21,058.48.`,
  faqs: [
    {
      q: 'Are mutual fund returns guaranteed?',
      a: 'No. Mutual funds invest in stocks, bonds, or other securities. Returns fluctuate based on market movements and fund management performance; calculations are projections based on chosen interest estimates.',
    },
    {
      q: 'What is the difference between Direct and Regular mutual funds?',
      a: 'Direct mutual funds do not involve brokers or commissions, resulting in lower expense ratios (fees) and slightly higher long-term compound returns than Regular funds.',
    },
    {
      q: 'What is the CAGR in mutual funds?',
      a: 'CAGR (Compound Annual Growth Rate) represents the annualized growth of an investment over a specific time frame, factoring in annual compounding, which is the standard measure of mutual fund returns.',
    },
  ],
};

export default function MutualFundReturns() {
  const [investType, setInvestType] = useState<'sip' | 'lumpsum'>('sip');
  const [amount, setAmount] = useState<number>(5000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = amount > 0 && expectedRate > 0 && expectedRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    let maturityAmount = 0;
    let totalInvested = 0;

    if (investType === 'sip') {
      const P = amount;
      const n = tenure * 12;
      const i = expectedRate / 12 / 100;

      if (i === 0) {
        maturityAmount = P * n;
      } else {
        maturityAmount = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      }
      totalInvested = P * n;
    } else {
      const P = amount;
      const t = tenure;
      const i = expectedRate / 100;

      maturityAmount = P * Math.pow(1 + i, t);
      totalInvested = P;
    }

    const estReturns = Math.max(0, maturityAmount - totalInvested);
    const investedPercent = (totalInvested / maturityAmount) * 100;
    const returnsPercent = (estReturns / maturityAmount) * 100;

    results = {
      maturityAmount,
      totalInvested,
      estReturns,
      investedPercent,
      returnsPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount <= 0) newErrors.amount = investType === 'sip' ? 'Monthly investment must be greater than zero' : 'Lumpsum amount must be greater than zero';
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
    setAmount(investType === 'sip' ? 5000 : 50000);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Mutual Fund Returns</h2>
          
          <div className="space-y-5">
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Investment Type</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setInvestType('sip'); setAmount(5000); }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    investType === 'sip'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  SIP (Monthly)
                </button>
                <button
                  type="button"
                  onClick={() => { setInvestType('lumpsum'); setAmount(50000); }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    investType === 'lumpsum'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Lumpsum (One-time)
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                {investType === 'sip' ? 'Monthly Savings Amount' : 'One-time Investment'}
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expected-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Return (p.a.)
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
                  Duration (years)
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity Projection</h2>
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
                      Total Invested Amount
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
