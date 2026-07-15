'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Age Calculator is a tool designed to determine the precise duration of time between a person's birth date and a chosen reference date. It breaks down this duration into years, months, weeks, days, hours, minutes, and seconds. It is helpful for legal filings, school enrollment verifications, health assessments, or simple curiosity.`,
  formula: `Age is calculated by subtracting the Birth Date from the Reference Date (current date by default). Because months have variable numbers of days (28, 29, 30, or 31) and leap years add a day in February every 4 years, calculations adjust dates by:

1. Subtracting days: If reference day < birth day, borrow the total number of days in the previous month of the reference date.
2. Subtracting months: If reference month < birth month (after potential borrows), borrow 12 months from the reference year.
3. Subtracting years: Calculate reference year minus birth year.`,
  example: `If an individual was born on October 15, 1995, and the current date is July 15, 2026:

1. Days: 15 (Ref) - 15 (Birth) = 0 days.
2. Months: 7 (Ref, July) < 10 (Birth, October). Borrow 12 months from Year:
   - Months = (7 + 12) - 10 = 9 months.
   - Year borrows = 1.
3. Years: (2026 - 1) - 1995 = 30 years.
4. Total Age: 30 years, 9 months, and 0 days.`,
  faqs: [
    {
      q: 'How does the calculator handle leap years?',
      a: 'The calculator automatically adjusts for leap years. If you were born on February 29 and the reference year is a non-leap year, your age advances by a full year on March 1 of that year.',
    },
    {
      q: 'What calendar system is used?',
      a: 'This calculator is based on the Gregorian calendar, which is the most widely used civil calendar system in the world today.',
    },
    {
      q: 'Can I calculate age on a future date?',
      a: 'Yes, you can change the "Age at Date" field to any date in the future to see how old you will be at that time.',
    },
  ],
};

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>('1995-10-15');
  
  // Set default target date to today
  const [targetDate, setTargetDate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate default targetDate on mount (safely after hydration)
  useEffect(() => {
    if (!targetDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      setTargetDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [targetDate]);

  // Validate inline during render
  const isValid = !!dob && !!targetDate && new Date(dob) <= new Date(targetDate);

  // Compute results during render
  let results = null;
  if (isValid) {
    const birth = new Date(dob);
    const ref = new Date(targetDate);

    // Day of the week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayOfWeek = daysOfWeek[birth.getDay()];

    // Zodiac Sign
    const getZodiacSign = (day: number, month: number) => {
      const m = month + 1; // Month is 1-indexed here
      if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries ♈';
      if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus ♉';
      if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini ♊';
      if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer ♋';
      if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo ♌';
      if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo ♍';
      if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra ♎';
      if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio ♏';
      if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Sagittarius ♐';
      if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return 'Capricorn ♑';
      if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius ♒';
      return 'Pisces ♓';
    };
    const zodiac = getZodiacSign(birth.getDate(), birth.getMonth());

    // Age Years/Months/Days difference
    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();

    if (days < 0) {
      const prevMonthDate = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonthDate.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    // Cumulative stats
    const diffTime = ref.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next Birthday calculation
    const nextBday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < ref) {
      nextBday.setFullYear(ref.getFullYear() + 1);
    }
    const bdayDiffTime = nextBday.getTime() - ref.getTime();
    const daysToNextBirthday = Math.ceil(bdayDiffTime / (1000 * 60 * 60 * 24));
    
    const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30.436875);

    results = {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      zodiac,
      birthDayOfWeek,
      daysToNextBirthday,
      monthsToNextBirthday,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (!dob) newErrors.dob = 'Date of Birth is required';
    if (!targetDate) newErrors.targetDate = 'Reference date is required';
    if (dob && targetDate && new Date(dob) > new Date(targetDate)) {
      newErrors.dob = 'Date of Birth cannot be after reference date';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setDob('1995-10-15');
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setTargetDate(todayStr);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Enter Birthday Details</h2>
          
          <div className="space-y-5">
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-foreground/80 mb-2">
                Date of Birth
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent cursor-pointer"
                />
              </div>
              {errors.dob && <p className="text-xs text-red-500 mt-1 font-medium">{errors.dob}</p>}
            </div>

            {/* Target Date */}
            <div>
              <label htmlFor="target-date" className="block text-sm font-semibold text-foreground/80 mb-2">
                Age at Date
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent cursor-pointer"
                />
              </div>
              {errors.targetDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetDate}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Age
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Age Results</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Big Age Readout */}
                <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Your Exact Age
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <div className="text-center bg-background px-3 py-2.5 rounded-lg border border-border min-w-[70px]">
                      <span className="block text-2xl font-black text-primary">{results.years}</span>
                      <span className="text-[10px] font-bold text-foreground/40 uppercase">Years</span>
                    </div>
                    <div className="text-center bg-background px-3 py-2.5 rounded-lg border border-border min-w-[70px]">
                      <span className="block text-2xl font-black text-primary">{results.months}</span>
                      <span className="text-[10px] font-bold text-foreground/40 uppercase">Months</span>
                    </div>
                    <div className="text-center bg-background px-3 py-2.5 rounded-lg border border-border min-w-[70px]">
                      <span className="block text-2xl font-black text-primary">{results.days}</span>
                      <span className="text-[10px] font-bold text-foreground/40 uppercase">Days</span>
                    </div>
                  </div>
                  <span className="block text-xs text-foreground/50 mt-4 font-semibold">
                    Born on a <span className="text-foreground/80 font-bold">{results.birthDayOfWeek}</span>
                  </span>
                </div>

                {/* Next Birthday & Zodiac */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
                      Next Birthday
                    </span>
                    <span className="block text-lg font-black text-foreground mt-1">
                      {results.daysToNextBirthday === 365 || results.daysToNextBirthday === 0 ? 'Today! 🎉' : `${results.daysToNextBirthday} Days`}
                    </span>
                    <span className="block text-[10px] text-foreground/50 mt-1 font-semibold">
                      {results.monthsToNextBirthday > 0 ? `approx. ${results.monthsToNextBirthday} months` : 'within 30 days'}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
                      Zodiac Sign
                    </span>
                    <span className="block text-lg font-black text-foreground mt-1">
                      {results.zodiac}
                    </span>
                    <span className="block text-[10px] text-foreground/50 mt-1 font-semibold uppercase">
                      Western Astrology
                    </span>
                  </div>
                </div>

                {/* Cumulative stats list */}
                <div className="rounded-xl border border-border bg-background p-4 space-y-2.5">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider border-b border-border pb-1.5 mb-2">
                    Lifetime Accumulation
                  </span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-semibold">
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Total Months:</span>
                      <span className="text-foreground">{results.totalMonths.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Total Weeks:</span>
                      <span className="text-foreground">{results.totalWeeks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Total Days:</span>
                      <span className="text-foreground">{results.totalDays.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Total Hours:</span>
                      <span className="text-foreground">{results.totalHours.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between col-span-2 border-t border-border/40 pt-2 flex justify-between">
                      <span className="text-foreground/50">Total Minutes:</span>
                      <span className="text-foreground">{results.totalMinutes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between col-span-2 border-t border-border/40 pt-2 flex justify-between">
                      <span className="text-foreground/50">Total Seconds:</span>
                      <span className="text-foreground">{results.totalSeconds.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter your birthday details to see results.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
