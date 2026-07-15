'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Currency Converter calculates approximate equivalencies between major global currencies (USD, EUR, GBP, INR, JPY, CAD, AUD, CNY) and allows manually editing exchange rates for custom calculations.`,
  formula: `Currency translations apply exchange ratios relative to a base currency (USD):

- Equivalent Value:
  $$\\text{Target Amount} = \\text{Input Amount} \\times \\left( \\frac{\\text{Rate}_{\\text{to}}}{\\text{Rate}_{\\text{from}}} \\right)$$`,
  example: `**Convert 100 EUR to USD (given EUR/USD rate = 1.08):**
- Input = 100 EUR. Exchange Rate = 1.08 USD per EUR.
- Output = 100 × 1.08 = **$108.00 USD**.`,
  faqs: [
    {
      q: 'Are the exchange rates in this calculator live?',
      a: 'No. Statically exported web pages do not fetch live currency markets. This tool uses pre-programmed reference rates but allows you to customize the exchange rate manually to perform precise real-time calculations.',
    },
    {
      q: 'What is a base currency?',
      a: 'In a currency pair quotation, the base currency is the first currency listed (e.g., in EUR/USD, EUR is the base currency and USD is the quote currency).',
    },
    {
      q: 'Why do exchange rates fluctuate?',
      a: 'Exchange rates are determined by global foreign exchange markets where currencies are bought and sold based on supply, demand, interest rates, inflation, and geopolitical stability.',
    },
  ],
};

const CURRENCIES = [
  { name: 'US Dollar (USD)', symbol: '$', key: 'USD', rateToUSD: 1 },
  { name: 'Euro (EUR)', symbol: '€', key: 'EUR', rateToUSD: 0.92 },
  { name: 'British Pound (GBP)', symbol: '£', key: 'GBP', rateToUSD: 0.78 },
  { name: 'Indian Rupee (INR)', symbol: '₹', key: 'INR', rateToUSD: 83.5 },
  { name: 'Japanese Yen (JPY)', symbol: '¥', key: 'JPY', rateToUSD: 158.0 },
  { name: 'Canadian Dollar (CAD)', symbol: 'C$', key: 'CAD', rateToUSD: 1.37 },
  { name: 'Australian Dollar (AUD)', symbol: 'A$', key: 'AUD', rateToUSD: 1.50 },
  { name: 'Chinese Yuan (CNY)', symbol: '¥', key: 'CNY', rateToUSD: 7.26 },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState<string>('USD');
  const [toCurr, setToCurr] = useState<string>('EUR');
  
  // Custom rate overrides
  const [customRateActive, setCustomRateActive] = useState<boolean>(false);
  const [customRate, setCustomRate] = useState<number>(0.92);

  const handleReset = () => {
    setAmount(100);
    setFromCurr('USD');
    setToCurr('EUR');
    setCustomRateActive(false);
    setCustomRate(0.92);
  };

  const fromObj = CURRENCIES.find((c) => c.key === fromCurr) || CURRENCIES[0];
  const toObj = CURRENCIES.find((c) => c.key === toCurr) || CURRENCIES[1];

  // Default exchange rate between selected pair
  const defaultRate = toObj.rateToUSD / fromObj.rateToUSD;

  // Actual exchange rate to use
  const activeRate = customRateActive ? customRate : defaultRate;

  // Convert
  const result = amount * activeRate;

  // Change currency handlers
  const handleFromChange = (newFrom: string) => {
    setFromCurr(newFrom);
    const fromC = CURRENCIES.find((c) => c.key === newFrom) || CURRENCIES[0];
    const newRate = toObj.rateToUSD / fromC.rateToUSD;
    setCustomRate(newRate);
  };

  const handleToChange = (newTo: string) => {
    setToCurr(newTo);
    const toC = CURRENCIES.find((c) => c.key === newTo) || CURRENCIES[0];
    const newRate = toC.rateToUSD / fromObj.rateToUSD;
    setCustomRate(newRate);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Currency</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="convert-value" className="block text-sm font-semibold text-foreground/80 mb-2">Amount to Convert</label>
              <input
                id="convert-value"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from-unit" className="block text-sm font-semibold text-foreground/80 mb-2">From</label>
                <select
                  id="from-unit"
                  value={fromCurr}
                  onChange={(e) => handleFromChange(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.key} value={c.key}>{c.key} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="to-unit" className="block text-sm font-semibold text-foreground/80 mb-2">To</label>
                <select
                  id="to-unit"
                  value={toCurr}
                  onChange={(e) => handleToChange(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.key} value={c.key}>{c.key} - {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <input
                  id="custom-rate-toggle"
                  type="checkbox"
                  checked={customRateActive}
                  onChange={(e) => setCustomRateActive(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <label htmlFor="custom-rate-toggle" className="text-xs font-semibold text-foreground/75 cursor-pointer">
                  Manually edit exchange rate
                </label>
              </div>
              
              {customRateActive && (
                <div>
                  <input
                    type="number"
                    value={customRate}
                    step="0.0001"
                    onChange={(e) => setCustomRate(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
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
            <h2 className="text-xl font-bold text-foreground mb-6">Conversion Result</h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Converted Output</span>
                <span className="block text-3xl font-extrabold text-primary mt-1">
                  {fromObj.symbol}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} = {toObj.symbol}{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="block text-[11px] font-semibold text-foreground/45 mt-2">
                  Exchange Rate: 1 {fromObj.key} = {activeRate.toFixed(4)} {toObj.key}
                </span>
              </div>

              {!customRateActive && (
                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Major Equivalencies for {fromObj.symbol}{amount}</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    {CURRENCIES.filter((c) => c.key !== fromCurr).map((c) => {
                      const rate = c.rateToUSD / fromObj.rateToUSD;
                      const val = amount * rate;
                      return (
                        <div key={c.key} className="flex justify-between items-center text-xs border-b border-border/40 pb-1.5">
                          <span className="font-semibold text-foreground/50">{c.key}:</span>
                          <span className="font-bold text-foreground">
                            {c.symbol}{val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-foreground/40 leading-relaxed italic">
                Disclaimer: The market rates displayed are approximate static averages. For real-world transactions, enable the rate override tool to input current rates directly from your banking institution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
