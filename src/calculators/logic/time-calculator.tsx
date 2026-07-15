'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Time Calculator performs arithmetic operations (addition and subtraction) on times (hours, minutes, seconds) and converts durations across various units (days, hours, minutes, seconds).`,
  formula: `Time mathematics uses sexagesimal scaling factors:

**1. Time Arithmetic:**
- Convert both times to total seconds:
  $$\\text{Total Seconds} = (H \\times 3600) + (M \\times 60) + S$$
- Perform addition/subtraction on total seconds.
- Convert back:
  $$H = \\lfloor \\text{Secs} / 3600 \\rfloor$$
  $$M = \\lfloor (\\text{Secs} \\% 3600) / 60 \\rfloor$$
  $$S = \\text{Secs} \\% 60$$`,
  example: `**1. Add 2 hours 45 minutes and 1 hour 30 minutes:**
- Time 1 = 2h 45m = 9900 seconds.
- Time 2 = 1h 30m = 5400 seconds.
- Sum = 15300 seconds.
- Converted back = **4 hours 15 minutes**.`,
  faqs: [
    {
      q: 'How many seconds are in a day?',
      a: 'A single standard day has 24 hours. Since each hour has 3600 seconds (60 minutes × 60 seconds), a day contains exactly $24 \\times 3600 = 86,400$ seconds.',
    },
    {
      q: 'What is a sexagesimal system?',
      a: 'It is a base-60 numeral system. It is traditionally used to measure time (60 seconds in a minute, 60 minutes in an hour) and geometric angles.',
    },
    {
      q: 'Can this calculator handle negative values?',
      a: 'If a subtraction operation results in a negative total duration, the calculator displays a negative time format (e.g., -1 hour 15 minutes) representing the negative offset.',
    },
  ],
};

type TimeTab = 'arithmetic' | 'convert';
type TimeConvertUnit = 'seconds' | 'minutes' | 'hours' | 'days';

