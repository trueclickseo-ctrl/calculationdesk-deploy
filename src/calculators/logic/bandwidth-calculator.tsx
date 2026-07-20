'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Bandwidth Calculator estimates web hosting bandwidth limits and average throughput speeds (in Mbps) based on website traffic, average page size, and peak performance redundancy multipliers.`,
  formula: `Bandwidth sizing scales monthly pageviews against payload sizes:

**1. Raw Monthly Transfer (GB/Month):**
$$\\text{Raw Transfer} = \\frac{\\text{Pageviews} \\times \\text{Page Size (MB)}}{1,024}$$

**2. Redundant (Peak) Transfer (GB/Month):**
$$\\text{Redundant Transfer} = \\text{Raw Transfer} \\times \\text{Redundancy Factor}$$

**3. Required Line Rate (Mbps):**
$$\\text{Throughput} = \\frac{\\text{Redundant Transfer (GB)} \\times 8,000 \\text{ Megabits}}{2,592,000 \\text{ Seconds/Month}}$$`,
  example: `**Calculate requirements for 500,000 pageviews/month, 3 MB average page size, and a 1.5 peak factor:**
- Raw monthly transfer = (500,000 × 3) / 1,024 = **1,464.84 GB/month**.
- Redundant (Peak) transfer = 1,464.84 × 1.5 = **2,197.27 GB/month**.
- Throughput required = (2,197.27 × 8,000) / 2,592,000 = **6.78 Mbps** continuous rate.`,
  faqs: [
    {
      q: 'What is a redundancy/peak factor?',
      a: 'Web traffic is never perfectly flat. Redundancy factors (typically 1.5 to 2.0) account for daily traffic peaks, video spikes, and user surges so the hosting server doesn\'t lag under stress.',
    },
    {
      q: 'Is bandwidth the same as speed?',
      a: 'No. Bandwidth is the volume of data that can be transferred over a network connection in a given time. Speed is the rate at which that data travels.',
    },
    {
      q: 'How does caching affect website bandwidth?',
      a: 'Caching reduces server bandwidth requirements by storing static files (like images, CSS, and JS) on CDN servers or browser caches, preventing duplicate downloads.',
    },
  ],
};

export default function BandwidthCalculator() {
  const [pageViews, setPageViews] = useState<number>(100000);
  const [pageSize, setPageSize] = useState<number>(2.5);
  const [pageSizeUnit, setPageSizeUnit] = useState<string>('MB');
  const [peakFactor, setPeakFactor] = useState<number>(1.5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPageViews(100000);
    setPageSize(2.5);
    setPageSizeUnit('MB');
    setPeakFactor(1.5);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(pageViews) && pageViews >= 0 &&
                  !isNaN(pageSize) && pageSize >= 0 &&
                  !isNaN(peakFactor) && peakFactor >= 1;

  if (isValid) {
    const sizeInMB = pageSizeUnit === 'KB' ? pageSize / 1024 : pageSize;
    
    // Raw Monthly Transfer in GB
    const rawTransfer = (pageViews * sizeInMB) / 1024;
    
    // Redundant Monthly Transfer in GB
    const peakTransfer = rawTransfer * peakFactor;

    // Required throughput in Mbps (8 bits per Byte, 1 GB = 1000 MB for bits rating)
    // 30 days = 2,592,000 seconds
    const reqMbps = (peakTransfer * 8000) / 2592000;

    results = {
      rawTransfer,
      peakTransfer,
      reqMbps,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (pageViews < 0 || isNaN(pageViews)) newErrors.pageViews = 'Page views cannot be negative';
    if (pageSize < 0 || isNaN(pageSize)) newErrors.pageSize = 'Page size cannot be negative';
    if (peakFactor < 1 || isNaN(peakFactor)) newErrors.peakFactor = 'Redundancy factor must be at least 1.0';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Traffic Specifiers</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-pageviews" className="block text-sm font-semibold text-foreground/80 mb-2">Monthly Page Views</label>
              <input
                id="monthly-pageviews"
                type="number"
                value={pageViews}
                onChange={(e) => { setPageViews(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.pageViews && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pageViews}</p>}
            </div>

            <div>
              <label htmlFor="avg-page-size" className="block text-sm font-semibold text-foreground/80 mb-2">Average Page Size</label>
              <div className="flex gap-2">
                <input
                  id="avg-page-size"
                  type="number"
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={pageSizeUnit}
                  onChange={(e) => { setPageSizeUnit(e.target.value); setErrors({}); }}
                  className="w-24 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                </select>
              </div>
              {errors.pageSize && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pageSize}</p>}
            </div>

            <div>
              <label htmlFor="redundancy-multiplier" className="block text-sm font-semibold text-foreground/80 mb-2">Redundancy / Peak Factor</label>
              <input
                id="redundancy-multiplier"
                type="number"
                step="0.1"
                value={peakFactor}
                onChange={(e) => { setPeakFactor(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.peakFactor && <p className="text-xs text-red-500 mt-1 font-medium">{errors.peakFactor}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Bandwidth
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
            <h2 className="text-xl font-bold text-foreground mb-6">Traffic Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Required Throughput Rate</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.reqMbps.toFixed(2)} Mbps
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Raw Monthly Transfer</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.rawTransfer.toFixed(2)} GB / month
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Peak Bandwidth Allowed</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.peakTransfer.toFixed(2)} GB / month
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter traffic variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
