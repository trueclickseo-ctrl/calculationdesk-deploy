'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Average Calculator (Arithmetic Mean Calculator) computes the average or central value of a given list of numbers. It parses raw comma-separated, space-separated, or line-separated inputs, and automatically returns the count, sum, arithmetic mean, median, mode, minimum, maximum, and range of the dataset.`,
  formula: `Basic descriptive statistics formulas include:

**1. Arithmetic Mean:**
$$\\text{Mean} = \\frac{\\sum_{k=1}^{N} x_k}{N}$$

**2. Median:** The middle value when the dataset is sorted in ascending order.
- If $N$ is odd: $\\text{Median} = x_{\\frac{N+1}{2}}$
- If $N$ is even: $\\text{Median} = \\frac{x_{\\frac{N}{2}} + x_{\\frac{N}{2}+1}}{2}$

**3. Mode:** The value(s) that appear most frequently in the dataset.

**4. Range:**
$$\\text{Range} = \\text{Maximum Value} - \\text{Minimum Value}$$`,
  example: `Suppose you enter the following dataset of scores: **10, 15, 10, 20, 25**.

1. Sort dataset: 10, 10, 15, 20, 25.
2. Count (N) = 5.
3. Sum = 10 + 10 + 15 + 20 + 25 = 80.
4. Mean = 80 / 5 = **16**.
5. Median = middle value = **15**.
6. Mode = most frequent number = **10** (appears twice).
7. Min = 10, Max = 25. Range = 25 - 10 = **15**.`,
  faqs: [
    {
      q: 'What is the difference between Mean, Median, and Mode?',
      a: 'Mean is the mathematical average. Median is the absolute physical middle of the sorted numbers. Mode is the most frequent value. For highly skewed datasets (like incomes), the Median is often a more representative average than the Mean.',
    },
    {
      q: 'Can a dataset have multiple modes?',
      a: 'Yes. If two or more numbers tie for the highest frequency, the dataset is multimodal (e.g., bimodal for two modes). If all numbers appear with equal frequency, the dataset is considered to have no mode.',
    },
    {
      q: 'What formats can I use to enter numbers?',
      a: 'This calculator is extremely flexible. You can separate your numbers using commas (","), spaces (" "), semicolons (";"), or newlines, making it easy to copy-paste lists directly from Excel spreadsheets or text documents.',
    },
  ],
};

export default function AverageCalculator() {
  const [inputText, setInputText] = useState<string>('10, 15, 10, 20, 25');
  const [errors, setErrors] = useState<string>('');

  const parseNumbers = (text: string): number[] => {
    // split by commas, semicolons, spaces, or newlines
    const tokens = text.split(/[,\s;\n]+/);
    const nums: number[] = [];
    tokens.forEach(t => {
      const clean = t.trim();
      if (clean !== '') {
        const n = Number(clean);
        if (!isNaN(n)) {
          nums.push(n);
        }
      }
    });
    return nums;
  };

  const nums = parseNumbers(inputText);
  const isValid = nums.length > 0;

  let results = null;
  if (isValid) {
    const sorted = [...nums].sort((a, b) => a - b);
    const count = nums.length;
    
    // Sum
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    
    // Mean
    const mean = sum / count;

    // Median
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Min / Max
    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) {
        maxFreq = freq[n];
      }
    });

    const modes: number[] = [];
    if (maxFreq > 1) {
      Object.keys(freq).forEach(k => {
        const numKey = Number(k);
        if (freq[numKey] === maxFreq) {
          modes.push(numKey);
        }
      });
    }

    results = {
      count,
      sum,
      mean,
      median,
      min,
      max,
      range,
      modes,
    };
  }

  const handleCalculate = () => {
    if (nums.length === 0) {
      setErrors('Please enter at least one valid number');
    } else {
      setErrors('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInputText('10, 15, 10, 20, 25');
    setErrors('');
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Numeric Dataset</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-text" className="block text-sm font-semibold text-foreground/80 mb-2">
                Enter your numbers
              </label>
              <textarea
                id="input-text"
                rows={6}
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setErrors(''); }}
                placeholder="e.g. 10, 15, 10, 20, 25"
                className="block w-full rounded-xl border border-border bg-background py-3 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-ring-custom transition-all"
              />
              <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">
                Separate values by commas, spaces, or newlines. Press Ctrl + Enter to verify.
              </span>
            </div>

            {errors && <p className="text-xs text-red-500 font-semibold">{errors}</p>}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Calculate Averages
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Statistical Analysis</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Arithmetic Mean (Average)
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.mean.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Median Value
                    </span>
                    <span className="block text-2xl font-extrabold text-accent mt-1">
                      {results.median.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Mode(s)
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.modes.length > 0 ? results.modes.join(', ') : 'No Mode'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Data Count (N)
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.count} numbers
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Minimum
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.min.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Maximum
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Range
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.range.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Sum of Values
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.sum.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter number list to view statistics.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
