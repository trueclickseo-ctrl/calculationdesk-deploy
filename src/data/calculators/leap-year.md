---
title: "Leap Year Calculator - Check Any Year & Learn Gregorian Rules"
seoTitle: "Leap Year Calculator - Check If a Year Is a Leap Year | CalculationDesk"
metaDescription: "Free online Leap Year Calculator. Instantly check if any year is a leap year (366 days) or common year (365 days) with clear Gregorian calendar rules."
category: "date-time"
subcategory: "date-calculators"
tags: ["leap year calculator", "is it a leap year", "gregorian leap year rule", "february 29 leap year", "366 days in leap year"]
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
  - "Leap Year Calculator - Check If a Year Is a Leap Year | CalculationDesk"
aiSummary:
  definition: "The Leap Year Calculator checks whether any year in the Gregorian calendar is a leap year (containing 366 days with February 29) or a common year (365 days) based on three divisibility rules."
  quickAnswer: "2024 and 2028 are leap years (divisible by 4). 1900 was a common year (divisible by 100 but not 400). 2000 was a leap year (divisible by 400)."
  formulaSummary: "IsLeap = (Year % 4 == 0 && Year % 100 != 0) || (Year % 400 == 0)"
  whenToUse: "Use this tool to check calendar dates, calculate exact ages, plan long-term schedules, manage contract durations, or write date-parsing code."
  whoShouldUse: "Students, teachers, developers, HR managers, event planners, and genealogists."
  limitations: "Applies standard Gregorian calendar leap year rules."
  keyTakeaways:
    - "Explains why leap years exist to synchronize our calendar with Earth's solar orbit."
    - "Details the complete 3-part Gregorian rule: divisible by 4, except century years (100) unless also divisible by 400."
    - "Contrasts why 1900 was NOT a leap year while 2000 WAS a leap year."
    - "Explains how February 29 affects day-span calculations and birth anniversaries."
peopleAlsoAsk:
  - "Why do we have leap years every 4 years?"
  - "Why was 1900 not a leap year if it is divisible by 4?"
  - "Why was 2000 a leap year?"
  - "What happens if someone is born on February 29?"
examples:
  - title: "Standard Leap Year (2024)"
    inputs: "Year = 2024"
    calculation: "2024 / 4 = 506 with remainder 0. 2024 / 100 = 20.24 (not a century year). Result: Leap Year (366 days)."
    result: "2024 is a Leap Year (366 days)."
  - title: "Century Exception Year (1900)"
    inputs: "Year = 1900"
    calculation: "1900 is divisible by 4 and 100. Check 400 rule: 1900 / 400 = 4.75 (not divisible by 400). Result: Common Year (365 days)."
    result: "1900 is a common year (365 days)."
  - title: "400-Year Exception (2000)"
    inputs: "Year = 2000"
    calculation: "2000 is divisible by 4, 100, and 400 (2000 / 400 = 5). Result: Leap Year (366 days)."
    result: "2000 is a Leap Year (366 days)."
faqs:
  - q: "Why do we need leap years?"
    a: "Earth takes approximately 365.2422 days to complete one full orbit around the Sun. Adding an extra day every 4 years prevents our calendar from drifting out of sync with natural solar seasons."
  - q: "Why was 1900 not a leap year, but 2000 was?"
    a: "1900 was a century year (divisible by 100) but not divisible by 400, so it skipped leap year status. 2000 was divisible by 400, making it a leap year under Gregorian rules."
  - q: "When do people born on February 29 celebrate non-leap year birthdays?"
    a: "Most legal jurisdictions and individuals recognize February 28 or March 1 as the official birth anniversary in non-leap years."
references:
  - "https://www.timeanddate.com/date/leapyear.html"
---

# Leap Year Calculator – Check Any Year & Learn Gregorian Rules

Every four years, our calendar gains an extra day: **February 29**. We call these 366-day years **leap years**. 

While most people know the simple rule—"every year divisible by 4 is a leap year"—that is only part of the story. If every fourth year were a leap year without exception, our calendar would gain about 3 extra days every 400 years, gradually throwing solar seasons completely out of alignment with our months!

This calculator instantly tests any year against the complete **Gregorian Leap Year Rule** and tells you whether it contains **365 days** or **366 days**.

---

