'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Ratio Calculator simplifies ratios, scales them up or down to find missing values, and divides a total quantity into proportion shares based on a custom ratio split.`,
  formula: `Ratio calculations use these basic algebraic methods:

**1. Ratio Simplification (A : B):**
- Find the Greatest Common Divisor (GCD) of A and B.
- Reduced Ratio = (A / GCD) : (B / GCD).

**2. Ratio Scaling (A : B = X : Y):**
- Solves for the missing value using cross-multiplication:
  $$Y = \\frac{X \\times B}{A}$$ (if solving for Y).

**3. Division of Quantity Q by Ratio (A : B : C):**
- Sum of ratio parts: $S = A + B + C$.
- Share of A:
  $$\\text{Share}_A = Q \\times \\left(\\frac{A}{S}\\right)$$`,
  example: `**1. Simplify the ratio 24 : 36:**
- GCD of 24 and 36 is 12.
- Simplified = (24/12) : (36/12) = **2 : 3**.

**2. Divide $600 in the ratio 1 : 2 : 3:**
- Sum of parts = 1 + 2 + 3 = 6.
- Share 1 = 600 × (1/6) = **$100**.
- Share 2 = 600 × (2/6) = **$200**.
- Share 3 = 600 × (3/6) = **$300**.`,
  faqs: [
    {
      q: 'What is a ratio?',
      a: 'A ratio is a mathematical comparison of two or more numbers showing their relative sizes. It is written with a colon (e.g., A : B) or as a fraction (A / B).',
    },
    {
      q: 'Can a ratio have decimals?',
      a: 'Ratios are traditionally expressed in whole numbers. If you have a decimal ratio like 1.5 : 2.5, you can multiply both by 10 to get 15 : 25, which reduces to 3 : 5.',
    },
    {
      q: 'What is scaling a ratio?',
      a: 'Scaling a ratio means multiplying or dividing all terms of the ratio by the same non-zero number to preserve the proportion while matching a new target baseline.',
    },
  ],
};

function gcd(a: number, b: number): number {
  let tempA = Math.abs(a);
  let tempB = Math.abs(b);
  while (tempB) {
    const t = tempB;
    tempB = tempA % tempB;
    tempA = t;
  }
  return tempA;
}

type RatioTab = 'simplify' | 'scale' | 'split';

