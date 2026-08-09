---
title: "Projectile Motion Calculator – Range and Height from Launch"
seoTitle: "Projectile Motion Calculator | CalculationDesk"
metaDescription: "Calculate horizontal range and peak height of a projectile from launch velocity and angle, using standard kinematics."
category: "physics"
subcategory: "mechanics-calculators"
tags: ["projectile motion calculator", "trajectory calculator", "range and height calculator", "launch angle calculator"]
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
  definition: "This calculator finds the horizontal range and peak height of a projectile launched at a given velocity and angle, using standard vacuum kinematics equations."
  quickAnswer: "A projectile launched at 20 m/s at a 45° angle travels approximately 40.79 meters horizontally and reaches a peak height of about 10.20 meters."
  formulaSummary: "Range = (v^2 x sin(2 x theta)) / g; Peak Height = (v^2 x sin(theta)^2) / (2 x g), where g = 9.80665 m/s^2."
  whenToUse: "Use it for physics problems involving objects launched at an angle — projectiles, thrown balls, or any object undergoing idealized parabolic motion — where you need the horizontal distance traveled and the maximum height reached."
  whoShouldUse: "Physics students working through kinematics problems involving launched or thrown objects."
  limitations: "This solves idealized vacuum kinematics equations that ignore air resistance, spin effects, and wind — real-world projectiles, particularly lightweight or fast-moving ones, experience meaningfully shorter range and altered trajectories due to air drag that this calculation doesn't account for."
  keyTakeaways:
    - "A launch angle of 45 degrees produces the maximum possible range for a given launch velocity in idealized vacuum conditions, since sin(2 x 45°) = sin(90°) = 1, the maximum value the sine function can reach."
    - "Range and peak height both scale with the square of launch velocity, meaning doubling the launch speed quadruples both the maximum distance and the maximum height reached."
    - "These formulas describe idealized motion without air resistance — real projectiles, especially light or irregularly shaped ones, fall meaningfully short of the calculated range due to aerodynamic drag."
peopleAlsoAsk:
  - "Why does a 45-degree angle give maximum range?"
  - "How does air resistance change a real projectile's trajectory?"
  - "What launch angles produce the same range?"
  - "How is peak height related to time in the air?"
examples:
  - title: "20 m/s launch at 45 degrees"
    inputs: "Velocity = 20 m/s, Angle = 45°"
    calculation: "Range = (20^2 x sin(90°)) / 9.80665 ≈ 40.79; Height = (20^2 x sin(45°)^2) / (2 x 9.80665) ≈ 10.20"
    result: "Range ≈ 40.79 meters, Peak Height ≈ 10.20 meters"
faqs:
  - q: "Why does a 45-degree angle give maximum range?"
    a: "The range formula includes sin(2 × angle), and the sine function reaches its maximum value of 1 when its argument is 90 degrees — which happens exactly when the launch angle is 45 degrees (since 2 × 45° = 90°). Any angle above or below 45 degrees produces a smaller sine value and therefore a shorter range, assuming identical launch velocity and no air resistance."
  - q: "How does air resistance change a real projectile's trajectory?"
    a: "Air resistance continuously removes energy from a moving projectile, which reduces both its horizontal range and its peak height compared to the idealized vacuum calculation, and also makes the descending half of the trajectory steeper than the ascending half. The effect is more pronounced for lightweight, low-density, or high-speed projectiles (where drag force is larger relative to the object's momentum) than for dense, compact, slower-moving ones."
  - q: "What launch angles produce the same range?"
    a: "Any pair of complementary angles that sum to 90 degrees — such as 30° and 60°, or 20° and 70° — produce identical range at a given launch velocity in ideal conditions, because sin(2 × angle) gives the same value for both angles in each pair. The trajectories differ in shape, though: the higher angle produces a taller, slower arc, while the lower angle produces a flatter, faster one, even though both land at the same distance."
  - q: "How is peak height related to time in the air?"
    a: "In idealized projectile motion, the object spends exactly half its total flight time rising to peak height and the other half falling back down, since the trajectory is symmetric under gravity alone. The time to reach peak height equals the vertical component of launch velocity divided by gravitational acceleration, and doubling that figure gives the total time the projectile spends in the air before landing at the same height it launched from."
references:
  - "https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion"
formulaDescription: "These are the standard kinematic equations for idealized projectile motion under constant gravitational acceleration with no air resistance. Range comes from resolving the launch velocity into horizontal and vertical components and solving for when the projectile returns to its launch height; peak height comes from finding when the vertical velocity component reaches zero at the top of the arc."
variablesExplained:
  - name: "Velocity"
    description: "The projectile's launch speed, in meters per second."
  - name: "Angle"
    description: "The launch angle measured from horizontal, in degrees."
stepByStep: "Enter the launch velocity in meters per second and the launch angle in degrees. The calculator applies the standard projectile motion equations to return both the horizontal range and the peak height reached."
realWorldUses: "Physics students use these formulas to solve textbook kinematics problems, and they provide a useful first-approximation baseline for sports and engineering applications involving thrown or launched objects, before accounting for the additional real-world effects of air resistance and spin."
commonMistakes:
  - "Entering the launch angle in radians instead of degrees, or vice versa, without converting, which produces a badly incorrect result since trigonometric functions require the correct unit."
  - "Applying this idealized no-air-resistance formula to a lightweight or fast-moving real-world projectile and expecting the actual measured range to match closely, when air drag can meaningfully shorten real-world range."
---

# Projectile Motion Calculator

Enter a launch velocity and angle, and this calculator returns the horizontal range and peak height of the resulting projectile trajectory.

## Formula

**Range = (v² × sin(2θ)) ÷ g** and **Peak Height = (v² × sin²(θ)) ÷ (2g)**, where g = 9.80665 m/s².

For a launch at 20 m/s and 45°: Range = (20² × sin(90°)) ÷ 9.80665 ≈ 40.79 meters; Peak Height = (20² × sin²(45°)) ÷ (2 × 9.80665) ≈ 10.20 meters.

## Why 45 degrees is the magic number for range

The range formula depends on sin(2θ), and that function peaks at a value of 1 exactly when 2θ equals 90 degrees — in other words, when the launch angle itself is 45 degrees. Any angle steeper or shallower than that produces a smaller sine value and therefore less range for the same launch speed, assuming ideal conditions with no air resistance. This is also why complementary angle pairs (30°/60°, 20°/70°) land at the same distance despite tracing very different arc shapes.

## What this calculation leaves out

These are idealized vacuum kinematics equations — no air resistance, no spin, no wind. Real projectiles, especially lighter or faster ones, experience meaningful aerodynamic drag that shortens their actual range and steepens the falling half of their trajectory compared to what this formula predicts. Treat the results here as a clean physics baseline, not a precise real-world forecast for things like thrown balls or fired projectiles.
