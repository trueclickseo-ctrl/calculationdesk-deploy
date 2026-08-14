---
title: "Temperature Converter - Celsius, Fahrenheit & Kelvin"
seoTitle: "Temperature Converter - Convert Celsius, Fahrenheit & Kelvin | CalculationDesk"
metaDescription: "Free online temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly using exact formulas. Includes worked examples and explained conversions."
category: "conversion"
subcategory: "temperature-converters"
tags: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "celsius to kelvin"]
priority: "high"
importance: 9
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
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
  reason: "Very high search volume: celsius to fahrenheit"
titleVariants:
  - "Temperature Converter - Convert Celsius, Fahrenheit & Kelvin | CalculationDesk"
aiSummary:
  definition: "The Temperature Converter converts between Celsius (°C), Fahrenheit (°F), and Kelvin (K) using exact conversion formulas. The default example converts 25°C = 77°F = 298.15 K."
  quickAnswer: "°F = (°C x 9/5) + 32. °C = (°F - 32) x 5/9. K = °C + 273.15. Example: 25°C = 77°F = 298.15 K. Freezing: 0°C = 32°F = 273.15 K. Boiling: 100°C = 212°F = 373.15 K."
  formulaSummary: "C to F: °F = (°C x 9/5) + 32 | F to C: °C = (°F - 32) x 5/9 | C to K: K = °C + 273.15 | K to C: °C = K - 273.15"
  whenToUse: "Use when comparing weather temperatures between countries, following recipes from different regions, working with scientific data, or understanding temperature readings in lab or engineering contexts."
  whoShouldUse: "Travelers, cooks, scientists, engineers, students, and anyone who needs to make sense of temperatures expressed in an unfamiliar scale."
  limitations: "Converts temperatures at a single point. Converting a temperature change (a delta) requires a different calculation — see the explanation below."
  keyTakeaways:
    - "25°C = 77°F = 298.15 K — a comfortable room temperature in all three scales."
    - "Celsius and Kelvin have identical degree sizes — they differ only in where their zero point is."
    - "Kelvin is written K, not °K. There is no degree symbol."
    - "Fahrenheit and Celsius scales cross at exactly -40° (-40°C = -40°F)."
    - "Absolute zero (0 K) = -273.15°C = -459.67°F — the coldest temperature theoretically possible."
peopleAlsoAsk:
  - "How do I convert Celsius to Fahrenheit?"
  - "Is 0°C equal to 0 K?"
  - "Why is Kelvin written without a degree symbol?"
  - "At what temperature are Celsius and Fahrenheit equal?"
examples:
  - title: "Default Example: 25°C to Fahrenheit and Kelvin"
    inputs: "25°C"
    calculation: "To °F: (25 x 9/5) + 32 = 45 + 32 = 77°F. To K: 25 + 273.15 = 298.15 K."
    result: "25°C = 77°F = 298.15 K"
  - title: "Body Temperature: 37°C to Fahrenheit"
    inputs: "37°C"
    calculation: "(37 x 9/5) + 32 = 66.6 + 32 = 98.6°F"
    result: "37°C = 98.6°F"
  - title: "Cold Weather: -10°C to Fahrenheit and Kelvin"
    inputs: "-10°C"
    calculation: "To °F: (-10 x 9/5) + 32 = -18 + 32 = 14°F. To K: -10 + 273.15 = 263.15 K."
    result: "-10°C = 14°F = 263.15 K"
  - title: "Converting FROM Kelvin: 300 K to Celsius and Fahrenheit"
    inputs: "300 K"
    calculation: "To °C: 300 - 273.15 = 26.85°C. To °F: (26.85 x 9/5) + 32 = 48.33 + 32 = 80.33°F."
    result: "300 K = 26.85°C = 80.33°F"
