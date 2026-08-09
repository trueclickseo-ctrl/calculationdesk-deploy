---
title: "Percentage of a Percentage Calculator"
seoTitle: "Percentage of a Percentage Calculator | CalculationDesk"
metaDescription: "Calculate a percentage of another percentage, for compounded or nested percentage problems."
category: "math"
subcategory: "percentage-calculators"
tags: ["percentage of a percentage calculator", "compound percentage calculator", "nested percentage calculator", "percent of percent"]
priority: "medium"
importance: 5
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
  definition: "This calculator finds what one percentage represents when applied to another percentage — a nested or compounded percentage calculation."
  quickAnswer: "50% of 20% is exactly 10%."
  formulaSummary: "Combined Percent = (Percent A / 100) x Percent B."
  whenToUse: "Use it when a problem involves finding a percentage of an already-percentage-based quantity, such as figuring out what fraction of a total something represents after two successive percentage reductions or allocations."
  whoShouldUse: "Students and anyone working through nested or multi-step percentage problems."
  limitations: "This calculates a single nested percentage step (a percentage of a percentage) — problems involving three or more successive percentage steps require applying this same logic repeatedly, chaining each result into the next calculation."
  keyTakeaways:
    - "Taking a percentage of a percentage always results in a smaller combined percentage than either of the two original percentages alone, since you're finding a fraction of an already-reduced fraction."
    - "This calculation is mathematically identical to simply multiplying the two percentages together as decimals and converting back — 50% of 20% is the same as 0.5 × 20, or equivalently 0.5 × 0.2 × 100."
    - "Nested percentage problems commonly appear in scenarios involving successive discounts, tax-on-tax calculations, or allocating a portion of an already-allocated budget."
peopleAlsoAsk:
  - "How is this different from simply adding two percentages?"
  - "What's a real-world example of a nested percentage problem?"
  - "Why does taking a percentage of a percentage produce a smaller number?"
  - "How would you chain three successive percentages together?"
examples:
  - title: "50% of 20%"
    inputs: "Percentage A = 50%, Percentage B = 20%"
    calculation: "Combined = (50/100) x 20 = 0.5 x 20 = 10"
    result: "Combined Percentage = 10.0%"
faqs:
  - q: "How is this different from simply adding two percentages?"
    a: "Adding two percentages (50% + 20% = 70%) answers a completely different question than finding one percentage of another (50% of 20% = 10%) — addition combines two independent percentage quantities into a total, while this nested calculation finds what fraction one percentage represents of another. Confusing the two operations is a common source of error in multi-step percentage word problems, since the correct operation depends entirely on how the problem is actually phrased."
  - q: "What's a real-world example of a nested percentage problem?"
    a: "A common example is successive discounts: if an item is first discounted 20%, then an additional 10% off is applied to the already-discounted price, the second discount is really '10% of the remaining 80%' rather than a straightforward 30% total discount — working through that chain is exactly the kind of nested percentage calculation this tool handles for a single step. Another example is budget allocation: if a department gets 30% of a company's budget, and a specific project gets 25% of that department's allocation, the project's overall share of the total company budget is 25% of 30%, or 7.5%."
  - q: "Why does taking a percentage of a percentage produce a smaller number?"
    a: "Because you're finding a fraction of a quantity that's already a fraction of the whole, the result is necessarily smaller than either individual percentage (assuming both are under 100%). Taking 50% of something reduces it by half, and then finding 20% of that already-halved value reduces it further still — each successive percentage step shrinks the result relative to the original whole, which is why the combined figure (10%) ends up smaller than both the 50% and the 20% used to calculate it."
  - q: "How would you chain three successive percentages together?"
    a: "The same logic extends naturally: convert each percentage to a decimal, multiply all of them together, and convert the final product back to a percentage by multiplying by 100. For three successive 20% reductions, for instance, you'd calculate 0.8 × 0.8 × 0.8 (since each 20% reduction leaves 80% remaining) to find the final combined remaining percentage, rather than simply adding or averaging the three individual percentages."
references:
  - "https://www.mathsisfun.com/percentage.html"
formulaDescription: "The calculation converts the first percentage to a decimal (dividing by 100), then multiplies it directly by the second percentage value — finding what fraction of the second percentage the first percentage represents, which is the essence of a nested or compounded percentage calculation."
variablesExplained:
  - name: "Percentage A"
    description: "The percentage being applied to the second percentage (the 'of' value)."
  - name: "Percentage B"
    description: "The base percentage that Percentage A is being taken of."
stepByStep: "Enter the two percentages involved in the nested calculation. The calculator converts the first percentage to a decimal and multiplies it by the second percentage to return the combined percentage."
realWorldUses: "This calculation shows up in successive discount problems, tax-on-tax scenarios, budget allocation questions where a portion of an already-allocated amount needs to be found, and various other multi-step percentage problems in finance and everyday math."
commonMistakes:
  - "Adding the two percentages together instead of multiplying them, which answers a different question (combined total) than what a nested 'percentage of a percentage' problem is actually asking for."
  - "Assuming successive percentage discounts or increases simply add together (like assuming two 10% discounts equal a flat 20% discount), when they actually compound multiplicatively and produce a different total than simple addition would suggest."
---

# Percentage of a Percentage Calculator

Enter two percentages, and this calculator returns what the first percentage represents of the second.

## Formula

**Combined Percent = (Percentage A ÷ 100) × Percentage B**

For 50% of 20%: Combined = (50 ÷ 100) × 20 = 0.5 × 20 = 10.0%.

## Not the same as adding

It's tempting to combine two percentages by just adding them, but "50% of 20%" is asking something entirely different than "50% plus 20%." Adding gives 70%; taking a percentage of a percentage gives 10% — a much smaller number, because you're finding a fraction of an already-reduced quantity rather than combining two separate amounts into a total. Getting this distinction right is often the difference between a correct and incorrect answer on multi-step percentage problems.

## Where this shows up without anyone calling it "nested percentages"

Successive discounts are the classic real-world version of this calculation: a 10% discount applied on top of an already-20%-discounted price isn't the same as a flat 30% off, because the second discount only applies to the remaining 80% of the original price. Budget allocations work the same way — a project getting 25% of a department's budget, which itself is 30% of the total company budget, ends up with 7.5% of the overall total, not 55%. Both are just this calculation wearing different clothes.
