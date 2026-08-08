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
  - "Time Calculator - Add, Subtract & Convert Hours, Minutes, Seconds | CalculationDesk"
aiSummary:
  definition: "The Time Calculator performs arithmetic operations (addition and subtraction) on time durations (hours, minutes, seconds) with carrying and borrowing, and converts durations across days, hours, minutes, and seconds."
  quickAnswer: "Adding 2h 45m and 1h 30m yields 4h 15m (15,300 seconds). Subtracting 2h 35m from 5h 10m yields 2h 35m (9,300 seconds). 2h 15m converts to 8,100 seconds."
  formulaSummary: "Sexagesimal arithmetic: Convert both times to total seconds S = H×3600 + M×60 + S. Perform add/subtract. Convert back: H = trunc(S/3600), M = trunc((S%3600)/60), S = S%60"
  whenToUse: "Use this tool to add work timesheet hours, track workout durations, compute flight connection times, or convert seconds to hours."
  whoShouldUse: "Employees, freelancers, project managers, athletes, pilots, and video editors."
  limitations: "Calculates time durations (elapsed time), not time-of-day clock positions."
  keyTakeaways:
    - "Supports 2 modes: Time Math (addition/subtraction of H:M:S) and Unit Converter (days, hours, minutes, seconds)."
    - "Uses sexagesimal (base-60) arithmetic: carries 60 seconds into 1 minute and 60 minutes into 1 hour."
    - "Differentiates between elapsed time duration (e.g. 3 hours) and clock time of day (e.g. 3:00 PM)."
    - "Displays duration results in formatted hours/minutes/seconds and total seconds equivalent."
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
    a: "Add seconds together first (carry 60 seconds as 1 minute), add minutes together (carry 60 minutes as 1 hour), and add hours together."
  - q: "What is the difference between time of day and duration?"
    a: "Time of day refers to a specific position on a clock (e.g. 3:00 PM). Duration refers to an elapsed span of time (e.g. 3 hours of working or driving)."
  - q: "How many seconds are in an hour and in a day?"
    a: "One hour contains 3,600 seconds (60 minutes × 60 seconds). One standard day (24 hours) contains 86,400 seconds (24 × 3,600)."
references:
  - "https://www.mathsisfun.com/time.html"
---

# Time Calculator – Duration Math & Sexagesimal Guide

Working with time arithmetic requires using a **sexagesimal (base-60)** system rather than standard base-10 decimals. Because 1 minute contains $60$ seconds and 1 hour contains $60$ minutes, standard decimal addition and subtraction rules cannot be applied directly to hours and minutes.

For example, adding $45\text{ minutes}$ and $30\text{ minutes}$ does not equal $75\text{ minutes}$ in time formatting—it equals **1 hour and 15 minutes**.

This calculator supports **2 modes**:
1. **Time Math Mode**: Adds and subtracts time durations (Hours, Minutes, Seconds) with sexagesimal carrying and borrowing.
2. **Unit Converter Mode**: Converts time spans across Days, Hours, Minutes, and Seconds.

---

### Duration vs. Time-of-Day

* **Time-of-Day**: Identifies a specific moment on a clock (e.g., $3:00\text{ PM}$).
* **Duration (Elapsed Time)**: Measures a quantity of time spent on an activity (e.g., working for $3\text{ hours}$ and $15\text{ minutes}$).

*This calculator operates on **time durations**.*

---

### How Sexagesimal Carrying and Borrowing Work

#### 1. Carrying (Addition)
When adding two durations, whenever seconds or minutes reach or exceed $60$:
- Subtract $60$ from that unit.
- Carry $+1$ into the next higher time unit (seconds $\to$ minutes, minutes $\to$ hours).

#### 2. Borrowing (Subtraction)
When subtracting two durations, if a top number is smaller than a bottom number (e.g., $10\text{ minutes} - 35\text{ minutes}$):
- Borrow $1\text{ hour}$ from the hours column.
- Add $+60\text{ minutes}$ to the minutes column ($10 + 60 = 70\text{ minutes}$).
- Now subtract: $70 - 35 = 35\text{ minutes}$.

