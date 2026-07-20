'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Post Office Scheme Interest Planner is a unified calculator designed to estimate returns across various Small Savings Schemes offered by the post office. It supports popular options like the Post Office Monthly Income Scheme (POMIS), National Savings Certificate (NSC), Kisan Vikas Patra (KVP), Senior Citizen Savings Scheme (SCSS), and Post Office Time Deposits (POTD). Users can compare compounding frequencies, verify interest rates, and check statutory deposit limits. You can review current interest rates and terms on the official [India Post website](https://www.indiapost.gov.in).',
  formula: `Each Post Office scheme follows standard government-defined interest compounding and payout rules:

1. **Post Office Monthly Income Scheme (POMIS)**:
   Maturity tenure is 5 years. Interest is paid monthly:
   $$\\text{Monthly Payout} = \\frac{P \\times R}{12 \\times 100}$$
   $$\\text{Total Interest} = \\text{Monthly Payout} \\times 60$$

2. **National Savings Certificate (NSC)**:
   Maturity tenure is 5 years. Interest compounds annually and is paid at maturity:
   $$\\text{Maturity Amount} = P \\times \\left(1 + \\frac{R}{100}\\right)^5$$

3. **Kisan Vikas Patra (KVP)**:
   Tenure is 115 months (9 years and 7 months). It doubles your principal investment:
   $$\\text{Maturity Amount} = P \\times 2$$

4. **Senior Citizen Savings Scheme (SCSS)**:
   Tenure is 5 years. Interest is paid quarterly:
   $$\\text{Quarterly Payout} = \\frac{P \\times R}{4 \\times 100}$$
   $$\\text{Total Interest} = \\text{Quarterly Payout} \\times 20$$

5. **Post Office Time Deposit (POTD)**:
   Interest compounds quarterly and is paid annually/at maturity:
   $$\\text{Maturity Amount} = P \\times \\left(1 + \\frac{R}{400}\\right)^{4 \\times t}$$`,
  example: `Let's analyze a POMIS (Monthly Income Scheme) example. Suppose you invest ₹9,00,000 (the statutory limit for a single account) in the Post Office Monthly Income Scheme for a 5-year tenure at the official interest rate of 7.4% per annum.

1. **Monthly Interest Payout**:
   $$\\text{Monthly Payout} = \\frac{9,00,000 \\times 7.4}{1200} = \\text{₹}5,550$$

2. **Cumulative Yield**:
   - Monthly Income received = ₹5,550.
   - Total Interest received over 5 years = ₹5,550 × 60 months = ₹3,33,000.
   - Principal returned at maturity = ₹9,00,000.

Thus, your ₹9,00,000 investment yields ₹5,550 every month for 5 years, accumulating ₹3,33,000 in total interest gains while keeping your principal safe.`,
  faqs: [
    {
      q: 'What is the maximum investment limit in the Monthly Income Scheme (POMIS)?',
      a: 'The maximum investment limit under POMIS is ₹9,00,000 for a single account and ₹15,00,000 for a joint account, ensuring balanced asset distribution across the government savings scheme.',
    },
    {
      q: 'Are Post Office savings schemes safe?',
      a: 'Yes, Post Office savings schemes are backed by the Government of India, making them sovereign-backed investments with virtually zero risk of default on principal or interest.',
    },
    {
      q: 'Can I claim tax benefits on Post Office Time Deposits?',
      a: 'Only the 5-year Post Office Time Deposit (POTD) is eligible for tax deductions up to ₹1.5 Lakhs under Section 80C of the Income Tax Act. Shorter term deposits (1, 2, or 3 years) do not qualify for tax benefits.',
    },
    {
      q: 'Can SCSS be opened jointly?',
      a: 'Yes, a Senior Citizen Savings Scheme (SCSS) account can be opened jointly with a spouse, with a combined maximum investment limit of ₹30,00,000.',
    },
    {
      q: 'Is there a premature withdrawal penalty on NSC?',
      a: 'National Savings Certificates (NSC) generally cannot be closed prematurely before the 5-year maturity, except under exceptional circumstances like the death of the holder or a court order.',
    },
  ],
};

type SchemeType = 'POMIS' | 'NSC' | 'KVP' | 'SCSS' | 'POTD';

