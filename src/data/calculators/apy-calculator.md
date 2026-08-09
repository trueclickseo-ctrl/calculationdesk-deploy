---
title: "APY Calculator – Convert a Nominal Rate to Annual Percentage Yield"
seoTitle: "APY Calculator - Nominal Rate to APY | CalculationDesk"
metaDescription: "Enter a nominal interest rate and compounding frequency to see the actual annual percentage yield (APY), accounting for compounding."
category: "finance"
subcategory: "savings-calculators"
tags: ["apy calculator", "annual percentage yield", "apy vs apr", "compound interest rate"]
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
  definition: "This calculator converts a nominal (stated) interest rate into its Annual Percentage Yield (APY), which accounts for how often interest compounds over the year."
  quickAnswer: "A 5% nominal rate compounded monthly works out to a 5.1162% APY."
  formulaSummary: "APY = (1 + r/n)^n - 1, where r is the nominal annual rate (as a decimal) and n is the number of compounding periods per year."
  whenToUse: "Use it to compare savings accounts or CDs that advertise a nominal rate with different compounding frequencies — the account with more frequent compounding yields more even at the same stated rate."
  whoShouldUse: "Anyone comparing savings products, CDs, or money market accounts that quote a nominal interest rate."
  limitations: "This assumes the rate stays fixed all year and that all interest is reinvested (compounded) rather than withdrawn. It doesn't include fees, minimum balance requirements, or promotional rate periods that revert after an introductory term."
  keyTakeaways:
    - "APY is always equal to or higher than the nominal rate, because it captures the effect of compounding within the year."
    - "The more frequently interest compounds (daily vs. monthly vs. annually), the bigger the gap between the nominal rate and the APY."
    - "Banks are required to disclose APY, not just the nominal rate, specifically so savers can compare accounts on equal terms."
peopleAlsoAsk:
  - "What's the difference between APY and APR?"
  - "Why is APY higher than the nominal interest rate?"
  - "Does more frequent compounding always mean a meaningfully higher APY?"
  - "Is APY the same as the interest I'll actually earn?"
examples:
  - title: "5% nominal, compounded monthly"
    inputs: "Nominal rate = 5%, compounding = monthly (12 periods/year)"
    calculation: "APY = (1 + 0.05/12)^12 - 1 = 1.051162... - 1 = 0.051162 = 5.1162%"
    result: "APY = 5.1162%"
  - title: "6% nominal, compounded daily"
    inputs: "Nominal rate = 6%, compounding = daily (365 periods/year)"
    calculation: "APY = (1 + 0.06/365)^365 - 1 = 0.061831 = 6.1831%"
    result: "APY = 6.1831%"
faqs:
  - q: "What's the difference between APY and APR?"
    a: "APY (Annual Percentage Yield) applies to money you earn, like savings accounts, and factors in compounding. APR (Annual Percentage Rate) applies to money you borrow and, in its simple form, does not factor in compounding — which is part of why the two aren't directly comparable even when the numbers look similar."
  - q: "Why is APY higher than the nominal interest rate?"
    a: "Because compounding means you earn interest on interest already credited during the year, not just on your original balance. The nominal rate ignores this; APY captures it. The two are only equal when compounding happens once a year."
  - q: "Does more frequent compounding always mean a meaningfully higher APY?"
    a: "The gap shrinks the more often you already compound. Going from annual to monthly compounding makes a real difference, but going from daily to continuous compounding adds only a tiny fraction more — most of the compounding benefit is captured well before you reach daily."
  - q: "Is APY the same as the interest I'll actually earn?"
    a: "It's the annualized rate assuming your rate and balance stay constant for a full year and all interest is reinvested. If you deposit or withdraw partway through the year, or the rate changes (common with promotional or variable-rate accounts), your actual earnings will differ from a simple APY x balance calculation."
references:
  - "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-fixed-annual-percentage-rate-apr-and-a-fixed-interest-rate-en-733/"
formulaDescription: "The nominal rate gets divided by the number of compounding periods per year to get the rate per period, that period rate is added to 1 and raised to the power of the number of periods, and 1 is subtracted back out to isolate the actual annual growth rate — which is the APY."
variablesExplained:
  - name: "Nominal rate"
    description: "The stated annual interest rate, before accounting for compounding, entered as a percentage."
  - name: "Compounding frequency"
    description: "How many times per year interest is calculated and added to the balance — annually, semi-annually, quarterly, monthly, or daily."
stepByStep: "Enter the nominal annual rate and pick how often it compounds. The calculator divides the rate by the compounding frequency to get a per-period rate, compounds that rate over all the periods in a year, and converts the result back to an annual percentage."
realWorldUses: "This is the calculation banks use to produce the APY figure they're required to disclose on savings accounts and CDs, so you can use it to sanity-check an advertised APY or to compare two accounts that quote nominal rates with different compounding schedules."
commonMistakes:
  - "Comparing a savings account's nominal rate directly against another account's advertised APY — they're not on the same basis unless you convert one to match the other."
  - "Assuming APY represents guaranteed earnings on a balance that changes throughout the year — it's an annualized rate assuming a constant balance and rate for the full year."
---

# APY Calculator

Banks often advertise both a nominal interest rate and an APY, and the two numbers aren't the same thing. This calculator does the conversion: given a nominal rate and how often it compounds, it returns the actual annual percentage yield you'd earn if the rate and balance stayed constant for a year.

## Why APY is higher than the nominal rate

A 5% nominal rate compounded monthly doesn't just add 5% once a year — it adds roughly 0.417% every month, and each month's interest then earns interest of its own for the rest of the year. That compounding effect pushes the real annual return above 5%, to about 5.1162% in this case. The more often interest compounds, the bigger that gap gets, though it shrinks the closer you get to continuous compounding.

## Formula

**APY = (1 + r/n)ⁿ − 1**, where r is the nominal rate as a decimal and n is the number of compounding periods per year. Dividing the rate by n gives the rate credited each period; raising that plus 1 to the nth power compounds it across the whole year; subtracting 1 converts the result back into a growth rate rather than a balance multiplier.

## Comparing accounts fairly

If one account advertises a 5.05% nominal rate compounded daily and another advertises a flat 5.1% APY, converting the first to its APY (about 5.18%) is the only way to actually tell which one pays more. This is exactly why regulators require APY disclosure — nominal rates alone can make a lower-paying account look competitive with a higher-paying one.
