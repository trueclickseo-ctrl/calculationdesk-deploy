'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Compound Interest Calculator is a financial tool built to estimate the growth of your investments over time. Unlike simple interest, compound interest calculates gains on both your initial principal and the accumulated interest from prior periods. This calculator supports various compounding frequencies—including daily, monthly, quarterly, and annually—and allows you to factor in recurring monthly contributions. You can review compound interest definitions on official regulatory sites: the [US Securities and Exchange Commission (SEC)](https://www.sec.gov), the [Securities and Exchange Board of India (SEBI)](https://www.sebi.gov.in), the [European Securities and Markets Authority (ESMA)](https://www.esma.europa.eu), the [Financial Conduct Authority (FCA)](https://www.fca.org.uk), the [Securities and Exchange Commission of Pakistan (SECP)](https://www.secp.gov.pk), the [Bangladesh Securities and Exchange Commission (BSEC)](https://sec.gov.bd), and the [Capital Markets Board of Turkey (SPK)](https://www.spk.gov.tr).',
  formula: `Compound interest growth is modeled using progressive compounding equations:

1. **Compounding Periodic Rate**:
   For an annual rate $R$ and compounding frequency $n$ times per year, the equivalent monthly periodic rate $r_m$ is:
   $$r_m = \\left(1 + \\frac{R}{n \\times 100}\\right)^{\\frac{n}{12}} - 1$$

2. **Accrual Loop (Month-by-Month)**:
   For each month $m$ from 1 to $12 \\times t$ (where $t$ is tenure in years):
   $$\\text{Balance}_m = (\\text{Balance}_{m-1} + PMT) \\times (1 + r_m)$$
   Where $PMT$ is the monthly contribution deposited at the start of the month.

3. **Compounding Frequencies ($n$)**:
   - Daily: $n = 365$
   - Monthly: $n = 12$
   - Quarterly: $n = 4$
   - Annually: $n = 1$`,
  example: `Let's analyze a compound interest calculation example. Suppose you start with an initial principal of $10,000, contribute $200 monthly, and earn an 8% annual return compounded monthly for 10 years.

1. **Inputs**:
   - Principal ($P$) = $10,000.
   - Monthly Deposit ($PMT$) = $200.
   - Annual Rate ($R$) = 8%.
   - Compounding frequency = Monthly ($n=12$), so $r_m = 8 / 12 / 100 = 0.00667$.
   - Duration ($t$) = 10 years (120 months).

2. **Accrued Corpus**:
   - Total Invested Amount = $10,000 + ($200 × 120) = $34,000.
   - Maturity Value = $10,000 × (1 + 0.00667)^120 + $200 × [((1 + 0.00667)^120 - 1) / 0.00667] × (1 + 0.00667) = $59,294.
   - Interest Earned = $59,294 - $34,000 = $25,294.

By compounding monthly, your investment earns $25,294 in interest over 10 years, bringing your total balance to $59,294.`,
  faqs: [
    {
      q: 'What is compound interest?',
      a: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods. It is essentially "interest on interest" and causes wealth to grow exponentially over time.',
    },
    {
      q: 'How does compounding frequency affect my investment returns?',
      a: 'The more frequently interest is compounded, the higher your final returns will be. For example, daily compounding yields slightly higher returns than monthly compounding, which in turn beats quarterly or annual compounding at the same interest rate.',
    },
    {
      q: 'What is the Rule of 72?',
      a: 'The Rule of 72 is a quick way to estimate how long it will take for your money to double at a fixed annual interest rate. Divide 72 by your annual interest rate to find the approximate number of years (e.g., at 8% return, your money doubles in ~9 years).',
    },
    {
      q: 'Can I calculate compound interest without monthly contributions?',
      a: 'Yes. Simply set the monthly contribution input to zero, and the calculator will estimate the compounding returns solely on your one-time initial principal.',
    },
    {
      q: 'Is compound interest taxable?',
      a: 'Taxation depends on the asset class and your local tax laws. Interest earned in standard savings accounts or fixed deposits is typically taxed annually, whereas capital gains in mutual funds or stocks are only taxed when you sell (redeem) the asset.',
    },
  ],
};

