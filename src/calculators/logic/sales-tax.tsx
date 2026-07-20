'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Sales Tax Calculator computes pre-tax prices, tax amounts, and final values. It supports both tax-exclusive (tax added to price) and tax-inclusive (tax already inside price) calculations.`,
  formula: `Sales tax logic applies either markup additions or fractional exclusions:

**1. Tax Exclusive Method (Tax Added):**
- Tax Amount:
  $$\\text{Tax} = \\text{Base Amount} \\times \\left( \\frac{\\text{Tax Rate}}{100} \\right)$$
- Total Price:
  $$\\text{Total} = \\text{Base Amount} + \\text{Tax}$$

**2. Tax Inclusive Method (Tax Extracted):**
- Pre-Tax Value:
  $$\\text{Pre-Tax} = \\frac{\\text{Total Price}}{1 + \\frac{\\text{Tax Rate}}{100}}$$
- Tax Amount:
  $$\\text{Tax} = \\text{Total Price} - \\text{Pre-Tax}$$`,
  example: `**Calculate 8% tax exclusive on a $150 item:**
- Base Amount = $150. Tax Rate = 8%.
- Tax Amount = 150 × 0.08 = **$12**.
- Total Price = 150 + 12 = **$162**.`,
  faqs: [
    {
      q: 'What is the difference between inclusive and exclusive sales tax?',
      a: 'Tax exclusive means tax is added to the base price at checkout. Tax inclusive means the sticker price already contains the tax (common with European VAT or goods tax).',
    },
    {
      q: 'How do you reverse calculate a sales tax rate?',
      a: 'To extract the original rate from a pre-tax and tax amount, divide the tax amount by the pre-tax amount and multiply by 100.',
    },
    {
      q: 'What is VAT?',
      a: 'Value Added Tax (VAT) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale.',
    },
  ],
};

type TaxMode = 'exclusive' | 'inclusive';

export default function SalesTaxCalculator() {
  const [mode, setMode] = useState<TaxMode>('exclusive');
  const [baseAmount, setBaseAmount] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(8);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setMode('exclusive');
    setBaseAmount(100);
    setTaxRate(8);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(baseAmount) && baseAmount >= 0 && !isNaN(taxRate) && taxRate >= 0;
  if (isValid) {
    if (mode === 'exclusive') {
      const taxAmount = baseAmount * (taxRate / 100);
      const totalAmount = baseAmount + taxAmount;

      results = {
        preTax: baseAmount,
        taxAmount,
        totalAmount,
      };
    } else {
      const preTax = baseAmount / (1 + taxRate / 100);
      const taxAmount = baseAmount - preTax;

      results = {
        preTax,
        taxAmount,
        totalAmount: baseAmount,
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (baseAmount < 0 || isNaN(baseAmount)) newErrors.baseAmount = 'Amount cannot be negative';
    if (taxRate < 0 || isNaN(taxRate)) newErrors.taxRate = 'Tax rate cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Tax Variables</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('exclusive'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'exclusive'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Tax Exclusive
            </button>
            <button
              type="button"
              onClick={() => { setMode('inclusive'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'inclusive'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Tax Inclusive
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="base-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                {mode === 'exclusive' ? 'Base Price (Pre-Tax) ($)' : 'Total Price (Tax-Inclusive) ($)'}
              </label>
              <input
                id="base-amount"
                type="number"
                value={baseAmount}
                onChange={(e) => { setBaseAmount(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.baseAmount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.baseAmount}</p>}
            </div>

            <div>
              <label htmlFor="tax-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Sales Tax Rate (%)</label>
              <input
                id="tax-rate"
                type="number"
                value={taxRate}
                onChange={(e) => { setTaxRate(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.taxRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.taxRate}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Sales Tax
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
            <h2 className="text-xl font-bold text-foreground mb-6">Tax Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Transaction Amount</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Pre-Tax Amount</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.preTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Tax Component ({taxRate}%)</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter tax values.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
