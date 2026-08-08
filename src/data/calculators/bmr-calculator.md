---
title: "BMR Calculator - Basal Metabolic Rate Estimation"
seoTitle: "BMR Calculator - Estimate Basal Metabolic Rate | CalculationDesk"
metaDescription: "Free online BMR Calculator. Estimate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor and Revised Harris-Benedict clinical equations."
category: "health"
subcategory: "medical-calculators"
tags: ["bmr calculator", "basal metabolic rate calculator", "mifflin st jeor equation", "calories burned at rest", "bmr vs tdee"]
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
  - "BMR Calculator - Estimate Basal Metabolic Rate | CalculationDesk"
aiSummary:
  definition: "The BMR Calculator estimates Basal Metabolic Rate (BMR)—the baseline calories your body expends at complete rest to maintain essential vital functions—using the Mifflin-St Jeor and Revised Harris-Benedict formulas."
  quickAnswer: "A 25-year-old male weighing 70 kg at 175 cm tall has an estimated Mifflin-St Jeor BMR of 1,674 calories/day."
  formulaSummary: "Mifflin-St Jeor: Men = 10W + 6.25H - 5A + 5 | Women = 10W + 6.25H - 5A - 161 | Revised Harris-Benedict formulas also calculated"
  whenToUse: "Use this calculator as a baseline step when determining daily energy expenditure and setting caloric benchmarks."
  whoShouldUse: "Individuals, fitness trainers, dietitians, and health researchers."
  limitations: "BMR estimates baseline energy at complete rest. It does not include physical activity or digestion, and actual metabolic rates vary with lean muscle mass and genetics."
  keyTakeaways:
    - "Explains BMR as the minimum energy expenditure required for involuntary vital functions (breathing, circulation, organ function)."
    - "Calculates estimates using both the modern Mifflin-St Jeor equation and Revised Harris-Benedict formula."
    - "Clearly distinguishes BMR from TDEE (Total Daily Energy Expenditure)."
    - "Provides inputs for Metric (kg/cm) and Imperial (lbs/ft/in) unit systems."
peopleAlsoAsk:
  - "What is Basal Metabolic Rate (BMR)?"
  - "What is the difference between BMR and TDEE?"
  - "Which BMR formula is most accurate?"
  - "Does BMR include physical exercise?"
examples:
  - title: "Worked BMR Calculation Example (Male, 25 yrs, 70 kg, 175 cm)"
    inputs: "Gender = Male, Age = 25, Weight = 70 kg, Height = 175 cm"
    calculation: "Mifflin-St Jeor: BMR = 10(70) + 6.25(175) - 5(25) + 5 = 700 + 1093.75 - 125 + 5 = 1,673.75 kcal/day. Revised Harris-Benedict: BMR = 13.397(70) + 4.799(175) - 5.677(25) + 88.362 = 937.79 + 839.825 - 141.925 + 88.362 = 1,724 kcal/day."
    result: "Mifflin-St Jeor BMR = 1,674 kcal/day | Revised Harris-Benedict BMR = 1,724 kcal/day"
faqs:
  - q: "Is BMR the exact number of calories I should eat every day?"
    a: "No. BMR represents energy spent while lying completely motionless in bed all day. Eating only your BMR calories over time without accounting for physical movement or digestion would create an unintended energy deficit."
  - q: "Why is physical activity not included in BMR?"
    a: "BMR isolates baseline metabolic expenditure from movement. Physical activity is accounted for separately by multiplying BMR by an activity factor to yield Total Daily Energy Expenditure (TDEE)."
  - q: "What factors can cause actual metabolic rate to differ from the calculated estimate?"
    a: "Estimating formulas assume average body composition. Individuals with high lean muscle mass burn more calories at rest, while thyroid function, body temperature, genetics, and age-related muscle loss also alter actual metabolic rate."
references:
  - "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2598419/"
---

# BMR Calculator – Basal Metabolic Rate Estimation Guide

Your body never truly stops working. Even while you sleep soundly in bed, your heart pumps blood, your lungs expand and contract, your brain processes nerve signals, your kidneys filter waste, and your cells regenerate.

The energy required to sustain these essential, involuntary life-support functions at complete rest is known as your **Basal Metabolic Rate (BMR)**.

