'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The EV Charging Cost & Trip Planner is an interactive travel tool designed to calculate the electricity costs of driving an electric vehicle (EV) compared to a traditional gasoline car. By modeling battery capacity, driving range, electricity rates, and fuel prices, this calculator maps out the total trip energy cost, identifies the number of required charging stops, and computes your net savings. Road-trippers and daily commuters use this utility to budget their journeys and analyze the long-term economic advantages of electric mobility. You can compare fuel cost metrics on the official [US Department of Energy Fuel Economy website](https://www.fueleconomy.gov).',
  formula: `The core calculations are based on the following equations:

1. **EV Energy Consumption Rate**:
   $$\\text{Consumption Rate} = \\frac{\\text{Battery Capacity (kWh)}}{\\text{Full Range (mi or km)}} \\text{ kWh/unit}$$

2. **EV Trip Charging Cost**:
   $$\\text{EV Cost} = \\left( \\frac{\\text{Trip Distance}}{\\text{Full Range}} \\times \\text{Battery Capacity} \\right) \\times \\text{Electricity Price per kWh}$$

3. **Equivalent Gas Trip Cost**:
   $$\\text{Gas Cost} = \\left( \\frac{\\text{Trip Distance}}{\\text{Gas Efficiency}} \\right) \\times \\text{Gas Price}$$

4. **Required Charging Stops**:
   $$\\text{Stops} = \\begin{cases} 0 & \\text{if } D \\le R \\\\ \\lceil \\frac{D - R}{0.8 \\times R} \\rceil & \\text{if } D > R \\end{cases}$$
   Where $D$ is the trip distance and $R$ is the full range of the EV (assuming starting with 100% and charging at 20% remaining capacity). Knowing the ev charging cost calculator rules makes budgeting simple.`,
  example: `Let's analyze an EV charging cost calculation example. Suppose you plan a 500-mile road trip in a Tesla Model Y with a 75 kWh battery and a 300-mile full range. Your electricity cost is $0.16 per kWh. For comparison, you model a gas car getting 25 MPG at $3.50 per gallon.

1. **EV Trip Cost**:
   - Total energy required = (500 / 300) × 75 kWh = 125 kWh.
   - EV Trip Cost = 125 kWh × $0.16 = $20.00.

2. **Gas Trip Cost**:
   - Fuel required = 500 / 25 = 20 gallons.
   - Gas Trip Cost = 20 gallons × $3.50 = $70.00.

3. **Charging Stops**:
   - Since 500 miles exceeds the 300-mile range:
     $$\\text{Stops} = \\lceil \\frac{500 - 300}{0.8 \\times 300} \\rceil = \\lceil \\frac{200}{240} \\rceil = 1 \\text{ stop}$$

4. **Net Savings**:
   - Net Savings = $70.00 - $20.00 = $50.00.

Thus, driving an EV on this 500-mile trip saves $50.00 in fuel costs and requires exactly 1 charging stop.`,
  faqs: [
    {
      q: 'How long does it take to charge an EV on a trip?',
      a: 'Charging time depends on the charger type. Level 3 DC Fast Chargers (150kW - 350kW) can charge an EV from 10% to 80% in 15 to 30 minutes, which is the standard stop duration during road trips.',
    },
    {
      q: 'Why is the charging range buffer set to 80%?',
      a: 'EV batteries charge much slower after reaching 80% to protect the battery chemistry from overheating. During road trips, it is most time-efficient to charge up to 80% and resume driving rather than waiting for a full 100% charge.',
    },
    {
      q: 'Is charging an EV cheaper than buying gas?',
      a: 'Yes, in almost all regions, electricity is substantially cheaper than gasoline per mile driven. Even when using more expensive public fast chargers, the per-mile cost of driving an EV is typically 30% to 70% cheaper than a gas vehicle.',
    },
    {
      q: 'How does temperature affect EV range?',
      a: 'Extreme cold or heat can reduce EV driving range by 10% to 30%. Cold weather requires energy to heat the cabin and slows down battery electrochemical reactions, meaning you may need more frequent charging stops in winter.',
    },
    {
      q: 'Can I charge my EV at any public charging station?',
      a: 'Most EVs use standard CCS connectors or the North American Charging Standard (NACS) ports. Adapters allow almost all EVs to use different networks, including Tesla Superchargers and other public charging networks.',
    },
  ],
};

