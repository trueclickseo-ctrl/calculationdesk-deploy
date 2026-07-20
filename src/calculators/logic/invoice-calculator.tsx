'use client';

import React, { useState } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';

export const seoData = {
  whatIs: `The Invoice Calculator computes total billable amounts from itemized lines, incorporating individual unit pricing, quantities, percentage discounts, and specific tax rates.`,
  formula: `Invoice calculations process line items step-by-step:

**1. Line Item Subtotal:**
$$\\text{Line Subtotal} = \\text{Price} \\times \\text{Quantity}$$

**2. Line Item Discount:**
$$\\text{Line Discount} = \\text{Line Subtotal} \\times \\left( \\frac{\\text{Discount \\%}}{100} \\right)$$

**3. Line Item Tax:**
$$\\text{Line Tax} = (\\text{Line Subtotal} - \\text{Line Discount}) \\times \\left( \\frac{\\text{Tax \\%}}{100} \\right)$$

**4. Line Item Total:**
$$\\text{Line Total} = \\text{Line Subtotal} - \\text{Line Discount} + \\text{Line Tax}$$`,
  example: `**Calculate invoice with one item:**
- Product A: Price = $100, Qty = 2. Discount = 10%. Tax = 8%.
- Line Subtotal = $200.
- Discount Amount = $20. (Remaining = $180).
- Tax Amount = $180 × 0.08 = $14.40.
- Line Total = 180 + 14.40 = **$194.40**.`,
  faqs: [
    {
      q: 'What is an itemized invoice?',
      a: 'An itemized invoice lists every individual product or service sold along with its rate, quantity, applicable discount, and tax to ensure transparent billing.',
    },
    {
      q: 'How does item-level discount differ from invoice-level discount?',
      a: 'Item-level discount applies to specific items, whereas invoice-level discount is applied to the aggregate subtotal of all items at the end.',
    },
    {
      q: 'Is tax calculated before or after discount?',
      a: 'In standard accounting, sales tax is calculated on the discounted net price rather than the initial gross price.',
    },
  ],
};

interface InvoiceRow {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  tax: number;
}

export default function InvoiceCalculator() {
  const [rows, setRows] = useState<InvoiceRow[]>([
    { id: '1', name: 'Consulting Services', price: 150, quantity: 10, discount: 5, tax: 8 },
    { id: '2', name: 'Server Hardware', price: 1200, quantity: 1, discount: 10, tax: 5 },
  ]);

  const handleReset = () => {
    setRows([
      { id: '1', name: 'Consulting Services', price: 150, quantity: 10, discount: 5, tax: 8 },
      { id: '2', name: 'Server Hardware', price: 1200, quantity: 1, discount: 10, tax: 5 },
    ]);
  };

  const handleAddRow = () => {
    const newId = (Math.random() * 1000).toFixed(0);
    setRows([
      ...rows,
      { id: newId, name: `Line Item ${rows.length + 1}`, price: 100, quantity: 1, discount: 0, tax: 0 },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const handleUpdateRow = (id: string, field: keyof InvoiceRow, val: string | number) => {
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
  const subtotal = rows.reduce((sum, r) => {
    const p = isNaN(r.price) ? 0 : r.price;
    const q = isNaN(r.quantity) ? 0 : r.quantity;
    return sum + p * q;
  }, 0);

  const totalDiscount = rows.reduce((sum, r) => {
    const p = isNaN(r.price) ? 0 : r.price;
    const q = isNaN(r.quantity) ? 0 : r.quantity;
    const d = isNaN(r.discount) ? 0 : r.discount;
    return sum + (p * q) * (d / 100);
  }, 0);

  const totalTax = rows.reduce((sum, r) => {
    const p = isNaN(r.price) ? 0 : r.price;
    const q = isNaN(r.quantity) ? 0 : r.quantity;
    const d = isNaN(r.discount) ? 0 : r.discount;
    const t = isNaN(r.tax) ? 0 : r.tax;
    const net = (p * q) - (p * q) * (d / 100);
    return sum + net * (t / 100);
  }, 0);

  const grandTotal = subtotal - totalDiscount + totalTax;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ledger Panel */}
        <div className="lg:col-span-9 rounded-2xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Invoice Lines</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="min-w-[700px] space-y-4">
            <div className="grid grid-cols-12 gap-2.5 text-xs font-bold text-foreground/60 uppercase tracking-wider px-2">
              <span className="col-span-4">Item Name / Description</span>
              <span className="col-span-2">Price ($)</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-2">Disc (%)</span>
              <span className="col-span-1">Tax (%)</span>
              <span className="col-span-1 text-center">Action</span>
            </div>

            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.id} className="grid grid-cols-12 gap-2.5 items-center bg-background/50 border border-border p-2 rounded-xl">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleUpdateRow(row.id, 'name', e.target.value)}
                      className="block w-full py-1.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      value={isNaN(row.price) ? '' : row.price}
                      onChange={(e) => handleUpdateRow(row.id, 'price', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-1.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      value={isNaN(row.quantity) ? '' : row.quantity}
                      onChange={(e) => handleUpdateRow(row.id, 'quantity', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-1.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      value={isNaN(row.discount) ? '' : row.discount}
                      onChange={(e) => handleUpdateRow(row.id, 'discount', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-1.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-1">
                    <input
                      type="number"
                      value={isNaN(row.tax) ? '' : row.tax}
                      onChange={(e) => handleUpdateRow(row.id, 'tax', e.target.value === '' ? '' as unknown as number : Number(e.target.value))}
                      className="block w-full py-1.5 px-2 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      disabled={rows.length <= 1}
                      onClick={() => handleRemoveRow(row.id)}
                      className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
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
              Add Line Item
            </button>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Totals</h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Invoice Grand Total</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Subtotal:</span>
                  <span className="text-foreground font-bold">
                    ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Discounts Applied:</span>
                  <span className="text-red-500 font-bold">
                    -${totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                  <span className="text-foreground/50">Tax Component:</span>
                  <span className="text-foreground font-bold">
                    ${totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
