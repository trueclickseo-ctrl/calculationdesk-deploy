'use client';

import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export const seoData = {
  whatIs: `A Systematic Withdrawal Plan (SWP) is a facility offered by mutual funds that allows investors to withdraw a specific amount of money at regular intervals (usually monthly) from their existing mutual fund investments. It is popular among retirees who want a regular monthly cash flow while keeping their remaining capital invested to earn compounding returns.`,
  formula: `SWP balances are calculated by running a monthly simulation where interest is credited first, and the withdrawal is deducted:

$$B_m = B_{m-1} \\times (1 + i) - W$$

Where:
- **B_m** is the balance at the end of month *m*.
- **B_{m-1}** is the balance at the end of the previous month.
- **i** is the monthly rate of return (annual expected rate divided by 12, and then by 100).
- **W** is the fixed monthly withdrawal amount.`,
  example: `Suppose you invest $1,000,000 (Initial Capital) and expect an 8% annual return. You plan to withdraw $8,000 every month for 1 year (12 months).

1. Monthly rate of return (i) = 8% / 12 / 100 = 0.00667 per month.
2. Month 1:
   - Interest earned = $1,000,000 × 0.00667 = $6,666.67.
   - Balance before withdrawal = $1,006,666.67.
   - Balance after $8,000 withdrawal = $998,666.67.
3. Month 2:
   - Interest earned = $998,666.67 × 0.00667 = $6,657.78.
   - Balance after $8,000 withdrawal = $997,324.45.
4. Continuing this for 12 months, the final remaining balance accumulates to approximately $983,430.
5. Total Withdrawn = $8,000 × 12 = $96,000.
6. Total Interest Earned = $79,430.`,
  faqs: [
    {
      q: 'What happens if my SWP withdrawal rate exceeds the interest return rate?',
      a: 'If you withdraw more than the investment earns in interest, your principal capital will begin to deplete. Over time, the balance may run down to zero.',
    },
    {
      q: 'Is SWP better than dividend payout plans?',
      a: 'Yes, because dividends are subject to fund performance and are not guaranteed, whereas SWP gives you a guaranteed fixed cash flow regardless of short-term market behavior.',
    },
    {
      q: 'How are withdrawals in SWP taxed?',
      a: 'Each withdrawal in an SWP is treated as a partial redemption of mutual fund units. Taxes (Capital Gains Tax) are levied only on the gains portion of the redeemed units, not the principal, which is tax-advantageous.',
    },
  ],
};

export default function SwpCalculator() {
  const [totalInvestment, setTotalInvestment] = useState<number>(1000000);
  const [withdrawal, setWithdrawal] = useState<number>(6000);
  const [expectedRate, setExpectedRate] = useState<number>(8);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = totalInvestment > 0 && withdrawal > 0 && expectedRate >= 0 && expectedRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    let currentBalance = totalInvestment;
    let totalWithdrawn = 0;
    let totalInterestEarned = 0;
    const monthlyRate = expectedRate / 12 / 100;
    const n = tenure * 12;
    let monthDepleted = 0;

    for (let month = 1; month <= n; month++) {
      const monthlyInterest = currentBalance * monthlyRate;
      totalInterestEarned += monthlyInterest;
      
      const beforeWithdrawal = currentBalance + monthlyInterest;
      if (beforeWithdrawal <= withdrawal) {
        totalWithdrawn += beforeWithdrawal;
        currentBalance = 0;
        monthDepleted = month;
        break;
      } else {
        currentBalance = beforeWithdrawal - withdrawal;
        totalWithdrawn += withdrawal;
      }
    }

    const totalPayout = totalWithdrawn + currentBalance;
    const withdrawnPercent = (totalWithdrawn / totalPayout) * 100;
    const balancePercent = (currentBalance / totalPayout) * 100;

    results = {
      finalBalance: currentBalance,
      totalWithdrawn,
      totalInterestEarned,
      monthDepleted,
      withdrawnPercent,
      balancePercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (totalInvestment <= 0) newErrors.totalInvestment = 'Total investment must be greater than zero';
    if (withdrawal <= 0) newErrors.withdrawal = 'Withdrawal amount must be greater than zero';
    if (expectedRate < 0 || expectedRate > 100) newErrors.expectedRate = 'Expected rate must be between 0% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setTotalInvestment(1000000);
    setWithdrawal(6000);
    setExpectedRate(8);
    setTenure(10);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">SWP Plan Setup</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="total-investment" className="block text-sm font-semibold text-foreground/80 mb-2">
                Total Investment Principal
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="total-investment"
                  type="number"
                  value={totalInvestment || ''}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.totalInvestment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.totalInvestment}</p>}
            </div>

            <div>
              <label htmlFor="withdrawal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monthly Withdrawal Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="withdrawal"
                  type="number"
                  value={withdrawal || ''}
                  onChange={(e) => setWithdrawal(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.withdrawal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.withdrawal}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expected-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Return
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
            <h2 className="text-xl font-bold text-foreground mb-6">SWP Summary Projections</h2>
            {results ? (
              <div className="space-y-5">
                {results.monthDepleted > 0 && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-600 dark:text-amber-500">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Capital Depleted Early!</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        Your monthly withdrawal rate is depleting your capital. The balance runs out completely in month <strong>{results.monthDepleted}</strong> (approx. {Math.floor(results.monthDepleted / 12)} years, {results.monthDepleted % 12} months).
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Remaining Balance
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1">
                      ${results.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Withdrawn Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalWithdrawn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest Accrued
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                    +{((results.totalInterestEarned / totalInvestment) * 100).toFixed(0)}% growth
                  </span>
                </div>

                {/* Proportion slider */}
                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Corpus Allocation</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-accent h-full transition-all duration-500" 
                      style={{ width: `${results.withdrawnPercent}%` }} 
                    />
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${results.balancePercent}%` }} 
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Total Withdrawn ({results.withdrawnPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Remaining Balance ({results.balancePercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to simulate withdrawal plan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