export default function EVTripPlanner() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'km'>('miles');
  
  const [tripDistance, setTripDistance] = useState<number>(500);
  const [batteryCapacity, setBatteryCapacity] = useState<number>(75);
  const [evRange, setEvRange] = useState<number>(300);
  const [electricityCost, setElectricityCost] = useState<number>(0.16);

  const [gasEfficiency, setGasEfficiency] = useState<number>(25); // MPG or L/100km
  const [gasPrice, setGasPrice] = useState<number>(3.50);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs',
    BDT: '৳',
    TRY: '₺',
  };

  const isValid = tripDistance > 0 && batteryCapacity > 0 && evRange > 0 && electricityCost >= 0 &&
                  gasEfficiency > 0 && gasPrice >= 0;

  let results = null;
  if (isValid) {
    // 1. EV Calculations
    const evEfficiency = (batteryCapacity * 1000) / evRange; // Wh per unit
    const electricityNeeded = (tripDistance / evRange) * batteryCapacity;
    const evCost = electricityNeeded * electricityCost;

    // 2. Gas Calculations
    let gasNeeded = 0;
    if (distanceUnit === 'miles') {
      gasNeeded = tripDistance / gasEfficiency; // Gallons
    } else {
      // For metric, gasEfficiency is typically L/100km
      gasNeeded = (tripDistance / 100) * gasEfficiency; // Litres
    }
    const gasCost = gasNeeded * gasPrice;

    // 3. Savings
    const savings = Math.max(0, gasCost - evCost);

    // 4. Charging Stops
    let chargingStops = 0;
    if (tripDistance > evRange) {
      chargingStops = Math.ceil((tripDistance - evRange) / (evRange * 0.8));
    }

    // Chart scale percentages
    const totalMax = Math.max(gasCost, evCost) || 1;
    const evPct = (evCost / totalMax) * 100;
    const gasPct = (gasCost / totalMax) * 100;

    results = {
      evEfficiency,
      electricityNeeded,
      evCost,
      gasCost,
      savings,
      chargingStops,
      evPct,
      gasPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (tripDistance <= 0) newErrors.tripDistance = 'Distance must be greater than zero';
    if (batteryCapacity <= 0) newErrors.batteryCapacity = 'Capacity must be greater than zero';
    if (evRange <= 0) newErrors.evRange = 'Range must be greater than zero';
    if (electricityCost < 0) newErrors.electricityCost = 'Price cannot be negative';
    if (gasEfficiency <= 0) newErrors.gasEfficiency = 'Efficiency must be greater than zero';
    if (gasPrice < 0) newErrors.gasPrice = 'Price cannot be negative';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setTripDistance(500);
    setBatteryCapacity(75);
    setEvRange(300);
    setElectricityCost(0.16);
    setGasEfficiency(25);
    setGasPrice(3.50);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Trip Parameters</h2>
            
            {/* Currency Selector */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="TRY">TRY (₺)</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            {/* Unit Toggles */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (distanceUnit === 'km') {
                    setDistanceUnit('miles');
                    setTripDistance(Math.round(tripDistance * 0.621371));
                    setEvRange(Math.round(evRange * 0.621371));
                    setGasEfficiency(Math.round(gasEfficiency * 2.35215)); // L/100km to MPG estimation
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${distanceUnit === 'miles' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Imperial (Miles / MPG)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (distanceUnit === 'miles') {
                    setDistanceUnit('km');
                    setTripDistance(Math.round(tripDistance * 1.609344));
                    setEvRange(Math.round(evRange * 1.609344));
                    setGasEfficiency(Math.round(235.215 / gasEfficiency)); // MPG to L/100km estimation
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${distanceUnit === 'km' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Metric (Km / L/100km)
              </button>
            </div>

            <div>
              <label htmlFor="trip-distance" className="block text-sm font-semibold text-foreground/80 mb-2">
                Trip Distance ({distanceUnit})
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="trip-distance"
                  type="number"
                  value={tripDistance || ''}
                  onChange={(e) => setTripDistance(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.tripDistance && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tripDistance}</p>}
            </div>

            {/* EV Parameters */}
            <div className="border-t border-border/60 pt-4">
              <h3 className="text-sm font-bold text-foreground mb-3">Electric Vehicle Settings</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="battery-capacity" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Battery Capacity (kWh)
                  </label>
                  <input
                    id="battery-capacity"
                    type="number"
                    value={batteryCapacity || ''}
                    onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.batteryCapacity && <p className="text-[10px] text-red-500 mt-1">{errors.batteryCapacity}</p>}
                </div>

                <div>
                  <label htmlFor="ev-range" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Full Range ({distanceUnit})
                  </label>
                  <input
                    id="ev-range"
                    type="number"
                    value={evRange || ''}
                    onChange={(e) => setEvRange(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.evRange && <p className="text-[10px] text-red-500 mt-1">{errors.evRange}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="electricity-cost" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                  Electricity Cost per kWh
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/40 font-semibold text-xs">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="electricity-cost"
                    type="number"
                    step="0.01"
                    value={electricityCost || ''}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="block w-full py-2.5 pl-6 pr-4 text-xs font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.electricityCost && <p className="text-[10px] text-red-500 mt-1">{errors.electricityCost}</p>}
              </div>
            </div>

            {/* Gas Parameters */}
            <div className="border-t border-border/60 pt-4">
              <h3 className="text-sm font-bold text-foreground mb-3">Gasoline Vehicle Comparison</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gas-efficiency" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Fuel Efficiency ({distanceUnit === 'miles' ? 'MPG' : 'L/100km'})
                  </label>
                  <input
                    id="gas-efficiency"
                    type="number"
                    value={gasEfficiency || ''}
                    onChange={(e) => setGasEfficiency(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.gasEfficiency && <p className="text-[10px] text-red-500 mt-1">{errors.gasEfficiency}</p>}
                </div>

                <div>
                  <label htmlFor="gas-price" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Gas Price per {distanceUnit === 'miles' ? 'Gallon' : 'Litre'}
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/40 font-semibold text-xs">
                      {currencySymbols[currency]}
                    </div>
                    <input
                      id="gas-price"
                      type="number"
                      step="0.01"
                      value={gasPrice || ''}
                      onChange={(e) => setGasPrice(Number(e.target.value))}
                      className="block w-full py-2.5 pl-6 pr-4 text-xs font-medium outline-none bg-transparent"
                    />
                  </div>
                  {errors.gasPrice && <p className="text-[10px] text-red-500 mt-1">{errors.gasPrice}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Plan EV Trip Cost
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
            <h2 className="text-xl font-bold text-foreground mb-6">Trip Projections & Savings</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Net Savings Panel */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Total Estimated Fuel Savings
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1.5">
                    {currencySymbols[currency]}{results.savings.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      EV Energy Cost
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.evCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-foreground/40 block mt-1.5">
                      Uses {results.electricityNeeded.toFixed(1)} kWh
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Gas Vehicle Cost
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.gasCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-foreground/40 block mt-1.5">
                      Equivalent fuel required
                    </span>
                  </div>
                </div>

                {/* Additional travel information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-3.5 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Charging Stops Needed
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.chargingStops} Stop{results.chargingStops !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3.5 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      EV Efficiency Rate
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.evEfficiency.toFixed(0)} Wh/{distanceUnit === 'miles' ? 'mi' : 'km'}
                    </span>
                  </div>
                </div>

                {/* Horizontal Cost comparison bar chart */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Cost Comparison</h4>
                  <div className="space-y-2.5">
                    {/* EV Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Electric Vehicle</span>
                        <span>{currencySymbols[currency]}{results.evCost.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${results.evPct}%` }} />
                      </div>
                    </div>

                    {/* Gas Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Gasoline Vehicle</span>
                        <span>{currencySymbols[currency]}{results.gasCost.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${results.gasPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter trip parameters to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
