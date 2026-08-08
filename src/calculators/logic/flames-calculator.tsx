'use client';

import React, { useState } from 'react';
import { RefreshCw, Flame } from 'lucide-react';

export const seoData = {
  whatIs: `The FLAMES Game Calculator is a classic childhood relationship predictor game that checks name compatibility. FLAMES stands for Friends, Love, Affection, Marriage, Enmity, and Sister (Sibling).`,
  formula: `The FLAMES game follows a simple cancellation and counting algorithm:

1. Normalize both names (remove spaces and convert to lowercase).
2. Cancel out common letters between the two names.
3. Count the remaining letters ($N$).
4. Repeatedly eliminate letters from the word **FLAMES** by counting to $N$ until only one letter remains.`,
  example: `**Play FLAMES with "Alex" and "Jane":**
- Cancel matching letter 'a':
  - Alex -> l, e, x
  - Jane -> j, n, e (cancel 'e' as well)
  - Remaining: l, x (2) and j, n (2). Total $N = 4$.
- Eliminate from F-L-A-M-E-S counting 4:
  - Count 1: F, 2: L, 3: A, 4: M (Eliminate M -> F-L-A-E-S)
  - Count starting from E: 1: E, 2: S, 3: F, 4: L (Eliminate L -> F-A-E-S)
  - Count starting from A: 1: A, 2: E, 3: S, 4: F (Eliminate F -> A-E-S)
  - Count starting from A: 1: A, 2: E, 3: S, 4: A (Eliminate A -> E-S)
  - Count starting from E: 1: E, 2: S, 3: E, 4: S (Eliminate S -> **E** remains)
- **E** stands for **Enmity**!`,
  faqs: [
    {
      q: 'What does FLAMES stand for?',
      a: 'FLAMES is an acronym that represents: F = Friends, L = Love, A = Affection, M = Marriage, E = Enmity, and S = Sister (Sibling).',
    },
    {
      q: 'Is the FLAMES calculator accurate?',
      a: 'No. The FLAMES game is a fun, nostalgic relationship prediction game popular among school children. It is intended for entertainment purposes only.',
    },
    {
      q: 'Does name length affect the outcome?',
      a: 'Yes, because the final letter elimination depends entirely on the count of unique uncanceled letters from both names combined.',
    },
  ],
};

const RELATIONSHIPS: Record<string, { label: string; desc: string; color: string }> = {
  F: { label: 'Friends', desc: 'A strong foundation of companionship, trust, and shared laughter.', color: 'text-blue-500 bg-blue-500/5 border-blue-500/10' },
  L: { label: 'Love', desc: 'Deep passion, romantic chemistry, and an intense emotional bond.', color: 'text-rose-500 bg-rose-500/5 border-rose-500/10' },
  A: { label: 'Affection', desc: 'Warm care, tender support, and mutual fondness for one another.', color: 'text-amber-500 bg-amber-500/5 border-amber-500/10' },
  M: { label: 'Marriage', desc: 'A lifelong commitment of partnership, family, and growing old together.', color: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10' },
  E: { label: 'Enmity', desc: 'Fierce rivals or playful matches that keep each other on their toes.', color: 'text-purple-500 bg-purple-500/5 border-purple-500/10' },
  S: { label: 'Sibling (Sister)', desc: 'A protective, sibling-like connection of loyalty and banter.', color: 'text-sky-500 bg-sky-500/5 border-sky-500/10' },
};

export default function FlamesCalculator() {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [result, setResult] = useState<{ relationship: string; count: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }
    setError('');

    // Cancel common characters
    const n1Arr = name1.toLowerCase().replace(/[^a-z]/g, '').split('');
    const n2Arr = name2.toLowerCase().replace(/[^a-z]/g, '').split('');

    // Remove duplicates across arrays
    for (let i = 0; i < n1Arr.length; i++) {
      const matchIdx = n2Arr.indexOf(n1Arr[i]);
      if (matchIdx !== -1) {
        n1Arr.splice(i, 1);
        n2Arr.splice(matchIdx, 1);
        i--;
      }
    }

    const count = n1Arr.length + n2Arr.length;

    if (count === 0) {
      setResult({ relationship: 'F', count: 0 });
      return;
    }

    // FLAMES elimination logic
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;
    while (flames.length > 1) {
      index = (index + count - 1) % flames.length;
      flames.splice(index, 1);
    }

    setResult({ relationship: flames[0], count });
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Names to Compare</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="name-1" className="block text-sm font-semibold text-foreground/80 mb-2">First Person&apos;s Name</label>
              <input
                id="name-1"
                type="text"
                value={name1}
                onChange={(e) => { setName1(e.target.value); setError(''); }}
                placeholder="e.g. Alex"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div>
              <label htmlFor="name-2" className="block text-sm font-semibold text-foreground/80 mb-2">Second Person&apos;s Name</label>
              <input
                id="name-2"
                type="text"
                value={name2}
                onChange={(e) => { setName2(e.target.value); setError(''); }}
                placeholder="e.g. Jane"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm inline-flex items-center justify-center gap-1.5"
              >
                <Flame className="h-4 w-4 fill-white" />
                Play FLAMES
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">FLAMES Relationship Status</h2>

            {result ? (
              <div className="space-y-6">
                <div className={`rounded-xl border p-6 text-center ${RELATIONSHIPS[result.relationship].color}`}>
                  <span className="block text-xs font-bold uppercase tracking-wider font-mono opacity-60">Childhood Prediction</span>
                  <span className="block text-4xl font-black mt-2">
                    {RELATIONSHIPS[result.relationship].label}
                  </span>
                  <p className="block text-sm font-semibold mt-3 max-w-md mx-auto opacity-75 leading-relaxed">
                    {RELATIONSHIPS[result.relationship].desc}
                  </p>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border text-center space-y-1">
                  <span className="block text-[11px] font-bold text-foreground/50 uppercase">Unique Letter Count</span>
                  <span className="block text-lg font-bold text-foreground">{result.count} letters remaining</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter two names to predict relationships.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
