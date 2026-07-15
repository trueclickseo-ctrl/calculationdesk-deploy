'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Percentage Calculator is a versatile math utility designed to solve common percentage-related mathematical operations. It supports finding percentage values of numbers, computing ratio percentages, determining percentage increase or decrease between two values, and adding or subtracting percentages to/from a base number.`,
  formula: `The mathematical equations for each percentage module are:

**1. Calculate Percentage of a Number:**
$$\\text{Value} = Y \\times \\left(\\frac{X}{100}\\right)$$

**2. Calculate Ratio Percentage (What % is X of Y):**
$$\\text{Percentage (\\%)} = \\left(\\frac{X}{Y}\\right) \\times 100$$

**3. Percentage Increase/Decrease (from X to Y):**
$$\\text{Percentage Change (\\%)} = \\left(\\frac{Y - X}{X}\\right) \\times 100$$

**4. Add or Subtract Percentage (Y ± X%):**
$$\\text{Result} = Y \\pm \\left(Y \\times \\frac{X}{100}\\right)$$`,
  example: `**1. What is 15% of $200?**
- Value = 200 × (15/100) = **$30**.

**2. $40 is what percent of $200?**
- Percentage = (40 / 200) × 100 = **20%**.

**3. What is the percentage change from $150 to $180?**
- Change = (($180 - $150) / $150) × 100 = (30 / 150) × 100 = **20% Increase**.`,
  faqs: [
    {
      q: 'What is a percentage?',
      a: 'A percentage is a number or ratio expressed as a fraction of 100. It is denoted using the percent sign "%". For example, 45% is equivalent to the fraction 45/100 or decimal 0.45.',
    },
    {
      q: 'How does percentage change differ from absolute change?',
      a: 'Absolute change is the simple difference between two numbers (e.g., $180 - $150 = $30). Percentage change measures that difference relative to the starting value ($30 / $150 = 20%), showing the relative growth or decline.',
    },
    {
      q: 'Can a percentage exceed 100%?',
      a: 'Yes. A value greater than 100% represents a multiplier of the original number. For example, 250% of $10 is $25, which is 2.5 times the base amount.',
    },
  ],
};

