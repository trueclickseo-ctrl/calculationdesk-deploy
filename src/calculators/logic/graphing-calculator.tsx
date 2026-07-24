'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Plus, Trash2, Sun, Moon } from 'lucide-react';

export const seoData = {
  whatIs: `The Graphing Calculator is a high-performance visual plotter built to render functions and algebraic equations dynamically on a fully interactive Cartesian coordinate plane.`,
  formula: `Curves are rendered by evaluating equations across continuous math coordinates:
$$y = f(x)$$
Where $f(x)$ is solved for every column of pixels across the canvas, rendering smooth geometric paths.`,
  example: `To plot a parabola and sine wave:
1. Add y1 = x^2
2. Add y2 = sin(x)
3. Drag the graph area to pan and use your scroll wheel to zoom.`,
  faqs: [
    {
      q: 'How do I zoom or move around the graph?',
      a: 'Simply click and drag anywhere on the graph grid to pan. You can zoom in and out using your mouse scroll wheel, or by clicking the overlay buttons in the top-right corner.',
    },
    {
      q: 'What mathematical functions are supported?',
      a: 'The plotter supports algebra (+, -, *, /), exponents (^), square roots (sqrt), and standard trigonometric and logarithmic functions (sin, cos, tan, log, ln).',
    },
  ],
};

// Safe Expression Parser with Variable X support
function parseAndEvaluate(expr: string, x: number): number {
  const cleanExpr = expr
    .replace(/π/g, Math.PI.toString())
    .replace(/e/g, Math.E.toString())
    .replace(/x/g, `(${x})`)
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
      index++;
      const exponent = parsePrimary();
      val = Math.pow(val, exponent);
    }
    return val;
  }

  function parseMultiplication(): number {
    let val = parsePower();
    while (index < cleanExpr.length && (cleanExpr[index] === '*' || cleanExpr[index] === '/')) {
      const op = cleanExpr[index];
      index++;
      const nextVal = parsePower();
      if (op === '*') val *= nextVal;
      else val /= nextVal;
    }
    return val;
  }

  function parseExpression(): number {
    let val = parseMultiplication();
    while (index < cleanExpr.length && (cleanExpr[index] === '+' || cleanExpr[index] === '-')) {
      const op = cleanExpr[index];
      index++;
      const nextVal = parseMultiplication();
      if (op === '+') val += nextVal;
      else val -= nextVal;
    }
    return val;
  }

  return parseExpression();
}

interface FunctionPlot {
  id: string;
  expression: string;
  color: string;
}

