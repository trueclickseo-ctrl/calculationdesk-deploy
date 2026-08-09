---
title: "GST Calculator - Goods and Services Tax Calculator"
seoTitle: "GST Calculator - Add or Remove GST from a Price | CalculationDesk"
metaDescription: "Calculate GST (Goods and Services Tax) to add to a base price, or remove GST from a tax-inclusive price, at any tax rate."
category: "financial"
subcategory: "tax-calculators"
tags: ["gst calculator", "goods and services tax calculator", "vat calculator", "tax inclusive exclusive calculator"]
priority: "high"
importance: 8
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
  reason: "Primary goods and services tax addition/removal calculation query"
titleVariants:
  - "GST Calculator - Add or Remove GST from a Price | CalculationDesk"
aiSummary:
  definition: "Goods and Services Tax (GST) is an indirect consumption tax included in the final price of goods and services. This calculator either adds GST to a tax-exclusive base price, or works backward to remove GST from a tax-inclusive total."
  quickAnswer: "Adding 18% GST to a $100 base price gives a total of $118.00. Removing 18% GST from a $100 tax-inclusive price gives a base price of $84.75 and a GST amount of $15.25."
  formulaSummary: "Add: GSTAmount = BasePrice * (Rate/100), Total = BasePrice + GSTAmount | Remove: BasePrice = TotalPrice / (1 + Rate/100), GSTAmount = TotalPrice - BasePrice"
  whenToUse: "Use this calculator to work out how much tax to add to a listed price, or to figure out how much of an already-taxed price is the base cost versus the tax itself."
  whoShouldUse: "Businesses issuing invoices, shoppers checking a tax-inclusive receipt, and anyone needing to separate a price into its base and tax components."
  limitations: "Applies a single flat tax rate to a single amount. Does not account for multi-rate transactions, exemptions, or jurisdiction-specific tax rules that may apply different rates to different line items."
  keyTakeaways:
    - "Adding and removing GST are not mirror-image operations on the same number — adding 18% to $100 gives $118, but removing 18% from that same $118 correctly returns exactly $100, while naively subtracting 18% from $118 would give the wrong answer ($96.76)."
    - "GST-inclusive and GST-exclusive prices use different formulas specifically because the tax rate applies to the base price, not to the already-taxed total."
    - "The same math underlies GST, VAT, and similar consumption taxes used in many countries — only the rate and terminology differ."
peopleAlsoAsk:
  - "What is the difference between GST inclusive and exclusive prices?"
  - "Can GST rates differ by product?"
  - "Is GST the same as VAT?"
  - "Why can't you just subtract the tax rate to remove GST from a price?"
examples:
  - title: "Add GST to a $100 Base Price @ 18%"
    inputs: "Base Price = $100.00, GST Rate = 18%, Mode = Add"
    calculation: "GST Amount = 100 * (18/100) = $18.00. Total Price = 100 + 18 = $118.00."
    result: "GST Amount = $18.00 | Total Price = $118.00"
  - title: "Remove GST from a $100 Tax-Inclusive Price @ 18%"
    inputs: "Total Price = $100.00, GST Rate = 18%, Mode = Remove"
    calculation: "Base Price = 100 / (1 + 0.18) = 100 / 1.18 = $84.75. GST Amount = 100 - 84.75 = $15.25."
    result: "Base Price = $84.75 | GST Amount = $15.25"
faqs:
  - q: "What is the difference between GST inclusive and exclusive prices?"
    a: "A GST-inclusive price already has the tax baked into the number you see — the listed price is the final amount a buyer pays. A GST-exclusive price is the base cost before tax, meaning the GST amount still needs to be added on top to reach the final purchase price. Which one you're working with determines whether you should add or remove tax with this calculator."
  - q: "Can GST rates differ by product?"
    a: "Yes — most countries that use GST apply tiered rates depending on how a product or service is classified, often distinguishing between necessities, standard goods, and luxury items. Common tiers include rates like 5%, 12%, 18%, and 28%, though the exact brackets and what falls into each vary by country."
  - q: "Is GST the same as VAT?"
    a: "In practice, GST (Goods and Services Tax) and VAT (Value Added Tax) work the same way — both are multi-stage, destination-based consumption taxes collected at each stage of a product's value chain but ultimately borne by the end consumer. The two terms are largely interchangeable naming conventions used in different countries."
  - q: "Why can't you just subtract the tax rate to remove GST from a price?"
    a: "Because the tax rate applies to the base price, not to the total that already includes tax. If an 18% tax on a $100 base price produces a $118 total, simply subtracting 18% of $118 ($21.24) would give $96.76 — not the correct $100 base price. The correct approach divides the total by (1 + rate/100) instead, which correctly reverses the original calculation."
