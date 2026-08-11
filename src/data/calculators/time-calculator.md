---
title: "Time Calculator - Duration Math & Sexagesimal Unit Converter"
seoTitle: "Time Calculator - Add, Subtract & Convert Hours, Minutes, Seconds | CalculationDesk"
metaDescription: "Free online Time Calculator. Add and subtract time durations (hours, minutes, seconds) with carrying and borrowing, and convert durations across seconds, minutes, hours, and days."
category: "date-time"
subcategory: "time-calculators"
tags: ["time calculator", "add subtract time", "hours minutes seconds calculator", "time duration converter", "carrying borrowing time math"]
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
  - "Time Calculator - Add, Subtract & Convert Hours, Minutes, Seconds | CalculationDesk"
aiSummary:
  definition: "The Time Calculator performs addition and subtraction on time durations (hours, minutes, seconds) with carrying and borrowing, and converts durations across days, hours, minutes, and seconds."
  quickAnswer: "Adding 2h 45m and 1h 30m yields 4h 15m (15,300 seconds). Subtracting 2h 35m from 5h 10m yields 2h 35m (9,300 seconds). 2h 15m converts to 8,100 seconds."
  formulaSummary: "Sexagesimal arithmetic: convert both times to total seconds via S = H×3600 + M×60 + S, perform the add/subtract, then convert back via H = trunc(S/3600), M = trunc((S mod 3600)/60), S = S mod 60"
  whenToUse: "Use this tool to add work timesheet hours, track workout durations, compute flight connection times, or convert seconds to hours."
  whoShouldUse: "Employees, freelancers, project managers, athletes, pilots, and video editors."
  limitations: "Calculates elapsed time durations, not clock-of-day positions."
  keyTakeaways:
    - "Supports two modes: Time Math (addition/subtraction of hours, minutes, seconds) and Unit Converter (days, hours, minutes, seconds)."
    - "Uses sexagesimal (base-60) arithmetic, carrying 60 seconds into 1 minute and 60 minutes into 1 hour, exactly like manual clock math."
    - "Distinguishes elapsed time duration (such as 3 hours) from a specific time of day (such as 3:00 PM) — this calculator handles durations only."
peopleAlsoAsk:
  - "How do you add hours, minutes, and seconds with carrying?"
  - "How do you subtract time durations with borrowing?"
  - "What is the difference between time of day and a time duration?"
  - "How many seconds are in an hour or a day?"
examples:
  - title: "Time Duration Addition (2h 45m 0s + 1h 30m 0s)"
    inputs: "Mode = Time Math, Op = Add, Time 1 = 2h 45m 0s, Time 2 = 1h 30m 0s"
    calculation: "Total seconds: T1 = 2×3600 + 45×60 = 9900s; T2 = 1×3600 + 30×60 = 5400s. Sum = 9900 + 5400 = 15300s. H = trunc(15300/3600) = 4h. Remaining = 900s. M = trunc(900/60) = 15m. S = 0s."
    result: "Result Duration = 4h 15m 0s | Total Seconds = 15,300 seconds"
  - title: "Time Duration Subtraction with Borrowing (5h 10m 0s - 2h 35m 0s)"
    inputs: "Mode = Time Math, Op = Subtract, Time 1 = 5h 10m 0s, Time 2 = 2h 35m 0s"
    calculation: "T1 = 5×3600 + 10×60 = 18600s; T2 = 2×3600 + 35×60 = 9300s. Difference = 18600 - 9300 = 9300s. H = trunc(9300/3600) = 2h. Remaining = 2100s. M = 35m. S = 0s."
    result: "Result Duration = 2h 35m 0s | Total Seconds = 9,300 seconds"
  - title: "Time Unit Conversion (2h 15m)"
    inputs: "Mode = Unit Converter, Duration = 2.25, Unit = Hours (or 135 minutes)"
    calculation: "2h 15m = 2.25 hours × 3600 = 8100 seconds. Days = 8100 / 86400 = 0.09375 days. Minutes = 8100 / 60 = 135 minutes."
    result: "Seconds = 8,100 | Minutes = 135 | Hours = 2.25 | Days = 0.09375"
faqs:
  - q: "How do you add hours and minutes?"
    a: "Add the seconds together first, carrying 60 seconds into 1 minute if the sum reaches or exceeds 60. Then add the minutes together, carrying 60 minutes into 1 hour the same way. Finally add the hours together."
  - q: "How do you subtract time durations with borrowing?"
    a: "If the top minutes value is smaller than the bottom minutes value (for example, 10 minutes minus 35 minutes), borrow 1 hour from the hours column and add 60 minutes to the minutes column, turning 10 into 70. Then subtract normally: 70 − 35 = 35 minutes."
  - q: "What is the difference between time of day and duration?"
    a: "Time of day refers to a specific position on a clock, such as 3:00 PM. Duration refers to an elapsed span of time, such as 3 hours of working or driving. This calculator works with durations, not clock positions."
  - q: "How many seconds are in an hour and in a day?"
    a: "One hour contains 3,600 seconds (60 minutes × 60 seconds). One standard day of 24 hours contains 86,400 seconds (24 × 3,600)."
references:
  - "https://www.mathsisfun.com/time.html"
