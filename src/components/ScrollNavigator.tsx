'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollNavigator() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show scroll-to-top button after scrolling 300px
      setShowUp(scrollY > 300);

      // Show scroll-to-bottom button if we are not close to the bottom (within 150px)
      setShowDown(scrollY + winHeight < docHeight - 150);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
      {/* Scroll to Top */}
      {showUp && (
        <button
          onClick={scrollToTop}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:text-primary hover:shadow-primary/10 active:scale-95 focus:outline-none"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Scroll to Bottom */}
      {showDown && (
        <button
          onClick={scrollToBottom}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:text-primary hover:shadow-primary/10 active:scale-95 focus:outline-none"
          title="Scroll to Bottom"
          aria-label="Scroll to Bottom"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
