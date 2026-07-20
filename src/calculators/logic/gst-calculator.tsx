'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `Goods and Services Tax (GST) is an indirect tax used in many nations on goods and services sold for domestic consumption. The tax is included in the final price and paid by consumers, but it is remitted to the government by the businesses selling the goods and services. GST is commonly calculated either as an addition (exclusive tax rate) or subtraction (inclusive tax rate) of the base product price. You can verify international tax rules on official revenue platforms: the [IRS (US)](https://www.irs.gov), the [GST Portal (India)](https://www.gst.gov.in), [HMRC (UK)](https://www.gov.uk/government/organisations/hm-revenue-customs), the [European Commission (EU)](https://taxation-customs.ec.europa.eu), the [FBR (Pakistan)](https://www.fbr.gov.pk), the [NBR (Bangladesh)](https://nbr.gov.bd), and the [GIB (Turkey)](https://www.gib.gov.tr).`,
  formula: `The formulas used to calculate GST are:

**To Add GST (Tax Exclusive Price):**
$$\\text{GST Amount} = \\text{Base Price} \\times \\left(\\frac{\\text{GST Rate}}{100}\\right)$$
$$\\text{Total Price (with GST)} = \\text{Base Price} + \\text{GST Amount}$$

**To Remove GST (Tax Inclusive Price):**
$$\\text{Base Price (Pre-Tax)} = \\frac{\\text{Total Price}}{1 + \\left(\\frac{\\text{GST Rate}}{100}\\right)}$$
$$\\text{GST Amount} = \\text{Total Price} - \\text{Base Price (Pre-Tax)}$$`,
  example: `Suppose you have a product priced at $100 and the GST rate is 18%.

**Case 1: Add GST (Exclusive)**
1. GST Amount = $100 × (18 / 100) = $18.00.
2. Net Total Price = $100 + $18 = $118.00.

**Case 2: Remove GST (Inclusive)**
1. Base Price (Pre-Tax) = $100 / (1 + 0.18) = $100 / 1.18 ≈ $84.75.
2. GST Amount = $100 - $84.75 = $15.25.`,
  faqs: [
    {
      q: 'What is the difference between GST inclusive and exclusive prices?',
      a: 'A GST inclusive price already includes the tax amount within the listed price. A GST exclusive price is the base price before taxes; the tax amount must be added to reach the final purchase price.',
    },
    {
      q: 'Can GST rates differ by product?',
      a: 'Yes. Most countries have tiered tax brackets (e.g., 5%, 12%, 18%, 28%) depending on whether the item is classified as a necessity, standard good, or luxury service.',
    },
    {
      q: 'Is GST same as VAT?',
      a: 'Yes, in practice, Goods and Services Tax (GST) and Value Added Tax (VAT) follow the same multi-stage destination-based tax system where taxes are levied at every stage of value addition.',
    },
  ],
};

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstAction, setGstAction] = useState<'add' | 'remove'>('add');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = amount > 0 && gstRate >= 0 && gstRate <= 100;

  let results = null;
  if (isValid) {
    let basePrice = 0;
    let gstAmount = 0;
    let totalPrice = 0;

    if (gstAction === 'add') {
      basePrice = amount;
      gstAmount = amount * (gstRate / 100);
      totalPrice = amount + gstAmount;
    } else {
      basePrice = amount / (1 + gstRate / 100);
      gstAmount = amount - basePrice;
      totalPrice = amount;
    }

    const basePercent = (basePrice / totalPrice) * 100;
    const gstPercent = (gstAmount / totalPrice) * 100;

    results = {
      basePrice,
      gstAmount,
      totalPrice,
      basePercent,
      gstPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount <= 0) newErrors.amount = 'Amount must be greater than zero';
    if (gstRate < 0 || gstRate > 100) newErrors.gstRate = 'Tax rate must be between 0% and 100%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setAmount(1000);
    setGstRate(18);
    setGstAction('add');
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">GST Tax Calculation</h2>
          
          <div className="space-y-5">
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Calculation Type</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGstAction('add')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    gstAction === 'add'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Add GST (Exclusive)
                </button>
                <button
                  type="button"
                  onClick={() => setGstAction('remove')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    gstAction === 'remove'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Remove GST (Inclusive)
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Amount (Cost)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div>
              <label htmlFor="gst-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                GST Tax Rate
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="gst-rate"
                  type="number"
                  value={gstRate || ''}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.gstRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.gstRate}</p>}
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
            <h2 className="text-xl font-bold text-foreground mb-6">GST Split Summary</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Total Gross Price
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Net Price (Pre-Tax)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-xs bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                    {results.basePercent.toFixed(0)}%
                  </span>
                </div>
                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      GST Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                    {results.gstPercent.toFixed(0)}%
                  </span>
                </div>

                {/* Split Gauge Bar */}
                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Cost Proportion</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-accent h-full transition-all duration-500" 
                      style={{ width: `${results.basePercent}%` }} 
                      title={`Net Price: ${results.basePercent.toFixed(0)}%`}
                    />
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${results.gstPercent}%` }} 
                      title={`GST: ${results.gstPercent.toFixed(0)}%`}
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Net Price</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">GST Amount</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view tax summary.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
