'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The US Income Tax Calculator is a financial planning tool built to estimate your federal income tax liabilities for tax year 2024. It supports standard IRS filing statuses, including Single and Married Filing Jointly, applies standard deductions, and calculates your taxes based on current marginal tax brackets. Taxpayers use this utility to calculate their average tax rate, marginal tax bracket, and prepare for tax filing season. You can cross-reference tax details on the official [Internal Revenue Service (IRS) website](https://www.irs.gov).',
  formula: `Federal income tax in the United States is calculated using a progressive marginal tax rate system:

1. **Taxable Income**:
   $$\\text{Taxable Income} = \\max(0, \\text{Gross Annual Income} - \\text{Deduction})$$
   Where the deduction is either the standard deduction ($14,600 for Single, $29,200 for Married Filing Jointly in 2024) or total itemized deductions.

2. **Progressive Bracket Tax**:
   $$\\text{Tax} = \\sum_{i=1}^{k} (\\text{Income in Bracket}_i \\times R_i)$$
   Where $R_i$ is the marginal tax rate for bracket $i$ (ranging from 10% to 37%).

3. **Effective Tax Rate**:
   $$\\text{Effective Tax Rate} = \\frac{\\text{Total Tax Due}}{\\text{Gross Annual Income}} \\times 100$$

Understanding the progressive us income tax calculator rules helps you optimize deductions.`,
  example: `Let's analyze a US federal income tax calculation example for tax year 2024. Suppose you are a Single filer earning a gross annual income of $85,000 and claiming the standard deduction.

1. **Taxable Income**:
   - Gross Income = $85,000.
   - Standard Deduction = $14,600.
   - Taxable Income = $85,000 - $14,600 = $70,400.

2. **Bracket Calculations**:
   - 10% Bracket: 10% on first $11,600 = $1,160.00.
   - 12% Bracket: 12% on income between $11,601 and $47,150 ($35,550) = $4,266.00.
   - 22% Bracket: 22% on income between $47,151 and $70,400 ($23,250) = $5,115.00.
   - Total Federal Tax Due = $1,160.00 + $4,266.00 + $5,115.00 = $10,541.00.

3. **Effective Tax Rate**:
   - Effective Tax Rate = ($10,541.00 / $85,000) × 100 = 12.40%.

Thus, your total federal tax due is $10,541, placing you in the 22% marginal tax bracket with an effective tax rate of 12.40%.`,
  faqs: [
    {
      q: 'What is the difference between standard and itemized deductions?',
      a: 'The standard deduction is a flat, non-taxable amount based on your filing status that reduces your taxable income. Itemizing allows you to list individual deductions (like mortgage interest, charitable donations, state/local taxes) if their total exceeds the standard deduction.',
    },
    {
      q: 'What is the difference between marginal and effective tax rates?',
      a: 'Your marginal tax rate is the highest bracket your last dollar of income falls into (e.g., 22%). Your effective tax rate is the actual percentage of your total gross income paid in taxes (e.g., 12.4%), which is always lower than your marginal rate.',
    },
    {
      q: 'When do the 2024 tax brackets apply?',
      a: 'The 2024 tax brackets apply to income earned during the calendar year 2024. You will use these brackets when filing your federal tax return in early 2025.',
    },
    {
      q: 'How do tax credits differ from tax deductions?',
      a: 'Deductions reduce your taxable income before tax is calculated (e.g., a $1,000 deduction saves you $220 in the 22% bracket). Credits provide a dollar-for-dollar reduction of your actual tax liability (e.g., a $1,000 credit saves you exactly $1,000).',
    },
    {
      q: 'Do standard deduction amounts increase every year?',
      a: 'Yes, the IRS adjusts standard deductions and tax bracket thresholds annually to account for inflation, helping to prevent taxpayers from being pushed into higher brackets solely due to cost-of-living adjustments.',
    },
  ],
};

const BRACKETS_2024 = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  married: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  married: 29200,
};

