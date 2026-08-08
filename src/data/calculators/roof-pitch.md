---
title: "Roof Pitch Calculator – Convert Rise-Over-Run to a Slope Angle"
seoTitle: "Roof Pitch Calculator - Rise, Run & Slope Angle | CalculationDesk"
metaDescription: "Enter a roof's vertical rise per 12 inches of run to get the slope angle in degrees, plus the matching x-in-12 pitch notation roofers use."
category: "construction"
subcategory: "roofing-calculators"
tags: ["roof pitch calculator", "roof slope calculator", "rise over run roof", "roof angle calculator", "x in 12 pitch"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
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
  definition: "This calculator converts a roof's rise (in inches, measured over a standard 12-inch run) into a slope angle in degrees, using basic trigonometry."
  quickAnswer: "A roof with 4 inches of rise per 12 inches of run — written as a 4/12 pitch — has a slope angle of about 18.4 degrees."
  formulaSummary: "Angle = arctan(Rise / 12) x (180 / pi)"
  whenToUse: "Use it when a rise-over-run pitch (like 6/12) needs to be converted to degrees for a rafter square, framing square, or solar panel mounting spec, or when you need to go the other way and turn a known angle into a pitch."
  whoShouldUse: "DIY builders, roofers, framers, and anyone specifying solar panel or antenna mounts that reference roof angle."
  limitations: "Assumes the rise is measured over the standard 12-inch run used in US roofing notation. It does not account for hip, valley, or gable-end framing complexity, and it doesn't calculate rafter length or material quantities."
  keyTakeaways:
    - "Converts a rise-over-12 pitch into a slope angle in degrees."
    - "Uses the same rise/run convention as a framing square or rafter square."
    - "A 12/12 pitch is a 45-degree roof; anything above that is steeper than 45 degrees."
peopleAlsoAsk:
  - "What does a 4/12 roof pitch mean?"
  - "How do you convert roof pitch to degrees?"
  - "What is considered a steep roof pitch?"
  - "What pitch is a 45-degree roof?"
examples:
  - title: "Standard 4/12 Pitch"
    inputs: "Rise = 4 inches per 12-inch run"
    calculation: "Angle = arctan(4 / 12) x (180 / pi) = arctan(0.3333) x 57.2958 = 18.435 degrees"
    result: "Slope angle = 18.4 degrees (a common pitch for ranch-style homes)"
  - title: "Steep 9/12 Pitch"
    inputs: "Rise = 9 inches per 12-inch run"
    calculation: "Angle = arctan(9 / 12) x (180 / pi) = arctan(0.75) x 57.2958 = 36.870 degrees"
    result: "Slope angle = 36.9 degrees (a steep residential roof, common in snow-heavy regions)"
faqs:
  - q: "What does a 4/12 roof pitch mean?"
    a: "It means the roof rises 4 inches vertically for every 12 inches of horizontal run. It's read as \"four-in-twelve\" and works out to an 18.4-degree slope."
  - q: "How do you convert roof pitch to degrees?"
    a: "Divide the rise by 12, take the arctangent of that number, then convert from radians to degrees. That's exactly what this calculator does — you only need to enter the rise."
  - q: "What is considered a steep roof pitch?"
    a: "Roofs at or above 6/12 (about 26.6 degrees) are generally considered steep-slope roofing for construction purposes. Anything under 4/12 is typically classed as low-slope and needs different underlayment and material specs."
  - q: "What pitch is a 45-degree roof?"
    a: "A 12/12 pitch is exactly 45 degrees, since the rise and run are equal. Pitches steeper than 12/12 exceed 45 degrees."
references:
  - "https://www.nachi.org/roof-pitch.htm"
formulaDescription: "Roofing pitch is expressed as rise over a fixed 12-inch run rather than as a true rise-over-run ratio, so converting it to an angle means dividing the rise by 12 and taking the arctangent — the same trigonometry used to find any angle from a right triangle's opposite and adjacent sides."
variablesExplained:
  - name: "Rise"
    description: "How many inches the roof climbs vertically for every 12 inches it runs horizontally. This is the number stamped on a pitch gauge or read off a rafter square."
  - name: "Run"
    description: "Fixed at 12 inches, matching the standard US roofing convention (a '6/12' roof, an '8/12' roof, and so on)."
stepByStep: "Measure or look up the roof's rise per 12 inches of run — often stamped on the truss plans or read directly off a pitch gauge held against the roof. Enter that rise value. The calculator divides it by 12 and converts the resulting angle to degrees."
realWorldUses: "Framers use the angle to set a circular saw's bevel for rafter cuts, solar installers use it to calculate optimal panel tilt and mounting hardware angles, and it's a quick way to translate a pitch spec on a blueprint into a number a rafter angle finder can check on site."
commonMistakes:
  - "Confusing 'rise' with the full roof height — this calculator wants the rise per 12 inches of run, not the total vertical height of the roof."
  - "Mixing up degrees and pitch notation when specifying materials — some shingle or underlayment specs are written in degrees, others in x/12 pitch, and the two aren't interchangeable at a glance."
---

# Roof Pitch Calculator

Roofers describe slope as a pitch — "6/12," "8/12," and so on — rather than as a degree measurement. That notation is convenient with a framing square on the roof, but it's not the number a solar mounting spec, a bevel gauge, or a structural calculation usually wants. This calculator does the trigonometry for you: enter the rise per 12 inches of run, and it returns the equivalent slope angle in degrees.

## Reading a pitch number

A "6/12" roof rises 6 inches for every 12 inches of horizontal run. Divide the rise by 12 to get the tangent of the slope angle, then take the arctangent to get degrees. A few reference points are worth keeping in mind: 4/12 is a common, moderate pitch on ranch-style homes (18.4°); 6/12 is a widely used "standard" pitch (26.6°); 12/12 is exactly 45°, since rise and run are equal.

| Pitch (rise/12) | Angle | Typical Use |
| :--- | :---: | :--- |
| 3/12 | 14.0° | Low-slope, needs specific underlayment |
| 4/12 | 18.4° | Common ranch/traditional pitch |
| 6/12 | 26.6° | Widely used "standard" residential pitch |
| 8/12 | 33.7° | Steeper, common in colder climates |
| 12/12 | 45.0° | Equal rise and run |

## Why the angle matters beyond the roof

Solar installers use the slope angle to figure out how close a roof-mounted panel array sits to its ideal tilt for the local latitude — a mismatch usually just costs some efficiency rather than being a hard blocker. Framers use it to set a saw's bevel angle before cutting rafter tails or fascia boards to the correct slope, since a miter/bevel gauge speaks in degrees, not in "x/12."
