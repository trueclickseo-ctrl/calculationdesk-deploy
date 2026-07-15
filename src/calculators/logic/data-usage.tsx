'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Data Usage Estimator estimates your daily and monthly cellular or home broadband internet data usage based on streaming, gaming, browsing, and social media habits.`,
  formula: `Data usage projections sum specific activity consumption indices:

$$\\text{Daily Data (MB)} = \\sum (\\text{Hours/Day}_i \\times \\text{Rate}_i)$$
Where average consumption rates are:
- Web Surfing: $60$ MB/hour
- Social Media: $150$ MB/hour
- Music Streaming: $100$ MB/hour
- Video (SD): $700$ MB/hour
- Video (HD/4K): $3,000$ MB/hour
- Online Gaming: $120$ MB/hour

$$\\text{Monthly Data (GB)} = \\frac{\\text{Daily Data (MB)} \\times 30.4 \\text{ Days}}{1,024}$$`,
  example: `**Estimate data for 2 hours of HD Video streaming and 1 hour of Social Media daily:**
- Video: 2 hours × 3,000 MB = 6,000 MB.
- Social: 1 hour × 150 MB = 150 MB.
- Daily Total = 6,150 MB (approx. 6.0 GB).
- Monthly projection = (6,150 × 30.4) / 1,024 = **182.58 GB/month**.`,
  faqs: [
    {
      q: 'How much data does 1 hour of video streaming use?',
      a: 'Standard Definition (SD) streaming uses about 700 MB per hour. High Definition (HD) streaming uses around 3 GB (3,000 MB) per hour, and 4K Ultra HD streaming can consume up to 7 GB per hour.',
    },
    {
      q: 'Does online gaming use a lot of data?',
      a: 'Surprisingly, no. Real-time online gaming typically uses only 40 to 150 MB of data per hour, as it only transfers coordinate and player states, not video. However, downloading game updates or voice chatting consumes significant data.',
    },
    {
      q: 'What monthly data plan is recommended for heavy streaming?',
      a: 'If you stream multiple hours of HD video daily, a plan of at least 200 GB or an unlimited data plan is highly recommended.',
    },
  ],
};

export default function DataUsageCalculator() {
  const [browsing, setBrowsing] = useState<number>(2);
  const [social, setSocial] = useState<number>(1);
  const [music, setMusic] = useState<number>(1);
  const [videoSD, setVideoSD] = useState<number>(0);
  const [videoHD, setVideoHD] = useState<number>(2);
  const [gaming, setGaming] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setBrowsing(2);
    setSocial(1);
    setMusic(1);
    setVideoSD(0);
    setVideoHD(2);
    setGaming(0);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(browsing) && browsing >= 0 && browsing <= 24 &&
                  !isNaN(social) && social >= 0 && social <= 24 &&
                  !isNaN(music) && music >= 0 && music <= 24 &&
                  !isNaN(videoSD) && videoSD >= 0 && videoSD <= 24 &&
                  !isNaN(videoHD) && videoHD >= 0 && videoHD <= 24 &&
                  !isNaN(gaming) && gaming >= 0 && gaming <= 24;

  if (isValid) {
    const dailyMB = (browsing * 60) +
                    (social * 150) +
                    (music * 100) +
                    (videoSD * 700) +
                    (videoHD * 3000) +
                    (gaming * 120);

    const dailyGB = dailyMB / 1024;
    const monthlyGB = dailyGB * 30.4;

    results = {
      dailyGB,
      monthlyGB,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    const checkRange = (val: number, name: string, label: string) => {
      if (val < 0 || val > 24 || isNaN(val)) {
        newErrors[name] = `${label} must be between 0 and 24 hours`;
      }
    };
    checkRange(browsing, 'browsing', 'Web browsing');
    checkRange(social, 'social', 'Social media');
    checkRange(music, 'music', 'Music streaming');
    checkRange(videoSD, 'videoSD', 'SD video');
    checkRange(videoHD, 'videoHD', 'HD video');
    checkRange(gaming, 'gaming', 'Online gaming');
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Daily Online Hours</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hour-browsing" className="block text-sm font-semibold text-foreground/80 mb-2">Web Browsing (hrs)</label>
              <input
                id="hour-browsing"
                type="number"
                value={browsing}
                onChange={(e) => { setBrowsing(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.browsing && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.browsing}</p>}
            </div>

            <div>
              <label htmlFor="hour-social" className="block text-sm font-semibold text-foreground/80 mb-2">Social Media (hrs)</label>
              <input
                id="hour-social"
                type="number"
                value={social}
                onChange={(e) => { setSocial(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.social && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.social}</p>}
            </div>

            <div>
              <label htmlFor="hour-music" className="block text-sm font-semibold text-foreground/80 mb-2">Music Streaming (hrs)</label>
              <input
                id="hour-music"
                type="number"
                value={music}
                onChange={(e) => { setMusic(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.music && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.music}</p>}
            </div>

            <div>
              <label htmlFor="hour-gaming" className="block text-sm font-semibold text-foreground/80 mb-2">Online Gaming (hrs)</label>
              <input
                id="hour-gaming"
                type="number"
                value={gaming}
                onChange={(e) => { setGaming(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.gaming && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.gaming}</p>}
            </div>

            <div>
              <label htmlFor="hour-video-sd" className="block text-sm font-semibold text-foreground/80 mb-2">SD Video (hrs)</label>
              <input
                id="hour-video-sd"
                type="number"
                value={videoSD}
                onChange={(e) => { setVideoSD(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.videoSD && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.videoSD}</p>}
            </div>

            <div>
              <label htmlFor="hour-video-hd" className="block text-sm font-semibold text-foreground/80 mb-2">HD / 4K Video (hrs)</label>
              <input
                id="hour-video-hd"
                type="number"
                value={videoHD}
                onChange={(e) => { setVideoHD(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.videoHD && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.videoHD}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-5 mt-5 border-t border-border">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Solve Data Usage
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

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Usage Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Monthly Allowance Needed</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.monthlyGB.toFixed(2)} GB / month
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Average Daily Consumption</span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.dailyGB.toFixed(2)} GB / day
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter daily hours.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
