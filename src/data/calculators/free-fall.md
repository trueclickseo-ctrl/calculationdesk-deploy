---
title: "Free Fall Calculator – Velocity and Distance for a Falling Object"
seoTitle: "Free Fall Calculator - Velocity & Distance | CalculationDesk"
metaDescription: "Enter a fall time to get the velocity and distance traveled by an object in free fall under standard Earth gravity, ignoring air resistance."
category: "science"
subcategory: "physics-calculators"
tags: ["free fall calculator", "falling object velocity", "gravity calculator", "kinematics free fall", "distance fallen calculator"]
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
  definition: "This calculator finds the velocity and distance traveled by an object falling freely under gravity for a given amount of time, assuming no air resistance."
  quickAnswer: "An object falling for 3 seconds reaches a velocity of about 29.42 m/s and has fallen about 44.13 meters."
  formulaSummary: "Velocity = g x t  |  Distance = 0.5 x g x t^2  (g = 9.80665 m/s^2)"
  whenToUse: "Use it for physics coursework problems, or to get a rough real-world estimate of how fast and how far something falls over a given time — keeping in mind it ignores air resistance."
  whoShouldUse: "Physics students and anyone estimating drop dynamics for a basic kinematics problem."
  limitations: "This is idealized free fall: it ignores air resistance, so it overstates both speed and distance for light or non-aerodynamic objects (like a sheet of paper) falling for more than a second or two. It also assumes the object starts from rest with zero initial velocity."
  keyTakeaways:
    - "Uses standard Earth gravity, g = 9.80665 m/s^2."
    - "Velocity grows linearly with time; distance grows with the square of time."
    - "Ignores air resistance, so real-world results diverge for light or high-drag objects."
peopleAlsoAsk:
  - "How fast do you fall after 3 seconds?"
  - "What is the formula for free fall distance?"
  - "Does free fall speed depend on mass?"
  - "What is terminal velocity and how is it different from free fall?"
examples:
  - title: "3-second fall"
    inputs: "Fall time = 3 seconds"
    calculation: "Velocity = 9.80665 x 3 = 29.42 m/s. Distance = 0.5 x 9.80665 x 3^2 = 44.13 m."
    result: "Velocity = 29.42 m/s, Distance fallen = 44.13 meters"
  - title: "5-second fall"
    inputs: "Fall time = 5 seconds"
    calculation: "Velocity = 9.80665 x 5 = 49.03 m/s. Distance = 0.5 x 9.80665 x 5^2 = 122.58 m."
    result: "Velocity = 49.03 m/s, Distance fallen = 122.58 meters"
faqs:
  - q: "How fast do you fall after 3 seconds?"
    a: "Under idealized free fall (no air resistance), you'd be moving at about 29.42 m/s (roughly 105.9 km/h) after 3 seconds, having fallen about 44.13 meters."
  - q: "What is the formula for free fall distance?"
    a: "Distance = 0.5 x g x t^2, where g is gravitational acceleration (9.80665 m/s^2 at Earth's surface) and t is the time in seconds since release. This assumes the object starts from rest."
  - q: "Does free fall speed depend on mass?"
    a: "No — in a vacuum, all objects accelerate at the same rate regardless of mass, which is why a hammer and a feather fall at the same speed on the Moon. On Earth, air resistance (not mass itself) is what makes light or high-drag objects fall slower than this idealized calculation predicts."
  - q: "What is terminal velocity and how is it different from free fall?"
    a: "Terminal velocity is the maximum speed a falling object reaches once air resistance balances the pull of gravity, after which it stops accelerating. This calculator models idealized free fall without air resistance, so it will overstate velocity and distance once a real object gets close to its terminal velocity."
references:
  - "https://www.nist.gov/pml/weights-and-measures/si-units-acceleration"
formulaDescription: "These are the two basic kinematics equations for constant acceleration starting from rest: velocity increases in direct proportion to time, while distance increases with the square of time, since it's the accumulated effect of a continuously increasing speed."
variablesExplained:
  - name: "t (time)"
    description: "Seconds elapsed since the object was released, starting from rest."
  - name: "g (gravity)"
    description: "Standard Earth gravitational acceleration, 9.80665 m/s^2, held constant by this calculator."
  - name: "v (velocity)"
    description: "Speed at time t, in meters per second."
  - name: "d (distance)"
    description: "Total distance fallen by time t, in meters."
stepByStep: "Enter the number of seconds the object has been falling. The calculator multiplies that time by standard gravity to get velocity, and uses the distance formula (half of gravity times time squared) to get how far it has fallen."
realWorldUses: "This is the standard first kinematics problem in introductory physics, and the same equations show up in estimating drop-test timing, rough fall-height calculations, and any scenario where air resistance is small enough to ignore over the time span involved."
commonMistakes:
  - "Forgetting the calculation assumes a start from rest — if the object had an initial velocity (like being thrown downward), these formulas need an extra term."
  - "Applying the result to a light, high-drag object (paper, a balloon) over several seconds, where real-world air resistance makes actual velocity and distance noticeably lower than this idealized figure."
---

# Free Fall Calculator

This calculator applies the standard constant-acceleration equations to find how fast an object is moving and how far it has fallen after a given number of seconds, assuming it starts from rest and air resistance is negligible.

## The formulas

Velocity grows linearly with time: **v = g × t**. Distance grows with the square of time, since speed itself is increasing the whole way down: **d = 0.5 × g × t²**. Both use standard Earth gravity, g = 9.80665 m/s².

## Why mass doesn't matter (in theory)

Because both equations depend only on time and gravitational acceleration, two objects of very different mass — a bowling ball and a marble — fall at exactly the same rate in a vacuum. The reason a feather clearly doesn't fall as fast as a hammer on Earth is air resistance, not mass; it's the interaction between an object's shape and the air, not its weight, that slows it down. This calculator doesn't model air resistance, so treat its output as an upper bound on speed and distance for anything other than a dense, compact object falling for a short time.