export default function USTaxCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [grossIncome, setGrossIncome] = useState<number>(100000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard');
  const [itemizedValue, setItemizedValue] = useState<number>(15000);

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

  const isValid = grossIncome >= 0 && itemizedValue >= 0;

  // Progressive Tax Bracket Calculation
  const calculateFederalTax = (taxable: number, status: 'single' | 'married') => {
    if (taxable <= 0) return 0;
    
    const brackets = BRACKETS_2024[status];
    let tax = 0;
    let previousLimit = 0;

    for (const b of brackets) {
      if (taxable > previousLimit) {
        const taxableInSlab = Math.min(taxable - previousLimit, b.limit - previousLimit);
        tax += taxableInSlab * b.rate;
        previousLimit = b.limit;
      } else {
        break;
      }
    }
    return tax;
  };

  let results = null;
  if (isValid) {
    const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus];
    const chosenDeduction = deductionType === 'standard' ? standardDeduction : itemizedValue;
    const taxableIncome = Math.max(0, grossIncome - chosenDeduction);
    const federalTax = calculateFederalTax(taxableIncome, filingStatus);
    const effectiveRate = grossIncome > 0 ? (federalTax / grossIncome) * 100 : 0;
    const takeHome = Math.max(0, grossIncome - federalTax);
    
    // Find marginal tax rate
    const brackets = BRACKETS_2024[filingStatus];
    let marginalRate = 0.10;
    for (const b of brackets) {
      if (taxableIncome <= b.limit) {
        marginalRate = b.rate * 100;
        break;
      }
    }

    const taxPct = (federalTax / (grossIncome || 1)) * 100;
    const takeHomePct = (takeHome / (grossIncome || 1)) * 100;

    results = {
      chosenDeduction,
      taxableIncome,
      federalTax,
      effectiveRate,
      marginalRate,
      takeHome,
      taxPct,
      takeHomePct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (grossIncome < 0) newErrors.grossIncome = 'Gross income cannot be negative';
    if (itemizedValue < 0) newErrors.itemizedValue = 'Deductions value cannot be negative';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setGrossIncome(100000);
    setFilingStatus('single');
    setDeductionType('standard');
    setItemizedValue(15000);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Income & Filing Details</h2>
            
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
              <label htmlFor="gross-income" className="block text-sm font-semibold text-foreground/80 mb-2">
                Gross Annual Income
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="gross-income"
                  type="number"
                  value={grossIncome || ''}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.grossIncome && <p className="text-xs text-red-500 mt-1 font-medium">{errors.grossIncome}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="filing-status" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Filing Status
                </label>
                <select
                  id="filing-status"
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as any)}
                  className="block w-full py-3 px-3 text-sm font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none cursor-pointer"
                >
                  <option value="single">Single Filer</option>
                  <option value="married">Married Joint Filer</option>
                </select>
              </div>

              <div>
                <label htmlFor="deduction-type" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Deduction Type
                </label>
                <select
                  id="deduction-type"
                  value={deductionType}
                  onChange={(e) => setDeductionType(e.target.value as any)}
                  className="block w-full py-3 px-3 text-sm font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none cursor-pointer"
                >
                  <option value="standard">Standard Deduction</option>
                  <option value="itemized">Itemized Deductions</option>
                </select>
              </div>
            </div>

            {deductionType === 'itemized' && (
              <div>
                <label htmlFor="itemized-val" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Total Itemized Deductions Amount
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="itemized-val"
                    type="number"
                    value={itemizedValue || ''}
                    onChange={(e) => setItemizedValue(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.itemizedValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.itemizedValue}</p>}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Federal Tax
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
            <h2 className="text-xl font-bold text-foreground mb-6">Federal Tax Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Take-home pay panel */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Estimated Net Take-Home
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1.5">
                    {currencySymbols[currency]}{results.takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Federal Income Tax Due
                    </span>
                    <span className="block text-lg font-bold text-red-500 mt-1">
                      {currencySymbols[currency]}{results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Taxable Income
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.taxableIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Effective Tax Rate:</span>
                    <span className="font-bold text-foreground">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Marginal Tax Bracket:</span>
                    <span className="font-bold text-foreground">{results.marginalRate}%</span>
                  </div>
                </div>

                {/* Horizontal Cost comparison bar chart */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Income Breakdown</h4>
                  <div className="space-y-2.5">
                    {/* Take-home Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Take-Home Pay ({results.takeHomePct.toFixed(0)}%)</span>
                        <span>{currencySymbols[currency]}{results.takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${results.takeHomePct}%` }} />
                      </div>
                    </div>

                    {/* Tax Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Federal Tax ({results.taxPct.toFixed(0)}%)</span>
                        <span>{currencySymbols[currency]}{results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${results.taxPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter income details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
