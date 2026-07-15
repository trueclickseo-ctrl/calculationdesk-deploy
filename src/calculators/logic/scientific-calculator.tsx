'use client';

import React, { useState, useEffect } from 'react';
import { Delete, CornerDownLeft, Clock, Copy, Trash2, Download, Printer, Sun, Moon } from 'lucide-react';

export const seoData = {
  whatIs: `The TI-84 Style Scientific Calculator is a premium mathematical workspace modeled after the classic handheld calculator to compute trigonometric, logarithmic, algebraic, and exponential equations.`,
  formula: `Trigonometric and logarithmic formulas evaluated by this utility include:

**1. Trigonometric Functions (radians):**
$$\\sin(\\theta), \\quad \\cos(\\theta), \\quad \\tan(\\theta)$$

**2. Logarithmic Functions:**
$$\\text{Natural Log: } \\ln(x) = \\log_e(x), \\quad \\text{Common Log: } \\log_{10}(x)$$`,
  example: `To calculate $3 \\times \\sin(0.5) + 2^3$:
1. Enter the keys sequentially.
2. Hit Enter to solve.`,
  faqs: [
    {
      q: 'Does this calculator use degrees or radians for trigonometry?',
      a: 'The trigonometric functions default to using radians, which is the standard mathematical convention.',
    },
    {
      q: 'Is there a calculation history tracker?',
      a: 'Yes, this calculator features a digital calculation tape tracking your history.',
    },
  ],
};

