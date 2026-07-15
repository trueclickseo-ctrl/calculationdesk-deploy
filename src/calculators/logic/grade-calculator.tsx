'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const seoData = {
  whatIs: `The Grade Calculator (Final Exam Grade Planner) computes the minimum score you must achieve on your upcoming final exam to secure your desired overall grade in a class. It uses your current grade and the percentage weight that the final exam contributes to your total course score.`,
  formula: `The required final exam score is calculated using the weighted grade average equation:

$$\\text{Required Score} = \\frac{D - C \\times (1 - w)}{w}$$

Where:
- **D** is your desired target grade for the course (expressed as a percentage).
- **C** is your current grade prior to the final exam (expressed as a percentage).
- **w** is the percentage weight of the final exam (divided by 100).`,
  example: `Suppose your current grade in biology is 85% (C), you want to finish the course with at least a 90% (D), and your final exam is worth 20% of your grade (w = 0.20).

1. Current Grade (C) = 85.
2. Desired Grade (D) = 90.
3. Exam Weight (w) = 20% = 0.20.
4. Calculate Required Exam Score:
   $$\\text{Required Score} = \\frac{90 - 85 \\times (1 - 0.20)}{0.20}$$
   $$\\text{Required Score} = \\frac{90 - 85 \\times 0.80}{0.20} = \\frac{90 - 68}{0.20} = \\frac{22}{0.20} = 110$$
5. You must score **110%** on the final exam to achieve a 90% overall grade (which would require extra credit).`,
  faqs: [
    {
      q: 'What does a required score of over 100% mean?',
      a: 'It means it is mathematically impossible to reach your desired grade based on standard exam scoring, unless your instructor offers extra credit opportunities on the final exam.',
    },
    {
      q: 'How do I calculate my current class grade?',
      a: 'You can average your scores across categories (tests, quizzes, homework) by their respective weights, or sum up all points earned and divide by the total possible points to find your current percentage.',
    },
    {
      q: 'What if my final exam weight is not a percentage?',
      a: 'If your grading uses a total points system, the weight is calculated as: $\\text{Final Exam Points} / \\text{Total Course Points}$.',
    },
  ],
};

export default function GradeCalculator() {
  const [current, setCurrent] = useState<number>(85);
  const [desired, setDesired] = useState<number>(90);
  const [weight, setWeight] = useState<number>(20);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = current >= 0 && current <= 200 && desired >= 0 && desired <= 200 && 
                  weight > 0 && weight < 100;

  let results = null;
  if (isValid) {
    const w = weight / 100;
    const requiredScore = (desired - current * (1 - w)) / w;

    results = {
      requiredScore,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (current < 0 || current > 200) newErrors.current = 'Current grade must be between 0% and 200%';
    if (desired < 0 || desired > 200) newErrors.desired = 'Desired grade must be between 0% and 200%';
    if (weight <= 0 || weight >= 100) newErrors.weight = 'Final exam weight must be between 1% and 99%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setCurrent(85);
    setDesired(90);
    setWeight(20);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Class Grades</h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="current-grade" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Current Grade
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="current-grade"
                    type="number"
                    value={current || ''}
                    onChange={(e) => setCurrent(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.current && <p className="text-xs text-red-500 mt-1 font-medium">{errors.current}</p>}
              </div>

              <div>
                <label htmlFor="desired-grade" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Desired Grade
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="desired-grade"
                    type="number"
                    value={desired || ''}
                    onChange={(e) => setDesired(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.desired && <p className="text-xs text-red-500 mt-1 font-medium">{errors.desired}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="exam-weight" className="block text-sm font-semibold text-foreground/80 mb-2">
                Final Exam Weight
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="exam-weight"
                  type="number"
                  value={weight || ''}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Exam Score
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
            <h2 className="text-xl font-bold text-foreground mb-6">Target Exam Score</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Required Score on Final Exam
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.requiredScore.toFixed(1)}%
                  </span>
                </div>

                {results.requiredScore <= 100 ? (
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 dark:text-emerald-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Achievable Goal</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        You need to score <strong className="font-extrabold text-sm">{results.requiredScore.toFixed(1)}%</strong> on the final exam to reach your {desired}% class target.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-600 dark:text-red-500">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Extra Credit Needed</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        A final score of <strong className="font-extrabold text-sm">{results.requiredScore.toFixed(1)}%</strong> exceeds 100%. You will need bonus marks or extra credit projects to reach this overall grade.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Current Term Allocation
                  </span>
                  <span className="block text-sm font-semibold text-foreground/80 mt-1 font-mono">
                    Current grade covers {(100 - weight)}% of total grade.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view final exam targets.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
