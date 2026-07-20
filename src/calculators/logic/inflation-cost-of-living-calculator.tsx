'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Inflation & Cost of Living Index Calculator is a financial tool designed to project the impact of inflation on your purchasing power and estimate future living expenses. Inflation progressively erodes the real value of cash, meaning the same basket of goods will cost more in the future. This planner computes both the future cost of a given budget and the decayed value of holding uninvested cash over time. You can verify official inflation statistics on global economic databases: the [US Bureau of Labor Statistics (BLS)](https://www.bls.gov), the [Ministry of Statistics and Programme Implementation (MOSPI) of India](https://mospi.gov.in), and the [Office for National Statistics (ONS) of the UK](https://www.ons.gov.uk).',
  formula: `The calculator applies compound growth and discounting formulas to model the impact of rising prices:

1. **Future Cost of Basket (Expense Compounding)**:
   Estimates the cash needed in the future to purchase what you buy today:
   $$\\text{Future Expense} = C \\times \\left(1 + \\frac{I}{100}\\right)^t$$
   Where:
   - $C$ is your current budget or expense.
   - $I$ is the expected annual inflation rate.
   - $t$ is the time period in years.

2. **Purchasing Power Decay (Discounting Cash)**:
   Estimates what a fixed amount of cash held today will be worth in terms of actual buying power in the future:
   $$\\text{Real Value} = \\frac{P}{\\left(1 + \\frac{I}{100}\\right)^t}$$
   Where $P$ is the current cash principal.

3. **Cumulative Value Loss**:
   $$\\text{Loss of Buying Power} = P - \\text{Real Value}$$`,
  example: `Let's analyze an inflation decay example. Suppose you hold $10,000 in cash under a mattress (earning 0% return) for 15 years, and inflation averages 4% per year.

1. **Purchasing Power Decay**:
   - Starting Principal = $10,000.
   - Discounting at 4% annually:
     $$\\text{Real Value} = \\frac{10,000}{(1.04)^{15}} = \\text{S}5,553$$
   - Total buying power lost = $10,000 - $5,553 = $4,447.

2. **Future Expense Matching**:
   - To buy the same amount of goods that cost $10,000 today in 15 years, you will need:
     $$\\text{Future Budget} = 10,000 \\times (1.04)^{15} = \\text{S}18,009$$

Holding cash without investing it results in a 44% loss of purchasing power over 15 years due to cumulative inflation.`,
  faqs: [
    {
      q: 'What is the CPI (Consumer Price Index)?',
      a: 'The CPI is a measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care. Changes in the CPI are used to assess price changes associated with the cost of living and identify periods of inflation.',
    },
    {
      q: 'How does inflation affect my daily cost of living?',
      a: 'Inflation increases the prices of everyday goods and services. If your income does not increase at the same rate as inflation, your standard of living will decline because a larger share of your income will be spent on the same basic necessities.',
    },
    {
      q: 'What is a safe asset to hedge against inflation?',
      a: 'Historically, real assets like real estate, commodities, and equities (stocks/mutual funds) have outperformed inflation over the long term, whereas cash, fixed deposits, and bonds tend to lose real purchasing power.',
    },
    {
      q: 'What is hyperinflation?',
      a: 'Hyperinflation is an extremely rapid and out-of-control inflation, typically exceeding 50% per month. It completely erodes the value of the local currency and is usually caused by excessive printing of money by the government.',
    },
    {
      q: 'Is inflation always bad?',
      a: 'Not necessarily. Central banks generally target a low, stable inflation rate (typically 2% in developed nations) because mild inflation encourages spending and investment rather than hoarding cash, which helps drive economic growth.',
    },
  ],
};

export default function InflationCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [amount, setAmount] = useState<number>(5000);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [mode, setMode] = useState<'decay' | 'future'>('decay');

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

  const isValid = amount > 0 && inflationRate >= 0 && timePeriod > 0 && timePeriod <= 50;

  let results = null;
  if (isValid) {
    const I = inflationRate / 100;
    const t = timePeriod;

    const futureCost = amount * Math.pow(1 + I, t);
    const decayedValue = amount / Math.pow(1 + I, t);
    const costDifference = Math.max(0, futureCost - amount);
    const buyingPowerLost = Math.max(0, amount - decayedValue);

    results = {
      futureCost,
      decayedValue,
      costDifference,
      buyingPowerLost,
      decayPct: (decayedValue / amount) * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount <= 0) newErrors.amount = 'Amount must be greater than zero';
    if (inflationRate < 0) newErrors.inflationRate = 'Inflation rate cannot be negative';
    if (timePeriod <= 0 || timePeriod > 50) newErrors.timePeriod = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setAmount(5000);
    setInflationRate(4);
    setTimePeriod(10);
    setMode('decay');
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Inflation Settings</h2>
            
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
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Calculation Mode</label>
              <div className="flex rounded-xl border border-border bg-background p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setMode('decay')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'decay' ? 'bg-primary text-white shadow-sm' : 'text-foreground/75 hover:bg-border'
                  }`}
                >
                  Purchasing Power Decay
                </button>
                <button
                  type="button"
                  onClick={() => setMode('future')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'future' ? 'bg-primary text-white shadow-sm' : 'text-foreground/75 hover:bg-border'
                  }`}
                >
                  Future Expense Estimator
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="base-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                {mode === 'decay' ? 'Current Cash Principal' : 'Current Monthly Budget'}
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="base-amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inflation-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Inflation (%)
                </label>
                <input
                  id="inflation-rate"
                  type="number"
                  step="0.1"
                  value={inflationRate || ''}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="time-period" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Time Period (Years)
                </label>
                <input
                  id="time-period"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>
            {errors.timePeriod && <p className="text-xs text-red-500 mt-1 font-medium">{errors.timePeriod}</p>}

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Inflation Impact
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
              <div className="space-y-6">
                
                {/* Core highlight cards based on mode */}
                {mode === 'decay' ? (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-red-500/5 p-4 border border-red-500/10">
                      <span className="block text-xs font-bold text-red-500/80 uppercase tracking-wider">
                        Decayed Purchasing Power
                      </span>
                      <span className="block text-2xl font-extrabold text-red-500 mt-1">
                        {currencySymbols[currency]}{results.decayedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                      <span className="font-semibold text-foreground/50">Total Purchasing Power Lost:</span>
                      <span className="font-bold text-red-500">-{currencySymbols[currency]}{results.buyingPowerLost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                        Future Monthly Budget Needed
                      </span>
                      <span className="block text-2xl font-extrabold text-primary mt-1">
                        {currencySymbols[currency]}{results.futureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                      <span className="font-semibold text-foreground/50">Increase in Expenses:</span>
                      <span className="font-bold text-red-500">+{currencySymbols[currency]}{results.costDifference.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                )}

                {/* Sub details */}
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">Initial Value:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{amount.toLocaleString()}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">Inflation Rate:</span>
                    <span className="font-bold text-foreground">{inflationRate}% per year</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">Duration:</span>
                    <span className="font-bold text-foreground">{timePeriod} Years</span>
                  </div>
                </div>

                {/* Graphical bar comparison */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Purchasing Power Loss Comparison</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/60 mb-1">
                        <span>Original Buying Power</span>
                        <span>{currencySymbols[currency]}{amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/60 mb-1">
                        <span>Buying Power in {timePeriod} Years</span>
                        <span>{currencySymbols[currency]}{results.decayedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${results.decayPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter settings to simulate inflation impact.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
