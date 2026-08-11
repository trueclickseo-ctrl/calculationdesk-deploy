---
title: "Hours Calculator - Timesheet & Billable Duration Ledger"
seoTitle: "Hours Calculator - Calculate Total Hours, Minutes & Earnings | CalculationDesk"
metaDescription: "Free online Hours Calculator. Add or subtract work hours, clock-in/out times, and break deductions to calculate billable decimal hours and total earnings."
category: "date-time"
subcategory: "time-calculators"
tags: ["hours calculator", "timesheet calculator", "clock in clock out calculator", "decimal hours conversion", "work hours and minutes calculator"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-11"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-11"
nextReviewDate: "2026-11-11"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "Hours Calculator - Calculate Total Hours, Minutes & Earnings | CalculationDesk"
aiSummary:
  definition: "The Hours Calculator computes work shift durations from clock-in/clock-out times, subtracts unpaid break minutes, and aggregates total billable time across multiple timesheet rows in both standard (hours/minutes) and decimal hour formats, plus calculated pay earnings."
  quickAnswer: "Clocking in at 08:30 AM and out at 05:00 PM with a 45-minute break yields 7 hours 45 minutes (7.75 decimal hours)."
  formulaSummary: "Work Minutes = (Clock Out - Clock In, +24h if overnight) - Break Minutes | Decimal Hours = Work Minutes / 60 | Earnings = Decimal Hours x Hourly Rate"
  whenToUse: "Use this calculator to compile weekly payroll timesheets, track freelance client hours, calculate project time, or monitor study schedules."
  whoShouldUse: "Freelancers, employees, payroll managers, small business owners, and students."
  limitations: "Calculates time differences from clock-in/clock-out pairs and converts base-60 minutes to base-10 decimal hours, including overnight shifts that cross midnight."
  keyTakeaways:
    - "Calculates exact shift time between Clock In and Clock Out for each timesheet row."
    - "Subtracts unpaid Break Minutes directly from the daily shift, never allowing a negative result."
    - "Converts standard time (7h 45m) into base-10 Decimal Hours (7.75h) for accurate payroll arithmetic."
    - "Automatically detects overnight shifts (Clock Out earlier than Clock In) and adds 24 hours to compute the correct elapsed time."
    - "Multiplies total decimal hours by Hourly Rate to calculate total earnings."
peopleAlsoAsk:
  - "How do you convert minutes to decimal hours for payroll?"
  - "Why does 7 hours 30 minutes equal 7.5 hours and not 7.3 hours?"
  - "How does the calculator handle overnight shifts crossing midnight?"
  - "How are break deductions subtracted from total work time?"
examples:
  - title: "Single Day Shift Worked Example"
    inputs: "Clock In = 08:30, Clock Out = 17:00, Break = 45 mins, Hourly Rate = 25"
    calculation: "Clock In = 8x60+30 = 510 minutes from midnight. Clock Out = 17x60+0 = 1020 minutes from midnight. Raw elapsed = 1020-510 = 510 minutes (8h 30m). Subtract 45 min break -> 465 net minutes. Standard = 7h 45m. Decimal = 465/60 = 7.75h. Earnings = 7.75 x 25 = 193.75."
    result: "Work Time = 7h 45m (7.75 decimal hours) | Earnings = 193.75"
  - title: "Duration Addition Worked Example"
    inputs: "Duration 1 = 2h 45m, Duration 2 = 1h 35m"
    calculation: "Hours: 2 + 1 = 3h. Minutes: 45 + 35 = 80 mins. Since 80 >= 60, carry 1 hour: 3 + 1 = 4h, remaining mins = 80 - 60 = 20 mins."
    result: "Total Duration = 4 hours 20 minutes (4.33 decimal hours)"
  - title: "Overnight Shift Crossing Midnight"
    inputs: "Clock In = 22:00, Clock Out = 06:00, Break = 30 mins"
    calculation: "Clock In = 22x60 = 1320 minutes from midnight. Clock Out = 6x60 = 360 minutes from midnight. Since Clock Out (360) is earlier than Clock In (1320), the shift crossed midnight: raw elapsed = (1440-1320) + 360 = 120 + 360 = 480 minutes (8h). Subtract 30 min break -> 450 net minutes. Standard = 7h 30m. Decimal = 450/60 = 7.5h."
    result: "Work Time = 7h 30m (7.5 decimal hours)"
faqs:
  - q: "Why is 1 hour 30 minutes written as 1.5 hours in decimal format?"
    a: "Decimal hours operate in base-10, where 30 minutes represents half of a 60-minute hour (30 / 60 = 0.5). Therefore, 1 hour 30 minutes is 1.5 decimal hours."
  - q: "What is the most common mistake when calculating payroll hours?"
    a: "The most common mistake is directly multiplying minutes as if they were decimals (e.g. treating 7 hours 45 minutes as 7.45 hours). Multiplying 7.45 x $20 = $149.00, whereas the true calculation is 7.75 x $20 = $155.00."
  - q: "How does the calculator handle overnight shifts?"
    a: "If Clock Out is earlier than Clock In (e.g., In at 10:00 PM, Out at 06:00 AM), the calculator recognizes that the shift crossed midnight and adds 24 hours (1,440 minutes) to compute total elapsed time, as shown in the overnight worked example."
references:
  - "https://www.timeanddate.com/date/duration.html"
formulaDescription: "For each timesheet row, the calculator converts Clock In and Clock Out times to minutes elapsed since midnight. If Clock Out's minute value is at least Clock In's, the raw shift length is the simple difference; if Clock Out is earlier (an overnight shift), it adds 24 hours (1,440 minutes) before subtracting to get the correct positive duration. Break minutes are then subtracted (never going below zero), and the net minutes are converted to both a standard hours-and-minutes display and a decimal-hours value (net minutes divided by 60) for payroll math. Earnings multiply the summed decimal hours across all rows by the hourly rate."
variablesExplained:
  - name: "Clock In / Clock Out"
    description: "The start and end time of a work shift, entered in HH:MM format and internally converted to minutes elapsed since midnight for arithmetic."
  - name: "Break Minutes"
    description: "Unpaid break time subtracted directly from the raw elapsed shift minutes before converting to decimal hours."
  - name: "Decimal Hours"
    description: "Net work minutes divided by 60, expressing time in base-10 form (e.g. 45 minutes = 0.75) so it can be directly multiplied by an hourly rate for payroll."
stepByStep: "Enter a shift label, Clock In time, Clock Out time, and Break Minutes for each work day, adding additional rows as needed. The calculator computes each row's elapsed time (automatically detecting and correcting for overnight shifts that cross midnight), subtracts the break, and converts the result to both standard hours/minutes and decimal hours. Enter an Hourly Rate to see total earnings across all rows in the summary panel."
realWorldUses: "Employees use this to fill out weekly timesheets with daily start times, end times, and lunch breaks; freelancers use it to calculate billable client hours; project managers use it to track development, design, or research time across multiple work sessions; and shift workers with overnight schedules use the midnight-crossing logic to get accurate totals."
commonMistakes:
  - "Treating decimal hours as if the minutes were already base-10 — 7 hours 45 minutes is 7.75 decimal hours, not 7.45; multiplying 7.45 by an hourly rate instead of 7.75 underpays the worker."
  - "Forgetting that an overnight shift needs midnight-crossing logic — naively subtracting Clock In from Clock Out when Clock Out is numerically smaller (e.g. 06:00 minus 22:00) produces a negative number; the calculator instead adds 24 hours to get the correct positive duration, as shown in the overnight worked example."
---

# Hours Calculator – Timesheet & Billable Duration Guide

Whether you are a freelancer billing client projects, an employee filling out weekly timesheets, a manager processing payroll, or a student tracking study hours, adding and subtracting hours and minutes requires handling base-60 time arithmetic. Simply adding numbers like standard decimals leads to errors because 60 minutes make 1 full hour, not 100 minutes. Furthermore, payroll systems require converting minutes into base-10 decimal hours (e.g. 30 minutes = 0.5 hours). This calculator provides a dynamic timesheet ledger to enter daily Clock In, Clock Out, and Break Minutes, automatically outputting total hours/minutes, decimal hours, and calculated earnings.

## Standard Time (Base-60) vs. Decimal Hours (Base-10)

Standard time expresses a duration in hours and minutes (e.g. 7 hours 45 minutes). Decimal hours express the same duration as a single decimal number by dividing minutes by 60: 15 minutes = 0.25 hours, 30 minutes = 0.50 hours, 45 minutes = 0.75 hours.

> [!CAUTION]
> **The 7.45 vs. 7.75 payroll mistake**: A common accounting error is entering "7 hours 45 minutes" into a paycheck multiplier as 7.45 instead of 7.75. At $20/hr, the incorrect figure pays $149.00, while the correct decimal-hours figure pays $155.00 — a real underpayment, not just a rounding difference.

## How Hours & Minutes Arithmetic Works

**Adding durations across hour boundaries.** When adding 2 hours 45 minutes and 1 hour 35 minutes: sum the hours (2 + 1 = 3) and the minutes (45 + 35 = 80). Since 80 is at least 60, carry 1 hour over: hours become 3 + 1 = 4, and minutes become 80 − 60 = 20, giving a total of 4 hours 20 minutes (4.33 decimal hours).

**Clock-in/clock-out shift calculation.** For a single shift row:

$$\text{Shift Minutes} = \text{Clock Out (min from midnight)} - \text{Clock In (min from midnight)}$$

If Clock Out is earlier than Clock In, the calculator adds 1,440 minutes (24 hours) first, since the shift crossed midnight. Net work minutes then subtract the break:

$$\text{Net Work Minutes} = \text{Shift Minutes} - \text{Break Minutes} \qquad \text{Decimal Hours} = \frac{\text{Net Work Minutes}}{60}$$

## Worked Examples

### Example 1: Standard Day Shift (Clock In 08:30, Clock Out 17:00, 45-min break)

Clock In $= 8 \times 60 + 30 = 510$ minutes from midnight. Clock Out $= 17 \times 60 = 1020$ minutes from midnight. Raw elapsed $= 1020 - 510 = 510$ minutes (8h 30m). Subtracting the 45-minute break gives 465 net minutes: standard format **7h 45m**, decimal format $465/60 = $ **7.75 hours**. At $25.00/hr, earnings $= 7.75 \times 25 = \$193.75$.

### Example 2: Duration Addition (2h 45m + 1h 35m)

Hours: $2 + 1 = 3$. Minutes: $45 + 35 = 80$, which carries 1 hour over: hours become $3 + 1 = 4$, minutes become $80 - 60 = 20$. Total: **4 hours 20 minutes** (4.33 decimal hours).

### Example 3: Overnight Shift Crossing Midnight (Clock In 22:00, Clock Out 06:00, 30-min break)

Clock In $= 22 \times 60 = 1320$ minutes from midnight. Clock Out $= 6 \times 60 = 360$ minutes from midnight. Since Clock Out is numerically earlier than Clock In, the shift crossed midnight: raw elapsed $= (1440 - 1320) + 360 = 120 + 360 = 480$ minutes (8h). Subtracting the 30-minute break gives 450 net minutes: standard format **7h 30m**, decimal format $450/60 = $ **7.5 hours**.

## Practical Applications

Employee timesheets record daily start times, end times, and lunch breaks. Freelance billing calculates billable client hours multiplied by a project's hourly rate. Project and task tracking sums total development, design, or research time across multiple work sessions.

## How to Use the Calculator

Enter daily shift rows (label, Clock In, Clock Out, and Break Minutes), clicking "Add Timesheet Row" for additional days or sessions. Enter an Hourly Rate to calculate gross earnings automatically, and view total billable time in both standard hours/minutes and decimal format in the summary panel.

## Frequently Asked Questions

### Why is 1 hour 30 minutes written as 1.5 hours in decimal format?

Decimal hours operate in base-10, where 30 minutes represents half of a 60-minute hour (30 / 60 = 0.5). Therefore, 1 hour 30 minutes is 1.5 decimal hours.

### What is the most common mistake when calculating payroll hours?

The most common mistake is directly multiplying minutes as if they were decimals (e.g. treating 7 hours 45 minutes as 7.45 hours). Multiplying 7.45 × $20 = $149.00, whereas the true calculation is 7.75 × $20 = $155.00.

### How does the calculator handle overnight shifts?

If Clock Out is earlier than Clock In (e.g., In at 10:00 PM, Out at 06:00 AM), the calculator recognizes that the shift crossed midnight and adds 24 hours (1,440 minutes) to compute total elapsed time, as shown in the overnight worked example.
