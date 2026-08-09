---
title: "FD Calculator - Fixed Deposit Maturity Calculator"
seoTitle: "FD Calculator - Fixed Deposit Maturity & Interest Calculator | CalculationDesk"
metaDescription: "Calculate your Fixed Deposit (FD) maturity amount and interest earned across monthly, quarterly, half-yearly, or yearly compounding frequencies."
category: "financial"
subcategory: "investment-calculators"
tags: ["fd calculator", "fixed deposit calculator", "fd maturity calculator", "fixed deposit interest calculator"]
priority: "high"
importance: 9
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
  reason: "Primary fixed deposit maturity and interest projection query"
titleVariants:
  - "FD Calculator - Fixed Deposit Maturity & Interest Calculator | CalculationDesk"
aiSummary:
  definition: "A Fixed Deposit (FD) is a savings instrument offered by banks that pays a fixed interest rate on a lump-sum deposit locked in for a set term. This calculator projects the maturity amount and interest earned across different compounding frequencies."
  quickAnswer: "A $10,000 principal at a 7% annual interest rate compounded quarterly for 5 years grows to a maturity amount of $14,147.78, earning $4,147.78 in interest."
  formulaSummary: "A = P * (1 + r / (n * 100))^(n * t)"
  whenToUse: "Use this calculator to project the maturity value of a fixed deposit before opening one, or to compare how different compounding frequencies affect the same deposit."
  whoShouldUse: "Savers looking for a low-risk, fixed-return investment, and anyone comparing FD offers across different banks or compounding schedules."
  limitations: "Assumes a constant interest rate for the entire tenure with no premature withdrawal. Does not account for taxes on interest earned or any penalties for early withdrawal."
  keyTakeaways:
    - "Unlike a SIP or PPF, an FD is a single lump-sum deposit — there are no recurring contributions, only the principal compounding at a fixed rate for a fixed term."
    - "Compounding frequency (monthly, quarterly, half-yearly, or yearly) changes the maturity value even when the stated annual rate is identical, because more frequent compounding reinvests interest sooner."
    - "The formula and its variables (P, r, n, t) are the standard fixed-rate compound interest equation used across virtually all bank FD and CD maturity calculations."
peopleAlsoAsk:
  - "Which compounding frequency offers the highest FD returns?"
  - "Can I withdraw money from a Fixed Deposit before maturity?"
  - "Are Fixed Deposit returns taxed?"
  - "How is an FD different from a savings account?"
examples:
  - title: "5-Year FD ($10,000 Principal @ 7% p.a., Quarterly Compounding)"
    inputs: "Principal = $10,000, Annual Rate = 7%, Compounding = Quarterly (n=4), Tenure = 5 Years"
    calculation: "A = 10,000 * (1 + 7/400)^(4*5) = 10,000 * (1.0175)^20 = 10,000 * 1.414778 = $14,147.78."
    result: "Maturity Amount = $14,147.78 | Interest Earned = $4,147.78"
  - title: "5-Year FD ($100,000 Principal @ 6.5% p.a., Monthly Compounding)"
    inputs: "Principal = $100,000, Annual Rate = 6.5%, Compounding = Monthly (n=12), Tenure = 5 Years"
    calculation: "A = 100,000 * (1 + 6.5/1200)^(12*5) = 100,000 * (1.005417)^60 = $138,281.73."
    result: "Maturity Amount = $138,281.73 | Interest Earned = $38,281.73"
faqs:
  - q: "Which compounding frequency offers the highest FD returns?"
    a: "At the same stated annual rate, monthly compounding produces the highest maturity value, followed by quarterly, then half-yearly, then yearly — because more frequent compounding reinvests interest sooner, letting it start earning its own interest earlier. The difference is real but usually modest: a $100,000 deposit at 6.5% for 5 years earns about $37,009 with yearly compounding versus about $38,282 with monthly compounding, a gap of roughly $1,273."
  - q: "Can I withdraw money from a Fixed Deposit before maturity?"
    a: "Most banks allow premature withdrawal, but it typically comes with a penalty — usually a reduced effective interest rate applied for the actual time the money was held, rather than the full rate you were originally offered. Some FDs may also charge a flat penalty fee."
  - q: "Are Fixed Deposit returns taxed?"
    a: "In many jurisdictions, interest earned on a fixed deposit is treated as taxable income and taxed annually as it accrues, regardless of whether you've actually withdrawn it. Tax rules and applicable brackets vary significantly by country, so this calculator focuses purely on the maturity math."
  - q: "How is an FD different from a savings account?"
    a: "A fixed deposit locks your money in for a set term in exchange for a higher, fixed interest rate than a regular savings account typically offers. In return for that higher rate, you generally give up easy access to the funds — early withdrawal usually comes with a penalty, unlike a savings account where you can withdraw freely at any time."
