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
  - "Profit Margin Calculator - Calculate Margin, Markup & Selling Price | CalculationDesk"
aiSummary:
  definition: "The Profit Margin Calculator computes gross dollar profit, profit margin percentage, and markup percentage from item cost and selling price. It also solves target selling price from cost and desired target margins or markups."
  quickAnswer: "An item costing $70 and sold for $100 yields a Gross Profit of $30, a Profit Margin of 30.00%, and a Markup Rate of 42.86%."
  formulaSummary: "Gross Profit = Selling Price - Cost | Profit Margin % = (Profit / Selling Price) * 100 | Markup % = (Profit / Cost) * 100 | Target Price = Cost / (1 - Margin%)"
  whenToUse: "Use this tool when setting retail prices, evaluating product profitability, estimating service margins, or calculating wholesale markups."
  whoShouldUse: "Retailers, e-commerce sellers, freelancers, business owners, and financial analysts."
  limitations: "Calculates gross unit economics. Net business profitability must account for operating overhead, merchant fees, taxes, shipping, and returns."
  keyTakeaways:
    - "Clearly distinguishes Profit Margin (profit relative to selling price) from Markup (profit relative to cost price)."
    - "Calculates Gross Profit ($ Revenue - $ Cost)."
    - "Supports dual modes: 'Calculate Margin & Markup' and 'Calculate Selling Price'."
    - "Demonstrates why a 30% profit margin requires a 42.86% markup rate."
    - "Provides practical business advice for e-commerce, retail, and service pricing."
peopleAlsoAsk:
  - "What is the difference between profit margin and markup?"
  - "Why is a 30% margin not the same as a 30% markup?"
  - "How do you calculate selling price from cost and target profit margin?"
  - "Can a profit margin be higher than 100%?"
examples:
  - title: "Worked Margin & Markup Example (Cost: $70, Revenue: $100)"
    inputs: "Mode = Find Margin & Markup, Cost = $70, Selling Price = $100"
    calculation: "1. Gross Profit = $100 - $70 = $30.00. 2. Profit Margin = ($30 / $100) * 100 = 30.00%. 3. Markup Rate = ($30 / $70) * 100 = 42.857% (42.86%)."
    result: "Gross Profit = $30.00 | Profit Margin = 30.00% | Markup = 42.86%"
  - title: "Worked Target Selling Price Example (Cost: $70, Target Margin: 30%)"
    inputs: "Mode = Find Selling Price, Cost = $70, Target Type = Target Margin, Target = 30%"
    calculation: "1. Selling Price = Cost / (1 - Margin/100) = $70 / (1 - 0.30) = $70 / 0.70 = $100.00. 2. Gross Profit = $100 - $70 = $30.00. 3. Markup = ($30 / $70) * 100 = 42.86%."
    result: "Target Selling Price = $100.00 | Gross Profit = $30.00 | Markup = 42.86%"
faqs:
  - q: "What is the key difference between profit margin and markup?"
    a: "Profit margin measures gross profit as a percentage of the selling price (revenue), whereas markup measures gross profit as a percentage of the cost price. Margin looks at what portion of revenue you keep, while markup looks at how much you added to your cost."
  - q: "Why is a 30% margin higher than a 30% markup?"
    a: "If you apply a 30% markup to a $70 cost, your selling price becomes $91 ($70 + $21), resulting in a profit margin of 23.08%. To achieve a true 30% profit margin on a $70 cost, you must price the item at $100, which requires a 42.86% markup."
  - q: "Can a profit margin exceed 100%?"
    a: "No. Gross profit margin is capped at 100% because profit cannot exceed total revenue (unless cost is negative, which is impossible). However, markup percentage can exceed 100% indefinitely (e.g., buying for $10 and selling for $50 is a 400% markup)."
references:
  - "https://www.sba.gov/business-guide/manage-your-business/pricing-products-services"
---

# Profit Margin Calculator – Margin vs. Markup Equations

Setting the right prices is one of the most critical decisions for any business. Price a product too high, and sales volume drops; price it too low, and you risk selling at a loss after overhead expenses.

Two fundamental metrics govern retail and service pricing: **Profit Margin** and **Markup**. While business owners often use these terms interchangeably, confusing them can severely erode profitability.

This calculator computes **Gross Profit ($)**, **Profit Margin (%)**, and **Markup (%)** from your item cost and selling price. It also features a reverse calculation mode to determine the exact **Target Selling Price** required to hit your desired profit margin or markup percentage.

---

### Margin vs. Markup: The Crucial Difference

