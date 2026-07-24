'use client';

import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  symbol: string;
  left: number;
  top: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

const MATH_SYMBOLS = ['+', '−', '×', '÷', '=', '%', 'π', '√', '∑', '∫', 'x²', '123', 'θ', 'Δ'];
const COLORS = [
  'text-primary/70',
  'text-secondary/70',
  'text-indigo-500/70',
  'text-emerald-500/70',
  'text-amber-500/70',
  'text-purple-500/70'
];

export function triggerScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.dispatchEvent(new Event('scroll-to-top-animation'));
}

export default function MathScrollAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);


  useEffect(() => {
    const handleTrigger = () => {
      // Spawn 25 falling math particles
      const count = 25;
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const symbol = MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
        const left = Math.random() * 100; // Left percentage (0 to 100)
        const top = Math.random() * 90 - 10; // Spreads across the whole page vertically
        const speed = 1.8 + Math.random() * 1.5; // Animation duration in seconds
        const size = 16 + Math.floor(Math.random() * 32); // Font size (16px to 48px)
        const opacity = 0.6 + Math.random() * 0.4;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        newParticles.push({
          id: Date.now() + i + Math.random(),
          symbol,
          left,
          top,
          speed,
          size,
          opacity,
          color
        });
      }

      setParticles(prev => [...prev, ...newParticles]);
    };

    window.addEventListener('scroll-to-top-animation', handleTrigger);
    return () => window.removeEventListener('scroll-to-top-animation', handleTrigger);
  }, []);

  // Cleanup particles after their animation ends
  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [particles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute font-bold select-none ${p.color} filter drop-shadow-sm transition-all`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translateY(0)',
            animation: `floatDown ${p.speed}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}
