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
  - "Hours Calculator - Calculate Total Hours, Minutes & Earnings | CalculationDesk"
aiSummary:
  definition: "The Hours Calculator computes work shift durations, clock-in/clock-out spans, and break deductions across multiple days, providing total billable time in hours/minutes, decimal hours, and calculated pay earnings."
  quickAnswer: "Clocking in at 08:30 AM and out at 05:00 PM with a 45-minute break yields 7 hours 45 minutes (7.75 decimal hours)."
  formulaSummary: "Work Minutes = (Clock Out - Clock In) - Break Minutes | Decimal Hours = Work Minutes / 60 | Earnings = Decimal Hours * Hourly Rate"
  whenToUse: "Use this calculator to compile weekly payroll timesheets, track freelance client hours, calculate project time, or monitor study schedules."
  whoShouldUse: "Freelancers, employees, payroll managers, small business owners, and students."
  limitations: "Calculates time differences and converts base-60 minutes to base-10 decimal hours."
  keyTakeaways:
    - "Calculates exact shift time between Clock In and Clock Out."
    - "Subtracts unpaid Break Minutes directly from the daily shift."
    - "Converts standard time (7h 45m) into base-10 Decimal Hours (7.75h) for accurate payroll arithmetic."
    - "Multiplies total decimal hours by Hourly Rate to calculate total earnings."
peopleAlsoAsk:
  - "How do you convert minutes to decimal hours for payroll?"
  - "Why does 7 hours 30 minutes equal 7.5 hours and not 7.3 hours?"
  - "How does the calculator handle overnight shifts crossing midnight?"
  - "How are break deductions subtracted from total work time?"
examples:
  - title: "Single Day Shift Worked Example"
    inputs: "Clock In = 08:30, Clock Out = 17:00, Break = 45 mins, Hourly Rate = $25"
    calculation: "Elapsed time: 8.5 hours (510 mins). Subtract 45 mins break -> 465 mins. Standard = 7h 45m. Decimal = 465 / 60 = 7.75h. Earnings = 7.75 * $25 = $193.75."
    result: "Work Time = 7h 45m (7.75 decimal hours) | Earnings = $193.75"
  - title: "Duration Addition Worked Example"
    inputs: "Duration 1 = 2h 45m, Duration 2 = 1h 35m"
    calculation: "Hours: 2 + 1 = 3h. Minutes: 45 + 35 = 80 mins. Since 80 >= 60, carry 1 hour: 3 + 1 = 4h, remaining mins = 80 - 60 = 20 mins."
    result: "Total Duration = 4 hours 20 minutes (4.33 decimal hours)"
faqs:
  - q: "Why is 1 hour 30 minutes written as 1.5 hours in decimal format?"
    a: "Decimal hours operate in base-10, where 30 minutes represents half of a 60-minute hour (30 / 60 = 0.5). Therefore, 1 hour 30 minutes is 1.5 decimal hours."
  - q: "What is the most common mistake when calculating payroll hours?"
    a: "The most common mistake is directly multiplying minutes as if they were decimals (e.g. treating 7 hours 45 minutes as 7.45 hours). Multiplying $7.45 \times \$20 = \$149.00$, whereas the true calculation is $7.75 \times \$20 = \$155.00$."
  - q: "How does the calculator handle overnight shifts?"
    a: "If Clock Out is earlier than Clock In (e.g., In at 10:00 PM, Out at 06:00 AM), the calculator recognizes that the shift crossed midnight and adds 24 hours (1,440 minutes) to compute total elapsed time."
references:
  - "https://www.timeanddate.com/date/duration.html"
---

# Hours Calculator – Timesheet & Billable Duration Guide

Whether you are a **freelancer** billing client projects, an **employee** filling out weekly timesheets, a **manager** processing payroll, or a **student** tracking study hours, adding and subtracting hours and minutes requires handling **base-60 time arithmetic**.

Simply adding numbers like standard decimals leads to errors because **60 minutes make 1 full hour**, not 100 minutes. Furthermore, payroll systems require converting minutes into **base-10 decimal hours** (e.g. 30 minutes $= 0.5\text{ hours}$).

This calculator provides a dynamic **Timesheet Ledger** to enter daily **Clock In**, **Clock Out**, and **Break Minutes**, automatically outputting total hours/minutes, decimal hours, and calculated **earnings**.

---

### Standard Time (Base-60) vs. Decimal Hours (Base-10)

Understanding the difference between standard hours/minutes and decimal hours is essential for payroll:

* **Standard Time (Base-60)**: Time expressed in hours and minutes (e.g. $7\text{ hours } 45\text{ minutes}$).
* **Decimal Hours (Base-10)**: Time expressed as a single decimal number by dividing minutes by 60 ($\text{Minutes} / 60$).
  - $15\text{ minutes} = 15 / 60 = \mathbf{0.25\text{ hours}}$
  - $30\text{ minutes} = 30 / 60 = \mathbf{0.50\text{ hours}}$
  - $45\text{ minutes} = 45 / 60 = \mathbf{0.75\text{ hours}}$

