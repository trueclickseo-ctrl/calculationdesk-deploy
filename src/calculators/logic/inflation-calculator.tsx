'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Inflation Calculator is an economic tool designed to estimate how the purchasing power of money changes over time due to inflation. Inflation represents the rate at which the general level of prices for goods and services rises, causing the currency's buying value to decrease. Understanding inflation is critical for long-term retirement planners, budgeters, and investors.`,
  formula: `The formulas used to project inflation values are:

**Future Cost of living (Equivalent value in future):**
$$F = P \\times (1 + i)^t$$

**Future Purchasing Power (Value of current money in future):**
$$P_{\\text{future}} = \\frac{P}{(1 + i)^t}$$

Where:
- **P** is the initial monetary amount.
- **F** is the future cost equivalent (monetary value needed in future to match current buying power).
- **P_future** is the purchasing power of the amount in the future (the buying value of that amount adjusted for inflation).
- **i** is the average annual inflation rate (divided by 100).
- **t** is the number of years.`,
  example: `Suppose you have $10,000 today and the average annual inflation rate is 5% over the next 10 years.

**Case 1: Future Cost equivalent**
1. F = $10,000 × (1 + 0.05)^{10} = $10,000 × (1.05)^{10} ≈ $16,288.95.
2. You will need **$16,288.95** in 10 years to buy what costs $10,000 today.

**Case 2: Future Purchasing Power equivalent**
1. P_future = $10,000 / (1 + 0.05)^{10} = $10,000 / 1.628895 ≈ $6,139.13.
2. The real purchasing power of your $10,000 bill will decay to **$6,139.13** in 10 years.`,
  faqs: [
    {
      q: 'What is a typical average rate of inflation?',
      a: 'In stable economies, central banks generally target an average inflation rate of around 2% to 3% annually. However, developing nations or economies experiencing crises can experience higher average rates.',
    },
    {
      q: 'Does inflation affect stock or property investments?',
      a: 'Yes. Real estate and equities historically act as hedges against inflation because properties and corporate earnings usually rise alongside general consumer prices, protecting your real wealth.',
    },
    {
      q: 'What causes inflation?',
      a: 'Inflation is commonly caused by two factors: Demand-Pull inflation (when demand for products grows faster than supply can keep up) and Cost-Push inflation (when rising manufacturing and raw material costs drive up final prices).',
    },
  ],
};

export default function InflationCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [tenure, setTenure] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = amount > 0 && inflationRate >= 0 && inflationRate <= 100 && tenure > 0 && tenure <= 100;

  let results = null;
  if (isValid) {
    const i = inflationRate / 100;
    const t = tenure;

    const futureCost = amount * Math.pow(1 + i, t);
    const purchasingPower = amount / Math.pow(1 + i, t);
    const valueLoss = amount - purchasingPower;

    results = {
      futureCost,
      purchasingPower,
      valueLoss,
      powerPercent: (purchasingPower / amount) * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount <= 0) newErrors.amount = 'Amount must be greater than zero';
    if (inflationRate < 0 || inflationRate > 100) newErrors.inflationRate = 'Inflation rate must be between 0% and 100%';
    if (tenure <= 0 || tenure > 100) newErrors.tenure = 'Time period must be between 1 and 100 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setAmount(10000);
    setInflationRate(4);
    setTenure(10);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Inflation Variables</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monetary Amount (Current value)
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inflation-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Average Inflation (p.a.)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="inflation-rate"
                    type="number"
                    step="0.1"
                    value={inflationRate || ''}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.inflationRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.inflationRate}</p>}
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Time Period (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="tenure"
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
              </div>
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
            <h2 className="text-xl font-bold text-foreground mb-6">Inflation Projections</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Equivalent Future Cost (to buy same goods)
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.futureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    An extra ${(results.futureCost - amount).toLocaleString(undefined, { maximumFractionDigits: 0 })} needed due to price rises.
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Future Buying Power of Current ${amount.toLocaleString()}
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <span className="text-xs bg-red-500/10 text-red-500 font-bold px-2 py-0.5 rounded-full">
                    -{results.powerPercent.toFixed(0)}% value
                  </span>
                </div>

                {/* Split Slider */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Purchasing Power Decay</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${results.powerPercent}%` }} 
                    />
                    <div 
                      className="bg-red-500 h-full transition-all duration-500" 
                      style={{ width: `${100 - results.powerPercent}%` }} 
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Remaining Value ({results.powerPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-foreground/70">Lost Buying Power ({(100 - results.powerPercent).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter parameters to view inflation projections.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
