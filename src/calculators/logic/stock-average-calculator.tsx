'use client';

import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Stock Average Calculator is a financial tool used by stock market investors and traders to determine the average cost price of shares purchased in multiple transactions (also known as dollar-cost averaging or averaging down). When you buy additional shares of a stock at different prices, this calculator calculates the new average purchase price of your entire holding.`,
  formula: `The formula to calculate the average stock purchase price is:

$$\\text{Average Price} = \\frac{\\sum (\\text{Quantity}_k \\times \\text{Price}_k)}{\\sum \\text{Quantity}_k}$$

Where:
- **Quantity_k** is the number of shares bought in transaction *k*.
- **Price_k** is the purchase price per share in transaction *k*.
- The numerator is the total cost of all shares bought, and the denominator is the total quantity of shares owned.`,
  example: `Suppose you buy shares of a stock in three different transactions:
1. Transaction 1: 100 shares at $50 each. (Cost = 100 × $50 = $5,000)
2. Transaction 2: 50 shares at $45 each. (Cost = 50 × $45 = $2,250)
3. Transaction 3: 200 shares at $40 each. (Cost = 200 × $40 = $8,000)

**Averaging calculation:**
- Total Quantity = 100 + 50 + 200 = 350 shares.
- Total Investment = $5,000 + $2,250 + $8,000 = $15,250.
- Average Price = $15,250 / 350 ≈ $43.57 per share.`,
  faqs: [
    {
      q: 'What does "averaging down" mean in stocks?',
      a: 'Averaging down is a strategy where an investor buys more shares of a stock as its price declines. This lowers the average cost basis of the overall stock holding, meaning the stock has to rise less to break even or show a profit.',
    },
    {
      q: 'Does stock averaging guarantee profits?',
      a: 'No. While averaging down lowers your entry barrier, it increases your total capital exposure. If the stock continues to drop due to weak company fundamentals, you will accumulate larger losses.',
    },
    {
      q: 'Can this calculator be used for cryptocurrencies?',
      a: 'Yes. The same mathematical formula applies to determine the average buy price of crypto tokens, commodities, mutual funds, or any asset bought in fractions.',
    },
  ],
};

interface BuyRow {
  id: number;
  quantity: number;
  price: number;
}

export default function StockAverageCalculator() {
  const [rows, setRows] = useState<BuyRow[]>([
    { id: 1, quantity: 100, price: 50 },
    { id: 2, quantity: 50, price: 40 },
  ]);
  const [errors, setErrors] = useState<string>('');

  // Validate inputs
  const isValid = rows.length > 0 && rows.every(r => r.quantity > 0 && r.price > 0);

  let results = null;
  if (isValid) {
    let totalQuantity = 0;
    let totalCost = 0;

    rows.forEach(r => {
      totalQuantity += r.quantity;
      totalCost += r.quantity * r.price;
    });

    const averagePrice = totalCost / totalQuantity;

    results = {
      totalQuantity,
      totalCost,
      averagePrice,
    };
  }

  const handleAddRow = () => {
    const nextId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: nextId, quantity: 0, price: 0 }]);
    setErrors('');
  };

  const handleRemoveRow = (id: number) => {
    if (rows.length <= 1) {
      setErrors('At least one purchase entry is required');
      return;
    }
    setRows(rows.filter(r => r.id !== id));
    setErrors('');
  };

  const handleUpdateRow = (id: number, field: 'quantity' | 'price', value: number) => {
    setRows(rows.map(r => (r.id === id ? { ...r, [field]: value } : r)));
    setErrors('');
  };

  const handleReset = () => {
    setRows([
      { id: 1, quantity: 100, price: 50 },
      { id: 2, quantity: 50, price: 40 },
    ]);
    setErrors('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Purchase History</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset All
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {rows.map((row, index) => (
              <div key={row.id} className="flex gap-3 items-center rounded-xl bg-background/50 border border-border p-3">
                <span className="text-xs font-bold text-foreground/30 w-5 text-center">#{index + 1}</span>
                
                <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
                  <div>
                    <label className="sr-only">Quantity</label>
                    <div className="relative rounded-lg border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={row.quantity || ''}
                        onChange={(e) => handleUpdateRow(row.id, 'quantity', Number(e.target.value))}
                        className="block w-full py-2 px-3 text-sm font-medium outline-none bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="sr-only">Price</label>
                    <div className="relative rounded-lg border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-foreground/40 text-xs font-bold">
                        $
                      </div>
                      <input
                        type="number"
                        placeholder="Price"
                        value={row.price || ''}
                        onChange={(e) => handleUpdateRow(row.id, 'price', Number(e.target.value))}
                        className="block w-full py-2 pl-6 pr-3 text-sm font-medium outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveRow(row.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/5 transition-all cursor-pointer shrink-0"
                  title="Delete row"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {errors && <p className="text-xs text-red-500 mt-2 font-semibold">{errors}</p>}

          <button
            type="button"
            onClick={handleAddRow}
            className="w-full mt-4 flex items-center justify-center gap-1.5 border border-dashed border-border hover:border-primary hover:text-primary rounded-xl py-3 text-xs font-bold text-foreground/60 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Transaction Row
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Weighted Average Cost</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Average Buying Price
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Share Quantity
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.totalQuantity.toLocaleString()} shares
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Investment Cost
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    ${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter quantities and purchase prices to calculate averages.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