#### 3. Total Seconds Conversion (Used by the Calculator)
To eliminate calculation errors, the calculator converts durations into total seconds:
$$\text{Total Seconds} = (H \times 3600) + (M \times 60) + S$$
After performing addition or subtraction on total seconds, it converts back:
$$H = \text{trunc}\left(\frac{\text{Secs}}{3600}\right), \quad M = \text{trunc}\left(\frac{\text{Secs} \pmod{3600}}{60}\right), \quad S = \text{Secs} \pmod{60}$$

---

### Step-by-Step Worked Numerical Examples (Verified against Code)

#### Example 1: Addition ($2\text{h } 45\text{m } 0\text{s} + 1\text{h } 30\text{m } 0\text{s}$)
1. **Convert to Seconds**:
   - $T_1 = (2 \times 3600) + (45 \times 60) = 7200 + 2700 = 9,900\text{ seconds}$.
   - $T_2 = (1 \times 3600) + (30 \times 60) = 3600 + 1800 = 5,400\text{ seconds}$.
2. **Add Total Seconds**:
   $$\text{Total} = 9900 + 5400 = \mathbf{15,300\text{ seconds}}$$
3. **Convert Back to H:M:S**:
   - $H = \text{trunc}(15300 / 3600) = \mathbf{4\text{ hours}}$ (uses $14,400\text{s}$, leaving $900\text{s}$).
   - $M = \text{trunc}(900 / 60) = \mathbf{15\text{ minutes}}$.
   - $S = \mathbf{0\text{ seconds}}$.
4. **Result**: **4h 15m 0s** ($15,300\text{ seconds}$).

#### Example 2: Subtraction with Borrowing ($5\text{h } 10\text{m } 0\text{s} - 2\text{h } 35\text{m } 0\text{s}$)
1. **Convert to Seconds**:
   - $T_1 = (5 \times 3600) + (10 \times 60) = 18000 + 600 = 18,600\text{ seconds}$.
   - $T_2 = (2 \times 3600) + (35 \times 60) = 7200 + 2100 = 9,300\text{ seconds}$.
2. **Subtract Total Seconds**:
   $$\text{Difference} = 18600 - 9300 = \mathbf{9,300\text{ seconds}}$$
3. **Convert Back to H:M:S**:
   - $H = \text{trunc}(9300 / 3600) = \mathbf{2\text{ hours}}$ (uses $7,200\text{s}$, leaving $2100\text{s}$).
   - $M = \text{trunc}(2100 / 60) = \mathbf{35\text{ minutes}}$.
   - $S = \mathbf{0\text{ seconds}}$.
4. **Result**: **2h 35m 0s** ($9,300\text{ seconds}$).

#### Example 3: Unit Conversion ($2\text{ hours } 15\text{ minutes} = 2.25\text{ hours}$)
- **Seconds**: $2.25 \times 3600 = \mathbf{8,100\text{ seconds}}$.
- **Minutes**: $8100 / 60 = \mathbf{135\text{ minutes}}$.
- **Hours**: $\mathbf{2.25\text{ hours}}$.
- **Days**: $8100 / 86400 = \mathbf{0.09375\text{ days}}$.

---

### Real-World Applications

* **Workplace Timesheet Tracking**: Adding daily work shift logs (e.g. 7h 45m + 8h 30m).
* **Workout & Athletic Durations**: Adding interval lap times or running durations.
* **Travel & Flight Schedules**: Calculating layovers and connection buffer times.

---

### Frequently Asked Questions (FAQ)

* **Q1: How do you add hours and minutes?**
  * A1: Add seconds together first (carry 60 seconds as 1 minute), add minutes together (carry 60 minutes as 1 hour), and add hours together.
* **Q2: What is the difference between time of day and duration?**
  * A2: Time of day refers to a specific position on a clock (e.g. 3:00 PM). Duration refers to an elapsed span of time (e.g. 3 hours of working or driving).
* **Q3: How many seconds are in an hour and in a day?**
  * A3: One hour contains 3,600 seconds (60 minutes × 60 seconds). One standard day (24 hours) contains 86,400 seconds (24 × 3,600).
