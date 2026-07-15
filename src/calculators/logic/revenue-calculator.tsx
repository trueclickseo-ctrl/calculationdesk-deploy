'use client';

import React, { useState } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';

export const seoData = {
  whatIs: `The Revenue Calculator computes total sales revenue, units sold, and average product price. It supports basic calculations as well as multi-item ledgers for sales projections.`,
  formula: `Revenue metrics are calculated from product price ($P$) and quantity ($Q$):

**1. Product Revenue:**
$$\\text{Revenue} = P \\times Q$$

**2. Total Revenue (Multi-Item Ledger):**
$$\\text{Total Revenue} = \\sum_{i=1}^{n} (P_i \\times Q_i)$$

**3. Average Product Selling Price:**
$$\\text{Average Price} = \\frac{\\text{Total Revenue}}{\\sum Q_i}$$`,
  example: `**Calculate revenue for 3 product lines:**
- Line A: 100 units at $15 each = $1,500.
- Line B: 50 units at $30 each = $1,500.
- Total Revenue = 1,500 + 1,500 = **$3,000**.
- Total Units = 150. Average Price = 3,000 / 150 = **$20.00**.`,
  faqs: [
    {
      q: 'What is revenue?',
      a: 'Revenue (also called sales or turnover) is the total amount of money brought in by a company\'s operations, calculated before any expenses are subtracted.',
    },
    {
      q: 'What is the difference between revenue and profit?',
      a: 'Revenue is the "top line" representing total gross income. Profit is the "bottom line" representing net income left over after subtracting all operating expenses, taxes, interest, and costs.',
    },
    {
      q: 'How does product pricing affect revenue?',
      a: 'Higher prices yield more revenue per unit but can decrease total quantity sold. Finding the optimal price-to-quantity balance is key to maximizing revenue.',
    },
  ],
};

interface ProductRow {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function RevenueCalculator() {
  const [rows, setRows] = useState<ProductRow[]>([
    { id: '1', name: 'Product A', price: 20, quantity: 100 },
    { id: '2', name: 'Product B', price: 50, quantity: 40 }
  ]);

  const handleReset = () => {
    setRows([
      { id: '1', name: 'Product A', price: 20, quantity: 100 },
      { id: '2', name: 'Product B', price: 50, quantity: 40 }
    ]);
  };

  const handleAddRow = () => {
    const newId = (Math.random() * 1000).toFixed(0);
    setRows([...rows, { id: newId, name: `Product ${String.fromCharCode(65 + rows.length)}`, price: 10, quantity: 10 }]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const handleUpdateRow = (id: string, field: 'name' | 'price' | 'quantity', val: string | number) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [field]: val,
          };
        }
        return row;
      })
    );
  };

  // Computations
  const totalUnits = rows.reduce((sum, r) => sum + (isNaN(r.quantity) ? 0 : r.quantity), 0);
  const totalRevenue = rows.reduce((sum, r) => {
    const price = isNaN(r.price) ? 0 : r.price;
    const qty = isNaN(r.quantity) ? 0 : r.quantity;
    return sum + price * qty;
  }, 0);

  const averagePrice = totalUnits > 0 ? totalRevenue / totalUnits : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Sales Ledger</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-bold text-foreground/60 uppercase tracking-wider px-2">
              <span className="col-span-5">Product Name</span>
              <span className="col-span-3">Unit Price ($)</span>
              <span className="col-span-3">Quantity</span>
              <span className="col-span-1 text-center">Action</span>
            </div>

            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-background/50 border border-border p-3 md:p-2 rounded-xl">
                  <div className="col-span-5">
                    <span className="block md:hidden text-[10px] font-bold text-foreground/55 mb-1">Product Name</span>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleUpdateRow(row.id, 'name', e.target.value)}
                      className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-3">
                    <span className="block md:hidden text-[10px] font-bold text-foreground/55 mb-1 mt-2">Unit Price ($)</span>
                    <input
                      type="number"
                      value={isNaN(row.price) ? '' : row.price}
                      onChange={(e) => handleUpdateRow(row.id, 'price', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-3">
                    <span className="block md:hidden text-[10px] font-bold text-foreground/55 mb-1 mt-2">Quantity</span>
                    <input
                      type="number"
                      value={isNaN(row.quantity) ? '' : row.quantity}
                      onChange={(e) => handleUpdateRow(row.id, 'quantity', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center mt-3 md:mt-0">
                    <button
                      type="button"
                      disabled={rows.length <= 1}
                      onClick={() => handleRemoveRow(row.id)}
                      className="p-2 text-foreground/40 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer pt-2"
            >
              <Plus className="h-4 w-4" />
              Add Product Line
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Revenue Summary</h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Revenue</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Total Units Sold:</span>
                  <span className="text-foreground font-bold">{totalUnits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold pt-1.5 border-t border-border/40">
                  <span className="text-foreground/50">Average Price / Unit:</span>
                  <span className="text-foreground font-bold">
                    ${averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
