'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Probability Calculator evaluates the likelihood of occurrence of single events or relationships between two distinct events (A and B). It computes single success ratios, odds of winning vs losing, event unions, intersections, and conditional probability metrics.`,
  formula: `Probability math is computed using these basic axioms:

**1. Single Event Probability:**
$$P(A) = \\frac{\\text{Favorable Outcomes (Successes)}}{\\text{Total Possible Outcomes (Trials)}}$$
$$\\text{Odds of Success} = \\frac{P(A)}{1 - P(A)} = \\text{Successes} : \\text{Failures}$$

**2. Two-Event Relationship Rules:**
- Union (A or B occurs):
  $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
- Conditional Probability (A given B occurs):
  $$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$
- Conditional Probability (B given A occurs):
  $$P(B|A) = \\frac{P(A \\cap B)}{P(A)}$$`,
  example: `**1. Roll a 4 on a standard 6-sided die:**
- Favorable outcomes = 1. Total outcomes = 6.
- P(A) = 1/6 ≈ **0.1667 (16.67%)**.
- Odds = 1 : 5.

**2. Given P(A) = 0.50, P(B) = 0.40, and P(A ∩ B) = 0.15:**
- Union P(A ∪ B) = 0.50 + 0.40 - 0.15 = **0.75**.
- Conditional P(A|B) = 0.15 / 0.40 = **0.375 (37.5%)**.`,
  faqs: [
    {
      q: 'What is the difference between Probability and Odds?',
      a: 'Probability is the ratio of favorable outcomes to *all* possible outcomes (e.g., 1 out of 6, or 16.67%). Odds represents the ratio of favorable outcomes to *unfavorable* outcomes (e.g., 1 to 5, meaning for every 1 win there are 5 losses).',
    },
    {
      q: 'What is a conditional probability?',
      a: 'Conditional probability is the probability of an event occurring given that another event has already occurred. It is denoted as $P(A|B)$, which is read as "probability of A given B".',
    },
    {
      q: 'What does independent mean in probability?',
      a: 'Two events A and B are independent if the occurrence of one does not affect the likelihood of the other. For independent events, the intersection is simply $P(A \\cap B) = P(A) \\times P(B)$.',
    },
  ],
};

type ProbTab = 'single' | 'joint';

