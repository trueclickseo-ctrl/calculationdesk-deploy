---
title: "Grain Conversion Calculator – Convert Bushels, Pounds, and Tons"
seoTitle: "Grain Conversion Calculator - Bushels to Tons | CalculationDesk"
metaDescription: "Convert grain quantities between bushels, pounds, metric tons, and short tons using crop-specific standard test weights."
category: "agriculture"
subcategory: "crop-calculators"
tags: ["grain conversion calculator", "bushels to pounds", "bushels to metric tons", "grain weight calculator"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator converts grain quantities between bushels, pounds, metric tons, and short tons, using the standard test weight per bushel for each crop type."
  quickAnswer: "1,000 bushels of wheat (60 lbs/bushel) equals 60,000 pounds, or about 27.22 metric tons."
  formulaSummary: "Total pounds = quantity in the entered unit converted using the crop's standard lbs/bushel weight (or direct ton conversions: 1 metric ton = 2,204.62 lbs, 1 short ton = 2,000 lbs). All other units are then derived from total pounds."
  whenToUse: "Use it when buying, selling, or reporting grain in a different unit than the one you're working with, since bushel weight varies by crop."
  whoShouldUse: "Farmers, grain buyers, and anyone converting crop quantities for sale, storage, or shipping calculations."
  limitations: "This uses standard published test weights per bushel for each crop (56 lbs for corn, 60 lbs for wheat/soybeans, 48 lbs for barley, 32 lbs for oats). Actual harvested grain can weigh more or less per bushel depending on moisture content and grain quality, which affects real-world conversions at the elevator."
  keyTakeaways:
    - "A bushel is a unit of volume, not weight — that's why different grains have different standard pound-per-bushel weights."
    - "Selecting the correct crop type matters: converting the same bushel quantity of wheat versus oats gives very different pound totals, since their test weights differ by nearly a factor of two."
    - "Metric tons (2,204.62 lbs) and short tons (2,000 lbs, the standard US ton) are different units — mixing them up in a large grain transaction can meaningfully misstate quantity."
peopleAlsoAsk:
  - "Why is a bushel of wheat heavier than a bushel of oats?"
  - "What is grain test weight?"
  - "How many pounds are in a metric ton vs. a short ton?"
  - "Does actual harvested grain always match the standard bushel weight?"
examples:
  - title: "1,000 bushels of wheat to metric tons"
    inputs: "Quantity = 1,000 bushels, Grain type = Wheat (60 lbs/bushel)"
    calculation: "Total pounds = 1,000 x 60 = 60,000 lbs. Metric tons = 60,000 / 2,204.62262 = 27.22 metric tons"
    result: "60,000 lbs = 27.22 metric tons = 30.00 short tons = 1,000.00 bushels"
faqs:
  - q: "Why is a bushel of wheat heavier than a bushel of oats?"
    a: "A bushel measures volume, not weight, so the actual weight it holds depends on how dense the grain is. Wheat kernels pack more densely than oats, so a bushel of wheat (60 lbs standard) weighs almost twice as much as a bushel of oats (32 lbs standard) even though both fill the same volume."
  - q: "What is grain test weight?"
    a: "Test weight is the measured weight of grain per bushel, expressed in pounds. Grain elevators use standard test weights to buy and sell grain, and they'll often adjust the price if a delivered crop's actual test weight is lighter than standard — which can happen due to disease, drought stress, or immature kernels."
  - q: "How many pounds are in a metric ton vs. a short ton?"
    a: "A metric ton equals exactly 1,000 kilograms, which converts to about 2,204.62 pounds. A short ton — the standard ton used in the US — is exactly 2,000 pounds. The two are close but not the same, and mixing them up in a large grain deal can meaningfully change the actual quantity involved."
  - q: "Does actual harvested grain always match the standard bushel weight?"
    a: "Not exactly. Standard test weights (56 lbs for corn, 60 for wheat, and so on) are reference values used for conversions and trading. Real harvested grain can weigh somewhat more or less per bushel depending on moisture content, variety, and growing conditions, so an elevator's actual scale weight for a specific delivery may differ slightly from a standard-weight conversion like this one."
references:
  - "https://www.ers.usda.gov/webdocs/publications/41880/33132_ah697_002.pdf"
formulaDescription: "The calculator first converts your entered quantity to total pounds — using the crop's standard weight per bushel if you entered bushels, or a direct conversion factor if you entered metric or short tons. From that pound total, it then derives the equivalent amount in every other unit (bushels using the same crop-specific weight, and both ton units using their fixed conversion factors)."
variablesExplained:
  - name: "Quantity"
    description: "The amount of grain you're converting, in your selected source unit."
  - name: "Grain type"
    description: "The crop being converted — this determines the standard pounds-per-bushel weight used, since different grains have different bushel weights (corn and rye at 56 lbs, wheat and soybeans at 60 lbs, barley at 48 lbs, oats at 32 lbs)."
  - name: "Source unit"
    description: "The unit your entered quantity is currently in — bushels, pounds, metric tons, or short tons."
stepByStep: "Select the grain type, enter your quantity, and choose the unit that quantity is currently in. The calculator converts your entry to total pounds using the crop's standard bushel weight (or a direct ton conversion), then displays the equivalent amount in bushels, pounds, metric tons, and short tons."
realWorldUses: "Farmers and grain buyers use conversions like this constantly — translating a truckload weighed in pounds back into bushels for yield records, or converting a domestic bushel-based harvest total into metric tons for an export contract priced that way."
commonMistakes:
  - "Selecting the wrong grain type before converting, which produces a meaningfully wrong pound total since bushel weights vary significantly by crop."
  - "Confusing metric tons and short tons, which differ by about 10% — a large enough gap to matter in a sizeable grain transaction."
---

# Grain Conversion Calculator

Enter a grain quantity, pick the crop, and this calculator converts between bushels, pounds, metric tons, and short tons using each crop's standard test weight.

## Why grain type matters

A bushel is a measure of volume, not weight, so the same bushel of different grains weighs different amounts depending on how densely the kernels pack. Standard weights per bushel are 56 lbs for corn and rye, 60 lbs for wheat and soybeans, 48 lbs for barley, and 32 lbs for oats — nearly a two-to-one spread between the heaviest and lightest common grains. Getting the crop type right before converting matters as much as getting the quantity right.

## Formula

The calculator converts your entry to total pounds first — quantity times the crop's lbs-per-bushel weight if you entered bushels, or a fixed factor (2,204.62262 lbs per metric ton, 2,000 lbs per short ton) if you entered tons. From that pound total, every other unit is derived directly.

For 1,000 bushels of wheat: total pounds = 1,000 × 60 = 60,000 lbs, which converts to 27.22 metric tons or 30.00 short tons.

## Metric tons vs. short tons

These are close in size but not the same unit. A metric ton is 2,204.62 pounds; a short ton (the standard US ton) is exactly 2,000 pounds — about a 10% difference. In a sizeable grain transaction, using the wrong ton unit can meaningfully misstate the actual quantity being bought, sold, or shipped.

## Standard weights vs. actual harvest weight

The pound-per-bushel figures used here are published standard test weights, used as reference values for trading and conversion. Real harvested grain can come in slightly heavier or lighter per bushel depending on moisture content and grain condition — which is why elevators typically weigh grain on a scale and may adjust pricing if the delivered crop's actual test weight falls below standard.
