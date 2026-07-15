'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Profit Margin Calculator computes gross profit, profit margin percentages, and markups based on cost prices and selling prices. It helps businesses evaluate pricing strategies and unit economics.`,
  formula: `Pricing metrics are solved using standard business ledger equations:

**1. Gross Profit:**
$$\\text{Gross Profit} = \\text{Revenue} - \\text{Cost}$$

**2. Profit Margin (%):**
$$\\text{Profit Margin (\\%)} = \\left( \\frac{\\text{Revenue} - \\text{Cost}}{\\text{Revenue}} \\right) \\times 100$$

**3. Markup (%):**
$$\\text{Markup (\\%)} = \\left( \\frac{\\text{Revenue} - \\text{Cost}}{\\text{Cost}} \\right) \\times 100$$`,
  example: `**Calculate margin and markup for an item costing $70, sold at $100:**
- Cost = $70, Revenue = $100.
- Gross Profit = 100 - 70 = $30.
- Profit Margin = (30 / 100) × 100 = **30.00%**.
- Markup = (30 / 70) × 100 = **42.86%**.`,
  faqs: [
    {
      q: 'What is the difference between margin and markup?',
      a: 'Margin is the ratio of profit to the selling price (revenue), whereas markup is the ratio of profit to the cost price of the item.',
    },
    {
      q: 'Can a profit margin be higher than 100%?',
      a: 'No. Since profit cannot exceed total revenue, a standard gross profit margin is capped at a maximum of 100%. However, markups can exceed 100% indefinitely.',
    },
    {
      q: 'How do I calculate selling price from cost and target margin?',
      a: 'To achieve a target margin, divide the cost price by (1 minus the margin in decimal form). For example, a 20% margin on a $80 cost requires: $80 / (1 - 0.20) = $100.',
    },
  ],
};

type MarginMode = 'find-margin' | 'find-price';

export default function ProfitMarginCalculator() {
  const [mode, setMode] = useState<MarginMode>('find-margin');

  // Input states
  const [cost, setCost] = useState<number>(70);
  const [revenue, setRevenue] = useState<number>(100);

  // Pricing mode states
  const [targetType, setTargetType] = useState<'margin' | 'markup'>('margin');
  const [targetVal, setTargetVal] = useState<number>(30);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setCost(70);
    setRevenue(100);
    setTargetType('margin');
    setTargetVal(30);
    setErrors({});
  };

  // Computations
  let results = null;

  if (mode === 'find-margin') {
    const isValid = !isNaN(cost) && cost >= 0 && !isNaN(revenue) && revenue >= 0;
    if (isValid && revenue > 0) {
      const grossProfit = revenue - cost;
      const margin = (grossProfit / revenue) * 100;
      const markup = cost > 0 ? (grossProfit / cost) * 100 : 100;

      results = {
        grossProfit,
        margin,
        markup,
        revenue,
        cost,
      };
    }
  } else {
    const isValid = !isNaN(cost) && cost >= 0 && !isNaN(targetVal) && targetVal >= 0;
    if (isValid) {
      let calcRevenue = 0;
      if (targetType === 'margin') {
        if (targetVal < 100) {
          calcRevenue = cost / (1 - targetVal / 100);
        }
      } else {
        calcRevenue = cost * (1 + targetVal / 100);
      }

      if (calcRevenue > 0) {
        const grossProfit = calcRevenue - cost;
        const margin = (grossProfit / calcRevenue) * 100;
        const markup = cost > 0 ? (grossProfit / cost) * 100 : 100;

        results = {
          grossProfit,
          margin,
          markup,
          revenue: calcRevenue,
          cost,
        };
      }
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (cost < 0 || isNaN(cost)) newErrors.cost = 'Cost cannot be negative';
    if (mode === 'find-margin') {
      if (revenue < 0 || isNaN(revenue)) newErrors.revenue = 'Revenue cannot be negative';
      if (revenue > 0 && revenue < cost) {
        newErrors.revenue = 'Revenue is less than Cost, resulting in a negative margin';
      }
    } else {
      if (isNaN(targetVal) || targetVal < 0) newErrors.targetVal = 'Target percentage cannot be negative';
      if (targetType === 'margin' && targetVal >= 100) {
        newErrors.targetVal = 'Target margin must be less than 100%';
      }
    }
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Pricing Variables</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('find-margin'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'find-margin'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Calculate Margin & Markup
            </button>
            <button
              type="button"
              onClick={() => { setMode('find-price'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'find-price'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Calculate Selling Price
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="cost-price" className="block text-sm font-semibold text-foreground/80 mb-2">Cost Price ($)</label>
              <input
                id="cost-price"
                type="number"
                value={cost}
                onChange={(e) => { setCost(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.cost && <p className="text-xs text-red-500 mt-1 font-medium">{errors.cost}</p>}
            </div>

            {mode === 'find-margin' ? (
              <div>
                <label htmlFor="selling-price" className="block text-sm font-semibold text-foreground/80 mb-2">Selling Price / Revenue ($)</label>
                <input
                  id="selling-price"
                  type="number"
                  value={revenue}
                  onChange={(e) => { setRevenue(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.revenue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.revenue}</p>}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="target-select" className="block text-sm font-semibold text-foreground/80 mb-2">Target Type</label>
                  <select
                    id="target-select"
                    value={targetType}
                    onChange={(e) => { setTargetType(e.target.value as 'margin' | 'markup'); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  >
                    <option value="margin">Target Margin</option>
                    <option value="markup">Target Markup</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="target-value" className="block text-sm font-semibold text-foreground/80 mb-2">Target (%)</label>
                  <input
                    id="target-value"
                    type="number"
                    value={targetVal}
                    onChange={(e) => { setTargetVal(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.targetVal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetVal}</p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Pricing
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Gross Profit</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Selling Price</span>
                    <span className="block text-2xl font-extrabold text-accent mt-1">
                      ${results.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Profit Margin</span>
                    <span className="block text-lg font-bold text-foreground mt-1">{results.margin.toFixed(2)}%</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Markup Rate</span>
                    <span className="block text-lg font-bold text-foreground mt-1">{results.markup.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between">
                  <span className="text-xs font-semibold text-foreground/50 uppercase">Total Unit Cost</span>
                  <span className="text-sm font-bold text-foreground">${results.cost.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter price values.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
