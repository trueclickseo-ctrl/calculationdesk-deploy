---
title: "Profit Margin Calculator - Margin vs. Markup Equations"
seoTitle: "Profit Margin Calculator - Calculate Margin, Markup & Selling Price | CalculationDesk"
metaDescription: "Free online Profit Margin Calculator. Calculate gross profit, profit margin percentage, markup percentage, and target selling price from item costs."
category: "financial"
subcategory: "business-calculators"
tags: ["profit margin calculator", "margin vs markup", "gross profit formula", "calculate selling price from cost", "retail pricing calculator"]
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
  - "Profit Margin Calculator - Calculate Margin, Markup & Selling Price | CalculationDesk"
aiSummary:
  definition: "The Profit Margin Calculator computes gross dollar profit, profit margin percentage, and markup percentage from item cost and selling price. It also solves target selling price from cost and a desired target margin or markup."
  quickAnswer: "An item costing 70 and sold for 100 yields a Gross Profit of 30, a Profit Margin of 30.00%, and a Markup Rate of 42.86%."
  formulaSummary: "Gross Profit = Selling Price - Cost | Profit Margin % = (Profit / Selling Price) * 100 | Markup % = (Profit / Cost) * 100 | Target Price (from margin) = Cost / (1 - Margin%/100) | Target Price (from markup) = Cost x (1 + Markup%/100)"
  whenToUse: "Use this tool when setting retail prices, evaluating product profitability, estimating service margins, or calculating wholesale markups."
  whoShouldUse: "Retailers, e-commerce sellers, freelancers, business owners, and financial analysts."
  limitations: "Calculates gross unit economics. Net business profitability must account for operating overhead, merchant fees, taxes, shipping, and returns."
  keyTakeaways:
    - "Clearly distinguishes Profit Margin (profit relative to selling price) from Markup (profit relative to cost price)."
    - "Calculates Gross Profit (Revenue minus Cost)."
    - "Supports dual modes: 'Calculate Margin & Markup' and 'Calculate Selling Price' (from either a target margin or a target markup)."
    - "Demonstrates why a 30% profit margin requires a 42.86% markup rate, not a 30% markup."
    - "Provides practical business advice for e-commerce, retail, and service pricing."
peopleAlsoAsk:
  - "What is the difference between profit margin and markup?"
  - "Why is a 30% margin not the same as a 30% markup?"
  - "How do you calculate selling price from cost and target profit margin?"
  - "Can a profit margin be higher than 100%?"
examples:
  - title: "Worked Margin & Markup Example (Cost: 70, Revenue: 100)"
    inputs: "Mode = Find Margin & Markup, Cost = 70, Selling Price = 100"
    calculation: "Gross Profit = 100 - 70 = 30.00. Profit Margin = (30 / 100) x 100 = 30.00%. Markup Rate = (30 / 70) x 100 = 42.857% (42.86%)."
    result: "Gross Profit = 30.00 | Profit Margin = 30.00% | Markup = 42.86%"
  - title: "Worked Target Selling Price Example (Cost: 70, Target Margin: 30%)"
    inputs: "Mode = Find Selling Price, Cost = 70, Target Type = Target Margin, Target = 30%"
    calculation: "Selling Price = Cost / (1 - Margin/100) = 70 / (1 - 0.30) = 70 / 0.70 = 100.00. Gross Profit = 100 - 70 = 30.00. Markup = (30 / 70) x 100 = 42.86%."
    result: "Target Selling Price = 100.00 | Gross Profit = 30.00 | Markup = 42.86%"
  - title: "Worked Target Selling Price Example from Target Markup (Cost: 45, Target Markup: 25%)"
    inputs: "Mode = Find Selling Price, Cost = 45, Target Type = Target Markup, Target = 25%"
    calculation: "Selling Price = Cost x (1 + Markup/100) = 45 x 1.25 = 56.25. Gross Profit = 56.25 - 45 = 11.25. Profit Margin = (11.25 / 56.25) x 100 = 20.00%."
    result: "Target Selling Price = 56.25 | Gross Profit = 11.25 | Profit Margin = 20.00%"
