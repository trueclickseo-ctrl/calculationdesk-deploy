---
title: "NPS (National Pension System) Calculator - Retirement & Annuity Calculator"
seoTitle: "NPS (National Pension System) Calculator - Calculate Corpus & Pension | CalculationDesk"
metaDescription: "Calculate your projected NPS retirement corpus, the statutory 60% tax-free lump sum / 40% annuity split, and your estimated monthly pension payout."
category: "financial"
subcategory: "retirement-calculators"
tags: ["nps national pension system calculator", "nps pension calculator", "nps lump sum annuity split", "pfrda nps calculator", "section 80ccd deduction"]
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
  reason: "Primary NPS retirement corpus and annuity/pension calculation query"
titleVariants:
  - "NPS (National Pension System) Calculator - Calculate Corpus & Pension | CalculationDesk"
aiSummary:
  definition: "This calculator models NPS (National Pension System) retirement wealth accumulation from monthly contributions and any existing balance, then applies the statutory 60% tax-free lump sum / 40% minimum annuity split to project a monthly pension."
  quickAnswer: "Contributing ₹10,000 monthly from age 25 to 60 at a 10% expected return builds a total corpus of ₹3,82,82,767 (₹42,00,000 invested, ₹3,40,82,767 growth). With a 40% annuity allocation at 6%, that's a ₹2,29,69,660 tax-free lump sum and a ₹76,565.53/month pension."
  formulaSummary: "r = Return/12/100 | n = (RetireAge-CurrentAge)*12 | Corpus = P*((1+r)^n-1)/r*(1+r) + C*(1+r)^n | Annuity = Corpus*Pct/100 | Pension = Annuity*Rate/100/12"
  whenToUse: "Use this calculator to project your NPS retirement corpus, see the mandatory annuity/lump-sum split, and estimate your post-retirement monthly pension."
  whoShouldUse: "NPS subscribers, salaried employees planning retirement contributions, and anyone comparing NPS against other retirement savings options."
  limitations: "Assumes a single constant expected annual return for the entire contribution period and a single constant annuity rate at retirement. Actual NPS returns vary with the underlying equity/corporate bond/government securities allocation, and real annuity rates depend on market conditions and the provider chosen at retirement."
  keyTakeaways:
    - "NPS requires a minimum of 40% of the final corpus to go toward purchasing an annuity, which is what funds the monthly pension — the remaining portion, up to 60%, can be withdrawn as a tax-free lump sum under Section 10(12A)."
    - "Starting contributions earlier has an outsized effect on the final corpus because of how many additional years of compounding it adds — the same ₹10,000 monthly contribution at 10% builds to roughly ₹5.2 Crores starting at age 22 versus about ₹1.34 Crores starting at age 35, a gap far larger than the 13-year difference in contribution time alone would suggest."
    - "The monthly pension figure depends entirely on the annuity rate assumed at retirement, which this calculator treats as a fixed input — real annuity rates fluctuate with prevailing interest rates and vary between annuity providers, so the projected pension is only as reliable as that assumption."
peopleAlsoAsk:
  - "What is the statutory minimum annuity percentage in NPS?"
  - "Is the 60% lump-sum withdrawal from NPS tax-free?"
  - "What are the tax benefits under Section 80CCD?"
  - "Can I choose an annuity buy percentage higher than 40%?"
