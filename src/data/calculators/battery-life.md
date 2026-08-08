---
title: "Battery Life Calculator – Estimate Runtime From Battery Capacity and Current Draw"
seoTitle: "Battery Life Calculator - Calculate Battery Runtime & Capacity | CalculationDesk"
metaDescription: "Estimate battery runtime in hours and days based on battery capacity in mAh, load current draw in mA, and safety discharge thresholds."
category: "technology"
subcategory: "electronics-calculators"
tags: ["battery life calculator", "mah battery runtime calculator", "calculate battery hours", "battery discharge safety margin", "device current draw calculator"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
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
  reason: "Primary electronic device battery capacity, current draw, and runtime calculation query"
titleVariants:
  - "Battery Life Calculator - Calculate Battery Runtime & Capacity | CalculationDesk"
aiSummary:
  definition: "The Battery Life Calculator estimates operational device run time (in hours and days) based on nominal battery cell capacity (mAh), constant load current draw (mA), and safety discharge depth thresholds."
  quickAnswer: "A 2,000 mAh rechargeable battery powering a device drawing 200 mA with a 20% safety discharge margin provides 1,600 mAh of usable capacity, delivering an estimated operational runtime of 8.00 hours."
  formulaSummary: "UsableCapacity (mAh) = Capacity * (1 - Margin%/100) | Runtime (Hours) = UsableCapacity / CurrentDraw (mA)"
  whenToUse: "Use this battery estimator when designing IoT microcontrollers, choosing portable power banks, or planning battery backup runtimes."
  whoShouldUse: "Electronics hobbyists, IoT engineers, robotics builders, drone operators, and field technicians."
  limitations: "Assumes a constant current load. Real devices experience dynamic power spikes from wireless radios (Wi-Fi/Bluetooth) and screen brightness changes."
  keyTakeaways:
 - "Calculates Estimated Battery Run Time (formatted in days/hours/minutes), Usable Capacity (mAh), and Total Run Hours."
 - "Factors in Safety Discharge Margins (typically 15% to 30%) to prevent lithium cell degradation."
 - "Explains the difference between milliampere-hours (mAh) and Watt-hours (Wh)."
 - "Highlights how ambient operating temperatures alter internal battery cell resistance."
peopleAlsoAsk:
  - "How long will a 2,000 mAh battery last drawing 200 mA?"
  - "Why is a safety discharge margin necessary for lithium batteries?"
  - "What is the difference between mAh and Wh?"
  - "Why does cold weather reduce battery runtime?"
examples:
  - title: "2,000 mAh Battery with 200 mA Load (20% Safety Discharge Margin)"
    inputs: "Battery Capacity = 2,000 mAh, Device Current Draw = 200 mA, Safety Discharge Margin = 20%"
    calculation: "Step 1: Usable Capacity = 2,000 * (1 - 0.20) = 2,000 * 0.80 = 1,600 mAh. Step 2: Total Run Hours = 1,600 / 200 = 8.00 hours. Step 3: Formatted runtime = 8h 0m."
    result: "Estimated Battery Run Time = 8h 0m | Usable Capacity = 1,600 mAh | Estimated Run Hours = 8.00 hours"
  - title: "5,000 mAh Power Bank powering 500 mA Microcontroller (15% Safety Margin)"
    inputs: "Battery Capacity = 5,000 mAh, Device Current Draw = 500 mA, Safety Discharge Margin = 15%"
    calculation: "Step 1: Usable Capacity = 5,000 * (1 - 0.15) = 4,250 mAh. Step 2: Total Run Hours = 4,250 / 500 = 8.50 hours (8h 30m)."
    result: "Estimated Battery Run Time = 8h 30m | Usable Capacity = 4,250 mAh | Estimated Run Hours = 8.50 hours"
faqs:
  - q: "What does mAh (Milliampere-hour) measure?"
    a: "mAh measures electric charge capacity—the continuous current (in milliamperes) a battery can deliver for one full hour before reaching its cutoff voltage."
  - q: "Why should I include a Safety Discharge Margin (Depth of Discharge)?"
    a: "Draining rechargeable batteries (especially Lithium-Ion, LiPo, or Lead-Acid) to 0% nominal voltage causes chemical copper shunting, permanent cell capacity loss, and reduced total cycle life. Maintaining a 15% to 20% safety threshold prolongs battery health."
  - q: "What is the difference between mAh and Watt-hours (Wh)?"
    a: "mAh measures electric charge regardless of cell voltage. Watt-hours (Wh) measures true total energy capacity by factoring in voltage ($\text{Wh} = \text{Ah} \times \text{Volts}$). A 10,000 mAh battery at 3.7V provides 37 Wh of energy."
references:
  - "https://www.ieee.org/"
---

# Battery Life Calculator – Estimate Runtime From Battery Capacity and Current Draw

Whether you are designing a remote IoT sensor node, sizing a portable power bank for camping, or evaluating smartphone battery performance, estimating operational runtime is a core electrical engineering step. However, simple calculations often overestimate real-world battery life because they assume 100% of a battery's rated capacity can be safely discharged.

This calculator computes **Estimated Battery Run Time (formatted)**, **Usable Capacity (mAh)**, and **Estimated Run Hours** using nominal capacity, load current, and **Safety Discharge Margins**.

---

### Discharge Formulas & Depth-of-Discharge (DoD) Mechanics

The calculator converts total rated capacity into usable capacity by subtracting the user-selected **Safety Discharge Margin** ($M_{\%}$, default 20%):

#### 1. Usable Battery Capacity ($C_{\text{usable}}$, in mAh)
$$C_{\text{usable}} = \text{Nominal Capacity (mAh)} \times \left( 1 - \frac{\text{Discharge Margin \%}}{100} \right)$$

#### 2. Total Operational Runtime ($T_{\text{hours}}$, in hours)
Dividing usable capacity by constant device current draw ($I$, in milliamperes):

$$\mathbf{T_{\text{hours}} = \frac{C_{\text{usable}}}{I}}$$

#### 3. Time Formatting Breakdown
Total hours are formatted into integer **Days**, **Hours**, and **Minutes**:

$$\text{Days} = \lfloor T / 24 \rfloor, \quad \text{Hours} = \lfloor T \bmod 24 \rfloor, \quad \text{Minutes} = \text{round}((T \times 60) \bmod 60)$$

---

### Battery Chemistry & Safety Margin Reference Matrix

Different battery chemistries require distinct Depth of Discharge (DoD) safety margins to prevent permanent cell degradation:

| Battery Chemistry | Typical Nominal Cell Voltage | Recommended Safety Discharge Margin | Max Safe Depth of Discharge (DoD) | Chemical Degradation Risk at 0% |
| :--- | :---: | :---: | :---: | :--- |
| **Lithium-Ion (Li-ion)** | **3.7 V** | **15% – 20% (Baseline)** | **80% – 85%** | Anode copper dissolution & capacity loss |
| **Lithium Polymer (LiPo)**| 3.7 V | **20% – 25%** | 75% – 80% | Cell swelling & internal resistance spike |
| **LiFePO4 (Lithium Iron)**| 3.2 V | **10% – 15%** | 85% – 90% | Highly resilient; minimal degradation |
| **Lead-Acid (AGM/Gel)** | 12.0 V | **50%** | 50% | Severe plate sulfation if discharged below 50% |
| **NiMH (Nickel Metal)** | 1.2 V | **10%** | 90% | Memory effect & high self-discharge rates |

---

### Verified Step-by-Step Worked Example

Let's calculate the runtime for a **2,000 mAh Lithium-ion battery** powering a sensor circuit drawing **200 mA** with a **20% safety discharge margin**:

#### Step 1: Calculate Usable Capacity ($C_{\text{usable}}$)
$$C_{\text{usable}} = 2,000 \text{ mAh} \times \left( 1 - \frac{20}{100} \right) = 2,000 \times 0.80 = \mathbf{1,600 \text{ mAh}}$$

#### Step 2: Compute Total Run Hours ($T_{\text{hours}}$)
$$T_{\text{hours}} = \frac{1,600 \text{ mAh}}{200 \text{ mA}} = \mathbf{8.00 \text{ Hours}}$$

#### Step 3: Format Output Time
$$\mathbf{\text{Formatted Runtime} = 8\text{h } 0\text{m}}$$

---

### Real-World Factors Reducing Battery Runtime

> [!WARNING]
> - **Constant-Current Assumption**: This calculator assumes a steady, constant current draw. In real devices, background Wi-Fi transmission spikes, display backlight toggles, and CPU burst loads increase average current draw.
> - **Peukert's Law (High Discharge Rates)**: Discharging a battery at extremely high rates (e.g. discharging a 2,000 mAh cell at 4,000 mA) causes internal resistance heating, reducing effective delivered capacity by 20% to 30%.
> - **Cold Temperature Impact**: Operating batteries in sub-zero temperatures ($<32^\circ\text{F} / 0^\circ\text{C}$) increases electrolyte viscosity, temporarily suppressing available voltage and capacity.

To calculate data transfer times during network syncs, check out our [Download Time Calculator](file:///d:/Project-Calculator/src/data/calculators/download-time.md) or estimate daily tech power usage with the [Data Usage Calculator](file:///d:/Project-Calculator/src/data/calculators/data-usage.md).

---

### Frequently Asked Questions (FAQ)

* **Q1: How do I convert Watt-hours (Wh) to mAh?**
  * A1: Use the formula: $\text{mAh} = \left( \frac{\text{Wh}}{\text{Voltage}} \right) \times 1,000$. For example, a 37 Wh laptop battery at 11.1V equals $3,333 \text{ mAh}$.
* **Q2: Does a battery self-discharge when not in use?**
  * A2: Yes. Lithium batteries self-discharge at roughly **1% to 2% per month**, while NiMH batteries can lose up to **10% to 20% in the first month** of storage.
