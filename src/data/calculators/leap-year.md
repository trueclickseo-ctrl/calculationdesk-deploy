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
  - "Leap Year Calculator - Check If a Year Is a Leap Year | CalculationDesk"
aiSummary:
  definition: "The Leap Year Calculator checks whether any year in the Gregorian calendar is a leap year (containing 366 days with February 29) or a common year (365 days) based on three divisibility rules."
  quickAnswer: "2024 and 2028 are leap years (divisible by 4, not a century year). 1900 was a common year (divisible by 100 but not 400). 2000 was a leap year (divisible by 400)."
  formulaSummary: "IsLeap = (Year % 4 == 0 AND Year % 100 != 0) OR (Year % 400 == 0)"
  whenToUse: "Use this tool to check calendar dates, calculate exact ages, plan long-term schedules, manage contract durations, or write date-parsing code."
  whoShouldUse: "Students, teachers, developers, HR managers, event planners, and genealogists."
  limitations: "Applies standard Gregorian calendar leap year rules to any entered year."
  keyTakeaways:
    - "Explains why leap years exist to synchronize our calendar with Earth's solar orbit."
    - "Details the complete 3-part Gregorian rule: divisible by 4, except century years (divisible by 100) unless also divisible by 400."
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
    calculation: "2024 % 4 = 0 (divisible by 4). 2024 % 100 = 24 (not a century year), so the century exception does not apply. Result: Leap Year (366 days)."
    result: "2024 is a Leap Year (366 days)."
  - title: "Century Exception Year (1900)"
    inputs: "Year = 1900"
    calculation: "1900 % 4 = 0 and 1900 % 100 = 0 (a century year, triggering the exception check). 1900 % 400 = 300, not 0, so the 400-year exception does not restore leap status. Result: Common Year (365 days)."
    result: "1900 is a common year (365 days)."
  - title: "400-Year Exception (2000)"
    inputs: "Year = 2000"
    calculation: "2000 % 4 = 0 and 2000 % 100 = 0 (a century year). 2000 % 400 = 0, so the 400-year exception restores leap status. Result: Leap Year (366 days)."
    result: "2000 is a Leap Year (366 days)."
faqs:
  - q: "Why do we need leap years?"
    a: "Earth takes approximately 365.2422 days to complete one full orbit around the Sun. Adding an extra day every 4 years prevents our calendar from drifting out of sync with natural solar seasons."
  - q: "Why was 1900 not a leap year, but 2000 was?"
    a: "1900 was a century year (divisible by 100) but not divisible by 400, so it skipped leap year status. 2000 was divisible by 400, making it a leap year under Gregorian rules."
  - q: "When do people born on February 29 celebrate non-leap year birthdays?"
    a: "Most legal jurisdictions and individuals recognize February 28 or March 1 as the official birth anniversary in non-leap years."
  - q: "Is every year divisible by 4 a leap year?"
    a: "No. Most years divisible by 4 are leap years, but century years (divisible by 100) are the exception — they are only leap years if they're also divisible by 400. This is why 1900 and 2100 are common years, while 1600 and 2000 are leap years."
references:
  - "https://www.timeanddate.com/date/leapyear.html"
formulaDescription: "The calculator applies the three-part Gregorian leap year rule in sequence: a year is a leap year if it is evenly divisible by 4, unless it is also evenly divisible by 100 (a century year), in which case it is a leap year only if it is additionally evenly divisible by 400."
variablesExplained:
  - name: "Year"
    description: "The four-digit calendar year entered by the user, checked against the Gregorian leap year rule."
  - name: "Base Rule (divisible by 4)"
    description: "The first test — most leap years are simply years evenly divisible by 4, occurring roughly every fourth year."
  - name: "Century Exception (divisible by 100 and 400)"
    description: "Century years (divisible by 100) skip leap year status unless they are also divisible by 400 — this refinement corrects for the fact that Earth's orbit is slightly less than 365.25 days, preventing the calendar from drifting."
stepByStep: "Type any year into the input box and click Check Year. The calculator tests whether the year is evenly divisible by 4; if not, it's a 365-day common year. If it is divisible by 4, the calculator checks whether it's also a century year (divisible by 100) — if not, it's a 366-day leap year. If it is a century year, the calculator makes one final check: divisibility by 400 restores leap year status, while any other century year remains a common year."
realWorldUses: "Leap year logic is essential for date-parsing code in software (invalid dates like 2025-02-29 must be rejected), financial and legal contracts that specify per-day interest calculations differently for 365- versus 366-day years, and any long-range scheduling or age calculation that spans a February 29."
commonMistakes:
  - "Assuming every year divisible by 4 is a leap year — century years like 1900 and 2100 break this pattern unless they're also divisible by 400, which is why they remain common years despite being divisible by 4."
  - "Forgetting the century exception's own exception — 2000 looks like it should follow the same rule as 1900 (both divisible by 100), but 2000 is also divisible by 400, which overrides the century exception and makes it a leap year."
