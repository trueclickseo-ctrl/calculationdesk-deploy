---
title: "Stock Average Calculator - Average Share Price Calculator"
seoTitle: "Stock Average Calculator - Calculate Weighted Average Share Cost | CalculationDesk"
metaDescription: "Calculate the weighted average purchase price, total share quantity, and total investment cost across multiple stock buy transactions."
category: "financial"
subcategory: "investment-calculators"
tags: ["stock average calculator", "average stock price", "weighted average purchase price", "dollar cost averaging", "stock buy average"]
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
  reason: "Primary weighted average stock purchase price calculation query"
titleVariants:
  - "Stock Average Calculator - Calculate Weighted Average Share Cost | CalculationDesk"
aiSummary:
  definition: "This calculator computes the weighted average purchase price per share across multiple buy transactions executed at different prices, along with the total share quantity and total capital invested."
  quickAnswer: "Buying 100 shares at $50 and 50 shares at $40 gives a total of 150 shares, $7,000 total invested, and a weighted average price of $46.67 per share."
  formulaSummary: "Average Price = Sum(Quantity_k * Price_k) / Sum(Quantity_k)"
  whenToUse: "Use this calculator to find your true break-even cost per share after buying the same stock across multiple transactions at different prices, including after averaging down."
  whoShouldUse: "Stock investors, day traders, and anyone accumulating a position in an asset — including crypto or mutual fund units — across multiple purchases."
  limitations: "Calculates a pure weighted average of entered quantities and prices. Doesn't include brokerage commissions or fees unless the user manually adds them into each transaction's price."
  keyTakeaways:
    - "A simple average of purchase prices is mathematically wrong once transaction sizes differ — it treats a 10-share purchase and a 1,000-share purchase as equally important, when the weighted average correctly gives more influence to the larger purchase."
    - "Buying additional shares at a lower price than your existing average — averaging down — pulls the overall average cost per share down, which lowers the price the stock needs to reach for the position to break even, though it also increases total capital at risk."
    - "The same weighted-average math applies to any asset accumulated across multiple purchases at different prices, not just stocks — cryptocurrency, mutual fund units, and commodities all work identically."
peopleAlsoAsk:
  - "What is the formula for calculating average stock price?"
  - "Why is stock average calculated as a weighted average instead of a simple average?"
  - "What does 'averaging down' mean in stock trading?"
  - "Does this calculator include brokerage fees or commissions?"
examples:
  - title: "Two Transactions: 100 Shares @ $50, 50 Shares @ $40"
    inputs: "Transaction 1 = 100 shares at $50.00, Transaction 2 = 50 shares at $40.00"
    calculation: "Total Quantity = 100 + 50 = 150 shares. Cost 1 = 100 * 50 = $5,000.00. Cost 2 = 50 * 40 = $2,000.00. Total Cost = $5,000.00 + $2,000.00 = $7,000.00. Average Price = 7,000.00 / 150 = $46.67 per share."
    result: "Total Shares = 150 | Total Investment Cost = $7,000.00 | Average Price per Share = $46.67"
  - title: "Averaging Down: Adding a Third, Lower-Priced Purchase"
    inputs: "Transaction 1 = 100 shares at $50.00, Transaction 2 = 50 shares at $40.00, Transaction 3 = 200 shares at $30.00"
    calculation: "Total Quantity = 100 + 50 + 200 = 350 shares. Total Cost = $5,000.00 + $2,000.00 + $6,000.00 = $13,000.00. Average Price = 13,000.00 / 350 = $37.14 per share — noticeably lower than the two-transaction average, since the larger, cheaper third purchase pulls the weighted average down."
    result: "Total Shares = 350 | Total Investment Cost = $13,000.00 | Average Price per Share = $37.14"
