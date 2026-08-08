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
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "Body Surface Area Calculator - Mosteller & DuBois Estimates | CalculationDesk"
aiSummary:
  definition: "The Body Surface Area (BSA) Calculator computes the total exterior surface area of the human body in square meters (m²) using Mosteller, DuBois, Haycock, and Gehan clinical equations."
  quickAnswer: "For an individual standing 180 cm tall and weighing 80 kg, the Mosteller formula calculates a Body Surface Area of exactly 2.000 m²."
  formulaSummary: "Mosteller: sqrt(H*W / 3600) | DuBois: 0.007184 * W^0.425 * H^0.725 | Haycock: 0.024265 * W^0.5378 * H^0.3964 | Gehan: 0.0235 * W^0.51456 * H^0.42246"
  whenToUse: "Use this calculator to compare clinical BSA mathematical estimations based on anthropometric height and weight inputs."
  whoShouldUse: "Medical professionals, clinical researchers, pharmacology students, and healthcare educators."
  limitations: "BSA estimates provide theoretical geometric models. Clinical pharmacology and chemotherapy dosing decisions require direct medical evaluation."
  keyTakeaways:
 - "Explains clinical applications of Body Surface Area (BSA) in square meters (m²)."
 - "Details the recommended Mosteller formula: sqrt((Height * Weight) / 3600)."
 - "Compares Mosteller, DuBois, Haycock, and Gehan equations."
 - "Calculates exact BSA outputs for metric and imperial height/weight inputs."
 - "Includes essential medical disclaimers regarding clinical drug administration."
peopleAlsoAsk:
  - "Why is Body Surface Area (BSA) used instead of body weight for drug dosing?"
  - "How is the Mosteller BSA formula calculated?"
  - "What is the average body surface area for an adult?"
  - "Why do different BSA formulas yield slightly different square meter values?"
examples:
  - title: "Worked BSA Comparison (Height: 180 cm, Weight: 80 kg)"
 inputs: "Height = 180 cm, Weight = 80 kg"
 calculation: "1. Mosteller: sqrt((180 * 80) / 3600) = sqrt(14400 / 3600) = sqrt(4) = 2.000 m². 2. DuBois: 0.007184 * 80^0.425 * 180^0.725 = 0.007184 * 6.4438 * 43.197 = 2.000 m². 3. Haycock: 0.024265 * 80^0.5378 * 180^0.3964 = 2.012 m². 4. Gehan: 0.0235 * 80^0.51456 * 180^0.42246 = 2.013 m²."
 result: "Mosteller BSA (Recommended) = 2.000 m² | DuBois = 2.000 m² | Haycock = 2.012 m² | Gehan = 2.013 m²"
faqs:
  - q: "Why is BSA preferred over total body weight in specialized pharmacology?"
 a: "Body Surface Area correlates more closely with physiological parameters such as cardiac output, basal metabolic rate, glomerular filtration rate, and blood volume than body weight alone, which can be skewed by fat or fluid retention."
  - q: "What is the average Body Surface Area for adults?"
 a: "The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m²."
  - q: "Why is the Mosteller formula considered the clinical standard?"
 a: "Published by Dr. R.D. Mosteller in 1987, the formula (sqrt(H*W/3600)) is widely adopted because it simplifies complex power equations while maintaining high mathematical agreement with the historical DuBois reference standard."
references:
  - "https://www.nejm.org/doi/full/10.1056/NEJM198710223171717"
---

# Body Surface Area (BSA) Calculator – Clinical Equations

In clinical medicine, physiology, and pharmacology, **Body Surface Area (BSA)** represents the total measured surface area of the human body, expressed in **square meters (m^2)**.

Unlike total body weight—which can vary widely based on body fat or water retention—BSA correlates closely with **cardiac output**, **metabolic rate**, **glomerular filtration**, and **vascular volume**.