export default function RatioCalculator() {
  const [activeTab, setActiveTab] = useState<RatioTab>('simplify');

  // Simplify inputs
  const [simpA, setSimpA] = useState<number>(24);
  const [simpB, setSimpB] = useState<number>(36);

  // Scale inputs
  const [scaleA, setScaleA] = useState<number>(2);
  const [scaleB, setScaleB] = useState<number>(3);
  const [scaleX, setScaleX] = useState<number>(8);

  // Split inputs
  const [quantity, setQuantity] = useState<number>(600);
  const [splitRatio, setSplitRatio] = useState<string>('1:2:3');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    if (activeTab === 'simplify') {
      setSimpA(24);
      setSimpB(36);
    } else if (activeTab === 'scale') {
      setScaleA(2);
      setScaleB(3);
      setScaleX(8);
    } else {
      setQuantity(600);
      setSplitRatio('1:2:3');
    }
    setErrors({});
  };

  // Computations
  let simplifyResults = null;
  if (activeTab === 'simplify' && simpA > 0 && simpB > 0) {
    const common = gcd(simpA, simpB);
    simplifyResults = {
      reducedA: simpA / common,
      reducedB: simpB / common,
      decimal: simpA / simpB,
    };
  }

  let scaleResults = null;
  if (activeTab === 'scale' && scaleA > 0 && scaleB > 0 && scaleX > 0) {
    const solvedY = (scaleX * scaleB) / scaleA;
    scaleResults = {
      solvedY,
    };
  }

  let splitResults = null;
  if (activeTab === 'split' && quantity > 0 && splitRatio.trim() !== '') {
    const parts = splitRatio.split(':').map(p => Number(p.trim())).filter(p => !isNaN(p) && p > 0);
    if (parts.length > 0) {
      const sum = parts.reduce((acc, curr) => acc + curr, 0);
      const shares = parts.map(p => (quantity * p) / sum);
      splitResults = {
        shares,
        parts,
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'simplify') {
      if (simpA <= 0) newErrors.simpA = 'Value must be greater than zero';
      if (simpB <= 0) newErrors.simpB = 'Value must be greater than zero';
    } else if (activeTab === 'scale') {
      if (scaleA <= 0) newErrors.scaleA = 'Value must be greater than zero';
      if (scaleB <= 0) newErrors.scaleB = 'Value must be greater than zero';
      if (scaleX <= 0) newErrors.scaleX = 'Value must be greater than zero';
    } else {
      if (quantity <= 0) newErrors.quantity = 'Quantity must be greater than zero';
      const parts = splitRatio.split(':').map(p => Number(p.trim())).filter(p => !isNaN(p) && p > 0);
      if (parts.length === 0) newErrors.splitRatio = 'Enter a valid ratio split (e.g. 1:2:3)';
    }
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
          <h2 className="text-xl font-bold text-foreground mb-6">Ratio Setups</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            {[
              { id: 'simplify', label: 'Simplify' },
              { id: 'scale', label: 'Scale Value' },
              { id: 'split', label: 'Split Quantity' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id as RatioTab); setErrors({}); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
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
            {activeTab === 'simplify' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="simp-a" className="block text-sm font-semibold text-foreground/80 mb-2">Value A</label>
                  <input
                    id="simp-a"
                    type="number"
                    value={simpA || ''}
                    onChange={(e) => setSimpA(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  />
                  {errors.simpA && <p className="text-xs text-red-500 mt-1 font-medium">{errors.simpA}</p>}
                </div>
                <div>
                  <label htmlFor="simp-b" className="block text-sm font-semibold text-foreground/80 mb-2">Value B</label>
                  <input
                    id="simp-b"
                    type="number"
                    value={simpB || ''}
                    onChange={(e) => setSimpB(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  />
                  {errors.simpB && <p className="text-xs text-red-500 mt-1 font-medium">{errors.simpB}</p>}
                </div>
              </div>
            )}

            {activeTab === 'scale' && (
              <div className="space-y-4">
                <span className="block text-xs font-bold text-foreground/45 uppercase tracking-wider">A : B = X : Y</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="scale-a" className="block text-xs font-semibold text-foreground/60 mb-1">Value A</label>
                    <input
                      id="scale-a"
                      type="number"
                      value={scaleA || ''}
                      onChange={(e) => setScaleA(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                    {errors.scaleA && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.scaleA}</p>}
                  </div>
                  <div>
                    <label htmlFor="scale-b" className="block text-xs font-semibold text-foreground/60 mb-1">Value B</label>
                    <input
                      id="scale-b"
                      type="number"
                      value={scaleB || ''}
                      onChange={(e) => setScaleB(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                    {errors.scaleB && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.scaleB}</p>}
                  </div>
                  <div>
                    <label htmlFor="scale-x" className="block text-xs font-semibold text-foreground/60 mb-1">Value X</label>
                    <input
                      id="scale-x"
                      type="number"
                      value={scaleX || ''}
                      onChange={(e) => setScaleX(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                    {errors.scaleX && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.scaleX}</p>}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'split' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-foreground/80 mb-2">Total Quantity to Split</label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  />
                  {errors.quantity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.quantity}</p>}
                </div>

                <div>
                  <label htmlFor="split-ratio" className="block text-sm font-semibold text-foreground/80 mb-2">Ratio Split (colon separated)</label>
                  <input
                    id="split-ratio"
                    type="text"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(e.target.value)}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                    placeholder="e.g. 1:2:3"
                  />
                  {errors.splitRatio && <p className="text-xs text-red-500 mt-1 font-medium">{errors.splitRatio}</p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Ratio
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
            <h2 className="text-xl font-bold text-foreground mb-6">Ratio Output</h2>

            {activeTab === 'simplify' && (
              simplifyResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Simplified Ratio</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {simplifyResults.reducedA} : {simplifyResults.reducedB}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Decimal equivalent</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {simplifyResults.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter non-zero values.</div>
              )
            )}

            {activeTab === 'scale' && (
              scaleResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Solved Y Value</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {scaleResults.solvedY.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </span>
                    <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                      Proportion: {scaleA} : {scaleB} = {scaleX} : {scaleResults.solvedY.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter valid non-zero values.</div>
              )
            )}

            {activeTab === 'split' && (
              splitResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Split Shares</span>
                    <div className="space-y-2">
                      {splitResults.shares.map((share, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-semibold border-b border-primary/10 pb-1">
                          <span className="text-foreground/50">Part {idx + 1} (ratio {splitResults.parts[idx]})</span>
                          <span className="text-foreground">{share.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter splits and total quantity.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
