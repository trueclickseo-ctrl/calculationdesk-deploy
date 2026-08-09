---
title: "Percentage Decrease Calculator – Subtract a Percentage from a Value"
seoTitle: "Percentage Decrease Calculator | CalculationDesk"
metaDescription: "Enter an original value and a percentage decrease to find the final value and the amount subtracted."
category: "mathematics"
subcategory: "percentage-calculators"
tags: ["percentage decrease calculator", "percent decrease formula", "price decrease calculator", "discount percentage calculator"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator subtracts a percentage from an original value and returns both the final, reduced value and the amount that was subtracted."
  quickAnswer: "Decreasing 100 by 20% gives a final value of 80, a decrease of 20."
  formulaSummary: "Final value = Original - (Original x Decrease% / 100). Amount decreased = Original x Decrease% / 100."
  whenToUse: "Use it whenever you know a starting value and a percentage decrease and need the resulting amount — a price markdown, a pay cut, or a quantity reduction."
  whoShouldUse: "Anyone applying a known percentage decrease to a price, salary, or quantity."
  limitations: "This calculates a single flat percentage decrease applied once. It does not compound multiple decreases — applying two 10% decreases in sequence doesn't equal a 20% total decrease, since the second decrease is calculated on the already-reduced value, not the original."
  keyTakeaways:
    - "A percentage decrease multiplies the original by (1 - rate); it isn't simply subtracted as a raw number from the original value."
    - "Two sequential percentage decreases don't add together — a 10% decrease followed by another 10% decrease is a 19% total decrease, not 20%, because the second decrease applies to a smaller starting value."
    - "The amount decreased and the final value always add back up to the original value, which is a quick way to sanity-check a result."
peopleAlsoAsk:
  - "How do you calculate a 20% decrease?"
  - "What is the formula for percentage decrease?"
  - "Do two 10% decreases equal a 20% decrease?"
  - "How is percentage decrease different from percentage points?"
examples:
  - title: "20% decrease on 100"
    inputs: "Original value = 100, Decrease = 20%"
    calculation: "Amount decreased = 100 x 0.20 = 20. Final value = 100 - 20 = 80"
    result: "Final value = 80.00, Amount decreased = 20.00"
  - title: "15% decrease on 250"
    inputs: "Original value = 250, Decrease = 15%"
    calculation: "Amount decreased = 250 x 0.15 = 37.5. Final value = 250 - 37.5 = 212.5"
    result: "Final value = 212.50, Amount decreased = 37.50"
faqs:
  - q: "How do you calculate a 20% decrease?"
    a: "Multiply the original value by 0.20 to find the amount decreased, then subtract that from the original. For 100, that's 100 - (100 x 0.20) = 100 - 20 = 80. Equivalently, you can multiply directly by 0.80 (1 minus the decrease rate) to jump straight to the final value."
  - q: "What is the formula for percentage decrease?"
    a: "Final value = Original - (Original x Decrease% / 100). If you only need the amount subtracted rather than the final value, that's just Original x Decrease% / 100 on its own."
  - q: "Do two 10% decreases equal a 20% decrease?"
    a: "No — they compound to a 19% total decrease. The first 10% brings 100 down to 90; the second 10% is calculated on 90, not the original 100, subtracting 9 to reach 81 — a 19-point drop from the original, not 20."
  - q: "How is percentage decrease different from percentage points?"
    a: "Percentage decrease is a relative change — dropping from 50 to 40 is a 20% decrease. Percentage points measure the raw gap between two percentages directly — dropping from 50% to 40% is a 10 percentage point decrease, which is also a 20% relative decrease in this case, but the two describe different things and aren't always numerically the same."
references:
  - "https://www.mathsisfun.com/numbers/percentage-change.html"
formulaDescription: "Subtracting a percentage from a value means multiplying it by 1 minus that percentage expressed as a decimal — a 20% decrease means the final value is 80% of the original, equivalent to multiplying by 0.80."
variablesExplained:
  - name: "Original value"
    description: "The starting amount before the decrease is applied."
  - name: "Decrease %"
    description: "The percentage to subtract, entered as a whole number (20 for 20%)."
stepByStep: "Enter the original value and the percentage decrease. The calculator multiplies the original by the decrease percentage to find the amount subtracted, then subtracts that from the original to get the final value."
realWorldUses: "This same math applies to a price markdown from a retailer, a reduction in hours or pay, or any scenario where a rate is subtracted from an existing amount rather than added on top of it."
commonMistakes:
  - "Applying a second percentage decrease directly to the original value instead of the already-reduced value — two sequential 10% decreases compound to 19%, not 20%."
  - "Confusing the final value (what this calculator returns) with the amount decreased — if you only need the dollar or unit amount subtracted, that's the 'amount decreased' figure, not the final value."
---

# Percentage Decrease Calculator

Enter an original value and a percentage, and this calculator returns the final value after that percentage is subtracted, along with the exact amount taken off.

## The formula

**Final value = Original × (1 − Decrease% / 100)**. A 20% decrease on 100 means multiplying by 0.80, giving 80 — the amount subtracted is 20, which is exactly 20% of the original 100.

## Where people get tripped up: stacking decreases

Percentage decreases don't subtract together in a simple way. If a price drops 10% one month and another 10% the next, the total drop over both months is 19%, not 20% — because the second 10% is calculated on the already-lower price, not the original one. Each decrease has to be applied to the running value in sequence: 100 → 90 (first 10%) → 81 (second 10%, applied to 90, not 100). This is the mirror image of how compound growth works, just running in reverse.

## A quick sanity check

The final value and the amount decreased always add back up to the original value — for the 100-with-20%-decrease example, 80 (final value) plus 20 (amount decreased) equals the original 100. That relationship is a fast way to check that a calculation was applied correctly.