examples:
  - title: "35-Year Contribution: ₹10,000/month, Age 25 to 60, 10% Return, 40% Annuity at 6%"
    inputs: "Monthly Contribution = ₹10,000, Current Age = 25, Retirement Age = 60, Current Balance = ₹0, Expected Return = 10%, Annuity % = 40%, Annuity Rate = 6%"
    calculation: "Months (n) = (60-25) × 12 = 420. Monthly rate (r) = 10/12/100 = 0.008333. Corpus = 10,000 × [(1.008333)^420 - 1] / 0.008333 × (1.008333) = ₹3,82,82,767.02. Total Invested = 10,000 × 420 = ₹42,00,000. Growth = ₹3,40,82,767.02. Annuity Corpus (40%) = ₹1,53,13,106.81. Lump Sum (60%) = ₹2,29,69,660.21. Monthly Pension = (1,53,13,106.81 × 0.06)/12 = ₹76,565.53."
    result: "Total Corpus = ₹3,82,82,767.02 | Tax-Free Lump Sum = ₹2,29,69,660.21 | Annuity Corpus = ₹1,53,13,106.81 | Monthly Pension = ₹76,565.53"
  - title: "Same Profile, Starting at Age 35 Instead of 25"
    inputs: "Monthly Contribution = ₹10,000, Current Age = 35, Retirement Age = 60, Expected Return = 10%"
    calculation: "With only 25 years (300 months) of contributions instead of 35 years, the corpus reaches roughly ₹1,33,78,903 — about a third of the age-25 scenario, despite only losing 10 of the 35 contribution years, illustrating how much the later years of compounding contribute to the final total."
    result: "Total Corpus (before retirement split) ≈ ₹1,33,78,903"
faqs:
  - q: "What is the statutory minimum annuity percentage in NPS?"
    a: "Upon reaching retirement at age 60, at least 40% of the total accumulated corpus must be used to purchase an annuity, which generates the monthly pension. Subscribers can choose to allocate more than 40% — up to 100% — if they want a larger monthly pension instead of a larger lump sum."
  - q: "Is the 60% lump-sum withdrawal from NPS tax-free?"
    a: "Yes. Up to 60% of the total accumulated NPS corpus can be withdrawn as a lump sum at retirement, and that entire portion is tax-free under Section 10(12A) of the Income Tax Act. The remaining annuity portion, once it starts paying out as a pension, is taxed as regular income."
  - q: "What are the tax benefits under Section 80CCD?"
    a: "NPS contributions qualify for deductions up to ₹1.5 Lakhs under Section 80C (shared with other eligible investments), plus an additional, exclusive deduction of up to ₹50,000 under Section 80CCD(1B) — bringing the total possible deduction to ₹2 Lakhs per financial year for contributions to NPS specifically."
  - q: "Can I choose an annuity buy percentage higher than 40%?"
    a: "Yes. The 40% figure is only the statutory minimum. Subscribers who want a larger guaranteed monthly pension rather than a larger tax-free lump sum can elect to allocate a higher percentage of their corpus — up to 100% — toward the annuity purchase."
references:
  - "https://www.pfrda.org.in"
formulaDescription: "The total corpus combines two growth streams: the monthly contributions compound as a systematic investment using the future-value-of-an-annuity-due formula, while any existing NPS balance entered separately compounds on its own as a lump sum over the same period, and the two are added together. At retirement, that combined corpus is split by the chosen annuity percentage — the annuity portion is then used to estimate a monthly pension by applying the assumed annuity rate, while the remainder is available as a tax-free lump sum."
variablesExplained:
  - name: "P (Monthly Contribution) & C (Current Balance)"
    description: "Your ongoing monthly NPS contribution and any existing accumulated balance, both of which compound separately at the same expected return."
  - name: "n (Months) & r (Monthly Rate)"
    description: "Total contribution months (retirement age minus current age, in years, times 12) and the monthly compounding rate (expected annual return ÷ 12 ÷ 100)."
  - name: "Annuity % and Annuity Rate"
    description: "The share of the final corpus reinvested into an annuity (minimum 40% by regulation) and the annual rate that annuity is assumed to pay, which together determine the projected monthly pension."
