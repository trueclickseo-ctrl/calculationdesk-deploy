'use client';

import React, { useState, useEffect } from 'react';
import { Delete, CornerDownLeft, Clock, Copy, Trash2, Sun, Moon } from 'lucide-react';

export const seoData = {
  whatIs: `The Basic Calculator is a clean, simple arithmetic workspace designed to perform standard daily calculations: addition, subtraction, multiplication, division, and percentage calculations.`,
  formula: `Basic arithmetic operations:
1. Addition: $a + b$
2. Subtraction: $a - b$
3. Multiplication: $a \\times b$
4. Division: $a \\div b$`,
  example: `To solve 150 + 25% - 45:
1. Input: **150 + (150 * 0.25) - 45**
2. Result = **142.5**`,
  faqs: [
    {
      q: 'Does it support decimal values?',
      a: 'Yes, you can input floating decimals using the dot (.) key.',
    },
    {
      q: 'Can I track my past calculations?',
      a: 'Yes, this tool has a live digital tape record on the side where you can view and copy past calculations.',
    },
  ],
};

function evaluateExpression(expr: string): number {
  const cleanExpr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, '');

  let index = 0;

  function parsePrimary(): number {
    if (index >= cleanExpr.length) return 0;

    if (cleanExpr[index] === '(') {
      index++; // skip '('
      const val = parseExpression();
      if (index < cleanExpr.length && cleanExpr[index] === ')') {
        index++; // skip ')'
      }
      return val;
    }

    if (cleanExpr[index] === '-') {
      index++;
      return -parsePrimary();
    }

    let numStr = '';
    while (index < cleanExpr.length && /[0-9.]/.test(cleanExpr[index])) {
      numStr += cleanExpr[index];
      index++;
    }

    if (numStr === '') {
      index++;
      return 0;
    }

    return parseFloat(numStr);
  }

  function parseMultiplication(): number {
    let val = parsePrimary();
    while (index < cleanExpr.length && (cleanExpr[index] === '*' || cleanExpr[index] === '/')) {
      const op = cleanExpr[index];
      index++;
      const nextVal = parsePrimary();
      if (op === '*') {
        val *= nextVal;
      } else {
        val /= nextVal;
      }
    }
    return val;
  }

  function parseExpression(): number {
    let val = parseMultiplication();
    while (index < cleanExpr.length && (cleanExpr[index] === '+' || cleanExpr[index] === '-')) {
      const op = cleanExpr[index];
      index++;
      const nextVal = parseMultiplication();
      if (op === '+') {
        val += nextVal;
      } else {
        val -= nextVal;
      }
    }
    return val;
  }

  const result = parseExpression();
  if (isNaN(result) || !isFinite(result)) {
    throw new Error('Math Error');
  }
  return result;
}

export default function BasicCalculator() {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<{ equation: string; result: string }[]>([]);
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('calchub_basic_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveHistory = (newHistory: { equation: string; result: string }[]) => {
    setHistory(newHistory);
    localStorage.setItem('calchub_basic_history', JSON.stringify(newHistory));
  };

  const handleKeyPress = (char: string) => {
    if (char === 'C') {
      setDisplay('');
      setResult('');
    } else if (char === 'DEL') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (char === '=') {
      try {
        if (display.trim() === '') {
          setResult('');
          return;
        }
        const val = evaluateExpression(display);
        const finalResult = val.toLocaleString(undefined, { maximumFractionDigits: 8 });
        setResult(finalResult);
        const updated = [{ equation: display, result: finalResult }, ...history].slice(0, 30);
        saveHistory(updated);
      } catch {
        setResult('Error');
      }
    } else if (char === '+/-') {
      if (display.startsWith('-')) {
        setDisplay(prev => prev.slice(1));
      } else {
        setDisplay(prev => '-' + prev);
      }
    } else {
      setDisplay(prev => prev + char);
    }
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const keys = [
    ['C', 'DEL', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto w-full px-4">
      {/* Premium Desk Calculator Frame */}
      <div 
        className={`lg:col-span-7 border-[8px] rounded-[32px] shadow-2xl p-5 flex flex-col w-full max-w-[320px] mx-auto select-none transition-colors duration-300 relative ${
          isDark ? 'bg-[#0f172a] border-[#1e293b]' : 'bg-[#f8fafc] border-[#e2e8f0]'
        }`}
      >
        
        {/* Local Theme Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`absolute top-4 right-6 p-1 rounded-full cursor-pointer transition-colors ${
            isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
          }`}
          title="Toggle Theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Screen */}
        <div className={`rounded-2xl p-4 mb-4 text-right space-y-1 ${isDark ? 'bg-[#1e293b]' : 'bg-white border border-[#e2e8f0]'}`}>
          <div className={`text-xs font-mono min-h-5 break-all ${isDark ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
            {display || '0'}
          </div>
          <div className={`text-3xl font-bold font-sans min-h-9 break-all ${isDark ? 'text-white' : 'text-black'}`}>
            {result || '0'}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {keys.flatMap((row, rIdx) =>
            row.map((btn, cIdx) => {
              const isOperator = ['÷', '×', '−', '+', '='].includes(btn);
              const isAction = ['C', 'DEL', '%'].includes(btn);

              let btnClass = 'aspect-square rounded-2xl flex items-center justify-center text-lg font-bold transition-all active:scale-90 cursor-pointer shadow-sm ';
              if (btn === '=') {
                btnClass += 'bg-primary hover:bg-primary-hover text-white';
              } else if (isOperator) {
                btnClass += 'bg-accent/15 hover:bg-accent/25 text-accent';
              } else if (isAction) {
                btnClass += isDark ? 'bg-[#334155] hover:bg-[#475569] text-white/90' : 'bg-[#e2e8f0] hover:bg-[#cbd5e1] text-black';
              } else {
                btnClass += isDark ? 'bg-[#1e293b] hover:bg-[#334155] text-white' : 'bg-white hover:bg-[#f1f5f9] text-black border border-[#e2e8f0]';
              }

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleKeyPress(btn)}
                  className={btnClass}
                >
                  {btn === 'DEL' ? <Delete className="h-4 w-4" /> : btn === '=' ? <CornerDownLeft className="h-4 w-4" /> : btn}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Tape records side panel */}
      <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 shadow-xl flex flex-col h-[460px] w-full max-w-md mx-auto">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg">Tape Records</h3>
          </div>
          {history.length > 0 && (
            <button onClick={clearHistory} className="p-2 rounded-lg hover:bg-background text-foreground/60 hover:text-red-500 transition-colors cursor-pointer" title="Clear Tape"><Trash2 className="h-4 w-4" /></button>
          )}
        </div>

        <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 text-sm">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div key={idx} className="group flex items-start justify-between p-3.5 rounded-2xl bg-background/50 border border-border/70 hover:border-primary/20 hover:bg-primary/5 transition-all">
                <div className="font-mono overflow-hidden pr-2">
                  <span className="block text-xs text-foreground/45 mb-0.5 truncate">{item.equation}</span>
                  <span className="block text-base font-extrabold text-foreground/90 truncate">= {item.result}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.result)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-background text-foreground/45 hover:text-primary transition-all cursor-pointer shrink-0"
                  title="Copy Result"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-foreground/40 text-center px-4">
              <span className="text-xs mt-2">Tape records of calculations will display here.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
