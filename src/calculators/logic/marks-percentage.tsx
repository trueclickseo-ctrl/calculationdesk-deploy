'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Marks Percentage Calculator computes your percentage score in a test, exam, or course based on the marks you obtained and the maximum total marks possible. It is a quick tool for students and teachers to convert test ratios into final academic grades.`,
  formula: `The marks percentage is computed by dividing the score obtained by the maximum marks, and multiplying by 100:

$$\\text{Percentage (\\%)} = \\left(\\frac{M_{\\text{obtained}}}{M_{\\text{total}}}\\right) \\times 100$$
$$\\text{Marks Lost} = M_{\\text{total}} - M_{\\text{obtained}}$$

Where:
- **M_obtained** is the score or marks you received.
- **M_total** is the maximum possible score of the exam paper.`,
  example: `Suppose you scored 56 marks out of a total of 80 marks on a math test.

1. Obtained Marks = 56.
2. Total Marks = 80.
3. Calculate Percentage:
   $$\\text{Percentage} = \\left(\\frac{56}{80}\\right) \\times 100 = 0.70 \\times 100 = 70\\%$$
4. You scored **70%** on the exam, with 24 marks lost.`,
  faqs: [
    {
      q: 'How do I combine percentages for multiple tests?',
      a: 'To combine scores, do not average the percentages directly unless the tests have equal weight. Instead, sum up all obtained marks and divide by the sum of all maximum marks: $\\sum M_{\\text{obtained}} / \\sum M_{\\text{total}} \\times 100$.',
    },
    {
      q: 'Can obtained marks exceed total marks?',
      a: 'Yes, if you earned bonus points or extra credit on the exam, your obtained marks can be higher than the maximum total marks, resulting in a percentage score over 100%.',
    },
    {
      q: 'What is a passing grade percentage?',
      a: 'Passing grades vary by institution, but standard marks percentages require at least 40%, 50%, or 60% to pass courses.',
    },
  ],
};

export default function MarksPercentage() {
  const [obtained, setObtained] = useState<number>(68);
  const [total, setTotal] = useState<number>(80);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = total > 0 && obtained >= 0;

  let results = null;
  if (isValid) {
    const percentage = (obtained / total) * 100;
    const lost = Math.max(0, total - obtained);
    const lostPercent = (lost / total) * 100;

    results = {
      percentage,
      lost,
      lostPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (total <= 0) newErrors.total = 'Total marks must be greater than zero';
    if (obtained < 0) newErrors.obtained = 'Obtained marks cannot be negative';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setObtained(68);
    setTotal(80);
    setErrors({});
  };

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const obtainedStroke = results ? (results.percentage / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Test Scores</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="obtained-marks" className="block text-sm font-semibold text-foreground/80 mb-2">
                Marks Obtained
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="obtained-marks"
                  type="number"
                  value={obtained || ''}
                  onChange={(e) => setObtained(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.obtained && <p className="text-xs text-red-500 mt-1 font-medium">{errors.obtained}</p>}
            </div>

            <div>
              <label htmlFor="total-marks" className="block text-sm font-semibold text-foreground/80 mb-2">
                Out of / Total Marks
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="total-marks"
                  type="number"
                  value={total || ''}
                  onChange={(e) => setTotal(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.total && <p className="text-xs text-red-500 mt-1 font-medium">{errors.total}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Percentage
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
            <h2 className="text-xl font-bold text-foreground mb-6">Score Grade</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Obtained Score Percentage
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.percentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Marks Lost
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.lost} marks ({results.lostPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-44 w-44">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--border)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--primary)"
                        strokeWidth="12.5"
                        strokeDasharray={circ}
                        strokeDashoffset={circ - obtainedStroke}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Score
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter scores to view grade results.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
