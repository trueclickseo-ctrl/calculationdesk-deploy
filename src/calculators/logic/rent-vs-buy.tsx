'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Rent vs Buy Calculator compares the long-term financial costs of renting a home against purchasing one, factoring in rent inflation, mortgage payments, maintenance, and home equity growth.`,
  formula: `The calculator projects costs over $N$ years:

**1. Renting Total Cost ($C_r$):**
$$C_r = \\sum_{t=1}^{N} \\left( \\text{Monthly Rent} \\times 12 \\times (1 + i)^t \\right)$$
Where $i$ is annual rent inflation (typically 3%).

**2. Buying Net Cost ($C_b$):**
$$C_b = \\text{Total Payments} + \\text{Taxes} + \\text{Maintenance} - \\text{Home Equity}$$
Where:
- Total Payments = Monthly Mortgage EMI × 12 × $N$
- Home Equity = Appreciated Home Price - Remaining Loan Balance
- Appreciated Home Price = $\\text{Purchase Price} \\times (1 + a)^N$ ($a$ = appreciation rate)`,
  example: `**Compare renting at $1,500/mo (3% inflation) vs buying a $300,000 home (20% down, 6% rate, 3% appreciation) over 10 years:**
- Total renting cost = **$206,341** cumulative rent paid.
- Buying total mortgage paid + taxes + maintenance = $261,348.
- Appreciated home value = $403,174. Remaining loan = $195,841. Equity = $207,333.
- Net Buying Cost = 261,348 - 207,333 = **$54,015**.
- Buying is cheaper by **$152,326** over 10 years!`,
  faqs: [
    {
      q: 'Which is better, renting or buying?',
      a: 'Buying generally builds long-term wealth through home equity and appreciation if you plan to stay in the home for more than 5-7 years. Renting provides flexibility, lower upfront costs, and zero maintenance liability, making it ideal for shorter stays.',
    },
    {
      q: 'What is the "5-year rule" in real estate?',
      a: 'The 5-year rule states that you should not buy a home unless you plan to live in it for at least 5 years. Otherwise, transaction costs (closing fees, realtor commissions) will likely wipe out any equity gains.',
    },
    {
      q: 'How is property maintenance calculated?',
      a: 'A common rule of thumb is to budget 1% of the home\'s total value annually for ongoing maintenance, repairs, and updates.',
    },
  ],
};

export default function RentVsBuyCalculator() {
  const [rent, setRent] = useState<number>(1500);
  const [price, setPrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [rate, setRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setRent(1500);
    setPrice(300000);
    setDownPayment(60000);
    setRate(6);
    setYears(10);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(rent) && rent > 0 &&
                  !isNaN(price) && price > 0 &&
                  !isNaN(downPayment) && downPayment >= 0 && downPayment < price &&
                  !isNaN(rate) && rate > 0 &&
                  !isNaN(years) && years > 0;

  if (isValid) {
    // 1. Renting projections
    let totalRent = 0;
    let currentRent = rent;
    for (let t = 0; t < years; t++) {
      totalRent += currentRent * 12;
      currentRent *= 1.03; // 3% annual rent inflation
    }

    // 2. Buying projections
    const principal = price - downPayment;
    const monthlyRate = rate / 12 / 100;
    const numPayments = 30 * 12; // Assume standard 30 year term

    const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Total mortgage paid over comparison period
    const totalMortgagePaid = monthlyPI * 12 * Math.min(years, 30);
    
    // Remaining loan balance
    let balance = principal;
    const compMonths = Math.min(years * 12, numPayments);
    for (let m = 0; m < compMonths; m++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPI - interest;
      balance -= principalPaid;
    }

    // Home appreciation (3% annually)
    const appreciatedValue = price * Math.pow(1.03, years);
    const equity = appreciatedValue - Math.max(0, balance);

    // Maintenance (1% of property price annually) & Property tax (1.2% annually)
    const totalMaintenance = price * 0.01 * years;
    const totalTaxes = price * 0.012 * years;

    const netBuyingCost = totalMortgagePaid + totalMaintenance + totalTaxes + downPayment - equity;

    results = {
      totalRent,
      netBuyingCost,
      appreciatedValue,
      equity,
      cheaperOption: totalRent < netBuyingCost ? 'Renting' : 'Buying',
      cheaperDiff: Math.abs(totalRent - netBuyingCost),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (rent <= 0 || isNaN(rent)) newErrors.rent = 'Rent must be greater than zero';
    if (price <= 0 || isNaN(price)) newErrors.price = 'Price must be greater than zero';
    if (downPayment < 0 || downPayment >= price || isNaN(downPayment)) {
      newErrors.downPayment = 'Down payment must be between 0 and the property price';
    }
    if (rate <= 0 || isNaN(rate)) newErrors.rate = 'Mortgage rate must be greater than zero';
    if (years <= 0 || isNaN(years)) newErrors.years = 'Comparison period must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Financial Comparison</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-rent" className="block text-sm font-semibold text-foreground/80 mb-2">Monthly Rent ($)</label>
              <input
                id="monthly-rent"
                type="number"
                value={rent}
                onChange={(e) => { setRent(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.rent && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rent}</p>}
            </div>

            <div>
              <label htmlFor="home-price" className="block text-sm font-semibold text-foreground/80 mb-2">Home Purchase Price ($)</label>
              <input
                id="home-price"
                type="number"
                value={price}
                onChange={(e) => { setPrice(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1 font-medium">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="down-payment" className="block text-sm font-semibold text-foreground/80 mb-2">Down Payment ($)</label>
              <input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => { setDownPayment(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.downPayment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.downPayment}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="mortgage-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Mortgage Rate (%)</label>
                <input
                  id="mortgage-rate"
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
              </div>

              <div>
                <label htmlFor="comparison-years" className="block text-sm font-semibold text-foreground/80 mb-2">Period (Years)</label>
                <input
                  id="comparison-years"
                  type="number"
                  value={years}
                  onChange={(e) => { setYears(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.years && <p className="text-xs text-red-500 mt-1 font-medium">{errors.years}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Rent vs Buy
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
            <h2 className="text-xl font-bold text-foreground mb-6">Wealth Comparison Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Financial Winner</span>
                  <span className="block text-2xl font-extrabold text-primary mt-2">
                    {results.cheaperOption} is cheaper by ${results.cheaperDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Renting Cost</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.totalRent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Net Buying Cost</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.netBuyingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Appreciated Home Value:</span>
                    <span className="text-foreground font-bold">
                      ${results.appreciatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Home Equity Accumulated:</span>
                    <span className="text-foreground font-bold">
                      ${results.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter housing specs.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
