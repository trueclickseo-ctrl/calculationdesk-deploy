'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Step-Up SIP (Systematic Investment Plan) is a financial strategy where you increase your monthly investment amount by a fixed percentage or amount every year. As your income increases over time, stepping up your SIP allows you to compound wealth much faster and reach your financial goals significantly earlier.`,
  formula: `Step-Up SIP calculations compound monthly, increasing the investment amount annually:

$$\\text{Monthly Contribution during year } y = P \\times (1 + S)^{y-1}$$

For each month:
$$A_m = (A_{m-1} + P_{\\text{current}}) \\times (1 + i)$$

Where:
- **A_m** is the balance at the end of month *m*.
- **P_current** is the monthly contribution for the current year.
- **i** is the monthly rate of return (annual return rate divided by 12, and then by 100).
- **S** is the annual step-up percentage (divided by 100).`,
  example: `Suppose you start a monthly SIP of $5,000 (P) at a 12% expected annual return. You choose a 10% annual step-up (S) for 5 years.

- **Year 1:** Monthly SIP = $5,000. Total invested = $60,000.
- **Year 2:** Monthly SIP = $5,000 × 1.10 = $5,500. Total invested = $66,000.
- **Year 3:** Monthly SIP = $5,500 × 1.10 = $6,050. Total invested = $72,600.
- **Year 4:** Monthly SIP = $6,655.
- **Year 5:** Monthly SIP = $7,320.50.
- **After 5 years:**
  - Total Invested ≈ $374,271.
  - Total Maturity Amount ≈ $525,483.
  - Wealth Gain ≈ $151,212.`,
  faqs: [
    {
      q: 'How does Step-Up SIP compare to a normal SIP?',
      a: 'A Step-Up SIP significantly outperforms a standard SIP because it aligns your investments with salary hikes. Stepping up your investment by just 10% every year can double your final corpus over long periods.',
    },
    {
      q: 'Can I set a fixed dollar amount for step-up instead of a percentage?',
      a: 'Yes, platforms allow you to increase SIPs by either a fixed percentage (e.g., 10% yearly) or a fixed amount (e.g., $500 yearly). Percentage step-up is the standard projection model.',
    },
    {
      q: 'Is there any limit to the step-up value?',
      a: 'No. You can choose any step-up rate depending on your financial capability and income growth forecasts.',
    },
  ],
};

export default function StepUpSipCalculator() {
  const [monthlyInvest, setMonthlyInvest] = useState<number>(5000);
  const [stepUp, setStepUp] = useState<number>(10);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = monthlyInvest > 0 && stepUp >= 0 && stepUp <= 100 && 
                  expectedRate > 0 && expectedRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    let currentBalance = 0;
    let totalInvested = 0;
    const monthlyRate = expectedRate / 12 / 100;
    let monthlyContribution = monthlyInvest;

    for (let m = 1; m <= tenure * 12; m++) {
      // Step up at the beginning of each year (starting from month 13, 25, 37...)
      if (m > 1 && (m - 1) % 12 === 0) {
        monthlyContribution = monthlyContribution * (1 + stepUp / 100);
      }
      currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
      totalInvested += monthlyContribution;
    }

    const estReturns = Math.max(0, currentBalance - totalInvested);
    const investedPercent = (totalInvested / currentBalance) * 100;
    const returnsPercent = (estReturns / currentBalance) * 100;

    results = {
      maturityAmount: currentBalance,
      totalInvested,
      estReturns,
      investedPercent,
      returnsPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyInvest <= 0) newErrors.monthlyInvest = 'Monthly investment must be greater than zero';
    if (stepUp < 0 || stepUp > 100) newErrors.stepUp = 'Step-up rate must be between 0% and 100%';
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
    setMonthlyInvest(5000);
    setStepUp(10);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Step-Up SIP Planner</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-invest" className="block text-sm font-semibold text-foreground/80 mb-2">
                Initial Monthly Investment
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="step-up" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Annual Step-Up
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="step-up"
                    type="number"
                    value={stepUp || ''}
                    onChange={(e) => setStepUp(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.stepUp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.stepUp}</p>}
              </div>

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
            <h2 className="text-xl font-bold text-foreground mb-6">Step-Up Wealth Projections</h2>
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
                      ${results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
                Enter details to view step-up returns.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