#### The $7.45$ vs. $7.75$ Payroll Mistake
A very common accounting mistake is entering $7\text{ hours } 45\text{ minutes}$ into a paycheck multiplier as $7.45$:
- **Incorrect**: $7.45 \times \$20/\text{hr} = \mathbf{\$149.00}$ (Underpays the worker!).
- **Correct**: $7.75 \times \$20/\text{hr} = \mathbf{\$155.00}$.

---

### How Hours & Minutes Arithmetic Works

#### 1. Adding Durations Across Hour Boundaries
When adding durations like **2 hours 45 minutes** and **1 hour 35 minutes**:
1. **Sum Hours**: $2 + 1 = 3\text{ hours}$.
2. **Sum Minutes**: $45 + 35 = 80\text{ minutes}$.
3. **Carry Over**: Since $80 \ge 60$, subtract 60 minutes and carry 1 hour to total hours:
   - Hours: $3 + 1 = \mathbf{4\text{ hours}}$.
   - Minutes: $80 - 60 = \mathbf{20\text{ minutes}}$.
4. **Total**: **4 hours 20 minutes** ($4.33\text{ decimal hours}$).

#### 2. Clock-In / Clock-Out Shift Calculation
For a single shift row:
$$\text{Shift Minutes} = (\text{Clock Out Minutes from midnight}) - (\text{Clock In Minutes from midnight})$$
$$\text{Net Work Minutes} = \text{Shift Minutes} - \text{Break Minutes}$$
$$\text{Decimal Hours} = \frac{\text{Net Work Minutes}}{60}$$

---

### Step-by-Step Worked Timesheet Example (Verified against Code)

Let's evaluate a standard work day entry:
- **Clock In**: 08:30 AM (`08:30`)
- **Clock Out**: 05:00 PM (`17:00`)
- **Unpaid Break**: 45 minutes
- **Hourly Rate**: $25.00 / hour

#### Calculation Process
1. **Convert Clock Times to Minutes from Midnight**:
   - Clock In ($08:30$) $= 8 \times 60 + 30 = \mathbf{510\text{ minutes}}$.
   - Clock Out ($17:00$) $= 17 \times 60 + 0 = \mathbf{1,020\text{ minutes}}$.
2. **Calculate Raw Elapsed Time**:
   - $1020 - 510 = \mathbf{510\text{ minutes}}$ ($8\text{ hours } 30\text{ minutes}$).
3. **Deduct Unpaid Break**:
   - $510\text{ mins} - 45\text{ mins break} = \mathbf{465\text{ net work minutes}}$.
4. **Convert to Standard & Decimal Hours**:
   - Standard: $465 / 60 = 7\text{ with } 45\text{ remainder} \implies \mathbf{7\text{h } 45\text{m}}$.
   - Decimal: $465 / 60 = \mathbf{7.75\text{ decimal hours}}$.
5. **Calculate Earnings**:
   - $7.75\text{ hours} \times \$25.00/\text{hr} = \mathbf{\$193.75}$.

---

### Practical Applications

* **Employee Timesheets**: Record daily start times, end times, and lunch breaks.
* **Freelance Billing**: Calculate billable client hours and multiply by project hourly rates.
* **Project & Task Tracking**: Track total development, design, or research time across multiple work sessions.

---

### How to Use the Calculator

1. Enter your daily shift rows (label, **Clock In**, **Clock Out**, and **Break Minutes**).
2. Click **Add Timesheet Row** to include additional days or work sessions.
3. Enter your **Hourly Rate** to calculate gross earnings automatically.
4. View total billable time in standard hours/minutes and decimal format in the summary panel.

---

### Frequently Asked Questions (FAQ)

* **Q1: Why is 1 hour 30 minutes written as 1.5 hours in decimal format?**
  * A1: Decimal hours operate in base-10, where 30 minutes represents half of a 60-minute hour (30 / 60 = 0.5). Therefore, 1 hour 30 minutes is 1.5 decimal hours.
* **Q2: What is the most common mistake when calculating payroll hours?**
  * A2: The most common mistake is directly multiplying minutes as if they were decimals (e.g. treating 7 hours 45 minutes as 7.45 hours). Multiplying $7.45 \times \$20 = \$149.00$, whereas the true calculation is $7.75 \times \$20 = \$155.00$.
* **Q3: How does the calculator handle overnight shifts?**
  * A3: If Clock Out is earlier than Clock In (e.g., In at 10:00 PM, Out at 06:00 AM), the calculator recognizes that the shift crossed midnight and adds 24 hours (1,440 minutes) to compute total elapsed time.