references:
  - "https://www.fdic.gov/consumer-resource-center/certificates-deposit"
formulaDescription: "This is the standard fixed-rate compound interest formula used for bank deposits: the principal grows by a fixed periodic rate (the annual rate divided by the number of compounding periods per year), and that growth compounds across every period in the deposit's term. Changing the compounding frequency changes how many times per year that periodic growth is applied, which is why it affects the final maturity value even at an identical annual rate."
variablesExplained:
  - name: "P (Principal)"
    description: "The lump-sum amount deposited at the start of the term."
  - name: "r (Annual Rate)"
    description: "The fixed annual interest rate offered on the deposit, as a percentage."
  - name: "n (Compounding Frequency)"
    description: "How many times per year interest compounds — 12 for monthly, 4 for quarterly, 2 for half-yearly, or 1 for yearly."
  - name: "t (Tenure)"
    description: "The length of the deposit term, in years."
stepByStep: "Enter your deposit principal, the annual interest rate offered, the compounding frequency, and the tenure. The calculator applies the fixed-rate compound interest formula for that exact compounding schedule and returns your projected maturity amount and interest earned."
realWorldUses: "Savers use FD calculators to compare offers from different banks that quote the same headline rate but compound at different frequencies, and to check that a bank's advertised maturity value for a given deposit actually matches the underlying math."
commonMistakes:
  - "Comparing two FD offers by their headline annual rate alone without checking the compounding frequency, which can make a lower-rate, more-frequently-compounded offer actually pay out more than a higher-rate, less-frequently-compounded one."
  - "Not accounting for premature withdrawal penalties when planning to use FD funds before the agreed maturity date — the effective return on an early withdrawal is often meaningfully lower than the quoted rate."
---

# FD Calculator – Fixed Deposit Maturity & Interest Projection

A **Fixed Deposit (FD)** is a savings instrument offered by banks and NBFCs that pays a higher, fixed interest rate than a regular savings account in exchange for locking your money in for a set term. Unlike a SIP or PPF, there are no recurring contributions — you deposit a single lump sum, and it compounds at your chosen frequency until maturity.

This calculator projects your **Maturity Amount** and **Interest Earned** based on your principal, interest rate, compounding frequency, and tenure.

## The FD Maturity Formula

$$A = P \times \left(1 + \frac{r}{n \times 100}\right)^{n \times t}$$

Where:
* **A**: Maturity amount.
* **P**: Principal deposit.
* **r**: Annual interest rate.
* **n**: Compounding frequency per year (12 monthly, 4 quarterly, 2 half-yearly, 1 yearly).
* **t**: Tenure in years.

## Worked Example

For a principal of **$10,000** at a **7%** annual rate, compounded **quarterly**, over **5 years**:

1. $n = 4$, $t = 5$
2. $A = 10{,}000 \times \left(1 + \dfrac{7}{400}\right)^{20} = 10{,}000 \times (1.0175)^{20} \approx \$14{,}147.78$
3. Interest earned: $\$14{,}147.78 - \$10{,}000.00 = \$4{,}147.78$

## How Compounding Frequency Affects Returns

Holding a **$100,000** principal at **6.5%** annual interest for **5 years**, only changing how often interest compounds:

| Compounding Frequency | Maturity Amount | Interest Earned |
| :--- | :---: | :---: |
| Yearly | $137,008.67 | $37,008.67 |
| Half-yearly | $137,689.43 | $37,689.43 |
| Quarterly | $138,041.98 | $38,041.98 |
| Monthly | $138,281.73 | $38,281.73 |

*The gap between yearly and monthly compounding here is about $1,273 over 5 years — worth checking when comparing FD offers that quote the same headline rate but different compounding schedules.*

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This projection assumes the deposit is held for its full term with no premature withdrawal, and it does not account for taxes on interest earned, TDS deductions, or the penalty rate typically applied to early withdrawals.

To model recurring monthly deposits instead of a single lump sum, try the [RD Calculator](/calculators/rd-calculator/), or compare this fixed-rate approach against a market-linked lump-sum investment with the [Lumpsum Calculator](/calculators/lumpsum-calculator/).
