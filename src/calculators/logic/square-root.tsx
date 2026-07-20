'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Square Root Calculator computes the square roots, cube roots, and custom exponential powers of any positive number.`,
  formula: `Root and power operations follow standard exponent laws:

**1. Square Root:**
$$y = \\sqrt{x} = x^{0.5}$$

**2. Cube Root:**
$$y = \\sqrt[3]{x} = x^{\\frac{1}{3}}$$

**3. Custom Power Exponent:**
$$y = x^p$$`,
  example: `To find the square root and custom power of 9:
1. Base = 9.
2. Square Root = $\\sqrt{9}$ = **3**.
3. Cube Root = $\\sqrt[3]{9}$ ≈ **2.0801**.
4. 9 raised to power 3 ($9^3$) = **729**.`,
  faqs: [
    {
      q: 'What is a square root?',
      a: 'The square root of a number is a value that, when multiplied by itself, gives the original number (e.g. 3 × 3 = 9, so the square root of 9 is 3).',
    },
    {
      q: 'Can negative numbers have square roots?',
      a: 'In the real number system, negative numbers do not have square roots because the square of any real number is always positive. In advanced math, negative square roots are represented as imaginary numbers ($i = \\sqrt{-1}$). This calculator is designed for positive real numbers.',
    },
    {
      q: 'What is a perfect square?',
      a: 'A perfect square is an integer that is the square of another integer (e.g., 1, 4, 9, 16, 25, 36, etc.). Perfect squares have integer square roots.',
    },
  ],
};

type ExponentMode = 'sqrt' | 'cbrt' | 'power';

export default function SquareRootCalculator() {
  const [mode, setMode] = useState<ExponentMode>('sqrt');
  const [base, setBase] = useState<number>(9);
  const [power, setPower] = useState<number>(3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = !isNaN(base) && base >= 0 && (mode === 'power' ? !isNaN(power) : true);

  let results = null;
  if (isValid) {
    let result = 0;
    if (mode === 'sqrt') {
      result = Math.sqrt(base);
    } else if (mode === 'cbrt') {
      result = Math.cbrt(base);
    } else {
      result = Math.pow(base, power);
    }

    results = {
      result,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (isNaN(base) || base < 0) newErrors.base = 'Base number must be a positive number';
    if (mode === 'power' && isNaN(power)) newErrors.power = 'Exponent power must be a valid number';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setBase(9);
    setPower(3);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Exponents</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            {[
              { id: 'sqrt', label: 'Square Root (√)' },
              { id: 'cbrt', label: 'Cube Root (³√)' },
              { id: 'power', label: 'Power (x^p)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setMode(tab.id as ExponentMode); setErrors({}); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  mode === tab.id
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="base-num" className="block text-sm font-semibold text-foreground/80 mb-2">Base Number (x)</label>
              <input
                id="base-num"
                type="number"
                value={base || ''}
                onChange={(e) => { setBase(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
              />
              {errors.base && <p className="text-xs text-red-500 mt-1 font-medium">{errors.base}</p>}
            </div>

            {mode === 'power' && (
              <div>
                <label htmlFor="power-num" className="block text-sm font-semibold text-foreground/80 mb-2">Exponent Power (p)</label>
                <input
                  id="power-num"
                  type="number"
                  value={power || ''}
                  onChange={(e) => { setPower(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                />
                {errors.power && <p className="text-xs text-red-500 mt-1 font-medium">{errors.power}</p>}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Exponent
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
            <h2 className="text-xl font-bold text-foreground mb-6">Result Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    {mode === 'sqrt' ? 'Square Root Value' : mode === 'cbrt' ? 'Cube Root Value' : `Result (${base}^${power})`}
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.result.toLocaleString(undefined, { maximumFractionDigits: 9 })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter base and exponent parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
