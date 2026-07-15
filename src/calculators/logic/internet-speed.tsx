'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Internet Speed Converter translates network bandwidth values between Megabits per second (Mbps), Megabytes per second (MB/s), Gigabits (Gbps), and Kilobytes (KB/s).`,
  formula: `Bandwidth calculations pivot around bits and bytes (1 Byte = 8 bits):

**1. Base Conversion (bits per second, bps):**
- From Mbps:
  $$\\text{bps} = \\text{Value} \\times 1,000,000$$
- From MB/s:
  $$\\text{bps} = \\text{Value} \\times 8,000,000$$

**2. Solve Target Metrics:**
- MB/s:
  $$\\text{MB/s} = \\frac{\\text{bps}}{8,000,000}$$`,
  example: `**Convert a 100 Mbps fiber connection to Megabytes per second (MB/s):**
- 100 Mbps = 100,000,000 bits per second.
- Output = 100,000,000 / 8,000,000 = **12.5 MB/s** max download speed.`,
  faqs: [
    {
      q: 'What is the difference between Megabits (Mb) and Megabytes (MB)?',
      a: 'A bit is a single binary digit (0 or 1), while a byte is a group of 8 bits. Network speeds are usually quoted in Megabits per second (Mbps), whereas file sizes are measured in Megabytes (MB).',
    },
    {
      q: 'Why is my actual download speed lower than my subscription speed?',
      a: 'Internet service providers advertise speeds in Mbps (megabits). To find your actual maximum download speed in Megabytes per second (MB/s), divide your plan speed by 8, and subtract standard network overhead (typically 10-15%).',
    },
    {
      q: 'What is a good internet speed for streaming 4K video?',
      a: 'According to major streaming services, a stable internet speed of at least 25 Mbps is recommended for smooth 4K Ultra HD streaming.',
    },
  ],
};

const SPEED_UNITS = [
  { name: 'Kilobits per second (Kbps)', key: 'Kbps', factor: 1000 },
  { name: 'Kilobytes per second (KB/s)', key: 'KB/s', factor: 8000 },
  { name: 'Megabits per second (Mbps)', key: 'Mbps', factor: 1000000 },
  { name: 'Megabytes per second (MB/s)', key: 'MB/s', factor: 8000000 },
  { name: 'Gigabits per second (Gbps)', key: 'Gbps', factor: 1000000000 },
  { name: 'Gigabytes per second (GB/s)', key: 'GB/s', factor: 8000000000 },
];

export default function InternetSpeedCalculator() {
  const [value, setValue] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<string>('Mbps');
  const [toUnit, setToUnit] = useState<string>('MB/s');

  const handleReset = () => {
    setValue(100);
    setFromUnit('Mbps');
    setToUnit('MB/s');
  };

  const fromObj = SPEED_UNITS.find((u) => u.key === fromUnit) || SPEED_UNITS[2];
  const toObj = SPEED_UNITS.find((u) => u.key === toUnit) || SPEED_UNITS[3];

  // Convert
  const bpsVal = value * fromObj.factor;
  const convertedVal = bpsVal / toObj.factor;

  // File download projections (at 100% efficiency)
  const mbPerSec = bpsVal / 8000000;
  const getDownloadTime = (sizeInMB: number): string => {
    if (mbPerSec <= 0) return 'Infinite';
    const seconds = sizeInMB / mbPerSec;
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Equivalencies
  const gridResults = SPEED_UNITS.map((u) => ({
    ...u,
    val: bpsVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Network Speeds</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="convert-value" className="block text-sm font-semibold text-foreground/80 mb-2">Network Speed Value</label>
              <input
                id="convert-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from-unit" className="block text-sm font-semibold text-foreground/80 mb-2">From Unit</label>
                <select
                  id="from-unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {SPEED_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.key}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="to-unit" className="block text-sm font-semibold text-foreground/80 mb-2">To Unit</label>
                <select
                  id="to-unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {SPEED_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.key}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Conversion Result</h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Equivalent Rate</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  {value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {fromObj.key} = {convertedVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toObj.key}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">All Equivalencies</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gridResults.map((u) => (
                    <div key={u.key} className="rounded-lg bg-background p-3 border border-border text-center">
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">{u.key}</span>
                      <span className="block text-sm font-bold text-foreground mt-0.5 truncate" title={u.val.toString()}>
                        {u.val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Estimated Download Durations</span>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border border-border/40 p-2.5 rounded-lg bg-card">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Song (5 MB)</span>
                    <span className="block text-xs font-bold text-foreground mt-1">{getDownloadTime(5)}</span>
                  </div>
                  <div className="border border-border/40 p-2.5 rounded-lg bg-card">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Video (250 MB)</span>
                    <span className="block text-xs font-bold text-foreground mt-1">{getDownloadTime(250)}</span>
                  </div>
                  <div className="border border-border/40 p-2.5 rounded-lg bg-card">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">HD Movie (4 GB)</span>
                    <span className="block text-xs font-bold text-foreground mt-1">{getDownloadTime(4000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