export default function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [compoundFrequency, setCompoundFrequency] = useState<'365' | '12' | '4' | '1'>('12');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs',
    BDT: '৳',
    TRY: '₺',
  };

  const isValid = principal >= 0 && monthlyContribution >= 0 && interestRate > 0 && timePeriod > 0 && timePeriod <= 50;

  let results = null;
  if (isValid) {
    const n = Number(compoundFrequency);
    const R = interestRate;
    const t = timePeriod;
    const totalMonths = t * 12;

    // Monthly periodic rate matching compounding frequency
    const rm = Math.pow(1 + (R / (n * 100)), n / 12) - 1;

    let balance = principal;
    let totalInvestedPrincipal = principal;
    let totalInvestedContributions = 0;

    for (let m = 1; m <= totalMonths; m++) {
      totalInvestedContributions += monthlyContribution;
      balance = (balance + monthlyContribution) * (1 + rm);
    }

    const totalInvested = totalInvestedPrincipal + totalInvestedContributions;
    const interestEarned = Math.max(0, balance - totalInvested);

    const principalPct = (totalInvestedPrincipal / (balance || 1)) * 100;
    const contribPct = (totalInvestedContributions / (balance || 1)) * 100;
    const interestPct = (interestEarned / (balance || 1)) * 100;

    results = {
      totalValue: balance,
      totalInvested,
      totalInvestedPrincipal,
      totalInvestedContributions,
      interestEarned,
      principalPct,
      contribPct,
      interestPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (principal < 0) newErrors.principal = 'Initial principal cannot be negative';
    if (monthlyContribution < 0) newErrors.monthlyContribution = 'Contribution cannot be negative';
    if (interestRate <= 0) newErrors.interestRate = 'Interest rate must be greater than zero';
    if (timePeriod <= 0 || timePeriod > 50) newErrors.timePeriod = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setPrincipal(10000);
    setMonthlyContribution(200);
    setInterestRate(8);
    setTimePeriod(10);
    setCompoundFrequency('12');
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const principalDash = results ? (results.principalPct / 100) * circ : 0;
  const contribDash = results ? (results.contribPct / 100) * circ : 0;
  const interestDash = results ? (results.interestPct / 100) * circ : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Compound Setup</h2>
            
            {/* Currency Select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="TRY">TRY (₺)</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="initial-principal" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Initial Principal
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="initial-principal"
                    type="number"
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                  />
                </div>
                {errors.principal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.principal}</p>}
              </div>

              <div>
                <label htmlFor="monthly-contrib" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Monthly Contribution
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="monthly-contrib"
                    type="number"
                    value={monthlyContribution || ''}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                  />
                </div>
                {errors.monthlyContribution && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyContribution}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="interest-rate" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Interest Rate (%)
                </label>
                <input
                  id="interest-rate"
                  type="number"
                  value={interestRate || ''}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="time-period" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Tenure (Years)
                </label>
                <input
                  id="time-period"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="compound-freq" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Compounding
                </label>
                <select
                  id="compound-freq"
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value as any)}
                  className="block w-full py-3 px-2 text-sm font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                >
                  <option value="365">Daily</option>
                  <option value="12">Monthly</option>
                  <option value="4">Quarterly</option>
                  <option value="1">Annually</option>
                </select>
              </div>
            </div>
            {errors.interestRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.interestRate}</p>}
            {errors.timePeriod && <p className="text-xs text-red-500 mt-1 font-medium">{errors.timePeriod}</p>}

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Compound Growth
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
            <h2 className="text-xl font-bold text-foreground mb-6">Compounded Maturity Value</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Future Maturity Value
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Principal:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInvestedPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-indigo-400" />
                      Contributions:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInvestedContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Interest Gained:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {principalDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${principalDash} ${circ - principalDash}`}
                          strokeDashoffset="0"
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {contribDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#8b5cf6"
                          strokeWidth="8"
                          strokeDasharray={`${contribDash} ${circ - contribDash}`}
                          strokeDashoffset={-principalDash}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {interestDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${interestDash} ${circ - interestDash}`}
                          strokeDashoffset={-(principalDash + contribDash)}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest Ratio
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.interestPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement wealth projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
