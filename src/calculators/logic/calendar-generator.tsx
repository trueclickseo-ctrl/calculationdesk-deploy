'use client';

import React, { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export const seoData = {
  whatIs: `The Calendar Generator produces standard, clean monthly calendar grids for any year and month. It maps correct day names, handles leap years automatically, and outputs structural grids from Sunday to Saturday.`,
  formula: `Calendar layouts are generated using JavaScript time indices:

**1. First Day of Month (Weekday):**
$$\\text{Weekday Index} = \\text{Day of Week of Date}(Year, Month, 1)$$
(0 = Sunday, 6 = Saturday).

**2. Length of Month:**
$$\\text{Days Count} = \\text{Last Day of Month}(Year, Month)$$`,
  example: `**Generate Calendar for January 2026:**
- Year = 2026, Month = January (0 index in JS).
- Jan 1, 2026 falls on a **Thursday** (index 4).
- Total days in Jan 2026 = **31 days**.
- The calendar renders 4 blank spaces (Sun-Wed) followed by days 1 to 31, wrapping at Saturday boundaries.`,
  faqs: [
    {
      q: 'Does this calendar support custom starting days?',
      a: 'The standard layout starts on Sunday and ends on Saturday, which is the most common format in North America and digital calendars.',
    },
    {
      q: 'How are leap years handled?',
      a: 'The generator uses the native JavaScript Date API ($new Date(year, month + 1, 0).getDate()$) to resolve month lengths, which automatically handles February having 29 days on leap years.',
    },
    {
      q: 'Can I generate calendars for past or future centuries?',
      a: 'Yes. The calendar generator can accurately map Gregorian calendar layouts for any year (e.g., from year 1 to 9999).',
    },
  ],
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGenerator() {
  const [year, setYear] = useState<number>(2026);
  const [monthIdx, setMonthIdx] = useState<number>(0); // 0 = January

  const handleReset = () => {
    setYear(2026);
    setMonthIdx(0);
  };

  const handlePrevMonth = () => {
    if (monthIdx === 0) {
      setMonthIdx(11);
      setYear(prev => prev - 1);
    } else {
      setMonthIdx(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIdx === 11) {
      setMonthIdx(0);
      setYear(prev => prev + 1);
    } else {
      setMonthIdx(prev => prev + 1);
    }
  };

  // Computations
  const firstDay = new Date(year, monthIdx, 1);
  const startDayOfWeek = firstDay.getDay(); // 0 = Sun, 6 = Sat
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

  // Get previous month length for prefix padding
  const prevMonthDays = new Date(year, monthIdx, 0).getDate();

  // Grid array construction
  const cells: { dayNum: number; isCurrentMonth: boolean }[] = [];

  // Prefix padding from previous month
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      dayNum: prevMonthDays - i,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({
      dayNum: i,
      isCurrentMonth: true,
    });
  }

  // Suffix padding for remaining grid slots (to reach multiple of 7)
  const remaining = 42 - cells.length; // 6 rows of 7 days = 42 cells
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      dayNum: i,
      isCurrentMonth: false,
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Selector Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Date Range</h2>
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
              <label htmlFor="year-select" className="block text-sm font-semibold text-foreground/80 mb-2">Year</label>
              <input
                id="year-select"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div>
              <label htmlFor="month-select" className="block text-sm font-semibold text-foreground/80 mb-2">Month</label>
              <select
                id="month-select"
                value={monthIdx}
                onChange={(e) => setMonthIdx(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              >
                {MONTHS.map((m, idx) => (
                  <option key={idx} value={idx}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel (Calendar View) */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {MONTHS[monthIdx]} {year}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl border border-border hover:bg-border/40 text-foreground/70 transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl border border-border hover:bg-border/40 text-foreground/70 transition-all cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center mb-4">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={idx}
                  className={`text-xs font-bold py-1 ${
                    wd === 'Sun' || wd === 'Sat' ? 'text-red-500/80 dark:text-red-400/80' : 'text-foreground/45'
                  }`}
                >
                  {wd}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center">
              {cells.map((cell, idx) => (
                <div
                  key={idx}
                  className={`h-11 rounded-xl border flex items-center justify-center text-xs font-bold transition-all ${
                    cell.isCurrentMonth
                      ? 'border-border bg-background hover:border-primary hover:text-primary text-foreground'
                      : 'border-border/30 bg-background/20 text-foreground/30'
                  }`}
                >
                  {cell.dayNum}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
