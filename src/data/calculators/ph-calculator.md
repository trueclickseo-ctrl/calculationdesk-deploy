---
title: "pH Calculator – Find pH and pOH from Hydrogen Ion Concentration"
seoTitle: "pH Calculator - pH and pOH from [H+] | CalculationDesk"
metaDescription: "Enter a solution's hydrogen ion concentration in mol/L to get its pH and pOH, using the standard pH = -log10[H+] definition."
category: "science"
subcategory: "chemistry-calculators"
tags: ["ph calculator", "poh calculator", "hydrogen ion concentration", "acidity calculator", "log10 ph formula"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "informational"
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
  definition: "This calculator finds a solution's pH and pOH from its hydrogen ion concentration, using the standard logarithmic pH definition."
  quickAnswer: "A hydrogen ion concentration of 1x10^-5 mol/L gives a pH of 5.00 and a pOH of 9.00."
  formulaSummary: "pH = -log10[H+]  |  pOH = 14 - pH (at 25 degrees C)"
  whenToUse: "Use it whenever you know a solution's molar hydrogen ion concentration and need the pH, or need to double-check a lab result against the definition."
  whoShouldUse: "Chemistry students, lab technicians, and anyone checking a titration or water-quality reading by hand."
  limitations: "The pOH = 14 - pH relationship assumes the standard 25 degrees C water dissociation constant (Kw = 1x10^-14). At other temperatures Kw shifts, so pOH would need to be derived from Kw directly rather than the simple 14 - pH shortcut."
  keyTakeaways:
    - "pH is a negative base-10 logarithm, so small changes in concentration produce big swings in pH."
    - "A pH of 7 is neutral only at 25 degrees C, where [H+] = [OH-] = 1x10^-7 mol/L."
    - "Each one-unit drop in pH means a tenfold increase in hydrogen ion concentration."
peopleAlsoAsk:
  - "What is the formula for pH?"
  - "What is the difference between pH and pOH?"
  - "Why is pH measured on a log scale?"
  - "What pH is considered neutral?"
examples:
  - title: "Neutral water"
    inputs: "[H+] = 1 x 10^-7 mol/L"
    calculation: "pH = -log10(1x10^-7) = 7.00. pOH = 14 - 7.00 = 7.00."
    result: "pH = 7.00, pOH = 7.00 (neutral, matching pure water at 25 degrees C)"
  - title: "Mildly acidic solution"
    inputs: "[H+] = 1 x 10^-5 mol/L"
    calculation: "pH = -log10(1x10^-5) = 5.00. pOH = 14 - 5.00 = 9.00."
    result: "pH = 5.00, pOH = 9.00 (acidic, roughly the acidity of black coffee)"
faqs:
  - q: "What is the formula for pH?"
    a: "pH = -log10[H+], where [H+] is the hydrogen ion concentration in moles per liter. Taking the negative log turns a very small number, like 0.0000001, into a manageable value like 7."
  - q: "What is the difference between pH and pOH?"
    a: "pH measures hydrogen ion (H+) concentration and pOH measures hydroxide ion (OH-) concentration. At 25 degrees C they always add up to 14, so once you know one you can find the other by subtraction."
  - q: "Why is pH measured on a log scale?"
    a: "Hydrogen ion concentrations in everyday solutions range from about 1 mol/L down to 1x10^-14 mol/L — too wide a span to plot conveniently. The logarithmic scale compresses that range into the familiar 0-14 pH scale, but it also means each whole-number step is a tenfold change in concentration, not a linear one."
  - q: "What pH is considered neutral?"
    a: "pH 7 is neutral at 25 degrees C, meaning hydrogen and hydroxide ion concentrations are equal. Below 7 is acidic, above 7 is basic (alkaline). Neutral shifts slightly at other temperatures because water's dissociation constant is temperature-dependent."
references:
  - "https://www.epa.gov/caddis-vol2/ph"
formulaDescription: "pH compresses a wide range of hydrogen ion concentrations into a simple 0-14 scale using a base-10 logarithm. Because it's logarithmic, a pH drop of just one unit means the solution is ten times more acidic, not twice as acidic."
variablesExplained:
  - name: "[H+]"
    description: "Hydrogen ion concentration in moles per liter (mol/L). This is the one input the calculator needs."
  - name: "pH"
    description: "The negative base-10 logarithm of [H+]. Lower values are more acidic, higher values are more basic."
  - name: "pOH"
    description: "The negative base-10 logarithm of hydroxide ion concentration, derived here as 14 minus pH at standard temperature."
stepByStep: "Enter the hydrogen ion concentration in mol/L (for example, 0.0001 for 1x10^-4). The calculator takes the base-10 logarithm of that number and negates it to get pH, then subtracts pH from 14 to get pOH."
realWorldUses: "Lab technicians use this relationship to sanity-check a pH meter reading against a known concentration, and chemistry students use it to move between the two common ways acidity gets expressed in coursework and titration problems."
commonMistakes:
  - "Entering the concentration in the wrong units — this calculator expects moles per liter, not milligrams per liter or a percentage."
  - "Forgetting that the pH + pOH = 14 shortcut only holds at 25 degrees C; at other temperatures it needs to be derived from the actual value of Kw."
---

# pH Calculator

pH tells you how acidic or basic a solution is by measuring its hydrogen ion concentration on a logarithmic scale. Enter the concentration in moles per liter and this calculator returns both pH and pOH.

## The formula

pH is defined as the negative base-10 logarithm of hydrogen ion concentration: **pH = -log10[H+]**. Because it's a log scale, each one-unit drop in pH represents a tenfold increase in hydrogen ion concentration — a solution at pH 4 isn't twice as acidic as one at pH 8, it's ten thousand times more acidic.

pOH follows the same logic for hydroxide ions, and at the standard reference temperature of 25°C, the two always sum to 14: **pOH = 14 - pH**. That relationship comes from water's dissociation constant (Kw = 1×10⁻¹⁴ at 25°C) and shifts slightly at other temperatures.

## Reading the scale

A pH of 7 is neutral — hydrogen and hydroxide ion concentrations are equal, as in pure water. Values below 7 are acidic (more H+ than OH-); values above 7 are basic, or alkaline (more OH- than H+). Common reference points: lemon juice sits around pH 2, black coffee around pH 5, seawater around pH 8, and household ammonia around pH 11.
