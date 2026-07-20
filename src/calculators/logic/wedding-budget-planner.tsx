'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Wedding Budget Planner is an interactive financial tool designed to estimate, distribute, and manage wedding celebration expenses. By inputting a target budget, couples can allocate funds across core categories including the venue and catering, photography, attire, entertainment, flowers, and emergency miscellaneous reserves. This planner helps keep track of estimated costs to ensure wedding planning stays within realistic financial bounds. You can review standard wedding spend metrics on [The Knot website](https://www.theknot.com).',
  formula: `The budget planning model distributes your target amount based on standard industry percentages:

1. **Venue & Catering (45%)**:
   $$\\text{Venue Cost} = \\text{Total Budget} \\times 0.45$$

2. **Photography & Video (12%)**:
   $$\\text{Media Cost} = \\text{Total Budget} \\times 0.12$$

3. **Attire & Beauty (10%)**:
   $$\\text{Attire Cost} = \\text{Total Budget} \\times 0.10$$

4. **Entertainment (10%)**:
   $$\\text{Music/DJ Cost} = \\text{Total Budget} \\times 0.10$$

5. **Flowers & Decor (8%)**:
   $$\\text{Decor Cost} = \\text{Total Budget} \\times 0.08$$

6. **Miscellaneous & Emergencies (15%)**:
   $$\\text{Emergency Fund} = \\text{Total Budget} \\times 0.15$$

Knowing the wedding budget planner guidelines helps you manage vendor quotes effectively.`,
  example: `Let's trace a wedding budget planning example. Suppose you set a target budget of $30,000 for your wedding.

1. **Target Distribution**:
   - Venue & Catering (45%) = $13,500.
   - Photography & Video (12%) = $3,600.
   - Attire & Rings (10%) = $3,000.
   - Entertainment (10%) = $3,000.
   - Flowers & Decor (8%) = $2,400.
   - Miscellaneous (15%) = $4,500.

2. **Verification**:
   - Total Sum = $13,500 + $3,600 + $3,000 + $3,000 + $2,400 + $4,500 = $30,000.

By establishing this allocation baseline, you can track individual category quotes against these target limits.`,
  faqs: [
    {
      q: 'What is the single most expensive wedding category?',
      a: 'The venue rental and food/beverage catering typically comprise 40% to 50% of the entire wedding budget. Guest count is the primary driver of this cost, so keeping the guest list smaller is the most effective way to reduce wedding expenses.',
    },
    {
      q: 'Why is a miscellaneous/contingency budget necessary?',
      a: 'Wedding planning often involves hidden costs like venue service charges, local permit fees, vendor tips, attire alterations, taxes, and invitation postage. A 10% to 15% miscellaneous allocation covers these without blowing the budget.',
    },
    {
      q: 'How do we start allocating if our budget is tight?',
      a: 'Prioritize your top 3 non-negotiables (e.g., a great photographer, a beautiful venue, or high-quality food) and allocate funds to those first, then minimize allocations for secondary items like favors or designer invitations.',
    },
    {
      q: 'Is it customary to tip wedding vendors?',
      a: 'Yes, tipping is standard for select vendors like hair stylists, makeup artists, bartenders, drivers, and delivery teams, unless service gratuity is already factored into the venue contract.',
    },
    {
      q: 'How do destination weddings affect the budget?',
      a: 'Destination weddings can lower guest counts (which reduces catering costs) but increase personal travel, accommodation, and wedding planner costs. It is important to define who covers travel and lodging in advance.',
    },
  ],
};

