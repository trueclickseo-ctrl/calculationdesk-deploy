---
title: "NPS Calculator - National Pension System Calculator"
seoTitle: "NPS Calculator - National Pension System Corpus & Pension Calculator | CalculationDesk"
metaDescription: "Estimate your National Pension System (NPS) retirement corpus at age 60, along with the annuity split, lump sum payout, and estimated monthly pension."
category: "financial"
subcategory: "retirement-calculators"
tags: ["nps calculator", "national pension system calculator", "nps corpus calculator", "nps pension calculator"]
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
  reason: "Primary National Pension System retirement corpus and monthly pension projection query"
titleVariants:
  - "NPS Calculator - National Pension System Corpus & Pension Calculator | CalculationDesk"
aiSummary:
  definition: "The National Pension System (NPS) is a voluntary, long-term retirement savings scheme. This calculator projects the retirement corpus built by age 60 from regular monthly contributions, then splits that corpus into a mandatory annuity portion and a tax-free lump sum, estimating the resulting monthly pension."
  quickAnswer: "A 30-year-old contributing $5,000 every month at an expected 10% annual return, using a 40% annuity at a 6% annuity rate, accumulates a corpus of approximately $11,396,626.62 by age 60, split into a $4,558,650.65 annuity and a $6,837,975.97 tax-free lump sum, producing an estimated monthly pension of about $22,793.25."
  formulaSummary: "A = P * [((1+i)^n - 1)/i] * (1+i) | i = r/12/100, n = (60-Age)*12 | AnnuityValue = A * (AnnuityPercent/100) | LumpSum = A - AnnuityValue | MonthlyPension = (AnnuityValue * AnnuityRate/100) / 12"
  whenToUse: "Use this calculator to project your NPS retirement corpus and estimated pension while planning monthly contributions during your working years."
  whoShouldUse: "Working-age individuals contributing to NPS, and anyone evaluating NPS as part of a retirement plan."
  limitations: "Assumes a constant monthly contribution and constant expected return rate from now until age 60, and a constant annuity return rate at retirement. Real returns and annuity rates fluctuate and are not guaranteed."
  keyTakeaways:
    - "The accumulation phase uses the same annuity-due compounding formula as a SIP, since NPS contributions are also monthly."
    - "By regulation, a minimum of 40% of the accumulated corpus must be used to purchase an annuity at retirement; the remaining portion, up to 60%, can be withdrawn as a tax-free lump sum."
    - "The estimated monthly pension is calculated only on the annuity portion of the corpus, using a separate annuity return rate — it is not the same rate used to grow the corpus during the contribution years."
peopleAlsoAsk:
  - "What is the minimum annuity purchase percentage in NPS?"
  - "Is NPS tax-exempt?"
  - "Can I withdraw from NPS before age 60?"
  - "Why does starting NPS contributions earlier make such a large difference?"
examples:
  - title: "Age 30, $5,000/month, 10% Expected Return, 40% Annuity @ 6%"
    inputs: "Current Age = 30, Monthly Contribution = $5,000, Expected Annual Return = 10%, Annuity Percentage = 40%, Annuity Rate = 6%"
    calculation: "Years to age 60 = 30, so n = 360 months. Monthly rate i = 10/12/100 = 0.008333. Accumulated Corpus A = 5,000 * [((1.008333)^360 - 1)/0.008333] * 1.008333 = $11,396,626.62. Total Invested = 5,000 * 360 = $1,800,000.00. Annuity Value (40%) = $4,558,650.65. Lump Sum (60%) = $6,837,975.97. Monthly Pension = ($4,558,650.65 * 6/100) / 12 = $22,793.25."
    result: "Accumulated Corpus = $11,396,626.62 | Total Invested = $1,800,000.00 | Annuity Value = $4,558,650.65 | Lump Sum Payout = $6,837,975.97 | Estimated Monthly Pension = $22,793.25"
  - title: "Age 40, $5,000/month, 10% Expected Return, 40% Annuity @ 6%"
    inputs: "Current Age = 40, Monthly Contribution = $5,000, Expected Annual Return = 10%, Annuity Percentage = 40%, Annuity Rate = 6%"
    calculation: "Only 20 years remain to age 60 (n = 240 months), instead of 30 years, which produces a meaningfully smaller corpus."
    result: "Accumulated Corpus = $3,828,484.55 | Total Invested = $1,200,000.00 | Annuity Value = $1,531,393.82 | Lump Sum Payout = $2,297,090.73 | Estimated Monthly Pension = $7,656.97"
faqs:
  - q: "What is the minimum annuity purchase percentage in NPS?"
    a: "Upon reaching retirement age (60), NPS regulations require at least 40% of the accumulated corpus to be used to purchase an annuity, which provides a regular pension. You can choose to allocate more than 40% — up to the full corpus — to the annuity if you prefer a larger guaranteed income stream."
  - q: "Is NPS tax-exempt?"
    a: "In many jurisdictions offering NPS, contributions up to specified limits are tax-deductible, and the tax-free lump-sum portion withdrawn at retirement is exempt from income tax. Rules and limits vary and can change, so this calculator focuses on the maturity math rather than tax treatment."
  - q: "Can I withdraw from NPS before age 60?"
    a: "NPS is designed as a retirement lock-in account, so early access is restricted. Partial withdrawals are typically permitted only under specific circumstances — such as medical emergencies, higher education, or a home purchase — and generally only after the account has been held for a minimum number of years."
  - q: "Why does starting NPS contributions earlier make such a large difference?"
    a: "Because the corpus compounds monthly over the entire contribution period, every extra year of contributions doesn't just add another year's worth of deposits — it also gives all of the money already in the account more time to compound. That's why a 30-year-old contributing the same monthly amount as a 40-year-old ends up with a corpus roughly three times larger by age 60."