faqs:
  - q: "What is the key difference between profit margin and markup?"
    a: "Profit margin measures gross profit as a percentage of the selling price (revenue), whereas markup measures gross profit as a percentage of the cost price. Margin looks at what portion of revenue you keep, while markup looks at how much you added to your cost."
  - q: "Why is a 30% margin higher than a 30% markup?"
    a: "If you apply a 30% markup to a 70 cost, your selling price becomes 91 (70 + 21), resulting in a profit margin of 23.08%. To achieve a true 30% profit margin on a 70 cost, you must price the item at 100, which requires a 42.86% markup."
  - q: "Can a profit margin exceed 100%?"
    a: "No. Gross profit margin is capped at 100% because profit cannot exceed total revenue (unless cost is negative, which is impossible). However, markup percentage can exceed 100% indefinitely (e.g., buying for 10 and selling for 50 is a 400% markup)."
  - q: "How does the calculator solve for selling price when you know a target markup instead of a target margin?"
    a: "When targeting a markup percentage, the calculator uses the simpler direct formula: Target Price = Cost x (1 + Markup% / 100), since markup is defined relative to cost. This is a different (and simpler) calculation than solving from a target margin, which requires dividing by (1 - Margin%/100) instead of multiplying, as shown in the second worked example."
references:
  - "https://www.sba.gov/business-guide/manage-your-business/pricing-products-services"
formulaDescription: "In 'Calculate Margin & Markup' mode, the calculator subtracts cost from the selling price to get gross profit, then expresses that profit as a percentage of the selling price (margin) and separately as a percentage of the cost (markup). In 'Calculate Selling Price' mode, if targeting a margin, it divides the cost by (1 minus the target margin as a decimal) to find the price that yields exactly that margin; if targeting a markup, it directly multiplies the cost by (1 plus the target markup as a decimal), since markup is already defined relative to cost."
variablesExplained:
  - name: "Gross Profit"
    description: "The raw dollar amount earned after subtracting direct product cost from the selling price (revenue), before accounting for overhead, fees, or other indirect costs."
  - name: "Profit Margin (%)"
    description: "Gross profit expressed as a percentage of the selling price (revenue) — answers 'out of every dollar taken in, how many cents do I keep?' Capped at a theoretical maximum of 100%."
  - name: "Markup (%)"
    description: "Gross profit expressed as a percentage of the cost price — answers 'by what percentage did I increase my original cost?' Can exceed 100% with no theoretical upper limit."
stepByStep: "Choose a calculation mode. In 'Calculate Margin & Markup' mode, enter the item's cost and selling price to see gross profit, profit margin, and markup. In 'Calculate Selling Price' mode, enter the cost and choose whether you know a target margin or a target markup percentage, then enter that target value — the calculator solves for the exact selling price needed, along with the resulting gross profit and the other percentage metric."
realWorldUses: "Retailers and e-commerce sellers use target-margin pricing to ensure a product's selling price covers credit card processing fees, platform fees, advertising costs, and returns, typically targeting 50-60% gross margin on physical products. Freelancers and service businesses use markup-based pricing to mark up direct labor costs by 50-100% to cover non-billable administrative time and software overhead."
commonMistakes:
  - "Applying a target margin percentage as if it were a markup percentage — a 30% markup on a $70 cost yields only a 23.08% margin, not 30%, because markup is calculated against cost while margin is calculated against the (larger) selling price."
  - "Assuming markup percentage is capped like margin percentage is — profit margin cannot exceed 100% because profit can never exceed revenue, but markup has no such ceiling since it's measured against the smaller cost figure, so a markup of 400% or more is entirely possible."
---

# Profit Margin Calculator – Margin vs. Markup Equations

Setting the right prices is one of the most critical decisions for any business. Price a product too high, and sales volume drops; price it too low, and you risk selling at a loss after overhead expenses. Two fundamental metrics govern retail and service pricing: Profit Margin and Markup. While business owners often use these terms interchangeably, confusing them can severely erode profitability. This calculator computes Gross Profit ($), Profit Margin (%), and Markup (%) from your item cost and selling price. It also features a reverse calculation mode to determine the exact Target Selling Price required to hit your desired profit margin or markup percentage.

## Margin vs. Markup: The Crucial Difference

