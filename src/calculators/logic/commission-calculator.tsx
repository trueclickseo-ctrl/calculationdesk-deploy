'use client';

import React, { useState } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';

export const seoData = {
  whatIs: `The Commission Calculator helps agents, sales managers, and payroll officers compute sales commission earnings. It supports both flat-rate percentages and tiered margin schedules.`,
  formula: `Commission payouts follow two main structures:

**1. Flat Commission Rate:**
$$\\text{Commission} = \\text{Sales Amount} \\times \\left( \\frac{\\text{Commission \\%}}{100} \\right)$$

**2. Tiered Commission Rates:**
Sales are divided into bounds, with different rates applied to each portion:
- Cumulative tier totals:
  $$\\text{Commission} = \\sum_{i=1}^{n} (\\text{Eligible Sales in Tier } i \\times \\text{Rate } i)$$`,
  example: `**Flat commission calculation:**
- Total Sales = $50,000. Flat Commission = 5%.
- Commission Payout = 50,000 × 0.05 = **$2,500**.`,
  faqs: [
    {
      q: 'What is a tiered commission structure?',
      a: 'A tiered commission structure pays higher commission rates as sales representatives reach higher milestones, rewarding high performers.',
    },
    {
      q: 'What is OTE?',
      a: 'OTE (On-Target Earnings) represents the total potential salary of a sales representative, including base salary plus the commissions earned by hitting sales targets.',
    },
    {
      q: 'Does commission include base salary?',
      a: 'No. Commission is performance-based pay on top of any set base salary.',
    },
  ],
};

type CommissionMode = 'flat' | 'tiered';

interface CommissionTier {
  id: string;
  upto: number | 'unlimited';
  rate: number;
}

export default function CommissionCalculator() {
  const [mode, setMode] = useState<CommissionMode>('flat');
  const [salesAmount, setSalesAmount] = useState<number>(25000);
  const [flatRate, setFlatRate] = useState<number>(5);
  const [baseSalary, setBaseSalary] = useState<number>(2000);

  const [tiers, setTiers] = useState<CommissionTier[]>([
    { id: '1', upto: 10000, rate: 3 },
    { id: '2', upto: 50000, rate: 6 },
    { id: '3', upto: 'unlimited', rate: 10 },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setMode('flat');
    setSalesAmount(25000);
    setFlatRate(5);
    setBaseSalary(2000);
    setTiers([
      { id: '1', upto: 10000, rate: 3 },
      { id: '2', upto: 50000, rate: 6 },
      { id: '3', upto: 'unlimited', rate: 10 },
    ]);
    setErrors({});
  };

  const handleAddTier = () => {
    // Insert new tier before 'unlimited'
    const newId = (Math.random() * 1000).toFixed(0);
    const lastLimit = tiers.length >= 2 ? (tiers[tiers.length - 2].upto as number) + 10000 : 10000;
    const updated = [...tiers];
    updated.splice(updated.length - 1, 0, { id: newId, upto: lastLimit, rate: 5 });
    setTiers(updated);
  };

  const handleRemoveTier = (id: string) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter((t) => t.id !== id));
    }
  };

  const handleUpdateTier = (id: string, field: 'upto' | 'rate', val: number | 'unlimited') => {
    setTiers(
      tiers.map((t) => {
        if (t.id === id) {
          return { ...t, [field]: val };
        }
        return t;
      })
    );
  };

  // Computations
  let commissionAmount = 0;
  const validSales = !isNaN(salesAmount) && salesAmount >= 0;
  const validBase = !isNaN(baseSalary) && baseSalary >= 0;

  if (validSales) {
    if (mode === 'flat') {
      const rate = isNaN(flatRate) ? 0 : flatRate;
      commissionAmount = salesAmount * (rate / 100);
    } else {
      // Tiered computation
      let remaining = salesAmount;
      let prevLimit = 0;

      for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        const rate = isNaN(tier.rate) ? 0 : tier.rate;
        if (tier.upto === 'unlimited') {
          commissionAmount += remaining * (rate / 100);
          break;
        } else {
          const limit = isNaN(tier.upto) ? 0 : tier.upto;
          const tierSpan = limit - prevLimit;
          if (tierSpan <= 0) continue;

          const eligible = Math.min(remaining, tierSpan);
          commissionAmount += eligible * (rate / 100);
          remaining -= eligible;
          prevLimit = limit;
          if (remaining <= 0) break;
        }
      }
    }
  }

  const totalEarnings = (validBase ? baseSalary : 0) + commissionAmount;

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (salesAmount < 0 || isNaN(salesAmount)) newErrors.salesAmount = 'Sales amount cannot be negative';
    if (flatRate < 0 || isNaN(flatRate)) newErrors.flatRate = 'Commission rate cannot be negative';
    if (baseSalary < 0 || isNaN(baseSalary)) newErrors.baseSalary = 'Base salary cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Commission Variables</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('flat'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'flat'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Flat Commission
            </button>
            <button
              type="button"
              onClick={() => { setMode('tiered'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'tiered'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Tiered Rate
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="sales-amount" className="block text-sm font-semibold text-foreground/80 mb-2">Total Sales Amount ($)</label>
              <input
                id="sales-amount"
                type="number"
                value={salesAmount}
                onChange={(e) => { setSalesAmount(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.salesAmount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.salesAmount}</p>}
            </div>

            <div>
              <label htmlFor="base-salary" className="block text-sm font-semibold text-foreground/80 mb-2">Base Salary ($)</label>
              <input
                id="base-salary"
                type="number"
                value={baseSalary}
                onChange={(e) => { setBaseSalary(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.baseSalary && <p className="text-xs text-red-500 mt-1 font-medium">{errors.baseSalary}</p>}
            </div>

            {mode === 'flat' ? (
              <div>
                <label htmlFor="flat-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Commission Rate (%)</label>
                <input
                  id="flat-rate"
                  type="number"
                  value={flatRate}
                  onChange={(e) => { setFlatRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.flatRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.flatRate}</p>}
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-semibold text-foreground/80">Tiers Configuration</label>
                <div className="space-y-2">
                  {tiers.map((tier, index) => (
                    <div key={tier.id} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <span className="block text-[10px] text-foreground/50 font-bold mb-1">
                          {index === 0 ? 'First Tier Limit ($)' : tier.upto === 'unlimited' ? 'Remainder' : 'Up To ($)'}
                        </span>
                        <input
                          type="text"
                          disabled={tier.upto === 'unlimited'}
                          value={tier.upto}
                          onChange={(e) => handleUpdateTier(tier.id, 'upto', Number(e.target.value))}
                          className="block w-full py-1.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background/50 outline-none disabled:opacity-50"
                        />
                      </div>
                      <div className="w-24">
                        <span className="block text-[10px] text-foreground/50 font-bold mb-1">Rate (%)</span>
                        <input
                          type="number"
                          value={tier.rate}
                          onChange={(e) => handleUpdateTier(tier.id, 'rate', Number(e.target.value))}
                          className="block w-full py-1.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={tier.upto === 'unlimited' || tiers.length <= 1}
                        onClick={() => handleRemoveTier(tier.id)}
                        className="p-1.5 text-foreground/40 hover:text-red-500 disabled:opacity-30 self-end mb-1 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Add Tier Boundary
                </button>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Commission
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
            <h2 className="text-xl font-bold text-foreground mb-6">Payout Breakdown</h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Earnings (Salary + Comm)</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Commission Payout</span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    ${commissionAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Base Salary</span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    ${baseSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
