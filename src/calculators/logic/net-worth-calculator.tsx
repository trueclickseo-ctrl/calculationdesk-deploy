'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Net Worth Calculator is a personal finance tool designed to measure your total financial value. Your net worth is the sum of all your assets (what you own) minus all your liabilities (what you owe). It serves as a benchmark for your overall financial health and is a key metric in assessing long-term retirement progress.`,
  formula: `The formula to calculate your Net Worth is:

$$\\text{Net Worth} = \\sum \\text{Assets} - \\sum \\text{Liabilities}$$

Where:
- **Assets** include cash, savings accounts, mutual fund investments, real estate values, retirement accounts, and vehicles.
- **Liabilities** include active mortgage balances, personal loans, car financing, credit card balances, and student loans.`,
  example: `Suppose you evaluate your financial balance sheet with the following values:

**1. Assets:**
- Cash and Savings: $15,000
- Investment Portfolio: $60,000
- Property Market Value: $300,000
- **Total Assets = $375,000**

**2. Liabilities:**
- Active Mortgage: $180,000
- Car Loan Balance: $10,000
- Credit Card Debt: $5,000
- **Total Liabilities = $195,000**

**3. Net Worth Calculation:**
- Net Worth = $375,000 - $195,000 = **$180,000**.`,
  faqs: [
    {
      q: 'What is a "negative" net worth?',
      a: 'A negative net worth occurs when your total liabilities exceed your total assets. This is common among young professionals who have recently taken on large student loans or home mortgages early in their earning career.',
    },
    {
      q: 'Should I include my primary residence in my net worth?',
      a: 'Yes. Your home is a physical asset with market value. You should include its current estimated market value under Assets and the remaining mortgage balance under Liabilities to calculate your net home equity.',
    },
    {
      q: 'How often should I calculate my net worth?',
      a: 'Calculating your net worth once or twice a year is generally sufficient to track your long-term wealth trajectory, monitor debt repayment progress, and check investment growth.',
    },
  ],
};

export default function NetWorthCalculator() {
  // Assets
  const [cash, setCash] = useState<number>(15000);
  const [investments, setInvestments] = useState<number>(50000);
  const [property, setProperty] = useState<number>(350000);
  const [vehicles, setVehicles] = useState<number>(20000);
  const [retirement, setRetirement] = useState<number>(45000);
  
  // Liabilities
  const [mortgage, setMortgage] = useState<number>(190000);
  const [carLoan, setCarLoan] = useState<number>(8000);
  const [creditCard, setCreditCard] = useState<number>(3000);
  const [studentLoan, setStudentLoan] = useState<number>(12000);

  const totalAssets = cash + investments + property + vehicles + retirement;
  const totalLiabilities = mortgage + carLoan + creditCard + studentLoan;
  const netWorth = totalAssets - totalLiabilities;

  const totalCorpus = totalAssets + totalLiabilities;
  const assetPercent = totalCorpus > 0 ? (totalAssets / totalCorpus) * 100 : 100;
  const debtPercent = totalCorpus > 0 ? (totalLiabilities / totalCorpus) * 100 : 0;

  const handleReset = () => {
    setCash(15000);
    setInvestments(50000);
    setProperty(350000);
    setVehicles(20000);
    setRetirement(45000);
    setMortgage(190000);
    setCarLoan(8000);
    setCreditCard(3000);
    setStudentLoan(12000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Asset & Liability Sheets</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assets Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 border-b border-border pb-2">
                Assets (+)
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Cash & Savings', val: cash, setVal: setCash },
                  { label: 'Stocks & Mutual Funds', val: investments, setVal: setInvestments },
                  { label: 'Real Estate Valuations', val: property, setVal: setProperty },
                  { label: 'Vehicles Valuation', val: vehicles, setVal: setVehicles },
                  { label: 'Retirement (401k, PF)', val: retirement, setVal: setRetirement },
                ].map((item, index) => (
                  <div key={index}>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1">{item.label}</label>
                    <div className="relative rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-foreground/40 text-xs font-bold">
                        $
                      </div>
                      <input
                        type="number"
                        value={item.val || ''}
                        onChange={(e) => item.setVal(Number(e.target.value))}
                        className="block w-full py-2 pl-6 pr-3 text-xs font-medium outline-none bg-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liabilities Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 border-b border-border pb-2">
                Liabilities (-)
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Home Mortgage', val: mortgage, setVal: setMortgage },
                  { label: 'Car Loan Balance', val: carLoan, setVal: setCarLoan },
                  { label: 'Credit Card Balance', val: creditCard, setVal: setCreditCard },
                  { label: 'Student Loans', val: studentLoan, setVal: setStudentLoan },
                ].map((item, index) => (
                  <div key={index}>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1">{item.label}</label>
                    <div className="relative rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-foreground/40 text-xs font-bold">
                        $
                      </div>
                      <input
                        type="number"
                        value={item.val || ''}
                        onChange={(e) => item.setVal(Number(e.target.value))}
                        className="block w-full py-2 pl-6 pr-3 text-xs font-medium outline-none bg-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Net Worth Statement</h2>
            
            <div className="space-y-5">
              <div className={`rounded-xl p-4 border ${
                netWorth >= 0 ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'
              }`}>
                <span className="block text-xs font-bold uppercase tracking-wider opacity-60">
                  Total Net Worth
                </span>
                <span className="block text-3xl font-extrabold mt-1">
                  {netWorth >= 0 ? '' : '-'}${Math.abs(netWorth).toLocaleString()}
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  Total Assets Owned
                </span>
                <span className="block text-lg font-bold text-emerald-600 dark:text-emerald-500 mt-1">
                  ${totalAssets.toLocaleString()}
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  Total Liabilities Owed
                </span>
                <span className="block text-lg font-bold text-red-500 mt-1">
                  ${totalLiabilities.toLocaleString()}
                </span>
              </div>

              {/* Slider ratio */}
              <div className="pt-2">
                <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Asset vs Debt Ratio</span>
                <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${assetPercent}%` }} 
                  />
                  <div 
                    className="bg-red-500 h-full transition-all duration-500" 
                    style={{ width: `${debtPercent}%` }} 
                  />
                </div>
                <div className="flex gap-4 mt-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-foreground/70">Assets ({assetPercent.toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-foreground/70">Debts ({debtPercent.toFixed(0)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
