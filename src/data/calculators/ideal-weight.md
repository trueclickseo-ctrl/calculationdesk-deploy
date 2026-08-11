---
title: "Ideal Weight Calculator - Multi-Formula Height Benchmarks"
seoTitle: "Ideal Weight Calculator - Calculate IBW & Clinical Formulas | CalculationDesk"
metaDescription: "Free online Ideal Weight Calculator. Estimate your healthy body weight using Devine, Robinson, Miller, and Hamwi equations alongside WHO BMI ranges."
category: "health"
subcategory: "medical-calculators"
tags: ["ideal weight calculator", "ideal body weight ibw", "devine formula ideal weight", "robinson miller hamwi formula", "healthy weight for height"]
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
  - "Ideal Weight Calculator - Calculate IBW & Clinical Formulas | CalculationDesk"
aiSummary:
  definition: "The Ideal Weight Calculator estimates healthy body weight ranges based on height and gender using four classic clinical formulas — Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964) — alongside standard WHO BMI weight boundaries."
  quickAnswer: "For a 175 cm male, the clinical formulas estimate ideal weight between roughly 68.7 kg and 72.0 kg (Devine: 70.5 kg), with a healthy WHO BMI weight range of about 56.7 kg to 76.6 kg."
  formulaSummary: "Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964) equations evaluated per inch over 5 feet, plus WHO BMI (18.5 to 25.0) weight range"
  whenToUse: "Use this calculator as a general reference comparison tool when evaluating weight ranges for health and medical dosage baselines."
  whoShouldUse: "Individuals, healthcare professionals, dietitians, and researchers."
  limitations: "Ideal Body Weight (IBW) formulas are population estimations based on height and biological sex. They do not account for muscle mass, frame size, or age."
  keyTakeaways:
    - "Calculates four recognized clinical formulas: Devine, Robinson, Miller, and Hamwi."
    - "Displays the World Health Organization (WHO) healthy BMI weight range (18.5 to 25.0)."
    - "Emphasizes that there is no single 'perfect' weight target for any individual."
    - "Supports both Metric (cm/kg) and Imperial (ft/in/lbs) unit systems."
peopleAlsoAsk:
  - "What is Ideal Body Weight (IBW)?"
  - "Why are there multiple formulas for calculating ideal weight?"
  - "Why is height the main input in ideal weight formulas?"
  - "How does ideal weight differ from a healthy BMI range?"
examples:
  - title: "Worked Ideal Weight Example (Male, 175 cm, Metric Input)"
    inputs: "Gender = Male, Height = 175 cm"
    calculation: "175 cm converts to 175/2.54 = 68.898 inches. Inches over 5 ft (60 in) = 68.898 - 60 = 8.898. Devine = 50 + 2.3(8.898) = 70.46 kg. Robinson = 52 + 1.9(8.898) = 68.91 kg. Miller = 56.2 + 1.41(8.898) = 68.75 kg. Hamwi = 48 + 2.7(8.898) = 72.02 kg. Healthy BMI range (1.75 m): 18.5(1.75)^2 = 56.66 kg to 25.0(1.75)^2 = 76.56 kg."
    result: "Devine = 70.5 kg | Robinson = 68.9 kg | Miller = 68.7 kg | Hamwi = 72.0 kg | Healthy BMI Range = 56.7 - 76.6 kg"
  - title: "Worked Ideal Weight Example (Female, 5 ft 4 in, Imperial Input)"
    inputs: "Gender = Female, Height = 5 ft 4 in (64 inches)"
    calculation: "Inches over 5 ft (60 in) = 64 - 60 = 4. Devine = 45.5 + 2.3(4) = 54.7 kg. Robinson = 49.0 + 1.7(4) = 55.8 kg. Miller = 53.1 + 1.36(4) = 58.54 kg. Hamwi = 45.5 + 2.2(4) = 54.3 kg. Height in meters = 64 x 2.54 / 100 = 1.6256 m. Healthy BMI range: 18.5(1.6256)^2 = 48.89 kg to 25.0(1.6256)^2 = 66.06 kg."
    result: "Devine = 54.7 kg | Robinson = 55.8 kg | Miller = 58.5 kg | Hamwi = 54.3 kg | Healthy BMI Range = 48.9 - 66.1 kg"
