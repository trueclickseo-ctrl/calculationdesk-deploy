'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Discount Calculator determines final sales prices, total monetary savings, and percentages saved on discounted items. It supports stacking (double-discount) configurations and local sales tax calculations.`,
  formula: `Discount equations apply fractional markdowns sequentially or cumulatively:

**1. Price After Primary Discount:**
$$\\text{Primary Sale Price} = \\text{Original Price} \\times \\left( 1 - \\frac{\\text{Discount \\%}}{100} \\right)$$

**2. Stacking (Double) Discount:**
$$\\text{Final Sale Price} = \\text{Primary Sale Price} \\times \\left( 1 - \\frac{\\text{Stacking Discount \\%}}{100} \\right)$$

**3. Total Savings:**
$$\\text{Total Savings} = \\text{Original Price} - \\text{Final Sale Price}$$`,
  example: `**Calculate final price for a $100 item with 20% off and an additional 10% coupon:**
- Original Price = $100. Primary Discount = 20%. Secondary Discount = 10%.
- Primary Sale Price = 100 × (1 - 0.20) = $80.
- Final Sale Price = 80 × (1 - 0.10) = **$72.00**.
- Total Savings = 100 - 72 = **$28.00** (28% overall discount).`,
  faqs: [
    {
      q: 'How do double (stacked) discounts work?',
      a: 'Double discounts are calculated sequentially: the secondary percentage is deducted from the already discounted price, rather than adding the percentages together (e.g., 20% + 10% equals a 28% total discount, not 30%).',
    },
    {
      q: 'Is tax calculated on the original price or the sale price?',
      a: 'Sales tax is calculated on the final discounted sale price, not the original MSRP.',
    },
    {
      q: 'What is a discount rate?',
      a: 'The discount rate is the percentage by which the original price of an item is reduced.',
    },
  ],
};

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [additionalDiscount, setAdditionalDiscount] = useState<number>(10);
  const [taxRate, setTaxRate] = useState<number>(8);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setOriginalPrice(100);
    setDiscountPercent(20);
    setAdditionalDiscount(10);
    setTaxRate(8);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(originalPrice) && originalPrice >= 0 &&
                  !isNaN(discountPercent) && discountPercent >= 0 &&
                  !isNaN(additionalDiscount) && additionalDiscount >= 0 &&
                  !isNaN(taxRate) && taxRate >= 0;

  if (isValid) {
    const primaryDiscountAmount = originalPrice * (discountPercent / 100);
    const primaryPrice = originalPrice - primaryDiscountAmount;
    
    const additionalDiscountAmount = primaryPrice * (additionalDiscount / 100);
    const salePricePreTax = primaryPrice - additionalDiscountAmount;

    const taxAmount = salePricePreTax * (taxRate / 100);
    const finalPriceWithTax = salePricePreTax + taxAmount;

    const totalSavings = originalPrice - salePricePreTax;
    const effectiveDiscountPercent = originalPrice > 0 ? (totalSavings / originalPrice) * 100 : 0;

    results = {
      primaryDiscountAmount,
      additionalDiscountAmount,
      salePricePreTax,
      taxAmount,
      finalPriceWithTax,
      totalSavings,
      effectiveDiscountPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (originalPrice < 0 || isNaN(originalPrice)) newErrors.originalPrice = 'Original price cannot be negative';
    if (discountPercent < 0 || isNaN(discountPercent)) newErrors.discountPercent = 'Discount cannot be negative';
    if (additionalDiscount < 0 || isNaN(additionalDiscount)) newErrors.additionalDiscount = 'Additional discount cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Discount Options</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="original-price" className="block text-sm font-semibold text-foreground/80 mb-2">Original Price ($)</label>
              <input
                id="original-price"
                type="number"
                value={originalPrice}
                onChange={(e) => { setOriginalPrice(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.originalPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.originalPrice}</p>}
            </div>

            <div>
              <label htmlFor="discount-percent" className="block text-sm font-semibold text-foreground/80 mb-2">Primary Discount (%)</label>
              <input
                id="discount-percent"
                type="number"
                value={discountPercent}
                onChange={(e) => { setDiscountPercent(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.discountPercent && <p className="text-xs text-red-500 mt-1 font-medium">{errors.discountPercent}</p>}
            </div>

            <div>
              <label htmlFor="additional-discount" className="block text-sm font-semibold text-foreground/80 mb-2">Stacking Discount (%) (Optional)</label>
              <input
                id="additional-discount"
                type="number"
                value={additionalDiscount}
                onChange={(e) => { setAdditionalDiscount(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.additionalDiscount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.additionalDiscount}</p>}
            </div>

            <div>
              <label htmlFor="tax-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Sales Tax Rate (%) (Optional)</label>
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
                Solve Discounts
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
            <h2 className="text-xl font-bold text-foreground mb-6">Savings Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Final Price (With Tax)</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.finalPriceWithTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Sale Price (Pre-Tax)</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.salePricePreTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Savings</span>
                    <span className="block text-lg font-bold text-emerald-500 mt-1">
                      ${results.totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({results.effectiveDiscountPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Primary Discount Amt</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.primaryDiscountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Stacked Discount Amt</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.additionalDiscountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter discount variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
