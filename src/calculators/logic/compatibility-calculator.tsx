'use client';

import React, { useState } from 'react';
import { RefreshCw, Heart } from 'lucide-react';

export const seoData = {
  whatIs: `The Compatibility Index computes relationship alignment scores by analyzing Western Zodiac elements, Chinese Zodiac Trine branches, and birthdate Life Path numerology matches.`,
  formula: `Compatibility is evaluated across three core disciplines:

**1. Western Element Match:**
- Fire + Air / Earth + Water = 90%
- Same Elements = 80-85%
- Fire + Water = 45%

**2. Chinese Zodiac Trines:**
- Trine matches (4-year gap) = 95%
- Opposition clashes (6-year gap) = 40%
- Other pairings = 70%

**3. Numerology Life Path Match:**
- Equal Life Path Numbers = 95%
- Similar polarity (both even or odd) = 85%
- Mixed polarity = 70%`,
  example: `**Calculate compatibility for Partner A (Oct 15, 1995: Libra/Pig/Path 4) and Partner B (Jan 20, 1996: Aquarius/Rat/Path 1):**
- Western: Libra (Air) + Aquarius (Air) = **80%**
- Chinese: Pig + Rat = **70%**
- Numerology: Path 4 + Path 1 (Even + Odd) = **70%**
- Overall Compatibility Index = (80 + 70 + 70) / 3 = **73.33%**.`,
  faqs: [
    {
      q: 'How does the Western Element compatibility work?',
      a: 'The 12 zodiac signs are categorized into Fire, Earth, Air, and Water. Elements naturally support or conflict with each other (e.g., Air feeds Fire, and Water nourishes Earth, leading to higher compatibility scores).',
    },
    {
      q: 'What are Chinese Zodiac Trines?',
      a: 'The 12 Chinese zodiac animals are divided into four compatibility groups called Trines. Animals in the same Trine share similar temperaments and views on life, resulting in optimal compatibility.',
    },
    {
      q: 'Can a low compatibility index still lead to a successful relationship?',
      a: 'Absolutely. Astrological compatibility is a fun guide. True relationship success depends on mutual respect, effective communication, and commitment.',
    },
  ],
};

const WESTERN_ZODIACS = [
  { name: 'Capricorn', month: 12, day: 22, element: 'Earth' },
  { name: 'Aquarius', month: 1, day: 20, element: 'Air' },
  { name: 'Pisces', month: 2, day: 19, element: 'Water' },
  { name: 'Aries', month: 3, day: 21, element: 'Fire' },
  { name: 'Taurus', month: 4, day: 20, element: 'Earth' },
  { name: 'Gemini', month: 5, day: 21, element: 'Air' },
  { name: 'Cancer', month: 6, day: 21, element: 'Water' },
  { name: 'Leo', month: 7, day: 23, element: 'Fire' },
  { name: 'Virgo', month: 8, day: 23, element: 'Earth' },
  { name: 'Libra', month: 9, day: 23, element: 'Air' },
  { name: 'Scorpio', month: 10, day: 23, element: 'Water' },
  { name: 'Sagittarius', month: 11, day: 22, element: 'Fire' },
];

const CHINESE_ZODIACS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
];