faqs:
  - q: "Is 'ideal weight' a mandatory medical target?"
    a: "No. The term 'ideal body weight' originated as a pharmacological baseline for calculating medication dosages. It represents a statistical reference range, not a strict medical requirement for individual health."
  - q: "Why do different formulas produce different weight numbers?"
    a: "Each formula was published by different clinical researchers in different decades (Hamwi 1964, Devine 1974, Robinson 1983, Miller 1983) using slightly different population datasets and height multipliers."
  - q: "What happens if someone is under 5 feet tall?"
    a: "For heights under 60 inches (5 feet), the calculator applies a proportional reduction per inch under 5 feet, using a negative factor in the same formulas, to maintain anatomically consistent estimates rather than clamping at zero."
  - q: "Why do metric and imperial inputs for the 'same' height give slightly different results?"
    a: "A height entered as whole feet and inches (like 5 ft 9 in) converts to exactly 69 inches, while a metric height like 175 cm converts to 68.898 inches — a fraction of an inch less. Since the formulas are sensitive to fractional inches, the two entry methods can produce slightly different results for what looks like 'the same' height."
references:
  - "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4893886/"
formulaDescription: "Most Ideal Body Weight formulas establish a baseline weight for a person standing exactly 5 feet (60 inches) tall, then add a fixed weight increment for every inch of height above that baseline. Each formula uses a different baseline and per-inch increment, calibrated by its original researchers using different population data and decades of publication."
variablesExplained:
  - name: "x (inches over 5 feet)"
    description: "Height in inches minus 60. This is the variable multiplied by each formula's per-inch coefficient; it can be negative for heights under 5 feet."
  - name: "Height (m)"
    description: "Height converted to meters, used only in the WHO healthy BMI weight range calculation (BMI = weight / height-squared)."
stepByStep: "Select metric or imperial units, choose a gender, and enter height. The calculator converts height to inches, computes the Devine, Robinson, Miller, and Hamwi ideal weight estimates from the inches-over-5-feet value, and separately computes the WHO healthy BMI weight range from height in meters."
realWorldUses: "Healthcare providers use Ideal Body Weight formulas (especially Devine) as a baseline for calculating medication dosages that should be based on lean body size rather than actual body weight, which is important for drugs where dosing by total body weight could be excessive in a heavier patient."
commonMistakes:
  - "Treating the output of a single formula as a precise personal target — the four formulas can disagree by several kilograms for the same height and gender, which is why the calculator displays all four alongside the broader WHO BMI weight range rather than one 'correct' number."
  - "Assuming a metric height entry and an imperial height entry that round to 'the same' height will produce identical results — small fractional-inch differences from unit conversion carry through the formulas."
---

# Ideal Weight Calculator – Multi-Formula Height Benchmarks

When people ask "What is my ideal weight?", they often expect a single perfect number. In reality, human bodies vary naturally in frame size, muscle mass, bone density, and fat distribution — there is no one number that fits everyone at a given height.

In clinical medicine, researchers developed **Ideal Body Weight (IBW)** equations to estimate baseline weights for physiological models and medication dosing. This calculator computes weight benchmarks using four classic clinical formulas — Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964) — alongside the World Health Organization (WHO) healthy BMI weight range.

> [!IMPORTANT]
> **Health disclaimer**: "Ideal weight" equations are statistical reference ranges based on height and biological sex. They do not dictate health status, appearance, or personal worth. Muscular individuals, older adults, and people with larger body frames naturally weigh more while remaining completely healthy.

## The Four Clinical Ideal Weight Formulas

Most IBW formulas establish a baseline weight for a person measuring 5 feet (60 inches) tall, adding a set weight increment for every inch over 5 feet, where $x = \text{Height in inches} - 60$:

**Devine Formula (1974)**, originally created to standardize drug dosing calculations and the most widely used formula in clinical settings:

$$\text{Men: } IBW = 50.0 + 2.3x \text{ (kg)} \qquad \text{Women: } IBW = 45.5 + 2.3x \text{ (kg)}$$

