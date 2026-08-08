---
title: "Odds Calculator – Convert Probability to Betting Odds Formats"
seoTitle: "Odds Calculator - Probability to American, Decimal & Fractional Odds | CalculationDesk"
metaDescription: "Enter a winning probability to get odds in favor, odds against, decimal odds, fractional odds, and American odds — all from one number."
category: "mathematics"
subcategory: "probability-calculators"
tags: ["odds calculator", "probability to odds", "american odds calculator", "decimal odds calculator", "fractional odds converter"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-08"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-08"
nextReviewDate: "2026-11-08"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator converts a winning probability into the four common ways odds get expressed: a ratio in favor, a ratio against, decimal odds, and American (moneyline) odds."
  quickAnswer: "A 25% winning probability converts to odds of 1 to 3 in favor, decimal odds of 4.00, and American odds of +300."
  formulaSummary: "Odds in favor = P / (1-P)  |  Decimal odds = 1 / P  |  American odds = -100 x P/(1-P) if P>=0.5, else +100 x (1-P)/P"
  whenToUse: "Use it to translate between probability and the odds format used by a specific sportsbook or context, or to sanity-check what a quoted line actually implies about likelihood."
  whoShouldUse: "Anyone comparing odds formats across different bookmakers or regions, or converting a probability estimate into a betting line format."
  limitations: "This is a pure mathematical conversion between a stated probability and equivalent odds formats — it does not include a bookmaker's built-in margin (the 'vig' or 'overround'), so real posted odds will imply a probability that is a little higher than the bookmaker's true fair assessment."
  keyTakeaways:
    - "Decimal odds are simply 1 divided by the win probability."
    - "American odds are negative for probabilities above 50% and positive for probabilities below 50%."
    - "This is a fair-odds conversion; real bookmaker odds bake in a margin on top of these numbers."
peopleAlsoAsk:
  - "What is the difference between odds in favor and odds against?"
  - "How do American positive and negative odds differ?"
  - "How do you convert decimal odds to fractional odds?"
  - "What does +300 mean in betting odds?"
examples:
  - title: "25% win probability"
    inputs: "Probability = 25%"
    calculation: "Odds in favor = 0.25 / 0.75 = 1/3 (1 to 3). Decimal odds = 1 / 0.25 = 4.00. Since P < 0.5, American odds = +100 x (0.75/0.25) = +300."
    result: "Odds in favor = 1 to 3, decimal odds = 4.00, American odds = +300"
  - title: "60% win probability"
    inputs: "Probability = 60%"
    calculation: "Odds in favor = 0.60 / 0.40 = 3/2 (3 to 2). Decimal odds = 1 / 0.60 = 1.67. Since P >= 0.5, American odds = -100 x (0.60/0.40) = -150."
    result: "Odds in favor = 3 to 2, decimal odds = 1.67, American odds = -150"
faqs:
  - q: "What is the difference between odds in favor and odds against?"
    a: "Odds in favor compares the chance of the event happening to the chance it doesn't (success:failure). Odds against flips that ratio (failure:success). Sportsbooks typically quote odds against for an underdog and odds-on (favorite) pricing the other way."
  - q: "How do American positive and negative odds differ?"
    a: "Positive odds (like +300) show the profit on a $100 bet if it wins. Negative odds (like -150) show how much you'd need to bet to profit $100. Positive odds always apply to the less-likely outcome (probability under 50%), negative to the more-likely one."
  - q: "How do you convert decimal odds to fractional odds?"
    a: "Subtract 1 from the decimal odds, then express the result as a fraction. Decimal odds of 4.00 become 3.00, written as 3/1. Decimal odds of 1.67 become 0.67, which is close to 2/3."
  - q: "What does +300 mean in betting odds?"
    a: "It means a $100 bet would profit $300 if it wins (returning $400 total). It corresponds to an implied win probability of 25% before accounting for the bookmaker's margin."
references:
  - "https://www.investopedia.com/articles/investing/042115/betting-basics-fractional-decimal-american-moneyline-odds.asp"
formulaDescription: "All four odds formats describe the same underlying probability, just packaged differently for different betting markets — American (moneyline) formats are standard in the US, decimal odds are common in Europe and Australia, and fractional odds are traditional in UK horse racing and bookmaking."
variablesExplained:
  - name: "P"
    description: "The winning probability, entered as a percentage and converted to a decimal (25% becomes 0.25) before the odds formulas are applied."
  - name: "Decimal odds"
    description: "The total payout per $1 staked, including your original stake — simply 1 divided by P."
  - name: "American odds"
    description: "Shown as +N (profit on a $100 bet) for underdogs or -N (stake needed to profit $100) for favorites."
stepByStep: "Enter a winning probability as a percentage between 0 and 100. The calculator converts it to odds in favor and against as a simplified ratio, computes decimal odds as 1 divided by the probability, and computes American odds using the standard favorite/underdog formula depending on whether the probability is above or below 50%."
realWorldUses: "Bettors use this to translate a personal probability estimate into a line they can compare against a posted price, and to move between odds formats when comparing sportsbooks that display different conventions (American vs. decimal vs. fractional)."
commonMistakes:
  - "Treating the output as a bookmaker's actual posted line — real odds include a built-in margin, so a fair 25% probability will usually be posted at slightly worse odds than +300."
  - "Mixing up 'odds in favor' and 'odds against' when reading a ratio — a 1-to-3 ratio in favor is very different from 3-to-1 against, even though they sound similar."
---

# Odds Calculator

Odds and probability describe the same thing in different languages. Enter a winning probability as a percentage, and this calculator translates it into the four formats you'll actually encounter: a ratio in favor, a ratio against, decimal odds, and American (moneyline) odds.

## How each format is built

Decimal odds are the simplest: they're just 1 divided by the probability, and represent the total payout per dollar staked, including your stake back. American odds split into two cases — for anything with a probability at or above 50% (a favorite), the odds are negative and show how much you'd need to risk to profit $100; below 50% (an underdog), the odds are positive and show the profit on a $100 bet.

| Probability | Odds in Favor | Decimal | American |
| :--- | :---: | :---: | :---: |
| 10% | 1 to 9 | 10.00 | +900 |
| 25% | 1 to 3 | 4.00 | +300 |
| 50% | 1 to 1 | 2.00 | +100 / -100 |
| 60% | 3 to 2 | 1.67 | -150 |
| 80% | 4 to 1 | 1.25 | -400 |

## A caveat worth keeping in mind

These are fair-odds conversions of a stated probability — they don't include the margin (often called the "vig" or "overround") that a sportsbook builds into its actual posted lines. If you convert a bookmaker's real odds back into an implied probability, you'll typically find the numbers on both sides of a market add up to slightly more than 100%; that extra percentage is the house's edge, not a mathematical error.
