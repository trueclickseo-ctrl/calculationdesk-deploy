---
title: "Beer-Lambert Law Calculator – Chemical Absorbance"
seoTitle: "Beer-Lambert Law Calculator | CalculationDesk"
metaDescription: "Calculate light absorbance from molar attenuation coefficient, path length, and concentration using the Beer-Lambert law."
category: "science"
subcategory: "chemistry-calculators"
tags: ["beer lambert law calculator", "absorbance calculator", "molar attenuation coefficient", "spectrophotometry calculator"]
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
  definition: "This calculator computes light absorbance using the Beer-Lambert law, from a substance's molar attenuation coefficient, the light path length through the solution, and the solution's concentration."
  quickAnswer: "A solution with a molar attenuation coefficient of 10, a 1 cm path length, and a concentration of 0.05 M has an absorbance of 0.5."
  formulaSummary: "Absorbance (A) = Molar attenuation coefficient (epsilon) x Path length (b) x Concentration (c)."
  whenToUse: "Use it to predict a spectrophotometer reading for a known solution, or to work backward and find concentration from a measured absorbance."
  whoShouldUse: "Chemistry and biology students and lab technicians using spectrophotometry to measure solution concentrations."
  limitations: "The Beer-Lambert law assumes a linear relationship between absorbance and concentration, which holds well at low-to-moderate concentrations but breaks down at very high concentrations where the linear approximation no longer applies."
  keyTakeaways:
    - "Absorbance is directly proportional to all three variables — doubling either the path length or the concentration doubles the absorbance, since the relationship is a simple product rather than involving any exponential or logarithmic terms."
    - "The molar attenuation coefficient (epsilon) is a fixed property of the specific substance and the specific wavelength of light being used — the same substance can have very different epsilon values at different wavelengths."
    - "This linear relationship breaks down at high concentrations, where absorbance measurements deviate from the ideal Beer-Lambert prediction — a well-known practical limitation when using the equation to determine unknown concentrations."
peopleAlsoAsk:
  - "What does absorbance actually measure?"
  - "Why does the Beer-Lambert law break down at high concentrations?"
  - "How is this equation used to find an unknown concentration?"
  - "What units does absorbance have?"
examples:
  - title: "epsilon = 10, path = 1 cm, concentration = 0.05 M"
    inputs: "Molar attenuation coefficient = 10, Path length = 1 cm, Concentration = 0.05 M"
    calculation: "Absorbance = 10 x 1 x 0.05 = 0.5"
    result: "Absorbance (A) = 0.5"
faqs:
  - q: "What does absorbance actually measure?"
    a: "Absorbance quantifies how much light of a specific wavelength is absorbed as it passes through a solution, compared to how much passes through without absorption. It's a dimensionless (unitless) value on a logarithmic scale relative to light intensity, where higher absorbance means more light is being absorbed by the solution — commonly measured using a spectrophotometer."
  - q: "Why does the Beer-Lambert law break down at high concentrations?"
    a: "At high concentrations, several physical effects start to interfere with the simple linear relationship: molecules of the absorbing substance can interact with each other in ways that change their light-absorbing properties, the light path itself can deviate at high particle density, and instrument-related effects like stray light become more significant relative to the true signal. These deviations mean absorbance measurements at high concentrations tend to read lower than the Beer-Lambert law would predict, which is why calibration curves are typically built and used only within a validated linear range."
  - q: "How is this equation used to find an unknown concentration?"
    a: "If the molar attenuation coefficient and path length are known (or a calibration curve has been built from known-concentration standards), a measured absorbance can be rearranged into the equation to solve for concentration: Concentration = Absorbance / (epsilon x path length). This is the basis of using spectrophotometry to quantify how much of a substance is present in an unknown sample."
  - q: "What units does absorbance have?"
    a: "Absorbance itself is dimensionless — it's a ratio on a logarithmic scale, not expressed in any physical unit. However, the molar attenuation coefficient does carry units, typically L/(mol·cm), which combines with concentration (mol/L) and path length (cm) so that all the units cancel out, leaving a unitless absorbance value."
references:
  - "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry"
formulaDescription: "The calculator multiplies three values together: the molar attenuation coefficient (a property specific to the substance and wavelength being measured), the path length light travels through the solution, and the solution's molar concentration. Because absorbance is a direct product of these three factors, it scales linearly with each one individually, assuming the concentration stays within the range where the Beer-Lambert law's linear approximation holds."
variablesExplained:
  - name: "Molar attenuation coefficient (ε)"
    description: "A property specific to the absorbing substance and the wavelength of light used, describing how strongly it absorbs light."
  - name: "Path length (b)"
    description: "The distance light travels through the solution, typically measured in centimeters."
  - name: "Concentration (c)"
    description: "The molar concentration of the absorbing substance in the solution."
stepByStep: "Enter the molar attenuation coefficient, path length, and concentration for your solution. The calculator multiplies the three values together to compute the predicted absorbance."
realWorldUses: "This equation is the basis of UV-Vis spectrophotometry, used routinely in labs to determine unknown solution concentrations by measuring absorbance and comparing it against a calibration curve, or to predict the expected absorbance reading for a solution of known concentration."
commonMistakes:
  - "Applying the linear Beer-Lambert relationship at concentrations too high for it to hold accurately, producing a predicted absorbance that doesn't match what an instrument would actually measure."
  - "Using a molar attenuation coefficient measured at a different wavelength than the one actually being used, since epsilon is wavelength-specific and changes substantially across a substance's absorption spectrum."
---

# Beer-Lambert Law Calculator

Enter a molar attenuation coefficient, path length, and concentration, and this calculator computes the resulting light absorbance.

## Formula

**Absorbance (A) = Molar attenuation coefficient (ε) × Path length (b) × Concentration (c)**.

For ε = 10, a 1 cm path length, and a concentration of 0.05 M: absorbance = 10 × 1 × 0.05 = 0.5.

## A direct, linear relationship

Absorbance scales directly with all three variables — doubling the path length, the concentration, or the attenuation coefficient each independently doubles the absorbance, since the relationship is a simple multiplication rather than anything logarithmic or exponential in the formula itself.

## Where the linear relationship breaks down

This proportional relationship holds well at low-to-moderate concentrations, but deviates at high concentrations, where molecular interactions between the absorbing substance's own molecules and other physical effects cause measured absorbance to fall below what the Beer-Lambert law predicts. This is why calibration curves built from known-concentration standards are typically only trusted within a validated linear range, rather than extrapolated indefinitely.

## Finding an unknown concentration

Once the molar attenuation coefficient and path length are known — or a calibration curve has been established — a measured absorbance can be rearranged to solve for concentration: **Concentration = Absorbance ÷ (ε × Path length)**. This rearrangement is the practical basis for using spectrophotometry to quantify unknown sample concentrations in a lab setting.