// Safe Token-Based Math Parser (Avoiding raw eval() or Function())
function evaluateExpression(expr: string): number {
  const cleanExpr = expr
    .replace(/π/g, Math.PI.toString())
    .replace(/e/g, Math.E.toString())
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, '');

  let index = 0;

  function parsePrimary(): number {
    if (index >= cleanExpr.length) return 0;

    // Handle parentheses
    if (cleanExpr[index] === '(') {
      index++; // skip '('
      const val = parseExpression();
      if (index < cleanExpr.length && cleanExpr[index] === ')') {
        index++; // skip ')'
      }
      return val;
    }

    // Handle negative numbers
    if (cleanExpr[index] === '-') {
      index++;
      return -parsePrimary();
    }

    // Handle standard functions
    const funcMatch = cleanExpr.slice(index).match(/^(sin|cos|tan|log|ln|sqrt)/);
    if (funcMatch) {
      const funcName = funcMatch[0];
      index += funcName.length;
      
      const val = parsePrimary();
      
      switch (funcName) {
        case 'sin': return Math.sin(val);
        case 'cos': return Math.cos(val);
        case 'tan': return Math.tan(val);
        case 'log': return Math.log10(val);
        case 'ln': return Math.log(val);
        case 'sqrt': return Math.sqrt(val);
        default: return 0;
      }
    }

    // Read numbers
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

  function parsePower(): number {
    let val = parsePrimary();
    while (index < cleanExpr.length && cleanExpr[index] === '^') {
      index++; // skip '^'
      const exponent = parsePrimary();
      val = Math.pow(val, exponent);
    }
    return val;
  }

  // Handle factorial post-fix
  function parseFactorial(): number {
    let val = parsePower();
    while (index < cleanExpr.length && cleanExpr[index] === '!') {
      index++; // skip '!'
      let fact = 1;
      for (let i = 2; i <= Math.floor(val); i++) fact *= i;
      val = fact;
    }
    return val;
  }

  function parseMultiplication(): number {
    let val = parseFactorial();
    while (index < cleanExpr.length && (cleanExpr[index] === '*' || cleanExpr[index] === '/')) {
      const op = cleanExpr[index];
      index++; // skip operator
      const nextVal = parseFactorial();
      if (op === '*') {
        val *= nextVal;
      } else {
        val /= nextVal;
      }
    }
    return val;
  }

  // Handle standard addition/subtraction
  function parseExpression(): number {
    let val = parseMultiplication();
    while (index < cleanExpr.length && (cleanExpr[index] === '+' || cleanExpr[index] === '-')) {
      const op = cleanExpr[index];
      index++; // skip operator
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

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<{ equation: string; result: string }[]>([]);
  const [isDarkDevice, setIsDarkDevice] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('calchub_scientific_history');
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
    localStorage.setItem('calchub_scientific_history', JSON.stringify(newHistory));
  };

  const handleKeyPress = (char: string) => {
    if (char === 'clear') {
      setDisplay('');
      setResult('');
    } else if (char === 'del') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (char === 'enter') {
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
    } else if (char === 'x²') {
      setDisplay(prev => prev + '^2');
    } else if (char === 'x^y' || char === '^') {
      setDisplay(prev => prev + '^');
    } else if (char === '1/x') {
      setDisplay(prev => prev + '1/');
    } else if (char === '√') {
      setDisplay(prev => prev + 'sqrt(');
    } else if (char === 'ln') {
      setDisplay(prev => prev + 'ln(');
    } else if (char === 'log') {
      setDisplay(prev => prev + 'log(');
    } else if (char === 'sin') {
      setDisplay(prev => prev + 'sin(');
    } else if (char === 'cos') {
      setDisplay(prev => prev + 'cos(');
    } else if (char === 'tan') {
      setDisplay(prev => prev + 'tan(');
    } else if (char === 'x!') {
      setDisplay(prev => prev + '!');
    } else if (char === 'mode' || char === 'alpha' || char === '2nd' || char === 'stat' || char === 'math' || char === 'apps' || char === 'prgm' || char === 'vars') {
      return;
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

  const downloadHistory = () => {
    const txt = history.map(h => `${h.equation} = ${h.result}`).join('\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculation_history.txt';
    a.click();
  };

  const printHistory = () => {
    const w = window.open();
    if (w) {
      w.document.write('<h1>Calculation History</h1>');
      w.document.write('<ul>');
      history.forEach(h => {
        w.document.write(`<li><strong>${h.equation}</strong> = ${h.result}</li>`);
      });
      w.document.write('</ul>');
      w.document.close();
      w.print();
    }
  };

  // Keyboard groups mirroring the TI-84 Plus CE
  const row1 = ['y=', 'window', 'zoom', 'trace', 'graph'];
  
  const sciKeys = [
    ['2nd', 'mode', 'del'],
    ['alpha', 'X,T,θ,n', 'stat'],
    ['math', 'apps', 'prgm', 'vars', 'clear'],
    ['x⁻¹', 'sin', 'cos', 'tan', '^'],
    ['x²', ',', '(', ')', '÷'],
    ['log', '7', '8', '9', '×'],
    ['ln', '4', '5', '6', '−'],
    ['sto', '1', '2', '3', '+'],
    ['on', '0', '.', '(-)', 'enter']
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto w-full px-4">
      {/* Handheld TI-84 Device Frame */}
      <div 
        className={`lg:col-span-7 border-[10px] rounded-[30px] shadow-2xl p-5 flex flex-col w-full max-w-[340px] mx-auto select-none border-b-[20px] transition-colors duration-300 relative ${
          isDarkDevice 
            ? 'bg-[#0b0b0c] border-[#222]' 
            : 'bg-[#f1f2f6] border-[#d1d2d6]'
        }`}
      >
        
        {/* Device Local Bezel Light/Dark Theme Switcher */}
        <button
          onClick={() => setIsDarkDevice(!isDarkDevice)}
          className={`absolute top-2 right-6 p-1 rounded-full cursor-pointer transition-colors ${
            isDarkDevice ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
          }`}
          title="Toggle Device Theme"
        >
          {isDarkDevice ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>

        {/* TI-84 Retro Screen */}
        <div className="bg-[#e6edf2] rounded-lg p-3 mb-4 flex flex-col font-mono text-[10px] text-black shadow-inner border border-black/20 aspect-[4/3]">
          <div className="flex justify-between border-b border-black/10 pb-1 mb-1 font-semibold text-black/60 uppercase">
            <span>NORMAL FLOAT AUTO</span>
            <span>RADIAN MP</span>
          </div>
          <div className="flex-grow flex flex-col justify-end space-y-1">
            <div className="text-right text-black/50 text-[9px] mb-2 font-semibold">TI-84 Plus CE</div>
            <div className="text-black/80 text-sm font-semibold break-all">{display || '0'}</div>
            <div className="text-black text-right text-base font-extrabold break-all border-t border-black/10 pt-1">
              {result ? `= ${result}` : 'RAM Cleared'}
            </div>
          </div>
        </div>

        {/* Function Keys Row (Immediately below screen) */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {row1.map(btn => (
            <button
              key={btn}
              onClick={() => handleKeyPress(btn)}
              className="py-1 px-0.5 rounded-sm bg-[#5c5d62] text-[8px] font-bold text-white uppercase border-b-2 border-black/40 hover:bg-[#6c6d72] active:scale-95 cursor-pointer"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* TI-84 Functional Keypad Grid */}
        <div className="space-y-2">
          {/* Row group for Del, Alpha, 2nd, Mode */}
          <div className="grid grid-cols-3 gap-2">
            {sciKeys.slice(0, 2).map((row) => 
              row.map((btn) => {
                let btnClass = 'py-2 rounded text-[10px] font-bold uppercase border-b-2 border-black/40 active:scale-95 cursor-pointer ';
                if (btn === '2nd') btnClass += 'bg-[#1b62a5] text-white hover:bg-[#2b72b5]';
                else if (btn === 'alpha') btnClass += 'bg-[#43a047] text-white hover:bg-[#53b057]';
                else btnClass += isDarkDevice 
                  ? 'bg-[#28292d] text-white/90 hover:bg-[#38393d]'
                  : 'bg-[#d8d9de] text-black hover:bg-[#c8c9ce]';

                return (
                  <button key={btn} onClick={() => handleKeyPress(btn)} className={btnClass}>
                    {btn}
                  </button>
                );
              })
            )}
          </div>

          {/* Remaining keys */}
          <div className="grid grid-cols-5 gap-2">
            {sciKeys.slice(2).flatMap((row, rIdx) => 
              row.map((btn, cIdx) => {
                const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(btn);
                const isOperator = ['÷', '×', '−', '+', 'enter'].includes(btn);
                
                let btnClass = 'py-2 rounded flex items-center justify-center text-[10px] font-bold uppercase border-b-2 border-black/40 active:scale-95 cursor-pointer shadow ';
                if (isNumber) {
                  btnClass += isDarkDevice 
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-[#fcfcff] text-black hover:bg-[#ececee]';
                } else if (isOperator) {
                  btnClass += 'bg-[#b0b3b8] text-black hover:bg-[#c0c3c8]';
                } else {
                  btnClass += isDarkDevice 
                    ? 'bg-[#28292d] text-white/90 hover:bg-[#38393d]'
                    : 'bg-[#d8d9de] text-black hover:bg-[#c8c9ce]';
                }

                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleKeyPress(btn)}
                    className={btnClass}
                  >
                    {btn === 'enter' ? <CornerDownLeft className="h-3.5 w-3.5" /> : btn}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* History side panel */}
      <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 shadow-xl flex flex-col h-[520px] w-full max-w-md mx-auto">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg">Tape Records</h3>
          </div>
          {history.length > 0 && (
            <div className="flex gap-2">
              <button onClick={downloadHistory} className="p-2 rounded-lg hover:bg-background text-foreground/60 hover:text-primary transition-colors cursor-pointer" title="Download history"><Download className="h-4 w-4" /></button>
              <button onClick={printHistory} className="p-2 rounded-lg hover:bg-background text-foreground/60 hover:text-primary transition-colors cursor-pointer" title="Print history"><Printer className="h-4 w-4" /></button>
              <button onClick={clearHistory} className="p-2 rounded-lg hover:bg-background text-foreground/60 hover:text-red-500 transition-colors cursor-pointer" title="Clear Tape"><Trash2 className="h-4 w-4" /></button>
            </div>
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