Gross Profit ($) is the raw dollar amount earned after subtracting direct product cost from revenue (Revenue − Cost). Profit Margin (%) is the proportion of selling price (revenue) that represents profit — it answers "out of every dollar taken in, how many cents do I keep?" Markup (%) is the percentage added to the cost price to determine the selling price — it answers "by what percentage did I increase my original cost?"

## Calculation Formulas Used by the Calculator

**Mode 1: Calculate Margin & Markup** (inputs: Cost C, Selling Price R):

$$\text{Gross Profit} = R - C \qquad \text{Profit Margin (\%)} = \frac{R - C}{R} \times 100 \qquad \text{Markup (\%)} = \frac{R - C}{C} \times 100$$

**Mode 2: Calculate Target Selling Price** (input: Cost C, plus either a Target Margin M% or Target Markup K%). To achieve a target profit margin, you cannot simply multiply cost by (1 + M%) — you must divide by (1 − M%):

$$\text{Target Price (from margin)} = \frac{C}{1 - M/100}$$

If targeting a markup percentage instead, the calculation is more direct, since markup is already defined relative to cost:

$$\text{Target Price (from markup)} = C \times \left(1 + \frac{K}{100}\right)$$

## Worked Examples

### Example 1: Finding Margin and Markup (Cost $70, Revenue $100)

Gross Profit $= 100 - 70 = \$30.00$. Profit Margin $= (30 / 100) \times 100 = 30.00\%$. Markup Rate $= (30 / 70) \times 100 \approx 42.86\%$.

### Example 2: Reverse-Solving Selling Price for a 30% Target Margin (Cost $70)

Target Price $= 70 / (1 - 0.30) = 70 / 0.70 = \$100.00$. This confirms: Cost = 70, Revenue = 100 → Gross Profit = **$30.00**, Profit Margin = **30.00%**, Markup = **42.86%**.

### Example 3: Reverse-Solving Selling Price for a 25% Target Markup (Cost $45)

Target Price $= 45 \times (1 + 0.25) = 45 \times 1.25 = \$56.25$. Gross Profit $= 56.25 - 45 = \$11.25$. Profit Margin $= (11.25 / 56.25) \times 100 = 20.00\%$ — notably lower than the 25% markup rate, illustrating the margin-vs-markup gap again.

## Common Pricing Mistake: The "30% Markup" Trap

A business owner buys an item for $70 and wants a 30% profit margin. The incorrect method adds a 30% markup ($70 × 1.30 = $91). Selling at $91 yields a profit of $21, so the actual margin is $21 / 91 = 23.08\%$ — far short of the 30% target. The correct method uses the margin formula ($70 / 0.70 = $100). Selling at $100 yields a profit of $30, which is a true 30.00% profit margin.

## Real-World Business Applications

Retail and e-commerce sellers of physical products online typically target a gross margin of 50-60% to ensure sufficient margin covers credit card processing fees (≈2.9%), platform fees, advertising acquisition costs, and customer returns. Services and freelancing hourly rates should factor in non-billable administrative time and software overhead by marking up direct labor costs by 50-100%.

## Frequently Asked Questions

### What is the key difference between profit margin and markup?

Profit margin measures gross profit as a percentage of the selling price (revenue), whereas markup measures gross profit as a percentage of the cost price. Margin looks at what portion of revenue you keep, while markup looks at how much you added to your cost.

### Why is a 30% margin higher than a 30% markup?

If you apply a 30% markup to a 70 cost, your selling price becomes 91 ($70 + 21), resulting in a profit margin of 23.08%. To achieve a true 30% profit margin on a 70 cost, you must price the item at 100, which requires a 42.86% markup.

### Can a profit margin exceed 100%?

No. Gross profit margin is capped at 100% because profit cannot exceed total revenue (unless cost is negative, which is impossible). However, markup percentage can exceed 100% indefinitely (e.g., buying for 10 and selling for 50 is a 400% markup).

### How does the calculator solve for selling price when you know a target markup instead of a target margin?

When targeting a markup percentage, the calculator uses the simpler direct formula: Target Price = Cost × (1 + Markup% / 100), since markup is defined relative to cost. This is a different (and simpler) calculation than solving from a target margin, which requires dividing by (1 − Margin%/100) instead of multiplying, as shown in the second worked example.
