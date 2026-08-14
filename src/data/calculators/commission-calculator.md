---
title: "Commission Calculator - Flat & Tiered Sales Models"
seoTitle: "Commission Calculator - Calculate Flat & Tiered Sales Earnings | CalculationDesk"
metaDescription: "Free online Commission Calculator. Calculate sales commission payouts and total earnings (base salary + commission) using flat-rate and tiered margin structures."
category: "financial"
subcategory: "business-calculators"
tags: ["commission calculator", "sales commission calculator", "tiered commission calculator", "base salary plus commission", "ote compensation calculator"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "financial-editorial-team"
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
  - "Commission Calculator - Calculate Flat & Tiered Sales Earnings | CalculationDesk"
aiSummary:
  definition: "The Commission Calculator computes sales commission payouts and total compensation (base salary plus commission) using both flat-rate percentage models and multi-tier progressive sales rate schedules."
  quickAnswer: "A sales representative with a 2,000 base salary and 25,000 in sales earns 1,250 in commission at a 5% flat rate (Total: 3,250), or 1,200 in commission under a 3-tier progressive structure (Total: 3,200)."
  formulaSummary: "Flat: Comm = Sales x Rate% / 100 | Tiered: Comm = Sum(Eligible Sales in Tier i x Rate_i% / 100), where each tier's eligible sales is capped at that tier's span | Total Earnings = Base Salary + Comm"
  whenToUse: "Use this tool to calculate sales rep monthly paychecks, model sales team compensation structures, or evaluate tiered performance incentives."
  whoShouldUse: "Sales representatives, sales managers, HR payroll officers, brokers, and recruiters."
  limitations: "Calculates gross sales commission payouts. Does not subtract income tax withholding, payroll taxes, or clawback deductions."
  keyTakeaways:
    - "Differentiates Base Salary, Commission Payout, and Total Earnings (On-Target Earnings / OTE)."
    - "Explains Flat Commission (single percentage applied across all sales)."
    - "Explains Tiered Commission (progressive rates applied to specific sales bracket bands, not retroactively to all sales)."
    - "Provides step-by-step worked numerical examples for both Flat and Tiered modes, including a full-tier example that reaches the top accelerator rate."
    - "Highlights common commission payroll calculation errors."
peopleAlsoAsk:
  - "How is tiered commission calculated across multiple sales brackets?"
  - "What is the difference between flat commission and tiered commission?"
  - "What does On-Target Earnings (OTE) mean in sales compensation?"
  - "Why can a tiered commission pay differently than a single flat percentage?"
examples:
  - title: "Worked Flat Commission Example ($25,000 Sales, 2,000 Base Salary, 5% Flat Rate)"
    inputs: "Mode = Flat, Sales Amount = 25,000, Base Salary = 2,000, Commission Rate = 5%"
    calculation: "Commission Payout = 25,000 x (5 / 100) = 1,250.00. Total Earnings = 2,000 (Base) + 1,250 (Comm) = 3,250.00."
    result: "Commission Payout = 1,250.00 | Base Salary = 2,000.00 | Total Earnings = 3,250.00"
  - title: "Worked Tiered Commission Example ($25,000 Sales, 2,000 Base, Tiers: 3% up to 10k, 6% up to 50k, 10% remainder)"
    inputs: "Mode = Tiered, Sales Amount = 25,000, Base Salary = 2,000, Tier 1 = 0-$10k @ 3%, Tier 2 = 10k-$50k @ 6%, Tier 3 = above $50k @ 10%"
    calculation: "Tier 1 ($0 to 10,000): 10,000 x 0.03 = 300.00. Tier 2 ($10,000 to 25,000): Remaining 15,000 x 0.06 = 900.00. Tier 3 is never reached since total sales (25,000) don't exceed the 50,000 threshold. Total Tiered Commission = 300 + 900 = 1,200.00. Total Earnings = 2,000 (Base) + 1,200 (Comm) = 3,200.00."
    result: "Commission Payout = 1,200.00 | Base Salary = 2,000.00 | Total Earnings = 3,200.00"
  - title: "Worked Tiered Commission Example Reaching the Top Accelerator ($75,000 Sales, 2,500 Base)"
    inputs: "Mode = Tiered, Sales Amount = 75,000, Base Salary = 2,500, Tier 1 = 0-$10k @ 3%, Tier 2 = 10k-$50k @ 6%, Tier 3 = above $50k @ 10%"
    calculation: "Tier 1 ($0 to 10,000): 10,000 x 0.03 = 300.00. Tier 2 ($10,000 to 50,000): 40,000 x 0.06 = 2,400.00. Tier 3 (above $50,000): Remaining 25,000 x 0.10 = 2,500.00. Total Tiered Commission = 300 + 2,400 + 2,500 = 5,200.00. Total Earnings = 2,500 (Base) + 5,200 (Comm) = 7,700.00."
    result: "Commission Payout = 5,200.00 | Base Salary = 2,500.00 | Total Earnings = 7,700.00"
faqs:
  - q: "What is a tiered commission structure?"
    a: "A tiered commission structure pays different percentage rates as sales volume crosses predefined threshold brackets. Rates typically increase at higher brackets (e.g. 3% on the first 10k, 6% on the next 40k) to reward high performers."
  - q: "What is the difference between Base Salary, Commission, and Total Earnings?"
    a: "Base salary is guaranteed fixed pay regardless of sales performance. Commission is variable performance-based pay directly tied to sales volume. Total Earnings (or On-Target Earnings / OTE) is the sum of base salary plus earned commissions."
  - q: "Why does a 5% flat commission pay more than a 3%/6%/10% tiered commission on 25,000 of sales?"
    a: "On 25,000 of sales, a 5% flat rate applies to every single dollar ($1,250). In the tiered model, the first 10,000 is paid at a lower 3% rate ($300), and only the remaining 15,000 is paid at 6% ($900), totaling 1,200. Tiered models require reaching higher sales volumes (e.g. over 50,000) to unlock top 10% acceleration rates, as shown in the third worked example where $75,000 in sales unlocks all three tiers."
references:
  - "https://www.sba.gov/business-guide/manage-your-business/human-resources"
formulaDescription: "In Flat mode, the calculator multiplies total sales by the flat commission rate percentage. In Tiered mode, it walks through each tier in order: for a tier with a fixed upper bound, it caps the eligible sales in that tier at the span between the previous tier's limit and this tier's limit (or the remaining sales, whichever is smaller), multiplies that eligible amount by the tier's rate, and moves to the next tier with whatever sales remain; the final 'unlimited' tier applies its rate to all remaining sales above the last fixed threshold. Total Earnings always adds the computed commission to the entered base salary."
variablesExplained:
  - name: "Total Sales Amount (S)"
    description: "The total gross dollar value of closed deals or products sold during the commission period, used as the base for both flat and tiered commission calculations."
  - name: "Tier Threshold (upto)"
    description: "The upper dollar boundary of a given commission tier; sales falling between the previous tier's threshold and this one earn this tier's rate, not the whole sales total."
  - name: "Total Earnings (OTE)"
    description: "The complete gross pay earned during the period, computed as Base Salary plus Commission Payout — also referred to as On-Target Earnings in sales compensation planning."
stepByStep: "Choose Flat or Tiered mode. In Flat mode, enter total sales, base salary, and a single commission rate percentage. In Tiered mode, enter total sales, base salary, and define each tier's upper threshold and rate (the final tier is unlimited). The calculator computes the commission payout — either a simple percentage of total sales, or a sum of each tier's rate applied only to the sales dollars within that tier's span — and adds it to the base salary for Total Earnings."
realWorldUses: "Sales representatives use this to estimate their monthly paycheck given a known sales volume; sales managers use it to model different compensation plan structures before rolling them out to a team; and HR payroll officers use it to verify commission calculations against a documented tier schedule before processing payroll."
commonMistakes:
  - "Applying a higher tier's rate retroactively to ALL sales — unless a compensation plan explicitly specifies a 'retroactive tier jump,' progressive tiers only apply their higher percentage rate to the incremental dollars within that specific tier band, not to the entire sales total once that tier is reached."
  - "Confusing gross revenue with gross margin as the commission base — some plans pay commission on total sales revenue, while others pay commission on gross profit margin dollars (sales minus product cost); entering the wrong baseline amount produces a commission figure that doesn't match the actual compensation plan."
---

# Commission Calculator – Flat & Tiered Sales Models

In sales compensation, commission is variable performance-based pay earned by sales representatives, real estate agents, or account executives based on the dollar volume of goods or services they sell. A well-structured commission plan aligns sales incentives with business revenue growth. However, calculating payouts accurately requires understanding the specific plan design — whether it uses a single Flat Commission Rate or a progressive Tiered Commission Schedule. This calculator computes Commission Payouts ($) and Total Earnings ($) (Base Salary + Commission) across both Flat and Tiered calculation modes.

## Key Sales Compensation Definitions

Total Sales Amount (S) is the total gross dollar value of closed deals or products sold during the commission period. Base Salary (B) is the fixed, guaranteed salary paid to a sales representative regardless of sales output. Commission Payout (C) is the variable incentive money earned directly from sales performance. Total Earnings (On-Target Earnings / OTE) is the complete gross pay earned during the period: Total Earnings = B + C.

## Flat vs. Tiered Commission Structures

**Flat commission** applies a single fixed percentage across all eligible sales volume from the very first dollar:

$$\text{Commission} = S \times \frac{\text{Commission Rate \%}}{100} \qquad \text{Total Earnings} = B + \text{Commission}$$

**Tiered (progressive bracket) commission** divides sales into bracket spans (bands). As sales volume crosses specific threshold boundaries, higher percentage rates apply only to the sales dollars falling within that specific bracket:

$$\text{Commission} = \sum_{i=1}^n \left( \text{Eligible Sales in Tier } i \times \frac{\text{Tier Rate}_i \%}{100} \right)$$

## Worked Examples

### Example 1: Flat Commission Mode (5% Flat Rate, $25,000 Sales, $2,000 Base)

Commission $= 25{,}000 \times 0.05 = \$1{,}250.00$. Total Earnings $= 2{,}000 + 1{,}250 = \$3{,}250.00$.

### Example 2: Tiered Commission Mode, Two Tiers Reached ($25,000 Sales, $2,000 Base)

Using the default tier structure (Tier 1: up to $10,000 @ 3%; Tier 2: up to $50,000 @ 6%; Tier 3: unlimited @ 10%): Tier 1 commission $= 10{,}000 \times 0.03 = \$300.00$. Remaining sales $= 25{,}000 - 10{,}000 = 15{,}000$. Tier 2 eligible sales $= \min(15{,}000, 40{,}000) = 15{,}000$; Tier 2 commission $= 15{,}000 \times 0.06 = \$900.00$. Tier 3 is never reached. Total Commission $= 300 + 900 = \$1{,}200.00$. Total Earnings $= 2{,}000 + 1{,}200 = \$3{,}200.00$.

### Example 3: Tiered Commission Mode, All Three Tiers Reached ($75,000 Sales, $2,500 Base)

Tier 1 commission $= 10{,}000 \times 0.03 = \$300.00$. Tier 2 span is $50{,}000 - 10{,}000 = 40{,}000$; Tier 2 commission $= 40{,}000 \times 0.06 = \$2{,}400.00$. Remaining sales after Tiers 1–2: $75{,}000 - 10{,}000 - 40{,}000 = 25{,}000$; Tier 3 (unlimited, above $50,000) commission $= 25{,}000 \times 0.10 = \$2{,}500.00$. Total Commission $= 300 + 2{,}400 + 2{,}500 = \$5{,}200.00$. Total Earnings $= 2{,}500 + 5{,}200 = \$7{,}700.00$ — this example shows the top 10% accelerator rate actually kicking in.

## Why Tiered Commissions Produce Different Results

In Example 2, the 5% flat rate would have paid $1,250, while the tiered structure paid only $1,200 on the exact same $25,000 sales volume — because under the tiered model, the first $10,000 of sales was paid at a baseline rate of 3%. Tiered models are designed to control sales costs at lower volumes while offering powerful "accelerator" incentives (10%) when representatives crush high quotas, as Example 3 demonstrates once sales exceed $50,000.

## Common Commission Payroll Mistakes

Applying higher tier rates retroactively to ALL sales is a common error — unless a compensation plan explicitly specifies a "retroactive tier jump," progressive tiers only apply their higher percentage rate to the incremental dollars within that tier band. Confusing gross revenue with gross margin is another: some plans pay commission on total sales revenue, while others pay commission on gross profit margin dollars (Sales − Product Cost). Ensure you enter the correct baseline amount for your specific plan.

## Frequently Asked Questions

### What is a tiered commission structure?

A tiered commission structure pays different percentage rates as sales volume crosses predefined threshold brackets. Rates typically increase at higher brackets (e.g. 3% on the first 10k, 6% on the next 40k) to reward high performers.

### What is the difference between Base Salary, Commission, and Total Earnings?

Base salary is guaranteed fixed pay regardless of sales performance. Commission is variable performance-based pay directly tied to sales volume. Total Earnings (or On-Target Earnings / OTE) is the sum of base salary plus earned commissions.

### Why does a 5% flat commission pay more than a 3%/6%/10% tiered commission on 25,000 of sales?

On 25,000 of sales, a 5% flat rate applies to every single dollar ($1,250). In the tiered model, the first 10,000 is paid at a lower 3% rate ($300), and only the remaining 15,000 is paid at 6% ($900), totaling 1,200. Tiered models require reaching higher sales volumes (e.g. over 50,000) to unlock top 10% acceleration rates, as shown in the third worked example where $75,000 in sales unlocks all three tiers.
