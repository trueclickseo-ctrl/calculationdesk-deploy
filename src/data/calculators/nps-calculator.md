---
title: "NPS Calculator - National Pension System Calculator"
seoTitle: "NPS Calculator - Calculate Retirement Corpus & Pension | CalculationDesk"
metaDescription: "Free online NPS Calculator. Calculate total National Pension System retirement corpus, 60% tax-free lump sum payout, 40% annuity, and monthly pension."
category: "financial"
subcategory: "retirement-calculators"
tags: ["nps calculator", "national pension system", "nps pension calculator", "nps lump sum annuity", "pension calculator"]
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
  - "NPS Calculator - Calculate Retirement Corpus & Pension | CalculationDesk"
aiSummary:
  definition: "The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to accumulate a retirement corpus and provide a monthly pension through annuity reinvestment."
  quickAnswer: "Contributing ₹10,000 monthly from age 25 to 60 at 10% expected return yields a total accumulated corpus of ₹3,82,82,768. Allocating 40% to an annuity at 6% rate provides a ₹2.29 Crore lump sum and ₹76,566 monthly pension."
  formulaSummary: "Corpus FV = P × [((1+r)^n - 1) / r] × (1+r) + C × (1+r)^n | Lump Sum (60%) = FV - Annuity | Monthly Pension = (Annuity Corpus × Annuity Rate) / 12"
  whenToUse: "Use this tool to calculate your projected retirement wealth, lump-sum withdrawals, and post-retirement monthly pension payouts."
  whoShouldUse: "Salaried employees, self-employed individuals, and retirement planners."
  limitations: "Assumes a constant expected rate of return over the investment horizon."
  keyTakeaways:
    - "Calculates monthly compounding for recurring monthly contributions and existing balances."
    - "Mandatory statutory minimum of 40% must be used to purchase an annuity for monthly pension."
    - "Up to 60% of total corpus can be withdrawn tax-free upon reaching retirement age."
peopleAlsoAsk:
  - "What is the formula for calculating NPS retirement corpus?"
  - "What percentage of NPS corpus can be withdrawn tax-free as a lump sum?"
  - "How is the monthly pension calculated from the annuity corpus?"
  - "What is the minimum annuity purchase percentage in NPS?"
examples:
  - title: "35-Year NPS Contribution (₹10,000/month at 10% return, 40% annuity at 6%)"
    inputs: "Monthly Contribution = ₹10,000, Current Age = 25, Retirement Age = 60, Current Balance = ₹0, Expected Return = 10%, Annuity % = 40%, Annuity Rate = 6%"
    calculation: "Total Months = 35 × 12 = 420; Monthly r = 10 / 1200; FV = 10,000 × [((1 + 10/1200)^420 - 1) / (10/1200)] × (1 + 10/1200) = ₹3,82,82,768; Annuity (40%) = ₹1,53,13,107; Lump Sum (60%) = ₹2,29,69,661; Monthly Pension = (₹1,53,13,107 × 0.06) / 12 = ₹76,566/month."
    result: "Total Corpus = ₹3,82,82,768 | Tax-Free Lump Sum = ₹2,29,69,661 | Reinvested Annuity = ₹1,53,13,107 | Monthly Pension = ₹76,566"
faqs:
  - q: "What is the minimum annuity percentage required upon retirement?"
    a: "Upon reaching age 60, a minimum of 40% of your accumulated corpus must be reinvested into an annuity to generate a regular monthly pension."
  - q: "Is the 60% lump-sum withdrawal tax-free?"
    a: "Yes. Up to 60% of the total accumulated NPS corpus can be withdrawn as a lump sum at age 60, and the entire 60% is 100% tax-free under Section 10(12A)."
  - q: "How is monthly pension calculated from the annuity corpus?"
    a: "Monthly pension is computed by multiplying the annuity corpus by the expected annual annuity return rate and dividing by 12 ($\text{Monthly Pension} = \frac{\text{Annuity Corpus} \times \text{Annuity Rate}}{12 \times 100}$)."
references:
  - "https://www.pfrda.org.in"
  - "https://en.wikipedia.org/wiki/National_Pension_System"
---

# NPS Calculator – National Pension System Retirement Guide

The **National Pension System (NPS)** is a long-term, government-regulated retirement scheme. It allows individuals to build a substantial retirement fund during their working years and convert a portion of that capital into a steady monthly pension after age 60.

---

### How the NPS Calculation Works

Your final retirement corpus depends on your monthly contributions, current accumulated balance, age horizon, and expected annual return rate.

#### Mathematical Calculation Methodology

#### Step 1: Total Accumulated Corpus ($FV$)

$$FV = P \times \left[\frac{(1 + r)^n - 1}{r}\right] \times (1 + r) + C \times (1 + r)^n$$

Where:
- **$P$**: Monthly contribution amount.
- **$C$**: Current NPS balance.
- **$r$**: Monthly expected return rate ($\text{Expected Return \%} \div 12 \div 100$).
- **$n$**: Total investment months ($(\text{Retirement Age} - \text{Current Age}) \times 12$).

#### Step 2: Lump Sum vs. Annuity Allocation

$$\text{Annuity Corpus} = FV \times \left(\frac{\text{Annuity Percentage}}{100}\right)$$

$$\text{Tax-Free Lump Sum Corpus} = FV - \text{Annuity Corpus}$$

#### Step 3: Projected Monthly Pension

$$\text{Monthly Pension} = \frac{\text{Annuity Corpus} \times \left(\frac{\text{Annuity Rate}}{100}\right)}{12}$$

---

### Worked Numerical Example (Verified against Code)

Suppose a **25-year-old** contributes **₹10,000 monthly** until retiring at **age 60** (35 years = 420 months), starting with **₹0 initial balance**, expecting a **10% annual return**, allocating **40% to annuity** at a **6% annuity rate**:

1. **Total Accumulated Corpus ($FV$)**:
   $$FV = 10,000 \times \left[\frac{(1 + 0.008333)^{420} - 1}{0.008333}\right] \times (1 + 0.008333) \approx \mathbf{₹3,82,82,768}$$
2. **Principal Invested vs. Growth**:
   - Total Principal Invested: $₹10,000 \times 420 = \mathbf{₹42,00,000}$
   - Interest / Capital Growth: $₹3,82,82,768 - ₹42,00,000 = \mathbf{₹3,40,82,768}$
3. **Corpus Split at Age 60**:
   - Reinvested Annuity Corpus (40%): $₹3,82,82,768 \times 0.40 = \mathbf{₹1,53,13,107}$
   - Tax-Free Lump Sum (60%): $₹3,82,82,768 \times 0.60 = \mathbf{₹2,29,69,661}$
4. **Projected Monthly Pension**:
   $$\text{Monthly Pension} = \frac{1,53,13,107 \times 0.06}{12} = \mathbf{₹76,566\text{ / month}}$$

---

### Frequently Asked Questions (FAQ)

* **Q1: Can I allocate more than 40% of my corpus to an annuity?**
  * A1: Yes. The 40% requirement is a statutory minimum. You can allocate up to 100% of your corpus to an annuity if you want a higher monthly pension.
