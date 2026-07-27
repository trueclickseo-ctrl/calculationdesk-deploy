'use client';
import React, { useState, useEffect } from 'react';
import { Watch } from 'lucide-react';

export default function WorldClockCalculator() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        'London (GMT)': now.toLocaleTimeString('en-US', { timeZone: 'Europe/London' }),
        'New York (EST)': now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }),
        'Tokyo (JST)': now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo' }),
        'Sydney (AEST)': now.toLocaleTimeString('en-US', { timeZone: 'Australia/Sydney' }),
        'New Delhi (IST)': now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Watch className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Global World Clock</h2>
      </div>
      <div className="space-y-4">
        {Object.entries(times).map(([city, time]) => (
          <div key={city} className="flex justify-between border-b border-border/40 pb-2">
            <span className="text-sm font-semibold text-foreground/80">{city}</span>
            <span className="text-sm font-bold text-primary">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}