This calculator estimates your daily baseline resting energy expenditure using the clinical **Mifflin-St Jeor Equation** (the modern gold standard) and the **Revised Harris-Benedict Equation**.

---

> [!IMPORTANT]
> **Educational & Health Disclaimer**: BMR calculations provide mathematical estimates based on average population data. BMR represents energy burned at rest, not total daily calorie needs. Do not start restrictive dietary regimes based solely on an estimated number without consulting a qualified healthcare professional or registered dietitian.

---

### BMR vs. TDEE: Understanding the Difference

* **Basal Metabolic Rate (BMR)**: The minimum calories your body burns in a 24-hour period while resting completely in a temperate room, without moving or digesting food. BMR typically accounts for **60% to 75%** of a person's total daily energy burn.
* **Total Daily Energy Expenditure (TDEE)**: The total number of calories you burn in a day. TDEE equals BMR plus calories burned through physical activity (walking, working, exercise) and the **Thermic Effect of Food (TEF)** (energy used to digest food).

$$\text{TDEE} = \text{BMR} \times \text{Activity Multiplier}$$

---

### Clinical Formulas Used by the Calculator

#### 1. Mifflin-St Jeor Equation (Modern Standard)
Clinical studies indicate that the Mifflin-St Jeor equation provides the highest accuracy for modern populations:

- **Men**:
  $$\text{BMR} = 10 \times W + 6.25 \times H - 5 \times A + 5$$
- **Women**:
  $$\text{BMR} = 10 \times W + 6.25 \times H - 5 \times A - 161$$

Where:
- $W = \text{Weight in kilograms}$
- $H = \text{Height in centimeters}$
- $A = \text{Age in years}$

#### 2. Revised Harris-Benedict Equation
- **Men**:
  $$\text{BMR} = 13.397 \times W + 4.799 \times H - 5.677 \times A + 88.362$$
- **Women**:
  $$\text{BMR} = 9.247 \times W + 3.098 \times H - 4.330 \times A + 447.593$$

---

### Step-by-Step Worked Numerical Example (Verified against Code)

Let's calculate the BMR for a **25-year-old male**, height **175 cm**, weight **70 kg**:

#### 1. Mifflin-St Jeor Calculation
$$\text{BMR} = 10(70) + 6.25(175) - 5(25) + 5$$
$$\text{BMR} = 700 + 1093.75 - 125 + 5 = \mathbf{1,673.75\text{ kcal/day}} \quad (\approx 1,674\text{ kcal})$$

#### 2. Revised Harris-Benedict Calculation
$$\text{BMR} = 13.397(70) + 4.799(175) - 5.677(25) + 88.362$$
$$\text{BMR} = 937.79 + 839.825 - 141.925 + 88.362 = \mathbf{1,724.05\text{ kcal/day}} \quad (\approx 1,724\text{ kcal})$$

---

### Factors Affecting Real-World Metabolic Expenditure

While mathematical equations provide a reliable starting benchmark, individual metabolism can vary based on:
1. **Lean Muscle Mass**: Muscle tissue is metabolically active and burns more calories at rest than fat tissue. Two people of identical height and weight will have different actual BMRs if one has higher muscle mass.
2. **Hormonal & Thyroid Function**: Thyroid hormones ($T_3$ and $T_4$) regulate metabolic speed. Hypothyroidism lowers resting energy burn, while hyperthyroidism increases it.
3. **Age-Related Changes**: BMR naturally declines with age, largely due to gradual loss of muscle mass (sarcopenia) if resistance training is not maintained.

---

### Frequently Asked Questions (FAQ)

* **Q1: Is BMR the exact number of calories I should eat every day?**
  * A1: No. BMR represents energy spent while lying completely motionless in bed all day. Eating only your BMR calories over time without accounting for physical movement or digestion would create an unintended energy deficit.
* **Q2: Why is physical activity not included in BMR?**
  * A2: BMR isolates baseline metabolic expenditure from movement. Physical activity is accounted for separately by multiplying BMR by an activity factor to yield Total Daily Energy Expenditure (TDEE).
* **Q3: What factors can cause actual metabolic rate to differ from the calculated estimate?**
  * A3: Estimating formulas assume average body composition. Individuals with high lean muscle mass burn more calories at rest, while thyroid function, body temperature, genetics, and age-related muscle loss also alter actual metabolic rate.
