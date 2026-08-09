---
title: "Number of Days Calculator – Count Days Between Two Dates"
seoTitle: "Number of Days Between Two Dates Calculator | CalculationDesk"
metaDescription: "Enter a start and end date to calculate the total number of calendar days, business days, and weeks between them."
category: "time-date"
subcategory: "date-calculators"
tags: ["number of days calculator", "days between two dates", "how many days between dates", "business days calculator"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator counts the total number of calendar days, business days, and weeks between a start and end date, with an option to include or exclude the starting day."
  quickAnswer: "From Monday, June 1, 2026 to Monday, June 15, 2026, there are 14 calendar days between the dates by default (15 if the starting day is included), with 10 business days and 2 full weeks."
  formulaSummary: "Total days = End date - Start date (in days), +1 if 'include starting day' is checked. Business days = count of Monday-Friday dates in the range. Weeks = floor(total days / 7)."
  whenToUse: "Use it to count exact days for contracts, project timelines, billing periods, or any span where you need both a calendar-day and business-day total."
  whoShouldUse: "Anyone who needs a precise day count between two dates, including for scheduling, billing, or legal deadline purposes."
  limitations: "The business-day count treats Saturday and Sunday as non-working days and does not exclude public holidays, so it will overcount actual working days in periods that include holidays."
  keyTakeaways:
    - "By default, the day count excludes the starting day (standard date-subtraction behavior) — checking 'include starting day' adds one extra day to account for counting both endpoints."
    - "The business-day count only excludes weekends; it does not know about public holidays, so an actual work schedule with holidays in the range will have fewer working days than this figure shows."
    - "The calculator works with dates in either order — entering the later date first and the earlier date second still produces a correct, positive day count."
peopleAlsoAsk:
  - "Why does the day count change when I check 'include starting day'?"
  - "Does the business-day count account for public holidays?"
  - "Can I calculate days between a future date and a past date?"
  - "How is the week count calculated?"
examples:
  - title: "June 1, 2026 to June 15, 2026"
    inputs: "Start date = June 1, 2026 (Monday), End date = June 15, 2026 (Monday), Include starting day = No"
    calculation: "Total days = June 15 - June 1 = 14 days. Business days (weekdays only, excluding the start day) = 10 days. Weeks = floor(14/7) = 2 weeks"
    result: "14 total days, 10 business days, 2 weeks (15 total days if 'include starting day' is checked)"
faqs:
  - q: "Why does the day count change when I check 'include starting day'?"
    a: "Standard date subtraction counts the number of days that have elapsed between two dates, which naturally excludes the starting day itself — the same way 'June 1 to June 15' spans 14 nights. Checking 'include starting day' adds one extra day to the total, which is useful when you need to count both endpoints as full days, such as counting the total number of days a rental or booking covers."
  - q: "Does the business-day count account for public holidays?"
    a: "No — the business-day figure counts only Monday through Friday dates in the range and does not exclude any public holidays that might fall within it. If your actual use case needs holiday-adjusted working days (like calculating a legal deadline that excludes federal holidays), you'll need to manually subtract any holidays that fall within the range from this figure."
  - q: "Can I calculate days between a future date and a past date?"
    a: "Yes — the calculator automatically sorts whichever two dates you enter into chronological order before calculating, so it doesn't matter which date you type into the 'start' field versus the 'end' field. The result will always be a positive day count regardless of the order you enter them in."
  - q: "How is the week count calculated?"
    a: "The week count takes the total day count and divides it by 7, rounding down to the nearest complete week — so a 14-day span shows as exactly 2 weeks, while a 16-day span would still show as 2 weeks (with 2 days left over), since only complete 7-day weeks are counted."
references:
  - "https://www.timeanddate.com/date/durationresult.html"
formulaDescription: "The calculator subtracts the earlier date from the later date to get a base day count, then adds one additional day if 'include starting day' is checked. Separately, it walks through every calendar day in the range and tallies how many fall on a weekday (Monday through Friday) to produce the business-day count, and divides the total day count by 7 (rounded down) for the week count."
variablesExplained:
  - name: "Start date"
    description: "The earlier date in the range you're measuring (the calculator will still work correctly if entered out of order)."
  - name: "End date"
    description: "The later date in the range you're measuring."
  - name: "Include starting day"
    description: "An optional toggle that adds one extra day to the total, for counting both the start and end dates as full days rather than measuring only elapsed time between them."
stepByStep: "Enter a start date and an end date, and optionally check 'include starting day' if you want both endpoints counted. The calculator computes the total calendar days, the number of those days that fall on a weekday, and the equivalent number of complete weeks."
realWorldUses: "This is commonly used to count exact contract or billing periods, calculate project timeline lengths, verify booking or rental durations, or determine the number of working days available before a deadline."
commonMistakes:
  - "Forgetting to check 'include starting day' when the use case actually requires counting both endpoints (like total nights of a hotel stay vs. total days a reservation covers), leading to an off-by-one result."
  - "Treating the business-day count as holiday-adjusted, when it only excludes weekends and will overcount actual available working days in any range that includes a public holiday."
---

# Number of Days Calculator

Enter a start date and an end date, and this calculator counts the total number of calendar days, business days, and weeks between them.

## Formula

**Total days = End date − Start date**, with one extra day added if "include starting day" is checked. **Business days** = count of Monday-through-Friday dates in the range. **Weeks = floor(Total days ÷ 7)**.

From Monday, June 1, 2026 to Monday, June 15, 2026: the default (excluding the start day) gives 14 total days, 10 business days, and 2 complete weeks. Checking "include starting day" brings the total to 15 days.

## Why the day count shifts with "include starting day"

Plain date subtraction measures elapsed time, which naturally excludes the starting day — the same logic behind "June 1 to June 15 is 14 nights." The include-starting-day option adds one day to the total for situations where both endpoints should count as full days, such as figuring the total length of a reservation rather than the time between check-in and check-out.

## What the business-day count does and doesn't include

The business-day figure counts weekdays (Monday through Friday) only — it has no awareness of public holidays, so it will overstate actual available working days for any range that includes one. If you need a holiday-adjusted figure for something like a legal filing deadline, subtract any holidays in the range manually.

## Date order doesn't matter

Enter the two dates in either order — the calculator automatically sorts them chronologically before calculating, so the result is always a correct, positive day count regardless of which field the earlier or later date was typed into.
