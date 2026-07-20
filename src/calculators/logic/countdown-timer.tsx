'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Countdown Generator tracks the exact time remaining until a specified future date and time. It calculates live remaining days, hours, minutes, and seconds.`,
  formula: `Countdown remaining calculations are computed relative to the current timestamp:

$$\\text{Remaining Time (ms)} = \\text{Target Epoch Timestamp} - \\text{Current Epoch Timestamp}$$
- Convert milliseconds to standard calendar units.`,
  example: `**Countdown to New Year (Jan 1, 2027 00:00:00):**
- Current Time: July 15, 2026.
- Output: **169 days, 22 hours, 10 minutes, and 45 seconds remaining** (updating in real time).`,
  faqs: [
    {
      q: 'Does it update automatically?',
      a: 'Yes. The countdown uses a client-side timer interval that triggers updates every single second to reflect the remaining time dynamically.',
    },
    {
      q: 'What happens when the countdown hits zero?',
      a: 'Once the target date is reached, the timer stops at zero and displays an alert indicating that the event has started or completed.',
    },
    {
      q: 'Does it handle timezone offsets?',
      a: 'Yes. The countdown utilizes your local system timezone of the browser, matching the precise real-world moment of the event.',
    },
  ],
};

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<string>('2027-01-01');
  const [targetTime, setTargetTime] = useState<string>('00:00');
  const [eventTitle, setEventTitle] = useState<string>('New Year');

  const [mounted, setMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: false });

  const handleReset = () => {
    setTargetDate('2027-01-01');
    setTargetTime('00:00');
    setEventTitle('New Year');
  };

  useEffect(() => {
    const animFrame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const targetStr = `${targetDate}T${targetTime}:00`;
      const target = new Date(targetStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (isNaN(target) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, finished: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted, targetDate, targetTime]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Target Setup</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="event-title" className="block text-sm font-semibold text-foreground/80 mb-2">Event Title</label>
              <input
                id="event-title"
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="target-date" className="block text-sm font-semibold text-foreground/80 mb-2">Target Date</label>
                <input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="target-time" className="block text-sm font-semibold text-foreground/80 mb-2">Target Time</label>
                <input
                  id="target-time"
                  type="time"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Remaining to {eventTitle || 'Event'}
            </h2>

            {!mounted ? (
              <div className="flex h-48 items-center justify-center text-foreground/40 text-sm italic">
                Loading live countdown...
              </div>
            ) : (
              <div className="space-y-6">
                {timeLeft.finished ? (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-emerald-600 dark:text-emerald-500 text-lg font-extrabold text-center">
                    🎉 The event has arrived!
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-3xl font-extrabold text-primary">{timeLeft.days}</span>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Days</span>
                    </div>

                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-3xl font-extrabold text-primary">{timeLeft.hours}</span>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Hours</span>
                    </div>

                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-3xl font-extrabold text-primary">{timeLeft.minutes}</span>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Minutes</span>
                    </div>

                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-3xl font-extrabold text-primary">{timeLeft.seconds}</span>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Seconds</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
