---
title: "SWP Calculator - Systematic Withdrawal Plan Calculator"
seoTitle: "SWP Calculator - Systematic Withdrawal Plan Balance Calculator | CalculationDesk"
metaDescription: "Project how your mutual fund balance changes over time with a Systematic Withdrawal Plan (SWP), including total withdrawn, interest earned, and whether your balance depletes."
category: "financial"
subcategory: "investment-calculators"
tags: ["swp calculator", "systematic withdrawal plan calculator", "swp balance calculator", "retirement withdrawal calculator"]
priority: "high"
importance: 8
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary systematic withdrawal plan balance and sustainability projection query"
titleVariants:
  - "SWP Calculator - Systematic Withdrawal Plan Balance Calculator | CalculationDesk"
aiSummary:
  definition: "A Systematic Withdrawal Plan (SWP) lets an investor withdraw a fixed amount at regular intervals — usually monthly — from an existing mutual fund investment, while the remaining balance stays invested and continues to earn returns."
  quickAnswer: "Withdrawing $8,000 every month from a $1,000,000 investment earning an expected 8% annual return leaves a remaining balance of approximately $983,400.10 after 1 year (12 withdrawals), having withdrawn $96,000 total while earning $79,400.10 in interest."
  formulaSummary: "Each month: Balance = (PreviousBalance * (1 + i)) - Withdrawal, where i = AnnualRate / 12 / 100. Simulated month by month; if a withdrawal would exceed the remaining balance plus that month's interest, the balance depletes to zero."
  whenToUse: "Use this calculator to check whether a planned monthly withdrawal from an investment is sustainable, or to see how quickly a balance would deplete at a higher withdrawal rate."
  whoShouldUse: "Retirees and anyone drawing a regular income from an investment portfolio while trying to preserve the underlying capital."
  limitations: "Assumes a constant expected annual return and a constant fixed monthly withdrawal amount for the entire tenure. Real investment returns vary month to month and are not guaranteed."
  keyTakeaways:
    - "Each month's interest is credited to the balance before that month's withdrawal is deducted, so the calculation is a running simulation rather than a single formula."
    - "If the withdrawal amount stays below what the investment earns in interest each month, the balance can actually grow over time even while money is being withdrawn."
    - "If the withdrawal rate exceeds the return rate, the balance steadily shrinks and can eventually deplete to zero — the calculator flags the exact month this happens if it occurs within the chosen tenure."
peopleAlsoAsk:
  - "What happens if my SWP withdrawal rate exceeds the return rate?"
  - "Is SWP better than a dividend payout plan?"
  - "How are SWP withdrawals taxed?"
  - "What is considered a safe withdrawal rate for SWP?"
examples:
  - title: "1-Year SWP ($1,000,000 Investment, $8,000/month, 8% p.a.)"
    inputs: "Initial Investment = $1,000,000, Monthly Withdrawal = $8,000, Expected Annual Return = 8%, Tenure = 1 Year (12 Months)"
    calculation: "Monthly rate i = 8/12/100 = 0.006667. Each month, interest is added to the balance, then $8,000 is withdrawn. Running this for 12 months leaves a final balance of $983,400.10."
    result: "Final Balance = $983,400.10 | Total Withdrawn = $96,000.00 | Total Interest Earned = $79,400.10"
  - title: "10-Year SWP with an Unsustainable Withdrawal Rate ($1,000,000 Investment, $15,000/month, 8% p.a.)"
    inputs: "Initial Investment = $1,000,000, Monthly Withdrawal = $15,000, Expected Annual Return = 8%, Tenure = 10 Years"
    calculation: "At $15,000/month against an 8% expected return, withdrawals consistently outpace interest earned, so the balance shrinks every month rather than growing. It reaches zero in month 89, before the full 10-year tenure completes."
    result: "Balance Depletes in Month 89 | Total Withdrawn = $1,326,935.90 | Total Interest Earned = $326,935.90"
faqs:
  - q: "What happens if my SWP withdrawal rate exceeds the return rate?"
    a: "If you withdraw more each month than the investment earns in interest, your principal begins to shrink rather than staying stable or growing. Over time, at a high enough withdrawal rate relative to the return, the balance can run down to zero entirely — this calculator will show the specific month that happens in, if it occurs within your chosen tenure."
  - q: "Is SWP better than a dividend payout plan?"
    a: "An SWP generally offers more predictable cash flow than a dividend payout plan, because dividends depend on the fund's performance and distributable surplus and aren't guaranteed, while an SWP withdrawal is a fixed amount you choose yourself, funded by redeeming units regardless of whether the fund paid a dividend that period."
  - q: "How are SWP withdrawals taxed?"
    a: "Each SWP withdrawal is generally treated as a partial redemption of mutual fund units, meaning only the gains portion of the redeemed units is subject to capital gains tax — the return of your original principal typically isn't taxed again. Exact tax treatment depends on the fund type and holding period, and varies by jurisdiction."
  - q: "What is considered a safe withdrawal rate for SWP?"
    a: "A commonly cited range for a sustainable withdrawal rate is roughly 4% to 6% of the initial capital per year, though the right number depends on your expected returns, time horizon, and risk tolerance. Keeping your annual withdrawal rate at or below your expected long-term return rate is the key principle for helping the balance last, rather than any single fixed percentage."