stepByStep: "Enter your monthly contribution, current age, planned retirement age, any existing NPS balance, expected annual return, the percentage of the corpus you'll allocate to an annuity (minimum 40%), and the expected annuity rate. The calculator projects your total corpus at retirement, splits it into the tax-free lump sum and annuity portions, and estimates your resulting monthly pension."
realWorldUses: "NPS subscribers use this to project how their monthly contributions will grow toward retirement, to see how choosing a higher annuity allocation trades a smaller lump sum for a larger guaranteed pension, and to test how starting contributions earlier changes the final corpus."
commonMistakes:
  - "Assuming the expected return rate will stay constant for decades — real NPS returns vary year to year based on the underlying equity, corporate bond, and government securities allocation, and tend to shift automatically toward safer assets as the subscriber ages under the Auto Choice option."
  - "Underestimating how much starting contributions later reduces the final corpus — because compounding effects are strongest in the final years before retirement, delaying the start date by even a decade can cut the projected corpus by more than half, not just proportionally to the years missed."
---

# NPS (National Pension System) Calculator – Corpus & Pension Guide

The National Pension System (NPS) is a voluntary, long-term retirement savings scheme regulated by India's Pension Fund Regulatory and Development Authority (PFRDA). This calculator projects your **total accumulated retirement corpus**, the statutory **60% tax-free lump sum / 40% mandatory annuity split**, and your resulting **projected monthly pension**.

## How the NPS Corpus Is Calculated

**Total Accumulated Corpus:**

$$\text{Corpus} = P \times \frac{(1 + r)^n - 1}{r} \times (1 + r) + C \times (1 + r)^n$$

**Annuity and Lump Sum Split:**

$$\text{Annuity Corpus} = \text{Corpus} \times \frac{\text{Annuity \%}}{100} \qquad \text{Lump Sum} = \text{Corpus} - \text{Annuity Corpus}$$

**Projected Monthly Pension:**

$$\text{Monthly Pension} = \frac{\text{Annuity Corpus} \times \text{Annuity Rate}}{12 \times 100}$$

Where **P** is your monthly contribution, **C** is any existing NPS balance, **r** is the monthly expected return, and **n** is the total number of contribution months.

## Worked Example

A **25-year-old** contributing **₹10,000 monthly** until retiring at **age 60** (35 years), with **no starting balance**, a **10%** expected return, a **40%** annuity allocation, and a **6%** annuity rate:

1. Contribution months: $(60 - 25) \times 12 = 420$
2. Monthly rate: $10 \div 12 \div 100 = 0.008333$
3. Total corpus: $10{,}000 \times \dfrac{(1.008333)^{420} - 1}{0.008333} \times (1.008333) \approx ₹3{,}82{,}82{,}767$
4. Invested principal: $10{,}000 \times 420 = ₹42{,}00{,}000$ — growth of **₹3,40,82,767**
5. Annuity corpus (40%): $₹3{,}82{,}82{,}767 \times 0.40 \approx ₹1{,}53{,}13{,}107$
6. Tax-free lump sum (60%): $₹3{,}82{,}82{,}767 \times 0.60 \approx ₹2{,}29{,}69{,}660$
7. Monthly pension: $(₹1{,}53{,}13{,}107 \times 0.06) \div 12 \approx ₹76{,}565.53$

## Why Starting Age Matters So Much

Because NPS compounds monthly over a long horizon, the years closest to retirement contribute disproportionately to the final corpus. Starting the same ₹10,000/month contribution at age 35 instead of 25 — losing 10 of the 35 contribution years — doesn't just cut the corpus by roughly a third; it cuts it to about **₹1.34 Crores**, a fraction of the age-25 scenario's **₹3.83 Crores**. The earliest years of contribution have decades to compound, which is why starting NPS contributions as early as possible has an outsized long-term payoff.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This assumes a single fixed expected return for the entire contribution period and a single fixed annuity rate at retirement. It doesn't model the auto-rebalancing that occurs under the Auto Choice investment option, year-to-year market volatility, fund management fees, or the fact that annuity income (unlike the lump sum) is taxed as regular income when received.

To compare against a non-mandatory retirement investment plan, see the [SIP Calculator](/calculators/sip-calculator/).
