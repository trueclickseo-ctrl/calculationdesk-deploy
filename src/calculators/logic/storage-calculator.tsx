'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The RAID Storage Capacity Calculator helps system administrators plan disk storage pools. It computes usable capacity, parity loss, and drive fault tolerance under RAID 0, RAID 1, RAID 5, RAID 6, and RAID 10.`,
  formula: `RAID usable space calculations utilize individual drive counts ($N$) and capacity ($C$):

**1. RAID 0 (Striping):**
$$\\text{Capacity} = N \\times C \\quad (\\text{No parity, tolerance } = 0)$$

**2. RAID 1 (Mirroring):**
$$\\text{Capacity} = C \\quad (\\text{Tolerance } = N - 1)$$

**3. RAID 5 (Parity Striping):**
$$\\text{Capacity} = (N - 1) \\times C \\quad (\\text{Tolerance } = 1)$$

**4. RAID 6 (Double Parity):**
$$\\text{Capacity} = (N - 2) \\times C \\quad (\\text{Tolerance } = 2)$$

**5. RAID 10 (Mirrored Stripe):**
$$\\text{Capacity} = \\left( \\frac{N}{2} \\right) \\times C \\quad (\\text{Requires even } N \\ge 4)$$`,
  example: `**Calculate usable capacity for 4 x 4 TB drives in a RAID 5 array:**
- Drive Count $N = 4$. Drive Capacity $C = 4$ TB.
- RAID 5 Usable Capacity = (4 - 1) × 4 = **12 TB**.
- Parity overhead = **4 TB**. Fault tolerance = **1 drive** failure.`,
  faqs: [
    {
      q: 'What is RAID?',
      a: 'RAID stands for Redundant Array of Independent Disks. It is a data storage virtualization technology that combines multiple physical hard drives into a single logical unit for redundancy, performance, or both.',
    },
    {
      q: 'Why does my operating system show less storage space than calculated?',
      a: 'Drive manufacturers define storage in decimal capacity (e.g. 1 TB = 1,000,000,000,000 bytes), whereas operating systems calculate capacity in binary (e.g. 1 TiB = 1,099,511,627,776 bytes). This creates an approximate 9% difference in displayed capacity.',
    },
    {
      q: 'What RAID level is best for security and performance?',
      a: 'RAID 10 provides the best combination of speed and fault tolerance because it mirrors and stripes data, but it requires at least 4 drives and sacrifices 50% of total storage capacity.',
    },
  ],
};

type RaidLevel = '0' | '1' | '5' | '6' | '10';

export default function StorageCalculator() {
  const [drives, setDrives] = useState<number>(4);
  const [capacity, setCapacity] = useState<number>(2); // e.g. 2 TB
  const [unit, setUnit] = useState<string>('TB');
  const [raid, setRaid] = useState<RaidLevel>('5');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDrives(4);
    setCapacity(2);
    setUnit('TB');
    setRaid('5');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(drives) && drives > 0 && !isNaN(capacity) && capacity > 0;

  const validateRaid = (r: RaidLevel, numDrives: number): string | null => {
    if (r === '1' && numDrives < 2) return 'RAID 1 requires at least 2 drives';
    if (r === '5' && numDrives < 3) return 'RAID 5 requires at least 3 drives';
    if (r === '6' && numDrives < 4) return 'RAID 6 requires at least 4 drives';
    if (r === '10') {
      if (numDrives < 4) return 'RAID 10 requires at least 4 drives';
      if (numDrives % 2 !== 0) return 'RAID 10 requires an even number of drives';
    }
    return null;
  };

  if (isValid) {
    const configError = validateRaid(raid, drives);
    if (!configError) {
      let usable = 0;
      let tolerance = '';
      let description = '';

      if (raid === '0') {
        usable = drives * capacity;
        tolerance = '0 drives';
        description = 'Data is striped across all disks. High speed, but no redudancy. A single disk failure destroys all data.';
      } else if (raid === '1') {
        usable = capacity;
        tolerance = `${drives - 1} drive(s)`;
        description = 'Data is mirrored across all drives. Extremely safe, but inefficient storage utilization.';
      } else if (raid === '5') {
        usable = (drives - 1) * capacity;
        tolerance = '1 drive';
        description = 'Block-level striping with distributed parity. Good balance of speed, protection, and capacity.';
      } else if (raid === '6') {
        usable = (drives - 2) * capacity;
        tolerance = '2 drives';
        description = 'Block-level striping with double distributed parity. Can survive two simultaneous drive failures.';
      } else {
        usable = (drives / 2) * capacity;
        tolerance = '1 drive per mirror group (up to N/2 drives)';
        description = 'A stripe of mirrors. Combines the speeds of RAID 0 with the redundancy of RAID 1.';
      }

      const totalRaw = drives * capacity;
      const loss = totalRaw - usable;

      results = {
        usable,
        loss,
        totalRaw,
        tolerance,
        description,
      };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (drives <= 0 || isNaN(drives)) newErrors.drives = 'Drive count must be greater than zero';
    if (capacity <= 0 || isNaN(capacity)) newErrors.capacity = 'Capacity must be greater than zero';
    
    const raidVal = validateRaid(raid, drives);
    if (raidVal) newErrors.raid = raidVal;

    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Pool Configurations</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="raid-level" className="block text-sm font-semibold text-foreground/80 mb-2">RAID Level</label>
              <select
                id="raid-level"
                value={raid}
                onChange={(e) => { setRaid(e.target.value as RaidLevel); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="0">RAID 0 (Striping)</option>
                <option value="1">RAID 1 (Mirroring)</option>
                <option value="5">RAID 5 (Single Parity)</option>
                <option value="6">RAID 6 (Double Parity)</option>
                <option value="10">RAID 10 (Stripe of Mirrors)</option>
              </select>
              {errors.raid && <p className="text-xs text-red-500 mt-1 font-medium">{errors.raid}</p>}
            </div>

            <div>
              <label htmlFor="drive-count" className="block text-sm font-semibold text-foreground/80 mb-2">Number of Hard Drives</label>
              <input
                id="drive-count"
                type="number"
                value={drives}
                onChange={(e) => { setDrives(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.drives && <p className="text-xs text-red-500 mt-1 font-medium">{errors.drives}</p>}
            </div>

            <div>
              <label htmlFor="drive-capacity" className="block text-sm font-semibold text-foreground/80 mb-2">Hard Drive Capacity</label>
              <div className="flex gap-2">
                <input
                  id="drive-capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => { setCapacity(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={unit}
                  onChange={(e) => { setUnit(e.target.value); setErrors({}); }}
                  className="w-24 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
              {errors.capacity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.capacity}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Storage Pools
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">RAID Array Summary</h2>

            {results && !errors.raid ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Usable Array Storage</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.usable.toLocaleString()} {unit}
                  </span>
                  <p className="block text-[11px] font-semibold text-foreground/50 mt-2 leading-relaxed">
                    {results.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Fault Tolerance Limit</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.tolerance}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Parity/Mirror Overhead</span>
                    <span className="block text-base font-bold text-red-500 mt-1">
                      {results.loss.toLocaleString()} {unit}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Total Raw Aggregate Storage:</span>
                  <span className="text-foreground font-bold">{results.totalRaw.toLocaleString()} {unit}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter drive pool configurations.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
