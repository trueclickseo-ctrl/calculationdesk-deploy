---
title: "Post Office Scheme Interest Planner - Small Savings Calculator"
seoTitle: "Post Office Scheme Interest Planner - Calculate Post Office Returns | CalculationDesk"
metaDescription: "Calculate maturity values and periodic interest payouts across India Post's small savings schemes: POMIS, NSC, KVP, SCSS, and POTD."
category: "financial"
subcategory: "investment-calculators"
tags: ["post office scheme calculator", "pomis calculator", "nsc calculator", "kvp calculator", "scss calculator", "post office time deposit"]
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
  reason: "Primary India Post small savings scheme return calculation query"
titleVariants:
  - "Post Office Scheme Interest Planner - Calculate Post Office Returns | CalculationDesk"
aiSummary:
  definition: "This calculator projects maturity amounts and periodic interest payouts across five India Post small savings schemes — POMIS, NSC, KVP, SCSS, and POTD — each of which follows its own government-set interest rate and payout structure."
  quickAnswer: "Depositing ₹9,00,000 (the single-account statutory limit) into the Monthly Income Scheme (POMIS) at 7.4% p.a. pays ₹5,550 every month for 5 years — ₹3,33,000 in total interest — while the original ₹9,00,000 principal is returned at maturity."
  formulaSummary: "POMIS: Monthly = P*R/1200 | NSC: A = P*(1+R/100)^5 | KVP: A = P*2 | SCSS: Quarterly = P*R/400 | POTD: A = P*(1+R/400)^(4t)"
  whenToUse: "Use this planner to estimate returns and compare payout structures across India Post's sovereign-backed small savings schemes before choosing one."
  whoShouldUse: "Retirees, senior citizens, and conservative savers looking for government-guaranteed, low-risk fixed-income options."
  limitations: "Uses the interest rates and statutory deposit limits configured in the planner, which the government revises periodically (typically quarterly) — actual rates at the time of deposit should always be confirmed directly with India Post before investing."
  keyTakeaways:
    - "The five schemes pay out in fundamentally different ways — POMIS and SCSS pay regular income (monthly and quarterly respectively) while the principal stays intact until maturity, whereas NSC, KVP, and POTD compound the interest into a single lump sum paid at maturity, with nothing paid out along the way."
    - "KVP is unique among these schemes in that its return isn't rate-based in the usual sense — it's defined by government notification to double the deposited principal over a fixed 115-month (about 9 years 7 months) period, regardless of how that implies as an annualized rate."
    - "POMIS and SCSS both have statutory maximum deposit limits (₹9,00,000 single / ₹15,00,000 joint for POMIS, ₹30,00,000 for SCSS) — depositing more than the limit isn't a calculation issue, but it is not permitted by the scheme rules themselves."
peopleAlsoAsk:
  - "What is the maximum investment limit in the Monthly Income Scheme (POMIS)?"
  - "How long does it take for Kisan Vikas Patra (KVP) to double an investment?"
  - "Can I claim tax benefits on Post Office Time Deposits?"
  - "Are Post Office savings schemes safe?"
examples:
  - title: "POMIS: ₹9,00,000 at 7.4% p.a., 5-Year Tenure"
    inputs: "Scheme = POMIS, Principal = ₹9,00,000 (single-account statutory limit), Rate = 7.4% p.a."
    calculation: "Monthly Payout = (9,00,000 × 7.4) / 1200 = ₹5,550.00. Total Interest = 5,550 × 60 months = ₹3,33,000.00. Principal returned at maturity = ₹9,00,000."
    result: "Monthly Income = ₹5,550.00 | Total Interest Over 5 Years = ₹3,33,000.00 | Principal Returned = ₹9,00,000"
  - title: "SCSS: ₹15,00,000 at 8.2% p.a., 5-Year Tenure"
    inputs: "Scheme = SCSS, Principal = ₹15,00,000, Rate = 8.2% p.a."
    calculation: "Quarterly Payout = (15,00,000 × 8.2) / 400 = ₹30,750.00. Total Interest = 30,750 × 20 quarters = ₹6,15,000.00."
    result: "Quarterly Income = ₹30,750.00 | Total Interest Over 5 Years = ₹6,15,000.00 | Principal Returned = ₹15,00,000"
faqs:
  - q: "What is the maximum investment limit in the Monthly Income Scheme (POMIS)?"
    a: "POMIS caps deposits at ₹9,00,000 for a single account and ₹15,00,000 for a joint account. These statutory limits exist to keep the scheme balanced across depositors; the calculator flags a deposit amount above the applicable limit."
  - q: "How long does it take for Kisan Vikas Patra (KVP) to double an investment?"
    a: "KVP is designed by government notification to double the deposited principal over a fixed tenure of 115 months — 9 years and 7 months. This is a fixed maturity structure rather than a standard compounding rate applied over a chosen term."
  - q: "Can I claim tax benefits on Post Office Time Deposits?"
    a: "Only the 5-year Post Office Time Deposit (POTD) qualifies for a tax deduction under Section 80C of the Income Tax Act, up to ₹1.5 Lakhs. The shorter 1-year, 2-year, and 3-year POTD terms do not carry this tax benefit."
  - q: "Are Post Office savings schemes safe?"
    a: "Yes — all of these schemes are backed by the Government of India, making them sovereign-guaranteed investments with essentially no risk of default on either principal or interest, which is why they're commonly used by retirees and conservative savers."
