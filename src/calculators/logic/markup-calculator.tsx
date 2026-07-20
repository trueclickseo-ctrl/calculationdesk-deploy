'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Markup Calculator computes retail selling prices, gross profits, and profit margins starting from cost basis values and desired markup percentages.`,
  formula: `Markup calculations resolve retail price boundaries from initial wholesale costs:

**1. Selling Price:**
$$\\text{Selling Price} = \\text{Cost} \\times \\left( 1 + \\frac{\\text{Markup \\%}}{100} \\right)$$

**2. Gross Profit:**
$$\\text{Gross Profit} = \\text{Selling Price} - \\text{Cost}$$

**3. Profit Margin (%):**
$$\\text{Margin (\\%)} = \\left( \\frac{\\text{Gross Profit}}{\\text{Selling Price}} \\right) \\times 100$$`,
  example: `**Calculate retail pricing for a wholesale cost of $50 with a 60% markup:**
- Wholesale Cost = $50. Markup = 60%.
- Markup Amount = 50 × 0.60 = $30.
- Selling Price = 50 + 30 = **$80.00**.
- Gross Profit = **$30.00**.
- Profit Margin = (30 / 80) × 100 = **37.50%**.`,
  faqs: [
    {
      q: 'What is the difference between markup and margin?',
      a: 'Markup is the percentage added to the wholesale cost to determine the selling price. Margin is the profit percentage relative to the selling price.',
    },
    {
      q: 'How do you convert margin to markup?',
      a: 'Markup % = [Margin % / (100 - Margin %)] × 100.',
    },
    {
      q: 'How do you convert markup to margin?',
      a: 'Margin % = [Markup % / (100 + Markup %)] × 100.',
    },
  ],
};

export default function MarkupCalculator() {
  const [cost, setCost] = useState<number>(50);
  const [markup, setMarkup] = useState<number>(60);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setCost(50);
    setMarkup(60);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(cost) && cost > 0 && !isNaN(markup) && markup >= 0;

  if (isValid) {
    const markupAmount = cost * (markup / 100);
    const sellingPrice = cost + markupAmount;
    const grossProfit = sellingPrice - cost;
    const profitMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;

    results = {
      markupAmount,
      sellingPrice,
      grossProfit,
      profitMargin,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (cost <= 0 || isNaN(cost)) newErrors.cost = 'Wholesale cost must be greater than zero';
    if (markup < 0 || isNaN(markup)) newErrors.markup = 'Markup percentage cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Pricing Variables</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="cost-basis" className="block text-sm font-semibold text-foreground/80 mb-2">Cost Price ($)</label>
              <input
                id="cost-basis"
                type="number"
                value={cost}
                onChange={(e) => { setCost(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.cost && <p className="text-xs text-red-500 mt-1 font-medium">{errors.cost}</p>}
            </div>

            <div>
              <label htmlFor="markup-percent" className="block text-sm font-semibold text-foreground/80 mb-2">Markup Percentage (%)</label>
              <input
                id="markup-percent"
                type="number"
                value={markup}
                onChange={(e) => { setMarkup(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.markup && <p className="text-xs text-red-500 mt-1 font-medium">{errors.markup}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Retail Prices
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
            <h2 className="text-xl font-bold text-foreground mb-6">Price Summary</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Suggested Selling Price</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.sellingPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Gross Profit</span>
                    <span className="block text-lg font-bold text-emerald-500 mt-1">
                      ${results.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Equivalent Margin</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.profitMargin.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter wholesale cost and markup bounds.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