faqs:
  - q: "What is the formula for calculating average stock price?"
    a: "The weighted average price is the total money spent across all purchases divided by the total number of shares bought: Average Price = Σ(Quantity × Price) ÷ Σ(Quantity), summed across every transaction entered."
  - q: "Why is stock average calculated as a weighted average instead of a simple average?"
    a: "A simple average of the per-share prices treats every transaction as equally important regardless of size, which is inaccurate once purchase sizes differ. A weighted average scales each price by how many shares were bought at it, so a larger purchase correctly has more influence on the overall average cost than a smaller one."
  - q: "What does 'averaging down' mean in stock trading?"
    a: "Averaging down means buying more shares of a stock after its price has fallen, which lowers your overall weighted average cost per share. This reduces how much the stock needs to recover for the position to break even, but it also increases total capital committed to a stock that has been declining, which adds risk if the decline continues."
  - q: "Does this calculator include brokerage fees or commissions?"
    a: "No — it computes the weighted average based only on the quantities and prices entered. To account for brokerage commissions, add the per-share fee directly into the price entered for each transaction before calculating."
references:
  - "https://www.investopedia.com/terms/d/dollarcostaveraging.asp"
formulaDescription: "Each transaction contributes its quantity and its cost (quantity times price) to two running totals. The total cost across all transactions is then divided by the total quantity across all transactions, producing a single average price per share that correctly reflects how many shares were bought at each price, rather than treating every transaction's price as equally weighted."
variablesExplained:
  - name: "Quantity_k, Price_k"
    description: "The number of shares and the price per share for the k-th transaction entered."
  - name: "Total Quantity"
    description: "The sum of shares across every transaction row — your total current share count."
  - name: "Average Price"
    description: "Total money spent across all transactions divided by total shares owned — your true break-even cost per share."
stepByStep: "Add a row for each stock purchase, entering the number of shares and the price paid per share for that transaction. The calculator sums the total shares and total cost across every row and divides one by the other to find your weighted average purchase price."
realWorldUses: "Investors use this after buying the same stock multiple times to find their true break-even price, to decide whether averaging down at a lower price makes sense given the new blended cost basis, and to track total capital committed to a position across all purchases."
commonMistakes:
  - "Taking a simple average of the purchase prices instead of weighting by quantity — this overstates or understates the true average cost per share whenever transaction sizes differ from each other."
  - "Averaging down without considering whether the reason the stock declined still applies — a lower average cost per share doesn't change the underlying business or asset fundamentals that caused the price to fall."
---

# Stock Average Calculator – Weighted Average Share Cost Guide

When shares of a stock are bought across multiple transactions at different prices, the true break-even cost isn't a simple average of those prices — it's a **weighted average** based on how many shares were bought at each price. This calculator computes your **total share quantity, total investment cost, and weighted average price per share** across any number of purchases.

## The Weighted Average Formula

$$\text{Average Price} = \frac{\sum_{k=1}^{m} (\text{Quantity}_k \times \text{Price}_k)}{\sum_{k=1}^{m} \text{Quantity}_k}$$

Where **m** is the number of buy transactions entered, **Quantity_k** is the number of shares bought in transaction *k*, and **Price_k** is the price paid per share in that transaction.

## Why a Simple Average Is Wrong

Buying 100 shares at $50 and 50 shares at $40 does not average to $45 (the simple midpoint of $50 and $40) — because twice as many shares were bought at $50 as at $40, that price should count for more in the average:

1. Total quantity: $100 + 50 = 150$ shares
2. Cost of transaction 1: $100 \times \$50 = \$5{,}000$
3. Cost of transaction 2: $50 \times \$40 = \$2{,}000$
4. Total cost: $\$5{,}000 + \$2{,}000 = \$7{,}000$
5. Weighted average price: $\$7{,}000 \div 150 \approx \$46.67$ per share

The correct weighted average ($46.67) sits closer to $50 than to $40, precisely because more shares were bought at the higher price.

## How Averaging Down Changes the Cost Basis

Adding a third, larger purchase at a lower price pulls the weighted average down more than a simple average would suggest — the extra 200 shares at $30 have more influence than the earlier, smaller transactions:

| Transactions | Total Shares | Total Cost | Weighted Average |
|---|---|---|---|
| 100 @ $50, 50 @ $40 | 150 | $7,000.00 | $46.67 |
| + 200 @ $30 (averaging down) | 350 | $13,000.00 | $37.14 |

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This computes a pure weighted average of the quantities and prices entered. It doesn't factor in brokerage commissions, transaction fees, or taxes on any prior sales — to include a fee, add it directly to the per-share price of the relevant transaction before entering it.

For the strategy of investing a fixed amount at regular intervals regardless of price, see the [SIP Calculator](/calculators/sip-calculator/).