export default function GraphingCalculator() {
  const [plots, setPlots] = useState<FunctionPlot[]>([
    { id: '1', expression: 'x^2', color: '#2563eb' },
    { id: '2', expression: 'sin(x)', color: '#16a34a' }
  ]);
  const [scale, setScale] = useState<number>(40); // pixels per unit
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDarkGraph, setIsDarkGraph] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on client bounding box for responsiveness
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Fill background
    ctx.fillStyle = isDarkGraph ? '#0f172a' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2 + offsetX;
    const originY = height / 2 + offsetY;

    // Colors
    const gridColor = isDarkGraph ? '#1e293b' : '#f1f5f9';
    const axisColor = isDarkGraph ? '#475569' : '#cbd5e1';
    const labelColor = isDarkGraph ? '#94a3b8' : '#64748b';

    // Draw Grid Lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    const step = scale;

    let startX = originX % step;
    for (let x = startX; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    let startY = originY % step;
    for (let y = startY; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Axis
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = labelColor;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = startX; x < width; x += step) {
      const val = Math.round((x - originX) / scale);
      if (val !== 0) ctx.fillText(val.toString(), x, originY + 6);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = startY; y < height; y += step) {
      const val = Math.round((originY - y) / scale);
      if (val !== 0) ctx.fillText(val.toString(), originX - 6, y);
    }

    // Plot Curves
    plots.forEach(plot => {
      if (!plot.expression.trim()) return;

      ctx.beginPath();
      ctx.strokeStyle = plot.color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      let first = true;

      for (let pixelX = 0; pixelX < width; pixelX++) {
        const mathX = (pixelX - originX) / scale;

        try {
          const mathY = parseAndEvaluate(plot.expression, mathX);
          const pixelY = originY - (mathY * scale);

          if (!isNaN(pixelY) && isFinite(pixelY) && pixelY >= -100 && pixelY <= height + 100) {
            if (first) {
              ctx.moveTo(pixelX, pixelY);
              first = false;
            } else {
              ctx.lineTo(pixelX, pixelY);
            }
          } else {
            first = true;
          }
        } catch (e) {
          first = true;
        }
      }
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawGraph();
    
    // Set up resize listener
    const handleResize = () => drawGraph();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [plots, scale, offsetX, offsetY, isDarkGraph]);

  // Mouse Drag Panning handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!isDragging.current) return;
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      setOffsetX(prev => prev + dx);
      setOffsetY(prev => prev + dy);
      dragStart.current = { x: clientX, y: clientY };
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Mouse Wheel Zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev * zoomFactor, 150));
    } else {
      setScale(prev => Math.max(prev / zoomFactor, 15));
    }
  };

  const addPlot = () => {
    const colors = ['#dc2626', '#d97706', '#0284c7', '#7c3aed', '#db2777'];
    const color = colors[plots.length % colors.length];
    setPlots([...plots, { id: Date.now().toString(), expression: '', color }]);
  };

  const removePlot = (id: string) => {
    setPlots(plots.filter(p => p.id !== id));
  };

  const updateExpression = (id: string, text: string) => {
    setPlots(plots.map(p => p.id === id ? { ...p, expression: text } : p));
  };

  const handleReset = () => {
    setScale(40);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto w-full px-4">
      
      {/* 1/3 width: Function Editor Panel */}
      <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between min-h-[500px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-lg font-bold text-foreground">Function List</h2>
            <button
              onClick={addPlot}
              className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Line
            </button>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {plots.map((plot, idx) => (
              <div key={plot.id} className="flex items-center gap-3">
                <div className="h-4.5 w-4.5 rounded-full shrink-0 border border-black/10 shadow-sm" style={{ backgroundColor: plot.color }} />
                <div className="flex-grow relative">
                  <span className="absolute left-3 top-2.5 text-sm font-semibold text-foreground/45 font-mono">y{idx + 1} =</span>
                  <input
                    type="text"
                    value={plot.expression}
                    onChange={e => updateExpression(plot.id, e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2 pl-12 pr-4 text-sm font-mono outline-none transition-all placeholder:text-foreground/30 focus:border-primary text-foreground"
                    placeholder="enter function (e.g. x^2)"
                  />
                </div>
                {plots.length > 1 && (
                  <button
                    onClick={() => removePlot(plot.id)}
                    className="text-foreground/40 hover:text-red-500 transition-colors p-2 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-foreground/50 border-t border-border pt-4 mt-4">
          💡 Tip: Click and drag on the graph screen to pan. Scroll to zoom in and out.
        </div>
      </div>

      {/* 2/3 width: Massive Graphing Screen */}
      <div className="lg:col-span-8 rounded-3xl border border-border bg-card p-6 shadow-xl flex flex-col">
        {/* Dynamic Responsive Canvas Container */}
        <div className="relative w-full aspect-[16/10] rounded-2xl border border-border overflow-hidden bg-white cursor-grab active:cursor-grabbing select-none group">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onWheel={handleWheel}
            className="w-full h-full block"
          />

          {/* Floating Transparent Controller Hub (Desmos style) */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 bg-card/85 backdrop-blur border border-border/80 p-1.5 rounded-xl shadow-lg transition-opacity">
            <button
              onClick={() => setIsDarkGraph(!isDarkGraph)}
              className="p-2 rounded-lg hover:bg-background text-foreground/75 cursor-pointer transition-colors"
              title="Toggle Grid Theme"
            >
              {isDarkGraph ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => setScale(prev => Math.min(prev + 10, 150))} 
              className="p-2 rounded-lg hover:bg-background text-foreground/75 cursor-pointer transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setScale(prev => Math.max(prev - 10, 15))} 
              className="p-2 rounded-lg hover:bg-background text-foreground/75 cursor-pointer transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button 
              onClick={handleReset} 
              className="p-2 rounded-lg hover:bg-background text-foreground/75 cursor-pointer transition-colors border-t border-border mt-1"
              title="Reset Zoom & Offset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