references:
  - "https://www.sec.gov"
formulaDescription: "The calculator runs a month-by-month simulation rather than applying a single formula: each month, the current balance earns interest at the monthly rate first, and the fixed withdrawal is then subtracted from that grown balance. If a withdrawal would exceed the balance plus that month's interest, the simulation pays out whatever remains and marks the balance as depleted, stopping early rather than going negative."
variablesExplained:
  - name: "Initial Investment"
    description: "The starting lump sum the systematic withdrawal plan draws from."
  - name: "Monthly Withdrawal (W)"
    description: "The fixed amount withdrawn from the investment each month."
  - name: "i (Monthly Rate)"
    description: "The expected annual return rate divided by 12 and by 100, applied to the balance before each month's withdrawal."
stepByStep: "Enter your initial investment, the fixed amount you plan to withdraw each month, an expected annual return rate, and the tenure you want to project. The calculator simulates the balance month by month — adding interest, then subtracting the withdrawal — and reports the final balance, total withdrawn, and total interest earned, flagging the exact month the balance would run out if it does."
realWorldUses: "Retirees and anyone drawing regular income from an investment portfolio use SWP calculators to check whether a planned withdrawal amount is sustainable over their expected time horizon, and to compare how different withdrawal amounts or expected return assumptions change how long the money lasts."
commonMistakes:
  - "Choosing a withdrawal amount based only on the initial balance's size without checking it against the expected return rate, which can lead to withdrawing more than the investment actually earns and unknowingly depleting principal."
  - "Assuming a fixed expected return rate will hold steady every year, when real investment returns vary and a string of weaker years early in the withdrawal period can deplete a balance faster than a simple average-return projection suggests."
---

# SWP Calculator – Systematic Withdrawal Plan Balance Projection

A **Systematic Withdrawal Plan (SWP)** lets you withdraw a fixed amount at regular intervals — typically monthly — from an existing mutual fund investment, while the rest of your capital stays invested and continues earning returns. It's a common approach for retirees who want a predictable monthly income without redeeming their entire investment at once.

This calculator simulates your balance month by month and reports the **Final Balance**, **Total Withdrawn**, and **Total Interest Earned** — flagging the exact month your balance would run out, if it does within your chosen tenure.

## How the SWP Simulation Works

Rather than a single formula, the calculator runs a month-by-month loop: each month, interest is credited to the current balance first, and the fixed withdrawal is then subtracted from that grown balance.

$$B_m = B_{m-1} \times (1 + i) - W$$

Where:
* **$B_m$**: Balance at the end of month $m$.
* **$B_{m-1}$**: Balance at the end of the previous month.
* **i**: Monthly rate of return (annual rate ÷ 12 ÷ 100).
* **W**: Fixed monthly withdrawal amount.

If a withdrawal would exceed the balance plus that month's interest, the simulation pays out whatever remains and stops — the balance can't go negative.

## Worked Example

Investing **$1,000,000**, withdrawing **$8,000 every month**, at an expected **8%** annual return, over **1 year**:

1. Monthly rate: $i = 8 \div 12 \div 100 \approx 0.006667$
2. Month 1: interest = $1{,}000{,}000 \times 0.006667 \approx \$6{,}666.67$; balance before withdrawal $\approx \$1{,}006{,}666.67$; after withdrawing $8,000 → $\approx \$998{,}666.67$
3. Repeating this for all 12 months leaves a final balance of $\approx \$983{,}400.10$
4. Total withdrawn: $8{,}000 \times 12 = \$96{,}000.00$ | Total interest earned: $\approx \$79{,}400.10$

## When Withdrawals Outpace Returns

Withdrawing $8,000/month against an 8% return on $1,000,000 lets the balance shrink only slowly — the withdrawal is close to what the investment earns. Push the withdrawal higher, to $15,000/month on the same $1,000,000 at 8%, and the math flips: withdrawals consistently exceed interest earned, so the balance shrinks every single month. Running that scenario out, the balance reaches zero in **month 89** — a little over 7 years into a planned 10-year tenure — having paid out $1,326,935.90 in total withdrawals against $326,935.90 in interest earned along the way.

> [!NOTE]
> **Sustainability note**: Whether a withdrawal plan lasts indefinitely, shrinks slowly, or depletes quickly comes down to one comparison: your fixed monthly withdrawal versus what the balance actually earns each month. A withdrawal rate close to or below your expected return keeps the balance roughly stable; a withdrawal rate well above it guarantees eventual depletion, only a matter of when.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This projection assumes a constant expected annual return every month, which real investment returns never actually are — a string of weak early months can deplete a balance faster than this average-based simulation suggests. It also doesn't account for capital gains tax on the redeemed portion of each withdrawal or fund expense ratios.

To project how a lump sum grows without any withdrawals, see the [Lumpsum Calculator](/calculators/lumpsum-calculator/).
