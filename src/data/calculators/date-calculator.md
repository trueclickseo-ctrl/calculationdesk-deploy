---
title: "Date Calculator - Time Between Dates & Date Offset Solver"
seoTitle: "Date Calculator - Calculate Days Between Dates & Date Offset | CalculationDesk"
metaDescription: "Free online Date Calculator. Calculate total elapsed days, weeks, and remaining days between two dates, or add/subtract days, weeks, months, and years."
category: "date-time"
subcategory: "date-calculators"
tags: ["date calculator", "days between dates", "add subtract days from date", "date difference calculator", "calendar offset planner"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "Date Calculator - Calculate Days Between Dates & Date Offset | CalculationDesk"
aiSummary:
  definition: "The Date Calculator evaluates temporal intervals between two dates (time between dates mode) and computes future or past target dates by adding or subtracting days, weeks, months, or years."
  quickAnswer: "Jan 1, 2026 to Jan 15, 2026 yields 14 total elapsed days (2 weeks 0 days). Adding 3 months to Jan 15, 2026 yields Apr 15, 2026. Subtracting 2 weeks yields Jan 1, 2026."
  formulaSummary: "Difference: Total Days = (End Timestamp - Start Timestamp) / 86400000 | Offset: New Date = Start Date ± Interval"
  whenToUse: "Use this tool to track project deadlines, calculate vacation days, plan billing payment terms, or measure event intervals."
  whoShouldUse: "Project managers, students, event planners, HR staff, legal administrators, and travelers."
  limitations: "Calculates calendar day differences and date offsets."
  keyTakeaways:
 - "Supports 2 primary modes: Time Between Dates and Add / Subtract Date."
 - "Computes Total Days difference alongside Weeks + Remaining Days breakdown."
 - "Adds or subtracts intervals across Days, Weeks, Months, or Years."
 - "Accounts for Gregorian leap years and variable month lengths."
peopleAlsoAsk:
  - "How do you calculate the number of days between two dates?"
  - "How does adding months to a date work at month-end (e.g. Jan 31 + 1 month)?"
  - "Does the calculator account for leap years?"
  - "What is the difference between calendar days and elapsed days?"
examples:
  - title: "Time Between Dates Example (Jan 1, 2026 to Jan 15, 2026)"
 inputs: "Mode = Time Between Dates, Start Date = 2026-01-01, End Date = 2026-01-15"
 calculation: "15 days - 1 day = 14 elapsed days. Weeks breakdown: 14 / 7 = 2 weeks and 0 remaining days."
 result: "Total Days Difference = 14 days | Weeks Breakdown = 2 weeks 0 days"
  - title: "Date Offset Addition (Jan 15, 2026 + 30 Days)"
 inputs: "Mode = Add/Subtract Date, Reference Date = 2026-01-15, Action = Add, Value = 30, Unit = Days"
 calculation: "Adding 30 calendar days to Jan 15, 2026: Jan has 16 remaining days (31 - 15 = 16). 30 - 16 = 14 days into February -> Feb 14, 2026."
 result: "Calculated Date Target = Sat Feb 14 2026"
  - title: "Date Offset Subtraction (Jan 15, 2026 - 2 Weeks)"
 inputs: "Mode = Add/Subtract Date, Reference Date = 2026-01-15, Action = Subtract, Value = 2, Unit = Weeks"
 calculation: "2 weeks = 14 days. Subtracting 14 days from Jan 15, 2026 -> Jan 1, 2026."
 result: "Calculated Date Target = Thu Jan 01 2026"
  - title: "Month Offset Addition (Jan 15, 2026 + 3 Months)"
 inputs: "Mode = Add/Subtract Date, Reference Date = 2026-01-15, Action = Add, Value = 3, Unit = Months"
 calculation: "Jan 15 + 3 months -> April 15, 2026."
 result: "Calculated Date Target = Wed Apr 15 2026"
faqs:
  - q: "How many days are between two dates?"
 a: "Select the 'Time Between Dates' mode, enter your start date and end date, and click 'Solve Date'. The calculator displays total elapsed days and weeks."
  - q: "How do I calculate a date 90 days from today?"
 a: "Select 'Add / Subtract Date' mode, set Action to 'Add', Value to 90, Unit to 'Days', and set your reference date to today."
  - q: "Does the calculator account for leap years?"
 a: "Yes. The calculator uses standard Gregorian calendar rules, automatically accounting for 366-day leap years and differing month lengths (28, 29, 30, or 31 days)."
references:
  - "https://www.timeanddate.com/date/dateadd.html"
---

# Date Calculator – Time Between Dates & Offset Guide

Whether you are tracking project deadlines, scheduling payment terms, planning vacations, or measuring notice periods, managing calendar dates requires accounting for variable month lengths ($28, 29, 30, or  31$ days) and leap years.

This calculator provides **2 dedicated calendar modes**:
1. **Time Between Dates Mode**: Calculates total elapsed days and weeks between two specific dates.
2. **Add / Subtract Date Mode**: Computes a past or future target date by adding or subtracting days, weeks, months, or years.

---

### How Date Calculations Work

#### 1. Time Between Dates Mode
- **Timestamp Difference**: Evaluates the millisecond difference between End Date and Start Date:
  Total Days = frac(End Timestamp - Start Timestamp){1000 × 60 × 60 × 24}
- **Weeks & Remaining Days Breakdown**:
  Weeks = truncfrac(Total Days){7}, Remaining Days = Total Days ±od 7

#### 2. Add / Subtract Date Mode
Adjusts calendar fields according to the selected unit:
- **Days**: Adds or subtracts exact calendar days.
- **Weeks**: Adds or subtracts 7 × Weeks days.
- **Months**: Advances or rewinds calendar months.
- **Years**: Adjusts the calendar year.

---

### Step-by-Step Worked Numerical Examples (Verified against Code)

#### Example 1: Time Between Dates (Jan 1, 2026 to Jan 15, 2026)
- **Start Date**: January 1, 2026 (`2026-01-01`)
- **End Date**: January 15, 2026 (`2026-01-15`)
- **Calculation**: 15 - 1 = 14  elapsed days.
- **Breakdown**: 14 / 7 = 2  weeks and  0  days.

#### Example 2: Add 30 Days to Jan 15, 2026
- **Reference Date**: January 15, 2026
- **Action**: Add 30 Days
- **Calculation**: January has 31 days ($31 - 15 = 16$ days remaining in Jan). 30 - 16 = 14$ days into February.
- **Result**: **Sat Feb 14 2026**.

#### Example 3: Subtract 2 Weeks from Jan 15, 2026
- **Reference Date**: January 15, 2026
- **Action**: Subtract 2 Weeks ($14$ days)
- **Calculation**: 15 - 14 = 1$.
- **Result**: **Thu Jan 01 2026**.

#### Example 4: Add 3 Months to Jan 15, 2026
- **Reference Date**: January 15, 2026
- **Action**: Add 3 Months
- **Calculation**: Month 1$ (Jan) + 3 = Month  4 (April).
- **Result**: **Wed Apr 15 2026**.

---

### Month-End Edge Cases

When adding months to dates near the end of a month (such as January 31), calendar lengths vary. Standard calendar engines adjust target days to match the last valid day of the target month (e.g. adding 1 month to Jan 31 yields Feb 28 or Feb 29 in leap years).

---

### Frequently Asked Questions (FAQ)

* **Q1: How many days are between two dates?**
  * A1: Select the 'Time Between Dates' mode, enter your start date and end date, and click 'Solve Date'. The calculator displays total elapsed days and weeks.
* **Q2: How do I calculate a date 90 days from today?**
  * A2: Select 'Add / Subtract Date' mode, set Action to 'Add', Value to 90, Unit to 'Days', and set your reference date to today.
* **Q3: Does the calculator account for leap years?**
  * A3: Yes. The calculator uses standard Gregorian calendar rules, automatically accounting for 366-day leap years and differing month lengths (28, 29, 30, or 31 days).
