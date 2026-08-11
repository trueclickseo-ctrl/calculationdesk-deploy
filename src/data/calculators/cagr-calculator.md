---
title: "CAGR Calculator - Compound Annual Growth Rate Calculator"
seoTitle: "CAGR Calculator - Calculate Compound Annual Growth Rate | CalculationDesk"
metaDescription: "Calculate the Compound Annual Growth Rate (CAGR), absolute return, return multiple, and total profit for an investment held over a set period."
category: "financial"
subcategory: "investment-calculators"
tags: ["cagr calculator", "compound annual growth rate", "cagr formula", "absolute return rate", "investment growth rate"]
priority: "high"
importance: 8
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
  reason: "Primary CAGR compound annual growth rate calculation query"
titleVariants:
  - "CAGR Calculator - Calculate Compound Annual Growth Rate | CalculationDesk"
aiSummary:
  definition: "This calculator computes the Compound Annual Growth Rate (CAGR) — the constant annual rate an investment would need to grow at to go from its starting value to its ending value over a given holding period — along with the absolute return, return multiple, and total profit."
  quickAnswer: "An investment growing from $10,000 to $20,000 over 5 years has a CAGR of 14.87%, a 100.00% absolute return, a 2.00x return multiple, and $10,000 in total profit."
  formulaSummary: "CAGR = ((Final/Initial)^(1/t) - 1) * 100 | Absolute Return = ((Final-Initial)/Initial) * 100 | Multiple = Final/Initial"
  whenToUse: "Use CAGR to compare the annualized performance of investments held for different lengths of time — a stock held 3 years and a property held 10 years can be compared fairly using CAGR, unlike raw absolute return."
  whoShouldUse: "Investors, portfolio managers, and business owners comparing the annualized growth rate of assets held over different time periods."
  limitations: "CAGR smooths the entire holding period into a single constant rate and completely ignores interim volatility — an investment that fell sharply mid-period and later recovered can show the same CAGR as one that grew steadily the whole time."
  keyTakeaways:
    - "CAGR and absolute return answer different questions — absolute return says how much total gain occurred with no regard to time, while CAGR says what constant annual rate would have produced that same total gain, which is why CAGR is the right metric for comparing investments held over different periods."
    - "CAGR is a geometric average connecting only the starting and ending values in a smooth curve — it says nothing about what happened in between, so two investments with identical CAGR can have had completely different, even opposite, paths of gains and losses along the way."
    - "Doubling an investment's value produces a very different CAGR depending on how long it took — doubling in 2 years is a 41.4% CAGR, while doubling in 20 years is only about 3.5%, even though the absolute return (100%) is identical in both cases."
peopleAlsoAsk:
  - "What is the formula for calculating CAGR?"
  - "How does CAGR differ from Absolute Return?"
  - "Why is CAGR preferred over a simple average of annual returns?"
  - "Can CAGR be negative?"
examples:
  - title: "$10,000 Growing to $20,000 Over 5 Years"
    inputs: "Initial Value = $10,000, Final Value = $20,000, Holding Period = 5 Years"
    calculation: "CAGR = (20,000 / 10,000)^(1/5) - 1 = 2^0.2 - 1 = 1.148698 - 1 = 0.148698, or 14.87%. Absolute Return = (20,000 - 10,000) / 10,000 × 100 = 100.00%. Return Multiple = 20,000 / 10,000 = 2.00x. Total Profit = 20,000 - 10,000 = $10,000."
    result: "CAGR = 14.87% | Absolute Return = 100.00% | Return Multiple = 2.00x | Total Profit = $10,000"
  - title: "Same 100% Absolute Return, but Over 20 Years Instead of 5"
    inputs: "Initial Value = $10,000, Final Value = $20,000, Holding Period = 20 Years"
    calculation: "CAGR = (20,000 / 10,000)^(1/20) - 1 = 2^0.05 - 1 ≈ 0.035265, or about 3.53% — dramatically lower than the 5-year scenario's 14.87%, even though the absolute return (100%) and total profit ($10,000) are identical in both cases."
    result: "CAGR ≈ 3.53% | Absolute Return = 100.00% | Return Multiple = 2.00x | Total Profit = $10,000"
