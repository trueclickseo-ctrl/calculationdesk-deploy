'use client';

import React, { useState } from 'react';
import { Plus, Trash, RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Hours Calculator tracks daily timesheets, clock-in/clock-out hours, and unpaid break deductions to aggregate total billable hours and minutes for employees or freelancers.`,
  formula: `Timesheet sums are processed using time-difference conversions:

**1. Work Hours per Row:**
$$\\text{Work Minutes} = (\\text{Clock Out Minutes} - \\text{Clock In Minutes}) - \\text{Break Minutes}$$
$$\\text{Decimal Hours} = \\frac{\\text{Work Minutes}}{60}$$

**2. Total Accumulation:**
$$\\text{Total Hours} = \\sum \\text{Decimal Hours}_k$$`,
  example: `**Timesheet Entry:**
- Clock In: 08:30 AM (510 minutes from midnight).
- Clock Out: 05:00 PM (1020 minutes from midnight).
- Break: 45 minutes.
- Net Work = (1020 - 510) - 45 = 465 minutes.
- Decimal Hours = 465 / 60 = **7.75 hours** (7 hours 45 minutes).`,
  faqs: [
    {
      q: 'How does the break deduction work?',
      a: 'Break minutes are directly subtracted from the span between clock-in and clock-out times. Enter breaks in total minutes (e.g., 30 or 60).',
    },
    {
      q: 'What is decimal hours vs standard hours?',
      a: 'Decimal hours represent fractional portions in base-10 (e.g., 7.5 hours), which is useful for payroll calculations. Standard hours represent time in base-60 (e.g., 7 hours 30 minutes).',
    },
    {
      q: 'Can I add multiple days or rows?',
      a: 'Yes. The calculator allows adding multiple timesheet lines, representing different days of the week, and automatically sums them at the bottom.',
    },
  ],
};

interface TimeRow {
  id: string;
  dayName: string;
  clockIn: string; // "HH:MM"
  clockOut: string; // "HH:MM"
  breakMin: number;
}

export default function HoursCalculator() {
  const [rows, setRows] = useState<TimeRow[]>([
    { id: '1', dayName: 'Monday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
    { id: '2', dayName: 'Tuesday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
    { id: '3', dayName: 'Wednesday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
    { id: '4', dayName: 'Thursday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
    { id: '5', dayName: 'Friday', clockIn: '08:30', clockOut: '16:30', breakMin: 45 }
  ]);

  const [hourlyRate, setHourlyRate] = useState<number>(25);

  const handleUpdateRow = (id: string, field: keyof TimeRow, val: string | number) => {
    const copy = rows.map(r => (r.id === id ? { ...r, [field]: val } : r));
    setRows(copy);
  };

  const handleAddRow = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const nextDay = days[rows.length % 7];
    const newRow: TimeRow = {
      id: Date.now().toString(),
      dayName: nextDay,
      clockIn: '08:30',
      clockOut: '17:00',
      breakMin: 45
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const handleReset = () => {
    setRows([
      { id: '1', dayName: 'Monday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
      { id: '2', dayName: 'Tuesday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
      { id: '3', dayName: 'Wednesday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
      { id: '4', dayName: 'Thursday', clockIn: '08:30', clockOut: '17:00', breakMin: 45 },
      { id: '5', dayName: 'Friday', clockIn: '08:30', clockOut: '16:30', breakMin: 45 }
    ]);
    setHourlyRate(25);
  };

  // Computations
  const computedRows = rows.map(row => {
    const [inH, inM] = row.clockIn.split(':').map(Number);
    const [outH, outM] = row.clockOut.split(':').map(Number);

    let diffMin = 0;
    if (!isNaN(inH) && !isNaN(inM) && !isNaN(outH) && !isNaN(outM)) {
      const startMin = inH * 60 + inM;
      const endMin = outH * 60 + outM;

      // Handle overnight shift (out < in)
      const rawDiff = endMin >= startMin ? endMin - startMin : (24 * 60 - startMin) + endMin;
      diffMin = Math.max(0, rawDiff - row.breakMin);
    }

    const rowH = Math.floor(diffMin / 60);
    const rowM = diffMin % 60;
    const decimalHours = diffMin / 60;

    return {
      ...row,
      formatted: `${rowH}h ${rowM}m`,
      decimalHours,
      diffMin,
    };
  });

  const totalMinutes = computedRows.reduce((acc, curr) => acc + curr.diffMin, 0);

  const grandHours = Math.floor(totalMinutes / 60);
  const grandMinutes = totalMinutes % 60;
  const grandDecimalHours = totalMinutes / 60;
  const totalEarnings = grandDecimalHours * hourlyRate;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Timesheet Ledger</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset Ledger
            </button>
          </div>

          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-bold text-foreground/50 uppercase tracking-wider pb-2 border-b border-border">
              <div className="col-span-3">Day / label</div>
              <div className="col-span-3">Clock In</div>
              <div className="col-span-3">Clock Out</div>
              <div className="col-span-2">Break (Min)</div>
              <div className="col-span-1 text-center">Delete</div>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {rows.map((row) => (
                <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-background/30 p-2 md:p-0 rounded-xl md:rounded-none border border-border/50 md:border-none">
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={row.dayName}
                      onChange={(e) => handleUpdateRow(row.id, 'dayName', e.target.value)}
                      className="w-full py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background focus:border-primary outline-none"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="time"
                      value={row.clockIn}
                      onChange={(e) => handleUpdateRow(row.id, 'clockIn', e.target.value)}
                      className="w-full py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background focus:border-primary outline-none text-foreground/80"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="time"
                      value={row.clockOut}
                      onChange={(e) => handleUpdateRow(row.id, 'clockOut', e.target.value)}
                      className="w-full py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background focus:border-primary outline-none text-foreground/80"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={row.breakMin}
                      onChange={(e) => handleUpdateRow(row.id, 'breakMin', Number(e.target.value))}
                      className="w-full py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background focus:border-primary outline-none"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      className="inline-flex items-center justify-center p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer transition-all"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover pt-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Timesheet Row
            </button>

            <div className="pt-4 border-t border-border mt-4">
              <label htmlFor="hourly-rate" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                Hourly Rate ($ / hour)
              </label>
              <input
                id="hourly-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="block w-24 py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Total Sum</h2>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Billable Hours</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  {grandHours}h {grandMinutes}m
                </span>
                <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                  ({grandDecimalHours.toFixed(2)} decimal hours)
                </span>
              </div>

              {hourlyRate > 0 && (
                <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Earnings</span>
                  <span className="block text-2xl font-extrabold text-accent mt-1">
                    ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="rounded-xl bg-background p-3 border border-border text-xs text-foreground/60 space-y-1.5 max-h-[180px] overflow-y-auto">
                <span className="block font-bold text-foreground/80 uppercase text-[9px] tracking-wider mb-1">Row breakdown</span>
                {computedRows.map((r, idx) => (
                  <div key={r.id} className="flex justify-between items-center font-medium">
                    <span>{r.dayName || `Row ${idx + 1}`}</span>
                    <span>{r.formatted} ({r.decimalHours.toFixed(2)}h)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
