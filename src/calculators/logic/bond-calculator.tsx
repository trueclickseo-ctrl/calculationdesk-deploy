'use client';
import React, { useState } from 'react';
import { Landmark } from 'lucide-react';

export default function BondCalculator() {
  const [face, setFace] = useState(1000);
  const [coupon, setCoupon] = useState(5);
  const [price, setPrice] = useState(950);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const annualPayment = face * (coupon / 100);
    const yieldToCurrent = (annualPayment / price) * 100;
    setResult(Math.round(yieldToCurrent * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Landmark className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Bond Yield Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={face} onChange={e => setFace(Number(e.target.value))} placeholder="Face Value" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={coupon} onChange={e => setCoupon(Number(e.target.value))} placeholder="Coupon Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Current Bond Price" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Current Yield</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Current Yield: {result}%</p>}
      </div>
    </div>
  );
}