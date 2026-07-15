'use client';

import React, { useState } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

export const seoData = {
  whatIs: `The Time Zone Converter converts meeting times and calendar hours across major global time zones (such as UTC, EST, PST, IST, BST, and JST).`,
  formula: `Time conversions rely on Coordinated Universal Time (UTC) standard offsets:

**1. Conversion Formula:**
$$\\text{Target Local Time} = \\text{Source Time} - \\text{Source UTC Offset} + \\text{Target UTC Offset}$$`,
  example: `**Convert 09:30 AM IST to PST:**
- Source Time: 09:30 AM (IST offset = +5.5).
- Target Time: PST offset = -8.
- Difference = -8 - (+5.5) = -13.5 hours.
- Output: **08:00 PM previous day (PST)**.`,
  faqs: [
    {
      q: 'What is UTC?',
      a: 'Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. It is not adjusted for daylight saving time.',
    },
    {
      q: 'Does it display date shifts?',
      a: 'Yes. If a time zone conversion crosses midnight boundaries, the calculator displays a clear warning flag (e.g., "Next Day" or "Previous Day").',
    },
    {
      q: 'Why are some offsets fractional?',
      a: 'A few regions do not follow hourly boundaries. For example, India Standard Time (IST) is UTC +5:30, and Nepal Standard Time is UTC +5:45.',
    },
  ],
};

interface TimeZone {
  code: string;
  name: string;
  offset: number; // relative to UTC in hours
}

const TIME_ZONES: TimeZone[] = [
  { code: 'UTC', name: 'Coordinated Universal Time (UTC+0)', offset: 0 },
  { code: 'EST', name: 'Eastern Standard Time (UTC-5)', offset: -5 },
  { code: 'CST', name: 'Central Standard Time (UTC-6)', offset: -6 },
  { code: 'MST', name: 'Mountain Standard Time (UTC-7)', offset: -7 },
  { code: 'PST', name: 'Pacific Standard Time (UTC-8)', offset: -8 },
  { code: 'GMT', name: 'Greenwich Mean Time (UTC+0)', offset: 0 },
  { code: 'BST', name: 'British Summer Time (UTC+1)', offset: 1 },
  { code: 'CET', name: 'Central European Time (UTC+1)', offset: 1 },
  { code: 'IST', name: 'India Standard Time (UTC+5.5)', offset: 5.5 },
  { code: 'JST', name: 'Japan Standard Time (UTC+9)', offset: 9 },
  { code: 'AEST', name: 'Australian Eastern Standard Time (UTC+10)', offset: 10 }
];

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState<string>('09:30');
  const [sourceZone, setSourceZone] = useState<string>('IST');
  const [targetZone, setTargetZone] = useState<string>('PST');

  const handleReset = () => {
    setSourceTime('09:30');
    setSourceZone('IST');
    setTargetZone('PST');
  };

  const handleSwap = () => {
    const temp = sourceZone;
    setSourceZone(targetZone);
    setTargetZone(temp);
  };

  // Computations
  let results = null;
  const sZone = TIME_ZONES.find(z => z.code === sourceZone);
  const tZone = TIME_ZONES.find(z => z.code === targetZone);

  if (sZone && tZone && sourceTime !== '') {
    const [h, m] = sourceTime.split(':').map(Number);
    if (!isNaN(h) && !isNaN(m)) {
      // Hours from midnight in source zone
      const sourceHrs = h + m / 60;
      
      // Target hours relative to midnight
      let targetHrs = sourceHrs - sZone.offset + tZone.offset;

      let dateShift = 'Same Day';
      if (targetHrs >= 24) {
        dateShift = 'Next Day (+1 day)';
        targetHrs = targetHrs % 24;
      } else if (targetHrs < 0) {
        dateShift = 'Previous Day (-1 day)';
        targetHrs = (targetHrs + 24) % 24;
      }

      const outH = Math.floor(targetHrs);
      const outM = Math.round((targetHrs - outH) * 60);

      // format output time
      const padH = outH.toString().padStart(2, '0');
      const padM = outM.toString().padStart(2, '0');

      results = {
        convertedTime: `${padH}:${padM}`,
        dateShift,
        difference: tZone.offset - sZone.offset,
      };
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Time Offset Setup</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="source-time" className="block text-sm font-semibold text-foreground/80 mb-2">Time to Convert</label>
              <input
                id="source-time"
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
              <div className="md:col-span-4">
                <label htmlFor="source-zone" className="block text-xs font-semibold text-foreground/60 mb-1.5">From Time Zone</label>
                <select
                  id="source-zone"
                  value={sourceZone}
                  onChange={(e) => setSourceZone(e.target.value)}
                  className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                >
                  {TIME_ZONES.map((z) => (
                    <option key={z.code} value={z.code}>{z.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1 flex justify-center pt-4 md:pt-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-2 rounded-xl border border-border hover:bg-border/40 text-foreground/50 hover:text-foreground cursor-pointer transition-all"
                >
                  <ArrowRightLeft className="h-4 w-4 md:rotate-0 rotate-90" />
                </button>
              </div>

              <div className="md:col-span-4">
                <label htmlFor="target-zone" className="block text-xs font-semibold text-foreground/60 mb-1.5">To Time Zone</label>
                <select
                  id="target-zone"
                  value={targetZone}
                  onChange={(e) => setTargetZone(e.target.value)}
                  className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                >
                  {TIME_ZONES.map((z) => (
                    <option key={z.code} value={z.code}>{z.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Converted Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Converted Local Time</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.convertedTime}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    ({results.dateShift})
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Zone Time Difference</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.difference >= 0 ? '+' : ''}{results.difference} hours relative to {sourceZone}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select conversion parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