faqs:
  - q: "What is the formula for calculating CAGR?"
    a: "CAGR = ((Final Value ÷ Initial Value)^(1 ÷ t) − 1) × 100, where t is the holding period in years. This finds the single constant annual growth rate that, compounded over t years, would take the initial value to the final value."
  - q: "How does CAGR differ from Absolute Return?"
    a: "Absolute Return measures total percentage gain with no regard to how long it took — doubling your money is a 100% absolute return whether it happens in 2 years or 20. CAGR incorporates the holding period, so it shows that doubling in 2 years reflects a much faster annual growth rate (about 41.4%) than doubling in 20 years (about 3.5%)."
  - q: "Why is CAGR preferred over a simple average of annual returns?"
    a: "A simple arithmetic average of yearly returns can be misleading because of compounding — if an investment loses 50% in year one and gains 50% in year two, the arithmetic average is 0%, but the actual money went from 100 to 50 to 75, a real 25% loss. CAGR correctly reflects this as a negative compound annual return rather than a flat 0%."
  - q: "Can CAGR be negative?"
    a: "Yes. If the final value is lower than the initial value, the formula produces a negative CAGR, reflecting a compound annual loss over the holding period rather than a gain."
references:
  - "https://en.wikipedia.org/wiki/Compound_annual_growth_rate"
formulaDescription: "CAGR treats the entire holding period as if growth had happened at one constant compounding rate, ignoring whatever path the value actually took along the way. It's found by taking the ratio of final value to initial value, raising that ratio to the power of one divided by the number of years (which is mathematically the same as taking the t-th root), and subtracting 1 — the result is the single annual rate that, compounded for t years, produces the same overall change in value."
variablesExplained:
  - name: "Initial Value, Final Value"
    description: "The investment's starting and ending values over the period being measured."
  - name: "t (Holding Period)"
    description: "The number of years between the initial and final values."
  - name: "Absolute Return vs. CAGR"
    description: "Absolute Return is the raw total percentage gain with no time adjustment; CAGR is that same overall change expressed as a constant annualized rate."
stepByStep: "Enter the investment's initial value, final value, and the holding period in years. The calculator computes the CAGR (the constant annualized growth rate implied by the change), the absolute return (the raw total percentage gain), the return multiple, and the total profit in currency terms."
realWorldUses: "Investors use CAGR to compare the annualized performance of assets held for different lengths of time — for example, comparing a stock held for 3 years against a rental property held for 10 years — and to communicate investment performance in a standardized, time-adjusted way."
commonMistakes:
  - "Comparing two investments' CAGR without checking that the underlying paths were reasonably similar — CAGR is a smoothed average that can mask very different volatility profiles behind an identical headline number."
  - "Confusing CAGR with a typical or average year's return — CAGR is a geometric, not arithmetic, average, and a volatile investment's actual year-to-year returns rarely match its CAGR in any individual year."
---

# CAGR Calculator – Compound Annual Growth Rate Guide

The Compound Annual Growth Rate (CAGR) is one of the most widely used metrics for comparing investment performance, because it expresses growth as a single, time-adjusted annual rate rather than a raw total gain. This calculator computes **CAGR, absolute return, return multiple, and total profit**.

## The CAGR Formula

$$\text{CAGR} = \left(\frac{\text{Final Value}}{\text{Initial Value}}\right)^{\frac{1}{t}} - 1$$

Multiply the result by 100 to express it as a percentage. Compare this against the simpler **absolute return**, which ignores time entirely:

$$\text{Absolute Return} = \frac{\text{Final Value} - \text{Initial Value}}{\text{Initial Value}} \times 100$$

## Worked Example

An investment growing from **$10,000** to **$20,000** over **5 years**:

1. CAGR: $\left(\dfrac{20{,}000}{10{,}000}\right)^{1/5} - 1 = 2^{0.2} - 1 \approx 0.148698$, or **14.87%**
2. Absolute return: $\dfrac{20{,}000 - 10{,}000}{10{,}000} \times 100 = 100.00\%$
3. Return multiple: $\dfrac{20{,}000}{10{,}000} = 2.00\text{x}$
4. Total profit: $\$20{,}000 - \$10{,}000 = \$10{,}000$

## Why Time Matters So Much

The same 100% absolute return produces a very different CAGR depending on how long it took to achieve:

| Holding Period | Absolute Return | CAGR |
|---|---|---|
| 2 years | 100.00% | ≈ 41.42% |
| 5 years | 100.00% | 14.87% |
| 20 years | 100.00% | ≈ 3.53% |

Doubling an investment in 2 years reflects genuinely fast annual growth, while doubling it over 20 years reflects a much more modest pace — even though both describe identical total profit.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: CAGR only uses the starting and ending values — it says nothing about interim volatility, drawdowns, or whether additional money was added or withdrawn during the holding period. It also doesn't account for taxes, fees, or dividends unless those are already reflected in the entered final value.

To see year-by-year compounding rather than a single smoothed rate, see the [Compound Interest Calculator](/calculators/compound-interest-calculator/).