formulaDescription: "To avoid the complexity of manually carrying and borrowing across hours, minutes, and seconds, the calculator converts each input duration into a single total-seconds value, performs the requested addition or subtraction on that plain number, and then converts the result back into hours, minutes, and seconds by successive integer division and remainder operations. This sidesteps sexagesimal carrying and borrowing entirely by doing all the arithmetic in one consistent unit first."
variablesExplained:
  - name: "H, M, S"
    description: "The hours, minutes, and seconds components of a time duration, each entered or displayed separately."
  - name: "Total Seconds"
    description: "The single combined value equal to H×3600 + M×60 + S, used internally to perform addition and subtraction without manual carrying or borrowing."
stepByStep: "Choose Time Math mode to add or subtract two durations entered as hours, minutes, and seconds, or choose Unit Converter mode to convert a single duration value between seconds, minutes, hours, and days. Enter the required values and view the result."
realWorldUses: "People use this to total up timesheet hours across multiple shifts, add together interval or lap times for workouts, calculate layover and connection buffer times for travel, and convert between duration units like seconds and hours for video editing or scheduling."
commonMistakes:
  - "Adding hours, minutes, and seconds using plain decimal arithmetic — 45 minutes plus 30 minutes is not 75 minutes in clock notation, it's 1 hour and 15 minutes, since minutes and seconds carry over in base 60, not base 10."
  - "Confusing a time duration with a time of day — a result like '4h 15m' represents an elapsed span, not a specific clock time such as 4:15 PM, and mixing the two up leads to incorrect scheduling."
---

# Time Calculator – Duration Math & Sexagesimal Guide

Working with time arithmetic requires a sexagesimal (base-60) system rather than standard base-10 decimals. Because 1 minute contains 60 seconds and 1 hour contains 60 minutes, standard decimal addition and subtraction rules cannot be applied directly to hours and minutes — adding 45 minutes and 30 minutes does not equal 75 minutes in time formatting, it equals 1 hour and 15 minutes. This calculator supports two modes: **Time Math** adds and subtracts time durations with sexagesimal carrying and borrowing, and **Unit Converter** converts time spans across days, hours, minutes, and seconds.

## Duration vs. Time-of-Day

**Time-of-day** identifies a specific moment on a clock, such as 3:00 PM. **Duration (elapsed time)** measures a quantity of time spent on an activity, such as working for 3 hours and 15 minutes. This calculator operates on time durations.

## How Sexagesimal Carrying and Borrowing Work

**Carrying (addition)**: when adding two durations, whenever seconds or minutes reach or exceed 60, subtract 60 from that unit and carry +1 into the next higher time unit (seconds into minutes, minutes into hours).

**Borrowing (subtraction)**: when subtracting two durations, if a top number is smaller than a bottom number (for example, 10 minutes − 35 minutes), borrow 1 hour from the hours column, add 60 minutes to the minutes column ($10 + 60 = 70$ minutes), then subtract normally: $70 - 35 = 35$ minutes.

**Total-seconds conversion (used by the calculator)**: to eliminate carrying and borrowing errors entirely, the calculator converts durations into total seconds first:

$$\text{Total Seconds} = (H \times 3600) + (M \times 60) + S$$

After performing addition or subtraction on total seconds, it converts back:

$$H = \left\lfloor \frac{\text{Secs}}{3600} \right\rfloor \qquad M = \left\lfloor \frac{\text{Secs} \bmod 3600}{60} \right\rfloor \qquad S = \text{Secs} \bmod 60$$

## Worked Examples

### Example 1: Addition (2h 45m 0s + 1h 30m 0s)

1. Convert to seconds: $T_1 = (2 \times 3600) + (45 \times 60) = 9{,}900$ seconds; $T_2 = (1 \times 3600) + (30 \times 60) = 5{,}400$ seconds.
2. Add: $9{,}900 + 5{,}400 = 15{,}300$ seconds.
3. Convert back: $H = \lfloor 15300/3600 \rfloor = 4$ hours (uses 14,400s, leaving 900s); $M = \lfloor 900/60 \rfloor = 15$ minutes; $S = 0$ seconds.
4. **Result: 4h 15m 0s** (15,300 seconds).

### Example 2: Subtraction with Borrowing (5h 10m 0s − 2h 35m 0s)

1. Convert to seconds: $T_1 = (5 \times 3600) + (10 \times 60) = 18{,}600$ seconds; $T_2 = (2 \times 3600) + (35 \times 60) = 9{,}300$ seconds.
2. Subtract: $18{,}600 - 9{,}300 = 9{,}300$ seconds.
3. Convert back: $H = \lfloor 9300/3600 \rfloor = 2$ hours (uses 7,200s, leaving 2,100s); $M = \lfloor 2100/60 \rfloor = 35$ minutes; $S = 0$ seconds.
4. **Result: 2h 35m 0s** (9,300 seconds).

### Example 3: Unit Conversion (2 hours 15 minutes = 2.25 hours)

Seconds: $2.25 \times 3600 = 8{,}100$. Minutes: $8100 \div 60 = 135$. Hours: $2.25$. Days: $8100 \div 86400 = 0.09375$.

## Real-World Applications

- **Workplace timesheet tracking**: adding daily work shift logs, such as 7h 45m + 8h 30m.
- **Workout and athletic durations**: adding interval lap times or running durations.
- **Travel and flight schedules**: calculating layovers and connection buffer times.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator works with elapsed time durations only, not clock-of-day arithmetic (such as adding 2 hours to 11:00 PM to find the resulting clock time), and it does not account for time zone conversions.

To calculate a specific date and time interval instead of a plain duration, see the [Date Calculator](/calculators/date-calculator/).
