'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Numerology Calculator determines your Life Path Number based on your date of birth, reducing date digits to standard numbers (1-9) or master numbers (11, 22, 33).`,
  formula: `Numerology reduces birth date components to single digits or master numbers, then sums and reduces the result:

**1. Reduce Day, Month, and Year individually:**
- If a component sums to a Master Number ($11, 22$), do not reduce it.
- Otherwise, sum the digits until a single digit ($1-9$) remains.

**2. Sum the three reduced components:**
$$\\text{Total} = \\text{Reduced Month} + \\text{Reduced Day} + \\text{Reduced Year}$$

**3. Reduce the Total:**
- If the total is $11, 22,$ or $33$, keep it as a Master Number.
- Otherwise, reduce to a single digit ($1-9$).`,
  example: `**Calculate Life Path for October 15, 1995:**
- Month = 10 -> 1 + 0 = **1**.
- Day = 15 -> 1 + 5 = **6**.
- Year = 1995 -> 1 + 9 + 9 + 5 = 24 -> 2 + 4 = **6**.
- Total = 1 + 6 + 6 = 13.
- Reduce Total = 1 + 3 = **4** (Life Path Number 4).`,
  faqs: [
    {
      q: 'What is a Life Path Number?',
      a: 'The Life Path Number is the most important number in your numerology chart. It represents your core identity, life purpose, strengths, challenges, and opportunities.',
    },
    {
      q: 'What are Master Numbers?',
      a: 'In numerology, 11, 22, and 33 are considered Master Numbers. They possess higher potential and spiritual significance and are not reduced to single digits during initial calculations.',
    },
    {
      q: 'How many Life Path numbers are there?',
      a: 'There are 12 main Life Path numbers: the single digits 1 through 9, and the three Master Numbers 11, 22, and 33.',
    },
  ],
};

const PROFILES: Record<number, { title: string; desc: string; traits: string }> = {
  1: { title: 'The Leader', desc: 'Independent, pioneering, and ambitious. You are a self-starter who thrives on innovation and taking initiative.', traits: 'Confidence, independence, motivation, impatience.' },
  2: { title: 'The Peacemaker', desc: 'Cooperative, intuitive, and diplomatic. You seek harmony, balance, and excel in partnerships and team support roles.', traits: 'Empathy, cooperation, sensitivity, indecision.' },
  3: { title: 'The Creative', desc: 'Expressive, artistic, and social. You possess a natural charm, love communication, and bring joy and optimism to others.', traits: 'Expressiveness, optimism, creativity, lack of focus.' },
  4: { title: 'The Builder', desc: 'Practical, disciplined, and reliable. You value structure, hard work, and stability, building strong foundations in life.', traits: 'Stability, organization, loyalty, stubbornness.' },
  5: { title: 'The Free Spirit', desc: 'Versatile, adventurous, and curious. You thrive on change, travel, and experiencing life to its fullest potential.', traits: 'Adaptability, curiosity, freedom-loving, restlessness.' },
  6: { title: 'The Nurturer', desc: 'Compassionate, responsible, and caring. You prioritize family, community, and service to others, often acting as a healer.', traits: 'Responsibility, empathy, protection, perfectionism.' },
  7: { title: 'The Seeker', desc: 'Analytical, spiritual, and introspective. You seek truth, wisdom, and prefer deep understanding over superficial relationships.', traits: 'Wisdom, analysis, spirituality, aloofness.' },
  8: { title: 'The Powerhouse', desc: 'Ambitious, practical, and successful. You understand material success, leadership, and are driven by goals and achievements.', traits: 'Success-oriented, strong-willed, financial sense, control.' },
  9: { title: 'The Humanitarian', desc: 'Generous, idealistic, and compassionate. You have a global perspective and strive to leave the world a better place.', traits: 'Generosity, idealism, selflessness, emotional burden.' },
  11: { title: 'The Intuitive Visionary (Master)', desc: 'Highly intuitive, sensitive, and inspirational. You act as a bridge between spiritual concepts and everyday reality.', traits: 'Inspiration, intuition, charisma, high anxiety.' },
  22: { title: 'The Master Builder (Master)', desc: 'Powerful, practical, and capable of turning grand visions into reality. You combine the practicality of 4 with the intuition of 11.', traits: 'Visionary power, practical master, leadership, self-pressure.' },
  33: { title: 'The Master Teacher (Master)', desc: 'The highest level of spiritual nurturing. You are devoted to healing, guidance, and upliftment of human consciousness.', traits: 'Selfless service, healing power, universal love, idealism.' },
};

export default function NumerologyCalculator() {
  const [birthdate, setBirthdate] = useState<string>('1995-10-15');
  const [result, setResult] = useState<{ pathNumber: number; profile: typeof PROFILES[1] } | null>(null);

  const handleReset = () => {
    setBirthdate('');
    setResult(null);
  };

  const reduceNumber = (num: number): number => {
    if (num === 11 || num === 22 || num === 33) return num;
    let sum = num;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
      if (sum === 11 || sum === 22 || sum === 33) return sum;
    }
    return sum;
  };

  const handleCalculate = () => {
    if (!birthdate) return;

    const parts = birthdate.split('-');
    if (parts.length !== 3) return;

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const rYear = reduceNumber(year);
    const rMonth = reduceNumber(month);
    const rDay = reduceNumber(day);

    const sum = rYear + rMonth + rDay;
    const pathNumber = reduceNumber(sum);

    setResult({
      pathNumber,
      profile: PROFILES[pathNumber] || PROFILES[1],
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
          <h2 className="text-xl font-bold text-foreground mb-6">Astrological Profile</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="birth-date" className="block text-sm font-semibold text-foreground/80 mb-2">Select Birth Date</label>
              <input
                id="birth-date"
                type="date"
                value={birthdate}
                onChange={(e) => { setBirthdate(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Numerology
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
            <h2 className="text-xl font-bold text-foreground mb-6">Life Path Number</h2>

            {result ? (
              <div className="space-y-6">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Your Destiny Number</span>
                  <span className="block text-5xl font-black text-primary mt-2">
                    {result.pathNumber}
                  </span>
                  <span className="block text-sm font-bold text-foreground mt-2">
                    {result.profile.title}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                  <div>
                    <span className="block text-xs font-bold text-foreground/50 uppercase">Profile Description</span>
                    <p className="text-xs font-semibold text-foreground/70 leading-relaxed mt-1">{result.profile.desc}</p>
                  </div>
                  <div className="pt-2.5 border-t border-border/40">
                    <span className="block text-xs font-bold text-foreground/50 uppercase">Core Traits</span>
                    <p className="text-xs font-semibold text-foreground/80 mt-1">{result.profile.traits}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select your birth date to calculate.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