**Robinson Formula (1983)**, a modification of Devine's work based on empirical population data:

$$\text{Men: } IBW = 52.0 + 1.9x \text{ (kg)} \qquad \text{Women: } IBW = 49.0 + 1.7x \text{ (kg)}$$

**Miller Formula (1983)**, designed to provide smoother weight transitions across height brackets:

$$\text{Men: } IBW = 56.2 + 1.41x \text{ (kg)} \qquad \text{Women: } IBW = 53.1 + 1.36x \text{ (kg)}$$

**Hamwi Formula (1964)**, one of the earliest rules of thumb, originally created for diabetic meal planning:

$$\text{Men: } IBW = 48.0 + 2.7x \text{ (kg)} \qquad \text{Women: } IBW = 45.5 + 2.2x \text{ (kg)}$$

## Ideal Weight vs. Healthy BMI Range

While each IBW formula outputs a single number, the World Health Organization defines healthy weight as a broader range corresponding to a BMI between 18.5 and 25.0:

$$\text{Min Healthy Weight} = 18.5 \times \text{Height (m)}^2 \qquad \text{Max Healthy Weight} = 25.0 \times \text{Height (m)}^2$$

This range acknowledges that two people of the exact same height can differ by 15–20 kg (roughly 30–45 lbs) and both remain in a healthy weight range.

## Worked Examples

### Example 1: Male, 175 cm (Metric Input)

175 cm converts to $175 / 2.54 \approx 68.898$ inches, so $x = 68.898 - 60 = 8.898$.

Devine $= 50 + 2.3(8.898) \approx 70.5$ kg. Robinson $= 52 + 1.9(8.898) \approx 68.9$ kg. Miller $= 56.2 + 1.41(8.898) \approx 68.7$ kg. Hamwi $= 48 + 2.7(8.898) \approx 72.0$ kg.

Healthy BMI weight range at 1.75 m: $18.5(1.75)^2 \approx 56.7$ kg to $25.0(1.75)^2 \approx 76.6$ kg.

### Example 2: Female, 5 ft 4 in (Imperial Input)

5 ft 4 in converts to exactly 64 inches, so $x = 64 - 60 = 4$.

Devine $= 45.5 + 2.3(4) = 54.7$ kg. Robinson $= 49.0 + 1.7(4) = 55.8$ kg. Miller $= 53.1 + 1.36(4) \approx 58.5$ kg. Hamwi $= 45.5 + 2.2(4) = 54.3$ kg.

Healthy BMI weight range at 1.6256 m: $18.5(1.6256)^2 \approx 48.9$ kg to $25.0(1.6256)^2 \approx 66.1$ kg.

> [!NOTE]
> **Why metric and imperial inputs can diverge slightly**: A height typed as whole feet and inches, like 5 ft 9 in, converts to exactly 69 inches. The same height typed in metric as 175 cm converts to 68.898 inches — a fraction of an inch less, because 175 cm and 69 inches aren't perfectly equal (69 in = 175.26 cm). Since these formulas are sensitive to fractional inches, entering "the same" height in different unit systems can produce slightly different results.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: These formulas use only height and biological sex. They do not account for frame size, muscle mass, bone density, or age, all of which affect what weight is actually healthy for a specific individual.

## Frequently Asked Questions

### What is Ideal Body Weight (IBW)?

Ideal Body Weight is a statistical reference weight, calculated from height and biological sex using one of several clinical formulas, originally developed for medical purposes like drug dosing rather than as a personal target weight.

### Why do different formulas produce different weight numbers?

Each formula was published by different clinical researchers in different decades (Hamwi 1964, Devine 1974, Robinson 1983, Miller 1983) using slightly different population datasets and height multipliers.

### What happens if someone is under 5 feet tall?

For heights under 60 inches (5 feet), the calculator applies the same formulas with a negative value for inches-over-5-feet, producing a proportionally lower estimate rather than clamping the result.

### How does ideal weight differ from a healthy BMI range?

An IBW formula returns one specific number per formula. The WHO healthy BMI range instead returns a broad span of weights (BMI 18.5 to 25.0) that are all considered healthy for a given height, better reflecting the natural variation between individuals.
