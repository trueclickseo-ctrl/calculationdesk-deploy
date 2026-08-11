---
title: "Body Surface Area (BSA) Calculator - Clinical Equations"
seoTitle: "Body Surface Area Calculator - Mosteller & DuBois Estimates | CalculationDesk"
metaDescription: "Free online Body Surface Area (BSA) Calculator. Estimate body surface area in square meters (m²) using Mosteller, DuBois, Haycock, and Gehan formulas."
category: "health"
subcategory: "medical-calculators"
tags: ["body surface area calculator", "bsa calculator", "mosteller formula bsa", "dubois formula bsa", "m2 body surface area"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "medical-editorial-team"
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
  reason: "High organic search priority execution"
titleVariants:
  - "Body Surface Area Calculator - Mosteller & DuBois Estimates | CalculationDesk"
aiSummary:
  definition: "The Body Surface Area (BSA) Calculator computes the total exterior surface area of the human body in square meters (m²) using the Mosteller, DuBois, Haycock, and Gehan clinical equations."
  quickAnswer: "For an individual standing 180 cm tall and weighing 80 kg, the Mosteller formula calculates a Body Surface Area of exactly 2.000 m², while DuBois gives approximately 1.996 m²."
  formulaSummary: "Mosteller: sqrt(H*W / 3600) | DuBois: 0.007184 * W^0.425 * H^0.725 | Haycock: 0.024265 * W^0.5378 * H^0.3964 | Gehan: 0.0235 * W^0.51456 * H^0.42246"
  whenToUse: "Use this calculator to compare clinical BSA mathematical estimates based on anthropometric height and weight inputs."
  whoShouldUse: "Medical professionals, clinical researchers, pharmacology students, and healthcare educators."
  limitations: "BSA estimates provide theoretical geometric models. Clinical pharmacology and chemotherapy dosing decisions require direct medical evaluation."
  keyTakeaways:
    - "Explains clinical applications of Body Surface Area (BSA) in square meters (m²)."
    - "Details the recommended Mosteller formula: sqrt((Height x Weight) / 3600)."
    - "Compares Mosteller, DuBois, Haycock, and Gehan equations side by side."
    - "Calculates exact BSA outputs for metric and imperial height and weight inputs."
    - "Includes essential medical disclaimers regarding clinical drug administration."
peopleAlsoAsk:
  - "Why is Body Surface Area (BSA) used instead of body weight for drug dosing?"
  - "How is the Mosteller BSA formula calculated?"
  - "What is the average body surface area for an adult?"
  - "Why do different BSA formulas yield slightly different square meter values?"
examples:
  - title: "Worked BSA Comparison (Height 180 cm, Weight 80 kg)"
    inputs: "Height = 180 cm, Weight = 80 kg"
    calculation: "Mosteller: sqrt((180 x 80) / 3600) = sqrt(14400 / 3600) = sqrt(4) = 2.000 m². DuBois: 0.007184 x 80^0.425 x 180^0.725 = 0.007184 x 6.4389 x 43.1591 = 1.996 m². Haycock: 0.024265 x 80^0.5378 x 180^0.3964 = 2.007 m². Gehan: 0.0235 x 80^0.51456 x 180^0.42246 = 2.009 m²."
    result: "Mosteller BSA (Recommended) = 2.000 m² | DuBois = 1.996 m² | Haycock = 2.007 m² | Gehan = 2.009 m²"
  - title: "Worked BSA Comparison (Height 160 cm, Weight 55 kg)"
    inputs: "Height = 160 cm, Weight = 55 kg"
    calculation: "Mosteller: sqrt((160 x 55) / 3600) = sqrt(8800 / 3600) = sqrt(2.4444) = 1.563 m². DuBois: 0.007184 x 55^0.425 x 160^0.725 = 1.563 m². Haycock: 0.024265 x 55^0.5378 x 160^0.3964 = 1.566 m². Gehan: 0.0235 x 55^0.51456 x 160^0.42246 = 1.577 m²."
    result: "Mosteller BSA (Recommended) = 1.563 m² | DuBois = 1.563 m² | Haycock = 1.566 m² | Gehan = 1.577 m²"
faqs:
  - q: "Why is BSA preferred over total body weight in specialized pharmacology?"
    a: "Body Surface Area correlates more closely with physiological parameters such as cardiac output, basal metabolic rate, glomerular filtration rate, and blood volume than body weight alone, which can be skewed by fat or fluid retention."
  - q: "What is the average Body Surface Area for adults?"
    a: "The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m²."
  - q: "Why is the Mosteller formula considered the clinical standard?"
    a: "Published by Dr. R.D. Mosteller in 1987, the formula (sqrt(H*W/3600)) is widely adopted because it simplifies complex power equations while maintaining close agreement with the historical DuBois reference standard for most adult body types."
  - q: "Is a 2.000 m² Mosteller result and a 1.996 m² DuBois result for the same person a discrepancy?"
    a: "No, this is expected. The two formulas were derived independently using different methods and reference datasets, so they rarely produce identical results even for the same person. A gap of a few thousandths of a square meter, as in this example, is well within the normal range of agreement between the two formulas."
references:
  - "https://www.nejm.org/doi/full/10.1056/NEJM198710223171717"
formulaDescription: "Each formula estimates total body surface area from weight and height using coefficients derived from a distinct historical dataset and measurement method. Mosteller uses a simple square-root relationship. DuBois, Haycock, and Gehan all use power-law relationships (weight and height each raised to a fractional exponent), with different exponents and scaling constants reflecting the population each was calibrated against."
variablesExplained:
  - name: "W (Weight)"
    description: "Body weight in kilograms, used as an input to all four formulas."
  - name: "H (Height)"
    description: "Height in centimeters, used as an input to all four formulas."
stepByStep: "Select metric or imperial units and enter weight and height. The calculator computes BSA using all four formulas — Mosteller, DuBois, Haycock, and Gehan & George — and displays them side by side, with Mosteller highlighted as the most commonly used in practice."
realWorldUses: "BSA is used clinically to dose medications where the therapeutic window is narrow relative to body size, such as chemotherapy and certain immunosuppressants, to calculate the Cardiac Index (cardiac output divided by BSA), and to normalize renal function measurements like Glomerular Filtration Rate, which is conventionally reported per 1.73 m²."
commonMistakes:
  - "Assuming BSA formulas will always agree to the same rounded value — as shown in the worked examples, Mosteller, DuBois, Haycock, and Gehan can differ by a few hundredths of a square meter for the same person, since each was derived from a different historical dataset and mathematical form."
  - "Treating BSA as a measure of fitness or body composition — a larger BSA simply reflects a larger physical surface envelope from being taller or heavier, and says nothing about body fat percentage or physical conditioning."
---

# Body Surface Area (BSA) Calculator – Clinical Equations

In clinical medicine, physiology, and pharmacology, Body Surface Area (BSA) represents the total measured surface area of the human body, expressed in square meters (m²).

Unlike total body weight, which can vary widely based on body fat or water retention, BSA correlates closely with cardiac output, metabolic rate, glomerular filtration, and vascular volume. This calculator computes estimated BSA from height (H in cm) and weight (W in kg) across four classic clinical formulas: Mosteller (recommended), DuBois & DuBois, Haycock, and Gehan & George.

> [!IMPORTANT]
> **Clinical disclaimer**: This calculator is intended for educational and reference purposes only. Medical decisions, chemotherapy dosing, or therapeutic treatment plans must be made by qualified healthcare professionals based on direct clinical evaluation.

## The Four Clinical BSA Formulas

**Mosteller Formula (recommended and most widely used)**, published in the *New England Journal of Medicine* (1987), simplifies BSA calculation into a square-root relationship:

$$BSA_{\text{Mosteller}} = \sqrt{\frac{\text{Height (cm)} \times \text{Weight (kg)}}{3600}}$$

**DuBois & DuBois Formula (historical clinical benchmark)**, published in 1916 based on direct anatomical surface measurements, remains a classic medical reference standard:

$$BSA_{\text{DuBois}} = 0.007184 \times W^{0.425} \times H^{0.725}$$

**Haycock Formula (optimized for pediatric and adult scaling)**, published in 1978, provides good accuracy across infants, children, and adults:

$$BSA_{\text{Haycock}} = 0.024265 \times W^{0.5378} \times H^{0.3964}$$

**Gehan & George Formula (direct statistical regression)**, published in 1970 using a large clinical dataset of direct body measurements:

$$BSA_{\text{Gehan}} = 0.0235 \times W^{0.51456} \times H^{0.42246}$$

## Why Do BSA Formulas Produce Slightly Different Values?

Each formula was derived using a different historical sample population and measuring technique — including methods like paper wrapping or photographic planimetry. Mosteller and DuBois tend to yield close but not identical results for typical adult physiques, and Haycock and Gehan can diverge more noticeably at the extremes of height or weight.

## Worked Examples

### Example 1: 180 cm Tall, Weighing 80 kg

Mosteller: $\sqrt{(180 \times 80) / 3600} = \sqrt{14{,}400 / 3600} = \sqrt{4} = 2.000$ m².

DuBois: $80^{0.425} \approx 6.4389$, $180^{0.725} \approx 43.1591$, so $BSA = 0.007184 \times 6.4389 \times 43.1591 \approx 1.996$ m².

Haycock $\approx 2.007$ m². Gehan $\approx 2.009$ m².

### Example 2: 160 cm Tall, Weighing 55 kg

Mosteller: $\sqrt{(160 \times 55) / 3600} = \sqrt{8{,}800 / 3600} = \sqrt{2.4444} \approx 1.563$ m².

DuBois $\approx 1.563$ m². Haycock $\approx 1.566$ m². Gehan $\approx 1.577$ m².

## What BSA Is (and Is Not) Used For

BSA is used clinically for dosing specialized medications, such as oncology chemotherapy drugs and immunosuppressants; calculating Cardiac Index (Cardiac Output divided by BSA); and normalizing renal function parameters, such as Glomerular Filtration Rate per 1.73 m².

BSA is not a measure of fitness, body fat percentage, or physical conditioning. A larger BSA simply reflects a larger overall physical surface envelope from being taller or heavier.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: These formulas estimate BSA purely from height and weight. None of them account for body shape variation, edema, amputation, or other individual anatomical differences that a direct clinical measurement would capture.

## Frequently Asked Questions

### Why is BSA preferred over total body weight in specialized pharmacology?

Body Surface Area correlates more closely with physiological parameters such as cardiac output, basal metabolic rate, glomerular filtration rate, and blood volume than body weight alone, which can be skewed by fat or fluid retention.

### What is the average Body Surface Area for adults?

The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m².

### Why is the Mosteller formula considered the clinical standard?

Published by Dr. R.D. Mosteller in 1987, the formula ($\sqrt{HW/3600}$) is widely adopted because it simplifies complex power equations while maintaining close agreement with the historical DuBois reference standard for most adult body types.

### Is a 2.000 m² Mosteller result and a 1.996 m² DuBois result for the same person a discrepancy?

No, this is expected. The two formulas were derived independently using different methods and reference datasets, so they rarely produce identical results even for the same person. A gap of a few thousandths of a square meter, as in this example, is well within the normal range of agreement between the two formulas.
