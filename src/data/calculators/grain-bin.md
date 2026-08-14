---
title: "Grain Bin Capacity Calculator – Estimate Grain Storage Capacity"
seoTitle: "Grain Bin Capacity Calculator - Estimate Bushel Storage | CalculationDesk"
metaDescription: "Calculate total volume (cu ft), standard bushel capacity, and packed bushel storage for round agricultural grain bins using ring wall dimensions."
category: "agriculture"
subcategory: "storage-calculators"
tags: ["grain bin capacity calculator", "bushels in grain bin", "grain bin volume calculator", "packed bushel capacity", "grain storage capacity estimator"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-14"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-14"
nextReviewDate: "2026-11-14"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary agricultural grain bin volume and packed bushel capacity estimation query"
titleVariants:
  - "Grain Bin Capacity Calculator - Estimate Bushel Storage | CalculationDesk"
aiSummary:
  definition: "The Grain Bin Capacity Calculator estimates total cylindrical volume (cubic feet), standard volumetric bushels, and compaction-adjusted packed bushel storage capacity for agricultural grain bins."
  quickAnswer: "A round grain bin measuring 24 feet in diameter with an 18-foot ring wall height has a main cylinder volume of 8,143 cubic feet, yielding 6,543 standard bushels and 6,871 packed bushels under a 5% compaction factor."
  formulaSummary: "Cylinder Volume V = pi * (Diameter/2)^2 * Height | Standard Bushels = V * 0.803564 | Packed Bushels = StandardBushels * (1 + PackFactor%/100)"
  whenToUse: "Use this capacity planner when evaluating harvest grain storage allocation, auditing bin inventory, or planning on-farm grain bin construction."
  whoShouldUse: "Farmers, grain elevator operators, agricultural engineers, commodity traders, and crop consultants."
  limitations: "Calculates main cylindrical wall capacity. Excludes peak cone roof volume (typically reserved for aeration headspace) and does not calculate grain weight without test weight conversion."
  keyTakeaways:
    - "Calculates Cylinder Volume (cu ft), Standard Bushels, and Packed Bushel Capacity."
    - "Uses the imperial volumetric bushel constant (1 cu ft = 0.803564 bushels)."
    - "Applies a user-defined Compaction Pack Factor (default 5%) to model grain settling under weight."
    - "Explains the difference between volumetric bushels and commercial test weight (lbs/bu)."
peopleAlsoAsk:
  - "How many bushels are in a 24 ft grain bin?"
  - "What is a grain bin pack factor?"
  - "How many cubic feet are in a bushel of grain?"
  - "Why is the roof cone excluded from standard grain bin calculations?"
examples:
  - title: "24 ft Diameter x 18 ft Wall Height Bin (5% Pack Factor)"
    inputs: "Bin Diameter = 24 ft, Ring Wall Height = 18 ft, Compaction Pack Factor = 5%"
    calculation: "Step 1: Radius R = 24 / 2 = 12 ft. Step 2: Cylinder Volume V = pi * 12^2 * 18 = 3.1415926 * 144 * 18 = 8,143.01 cubic feet. Step 3: Standard Bushels = 8,143.01 * 0.803564 = 6,543.4 Bushels. Step 4: Packed Bushels = 6,543.4 * (1 + 0.05) = 6,870.6 -> 6,871 Bushels."
    result: "Packed Bushel Capacity = 6,871 Bushels | Standard Bushels = 6,543 bu | Cylinder Volume = 8,143 cu ft"
  - title: "30 ft Diameter x 24 ft Wall Height Bin (6% Pack Factor)"
    inputs: "Bin Diameter = 30 ft, Ring Wall Height = 24 ft, Compaction Pack Factor = 6%"
    calculation: "Step 1: Radius R = 15 ft. Step 2: Volume V = pi * 15^2 * 24 = 16,964.60 cu ft. Step 3: Standard Bushels = 16,964.60 * 0.803564 = 13,632.1 bu. Step 4: Packed Bushels = 13,632.1 * 1.06 = 14,450.1 -> 14,450 Bushels."
    result: "Packed Bushel Capacity = 14,450 Bushels | Standard Bushels = 13,632 bu | Cylinder Volume = 16,965 cu ft"
faqs:
  - q: "What is the difference between a volumetric bushel and a weight bushel?"
    a: "A volumetric bushel is a unit of volume (1 bushel = 1.244456 cu ft). A weight bushel is a commercial standard mass (e.g. 56 lbs for corn, 60 lbs for wheat, 32 lbs for oats). Bin capacity measures volumetric space."
  - q: "What is a grain bin Pack Factor?"
    a: "As grain is loaded into a bin, the weight of the upper grain compresses the grain below, increasing bulk density. The pack factor (typically 3% to 8%) adjusts standard volume to reflect packed storage capacity."
  - q: "Why is the top roof cone excluded from bin capacity formulas?"
    a: "While the roof cone adds 10% to 15% additional volume, good grain management leaves the roof cone empty to allow proper air circulation, humidity venting, and grain leveling."
references:
  - "https://extension.umn.edu/"
  - "https://www.grains.org/"
formulaDescription: "The calculator treats the grain bin's main storage area as a simple cylinder, halving the diameter to get the radius and applying the standard cylinder volume formula (pi times radius squared times wall height) to get cubic feet. That volume is converted to standard volumetric bushels using the fixed constant of 0.803564 bushels per cubic foot, then adjusted upward by the entered compaction pack factor to estimate real-world packed storage capacity, since grain compresses under its own weight as bin depth increases."
variablesExplained:
  - name: "Bin Diameter"
    description: "The horizontal diameter of the cylindrical grain bin's ring wall, in feet, halved to compute the radius used in the volume formula."
  - name: "Ring Wall Height"
    description: "The vertical height of the bin's straight cylindrical wall section, in feet, excluding the peak roof cone which is typically left empty for aeration."
  - name: "Compaction Pack Factor"
    description: "A percentage (typically 3% to 8%, defaulting to 5%) applied on top of the standard volumetric bushel figure to account for grain settling and compacting under its own weight as the bin fills."
stepByStep: "1) Measure the bin's ring wall diameter and height in feet. 2) Select an appropriate compaction pack factor based on grain moisture content (drier grain packs more, around 5% to 8%; wetter grain packs less, around 2% to 4%). 3) The calculator computes the cylinder volume in cubic feet, converts it to standard volumetric bushels using the fixed conversion constant, then applies the pack factor to estimate the final packed bushel storage capacity."
realWorldUses: "Used by farmers and grain elevator operators to plan harvest storage allocation across multiple bins, to audit existing bin inventory capacity before a new harvest season, by agricultural engineers sizing new bin construction projects, and by crop consultants and commodity traders estimating total on-farm storage capacity for logistics and marketing planning."
commonMistakes:
  - "Including the roof cone volume in capacity estimates - standard practice leaves the cone headspace empty for aeration fan airflow and humidity venting, so it is excluded from the main cylinder calculation."
  - "Using the wrong pack factor for grain moisture conditions - dry grain (13% to 15% moisture) packs more densely than high-moisture grain (above 18%), so applying a flat pack factor regardless of moisture can over- or under-estimate real capacity."
  - "Confusing volumetric bushels with weight-based commercial bushels - a volumetric bushel is a fixed unit of space (1.244456 cubic feet), while a 56-lb corn bushel or 60-lb wheat bushel is a weight-based commercial standard; converting bin volume to crop tonnage requires the crop's specific test weight, not just the volumetric bushel count."
  - "Exceeding structural wall load limits with high-moisture grain - wet grain weighs significantly more per cubic foot than dry grain, and treating all grain types as equally light can risk bin wall buckling or collapse."
---

# Grain Bin Capacity Calculator – Estimate Grain Storage Capacity

Managing harvest logistics requires knowing exact on-farm grain bin storage capacity. Over-estimating bin capacity can leave harvested crops stranded in field wagons, while under-estimating capacity results in underutilized grain storage facilities.

This calculator computes **Packed Bushel Capacity**, **Standard Bushels**, and **Cylinder Volume (cu ft)** using bin diameter, ring wall height, and compaction pack factors.

---

### Formulas & Mathematical Model

The calculator determines grain bin storage capacity using cylinder volume geometry, imperial bushel conversion constants, and packing factors:

#### 1. Cylinder Wall Volume ($V_{\text{cuft}}$, in cubic feet)
$$\text{Radius (R)} = \frac{\text{Bin Diameter (ft)}}{2}$$
$$V_{\text{cuft}} = \pi \times R^2 \times \text{Ring Wall Height (ft)}$$

#### 2. Standard Volumetric Bushel Capacity ($C_{\text{std}}$)
One imperial volumetric bushel equals $1.244456$ cubic feet. Conversely, one cubic foot holds approximately $0.803564$ bushels:

$$C_{\text{std}} = V_{\text{cuft}} \times 0.803564$$

#### 3. Packed Bushel Capacity ($C_{\text{pack}}$)
Grain compacts under its own weight as depth increases. Applying a user-selected **Compaction Pack Factor** ($P$, default 5%):

$$\mathbf{C_{\text{pack}} = C_{\text{std}} \times \left( 1 + \frac{P}{100} \right)}$$

---

### Grain Bin Capacity & Crop Weight Reference Matrix

The table below illustrates volumetric storage capacities and equivalent crop weights (using standard USDA test weights) for a **24-foot diameter bin** with an **18-foot wall height** (at 5% pack factor):

| Crop Type | USDA Standard Test Weight | Standard Bushels | Packed Bushel Capacity | Equivalent Crop Mass (Tons) | Equivalent Crop Mass (Lbs) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Shelled Corn** | **56 lbs / bushel** | 6,543 bu | **6,871 bu** | **192.4 Tons** | 384,776 lbs |
| **Soybeans** | **60 lbs / bushel** | 6,543 bu | **6,871 bu** | **206.1 Tons** | 412,260 lbs |
| **Wheat / Soy** | **60 lbs / bushel** | 6,543 bu | **6,871 bu** | **206.1 Tons** | 412,260 lbs |
| **Grain Sorghum** | **56 lbs / bushel** | 6,543 bu | **6,871 bu** | **192.4 Tons** | 384,776 lbs |
| **Oats** | **32 lbs / bushel** | 6,543 bu | **6,871 bu** | **109.9 Tons** | 219,872 lbs |

---

### Verified Step-by-Step Worked Example

Let's calculate the storage capacity for a round grain bin **24 feet in diameter** with an **18-foot ring wall height** and a **5% pack factor**:

#### Step 1: Calculate Cylinder Volume ($V_{\text{cuft}}$)
$$R = \frac{24}{2} = 12 \text{ feet}$$
$$V_{\text{cuft}} = \pi \times (12)^2 \times 18 = 3.14159265 \times 144 \times 18 = \mathbf{8,143.01 \text{ cubic feet}}$$

#### Step 2: Compute Standard Volumetric Bushels ($C_{\text{std}}$)
$$C_{\text{std}} = 8,143.01 \times 0.803564 = \mathbf{6,543.4 \text{ Bushels}}$$

#### Step 3: Compute Packed Bushel Capacity ($C_{\text{pack}}$)
$$C_{\text{pack}} = 6,543.4 \times (1 + 0.05) = 6,543.4 \times 1.05 = \mathbf{6,871 \text{ Packed Bushels}}$$

---

### Second Worked Example: Larger Bin with Higher Pack Factor

Let's calculate the storage capacity for a round grain bin **30 feet in diameter** with a **24-foot ring wall height** and a **6% pack factor**:

#### Step 1: Calculate Cylinder Volume ($V_{\text{cuft}}$)
$$R = \frac{30}{2} = 15 \text{ feet}$$
$$V_{\text{cuft}} = \pi \times (15)^2 \times 24 = \mathbf{16,964.60 \text{ cubic feet}}$$

#### Step 2: Compute Standard Volumetric Bushels ($C_{\text{std}}$)
$$C_{\text{std}} = 16,964.60 \times 0.803564 = \mathbf{13,632.1 \text{ Bushels}}$$

#### Step 3: Compute Packed Bushel Capacity ($C_{\text{pack}}$)
$$C_{\text{pack}} = 13,632.1 \times (1 + 0.06) = 13,632.1 \times 1.06 = \mathbf{14,450 \text{ Packed Bushels}}$$

> [!NOTE]
> Despite the second bin having roughly double the cylinder volume of the first, its packed bushel capacity is a bit more than double (14,450 vs. 6,871) - the extra boost comes from both the larger volume and the slightly higher 6% pack factor compared to the first example's 5%.

---

### Essential Grain Storage Safety Protocols

> [!CAUTION]
> - **Grain Engulfment Hazard**: Never enter a grain bin while grain is being unloaded. Flowing grain acts like quicksand, pulling an adult under in less than 5 seconds.
> - **Structural Load Limits**: High-moisture grain (>18% moisture) weighs more per cubic foot and compacts less than dry grain. Exceeding structural wall load limits can cause bin wall collapse or buckling.
> - **Aeration Headspace**: Always leave 1 to 2 feet of space below the eaves for aeration fans to exhaust moisture.

To project field yield before filling bins, check our [Corn Yield Estimator](/calculators/corn-yield/) or model livestock forage needs with the [Cattle per Acre Calculator](/calculators/cattle-per-acre/).

---

### Frequently Asked Questions (FAQ)

* **Q1: How does grain moisture content affect pack factor?**
  * A1: Dry grain (13–15% moisture) slides easily and packs more densely (5%–8% pack factor). High-moisture grain (>18%) has higher friction and packs less (2%–4% pack factor).
* **Q2: Does this calculator include hopper-bottom grain bins?**
  * A2: This calculator models flat-bottom cylindrical bins. For hopper-bottom bins, add the volume of the lower cone (one-third times pi times radius squared times cone height) to the cylinder volume.
* **Q3: How do I convert packed bushel capacity into a specific crop's total weight?**
  * A3: Multiply the packed bushel capacity by that crop's USDA standard test weight per bushel (56 lbs for corn, 60 lbs for wheat or soybeans, 32 lbs for oats). For example, 6,871 packed bushels of corn equals 6,871 x 56 = 384,776 lbs, or about 192.4 tons.