references:
  - "https://www.pfrda.org.in"
formulaDescription: "The corpus accumulation phase uses the same annuity-due future value formula as a SIP — each monthly contribution is treated as if deposited at the start of the month and compounds for that full month. Once the corpus is projected, it's split by regulation into a mandatory annuity portion (at least 40%) and an optional tax-free lump sum (the remainder), and the estimated monthly pension is calculated by applying a separate annuity return rate to just the annuity portion."
variablesExplained:
  - name: "P (Monthly Contribution)"
    description: "The fixed amount contributed to the NPS account each month."
  - name: "n (Months to Retirement)"
    description: "The number of months remaining until age 60, based on current age."
  - name: "Annuity Percentage"
    description: "The share of the final corpus used to purchase an annuity — a minimum of 40% is required by regulation."
  - name: "Annuity Rate"
    description: "The assumed annual return rate the annuity itself pays, used to estimate the resulting monthly pension."
stepByStep: "Enter your current age, monthly contribution, expected annual return rate during the accumulation phase, and your planned annuity percentage and annuity rate at retirement. The calculator projects your accumulated corpus at age 60, splits it into an annuity portion and a tax-free lump sum, and estimates the resulting monthly pension from the annuity portion."
realWorldUses: "NPS subscribers use calculators like this to project how their monthly contributions will grow by retirement, to see how the mandatory annuity split affects their available lump sum, and to get a rough sense of the monthly pension that corpus could support."
commonMistakes:
  - "Assuming the expected return rate during the accumulation years and the annuity return rate at retirement are the same number — they represent two different things (investment growth versus annuity payout rate) and are entered separately in this calculator."
  - "Forgetting that NPS regulations require a minimum 40% annuity allocation, so the lump sum payout can never exceed 60% of the final corpus."
---

# NPS Calculator – National Pension System Corpus & Pension Projection

The **National Pension System (NPS)** is a voluntary, long-term retirement savings scheme that builds a retirement corpus through regular contributions during your working years. At age 60, regulations require at least 40% of the accumulated corpus to be used to purchase an annuity (which pays a regular pension), while the remainder can be withdrawn as a tax-free lump sum.

This calculator projects your **Accumulated Corpus**, **Annuity Value**, **Lump Sum Payout**, and **Estimated Monthly Pension** based on your age, monthly contribution, expected return, and annuity choices.

## The NPS Formulas

**Accumulation phase** (same annuity-due logic as a monthly SIP):

$$A = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)$$

Where $i$ is the monthly rate (annual rate ÷ 12 ÷ 100) and $n$ is the number of months remaining until age 60.

**At retirement**, the corpus splits into:

$$\text{Annuity Value} = A \times \frac{\text{Annuity Percentage}}{100} \qquad \text{Lump Sum} = A - \text{Annuity Value}$$
$$\text{Estimated Monthly Pension} = \frac{\text{Annuity Value} \times \dfrac{\text{Annuity Rate}}{100}}{12}$$

## Worked Example

A **30-year-old** contributing **$5,000 monthly**, expecting a **10%** annual return, planning a **40%** annuity at a **6%** annuity rate:

1. Years to retirement: $60 - 30 = 30$ years, so $n = 360$ months. Monthly rate: $i = 10 \div 12 \div 100 = 0.008333$
2. Accumulated corpus: $A = 5{,}000 \times \left[\dfrac{(1.008333)^{360} - 1}{0.008333}\right] \times 1.008333 \approx \$11{,}396{,}626.62$
3. Total invested: $5{,}000 \times 360 = \$1{,}800{,}000.00$
4. Annuity value (40%): $\$4{,}558{,}650.65$ | Lump sum (60%): $\$6{,}837{,}975.97$
5. Estimated monthly pension: $(\$4{,}558{,}650.65 \times 0.06) \div 12 \approx \$22{,}793.25$

## Why Starting Age Matters So Much

Because the corpus compounds monthly for the entire contribution period, starting earlier doesn't just add more years of deposits — it gives everything already in the account more time to grow. Holding the same $5,000 monthly contribution and 10% expected return constant, only changing the starting age:

| Starting Age | Years to 60 | Accumulated Corpus | Estimated Monthly Pension |
| :--- | :---: | :---: | :---: |
| 25 | 35 | $19,141,383.51 | $38,282.77 |
| 30 (example above) | 30 | $11,396,626.62 | $22,793.25 |
| 35 | 25 | $6,689,451.74 | $13,378.90 |
| 40 | 20 | $3,828,484.55 | $7,656.97 |

*Starting at 25 instead of 40 — just 15 years earlier — produces a corpus roughly five times larger, illustrating how much compounding time matters for retirement accounts.*

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This projection assumes a constant contribution amount, a constant expected return rate for the entire accumulation period, and a constant annuity rate at retirement. It does not account for fund management charges, contribution changes over time, or real-world variability in annuity provider rates.

To model a similar monthly-contribution investment outside a retirement account, see the [SIP Calculator](/calculators/sip-calculator/).