### Why Do Leap Years Exist?

Our calendar year has 365 days. However, Earth's actual orbital period around the Sun (a tropical or solar year) takes about **365.2422 days** (roughly 365 days, 5 hours, 48 minutes, and 45 seconds).

If we ignored that extra quarter-day ($\approx 0.2422\text{ days}$) every year:
- After **100 years**, our calendar would drift by about **24 days**.
- In July in the Northern Hemisphere, summer weather would eventually drift into what the calendar calls winter!

By adding 1 extra day (**February 29**) periodically, we keep our calendar synchronized with the astronomical seasons.

---

### The Exact 3-Part Gregorian Leap Year Rule

To keep solar drift to a fraction of a day per millennium, Pope Gregory XIII introduced the **Gregorian Calendar Rule** in 1582. The rule follows three sequential steps:

1. **Step 1 (Base Rule)**: Is the year evenly divisible by 4?
   - **No** $\implies$ It is a **Common Year (365 days)**.
   - **Yes** $\implies$ Go to Step 2.
2. **Step 2 (Century Exception)**: Is the year an end-of-century year (evenly divisible by 100)?
   - **No** $\implies$ It is a **Leap Year (366 days)**.
   - **Yes** $\implies$ Go to Step 3.
3. **Step 3 (400-Year Exception)**: Is the year evenly divisible by 400?
   - **No** $\implies$ It is a **Common Year (365 days)**.
   - **Yes** $\implies$ It is a **Leap Year (366 days)**.

#### In Code Form:
$$\text{IsLeap} = (\text{Year} \pmod 4 == 0 \text{ AND } \text{Year} \pmod{100} \neq 0) \text{ OR } (\text{Year} \pmod{400} == 0)$$

---

### Real-World Worked Examples

Let's test four famous years using the rule:

#### 1. Year 2024
- Divisible by 4? $2024 / 4 = 506$ (Yes).
- Divisible by 100? No.
- **Result**: **Leap Year (366 days)**.

#### 2. Year 1900
- Divisible by 4? $1900 / 4 = 475$ (Yes).
- Divisible by 100? $1900 / 100 = 19$ (Yes $\implies$ Century Year).
- Divisible by 400? $1900 / 400 = 4.75$ (No).
- **Result**: **Common Year (365 days)**. *(1900 did not have a February 29!)*

#### 3. Year 2000
- Divisible by 4? $2000 / 4 = 500$ (Yes).
- Divisible by 100? $2000 / 100 = 20$ (Yes $\implies$ Century Year).
- Divisible by 400? $2000 / 400 = 5$ (Yes!).
- **Result**: **Leap Year (366 days)**.

#### 4. Year 2028
- Divisible by 4? $2028 / 4 = 507$ (Yes).
- Divisible by 100? No.
- **Result**: **Leap Year (366 days)**.

---

### Practical Applications for Leap Year Calculations

* **Programming & Software Engineering**: Date-parsing logic must account for February 29 to prevent `IndexOutOfBounds` or invalid date crashes (e.g. `2024-02-29` is valid, but `2025-02-29` will crash naive date parsers).
* **Legal Contracts & Interest Calculations**: Financial agreements specifying "annual interest per day" must clarify whether a 365-day or 366-day divisor applies during leap years.
* **Date Spans**: Calculating days between February 20 and March 5 differs depending on whether February has 28 or 29 days.

---

### How to Use the Calculator

1. Type any year number into the **Year** input box.
2. Click **Check Year**.
3. View the instant confirmation indicating whether the year is a 366-day leap year or a 365-day common year.

---

### Frequently Asked Questions (FAQ)

* **Q1: Why do we need leap years?**
  * A1: Earth takes approximately 365.2422 days to complete one full orbit around the Sun. Adding an extra day every 4 years prevents our calendar from drifting out of sync with natural solar seasons.
* **Q2: Why was 1900 not a leap year, but 2000 was?**
  * A2: 1900 was a century year (divisible by 100) but not divisible by 400, so it skipped leap year status. 2000 was divisible by 400, making it a leap year under Gregorian rules.
* **Q3: When do leaplings (people born on Feb 29) celebrate birthdays in non-leap years?**
  * A3: Most legal jurisdictions and individuals recognize February 28 or March 1 as the official birth anniversary during non-leap years.
