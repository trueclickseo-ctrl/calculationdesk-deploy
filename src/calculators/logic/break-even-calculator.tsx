'use client';

import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export const seoData = {
  whatIs: `The Break-Even Calculator is a financial analysis tool used by entrepreneurs and business managers to determine the exact sales volume (in units or dollars) at which a company's total revenue equals its total costs. Reaching this point means the business is neither making a profit nor a loss; any sales beyond this point generate net profit.`,
  formula: `Break-even metrics are calculated using unit pricing and fixed cost ratios:

$$\\text{Contribution Margin} = \\text{Selling Price per Unit} - \\text{Variable Cost per Unit}$$
$$\\text{Break-Even Point (Units)} = \\frac{\\text{Total Fixed Costs}}{\\text{Contribution Margin}}$$
$$\\text{Break-Even Sales (Dollars)} = \\text{Break-Even Point (Units)} \\times \\text{Selling Price per Unit}$$

Where:
- **Fixed Costs** are overheads that do not change with production volume (e.g., rent, salaries, insurance).
- **Variable Costs** are expenses that increase directly as you produce more units (e.g., raw materials, packaging, shipping).`,
  example: `Suppose you run a bakery where:
- Total Monthly Fixed Costs (Rent + Salaries) = $5,000.
- Variable Cost to bake one cake = $5.
- Selling Price per cake = $15.

**Break-even calculation:**
1. Contribution Margin = $15 - $5 = $10 per cake.
2. Break-Even Units = $5,000 / $10 = 500 cakes.
3. Break-Even Revenue = 500 × $15 = $7,500.
4. You must sell **500 cakes** (or generate **$7,500** in sales) each month to cover your costs.`,
  faqs: [
    {
      q: 'Why is contribution margin important?',
      a: 'The contribution margin shows how much money each unit sold contributes toward covering your fixed overhead costs. Once fixed costs are fully covered, this margin directly becomes your profit.',
    },
    {
      q: 'What happens if my variable cost is higher than my selling price?',
      a: 'If variable cost exceeds selling price, your contribution margin is negative. You will lose money on every unit sold, making it mathematically impossible to break even, regardless of sales volume.',
    },
    {
      q: 'How can a business lower its break-even point?',
      a: 'A business can lower its break-even barrier by: (1) reducing fixed overhead costs, (2) lowering variable costs (negotiating cheaper supply rates), or (3) increasing the unit selling price.',
    },
  ],
};

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number>(5000);
  const [variableCost, setVariableCost] = useState<number>(5);
  const [sellingPrice, setSellingPrice] = useState<number>(15);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = fixedCosts >= 0 && variableCost >= 0 && sellingPrice > 0;

  let results = null;
  if (isValid) {
    const contributionMargin = sellingPrice - variableCost;
    
    let breakEvenUnits = 0;
    let breakEvenRevenue = 0;

    if (contributionMargin > 0) {
      breakEvenUnits = fixedCosts / contributionMargin;
      breakEvenRevenue = breakEvenUnits * sellingPrice;
    }

    results = {
      contributionMargin,
      breakEvenUnits,
      breakEvenRevenue,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (fixedCosts < 0) newErrors.fixedCosts = 'Fixed costs cannot be negative';
    if (variableCost < 0) newErrors.variableCost = 'Variable cost cannot be negative';
    if (sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than zero';
    if (sellingPrice <= variableCost) {
      newErrors.sellingPrice = 'Selling price must exceed variable cost to make break-even possible';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setFixedCosts(5000);
    setVariableCost(5);
    setSellingPrice(15);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Business Costs</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="fixed-costs" className="block text-sm font-semibold text-foreground/80 mb-2">
                Total Fixed Costs (Rent, Salaries, etc.)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="fixed-costs"
                  type="number"
                  value={fixedCosts || ''}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.fixedCosts && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fixedCosts}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="variable-cost" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Variable Cost (per unit)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    $
                  </div>
                  <input
                    id="variable-cost"
                    type="number"
                    value={variableCost || ''}
                    onChange={(e) => setVariableCost(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.variableCost && <p className="text-xs text-red-500 mt-1 font-medium">{errors.variableCost}</p>}
              </div>

              <div>
                <label htmlFor="selling-price" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Selling Price (per unit)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    $
                  </div>
                  <input
                    id="selling-price"
                    type="number"
                    value={sellingPrice || ''}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.sellingPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.sellingPrice}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Break-Even
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
            <h2 className="text-xl font-bold text-foreground mb-6">Break-Even Point</h2>
            {results ? (
              <div className="space-y-5">
                {results.contributionMargin <= 0 && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-600 dark:text-red-500">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Negative Contribution Margin</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        Your variable cost per unit (${variableCost.toLocaleString()}) exceeds or equals the selling price (${sellingPrice.toLocaleString()}). You will lose money on every sale, making it impossible to cover fixed overheads.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Break-Even Quantity (Sales Target)
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.contributionMargin > 0 ? Math.ceil(results.breakEvenUnits).toLocaleString() : 'N/A'} units
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Break-Even Sales Revenue
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.contributionMargin > 0 ? results.breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'N/A'}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Contribution Margin (per unit)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.contributionMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Margin Ratio (Profit Contribution)
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.contributionMargin > 0 ? ((results.contributionMargin / sellingPrice) * 100).toFixed(0) : '0'}%
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    Percentage of unit price that goes toward covering fixed overheads.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to calculate break-even point.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
