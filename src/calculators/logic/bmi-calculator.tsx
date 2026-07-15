'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `Body Mass Index (BMI) is a simple estimate of body fatness based on height and weight. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between.`,
  formula: `The formulas used to calculate BMI are:

**Metric Units:**
$$BMI = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}$$

**Imperial Units (US/UK standard):**
$$BMI = 703 \\times \\frac{\\text{Weight (lbs)}}{\\text{Height (inches)}^2}$$`,
  example: `Let's calculate the BMI for an adult who is 1.75 meters tall and weighs 70 kilograms.

1. Height squared = $1.75 \\times 1.75 = 3.0625$ square meters.
2. Divide weight by height squared:
   $$BMI = \\frac{70}{3.0625} \\approx 22.86$$
3. A BMI of 22.86 falls within the **Normal weight** category (18.5 to 24.9).`,
  faqs: [
    {
      q: 'What is a healthy BMI range?',
      a: 'For adults, a healthy BMI is defined as falling between 18.5 and 24.9. Scores below 18.5 are underweight, scores from 25 to 29.9 are overweight, and scores of 30 or higher are obese.',
    },
    {
      q: 'Does BMI apply to everyone?',
      a: 'BMI is an indirect estimate and is not perfectly accurate for everyone. For example, athletes with high muscle mass may have a high BMI which misclassifies them as overweight, while elderly individuals with muscle loss may fall into normal ranges despite having excess body fat.',
    },
    {
      q: 'How is BMR related to BMI?',
      a: 'BMR (Basal Metabolic Rate) is the minimum number of calories your body needs to function at rest. While BMI checks your weight proportion, BMR tells you how much energy (food calories) your body burns to sustain basic life functions.',
    },
  ],
};