faqs:
  - q: "How do I convert Celsius to Fahrenheit?"
    a: "Multiply the Celsius value by 9/5 (which equals 1.8), then add 32. Written out: °F = (°C x 1.8) + 32. For 20°C: (20 x 1.8) + 32 = 36 + 32 = 68°F. A quick mental shortcut: double the Celsius value and add 30. This isn't exact (it gives 70°F instead of 68°F for 20°C), but it's close enough for estimating outdoor temperatures."
  - q: "Is 0°C equal to 0 K?"
    a: "No. Zero degrees Celsius is 273.15 Kelvin. The two scales have identical degree sizes — a change of 1°C equals a change of 1 K — but their zero points are completely different. Zero Kelvin (absolute zero) equals -273.15°C, the coldest temperature theoretically possible. Zero Celsius is simply the freezing point of water under standard conditions."
  - q: "Why is Kelvin written without a degree symbol?"
    a: "Kelvin is a base unit of the SI (International System of Units), not a relative scale. You say '300 Kelvin' or '300 K', not '300 degrees Kelvin' or '300°K'. The degree symbol (°) is reserved for Celsius and Fahrenheit because they are relative temperature scales with arbitrary zero points. Kelvin is absolute, starting at the coldest possible physical state."
  - q: "At what temperature are Celsius and Fahrenheit equal?"
    a: "At exactly -40°. Both scales give the same number at -40°C = -40°F. This is the only temperature where the two scales coincide. Below -40°, Fahrenheit numbers are higher than Celsius; above -40°, Celsius numbers eventually become higher than Fahrenheit (which happens around 160°F = 71°C)."
  - q: "What is the difference between converting a temperature and converting a temperature change?"
    a: "Converting a temperature (like 20°C to Fahrenheit) uses the full formula including the offset: (20 x 9/5) + 32 = 68°F. But if you want to convert a temperature change — for example, 'the temperature rose by 5°C, what is that in °F?' — you only multiply by 9/5, without adding 32. A change of 5°C = 5 x 9/5 = 9°F change. The +32 offset only applies when converting absolute temperatures."
references:
  - "https://www.nist.gov/pml/weights-and-measures/si-units-temperature"
  - "https://www.bipm.org/en/measurement-units/kelvin"
formulaDescription: "Every conversion routes through Celsius internally: the input is first converted to Celsius (unchanged if already Celsius, (F-32)/1.8 if from Fahrenheit, or K-273.15 if from Kelvin), then that Celsius value is converted to the target unit (unchanged for Celsius, C x 1.8 + 32 for Fahrenheit, or C + 273.15 for Kelvin)."
variablesExplained:
  - name: "Celsius (°C)"
    description: "The metric temperature scale anchored to water's freezing (0°C) and boiling (100°C) points at standard pressure."
  - name: "Fahrenheit (°F)"
    description: "The US customary temperature scale, where water freezes at 32°F and boils at 212°F."
  - name: "Kelvin (K)"
    description: "The absolute SI temperature scale, where 0 K is absolute zero and each degree is the same size as a Celsius degree."
stepByStep: "Enter a temperature value and choose its From Unit (Celsius, Fahrenheit, or Kelvin) and To Unit. The calculator first normalizes your input to Celsius internally, then applies the appropriate formula to reach the target scale, while also displaying the same input value converted into all three scales at once."
realWorldUses: "Used by travelers converting foreign weather forecasts, by cooks converting oven temperatures between US recipes (Fahrenheit) and international ones (Celsius), and by students and lab technicians converting between Celsius and the absolute Kelvin scale used in scientific formulas."
commonMistakes:
  - "Applying the Celsius-to-Fahrenheit formula (multiply then add 32) to a temperature change/delta instead of an absolute temperature — a change of 5°C converts to a 9°F change, not to '9°F plus 32'."
  - "Writing Kelvin with a degree symbol ('°K') — Kelvin is an absolute SI unit and is correctly written simply as 'K' with no degree symbol."
---

# Temperature Converter – Celsius, Fahrenheit & Kelvin

### Three Different Ways to Measure Temperature

Temperature is one area where the US, Europe, and science all use different scales — and understanding what each scale actually measures makes the conversions far less mystifying.

**Celsius (°C)** is the metric system's temperature scale, used across most of the world for weather, cooking, and everyday life. It was designed around water: 0°C is the freezing point of water at standard pressure, and 100°C is the boiling point. The scale divides those 100 degrees into 100 equal intervals.

**Fahrenheit (°F)** is the everyday temperature scale used in the United States. It was calibrated differently: 32°F is the freezing point of water, and 212°F is the boiling point — a 180-degree interval. A comfortable room temperature is around 68-72°F, and body temperature is 98.6°F. The scale's larger number of degrees per the same physical range means Fahrenheit gives finer resolution for everyday temperature differences.

**Kelvin (K)** is the scientific temperature scale, fundamental to thermodynamics and physics. Its zero point — 0 K, called absolute zero — is the theoretical minimum temperature, where molecular motion effectively stops. 0 K = -273.15°C = -459.67°F. The size of one Kelvin degree is identical to one Celsius degree, which makes conversions between the two straightforward: K = °C + 273.15.

---

### The Conversion Formulas

**Celsius to Fahrenheit:**

$$^{\circ}\text{F} = (^{\circ}\text{C} \times \tfrac{9}{5}) + 32$$

