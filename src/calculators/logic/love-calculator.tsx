'use client';

import React, { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Love Calculator is a fun relationship compatibility tool that analyzes the names of two partners to estimate their relationship score based on a deterministic name match algorithm.`,
  formula: `The calculator uses a deterministic character hashing algorithm to guarantee identical results for any given name pair:

1. Normalize both names to lowercase.
2. Sum the Unicode character values (ASCII) of both names:
   $$\\text{Sum} = \\sum \\text{Unicode}(char)$$
3. Map the sum to a score range between 40% and 100% using modulo arithmetic:
   $$\\text{Score} = 40 + (\\text{Sum} \\pmod{61})$$`,
  example: `**Calculate love compatibility for "Romeo" and "Juliet":**
- Romeo ASCII sum = 538. Juliet ASCII sum = 638. Total sum = 1,176.
- Score = 40 + (1,176 mod 61) = 40 + 17 = **57%**.`,
  faqs: [
    {
      q: 'How does the Love Calculator determine the score?',
      a: 'The tool uses a mathematical hash of the letters in both names. This ensures that the same name pair will always yield the exact same compatibility score.',
    },
    {
      q: 'Is this calculator scientifically accurate?',
      a: 'No. This calculator is a fun game meant for entertainment purposes. Scientific compatibility relies on psychological alignment, values, communication, and emotional connection.',
    },
    {
      q: 'Does changing capitalization or spelling affect the score?',
      a: 'No, capitalization is normalized (converted to lowercase), but spelling changes (like nicknames or short names) will alter the letters, generating a different hash and score.',
    },
  ],
};

export default function LoveCalculator() {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [result, setResult] = useState<{ score: number; message: string } | null>(null);
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

    const n1 = name1.toLowerCase().replace(/[^a-z]/g, '');
    const n2 = name2.toLowerCase().replace(/[^a-z]/g, '');

    let sum = 0;
    for (let i = 0; i < n1.length; i++) sum += n1.charCodeAt(i);
    for (let i = 0; i < n2.length; i++) sum += n2.charCodeAt(i);

    // Score bound between 40% and 100%
    const score = 40 + (sum % 61);

    let message = '';
    if (score >= 90) {
      message = 'True Soulmates! Your names share a rare, harmonic resonance.';
    } else if (score >= 80) {
      message = 'Excellent match! Strong potential for a deep, long-lasting connection.';
    } else if (score >= 65) {
      message = 'Good chemistry. With shared effort and communication, you will thrive.';
    } else {
      message = 'A unique pairing! Opposite poles attract, bringing excitement and learning.';
    }

    setResult({ score, message });
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
          <h2 className="text-xl font-bold text-foreground mb-6">Partnership Names</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="name-1" className="block text-sm font-semibold text-foreground/80 mb-2">First Person&apos;s Name</label>
              <input
                id="name-1"
                type="text"
                value={name1}
                onChange={(e) => { setName1(e.target.value); setError(''); }}
                placeholder="e.g. Romeo"
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
                placeholder="e.g. Juliet"
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
                <Heart className="h-4 w-4 fill-white" />
                Find Love Score
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
            <h2 className="text-xl font-bold text-foreground mb-6">Compatibility Profile</h2>

            {result ? (
              <div className="space-y-6 text-center py-4">
                <div className="relative inline-flex items-center justify-center">
                  <Heart className="h-32 w-32 text-red-500 fill-red-500/10 stroke-[1.5]" />
                  <span className="absolute text-2xl font-extrabold text-red-600">{result.score}%</span>
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <span className="block text-lg font-bold text-foreground">
                    {name1} & {name2}
                  </span>
                  <p className="text-sm font-semibold text-foreground/60 leading-relaxed px-4">
                    {result.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter two names to estimate compatibility.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
