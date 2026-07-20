'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'A Recurring Deposit (RD) is a term deposit service offered by banks which allows people with regular incomes to deposit a fixed amount every month into their RD account and earn interest at the rates applicable to Fixed Deposits. It is similar to making regular savings deposits, with interest compounding quarterly and paid at the end of the term. You can verify interest rate regulations and savings deposit guidelines on official central banking websites: the [Federal Reserve (US)](https://www.federalreserve.gov), the [Reserve Bank of India (RBI)](https://www.rbi.org.in), the [Bank of England (UK)](https://www.bankofengland.co.uk), the [European Central Bank (EU)](https://www.ecb.europa.eu), the [State Bank of Pakistan (SBP)](https://www.sbp.org.pk), the [Bangladesh Bank (BB)](https://www.bb.org.bd), and the [Central Bank of the Republic of Turkey (TCMB)](https://www.tcmb.gov.tr).',
  formula: `The maturity amount of a Recurring Deposit is computed by adding the future value of each monthly installment compounded quarterly:

$$M = \\sum_{k=1}^{n} P \\times \\left(1 + \\frac{r}{4 \\times 100}\\right)^{\\frac{k}{3}}$$

Where:
- **M** is the total maturity amount.
- **P** is the monthly installment amount.
- **r** is the annual rate of interest.
- **n** is the total number of monthly deposits.
- **k** is the remaining months each installment is held in the bank (ranging from 1 to n).`,
  example: `Suppose you deposit $1,000 every month (P) for 1 year (n = 12 months) at an annual interest rate of 8% (r).

1. Interest is compounded quarterly, meaning the quarterly interest rate is 8% / 4 = 2% per quarter (0.02).
2. The first installment earns interest for 12 months (4 quarters): $1,000 × (1.02)^4 = $1,082.43.
3. The second installment earns interest for 11 months: $1,000 × (1.02)^{11/3} = $1,075.22.
4. Continuing this for all 12 installments, the total maturity amount (M) accumulates to approximately $12,530.00.
5. Total Invested = $1,000 × 12 = $12,000.
6. Interest Earned = $12,530 - $12,000 = $530.00.`,
  faqs: [
    {
      q: 'Does RD interest rate change during the tenure?',
      a: 'No. The interest rate remains locked in at the rate agreed upon when opening the Recurring Deposit account, regardless of subsequent market fluctuations.',
    },
    {
      q: 'Is there a penalty for missing a monthly RD payment?',
      a: 'Yes, most banks levy a small penalty fee if you miss a monthly installment, and continued defaults might lead to the account being closed prematurely.',
    },
    {
      q: 'Can I choose a different compounding frequency for RD?',
      a: 'Standard banking norms compound RD interest quarterly. However, some banks might offer monthly compounding or simple interest for shorter terms.',
    },
    {
      q: 'Is RD interest taxable?',
      a: 'Yes, interest earned on Recurring Deposits is fully taxable according to your income tax slab. In India, banks also deduct TDS (Tax Deducted at Source) if the total interest earned across all your term deposits exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.',
    },
    {
      q: 'Can I withdraw my Recurring Deposit before maturity?',
      a: 'Yes, premature withdrawal of RD is allowed, but banks usually levy a penalty charge (typically 0.5% to 1% lower interest than the contracted rate for the period the deposit remained with the bank) and do not allow partial withdrawals.',
    },
  ],
};

export default function RdCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(6.8);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
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

  const isValid = monthlyDeposit > 0 && interestRate > 0 && interestRate <= 100 && tenure > 0 && 
                  (tenureType === 'years' ? tenure <= 50 : tenure <= 600);

  let results = null;
  if (isValid) {
    const P = monthlyDeposit;
    const r = interestRate;
    const n = tenureType === 'years' ? tenure * 12 : tenure;

    // Calculate using quarterly compounding for each monthly deposit
    let maturityAmount = 0;
    const quarterlyRate = r / 4 / 100;
    for (let month = 1; month <= n; month++) {
      const k = n - month + 1; // months remaining
      maturityAmount += P * Math.pow(1 + quarterlyRate, k / 3);
    }

    const totalInvested = P * n;
    const estInterest = Math.max(0, maturityAmount - totalInvested);

    const principalPercent = (totalInvested / (maturityAmount || 1)) * 100;
    const interestPercent = (estInterest / (maturityAmount || 1)) * 100;

    results = {
      maturityAmount,
      totalInvested,
      estInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyDeposit <= 0) newErrors.monthlyDeposit = 'Monthly deposit must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0) newErrors.tenure = 'Tenure must be greater than zero';
    if (tenureType === 'years' && tenure > 50) newErrors.tenure = 'Max tenure is 50 years';
    if (tenureType === 'months' && tenure > 600) newErrors.tenure = 'Max tenure is 600 months';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setMonthlyDeposit(5000);
    setInterestRate(6.8);
    setTenure(5);
    setTenureType('years');
    setErrors({});
  };

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const principalStroke = results ? (results.principalPercent / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">RD Savings Plan</h2>
            
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
            <div>
              <label htmlFor="monthly-deposit" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monthly Deposit Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="monthly-deposit"
                  type="number"
                  value={monthlyDeposit || ''}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {errors.monthlyDeposit && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyDeposit}</p>}
            </div>

            <div>
              <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                Interest Rate (p.a.)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  value={interestRate || ''}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {errors.interestRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.interestRate}</p>}
            </div>

            <div>
              <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                Time Period
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="tenure"
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent text-foreground"
                  />
                </div>
                <div className="flex rounded-xl border border-border bg-background p-1.5 gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => { setTenureType('years'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'years'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTenureType('months'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'months'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Months
                  </button>
                </div>
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
            <h2 className="text-xl font-bold text-foreground mb-6">RD Maturity Projection</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Expected Maturity Amount
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Invested Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.totalInvested.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Est. Interest Earned
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.estInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
                        strokeDashoffset={principalStroke}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest Gain
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.interestPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Principal ({results.principalPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Interest ({results.interestPercent.toFixed(0)}%)</span>
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
