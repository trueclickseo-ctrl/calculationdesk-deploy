'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Name Numerology Calculator computes your Destiny Number (also called Expression Number) by translating the letters of your name into Pythagorean values and reducing them.`,
  formula: `Pythagorean numerology assigns a number from 1 to 9 to each letter of the alphabet:

- **1**: A, J, S
- **2**: B, K, T
- **3**: C, L, U
- **4**: D, M, V
- **5**: E, N, W
- **6**: F, O, X
- **7**: G, P, Y
- **8**: H, Q, Z
- **9**: I, R

Sum all the letter values of your full birth name, and then reduce the sum to a single digit (1-9) or a Master Number (11, 22).`,
  example: `**Calculate Destiny Number for "John":**
- J = 1, O = 6, H = 8, N = 5.
- Total Sum = 1 + 6 + 8 + 5 = 20.
- Reduce = 2 + 0 = **2** (Destiny Number 2).`,
  faqs: [
    {
      q: 'What is a Destiny Number?',
      a: 'Your Destiny (or Expression) Number represents your natural talents, capabilities, weaknesses, and potential. It describes *how* you express yourself to achieve your life goals.',
    },
    {
      q: 'Should I use my middle name or married name?',
      a: 'For your core Destiny profile, standard practice is to use your full legal name as written on your birth certificate, including middle names.',
    },
    {
      q: 'What is the Pythagorean system?',
      a: 'The Pythagorean system is the most popular form of numerology in the West. It was developed by the ancient Greek philosopher Pythagoras and links names and dates mathematically.',
    },
  ],
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const DESTINY_PROFILES: Record<number, { title: string; desc: string }> = {
  1: { title: 'The Leader / Initiator', desc: 'Indicates strong leadership potential, independence, courage, and a desire to forge your own path.' },
  2: { title: 'The Partner / Supporter', desc: 'Represents teamwork, diplomacy, harmony, and an innate ability to counsel, mediate, and bring people together.' },
  3: { title: 'The Creative Communicator', desc: 'Signals artistic talents, expressive communication, warmth, sociability, and optimism.' },
  4: { title: 'The Systematic Builder', desc: 'Reflects reliability, structure, practical planning, diligence, and building secure long-term goals.' },
  5: { title: 'The Dynamic Explorer', desc: 'Represents versatility, love for adventure, quick-witted intelligence, and adaptive communication skills.' },
  6: { title: 'The Responsible Caregiver', desc: 'Focuses on service, parental responsibility, artistic harmony, teaching, and protective leadership.' },
  7: { title: 'The Truth Seeker', desc: 'Points to deep analytical minds, intuitive wisdom, technical specialization, and a philosophical nature.' },
  8: { title: 'The Material Achiever', desc: 'Represents authority, financial success, business efficiency, and sound judgment in material matters.' },
  9: { title: 'The Compassionate Visionary', desc: 'Reflects broad humanitarian ideals, artistic breadth, selflessness, and sharing wisdom with the world.' },
  11: { title: 'The Inspirational Guide (Master)', desc: 'Indicates spiritual leadership, high intuitive capabilities, and acting as an inspirational beacon for others.' },
  22: { title: 'The Master Organizer (Master)', desc: 'Combines the visionary power of 11 with the physical builder traits of 4 to manifest massive structural achievements.' },
};

export default function NameNumerology() {
  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<{ destinyNumber: number; letterMappings: { letter: string; val: number }[]; profile: typeof DESTINY_PROFILES[1] } | null>(null);
  const [error, setError] = useState<string>('');

  const handleReset = () => {
    setName('');
    setResult(null);
    setError('');
  };

  const reduceNumber = (num: number): number => {
    if (num === 11 || num === 22) return num;
    let sum = num;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, d) => acc + Number(d), 0);
      if (sum === 11 || sum === 22) return sum;
    }
    return sum;
  };

  const handleCalculate = () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }
    setError('');

    const letters = name.toLowerCase().replace(/[^a-z]/g, '').split('');
    if (letters.length === 0) {
      setError('Name must contain letters');
      return;
    }

    const letterMappings = letters.map((letter) => ({
      letter: letter.toUpperCase(),
      val: PYTHAGOREAN_MAP[letter] || 0,
    }));

    const sum = letterMappings.reduce((acc, item) => acc + item.val, 0);
    const destinyNumber = reduceNumber(sum);

    setResult({
      destinyNumber,
      letterMappings,
      profile: DESTINY_PROFILES[destinyNumber] || DESTINY_PROFILES[1],
    });
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
          <h2 className="text-xl font-bold text-foreground mb-6">Profile Names</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold text-foreground/80 mb-2">Enter Full Name</label>
              <input
                id="full-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="e.g. John Doe"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Name
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
            <h2 className="text-xl font-bold text-foreground mb-6">Destiny Number Analysis</h2>

            {result ? (
              <div className="space-y-6">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Your Destiny Number</span>
                  <span className="block text-5xl font-black text-primary mt-2">
                    {result.destinyNumber}
                  </span>
                  <span className="block text-sm font-bold text-foreground mt-2">
                    {result.profile.title}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-4">
                  <div>
                    <span className="block text-xs font-bold text-foreground/50 uppercase">Destiny Description</span>
                    <p className="text-xs font-semibold text-foreground/70 leading-relaxed mt-1">{result.profile.desc}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-border/40">
                    <span className="block text-xs font-bold text-foreground/50 uppercase mb-2">Letter Pythagorean Breakdowns</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.letterMappings.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-card border border-border p-1.5 rounded-lg w-10">
                          <span className="text-xs font-bold text-foreground">{item.letter}</span>
                          <span className="text-[10px] text-foreground/50 font-semibold">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter your name to calculate destiny numbers.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
