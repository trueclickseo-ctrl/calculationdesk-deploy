'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Mean, Median, and Mode Calculator identifies the three primary statistics of central tendency for a set of numbers. It takes a list of integers or decimals and calculates the arithmetic average (Mean), the middle value when sorted (Median), and the most frequently occurring value (Mode).`,
  formula: `Central tendencies are calculated using the following operations:

**1. Mean (Arithmetic Average):**
$$\\text{Mean} = \\frac{\\sum x_i}{N}$$

**2. Median (Middle Value):**
- Sort values in ascending order.
- If the count $N$ is odd, the median is the value at index $\\frac{N+1}{2}$.
- If the count $N$ is even, the median is the average of values at indexes $\\frac{N}{2}$ and $\\frac{N}{2} + 1$.

**3. Mode (Most Frequent):**
- The value(s) with the highest frequency count. A dataset can have one mode (unimodal), multiple modes (multimodal), or no mode (all values occur equally).`,
  example: `Suppose you enter the numbers: **3, 9, 3, 5, 8**.

1. Sort the list: 3, 3, 5, 8, 9.
2. Count (N) = 5.
3. Sum = 3 + 9 + 3 + 5 + 8 = 28.
4. Mean = 28 / 5 = **5.6**.
5. Median = middle value = **5** (at index 3).
6. Mode = **3** (appears twice; all other values appear once).`,
  faqs: [
    {
      q: 'Which central tendency measure is best?',
      a: 'It depends on your data. Mean is best for symmetrical data with no outliers. Median is best for skewed data (like real estate prices or household salaries) because it is unaffected by extreme outliers. Mode is best for categorical data (like shoe sizes) to find the most common choice.',
    },
    {
      q: 'Can a dataset have no mode?',
      a: 'Yes. If every number in the dataset appears exactly the same number of times (e.g., in the list 1, 2, 3, 4, 5, each occurs once), the dataset is considered to have no mode.',
    },
    {
      q: 'What does "skewed data" mean?',
      a: 'Data is skewed when the distribution is not symmetrical. If there are a few extremely large values, it is right-skewed (mean is larger than median). If there are extremely small values, it is left-skewed (mean is smaller than median).',
    },
  ],
};

export default function MeanMedianMode() {
  const [inputText, setInputText] = useState<string>('3, 9, 3, 5, 8');
  const [errors, setErrors] = useState<string>('');

  const parseNumbers = (text: string): number[] => {
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
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

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
      modes,
      sorted,
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
    setInputText('3, 9, 3, 5, 8');
    setErrors('');
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Numeric Series</h2>
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
                placeholder="e.g. 3, 9, 3, 5, 8"
                className="block w-full rounded-xl border border-border bg-background py-3 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-ring-custom transition-all"
              />
              <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">Separate by commas or spaces. Press Ctrl + Enter to calculate.</span>
            </div>

            {errors && <p className="text-xs text-red-500 font-semibold">{errors}</p>}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Solve Central Tendencies
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Mean, Median, Mode</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Mean</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">{results.mean.toFixed(2)}</span>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Median</span>
                    <span className="block text-xl font-extrabold text-accent mt-1">{results.median.toLocaleString()}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Mode(s)</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.modes.length > 0 ? results.modes.join(', ') : 'None'}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Sorted Dataset</span>
                  <span className="block text-sm font-semibold text-foreground/80 mt-1.5 leading-relaxed font-mono">
                    {results.sorted.join(', ')}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Count & Sum</span>
                  <span className="block text-sm font-semibold text-foreground/80 mt-1 leading-relaxed">
                    Count: {results.count} items &nbsp;|&nbsp; Sum: {results.sum.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter numbers to analyze.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
