'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Lumpsum with Inflation Adjuster is a financial projection utility that estimates the future value of a one-time lump-sum investment. Crucially, it calculates both the nominal value (the future cash amount) and the real value (the purchasing power in today\'s money terms) by discounting for projected annual inflation. This gives investors a realistic view of their long-term wealth growth. You can review historical inflation rates on official statistical databases: the [US Bureau of Labor Statistics (BLS)](https://www.bls.gov), the [Ministry of Statistics and Programme Implementation (MOSPI) of India](https://mospi.gov.in), the [Eurostat (EU)](https://ec.europa.eu/eurostat), the [Office for National Statistics (ONS) of the UK](https://www.ons.gov.uk), the [Pakistan Bureau of Statistics (PBS)](https://www.pbs.gov.pk), the [Bangladesh Bureau of Statistics (BBS)](http://www.bbs.gov.bd), and the [Turkish Statistical Institute (TUIK)](https://www.tuik.gov.tr).',
  formula: `The calculator uses compounding equations for nominal returns and discounts them for annual inflation:

1. **Nominal Future Value (FV)**:
   $$\\text{Nominal Value} = P \\times (1 + R)^t$$
   Where:
   - $P$ is the one-time principal investment amount.
   - $R$ is the expected annual rate of return:
     $$R = \\frac{\\text{Expected Return}}{100}$$
   - $t$ is the time period in years.

2. **Real Future Value (Adjusted for Inflation)**:
   $$\\text{Real Value} = \\frac{\\text{Nominal Value}}{(1 + I)^t}$$
   Where $I$ is the expected annual inflation rate:
   $$I = \\frac{\\text{Expected Inflation}}{100}$$

3. **Loss to Inflation**:
   $$\\text{Inflation Impact} = \\text{Nominal Value} - \\text{Real Value}$$`,
  example: `Let's analyze a lumpsum inflation-adjusted example. Suppose you make a one-time investment of $50,000 for 20 years, expecting an average annual return of 12%, and project average annual inflation to run at 6%.

1. **Nominal Maturity Value**:
   - Nominal Value = $50,000 × (1.12)^20 = $482,314.
   - Nominal Wealth Gained = $432,314.

2. **Inflation-Adjusted Real Value**:
   - Real Value = $482,314 / (1.06)^20 = $150,380.
   - Real Wealth Gained = $100,380.

3. **Inflation Impact**:
   - Impact of inflation = $482,314 - $150,380 = $331,934.

This indicates that while you will have $482,314 in cash in 20 years, its actual buying power will be equivalent to $150,380 in today's terms.`,
  faqs: [
    {
      q: 'Why should I adjust my investment returns for inflation?',
      a: 'Adjusting for inflation is critical because inflation erodes the purchasing power of money over time. A large future cash balance might purchase far less than it does today. Calculating the real return tells you if your wealth is genuinely growing or just keeping pace with rising costs.',
    },
    {
      q: 'What is a realistic inflation rate to enter?',
      a: 'For developed countries like the US or EU, a historical long-term average inflation rate is typically 2% to 4%. For developing economies like India, Pakistan, or Turkey, average inflation can range from 5% to 10% or higher.',
    },
    {
      q: 'What is the difference between nominal and real returns?',
      a: 'Nominal return is the raw percentage gain or cash value earned on an investment before any adjustments. Real return is the actual growth rate or purchasing power after subtracting the rate of inflation.',
    },
    {
      q: 'Does this calculator compound returns monthly or annually?',
      a: 'Lumpsum investments are modeled using standard annual compounding, which is the industry norm for evaluating CAGR (Compound Annual Growth Rate) and comparing returns against inflation rates.',
    },
    {
      q: 'How can I protect my lumpsum investments from inflation?',
      a: 'To beat inflation, you need to invest in asset classes that historically deliver returns higher than the inflation rate, such as equities, mutual funds, or real estate, rather than keeping cash in low-interest savings accounts.',
    },
  ],
};

export default function LumpsumInflationCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [initialInvestment, setInitialInvestment] = useState<number>(50000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [timePeriod, setTimePeriod] = useState<number>(20);

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

  const isValid = initialInvestment > 0 && expectedReturn > 0 && inflationRate >= 0 && timePeriod > 0 && timePeriod <= 50;

  let results = null;
  if (isValid) {
    const R = expectedReturn / 100;
    const I = inflationRate / 100;

    const nominalValue = initialInvestment * Math.pow(1 + R, timePeriod);
    const realValue = nominalValue / Math.pow(1 + I, timePeriod);
    const inflationImpact = Math.max(0, nominalValue - realValue);

    const nominalGain = Math.max(0, nominalValue - initialInvestment);
    const realGain = Math.max(0, realValue - initialInvestment);

    results = {
      nominalValue,
      realValue,
      inflationImpact,
      nominalGain,
      realGain,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (initialInvestment <= 0) newErrors.initialInvestment = 'Initial investment must be greater than zero';
    if (expectedReturn <= 0) newErrors.expectedReturn = 'Expected return must be greater than zero';
    if (inflationRate < 0) newErrors.inflationRate = 'Inflation rate cannot be negative';
    if (timePeriod <= 0 || timePeriod > 50) newErrors.timePeriod = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setInitialInvestment(50000);
    setExpectedReturn(12);
    setInflationRate(6);
    setTimePeriod(20);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Investment Settings</h2>
            
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
              <label htmlFor="initial-invest" className="block text-sm font-semibold text-foreground/80 mb-2">
                One-Time Lumpsum Investment
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="initial-invest"
                  type="number"
                  value={initialInvestment || ''}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.initialInvestment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.initialInvestment}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="expected-return" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Expected Return (%)
                </label>
                <input
                  id="expected-return"
                  type="number"
                  value={expectedReturn || ''}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="inflation-rate" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Inflation Rate (%)
                </label>
                <input
                  id="inflation-rate"
                  type="number"
                  value={inflationRate || ''}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="time-period" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Duration (Years)
                </label>
                <input
                  id="time-period"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
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
                Estimate Real Growth
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Nominal vs Real highlight cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Nominal Future Value
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1.5">
                      {currencySymbols[currency]}{results.nominalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/10">
                    <span className="block text-xs font-bold text-emerald-500/80 uppercase tracking-wider">
                      Real Value (Purchasing Power)
                    </span>
                    <span className="block text-xl font-extrabold text-emerald-500 mt-1.5">
                      {currencySymbols[currency]}{results.realValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Initial Principal:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{initialInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Total Nominal Gains:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.nominalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Total Real Gains:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.realGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Loss due to Inflation:</span>
                    <span className="font-bold text-red-500">{currencySymbols[currency]}{results.inflationImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Graphical bar indicator */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Purchasing Power Comparison</h4>
                  <div className="space-y-3">
                    {/* Nominal value bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/60 mb-1">
                        <span>Nominal Future Value</span>
                        <span>{currencySymbols[currency]}{results.nominalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    {/* Real value bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/60 mb-1">
                        <span>Real Value (Purchasing Power)</span>
                        <span>{currencySymbols[currency]}{results.realValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(results.realValue / results.nominalValue) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter investment details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