export default function ProbabilityCalculator() {
  const [activeTab, setActiveTab] = useState<ProbTab>('single');

  // Single event inputs
  const [successes, setSuccesses] = useState<number>(1);
  const [trials, setTrials] = useState<number>(6);

  // Joint event inputs
  const [probA, setProbA] = useState<number>(0.5);
  const [probB, setProbB] = useState<number>(0.4);
  const [intersection, setIntersection] = useState<number>(0.15);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    if (activeTab === 'single') {
      setSuccesses(1);
      setTrials(6);
    } else {
      setProbA(0.5);
      setProbB(0.4);
      setIntersection(0.15);
    }
    setErrors({});
  };

  // Computations
  let singleResults = null;
  const isSingleValid = successes >= 0 && trials > 0 && successes <= trials;
  if (activeTab === 'single' && isSingleValid) {
    const prob = successes / trials;
    const failures = trials - successes;
    singleResults = {
      prob,
      probPercent: prob * 100,
      odds: `${successes}:${failures}`,
      failures,
    };
  }

  let jointResults = null;
  const isJointValid = probA >= 0 && probA <= 1 &&
                       probB >= 0 && probB <= 1 &&
                       intersection >= 0 && intersection <= Math.min(probA, probB);
  if (activeTab === 'joint' && isJointValid) {
    const union = probA + probB - intersection;
    const condA = probB > 0 ? intersection / probB : 0;
    const condB = probA > 0 ? intersection / probA : 0;

    jointResults = {
      union,
      condA,
      condB,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'single') {
      if (trials <= 0) newErrors.trials = 'Total outcomes (trials) must be greater than zero';
      if (successes < 0 || successes > trials) newErrors.successes = 'Favorable outcomes must be between 0 and total outcomes';
    } else {
      if (probA < 0 || probA > 1) newErrors.probA = 'P(A) must be between 0 and 1';
      if (probB < 0 || probB > 1) newErrors.probB = 'P(B) must be between 0 and 1';
      if (intersection < 0 || intersection > Math.min(probA, probB)) {
        newErrors.intersection = `P(A ∩ B) must be between 0 and the smaller of P(A) and P(B) (${Math.min(probA, probB).toFixed(2)})`;
      }
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
          <h2 className="text-xl font-bold text-foreground mb-6">Probability Events</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('single'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'single'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Single Event
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('joint'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'joint'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Multiple Joint Events
            </button>
          </div>

          <div className="space-y-5">
            {activeTab === 'single' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="successes" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Favorable Outcomes (Successes)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="successes"
                      type="number"
                      value={successes || ''}
                      onChange={(e) => setSuccesses(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.successes && <p className="text-xs text-red-500 mt-1 font-medium">{errors.successes}</p>}
                </div>

                <div>
                  <label htmlFor="trials" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Total Possible Outcomes (Trials)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="trials"
                      type="number"
                      value={trials || ''}
                      onChange={(e) => setTrials(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.trials && <p className="text-xs text-red-500 mt-1 font-medium">{errors.trials}</p>}
                </div>
              </div>
            )}

            {activeTab === 'joint' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prob-a" className="block text-sm font-semibold text-foreground/80 mb-2">
                      Probability P(A)
                    </label>
                    <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                      <input
                        id="prob-a"
                        type="number"
                        step="0.01"
                        value={probA}
                        onChange={(e) => setProbA(Number(e.target.value))}
                        className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                      />
                    </div>
                    {errors.probA && <p className="text-xs text-red-500 mt-1 font-medium">{errors.probA}</p>}
                  </div>

                  <div>
                    <label htmlFor="prob-b" className="block text-sm font-semibold text-foreground/80 mb-2">
                      Probability P(B)
                    </label>
                    <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                      <input
                        id="prob-b"
                        type="number"
                        step="0.01"
                        value={probB}
                        onChange={(e) => setProbB(Number(e.target.value))}
                        className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                      />
                    </div>
                    {errors.probB && <p className="text-xs text-red-500 mt-1 font-medium">{errors.probB}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="intersection" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Intersection P(A ∩ B) (Both occur)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      id="intersection"
                      type="number"
                      step="0.01"
                      value={intersection}
                      onChange={(e) => setIntersection(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">For independent events: P(A) × P(B) = {(probA * probB).toFixed(4)}</span>
                  {errors.intersection && <p className="text-xs text-red-500 mt-1 font-medium">{errors.intersection}</p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Probability
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
            <h2 className="text-xl font-bold text-foreground mb-6">Likelihood Analysis</h2>

            {activeTab === 'single' && (
              singleResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Probability ratio P(A)</span>
                    <span className="block text-3xl font-extrabold text-primary mt-1">{singleResults.prob.toFixed(4)}</span>
                    <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">({singleResults.probPercent.toFixed(2)}% probability)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Success Odds</span>
                      <span className="block text-lg font-bold text-foreground mt-1">{singleResults.odds}</span>
                    </div>
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Failure Outcomes</span>
                      <span className="block text-lg font-bold text-foreground mt-1">{singleResults.failures} outcomes</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter successes and trial counts to evaluate.</div>
              )
            )}

            {activeTab === 'joint' && (
              jointResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Union P(A ∪ B) (A or B occurs)</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">{jointResults.union.toFixed(4)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Conditional P(A|B)</span>
                      <span className="block text-lg font-bold text-foreground mt-1">{jointResults.condA.toFixed(4)}</span>
                    </div>
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Conditional P(B|A)</span>
                      <span className="block text-lg font-bold text-foreground mt-1">{jointResults.condB.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter valid joint probabilities between 0 and 1.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
