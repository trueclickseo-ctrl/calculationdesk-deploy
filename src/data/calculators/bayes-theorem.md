---
title: "Bayes' Theorem Calculator – Update Probability with New Evidence"
seoTitle: "Bayes' Theorem Calculator | CalculationDesk"
metaDescription: "Calculate a revised (posterior) probability using Bayes' theorem, given a prior probability, sensitivity, and false positive rate."
category: "mathematics"
subcategory: "probability-calculators"
tags: ["bayes theorem calculator", "posterior probability calculator", "conditional probability calculator", "bayesian probability calculator"]
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
  definition: "This calculator applies Bayes' theorem to compute the revised probability of an event (like having a condition) after observing new evidence (like a positive test), given the event's prior probability, the test's sensitivity, and its false positive rate."
  quickAnswer: "For a condition with a 1% prior probability, a test with 99% sensitivity, and a 5% false positive rate, a positive result raises the probability of actually having the condition to about 16.67%."
  formulaSummary: "P(A|B) = [P(B|A) x P(A)] / P(B), where P(B) = P(B|A) x P(A) + P(B|not A) x P(not A)."
  whenToUse: "Use it whenever you need to update a probability estimate after new evidence comes in — most commonly interpreting a medical test result, but the same logic applies to any diagnostic or screening scenario."
  whoShouldUse: "Students learning conditional probability, and anyone trying to correctly interpret a positive test result for a rare condition."
  limitations: "The result is only as accurate as the three input probabilities you provide — real-world sensitivity, false positive rate, and especially prior probability (base rate) can be uncertain or context-dependent, and using rough estimates for them will produce a rough estimate here."
  keyTakeaways:
    - "For rare conditions, even a fairly accurate test can produce a posterior probability far lower than people intuitively expect — this is sometimes called the base rate fallacy."
    - "The prior probability (how common the condition is before testing) matters just as much as the test's own accuracy in determining what a positive result actually means."
    - "A 99%-accurate test on a 1%-prevalence condition still leaves most positive results as false positives, because there are simply far more people without the condition to draw false positives from."
peopleAlsoAsk:
  - "Why does a positive test result not mean you definitely have the condition?"
  - "What is the base rate fallacy?"
  - "What's the difference between sensitivity and false positive rate?"
  - "Does a more sensitive test always give a more reliable positive result?"
examples:
  - title: "1% prior, 99% sensitivity, 5% false positive rate"
    inputs: "Prior probability P(A) = 1%, Sensitivity P(B|A) = 99%, False positive rate P(B|not A) = 5%"
    calculation: "P(not A) = 1 - 0.01 = 0.99. P(B) = (0.99 x 0.01) + (0.05 x 0.99) = 0.0099 + 0.0495 = 0.0594. P(A|B) = (0.99 x 0.01) / 0.0594 = 0.0099/0.0594 = 0.1667"
    result: "P(A|B) = 16.67% — a positive result raises the probability from 1% to about 16.67%"
faqs:
  - q: "Why does a positive test result not mean you definitely have the condition?"
    a: "Because a positive result can come from two sources: correctly detecting someone who actually has the condition (true positive), or incorrectly flagging someone who doesn't (false positive). When the condition is rare, there are far more people without it in the population, so even a small false positive rate applied to that much larger group can produce more false positives than true positives among all positive results — which is exactly what Bayes' theorem calculates."
  - q: "What is the base rate fallacy?"
    a: "It's the common mistake of ignoring how rare or common something is beforehand (the base rate, or prior probability) and judging a positive test result only by the test's own accuracy. A 99%-accurate test sounds very reliable, but for a condition with only 1% prevalence, this example shows a positive result still only means about a 16.67% actual chance of having the condition — much lower than the test's accuracy alone would suggest."
  - q: "What's the difference between sensitivity and false positive rate?"
    a: "Sensitivity (also called the true positive rate) is the probability the test correctly comes back positive when someone actually has the condition. False positive rate is the probability the test incorrectly comes back positive when someone does not have the condition. Both numbers matter to interpreting a result — a test can have high sensitivity but still produce mostly false positives among all its positive results if the condition is rare enough."
  - q: "Does a more sensitive test always give a more reliable positive result?"
    a: "Not necessarily — sensitivity alone doesn't determine how trustworthy a positive result is. The false positive rate and, especially, the prior probability (how common the condition is) both play a major role. A highly sensitive test with even a modest false positive rate can still produce mostly false positives for a rare condition, which is why all three inputs matter together rather than any one in isolation."
references:
  - "https://plato.stanford.edu/entries/bayes-theorem/"
formulaDescription: "Bayes' theorem starts with a prior belief about how likely an event is (P(A)), then updates it based on new evidence (B). The denominator, P(B), represents the total probability of observing the evidence at all — combining the chance of a true positive (evidence given the event happened) and a false positive (evidence given it didn't). Dividing the true-positive contribution by this total gives the revised, evidence-adjusted probability."
variablesExplained:
  - name: "Prior probability P(A)"
    description: "The probability of the event before observing any new evidence — for a medical test, this is the condition's prevalence in the relevant population."
  - name: "Sensitivity P(B|A)"
    description: "The probability of observing the evidence given that the event is true — for a medical test, the chance of a positive result given the patient actually has the condition."
  - name: "False positive rate P(B|not A)"
    description: "The probability of observing the evidence given that the event is false — for a medical test, the chance of a positive result given the patient does not have the condition."
stepByStep: "Enter the prior probability of the event, the sensitivity (chance of the evidence given the event is true), and the false positive rate (chance of the evidence given the event is false). The calculator computes the revised posterior probability of the event given that the evidence was observed."
realWorldUses: "This is most commonly used to correctly interpret medical test results — understanding that a positive result for a rare condition doesn't mean near-certainty of having it — but the same math applies to spam filtering, fraud detection, and any scenario where a signal needs to be weighed against how common the underlying event actually is."
commonMistakes:
  - "Assuming a positive test result directly reflects the test's stated accuracy (like 99%), without accounting for how rare the condition is in the first place."
  - "Confusing sensitivity (chance of positive given you have it) with the reverse question Bayes' theorem actually answers (chance you have it given a positive result) — these are not the same number."
---

# Bayes' Theorem Calculator

Enter a prior probability, a test's sensitivity, and its false positive rate, and this calculator computes the revised (posterior) probability of the event given a positive result.

## Formula

**P(A|B) = [P(B|A) × P(A)] / P(B)**, where **P(B) = P(B|A) × P(A) + P(B|not A) × P(not A)**.

For a condition with 1% prior probability, 99% sensitivity, and a 5% false positive rate: P(B) = (0.99 × 0.01) + (0.05 × 0.99) = 0.0594, and P(A|B) = 0.0099 / 0.0594 ≈ 16.67%. A positive result raises the probability from 1% to about 16.67% — well below what the test's 99% sensitivity alone might suggest.

## Why a positive result isn't proof

A positive result can come from a true positive (correctly catching someone with the condition) or a false positive (incorrectly flagging someone without it). When a condition is rare, the pool of people without it is much larger, so even a small false positive rate can generate more false positives than true positives among all positive results — that's exactly what Bayes' theorem is calculating.

## The base rate matters as much as the test

This is the base rate fallacy in action: judging a test purely by its accuracy while ignoring how common the condition actually is. A 99%-sensitive test sounds highly reliable, but paired with a 1% base rate, a positive result still only means about a 16.67% real chance of having the condition — the prior probability pulls the answer down substantially from what intuition might expect.