references:
  - "https://www.indiapost.gov.in"
formulaDescription: "Each scheme uses its own government-defined payout structure. POMIS and SCSS pay simple periodic interest — monthly for POMIS, quarterly for SCSS — calculated directly from the principal and rate each period, with the principal itself returned unchanged at maturity. NSC and POTD compound the principal at their respective rates (annually for NSC, quarterly for POTD) and pay out the full compounded maturity value in one lump sum. KVP does not use a compounding formula at all — it is defined to double the principal over a fixed 115-month period by government notification."
variablesExplained:
  - name: "P (Principal)"
    description: "The deposit amount, subject to each scheme's statutory minimum and maximum limits where applicable."
  - name: "R (Interest Rate)"
    description: "The scheme's current government-notified annual interest rate, which is reviewed and can change periodically (commonly each quarter)."
  - name: "Payout Frequency"
    description: "How often interest is paid out — monthly for POMIS, quarterly for SCSS, or as a single lump sum at maturity for NSC, KVP, and POTD."
stepByStep: "Select the Post Office scheme you're evaluating, enter your deposit principal, and (for POTD) choose the deposit term. The calculator applies that scheme's specific payout formula and shows your periodic income (for POMIS/SCSS) or maturity value (for NSC/KVP/POTD), along with total interest earned over the tenure."
realWorldUses: "Savers use this planner to compare regular-income options like POMIS and SCSS against lump-sum maturity schemes like NSC and POTD, to check whether a planned deposit fits within a scheme's statutory limit, and to estimate the income a retiree could expect from a given deposit amount."
commonMistakes:
  - "Assuming all five schemes work the same way — POMIS and SCSS pay income periodically while the principal stays fixed, which is fundamentally different from NSC, KVP, and POTD, where interest compounds into a single maturity payout with nothing received until the end."
  - "Using outdated interest rates — India Post revises small savings scheme rates periodically (commonly quarterly), so the rates used in any projection should be checked against the current official rate before making an actual deposit."
---

# Post Office Scheme Interest Planner – Small Savings Guide

India Post offers several government-backed small savings schemes, each with its own tenure, interest rate, and payout structure. This planner covers five of the most widely used: **POMIS, NSC, KVP, SCSS, and POTD**.

## How Each Scheme Calculates Returns

**Post Office Monthly Income Scheme (POMIS)** — 5-year tenure, interest paid monthly, principal returned at maturity:

$$\text{Monthly Payout} = \frac{P \times R}{12 \times 100} \qquad \text{Total Interest} = \text{Monthly Payout} \times 60$$

**National Savings Certificate (NSC)** — 5-year tenure, compounds annually, paid at maturity:

$$\text{Maturity Amount} = P \times \left(1 + \frac{R}{100}\right)^5$$

**Kisan Vikas Patra (KVP)** — fixed 115-month tenure, doubles the principal by design:

$$\text{Maturity Amount} = P \times 2$$

**Senior Citizen Savings Scheme (SCSS)** — 5-year tenure, interest paid quarterly, principal returned at maturity:

$$\text{Quarterly Payout} = \frac{P \times R}{4 \times 100} \qquad \text{Total Interest} = \text{Quarterly Payout} \times 20$$

**Post Office Time Deposit (POTD)** — 1, 2, 3, or 5-year terms, compounds quarterly, paid at maturity:

$$\text{Maturity Amount} = P \times \left(1 + \frac{R}{400}\right)^{4t}$$

## Worked Example: POMIS

A **₹9,00,000** deposit (the single-account statutory limit) into POMIS at **7.4%** for **5 years**:

1. Monthly payout: $\dfrac{9{,}00{,}000 \times 7.4}{12 \times 100} = ₹5{,}550$ per month
2. Total interest over 60 months: $₹5{,}550 \times 60 = ₹3{,}33{,}000$
3. The full ₹9,00,000 principal is returned at the end of the 5-year term, on top of the interest already received

## Comparing the Five Schemes

Because these schemes pay out so differently, they aren't directly comparable by rate alone. On a ₹1,00,000 deposit:

| Scheme | Rate | Structure | 5-Year Outcome (₹1,00,000 deposit) |
|---|---|---|---|
| POMIS | 7.4% | Monthly payout, principal returned | ₹617/month, ₹37,000 total interest |
| NSC | 7.7% | Compounds annually, paid at maturity | ₹1,44,903.38 maturity value |
| KVP | — | Doubles over 115 months (~9.6 yrs) | ₹2,00,000 at maturity (longer tenure) |
| SCSS | 8.2% | Quarterly payout, principal returned | ₹2,050/quarter, ₹41,000 total interest |
| POTD (5-yr) | 7.5% | Compounds quarterly, paid at maturity | ₹1,44,994.80 maturity value |

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: Interest rates for all five schemes are set and periodically revised by the Government of India — the rates used here reflect the values configured in this planner and should be checked against India Post's current official rates before making an actual deposit. This also doesn't account for TDS on interest above statutory thresholds or premature-withdrawal rules, which vary by scheme.

To compare against a bank fixed deposit instead of a government scheme, see the [FD Calculator](/calculators/fd-calculator/).
