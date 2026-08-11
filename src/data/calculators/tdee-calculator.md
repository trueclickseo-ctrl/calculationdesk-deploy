---
title: "TDEE Calculator - Total Daily Energy Expenditure"
seoTitle: "TDEE Calculator - Total Daily Energy Expenditure | CalculationDesk"
metaDescription: "Free online TDEE Calculator. Calculate your Total Daily Energy Expenditure, Basal Metabolic Rate (BMR), thermic effect of food (TEF), and activity expenditure."
category: "health"
subcategory: "fitness-calculators"
tags: ["tdee calculator", "total daily energy expenditure", "maintenance calories calculator", "bmr activity multiplier", "tef thermic effect food"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "fitness-editorial-team"
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
  - "TDEE Calculator - Total Daily Energy Expenditure | CalculationDesk"
aiSummary:
  definition: "The Total Daily Energy Expenditure (TDEE) Calculator estimates total calories burned in a 24-hour period by combining Basal Metabolic Rate (BMR) with a physical activity multiplier, then breaking the total into BMR, Thermic Effect of Food (TEF), and Physical Activity (PA) components."
  quickAnswer: "A 25-year-old moderately active male weighing 70 kg at 175 cm tall has an estimated BMR of 1,674 kcal/day and a total TDEE of 2,594 kcal/day."
  formulaSummary: "BMR (Mifflin-St Jeor) = 10W + 6.25H - 5A +/- s | TDEE = BMR x Activity Multiplier (1.2 to 1.9) | TEF = TDEE x 10% | PA = TDEE - BMR - TEF"
  whenToUse: "Use this calculator as a baseline when planning daily calorie intake for weight maintenance, a fat loss deficit, or a muscle gain surplus."
  whoShouldUse: "Athletes, bodybuilders, dieters, fitness coaches, and anyone managing body weight."
  limitations: "TDEE estimates rely on activity self-reporting and population formulas. Actual metabolic output varies with muscle mass, thyroid function, and non-exercise activity (NEAT)."
  keyTakeaways:
    - "Differentiates BMR (resting survival energy) from TDEE (total 24-hour energy burned)."
    - "Calculates BMR using the Mifflin-St Jeor formula."
    - "Applies activity multipliers ranging from Sedentary (1.2) to Extra Active (1.9)."
    - "Breaks down TDEE into three components: BMR, Thermic Effect of Food (TEF), and Physical Activity (PA)."
    - "Provides practical guidance on adjusting intake based on real-world weight trends."
peopleAlsoAsk:
  - "What is the difference between BMR and TDEE?"
  - "Is TDEE the same as maintenance calories?"
  - "Should I eat my exact TDEE number every single day?"
  - "Why am I not losing weight on my calculated TDEE deficit?"
examples:
  - title: "Worked TDEE Calculation (25yo Male, 70 kg, 175 cm, Moderately Active)"
    inputs: "Age = 25, Gender = Male, Weight = 70 kg, Height = 175 cm, Activity = Moderately Active (1.55)"
    calculation: "BMR = 10(70) + 6.25(175) - 5(25) + 5 = 700 + 1093.75 - 125 + 5 = 1,673.75 kcal, rounded to 1,674. TDEE = 1,673.75 x 1.55 = 2,594.31 kcal, rounded to 2,594. TEF = 2,594.31 x 0.10 = 259.43 kcal, rounded to 259. PA = 2,594.31 - 1,673.75 - 259.43 = 661.13 kcal, rounded to 661."
    result: "TDEE = 2,594 kcal/day | BMR = 1,674 kcal | TEF = 259 kcal | PA = 661 kcal"
  - title: "Worked TDEE Calculation (28yo Female, 62 kg, 168 cm, Very Active)"
    inputs: "Age = 28, Gender = Female, Weight = 62 kg, Height = 168 cm, Activity = Very Active (1.725)"
    calculation: "BMR = 10(62) + 6.25(168) - 5(28) - 161 = 620 + 1050 - 140 - 161 = 1,369 kcal. TDEE = 1,369 x 1.725 = 2,361.53 kcal, rounded to 2,362. TEF = 2,361.53 x 0.10 = 236.15 kcal, rounded to 236. PA = 2,361.53 - 1,369 - 236.15 = 756.37 kcal, rounded to 756."
    result: "TDEE = 2,362 kcal/day | BMR = 1,369 kcal | TEF = 236 kcal | PA = 756 kcal"
faqs:
  - q: "Is TDEE the same as maintenance calories?"
    a: "Yes. TDEE represents baseline maintenance calories. Eating at TDEE keeps body weight stable; eating 500 calories below TDEE creates a fat loss deficit, while eating 500 calories above TDEE creates a muscle gain surplus."
  - q: "Should I eat my exact TDEE number every day?"
    a: "No. Metabolism and activity fluctuate day to day. TDEE is best treated as a guide for average daily intake over a week rather than an exact daily rule."
  - q: "Why might my real-world maintenance calories differ from the calculator?"
    a: "Population formulas can't measure individual muscle mass, thyroid hormone levels, digestive efficiency, or subtle fidgeting movement (NEAT). Use the calculator output as a starting benchmark and adjust based on weekly scale trends."
  - q: "How is this calculator different from the Calorie Calculator?"
    a: "Both start from the same Mifflin-St Jeor BMR and activity multiplier. This calculator additionally breaks TDEE down into its three physiological components (BMR, TEF, PA) rather than converting straight to weight loss and weight gain targets."
references:
  - "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4213381/"
formulaDescription: "TDEE is built in three stages. First, Basal Metabolic Rate (BMR) is estimated from weight, height, age, and gender using the Mifflin-St Jeor equation. Second, BMR is multiplied by an activity multiplier (1.200 to 1.900) to produce TDEE. Third, TDEE is decomposed into three components: BMR itself, the Thermic Effect of Food (a flat 10% of TDEE), and Physical Activity (whatever energy remains after subtracting BMR and TEF from TDEE)."
variablesExplained:
  - name: "BMR (Basal Metabolic Rate)"
    description: "Calories burned at complete rest, calculated from weight, height, age, and gender using the Mifflin-St Jeor equation."
  - name: "TEF (Thermic Effect of Food)"
    description: "The energy cost of digesting, absorbing, and processing food, modeled here as a flat 10% of TDEE."
  - name: "PA (Physical Activity)"
    description: "The portion of TDEE attributed to movement and exercise, calculated as TDEE minus BMR minus TEF."
stepByStep: "Enter gender, age, weight, and height, then select an activity level from Sedentary through Extra Active. The calculator computes BMR with the Mifflin-St Jeor equation, multiplies it by the activity factor to get TDEE, and then splits TDEE into BMR, TEF (10% of TDEE), and PA (the remainder) for a component-level breakdown."
realWorldUses: "Dieters and coaches use the component breakdown to understand roughly how much of daily calorie burn comes from simply staying alive (BMR) versus digestion (TEF) versus actual movement and exercise (PA), which helps clarify why activity level changes have a bigger impact on total burn than most people expect."
commonMistakes:
  - "Treating BMR as a large share of controllable calorie burn — BMR is fixed by body size, age, and gender and isn't something that can be meaningfully changed day to day, unlike the Physical Activity component."
  - "Assuming TEF scales with how much protein or fiber is eaten in this calculator's model — this calculator applies a flat 10% of TDEE regardless of diet composition, even though in reality TEF varies somewhat by macronutrient mix (protein has a notably higher thermic effect than fat)."
---

# TDEE Calculator – Total Daily Energy Expenditure

Whether the goal is losing fat, building muscle, or maintaining the current physique, everything starts with understanding Total Daily Energy Expenditure (TDEE) — the estimated total number of calories the body burns in a 24-hour day.

TDEE accounts for resting survival metabolism, daily non-exercise movement, physical workouts, and the energy required to digest food. This calculator computes TDEE using the Mifflin-St Jeor formula for Basal Metabolic Rate (BMR), multiplies it by an activity level, and breaks down the three primary energy components: BMR, Thermic Effect of Food (TEF), and Physical Activity (PA).

## BMR vs. TDEE: What Is the Difference?

**Basal Metabolic Rate (BMR)** is the calories the body burns while completely at rest — for instance, lying in bed for 24 hours. It fuels involuntary vital functions such as pumping blood, breathing, brain activity, and cellular repair, and typically accounts for roughly 60% to 70% of daily energy burn. **Total Daily Energy Expenditure (TDEE)** is the total energy burned once physical movement, exercise, and digestion are added on top of BMR.

## How TDEE Is Calculated

The calculation works in three stages.

**1. Basal Metabolic Rate (Mifflin-St Jeor formula).** The calculator computes a resting baseline from weight (W in kg), height (H in cm), and age (A in years):

$$\text{Men: } BMR = 10W + 6.25H - 5A + 5 \qquad \text{Women: } BMR = 10W + 6.25H - 5A - 161$$

**2. Applying activity multipliers.** BMR is scaled according to typical physical activity routine:

| Activity Level | Multiplier | Description |
| :--- | :--- | :--- |
| **Sedentary** | 1.200 | Desk job, little or no structured exercise |
| **Lightly Active** | 1.375 | Light exercise or sports 1–3 days/week |
| **Moderately Active** | 1.550 | Moderate exercise or sports 3–5 days/week |
| **Very Active** | 1.725 | Hard exercise or sports 6–7 days/week |
| **Extra Active** | 1.900 | Very hard daily exercise or a heavy physical job |

$$\text{TDEE} = \text{BMR} \times \text{Activity Multiplier}$$

**3. Metabolic component breakdown.** TDEE is split into three pieces: BMR itself, the Thermic Effect of Food (estimated at 10% of TDEE, representing the metabolic cost of chewing, digesting, and absorbing nutrients), and Physical Activity — the energy expended during movement, calculated as $PA = TDEE - BMR - TEF$.

## Worked Examples

### Example 1: 25-Year-Old Male, 70 kg, 175 cm, Moderately Active

$BMR = 10(70) + 6.25(175) - 5(25) + 5 = 700 + 1{,}093.75 - 125 + 5 = 1{,}673.75 \approx 1{,}674$ kcal/day.

$TDEE = 1{,}673.75 \times 1.55 = 2{,}594.31 \approx 2{,}594$ kcal/day.

$TEF = 2{,}594.31 \times 0.10 = 259.43 \approx 259$ kcal. $PA = 2{,}594.31 - 1{,}673.75 - 259.43 = 661.13 \approx 661$ kcal.

### Example 2: 28-Year-Old Female, 62 kg, 168 cm, Very Active

$BMR = 10(62) + 6.25(168) - 5(28) - 161 = 620 + 1{,}050 - 140 - 161 = 1{,}369$ kcal/day.

$TDEE = 1{,}369 \times 1.725 = 2{,}361.53 \approx 2{,}362$ kcal/day.

$TEF = 2{,}361.53 \times 0.10 = 236.15 \approx 236$ kcal. $PA = 2{,}361.53 - 1{,}369 - 236.15 = 756.37 \approx 756$ kcal.

## Using TDEE for Body Weight Management

Once TDEE is known, target calorie budgets follow directly: weight maintenance means consuming the calculated TDEE daily; a fat loss deficit means subtracting roughly 500 kcal/day from TDEE (about 1 lb of fat loss per week); a muscle gain surplus means adding roughly 250 to 500 kcal/day to TDEE to support lean tissue growth.

## Real-World Adjustments and Limitations

TDEE calculators provide a starting benchmark, not a rigid prescription. Actual metabolism varies with body composition — muscle tissue burns more resting energy than fat mass — and with NEAT (Non-Exercise Activity Thermogenesis), the unconscious fidgeting, walking, and posture adjustments that vary widely between individuals. A practical way to adjust: track body weight average over 2–3 weeks. If eating at the calculated TDEE but gaining weight, reduce daily calories by roughly 150–200 kcal; if losing weight unexpectedly, increase intake by a similar amount.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator applies a flat 10% thermic effect of food regardless of diet composition and does not measure individual NEAT, muscle mass, or hormonal factors. It is a population-average starting point, to be refined using real-world weight trends.

## Frequently Asked Questions

### Is TDEE the same as maintenance calories?

Yes. TDEE represents baseline maintenance calories. Eating at TDEE keeps body weight stable; eating 500 calories below TDEE creates a fat loss deficit, while eating 500 calories above TDEE creates a muscle gain surplus.

### Should I eat my exact TDEE number every day?

No. Metabolism and activity fluctuate day to day. TDEE is best treated as a guide for average daily intake over a week rather than an exact daily rule.

### Why might my real-world maintenance calories differ from the calculator?

Population formulas can't measure individual muscle mass, thyroid hormone levels, digestive efficiency, or subtle fidgeting movement (NEAT). Use the calculator output as a starting benchmark and adjust based on weekly scale trends.

### How is this calculator different from the Calorie Calculator?

Both start from the same Mifflin-St Jeor BMR and activity multiplier. This calculator additionally breaks TDEE down into its three physiological components (BMR, TEF, PA) rather than converting straight to weight loss and weight gain targets — see the [Calorie Calculator](/calculators/calorie-calculator/) for that version.