---

# Leap Year Calculator – Check Any Year & Learn Gregorian Rules

Every four years, our calendar gains an extra day: February 29. We call these 366-day years leap years. While most people know the simple rule — "every year divisible by 4 is a leap year" — that is only part of the story. If every fourth year were a leap year without exception, our calendar would gain about 3 extra days every 400 years, gradually throwing solar seasons out of alignment with our months. This calculator instantly tests any year against the complete Gregorian Leap Year Rule and tells you whether it contains 365 or 366 days.

## Why Do Leap Years Exist?

Our calendar year has 365 days. However, Earth's actual orbital period around the Sun (a tropical or solar year) takes about 365.2422 days — roughly 365 days, 5 hours, 48 minutes, and 45 seconds. If we ignored that extra quarter-day (≈0.2422 days) every year, our calendar would drift by about 24 days after just 100 years, and summer weather in the Northern Hemisphere would eventually drift into what the calendar calls winter. By adding one extra day (February 29) periodically, we keep our calendar synchronized with the astronomical seasons.

## The Exact 3-Part Gregorian Leap Year Rule

To keep solar drift to a fraction of a day per millennium, Pope Gregory XIII introduced the Gregorian Calendar Rule in 1582. The rule follows three sequential steps:

$$\text{IsLeap} = (\text{Year} \bmod 4 = 0 \text{ AND } \text{Year} \bmod 100 \neq 0) \text{ OR } (\text{Year} \bmod 400 = 0)$$

**Step 1 (base rule):** is the year evenly divisible by 4? If no, it's a common year (365 days). If yes, continue to step 2.

**Step 2 (century exception):** is the year an end-of-century year (evenly divisible by 100)? If no, it's a leap year (366 days). If yes, continue to step 3.

**Step 3 (400-year exception):** is the year evenly divisible by 400? If no, it's a common year (365 days). If yes, it's a leap year (366 days).

## Worked Examples

### Example 1: Year 2024

Divisible by 4? $2024 / 4 = 506$ — yes. Divisible by 100? No. Result: **Leap Year (366 days)**.

### Example 2: Year 1900

Divisible by 4? $1900 / 4 = 475$ — yes. Divisible by 100? $1900 / 100 = 19$ — yes (a century year). Divisible by 400? $1900 / 400 = 4.75$ — no. Result: **Common Year (365 days)**. 1900 did not have a February 29.

### Example 3: Year 2000

Divisible by 4? $2000 / 4 = 500$ — yes. Divisible by 100? $2000 / 100 = 20$ — yes (a century year). Divisible by 400? $2000 / 400 = 5$ — yes! Result: **Leap Year (366 days)**.

## Practical Applications for Leap Year Calculations

> [!NOTE]
> **Where this matters**: Date-parsing logic in software must account for February 29 to avoid invalid-date crashes (2024-02-29 is valid, but 2025-02-29 is not). Financial and legal contracts that calculate "annual interest per day" must clarify whether a 365- or 366-day divisor applies. Calculating the span between February 20 and March 5 also depends on whether February had 28 or 29 days that year.

## How to Use the Calculator

Type any year number into the Year input box and click Check Year to see whether it is a 366-day leap year or a 365-day common year.

## Frequently Asked Questions

### Why do we need leap years?

Earth takes approximately 365.2422 days to complete one full orbit around the Sun. Adding an extra day every 4 years prevents our calendar from drifting out of sync with natural solar seasons.

### Why was 1900 not a leap year, but 2000 was?

1900 was a century year (divisible by 100) but not divisible by 400, so it skipped leap year status. 2000 was divisible by 400, making it a leap year under Gregorian rules.

### When do people born on February 29 celebrate non-leap year birthdays?

Most legal jurisdictions and individuals recognize February 28 or March 1 as the official birth anniversary in non-leap years.

### Is every year divisible by 4 a leap year?

No. Most years divisible by 4 are leap years, but century years (divisible by 100) are the exception — they are only leap years if they're also divisible by 400. This is why 1900 and 2100 are common years, while 1600 and 2000 are leap years.