* **Gross Profit ($)**: The raw dollar amount earned after subtracting direct product cost from revenue ($\text{Revenue} - \text{Cost}$).
* **Profit Margin (%)**: The proportion of **selling price (revenue)** that represents profit. It answers: *"Out of every dollar taken in, how many cents do I keep?"*
* **Markup (%)**: The percentage added to the **cost price** to determine the selling price. It answers: *"By what percentage did I increase my original cost?"*

---

### Calculation Formulas Used by the Calculator

#### Mode 1: Calculate Margin & Markup (Inputs: Cost $C$, Selling Price $R$)
$$\text{Gross Profit} = R - C$$
$$\text{Profit Margin (\%)} = \left( \frac{R - C}{R} \right) \times 100$$
$$\text{Markup (\%)} = \left( \frac{R - C}{C} \right) \times 100$$

#### Mode 2: Calculate Target Selling Price (Inputs: Cost $C$, Target Margin $M\%$)
To achieve a target profit margin, you **cannot** simply multiply cost by $(1 + M\%)$. Instead, you must divide by $(1 - M\%)$:
$$\text{Target Selling Price} = \frac{C}{1 - \frac{M}{100}}$$

If targeting a **Markup Percentage** ($K\%$):
$$\text{Target Selling Price} = C \times \left(1 + \frac{K}{100}\right)$$

---

### Step-by-Step Worked Numerical Example (Verified against Code)

Let's evaluate an item with a **Cost Price of $70** and a **Selling Price of $100**:

#### Mode 1: Finding Margin and Markup
1. **Calculate Gross Profit**:
   $$\text{Gross Profit} = \$100 - \$70 = \mathbf{\$30.00}$$
2. **Calculate Profit Margin**:
   $$\text{Profit Margin} = \left( \frac{30}{100} \right) \times 100 = \mathbf{30.00\%}$$
3. **Calculate Markup Rate**:
   $$\text{Markup Rate} = \left( \frac{30}{70} \right) \times 100 = 42.857\% \quad (\approx \mathbf{42.86\%})$$

#### Mode 2: Reverse Finding Selling Price for a 30% Target Margin
1. **Calculate Target Selling Price**:
   $$\text{Target Price} = \frac{\$70}{1 - 0.30} = \frac{\$70}{0.70} = \mathbf{\$100.00}$$

*Verification Result: Cost = $70, Revenue = $100 $\implies$ Gross Profit = **$30.00**, Profit Margin = **30.00%**, Markup = **42.86%**.*

---

### Common Pricing Mistake: The "30% Markup" Trap

A business owner buys an item for **$70** and wants a **30% profit margin**. 
* **Incorrect Method**: Adding a $30\%$ markup ($70 \times 1.30 = \mathbf{\$91}$). Selling at $\$91$ yields a profit of $\$21$. The actual margin is $21 / 91 = \mathbf{23.08\%}$—far short of the $30\%$ target!
* **Correct Method**: Using the margin formula ($70 / 0.70 = \mathbf{\$100}$). Selling at $\$100$ yields a profit of $\$30$, which is a true $\mathbf{30.00\%}$ profit margin.

---

### Real-World Business Applications

* **Retail & E-Commerce**: When selling physical products online, setting a target gross margin of $50\text{--}60\%$ ensures you have sufficient margin to cover credit card processing fees ($2.9\%$), platform fees, advertising acquisition costs, and customer returns.
* **Services & Freelancing**: Hourly rates should factor in non-billable administrative time and software overhead by marking up direct labor costs by $50\text{--}100\%$.

---

### Frequently Asked Questions (FAQ)

* **Q1: What is the key difference between profit margin and markup?**
  * A1: Profit margin measures gross profit as a percentage of the selling price (revenue), whereas markup measures gross profit as a percentage of the cost price. Margin looks at what portion of revenue you keep, while markup looks at how much you added to your cost.
* **Q2: Why is a 30% margin higher than a 30% markup?**
  * A2: If you apply a 30% markup to a $70 cost, your selling price becomes $91 ($70 + $21), resulting in a profit margin of 23.08%. To achieve a true 30% profit margin on a $70 cost, you must price the item at $100, which requires a 42.86% markup.
* **Q3: Can a profit margin exceed 100%?**
  * A3: No. Gross profit margin is capped at 100% because profit cannot exceed total revenue (unless cost is negative, which is impossible). However, markup percentage can exceed 100% indefinitely (e.g., buying for $10 and selling for $50 is a 400% markup).