export default function TimeCalculator() {
  const [activeTab, setActiveTab] = useState<TimeTab>('arithmetic');

  // Arithmetic inputs
  const [h1, setH1] = useState<number>(2);
  const [m1, setM1] = useState<number>(45);
  const [s1, setS1] = useState<number>(0);

  const [h2, setH2] = useState<number>(1);
  const [m2, setM2] = useState<number>(30);
  const [s2, setS2] = useState<number>(0);

  const [op, setOp] = useState<'add' | 'subtract'>('add');

  // Convert inputs
  const [convVal, setConvVal] = useState<number>(500);
  const [convUnit, setConvUnit] = useState<TimeConvertUnit>('minutes');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setH1(2);
    setM1(45);
    setS1(0);
    setH2(1);
    setM2(30);
    setS2(0);
    setOp('add');
    setConvVal(500);
    setConvUnit('minutes');
    setErrors({});
  };

  // Computations
  let arithResults = null;
  const isArithValid = !isNaN(h1) && !isNaN(m1) && !isNaN(s1) &&
                       !isNaN(h2) && !isNaN(m2) && !isNaN(s2);
  if (activeTab === 'arithmetic' && isArithValid) {
    const t1Secs = h1 * 3600 + m1 * 60 + s1;
    const t2Secs = h2 * 3600 + m2 * 60 + s2;

    const finalSecs = op === 'add' ? t1Secs + t2Secs : t1Secs - t2Secs;
    const absSecs = Math.abs(finalSecs);

    const h = Math.floor(absSecs / 3600);
    const m = Math.floor((absSecs % 3600) / 60);
    const s = absSecs % 60;

    arithResults = {
      isNegative: finalSecs < 0,
      h,
      m,
      s,
      totalSeconds: finalSecs,
    };
  }

  let convertResults = null;
  if (activeTab === 'convert' && !isNaN(convVal)) {
    // base unit in seconds
    let baseSecs = 0;
    switch (convUnit) {
      case 'seconds':
        baseSecs = convVal;
        break;
      case 'minutes':
        baseSecs = convVal * 60;
        break;
      case 'hours':
        baseSecs = convVal * 3600;
        break;
      case 'days':
        baseSecs = convVal * 86400;
        break;
      default:
        break;
    }

    convertResults = {
      seconds: baseSecs,
      minutes: baseSecs / 60,
      hours: baseSecs / 3600,
      days: baseSecs / 86400,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'arithmetic') {
      if (m1 < 0 || m1 >= 60 || m2 < 0 || m2 >= 60) newErrors.minutes = 'Minutes must be between 0 and 59';
      if (s1 < 0 || s1 >= 60 || s2 < 0 || s2 >= 60) newErrors.seconds = 'Seconds must be between 0 and 59';
    } else {
      if (isNaN(convVal)) newErrors.convVal = 'Enter a valid number to convert';
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Duration Settings</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('arithmetic'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'arithmetic'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Time Math
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('convert'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'convert'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Unit Converter
            </button>
          </div>

          <div className="space-y-5">
            {activeTab === 'arithmetic' && (
              <div className="space-y-4">
                <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider">First Time Value</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="h1" className="block text-xs font-semibold text-foreground/60 mb-1">Hours</label>
                    <input
                      id="h1"
                      type="number"
                      value={h1}
                      onChange={(e) => setH1(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="m1" className="block text-xs font-semibold text-foreground/60 mb-1">Minutes</label>
                    <input
                      id="m1"
                      type="number"
                      value={m1}
                      onChange={(e) => setM1(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="s1" className="block text-xs font-semibold text-foreground/60 mb-1">Seconds</label>
                    <input
                      id="s1"
                      type="number"
                      value={s1}
                      onChange={(e) => setS1(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="py-2 border-y border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Arithmetic Operator</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOp('add')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                        op === 'add' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-foreground/60'
                      }`}
                    >
                      Add (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOp('subtract')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                        op === 'subtract' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-foreground/60'
                      }`}
                    >
                      Subtract (-)
                    </button>
                  </div>
                </div>

                <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Second Time Value</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="h2" className="block text-xs font-semibold text-foreground/60 mb-1">Hours</label>
                    <input
                      id="h2"
                      type="number"
                      value={h2}
                      onChange={(e) => setH2(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="m2" className="block text-xs font-semibold text-foreground/60 mb-1">Minutes</label>
                    <input
                      id="m2"
                      type="number"
                      value={m2}
                      onChange={(e) => setM2(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="s2" className="block text-xs font-semibold text-foreground/60 mb-1">Seconds</label>
                    <input
                      id="s2"
                      type="number"
                      value={s2}
                      onChange={(e) => setS2(Number(e.target.value))}
                      className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                </div>
                {(errors.minutes || errors.seconds) && (
                  <p className="text-xs text-red-500 font-semibold">{errors.minutes || errors.seconds}</p>
                )}
              </div>
            )}

            {activeTab === 'convert' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="conv-val" className="block text-sm font-semibold text-foreground/80 mb-2">Duration Value</label>
                  <input
                    id="conv-val"
                    type="number"
                    value={convVal}
                    onChange={(e) => { setConvVal(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  />
                  {errors.convVal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.convVal}</p>}
                </div>

                <div>
                  <label htmlFor="conv-unit" className="block text-sm font-semibold text-foreground/80 mb-2">Duration Unit</label>
                  <select
                    id="conv-unit"
                    value={convUnit}
                    onChange={(e) => setConvUnit(e.target.value as TimeConvertUnit)}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary"
                  >
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Time
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Output Breakdown</h2>

            {activeTab === 'arithmetic' && (
              arithResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Result Duration</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {arithResults.isNegative ? '-' : ''}{arithResults.h}h {arithResults.m}m {arithResults.s}s
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total seconds equivalent</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {arithResults.totalSeconds.toLocaleString()} seconds
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter time values.</div>
              )
            )}

            {activeTab === 'convert' && (
              convertResults ? (
                <div className="space-y-3">
                  {[
                    { label: 'Days', val: convertResults.days },
                    { label: 'Hours', val: convertResults.hours },
                    { label: 'Minutes', val: convertResults.minutes },
                    { label: 'Seconds', val: convertResults.seconds }
                  ].map((unit, idx) => (
                    <div key={idx} className="rounded-xl bg-background p-3 border border-border flex justify-between items-center">
                      <span className="text-xs font-semibold text-foreground/50">{unit.label}</span>
                      <span className="text-sm font-bold text-foreground">
                        {unit.val.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter convert parameters.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
