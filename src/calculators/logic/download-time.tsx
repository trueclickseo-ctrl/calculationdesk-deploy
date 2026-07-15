'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Download Time Calculator estimates the time required to download or upload files at specific internet connection speeds, factoring in network efficiency variables.`,
  formula: `Download time depends on file bits and bitrates:

**1. File Size in bits ($F$):**
$$F = \\text{Size} \\times 8 \\times 1,024^{\\text{Power}}$$

**2. Network Speed in bits/sec ($S$):**
$$S = \\text{Speed} \\times \\text{Unit Factor}$$

**3. Download Duration ($T$, with overhead $h$):**
$$T = \\frac{F}{S} \\times (1 + h)$$
Where $h$ represents network overhead (typically 10-20%).`,
  example: `**Calculate download time for a 5 GB game file at 50 Mbps:**
- 5 GB in bits = 5 × 8 × 1,073,741,824 = 42,949,672,960 bits.
- 50 Mbps = 50,000,000 bits per second.
- Base Time = 42,949,672,960 / 50,000,000 = 859 seconds (14m 19s).
- With 10% overhead = 859 × 1.10 = **15m 45s**.`,
  faqs: [
    {
      q: 'Why does my download take longer than calculated?',
      a: 'Calculations assume consistent speed. Real-world downloads fluctuate due to server speed caps, Wi-Fi interference, local network congestion, and packet loss overhead.',
    },
    {
      q: 'What is network overhead?',
      a: 'Network overhead refers to the extra data sent along with your files (like IP headers, packet numbers, and checksums) to control, route, and verify data transmission.',
    },
    {
      q: 'Does hard drive speed affect download speed?',
      a: 'Normally no, unless you are on ultra-fast Gigabit fiber (1,000+ Mbps) where a slow mechanical hard drive might bottleneck and delay writing incoming data to disk.',
    },
  ],
};

const FILE_UNITS = [
  { name: 'Kilobytes (KB)', key: 'KB', bytes: 1024 },
  { name: 'Megabytes (MB)', key: 'MB', bytes: 1024 * 1024 },
  { name: 'Gigabytes (GB)', key: 'GB', bytes: 1024 * 1024 * 1024 },
  { name: 'Terabytes (TB)', key: 'TB', bytes: 1024 * 1024 * 1024 * 1024 },
];

const SPEED_UNITS = [
  { name: 'Kbps', key: 'Kbps', factor: 1000 },
  { name: 'KB/s', key: 'KB/s', factor: 8000 },
  { name: 'Mbps', key: 'Mbps', factor: 1000000 },
  { name: 'MB/s', key: 'MB/s', factor: 8000000 },
  { name: 'Gbps', key: 'Gbps', factor: 1000000000 },
];

export default function DownloadTimeCalculator() {
  const [fileSize, setFileSize] = useState<number>(10);
  const [fileUnit, setFileUnit] = useState<string>('GB');
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<string>('Mbps');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setFileSize(10);
    setFileUnit('GB');
    setSpeed(100);
    setSpeedUnit('Mbps');
    setErrors({});
  };

  const fObj = FILE_UNITS.find((u) => u.key === fileUnit) || FILE_UNITS[2];
  const sObj = SPEED_UNITS.find((u) => u.key === speedUnit) || SPEED_UNITS[2];

  // Computations
  let results = null;
  const isValid = !isNaN(fileSize) && fileSize >= 0 && !isNaN(speed) && speed > 0;

  const formatDuration = (totalSeconds: number): string => {
    if (totalSeconds === Infinity || isNaN(totalSeconds)) return 'Infinite';
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
  };

  if (isValid) {
    const fileBits = fileSize * fObj.bytes * 8;
    const speedBps = speed * sObj.factor;
    const baseSeconds = fileBits / speedBps;

    results = {
      base: formatDuration(baseSeconds),
      overhead10: formatDuration(baseSeconds * 1.10),
      overhead20: formatDuration(baseSeconds * 1.20),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (fileSize < 0 || isNaN(fileSize)) newErrors.fileSize = 'File size cannot be negative';
    if (speed <= 0 || isNaN(speed)) newErrors.speed = 'Speed must be greater than zero';
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Transfer Settings</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="file-size" className="block text-sm font-semibold text-foreground/80 mb-2">File Size</label>
              <div className="flex gap-2">
                <input
                  id="file-size"
                  type="number"
                  value={fileSize}
                  onChange={(e) => { setFileSize(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={fileUnit}
                  onChange={(e) => { setFileUnit(e.target.value); setErrors({}); }}
                  className="w-28 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {FILE_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.name.split(' ')[0]}</option>
                  ))}
                </select>
              </div>
              {errors.fileSize && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fileSize}</p>}
            </div>

            <div>
              <label htmlFor="network-speed" className="block text-sm font-semibold text-foreground/80 mb-2">Internet Speed</label>
              <div className="flex gap-2">
                <input
                  id="network-speed"
                  type="number"
                  value={speed}
                  onChange={(e) => { setSpeed(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => { setSpeedUnit(e.target.value); setErrors({}); }}
                  className="w-28 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {SPEED_UNITS.map((u) => (
                    <option key={u.key} value={u.key}>{u.key}</option>
                  ))}
                </select>
              </div>
              {errors.speed && <p className="text-xs text-red-500 mt-1 font-medium">{errors.speed}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Transfer Time
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
            <h2 className="text-xl font-bold text-foreground mb-6">Time Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Standard Estimated Time (10% overhead)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">{results.overhead10}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Perfect (0% overhead)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.base}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Congested (20% overhead)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.overhead20}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter file details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