export default function WeddingPlanner() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [totalBudget, setTotalBudget] = useState<number>(30000);
  
  // Percentages state
  const [venuePct, setVenuePct] = useState<number>(45);
  const [photoPct, setPhotoPct] = useState<number>(12);
  const [attirePct, setAttirePct] = useState<number>(10);
  const [musicPct, setMusicPct] = useState<number>(10);
  const [decorPct, setDecorPct] = useState<number>(8);
  const [miscPct, setMiscPct] = useState<number>(15);

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

  const totalPctSum = venuePct + photoPct + attirePct + musicPct + decorPct + miscPct;
  const isValid = totalBudget > 0 && totalPctSum > 0;

  // Values calculation
  const venueVal = totalBudget * (venuePct / 100);
  const photoVal = totalBudget * (photoPct / 100);
  const attireVal = totalBudget * (attirePct / 100);
  const musicVal = totalBudget * (musicPct / 100);
  const decorVal = totalBudget * (decorPct / 100);
  const miscVal = totalBudget * (miscPct / 100);
  const totalAllocatedVal = venueVal + photoVal + attireVal + musicVal + decorVal + miscVal;

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (totalBudget <= 0) newErrors.totalBudget = 'Target budget must be greater than zero';
    if (totalPctSum > 100) newErrors.pctSum = `Total allocated percentages sum to ${totalPctSum}%, which exceeds 100%`;
    setErrors(newErrors);
  };

  const handleReset = () => {
    setTotalBudget(30000);
    setVenuePct(45);
    setPhotoPct(12);
    setAttirePct(10);
    setMusicPct(10);
    setDecorPct(8);
    setMiscPct(15);
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius; // ~282.74

  let currentOffset = 0;
  const getStrokeDash = (pct: number) => {
    const strokeLength = (pct / totalPctSum) * circ;
    const dashArray = `${strokeLength} ${circ - strokeLength}`;
    const dashOffset = currentOffset;
    currentOffset -= strokeLength;
    return { dashArray, dashOffset };
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

  const venueDash = getStrokeDash(venuePct);
  const photoDash = getStrokeDash(photoPct);
  const attireDash = getStrokeDash(attirePct);
  const musicDash = getStrokeDash(musicPct);
  const decorDash = getStrokeDash(decorPct);
  const miscDash = getStrokeDash(miscPct);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Target Budget Planner</h2>
            
            {/* Currency select */}
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
              <label htmlFor="total-budget" className="block text-sm font-semibold text-foreground/80 mb-2">
                Total Target Budget
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="total-budget"
                  type="number"
                  value={totalBudget || ''}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.totalBudget && <p className="text-xs text-red-500 mt-1 font-medium">{errors.totalBudget}</p>}
            </div>

            {/* Custom sliders */}
            <div className="border-t border-border/60 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-foreground">Percentage Allocations</h3>
                <span className={`text-xs font-bold ${totalPctSum === 100 ? 'text-green-600' : 'text-red-500'}`}>
                  Sum: {totalPctSum}% {totalPctSum !== 100 && '(Target: 100%)'}
                </span>
              </div>
              {errors.pctSum && <p className="text-xs text-red-500 font-semibold">{errors.pctSum}</p>}

              {/* Slider: Venue */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Venue & Catering</span>
                  <span>{venuePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={venuePct}
                  onChange={(e) => setVenuePct(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Slider: Photo */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Photography & Video</span>
                  <span>{photoPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={photoPct}
                  onChange={(e) => setPhotoPct(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Slider: Attire */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Attire & Rings</span>
                  <span>{attirePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={attirePct}
                  onChange={(e) => setAttirePct(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Slider: Entertainment */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Entertainment & DJ</span>
                  <span>{musicPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicPct}
                  onChange={(e) => setMusicPct(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>

              {/* Slider: Decor */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Flowers & Decor</span>
                  <span>{decorPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={decorPct}
                  onChange={(e) => setDecorPct(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              {/* Slider: Misc */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-foreground/80">Miscellaneous</span>
                  <span>{miscPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={miscPct}
                  onChange={(e) => setMiscPct(Number(e.target.value))}
                  className="w-full accent-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Validate Allocations
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
            <h2 className="text-xl font-bold text-foreground mb-6">Allocation Breakdown</h2>
            {isValid ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Total Allocated Amount
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{totalAllocatedVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Venue & Food:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{venueVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Photo & Video:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{photoVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Attire & Rings:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{attireVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-violet-500" />
                      Entertainment:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{musicVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-pink-500" />
                      Decor & Flowers:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{decorVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-gray-500" />
                      Miscellaneous:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{miscVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {venuePct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[0]}
                          strokeWidth="8"
                          strokeDasharray={venueDash.dashArray}
                          strokeDashoffset={venueDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {photoPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[1]}
                          strokeWidth="8"
                          strokeDasharray={photoDash.dashArray}
                          strokeDashoffset={photoDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {attirePct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[2]}
                          strokeWidth="8"
                          strokeDasharray={attireDash.dashArray}
                          strokeDashoffset={attireDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {musicPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[3]}
                          strokeWidth="8"
                          strokeDasharray={musicDash.dashArray}
                          strokeDashoffset={musicDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {decorPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[4]}
                          strokeWidth="8"
                          strokeDasharray={decorDash.dashArray}
                          strokeDashoffset={decorDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {miscPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke={colors[5]}
                          strokeWidth="8"
                          strokeDasharray={miscDash.dashArray}
                          strokeDashoffset={miscDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Total Sum
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {totalPctSum}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view budget projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