export default function CompatibilityCalculator() {
  const [date1, setDate1] = useState<string>('1995-10-15');
  const [date2, setDate2] = useState<string>('1996-01-20');
  const [result, setResult] = useState<{
    overall: number;
    westernScore: number;
    chineseScore: number;
    numerologyScore: number;
    sign1: string;
    sign2: string;
  } | null>(null);

  const handleReset = () => {
    setDate1('');
    setDate2('');
    setResult(null);
  };

  const getWesternSign = (month: number, day: number) => {
    // Standard lookup
    for (let i = 0; i < WESTERN_ZODIACS.length; i++) {
      const current = WESTERN_ZODIACS[i];
      const next = WESTERN_ZODIACS[(i + 1) % WESTERN_ZODIACS.length];
      
      if ((month === current.month && day >= current.day) || (month === next.month && day < next.day)) {
        return current;
      }
    }
    return WESTERN_ZODIACS[0];
  };

  const getLifePath = (dateString: string): number => {
    const parts = dateString.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const reduce = (n: number): number => {
      let sum = n;
      while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, d) => acc + Number(d), 0);
      }
      return sum;
    };

    return reduce(reduce(year) + reduce(month) + reduce(day));
  };

  const calculateWesternCompatibility = (e1: string, e2: string): number => {
    if (e1 === e2) return 80;
    const pairs = `${e1}-${e2}`;
    const reverse = `${e2}-${e1}`;

    if (pairs === 'Fire-Air' || reverse === 'Fire-Air') return 90;
    if (pairs === 'Earth-Water' || reverse === 'Earth-Water') return 90;
    if (pairs === 'Fire-Water' || reverse === 'Fire-Water') return 45;
    if (pairs === 'Earth-Air' || reverse === 'Earth-Air') return 55;
    
    return 70; // General compatibility
  };

  const calculateChineseCompatibility = (y1: number, y2: number): number => {
    const a1 = (y1 - 4) % 12;
    const a2 = (y2 - 4) % 12;
    const diff = Math.abs(a1 - a2);

    // Trines (4 years apart)
    if (diff === 4 || diff === 8) return 95;

    // Opposition (6 years apart)
    if (diff === 6) return 40;

    return 70;
  };

  const calculateNumerologyCompatibility = (lp1: number, lp2: number): number => {
    if (lp1 === lp2) return 95;
    if ((lp1 % 2 === 0 && lp2 % 2 === 0) || (lp1 % 2 !== 0 && lp2 % 2 !== 0)) return 85;
    return 70;
  };

  const handleCalculate = () => {
    if (!date1 || !date2) return;

    const lp1 = getLifePath(date1);
    const lp2 = getLifePath(date2);

    const parts1 = date1.split('-');
    const year1 = Number(parts1[0]);
    const month1 = Number(parts1[1]);
    const day1 = Number(parts1[2]);

    const parts2 = date2.split('-');
    const year2 = Number(parts2[0]);
    const month2 = Number(parts2[1]);
    const day2 = Number(parts2[2]);

    const w1 = getWesternSign(month1, day1);
    const w2 = getWesternSign(month2, day2);

    const westernScore = calculateWesternCompatibility(w1.element, w2.element);
    const chineseScore = calculateChineseCompatibility(year1, year2);
    const numerologyScore = calculateNumerologyCompatibility(lp1, lp2);

    const overall = (westernScore + chineseScore + numerologyScore) / 3;

    const animal1 = CHINESE_ZODIACS[(year1 - 4) % 12];
    const animal2 = CHINESE_ZODIACS[(year2 - 4) % 12];

    setResult({
      overall,
      westernScore,
      chineseScore,
      numerologyScore,
      sign1: `${w1.name} (${animal1})`,
      sign2: `${w2.name} (${animal2})`,
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
          <h2 className="text-xl font-bold text-foreground mb-6">Partnership Dates</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="partner-1" className="block text-sm font-semibold text-foreground/80 mb-2">Partner 1 Birth Date</label>
              <input
                id="partner-1"
                type="date"
                value={date1}
                onChange={(e) => { setDate1(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="partner-2" className="block text-sm font-semibold text-foreground/80 mb-2">Partner 2 Birth Date</label>
              <input
                id="partner-2"
                type="date"
                value={date2}
                onChange={(e) => { setDate2(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm inline-flex items-center justify-center gap-1.5"
              >
                <Heart className="h-4 w-4 fill-white" />
                Find Compatibility
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
            <h2 className="text-xl font-bold text-foreground mb-6">Compatibility Score</h2>

            {result ? (
              <div className="space-y-6">
                
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Overall Index</span>
                  <span className="block text-4xl font-black text-primary mt-2">
                    {result.overall.toFixed(1)}%
                  </span>
                  <span className="block text-[11px] font-semibold text-foreground/50 mt-2 italic">
                    {result.sign1} & {result.sign2}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Western Zodiac Element Match:</span>
                    <span className="text-foreground font-bold">{result.westernScore}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Chinese Zodiac Trine Match:</span>
                    <span className="text-foreground font-bold">{result.chineseScore}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Numerology Life Path Match:</span>
                    <span className="text-foreground font-bold">{result.numerologyScore}%</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select dates to run analysis.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