This can also be written as °F = (°C × 1.8) + 32. The 9/5 factor accounts for the different scale intervals, and the +32 shifts the zero point from 0°C (Celsius zero = water freezing) to 32°F (Fahrenheit zero for the same event).

**Fahrenheit to Celsius:**

$$^{\circ}\text{C} = (^{\circ}\text{F} - 32) \times \tfrac{5}{9}$$

Subtract 32 first to remove the zero-point offset, then scale by 5/9 (the inverse of 9/5). For 98.6°F: (98.6 − 32) × 5/9 = 66.6 × 0.5556 = 37°C.

**Celsius to Kelvin:**

$$\text{K} = ^{\circ}\text{C} + 273.15$$

Because Celsius and Kelvin have the same degree size, this is just an addition. No multiplier needed.

**Kelvin to Celsius:**

$$^{\circ}\text{C} = \text{K} - 273.15$$

---

### Worked Examples

**25°C (room temperature):** (25 × 1.8) + 32 = 45 + 32 = **77°F**. And 25 + 273.15 = **298.15 K**. This is the default example shown in the calculator.

**100°C (boiling water):** (100 × 1.8) + 32 = 180 + 32 = **212°F**. A memorable benchmark.

**37°C (normal body temperature):** (37 × 1.8) + 32 = 66.6 + 32 = **98.6°F**.

**-10°C (cold winter day):** (-10 × 1.8) + 32 = -18 + 32 = **14°F**. And -10 + 273.15 = **263.15 K**.

**-40°C (the intersection point):** (-40 × 1.8) + 32 = -72 + 32 = **-40°F**. The only point where both scales agree.

---

### A Fourth Worked Example (Starting FROM Kelvin: 300 K)

Every earlier example started from Celsius. Here's a conversion that starts from Kelvin instead — **300 K**, a common laboratory reference temperature just above room temperature:

1. **Convert to Celsius**: 300 − 273.15 = **26.85°C**
2. **Convert to Fahrenheit**: (26.85 × 1.8) + 32 = 48.33 + 32 = **80.33°F**

*Verification Result: 300 K = **26.85°C** = **80.33°F**.*

---

### Why the Scales Feel Different

The Fahrenheit scale was designed for human comfort — spreading familiar outdoor temperatures (say, -10°F to 110°F) across a wider numeric range, which many people find more intuitive for daily weather. The Celsius scale is physically anchored to water's behavior, making it the natural choice for science and international standardization. Kelvin removes the concept of arbitrary zero points entirely, making it essential for thermodynamics, where temperatures must be positive numbers to make physical sense.

---

### Frequently Asked Questions (FAQ)

**Q1: How do I convert Celsius to Fahrenheit?**

Multiply the Celsius value by 9/5 (which equals 1.8), then add 32. Written out: °F = (°C × 1.8) + 32. For 20°C: (20 × 1.8) + 32 = 36 + 32 = 68°F. A quick mental shortcut: double the Celsius value and add 30. This isn't exact (it gives 70°F instead of 68°F for 20°C), but it's close enough for estimating outdoor temperatures.

**Q2: Is 0°C equal to 0 K?**

No. Zero degrees Celsius is 273.15 Kelvin. The two scales have identical degree sizes — a change of 1°C equals a change of 1 K — but their zero points are completely different. Zero Kelvin (absolute zero) equals -273.15°C, the coldest temperature theoretically possible. Zero Celsius is simply the freezing point of water under standard conditions.

**Q3: Why is Kelvin written without a degree symbol?**

Kelvin is a base unit of the SI (International System of Units), not a relative scale. You say "300 Kelvin" or "300 K", not "300 degrees Kelvin" or "300°K". The degree symbol (°) is reserved for Celsius and Fahrenheit because they are relative temperature scales with arbitrary zero points. Kelvin is absolute, starting at the coldest possible physical state.

**Q4: At what temperature are Celsius and Fahrenheit equal?**

At exactly -40°. Both scales give the same number at -40°C = -40°F. This is the only temperature where the two scales coincide. Below -40°, Fahrenheit numbers are higher than Celsius; above -40°, Celsius numbers eventually become higher than Fahrenheit (which happens around 160°F = 71°C).

**Q5: What is the difference between converting a temperature and converting a temperature change?**

Converting a temperature (like 20°C to Fahrenheit) uses the full formula including the offset: (20 × 9/5) + 32 = 68°F. But if you want to convert a temperature change — for example, "the temperature rose by 5°C, what is that in °F?" — you only multiply by 9/5, without adding 32. A change of 5°C = 5 × 9/5 = 9°F change. The +32 offset only applies when converting absolute temperatures.