export default function PostOfficePlanner() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [scheme, setScheme] = useState<SchemeType>('POMIS');
  const [principal, setPrincipal] = useState<number>(100000);
  const [potdTerm, setPotdTerm] = useState<number>(5); // 1, 2, 3, or 5 years

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs',
    BDT: '৳',
    TRY: '₺',
  };

  // Fixed Interest Rates (Updated for 2024-25/2026 small savings schemes)
  const rates: Record<SchemeType, number | ((term: number) => number)> = {
    POMIS: 7.4,
    NSC: 7.7,
    KVP: 7.5,
    SCSS: 8.2,
    POTD: (term: number) => {
      if (term === 1) return 6.9;
      if (term === 2) return 7.0;
      if (term === 3) return 7.1;
      return 7.5; // 5 year
    },
  };

  // Maximum Investment Limits in INR (will be displayed/warned accordingly)
  const limits: Record<SchemeType, number> = {
    POMIS: 900000, // 9 Lakh (single limit)
    NSC: Infinity,
    KVP: Infinity,
    SCSS: 3000000, // 30 Lakh
    POTD: Infinity,
  };

  const getRate = () => {
    const rateVal = rates[scheme];
    return typeof rateVal === 'function' ? rateVal(potdTerm) : rateVal;
  };

  const currentRate = getRate();
  const limitVal = limits[scheme];
  const isOverLimit = currency === 'INR' && principal > limitVal;

  const isValid = principal > 0;

  let results = null;
  if (isValid) {
    let maturityAmount = 0;
    let totalInterest = 0;
    let payoutAmount = 0;
    let payoutFrequency = '';
    let tenureText = '';

    if (scheme === 'POMIS') {
      payoutAmount = (principal * currentRate) / 1200;
      totalInterest = payoutAmount * 60; // 5 years
      maturityAmount = principal;
      payoutFrequency = 'Monthly Interest';
      tenureText = '5 Years';
    } else if (scheme === 'NSC') {
      maturityAmount = principal * Math.pow(1 + (currentRate / 100), 5);
      totalInterest = Math.max(0, maturityAmount - principal);
      tenureText = '5 Years';
    } else if (scheme === 'KVP') {
      maturityAmount = principal * 2;
      totalInterest = principal;
      tenureText = '115 Months (~9.6 Years)';
    } else if (scheme === 'SCSS') {
      payoutAmount = (principal * currentRate) / 400;
      totalInterest = payoutAmount * 20; // 5 years
      maturityAmount = principal;
      payoutFrequency = 'Quarterly Interest';
      tenureText = '5 Years';
    } else if (scheme === 'POTD') {
      maturityAmount = principal * Math.pow(1 + (currentRate / 400), 4 * potdTerm);
      totalInterest = Math.max(0, maturityAmount - principal);
      tenureText = `${potdTerm} Year${potdTerm > 1 ? 's' : ''}`;
    }

    results = {
      maturityAmount,
      totalInterest,
      payoutAmount,
      payoutFrequency,
      tenureText,
      interestPercent: (totalInterest / (maturityAmount + (payoutAmount > 0 ? totalInterest : 0))) * 100,
    };
  }

  const handleReset = () => {
    setPrincipal(100000);
    setScheme('POMIS');
    setPotdTerm(5);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Scheme Settings</h2>
            
            {/* Currency Select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
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
              <label htmlFor="scheme-select" className="block text-sm font-semibold text-foreground/80 mb-2">
                Select Post Office Scheme
              </label>
              <select
                id="scheme-select"
                value={scheme}
                onChange={(e) => setScheme(e.target.value as SchemeType)}
                className="block w-full py-3 px-4 text-sm font-semibold rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="POMIS">Monthly Income Scheme (POMIS)</option>
                <option value="NSC">National Savings Certificate (NSC)</option>
                <option value="KVP">Kisan Vikas Patra (KVP)</option>
                <option value="SCSS">Senior Citizen Savings Scheme (SCSS)</option>
                <option value="POTD">Post Office Time Deposit (POTD)</option>
              </select>
            </div>

            <div>
              <label htmlFor="principal-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Investment Principal
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="principal-amount"
                  type="number"
                  value={principal || ''}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {isOverLimit && (
                <p className="text-xs text-amber-500 mt-1.5 font-semibold">
                  ⚠️ Note: Exceeds standard single limit of {currencySymbols[currency]}{limitVal.toLocaleString()} for this scheme.
                </p>
              )}
            </div>

            {scheme === 'POTD' && (
              <div>
                <label htmlFor="potd-term" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Time Deposit Term
                </label>
                <select
                  id="potd-term"
                  value={potdTerm}
                  onChange={(e) => setPotdTerm(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-semibold rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                >
                  <option value={1}>1 Year (6.9%)</option>
                  <option value={2}>2 Years (7.0%)</option>
                  <option value={3}>3 Years (7.1%)</option>
                  <option value={5}>5 Years (7.5%)</option>
                </select>
              </div>
            )}

            <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs">
              <span className="font-semibold text-foreground/50">Current Interest Rate:</span>
              <span className="font-extrabold text-foreground bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {currentRate}% p.a.
              </span>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleReset}
                className="flex-grow border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-center text-sm"
              >
                <RefreshCw className="h-4 w-4 inline mr-1.5" />
                Reset Planner
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity & Returns Summary</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Core payout highlight */}
                {results.payoutAmount > 0 ? (
                  <div className="rounded-xl bg-emerald-500/5 p-5 border border-emerald-500/10 text-center">
                    <span className="block text-xs font-bold text-emerald-500/80 uppercase tracking-wider">
                      Expected {results.payoutFrequency}
                    </span>
                    <span className="block text-3xl font-extrabold text-emerald-500 mt-1">
                      {currencySymbols[currency]}{results.payoutAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                ) : (
                  <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Expected Maturity Value
                    </span>
                    <span className="block text-3xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Principal
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{principal.toLocaleString()}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest Earned
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                  <span className="font-semibold text-foreground/50">Scheme Tenure:</span>
                  <span className="font-bold text-foreground">{results.tenureText}</span>
                </div>

                {/* Progress bar ratio */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Yield Composition</h4>
                  <div className="w-full h-3 rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${100 - results.interestPercent}%` }} 
                    />
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500" 
                      style={{ width: `${results.interestPercent}%` }} 
                    />
                  </div>
                  <div className="flex gap-4 mt-2 justify-center text-[10px] font-bold text-foreground/60">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Principal</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Interest Yield</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view scheme projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