type CalcModule = 'value' | 'ratio' | 'change' | 'adjust';

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<CalcModule>('value');
  
  // Inputs
  const [valX, setValX] = useState<number>(15);
  const [valY, setValY] = useState<number>(200);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = !isNaN(valX) && !isNaN(valY) && 
                  (activeTab === 'ratio' ? valY !== 0 : true) && 
                  (activeTab === 'change' ? valX !== 0 : true);

  let result = null;
  if (isValid) {
    if (activeTab === 'value') {
      result = (valX / 100) * valY;
    } else if (activeTab === 'ratio') {
      result = (valX / valY) * 100;
    } else if (activeTab === 'change') {
      result = ((valY - valX) / valX) * 100;
    } else if (activeTab === 'adjust') {
      result = {
        add: valY * (1 + valX / 100),
        sub: valY * (1 - valX / 100),
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (isNaN(valX)) newErrors.valX = 'Enter a valid number';
    if (isNaN(valY)) newErrors.valY = 'Enter a valid number';
    if (activeTab === 'ratio' && valY === 0) newErrors.valY = 'Denominator cannot be zero';
    if (activeTab === 'change' && valX === 0) newErrors.valX = 'Initial value cannot be zero';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setValX(activeTab === 'value' ? 15 : activeTab === 'ratio' ? 40 : activeTab === 'change' ? 150 : 15);
    setValY(activeTab === 'value' ? 200 : activeTab === 'ratio' ? 200 : activeTab === 'change' ? 180 : 200);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Percentage Problem Solver</h2>
          
          <div className="flex flex-wrap gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            {[
              { id: 'value', label: 'What is X% of Y?' },
              { id: 'ratio', label: 'X is what % of Y?' },
              { id: 'change', label: '% Change X to Y' },
              { id: 'adjust', label: 'Add/Sub X% to/from Y' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id as CalcModule); setErrors({}); }}
                className={`px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {activeTab === 'value' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="val-x" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Percentage (X)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                      %
                    </div>
                    <input
                      id="val-x"
                      type="number"
                      value={valX || ''}
                      onChange={(e) => setValX(Number(e.target.value))}
                      className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valX && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valX}</p>}
                </div>
                <div>
                  <label htmlFor="val-y" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Total Value (Y)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-y"
                      type="number"
                      value={valY || ''}
                      onChange={(e) => setValY(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valY && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valY}</p>}
                </div>
              </div>
            )}

            {activeTab === 'ratio' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="val-x" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Part Value (X)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-x"
                      type="number"
                      value={valX || ''}
                      onChange={(e) => setValX(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valX && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valX}</p>}
                </div>
                <div>
                  <label htmlFor="val-y" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Whole Value (Y)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-y"
                      type="number"
                      value={valY || ''}
                      onChange={(e) => setValY(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valY && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valY}</p>}
                </div>
              </div>
            )}

            {activeTab === 'change' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="val-x" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Initial Value (X)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-x"
                      type="number"
                      value={valX || ''}
                      onChange={(e) => setValX(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valX && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valX}</p>}
                </div>
                <div>
                  <label htmlFor="val-y" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Final Value (Y)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-y"
                      type="number"
                      value={valY || ''}
                      onChange={(e) => setValY(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valY && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valY}</p>}
                </div>
              </div>
            )}

            {activeTab === 'adjust' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="val-x" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Percentage to Adjust (X)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                      %
                    </div>
                    <input
                      id="val-x"
                      type="number"
                      value={valX || ''}
                      onChange={(e) => setValX(Number(e.target.value))}
                      className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valX && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valX}</p>}
                </div>
                <div>
                  <label htmlFor="val-y" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Base Value (Y)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="val-y"
                      type="number"
                      value={valY || ''}
                      onChange={(e) => setValY(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.valY && <p className="text-xs text-red-500 mt-1 font-medium">{errors.valY}</p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Math
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Equation Result</h2>
            {result !== null ? (
              <div className="space-y-4">
                {activeTab === 'value' && (
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Result Value
                    </span>
                    <span className="block text-3xl font-extrabold text-primary mt-1">
                      {(result as number).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </span>
                    <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                      {valX}% of {valY} is {(result as number).toLocaleString()}
                    </span>
                  </div>
                )}

                {activeTab === 'ratio' && (
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Equivalent Ratio Percentage
                    </span>
                    <span className="block text-3xl font-extrabold text-primary mt-1">
                      {(result as number).toFixed(2)}%
                    </span>
                    <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                      {valX} is {(result as number).toFixed(4)}% of {valY}
                    </span>
                  </div>
                )}

                {activeTab === 'change' && (
                  <div className={`rounded-xl p-4 border ${
                    (result as number) >= 0 ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'
                  }`}>
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Percentage Change
                    </span>
                    <span className="block text-3xl font-extrabold mt-1">
                      {(result as number) >= 0 ? '+' : ''}{(result as number).toFixed(2)}%
                    </span>
                    <span className="block text-[10px] opacity-60 mt-1 font-semibold">
                      Value {(result as number) >= 0 ? 'increased' : 'decreased'} by {Math.abs(result as number).toFixed(2)}% from {valX} to {valY}
                    </span>
                  </div>
                )}

                {activeTab === 'adjust' && result && typeof result === 'object' && 'add' in result && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                        Added ({valY} + {valX}%)
                      </span>
                      <span className="block text-xl font-extrabold text-primary mt-1">
                        {(result as { add: number; sub: number }).add.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                    <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                        Subtracted ({valY} - {valX}%)
                      </span>
                      <span className="block text-xl font-extrabold text-accent mt-1">
                        {(result as { add: number; sub: number }).sub.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view solution.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