This calculator computes your estimated BSA using height (H in cm) and weight (W in kg) across four classic clinical formulas: **Mosteller (recommended)**, **DuBois & DuBois**, **Haycock**, and **Gehan & George**.

---

> [!IMPORTANT]
> **Clinical Disclaimer**: This calculator is intended for educational and reference purposes only. Medical decisions, chemotherapy dosing, or therapeutic treatment plans must be made by qualified healthcare professionals based on diagnostic clinical evaluation.

---

### The Four Clinical BSA Formulas Explained

#### 1. Mosteller Formula (Recommended & Most Widely Used)
Published in the *New England Journal of Medicine* (1987), Mosteller simplified BSA calculations into an elegant square root relationship:
BSA_{Mosteller} = sqrt(frac(Height (cm)) × text{Weight (kg)){3,600}}

#### 2. DuBois & DuBois Formula (Historical Clinical Benchmark)
Published in 1916 based on direct anatomical surface measurements, DuBois remains the classic medical reference standard:
BSA_{DuBois} = 0.007184 × W^0.425 × H^0.725

#### 3. Haycock Formula (Optimized for Pediatric & Adult Scaling)
Published in 1978, Haycock's logarithmic model provides high accuracy across infants, children, and adults:
BSA_{Haycock} = 0.024265 × W^0.5378 × H^0.3964

#### 4. Gehan & George Formula (Direct Statistical Regression)
Published in 1970 using a large clinical dataset of direct body measurements:
BSA_{Gehan} = 0.0235 × W^0.51456 × H^0.42246

---

### Why Do BSA Formulas Produce Slightly Different Values?

Each formula was derived using different historical sample populations and measuring techniques (such as paper wrapping or photographic planimetry). While Mosteller and DuBois yield virtually identical results for standard adult physiques, Haycock and Gehan vary slightly at extremes of height or weight.

---

### Step-by-Step Worked Numerical Example (Verified against Code)

Let's calculate the BSA for an adult standing **180 cm tall** and weighing **80 kg**:

#### 1. Mosteller Formula Calculation:
BSA = sqrt((180 × 80 / 3,600)) = sqrt((14,400 / 3,600)) = sqrt(4) = 2.000  m^2

#### 2. DuBois & DuBois Formula Calculation:
BSA = 0.007184 × 80^0.425 × 180^0.725
80^0.425 ≈ 6.4438, 180^0.725 ≈ 43.197
BSA = 0.007184 × 6.4438 × 43.197 = 2.000  m^2

#### 3. Haycock & Gehan Calculations:
- **Haycock**: 0.024265 × 80^0.5378 × 180^0.3964 = 2.012  m^2$
- **Gehan**: 0.0235 × 80^0.51456 × 180^0.42246 = 2.013  m^2$

---

### What BSA Is (and Is Not) Used For

* **What It IS Used For**:
  - Dosing specialized medications (such as oncology chemotherapy drugs and immunosuppressants).
  - Calculating Cardiac Index (CI = Cardiac Output / BSA).
  - Normalizing renal function parameters (Glomerular Filtration Rate per 1.73  m^2$).
* **What It IS NOT Used For**:
  - BSA is **not** a measure of fitness, body fat percentage, or physical conditioning. A larger BSA simply reflects a larger overall physical surface envelope.

---

### Frequently Asked Questions (FAQ)

* **Q1: Why is BSA preferred over total body weight in specialized pharmacology?**
  * A1: Body Surface Area correlates more closely with physiological parameters such as cardiac output, basal metabolic rate, glomerular filtration rate, and blood volume than body weight alone, which can be skewed by fat or fluid retention.
* **Q2: What is the average Body Surface Area for adults?**
  * A2: The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m².
* **Q3: Why is the Mosteller formula considered the clinical standard?**
  * A3: Published by Dr. R.D. Mosteller in 1987, the formula (sqrt(H*W/3600)) is widely adopted because it simplifies complex power equations while maintaining high mathematical agreement with the historical DuBois reference standard.