export default function BmiCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // Metric defaults
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  
  // Imperial defaults
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate inline during render
  const totalInches = heightFt * 12 + heightIn;
  const isWeightValid = unitSystem === 'metric' ? (weightKg > 5 && weightKg <= 500) : (weightLbs > 10 && weightLbs <= 1100);
  const isHeightValid = unitSystem === 'metric' ? (heightCm > 50 && heightCm <= 300) : (totalInches > 20 && totalInches <= 120);
  const isValid = age > 2 && age <= 120 && isWeightValid && isHeightValid;

  // Compute results during render
  let results = null;
  if (isValid) {
    let w = 0; // in kg
    let h = 0; // in meters
    let hCm = 0;

    if (unitSystem === 'metric') {
      w = weightKg;
      h = heightCm / 100;
      hCm = heightCm;
    } else {
      w = weightLbs * 0.45359237;
      h = (totalInches * 2.54) / 100;
      hCm = totalInches * 2.54;
    }

    const bmi = w / (h * h);

    // Categories
    let category = '';
    let colorClass = '';
    let bgClass = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      colorClass = 'text-blue-500';
      bgClass = 'bg-blue-500';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      colorClass = 'text-green-600 dark:text-green-500';
      bgClass = 'bg-green-500';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      colorClass = 'text-amber-500';
      bgClass = 'bg-amber-500';
    } else {
      category = 'Obese';
      colorClass = 'text-red-500';
      bgClass = 'bg-red-500';
    }

    // Healthy weight boundaries
    const hRangeMinKg = 18.5 * (h * h);
    const hRangeMaxKg = 24.9 * (h * h);

    let healthyRangeMin = hRangeMinKg;
    let healthyRangeMax = hRangeMaxKg;

    if (unitSystem === 'imperial') {
      healthyRangeMin = hRangeMinKg / 0.45359237;
      healthyRangeMax = hRangeMaxKg / 0.45359237;
    }

    // Basal Metabolic Rate (Mifflin-St Jeor Equation)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * hCm - 5 * age + 5;
    } else {
      bmr = 10 * w + 6.25 * hCm - 5 * age - 161;
    }

    results = {
      bmi,
      category,
      colorClass,
      bgClass,
      healthyRangeMin,
      healthyRangeMax,
      bmr,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (age <= 2 || age > 120) newErrors.age = 'Age must be between 2 and 120';
    
    if (unitSystem === 'metric') {
      if (weightKg <= 5 || weightKg > 500) newErrors.weight = 'Weight must be between 5kg and 500kg';
      if (heightCm <= 50 || heightCm > 300) newErrors.height = 'Height must be between 50cm and 300cm';
    } else {
      if (weightLbs <= 10 || weightLbs > 1100) newErrors.weight = 'Weight must be between 10lbs and 1100lbs';
      if (totalInches <= 20 || totalInches > 120) newErrors.height = 'Height must be between 2ft and 10ft';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setAge(25);
    setGender('male');
    setWeightKg(70);
    setHeightCm(175);
    setWeightLbs(154);
    setHeightFt(5);
    setHeightIn(9);
    setErrors({});
  };

  // Convert position on slider scale (from BMI 15 to 40)
  const getPercentageForBmi = (score: number) => {
    const min = 15;
    const max = 40;
    if (score <= min) return 0;
    if (score >= max) return 100;
    return ((score - min) / (max - min)) * 100;
  };

  const needlePosition = results ? getPercentageForBmi(results.bmi) : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Calculate Your BMI</h2>
            <div className="flex rounded-xl border border-border bg-background p-1.5 gap-1 select-none">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  unitSystem === 'metric' ? 'bg-primary text-white' : 'text-foreground/75 hover:bg-border'
                }`}
              >
                Metric (kg/cm)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  unitSystem === 'imperial' ? 'bg-primary text-white' : 'text-foreground/75 hover:bg-border'
                }`}
              >
                Imperial (lbs/in)
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Gender Toggle */}
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Gender</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    gender === 'male'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    gender === 'female'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-background hover:bg-border text-foreground/70'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-foreground/80 mb-2">
                Age (years)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="age"
                  type="number"
                  value={age || ''}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
            </div>

            {/* Height Inputs */}
            {unitSystem === 'metric' ? (
              <div>
                <label htmlFor="height-cm" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Height
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    cm
                  </div>
                  <input
                    id="height-cm"
                    type="number"
                    value={heightCm || ''}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-12 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
              </div>
            ) : (
              <div>
                <span className="block text-sm font-semibold text-foreground/80 mb-2">Height</span>
                <div className="flex gap-2">
                  <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                      ft
                    </div>
                    <input
                      id="height-ft"
                      type="number"
                      value={heightFt || ''}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                  <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                      in
                    </div>
                    <input
                      id="height-in"
                      type="number"
                      value={heightIn || ''}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                </div>
                {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
              </div>
            )}

            {/* Weight Inputs */}
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-foreground/80 mb-2">
                Weight
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {unitSystem === 'metric' ? 'kg' : 'lbs'}
                </div>
                <input
                  id="weight"
                  type="number"
                  value={unitSystem === 'metric' ? (weightKg || '') : (weightLbs || '')}
                  onChange={(e) => {
                    if (unitSystem === 'metric') {
                      setWeightKg(Number(e.target.value));
                    } else {
                      setWeightLbs(Number(e.target.value));
                    }
                  }}
                  className="block w-full py-3 pl-4 pr-12 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">BMI Assessment</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Score */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-5 border border-border text-center flex flex-col justify-center">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Your BMI Score
                    </span>
                    <span className="block text-4xl font-extrabold text-foreground mt-2">
                      {results.bmi.toFixed(1)}
                    </span>
                    <span className={`block text-sm font-extrabold uppercase mt-2.5 tracking-wide ${results.colorClass}`}>
                      {results.category}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-5 border border-border text-center flex flex-col justify-center">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Basal Metabolic Rate
                    </span>
                    <span className="block text-2xl font-extrabold text-foreground mt-2">
                      {Math.round(results.bmr).toLocaleString()}
                    </span>
                    <span className="block text-xs text-foreground/50 mt-1 uppercase tracking-wider font-semibold">
                      Calories/Day (BMR)
                    </span>
                  </div>
                </div>

                {/* Color gauge slider bar */}
                <div className="space-y-2 pt-2">
                  <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 to-red-500">
                    {/* Needle Indicator */}
                    <div 
                      className="absolute -top-1.5 h-7 w-2.5 rounded-full border border-black bg-white shadow-md transform -translate-x-1/2 transition-all duration-500 ease-out"
                      style={{ left: `${needlePosition}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-foreground/40 px-0.5">
                    <span>15.0 (Min)</span>
                    <span>18.5</span>
                    <span>25.0</span>
                    <span>30.0</span>
                    <span>40.0 (Max)</span>
                  </div>
                  <div className="grid grid-cols-4 text-center text-[9px] font-bold tracking-wider uppercase text-foreground/50 mt-1 bg-background/50 rounded-lg p-1.5 border border-border">
                    <span className="text-blue-500">&lt;18.5 Under</span>
                    <span className="text-green-600 dark:text-green-500">18.5-24.9 Norm</span>
                    <span className="text-amber-500">25-29.9 Over</span>
                    <span className="text-red-500">30+ Obese</span>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between text-sm py-2.5 border-b border-border">
                    <span className="text-foreground/60 font-semibold">Healthy weight range for height:</span>
                    <span className="font-bold text-foreground">
                      {results.healthyRangeMin.toFixed(1)} - {results.healthyRangeMax.toFixed(1)} {unitSystem === 'metric' ? 'kg' : 'lbs'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-2.5 border-b border-border">
                    <span className="text-foreground/60 font-semibold">BMR Calorie needs (by activity level):</span>
                    <span className="font-bold text-foreground"></span>
                  </div>
                  
                  {/* Calorie breakdown based on activity */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="rounded-lg p-2.5 bg-background border border-border">
                      <span className="block text-[10px] text-foreground/40 uppercase font-bold tracking-wider">Sedentary</span>
                      <span className="block mt-0.5 text-foreground font-bold">{Math.round(results.bmr * 1.2).toLocaleString()} kcal/day</span>
                    </div>
                    <div className="rounded-lg p-2.5 bg-background border border-border">
                      <span className="block text-[10px] text-foreground/40 uppercase font-bold tracking-wider">Light Activity</span>
                      <span className="block mt-0.5 text-foreground font-bold">{Math.round(results.bmr * 1.375).toLocaleString()} kcal/day</span>
                    </div>
                    <div className="rounded-lg p-2.5 bg-background border border-border">
                      <span className="block text-[10px] text-foreground/40 uppercase font-bold tracking-wider">Moderate Sport</span>
                      <span className="block mt-0.5 text-foreground font-bold">{Math.round(results.bmr * 1.55).toLocaleString()} kcal/day</span>
                    </div>
                    <div className="rounded-lg p-2.5 bg-background border border-border">
                      <span className="block text-[10px] text-foreground/40 uppercase font-bold tracking-wider">Very Active</span>
                      <span className="block mt-0.5 text-foreground font-bold">{Math.round(results.bmr * 1.725).toLocaleString()} kcal/day</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter your physical details to view assessment.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