references:
  - "https://www.gst.gov.in"
formulaDescription: "Adding GST multiplies the base price by the tax rate to find the tax amount, then adds that to the base price. Removing GST works in reverse: since the tax-inclusive total already equals the base price multiplied by (1 + rate), dividing the total by that same factor recovers the original base price, and the tax amount is whatever's left over."
variablesExplained:
  - name: "Base Price"
    description: "The price before tax is applied (used when adding GST)."
  - name: "Total Price"
    description: "The tax-inclusive final price (used when removing GST)."
  - name: "GST Rate"
    description: "The applicable tax rate, as a percentage."
stepByStep: "Choose whether you want to add GST to a base price or remove GST from a tax-inclusive total, enter the amount and the applicable GST rate, and the calculator returns the GST amount alongside either the total price (when adding) or the base price (when removing)."
realWorldUses: "Businesses use this kind of calculation to quote tax-inclusive prices to customers or to work out the tax-exclusive base cost of an item for accounting and invoicing purposes; shoppers use it to check whether a receipt's tax breakdown adds up correctly."
commonMistakes:
  - "Subtracting the tax rate directly from a tax-inclusive total instead of dividing by (1 + rate/100), which produces a base price that's too low."
  - "Applying the wrong tax rate tier to a product that actually falls into a different rate bracket under the local tax schedule."
---

# GST Calculator – Add or Remove Goods and Services Tax

**Goods and Services Tax (GST)** is an indirect consumption tax included in the final price consumers pay for goods and services, though it's collected and remitted to the government by the businesses selling them. This calculator handles both directions of the calculation: adding GST to a tax-exclusive base price, or working backward to strip GST out of a tax-inclusive total.

## The GST Formulas

**Adding GST (tax-exclusive price):**

$$\text{GST Amount} = \text{Base Price} \times \frac{\text{GST Rate}}{100}$$
$$\text{Total Price} = \text{Base Price} + \text{GST Amount}$$

**Removing GST (tax-inclusive price):**

$$\text{Base Price} = \frac{\text{Total Price}}{1 + \dfrac{\text{GST Rate}}{100}}$$
$$\text{GST Amount} = \text{Total Price} - \text{Base Price}$$

## Worked Examples

**Adding 18% GST to a $100 base price:**
1. GST Amount = $100 \times (18 \div 100) = \$18.00$
2. Total Price = $100 + 18 = \$118.00$

**Removing 18% GST from a $100 tax-inclusive price:**
1. Base Price = $100 \div 1.18 \approx \$84.75$
2. GST Amount = $100 - 84.75 = \$15.25$

## Why You Can't Just Subtract the Rate

It's tempting to remove GST from a tax-inclusive price by simply subtracting the tax rate — but that gives the wrong answer. Taking 18% straight off $118 leaves $96.76, not the correct $100 base price that produced that $118 total in the first place. The issue is that the tax rate applies to the *base* price, not to the already-taxed total, so removing it correctly requires dividing by $(1 + \text{rate} \div 100)$ rather than subtracting a percentage of the total.

## GST Rate Tiers

Many countries that use GST apply different rates depending on how a product is classified — necessities are often taxed lower, luxury goods higher. Applying different rate tiers to a flat $1,000 base price:

| GST Rate | GST Amount | Total Price |
| :--- | :---: | :---: |
| 5% | $50.00 | $1,050.00 |
| 12% | $120.00 | $1,120.00 |
| 18% | $180.00 | $1,180.00 |
| 28% | $280.00 | $1,280.00 |

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator applies a single flat rate to a single amount. It doesn't handle invoices with multiple line items taxed at different rates, tax exemptions, or jurisdiction-specific rules like reverse charge or input tax credits.
