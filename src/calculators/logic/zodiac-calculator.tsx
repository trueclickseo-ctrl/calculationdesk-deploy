'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Zodiac Calculator identifies your Western Sun Sign, Chinese Zodiac Animal, and corresponding elements based on your birth date.`,
  formula: `Zodiac signs are determined using calendar date thresholds:

**1. Western Sun Sign:**
Deduce based on birth month and day (e.g., Aries spans March 21 to April 19).

**2. Chinese Zodiac Animal:**
Deduce based on birth year modulo 12:
$$\\text{Index} = (\\text{Year} - 4) \\pmod{12}$$
Where $0 = \\text{Rat}, 1 = \\text{Ox}, 2 = \\text{Tiger}$, etc.`,
  example: `**Determine zodiac profiles for October 15, 1995:**
- Date: Oct 15 -> **Libra** (Air element).
- Year: 1995 -> (1995 - 4) mod 12 = 11 -> **Pig** (Wood element).`,
  faqs: [
    {
      q: 'What is my Western Sun Sign?',
      a: 'Your Sun Sign (or star sign) represents the zodiac constellation the sun was passing through at the moment of your birth, signifying your core ego and personality.',
    },
    {
      q: 'How does the Chinese Zodiac work?',
      a: 'The Chinese Zodiac (Shengxiao) is a 12-year cycle represented by 12 animals, corresponding to the Chinese lunar calendar, determining yearly archetypes.',
    },
    {
      q: 'What are the four Western elements?',
      a: 'The 12 star signs are divided into four elements: Fire (energy/passion), Earth (stability/practicality), Air (intellect/social connection), and Water (emotion/intuition).',
    },
  ],
};

const WESTERN_SIGNS = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19], element: 'Earth', traits: 'Disciplined, ambitious, and practical.' },
  { name: 'Aquarius', start: [1, 20], end: [2, 18], element: 'Air', traits: 'Original, independent, and humanitarian.' },
  { name: 'Pisces', start: [2, 19], end: [3, 20], element: 'Water', traits: 'Compassionate, artistic, and intuitive.' },
  { name: 'Aries', start: [3, 21], end: [4, 19], element: 'Fire', traits: 'Eager, dynamic, quick, and competitive.' },
  { name: 'Taurus', start: [4, 20], end: [5, 20], element: 'Earth', traits: 'Strong, dependable, sensual, and creative.' },
  { name: 'Gemini', start: [5, 21], end: [6, 20], element: 'Air', traits: 'Expressive, curious, adaptable, and kind.' },
  { name: 'Cancer', start: [6, 21], end: [7, 22], element: 'Water', traits: 'Intuitive, sentimental, compassionate, and protective.' },
  { name: 'Leo', start: [7, 23], end: [8, 22], element: 'Fire', traits: 'Dramatic, creative, self-confident, and dominant.' },
  { name: 'Virgo', start: [8, 23], end: [9, 22], element: 'Earth', traits: 'Loyal, analytical, kind, and hardworking.' },
  { name: 'Libra', start: [9, 23], end: [10, 22], element: 'Air', traits: 'Social, diplomatic, artistic, and peaceful.' },
  { name: 'Scorpio', start: [10, 23], end: [11, 21], element: 'Water', traits: 'Passionate, stubborn, resourceful, and brave.' },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21], element: 'Fire', traits: 'Extroverted, optimistic, funny, and generous.' },
];

const CHINESE_ANIMALS = [
  { name: 'Rat', element: 'Water', traits: 'Quick-witted, resourceful, versatile, and kind.' },
  { name: 'Ox', element: 'Earth', traits: 'Diligent, dependable, strong, and determined.' },
  { name: 'Tiger', element: 'Wood', traits: 'Brave, competitive, unpredictable, and confident.' },
  { name: 'Rabbit', element: 'Wood', traits: 'Quiet, elegant, kind, and responsible.' },
  { name: 'Dragon', element: 'Earth', traits: 'Confident, intelligent, enthusiastic, and inspiring.' },
  { name: 'Snake', element: 'Fire', traits: 'Enigmatic, intelligent, wise, and creative.' },
  { name: 'Horse', element: 'Fire', traits: 'Animated, active, energetic, and social.' },
  { name: 'Goat', element: 'Earth', traits: 'Gentle, sympathetic, mild-mannered, and creative.' },
  { name: 'Monkey', element: 'Metal', traits: 'Sharp, smart, curious, and mischievous.' },
  { name: 'Rooster', element: 'Metal', traits: 'Observant, hardworking, courageous, and talented.' },
  { name: 'Dog', element: 'Earth', traits: 'Lovely, honest, prudent, and loyal.' },
  { name: 'Pig', element: 'Water', traits: 'Compassionate, generous, diligent, and noble.' },
];

export default function ZodiacCalculator() {
  const [birthdate, setBirthdate] = useState<string>('1995-10-15');
  const [result, setResult] = useState<{ western: typeof WESTERN_SIGNS[0]; chinese: typeof CHINESE_ANIMALS[0]; year: number } | null>(null);

  const handleReset = () => {
    setBirthdate('');
    setResult(null);
  };

  const getWesternSign = (month: number, day: number) => {
    for (let i = 0; i < WESTERN_SIGNS.length; i++) {
      const sign = WESTERN_SIGNS[i];
      const [sMonth, sDay] = sign.start;
      const [eMonth, eDay] = sign.end;

      if ((month === sMonth && day >= sDay) || (month === eMonth && day <= eDay)) {
        return sign;
      }
    }
    // Default wrap around Capricorn (Dec 22 - Jan 19)
    return WESTERN_SIGNS[0];
  };

  const getChineseZodiac = (year: number) => {
    const index = (year - 4) % 12;
    return CHINESE_ANIMALS[index >= 0 ? index : index + 12];
  };

  const handleCalculate = () => {
    if (!birthdate) return;

    const parts = birthdate.split('-');
    if (parts.length !== 3) return;

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const western = getWesternSign(month, day);
    const chinese = getChineseZodiac(year);

    setResult({ western, chinese, year });
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
                Solve Zodiacs
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
            <h2 className="text-xl font-bold text-foreground mb-6">Astrological Signs</h2>

            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Western Card */}
                <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Western Sun Sign</span>
                  <span className="block text-2xl font-black text-primary">{result.western.name}</span>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50 font-semibold">Element:</span>
                      <span className="text-foreground font-bold">{result.western.element}</span>
                    </div>
                    <p className="text-xs text-foreground/70 font-semibold leading-relaxed border-t border-border/40 pt-2">
                      {result.western.traits}
                    </p>
                  </div>
                </div>

                {/* Chinese Card */}
                <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Chinese Zodiac ({result.year})</span>
                  <span className="block text-2xl font-black text-primary">{result.chinese.name}</span>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50 font-semibold">Element:</span>
                      <span className="text-foreground font-bold">{result.chinese.traits.split(', ')[0] === 'Wood' || result.chinese.traits.split(', ')[0] === 'Fire' ? 'Elemental' : result.chinese.element}</span>
                    </div>
                    <p className="text-xs text-foreground/70 font-semibold leading-relaxed border-t border-border/40 pt-2">
                      {result.chinese.traits}
                    </p>
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
