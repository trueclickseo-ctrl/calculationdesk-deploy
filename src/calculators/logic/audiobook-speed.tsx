'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Audiobook Speed Calculator computes adjusted listening times and hours saved when running audiobook narration at custom speed multipliers.`,
  formula: `Listening duration is solved by dividing normal track time by playback speed:

**1. Adjusted Listening Time ($T_{listen}$, in minutes):**
$$T_{listen} = \\frac{\\text{Normal Duration (minutes)}}{\\text{Speed Multiplier}}$$

**2. Time Saved ($T_{saved}$, in minutes):**
$$T_{saved} = \\text{Normal Duration} - T_{listen}$$`,
  example: `**Calculate playback for a 12-hour (720 minutes) audiobook listened to at 1.5x speed:**
- Adjusted Time = 12 / 1.5 = **8 hours** (480 minutes).
- Time Saved = 12 - 8 = **4 hours** saved.`,
  faqs: [
    {
      q: 'What is the average human narration speed?',
      a: 'Average audiobook narrators speak at about 150 to 160 words per minute (WPM). Reading speed is usually faster (200–250 WPM).',
    },
    {
      q: 'Which playback speed is best for audiobooks?',
      a: 'Most listeners prefer 1.25x to 1.5x speed. It sounds natural and saves 20-33% of listening time. 2.0x speed is good for quick reviews but can reduce comprehension.',
    },
  ],
};

export default function AudiobookSpeedCalculator() {
  const [hours, setHours] = useState<number>(10);
  const [mins, setMins] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1.5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setHours(10);
    setMins(0);
    setSpeed(1.5);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(hours) && hours >= 0 &&
                  !isNaN(mins) && mins >= 0 && mins < 60 &&
                  !isNaN(speed) && speed >= 0.5 && speed <= 4.0 &&
                  (hours * 60 + mins) > 0;

  if (isValid) {
    const totalMinutes = hours * 60 + mins;
    const listenMinutes = totalMinutes / speed;
    const savedMinutes = totalMinutes - listenMinutes;

    results = {
      listenHours: Math.floor(listenMinutes / 60),
      listenMins: Math.round(listenMinutes % 60),
      savedHours: Math.floor(savedMinutes / 60),
      savedMins: Math.round(savedMinutes % 60),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (hours < 0 || isNaN(hours)) newErrors.time = 'Hours cannot be negative';
    if (mins < 0 || mins >= 60 || isNaN(mins)) newErrors.time = 'Minutes must be between 0 and 59';
    if (hours * 60 + mins === 0) newErrors.time = 'Duration must be greater than zero';
    if (speed < 0.5 || speed > 4 || isNaN(speed)) newErrors.speed = 'Speed must be between 0.5x and 4x';
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
          <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Audiobook Settings</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Normal Duration</label>
              <div className="flex items-center gap-3">
                <input
                  aria-label="Hours"
                  type="number"
                  value={hours}
                  onChange={(e) => { setHours(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                <span className="text-foreground/50 font-bold">hr</span>
                <input
                  aria-label="Minutes"
                  type="number"
                  value={mins}
                  onChange={(e) => { setMins(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                <span className="text-foreground/50 font-bold">min</span>
              </div>
              {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{errors.time}</p>}
            </div>

            <div>
              <label htmlFor="play-speed" className="block text-sm font-semibold text-foreground/80 mb-2">Narration Speed Multiplier</label>
              <input
                id="play-speed"
                type="number"
                step="0.05"
                value={speed}
                onChange={(e) => { setSpeed(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.speed && <p className="text-xs text-red-500 mt-1 font-medium">{errors.speed}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Speed
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
            <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Playback Duration</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Adjusted Listening Time</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.listenHours}h {results.listenMins}m
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    At {speed.toFixed(2)}x playback speed
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Total Time Saved:</span>
                  <span className="text-foreground font-bold text-green-500">
                    {results.savedHours}h {results.savedMins}m saved
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter playback settings.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
