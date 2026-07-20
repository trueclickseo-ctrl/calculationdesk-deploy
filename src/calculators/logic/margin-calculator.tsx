'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Margin Calculator is a business tool used to calculate profit margins, gross markups, selling prices, and absolute profit amounts. It is especially useful for retailers, manufacturers, and wholesalers to price their goods accurately and understand their profit ratios.`,
  formula: `Profit margin and markup are closely related but calculated differently:

**Gross Margin:** The percentage of the selling price that is profit.
$$\\text{Margin (\\%)} = \\left(\\frac{\\text{Revenue} - \\text{Cost}}{\\text{Revenue}}\\right) \\times 100$$
$$\\text{Revenue (based on Margin)} = \\frac{\\text{Cost}}{1 - \\frac{\\text{Margin}}{100}}$$

**Markup:** The percentage added to the cost price to determine the selling price.
$$\\text{Markup (\\%)} = \\left(\\frac{\\text{Revenue} - \\text{Cost}}{\\text{Cost}}\\right) \\times 100$$
$$\\text{Revenue (based on Markup)} = \\text{Cost} \\times \\left(1 + \\frac{\\text{Markup}}{100}\\right)$$`,
  example: `Suppose you purchase an item for $80 (Cost) and want to apply a 20% Gross Margin vs a 20% Markup.

**Case 1: Apply 20% Gross Margin**
1. Revenue = $80 / (1 - 0.20) = $80 / 0.80 = $100.00.
2. Gross Profit = $100 - $80 = $20.00.
3. Markup equivalent = ($20 / $80) × 100 = 25%.

**Case 2: Apply 20% Markup**
1. Revenue = $80 × (1 + 0.20) = $80 × 1.20 = $96.00.
2. Gross Profit = $96 - $80 = $16.00.
3. Gross Margin equivalent = ($16 / $96) × 100 = 16.67%.`,
  faqs: [
    {
      q: 'What is the difference between Margin and Markup?',
      a: 'Margin is calculated based on the final selling price (Revenue), showing what percentage of sales is profit. Markup is calculated based on the buying price (Cost), showing how much the cost was marked up to determine the retail price.',
    },
    {
      q: 'Why does Margin never exceed 100%?',
      a: 'Since profit is selling price minus cost, and margin divides profit by selling price, it is mathematically impossible to have a gross margin of 100% or more (unless cost is zero or negative). Markup, however, can grow infinitely (e.g., 200% or 500% markup).',
    },
    {
      q: 'Which is better to use in retail pricing?',
      a: 'Retailers generally prefer to use Gross Margin because it corresponds directly to their sales revenue (e.g., "we make a 30% margin on sales"), making financial accounting and income statements simpler to plan.',
    },
  ],
};

export default function MarginCalculator() {
  const [cost, setCost] = useState<number>(100);
  const [rate, setRate] = useState<number>(25);
  const [calcType, setCalcType] = useState<'margin' | 'markup'>('margin');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = cost > 0 && rate >= 0 && (calcType === 'margin' ? rate < 100 : rate <= 1000);

  let results = null;
  if (isValid) {
    let revenue = 0;
    let profit = 0;
    let marginPercent = 0;
    let markupPercent = 0;

    if (calcType === 'margin') {
      marginPercent = rate;
      revenue = cost / (1 - rate / 100);
      profit = revenue - cost;
      markupPercent = (profit / cost) * 100;
    } else {
      markupPercent = rate;
      revenue = cost * (1 + rate / 100);
      profit = revenue - cost;
      marginPercent = (profit / revenue) * 100;
    }

    const costPercent = (cost / revenue) * 100;
    const profitPercent = (profit / revenue) * 100;

    results = {
      revenue,
      profit,
      marginPercent,
      markupPercent,
      costPercent,
      profitPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (cost <= 0) newErrors.cost = 'Cost price must be greater than zero';
    if (rate < 0) newErrors.rate = 'Rate cannot be negative';
    if (calcType === 'margin' && rate >= 100) newErrors.rate = 'Margin percentage must be less than 100%';
    if (calcType === 'markup' && rate > 1000) newErrors.rate = 'Max markup is capped at 1000% for calculation stability';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setCost(100);
    setRate(25);
    setCalcType('margin');
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Price Variables</h2>
          
          <div className="space-y-5">
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Calculation Target</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setCalcType('margin'); if (rate >= 100) setRate(25); }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    calcType === 'margin'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Gross Margin (%)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcType('markup')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    calcType === 'markup'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Markup (%)
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="cost" className="block text-sm font-semibold text-foreground/80 mb-2">
                Cost of Purchase (Cost Price)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="cost"
                  type="number"
                  value={cost || ''}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.cost && <p className="text-xs text-red-500 mt-1 font-medium">{errors.cost}</p>}
            </div>

            <div>
              <label htmlFor="rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                {calcType === 'margin' ? 'Desired Gross Margin Ratio' : 'Desired Cost Markup Ratio'}
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="rate"
                  type="number"
                  value={rate || ''}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Price
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
            <h2 className="text-xl font-bold text-foreground mb-6">Pricing Summary</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Target Selling Price (Revenue)
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Gross Profit Amount
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Equivalent {calcType === 'margin' ? 'Markup' : 'Margin'}
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {calcType === 'margin' ? results.markupPercent.toFixed(2) : results.marginPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Proportion bar */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Cost & Profit Allocation</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-accent h-full transition-all duration-500" 
                      style={{ width: `${results.costPercent}%` }} 
                    />
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${results.profitPercent}%` }} 
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Cost Price ({results.costPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Profit Margin ({results.profitPercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view pricing analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
